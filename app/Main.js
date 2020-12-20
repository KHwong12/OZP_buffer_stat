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

    // query the OZP layer when geometry is created or updated
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


    const bufferNumSlider = new Slider({
        container: "bufferNum",
        min: 0,
        max: 1000,
        steps: 10,
        visibleElements: {
            labels: true
        },
        precision: 0,
        labelFormatFunction: function (value, type) {
            return value.toString() + "m";
        },
        values: [0]
    });

    // get user entered values for buffer
    bufferNumSlider.on(
        ["thumb-change", "thumb-drag"],
        bufferVariablesChanged
    );
    function bufferVariablesChanged(event) {
        bufferSize = event.value;
        console.log("Querying the geometry with buffer size of ", bufferSize);
        runQuery();
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

    // set the geometry query on the visible SceneLayerView
    var debouncedRunQuery = promiseUtils.debounce(function () {
        if (!sketchGeometry) {
            return;
        }

        resultDiv.style.display = "block";
        updateBufferGraphic(bufferSize);
        return promiseUtils.eachAlways([
            // queryStatistics(),
            updateMapLayer()
        ]);
    });

    function runQuery() {
        debouncedRunQuery().catch((error) => {
            if (error.name === "AbortError") {
                return;
            }

            console.error(error);
        });
    }

    // update the graphic with buffer
    function updateBufferGraphic(buffer) {
        // add a polygon graphic for the buffer
        if (buffer > 0) {
            var bufferGeometry = geometryEngine.geodesicBuffer(
                sketchGeometry,
                buffer,
                "meters"
            );
            if (bufferLayer.graphics.length === 0) {
                bufferLayer.add(
                    new Graphic({
                        geometry: bufferGeometry,
                        symbol: sketchViewModel.polygonSymbol
                    })
                );
            } else {
                bufferLayer.graphics.getItemAt(0).geometry = bufferGeometry;
            }
        } else {
            bufferLayer.removeAll();
        }
    }

    function updateMapLayer() {
        const query = webLayerView.createQuery();
        query.geometry = sketchGeometry;
        query.distance = bufferSize;
        // return webLayerView.queryObjectIds(query).then(highlightBuildings);
        return webLayerView.queryObjectIds(query);
    }

    function queryStatistics() {
        // TODO
    }
});
