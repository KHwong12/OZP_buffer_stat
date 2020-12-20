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
        zoom: 12,
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

    // Assign web layer once webmap is loaded and initialize UI
    webmap.load().then(function () {
        webLayer = webmap.layers.find(function (layer) {
            // title of layer, not name of the webmap
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

    // use SketchViewModel to draw polygons that are used as a query
    let sketchGeometry = null;
    const sketchViewModel = new SketchViewModel({
        layer: sketchLayer,
        defaultUpdateOptions: {
            tool: "reshape",
            toggleToolOnClick: false
        },
        view: view,
        defaultCreateOptions: { hasZ: false }
    });

    sketchViewModel.on("create", function (event) {
        if (event.state === "complete") {
            sketchGeometry = event.graphic.geometry;
            runQuery();
        }
    });

    sketchViewModel.on("update", function (event) {
        if (event.state === "complete") {
            sketchGeometry = event.graphics[0].geometry;
            runQuery();
        }
    });

    // draw geometry buttons - use the selected geometry to sketch
    document
        .getElementById("point-geometry-button")
        .addEventListener("click", geometryButtonsClickHandler);
    document
        .getElementById("line-geometry-button")
        .addEventListener("click", geometryButtonsClickHandler);
    document
        .getElementById("polygon-geometry-button")
        .addEventListener("click", geometryButtonsClickHandler);

    function geometryButtonsClickHandler(event) {
        const geometryType = event.target.value;
        clearGeometry();
        sketchViewModel.create(geometryType);
    }                                       

    // Clear the geometry and set the default renderer
    document
        .getElementById("clearGeometry")
        .addEventListener("click", clearGeometry);

    // Clear the geometry and set the default renderer
    function clearGeometry() {
        sketchGeometry = null;
        sketchViewModel.cancel();
        sketchLayer.removeAll();
        bufferLayer.removeAll();
/*        clearHighlighting();*/
/*        clearCharts();*/
        resultDiv.style.display = "none";
    }

    function runQuery() {
        // TODO
    }

    function updateMapLayer() {
        const query = webLayerView.createQuery();
        query.geometry = sketchGeometry;
        query.distance = bufferSize;
        return webLayerView.queryObjectIds(query).then(highlightBuildings);
    }

});
