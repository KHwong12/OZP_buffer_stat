require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/widgets/Slider",
    "esri/geometry/geometryEngine",
    "esri/Graphic",
    "esri/core/promiseUtils"
], function (
    WebMap,
    MapView,
    FeatureLayer,
    GraphicsLayer,
    SketchViewModel,
    Slider,
    geometryEngine,
    Graphic,
    promiseUtils
) {
    // Load webmap and display it in a SceneView
    const webmap = new WebMap({
        portalItem: { // autocasts as new PortalItem()
            id: "01807d9d7e954671bcfbcbe64290ac92"
        }
    });

    // create the SceneView
    const view = new MapView({
        container: "viewDiv",
        map: webmap,
        zoom: 10,
        center: [114.145, 22.360] // lon, lat
    });

    window.view = view;

    // add a GraphicsLayer for the sketches and the buffer
    const sketchLayer = new GraphicsLayer();
    const bufferLayer = new GraphicsLayer();
    view.map.addMany([bufferLayer, sketchLayer]);

    let webLayer = null;
    let webLayerView = null;
    let bufferSize = 0;

    // Assign scene layer once webmap is loaded and initialize UI
    webmap.load().then(function () {
        webLayer = webmap.layers.find(function (layer) {
            return layer.title === "OZP_Nov2019_Sim";
        });
        // Fetch all fields
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#outFields
        webLayer.outFields = ["*"];

        view.whenLayerView(webLayer).then(function (layerView) {
            webLayerView = layerView;
            queryDiv.style.display = "block";
        });
    });

    view.ui.add([queryDiv], "bottom-left");
    view.ui.add([resultDiv], "top-right");
});
