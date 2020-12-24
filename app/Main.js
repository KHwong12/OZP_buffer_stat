require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/widgets/Slider",
    "esri/geometry/Polygon",
    "esri/geometry/geometryEngine",
    "esri/tasks/GeometryService",
    "esri/Graphic",
    "esri/core/promiseUtils",
    "esri/tasks/support/AreasAndLengthsParameters",
    "esri/widgets/Expand",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query"
], function (
    WebMap,
    MapView,
    FeatureLayer,
    GraphicsLayer,
    SketchViewModel,
    Slider,
    Polygon,
    geometryEngine,
    GeometryService,
    Graphic,
    promiseUtils,
    AreasAndLengthsParameters,
    Expand,
    QueryTask,
    Query
) {
    // Load webmap and display it in a MapView
    const webmap = new WebMap({
        portalItem: { // autocasts as new PortalItem()
            id: "01807d9d7e954671bcfbcbe64290ac92"
        },
        basemap: "dark-gray-vector"
    });

    // create the MapView
    const view = new MapView({
        container: "viewDiv",
        map: webmap,
        zoom: 14,
        center: [114.172, 22.281] // lon, lat
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

        // Put OZP zoning feature layer to the bottom, otherwise query geoms will be hided by the OZP polygons
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#reorder
        webmap.reorder(webLayer, 0);
    });

    view.ui.add([queryDiv], "bottom-left");
/*    view.ui.add([resultDiv], "top-right");*/

    // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html
    // https://developers.arcgis.com/javascript/latest/sample-code/layers-imagery-clientside/index.html
    const instructionsExpand = new Expand({
        expandIconClass: "esri-icon-question",
        expandTooltip: "How to use this application",
        view: view,
        expanded: true,
        content:
            "<div style='width:200px; padding:10px'><b>Click</b> the buttons to <b>draw</b> your area of interest. For lines and polygons, double click to finish drawing. <br><br><b>Move</b> the slider to change the buffer distance.</div>"
    });

    view.ui.add(instructionsExpand, "top-left");

    // Close the 'help' popup when view is focused
    view.watch("focused", function (isFocused) {
        if (isFocused) {
            instructionsExpand.expanded = false;
        }
    });

    // use SketchViewModel to draw polygons for spatial query
    let sketchGeometry = null;

    const sketchViewModel = new SketchViewModel({
        layer: sketchLayer,
        defaultUpdateOptions: {
            tool: "reshape",
            toggleToolOnClick: false
        },
        // Define geometry style
        // https://developers.arcgis.com/javascript/latest/sample-code/featureeffect-geometry/index.html
        pointSymbol: {
            type: "text",
            color: [51, 51, 204, 0.9],
            text: "\ue61d",
            font: {
                size: 24,
                family: "CalciteWebCoreIcons"
                }
            },
        polylineSymbol: {
                type: "simple-line",
                color: [51, 51, 204, 0.5],
                width: "4px"
            },
        polygonSymbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [51, 51, 204, 0.4],
            style: "solid",
            outline: {
                color: "white",
                width: 1
            }
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

        runQuery();
    }

    // Listener of "Clear Geometry" Button
    document
        .getElementById("clearGeometry")
        .addEventListener("click", clearGeometry);

    // Clear the geometry and set the default renderer
    function clearGeometry() {
        sketchGeometry = null;
        sketchViewModel.cancel();
        sketchLayer.removeAll();
        bufferLayer.removeAll();
        // clearHighlighting();
        clearCharts();
        // resultDiv.style.display = "none";
    }

    // set the geometry query on the visible webLayerView
    var debouncedRunQuery = promiseUtils.debounce(function () {
        if (!sketchGeometry) {
            return;
        }

        // resultDiv.style.display = "block";

        updateBufferGraphic(bufferSize);
        calculateAreaByZoning();

        return promiseUtils.eachAlways([
            queryStatistics(),
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

    function calculateAreaByZoning() {
        // getAreaInBufferByZoning(bufferSize);

        const selectedZonings = ["R(A)", "R(B)", "R(C)", "G/IC", "O", "C", "MRDJ"]

        selectedZoningsArea = selectedZonings.map(
            function (x) { return getAreaInBuffer(x, bufferSize); }
        );

        console.log(selectedZoningsArea);
/*        console.log(getAreaInBuffer("R(A)", bufferSize));*/

        Promise.all(selectedZoningsArea).then(x => {
            console.log(selectedZoningsArea, "inside all promise");
        /*            console.log(getAreaInBuffer("R(A)", bufferSize), "inside all promise");*/
            areaByZoning = selectedZonings.reduce((acc, key, index) => ({ ...acc, [key]: selectedZoningsArea[index] }), {})

            console.log(areaByZoning);


        });

    /*        Promise.all(selectedZoningsArea).then(function () {
                console.log(selectedZoningsArea);
            });*/

    /*        console.log(selectedZonings.map(
                function (x) { return getAreaInBuffer(x, bufferSize); }
            ));*/
    }

    const OZPLayer = new FeatureLayer({
        // URL to the service
        url: "https://services5.arcgis.com/xH8UmTNerx1qYfXM/arcgis/rest/services/OZP_Nov2019_Sim/FeatureServer"
    });

    function clipOZP() {
        // TODO
        geometryEngine.intersect(bufferGeometry, OZPLayer)
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
            // graphic layer can contain multiple features (i.e. length > 1)
            if (bufferLayer.graphics.length === 0) {
                bufferLayer.add(
                    new Graphic({
                        geometry: bufferGeometry,
                        // symbol: sketchViewModel.polygonSymbol,
                        symbol: {
                            type: "simple-fill",
                            color: [151, 151, 204, 0.5],
                            style: "solid",
                            outline: {
                                color: "white",
                                width: 1
                            }
                        },
                    })
                );
            } else {
                bufferLayer.graphics.getItemAt(0).geometry = bufferGeometry;
            }

            // Calculate buffer size
            var bufferGeodesicArea = geometryEngine.geodesicArea(bufferGeometry, "square-meters");

            // Format the size and update the value
            document.getElementById("buffer-size-ha").innerHTML = parseFloat((bufferGeodesicArea * 1e-4).toPrecision(3));
            document.getElementById("buffer-size-sqkm").innerHTML = parseFloat((bufferGeodesicArea * 1e-7).toPrecision(3));

        } else {
            bufferLayer.removeAll();
        }
    }


    // Get total zoning area within the buffer
    async function getAreaInBuffer(zoning, buffer) {

        if (buffer > 0) {

            var bufferGeometry = geometryEngine.geodesicBuffer(
                sketchGeometry,
                buffer,
                "meters"
            );

            // Get breakdown zoning area one by one

            var geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

            var areaInBuffer = 0;

            let query = webLayerView.createQuery();

            query.geometry = bufferGeometry;
            query.where = "ZONE_MAS = '" + zoning + "'";
            query.spatialRelationship = "intersects";

            console.log(zoning, "outside queryFeatures");

            let results = await webLayerView.queryFeatures(query);

            if (results.features.length > 0) {
                // TODO
                var selectedOZPGeoms = []

                results.features.forEach(function (item) {
                    selectedOZPGeoms.push(item.geometry)
                });

                // console.log(selectedOZPGeoms);

                var unionGeoms = geometryEngine.union(selectedOZPGeoms)
                // console.log(unionGeoms);
                console.log("union function performed");

                var bufferOZPIntersect = geometryEngine.intersect(bufferGeometry, unionGeoms);
                console.log("intersect function performed");

                areaInBuffer = geometryEngine.geodesicArea(bufferOZPIntersect, "square-meters");
                console.log("area calculated");

                console.log(areaInBuffer);

            }

            console.log(areaInBuffer, "Outside query");
            return areaInBuffer;

/*            return webLayerView.queryFeatures(query).then(function (results) {

                
                console.log(results);
                console.info(results);
                console.info(results.features);

                console.log(zoning, "in queryFeatures");

                if (results.features.length > 0) {
                    // TODO
                    var selectedOZPGeoms = []

                    results.features.forEach(function (item) {
                        selectedOZPGeoms.push(item.geometry)
                    });
                    
                    // console.log(selectedOZPGeoms);

                    var unionGeoms = geometryEngine.union(selectedOZPGeoms)
                    // console.log(unionGeoms);
                    console.log("union function performed");

                    var bufferOZPIntersect = geometryEngine.intersect(bufferGeometry, unionGeoms);
                    console.log("intersect function performed");

                    areaInBuffer = geometryEngine.geodesicArea(bufferOZPIntersect, "square-meters");
                    console.log("area calculated");

                    console.log(areaInBuffer);

                }

                console.log(areaInBuffer, "Outside query");
                return areaInBuffer;
            });*/


        }

    }

    // Calculate geodesic area of a graphic layer (multiple features possible)
    // https://community.esri.com/t5/arcgis-api-for-javascript/calculate-geodesic-area-of-polygon/td-p/367598
    function calculateGeodesicArea(graphicsLayer) {
      // TODO

      // var GeodesicArea = 0
      //
      // graphicsLayer.graphics.map(function (grap) {
      //   GeodesicArea = geometryEngine.geodesicArea(grap.geometry, "square-meters");
      // });
      //
      // return GeodesicArea;
    }


    // Highlight feautres within buffer area
    // Not used now

    var highlightHandle = null;

    function clearHighlighting() {
        if (highlightHandle) {
            highlightHandle.remove();
            highlightHandle = null;
        }
    }

    // Highlight (i.e. select) the geometries selected in the OZP layer
    function highlightGeometries(objectIds) {
        // Remove any previous highlighting
        clearHighlighting();

        const objectIdField = webLayer.objectIdField;
        document.getElementById("count").innerHTML = objectIds.length;

        highlightHandle = webLayerView.highlight(objectIds);
    }

    // Change count of features within buffer
    function changeFeatureCount(objectIds) {
        document.getElementById("count").innerHTML = objectIds.length;
    }

    function updateMapLayer() {
        const query = webLayerView.createQuery();

        query.geometry = sketchGeometry;
        query.distance = bufferSize;

        return webLayerView.queryObjectIds(query).then(changeFeatureCount);
        // return webLayerView.queryObjectIds(query).then(highlightGeometries);
    }

    const statDefinitions = [
        {
            onStatisticField:
                "CASE WHEN ZONE_MAS = 'R(A)' THEN 1 ELSE 0 END",
            outStatisticFieldName: "zone_RA",
            statisticType: "sum"
        },
        {
            onStatisticField:
                "CASE WHEN ZONE_MAS = 'R(B)' THEN 1 ELSE 0 END",
            outStatisticFieldName: "zone_RB",
            statisticType: "sum"
        },
        {
            onStatisticField:
                "CASE WHEN ZONE_MAS = 'R(C)' THEN 1 ELSE 0 END",
            outStatisticFieldName: "zone_RC",
            statisticType: "sum"
        },
        {
            onStatisticField:
                "CASE WHEN ZONE_MAS = 'G/IC' THEN 1 ELSE 0 END",
            outStatisticFieldName: "zone_GIC",
            statisticType: "sum"
        },
        {
            onStatisticField:
                "CASE WHEN ZONE_MAS = 'O' THEN 1 ELSE 0 END",
            outStatisticFieldName: "zone_O",
            statisticType: "sum"
        },
        {
            onStatisticField:
                "CASE WHEN ZONE_MAS = 'C' THEN 1 ELSE 0 END",
            outStatisticFieldName: "zone_C",
            statisticType: "sum"
        }
    ];


    function queryStatistics() {

        const query = webLayerView.createQuery();

        query.geometry = sketchGeometry;
        query.distance = bufferSize;
        query.outStatistics = statDefinitions;

        return webLayerView.queryFeatures(query).then(function (result) {

            // console.log(result);

            const allStats = result.features[0].attributes;

            updateChart(zoningNumberChart, [
                allStats.zone_RA,
                allStats.zone_RB,
                allStats.zone_RC,
                allStats.zone_GIC,
                allStats.zone_O,
                allStats.zone_C,
            ]);
        }, console.error);
    }

    createzoningNumberChart();


    document.getElementById("lastModified").innerHTML = document.lastModified;
});
