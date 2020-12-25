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
    "esri/widgets/Expand"
], function(
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
    Expand
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
        center: [114.172, 22.281], // lon, lat
        constraints: {
            maxScale: 0,
            minScale: 200000,
            rotationEnabled: false
        }
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
    webmap.load().then(function() {
        webLayer = webmap.layers.find(function(layer) {
            // title of layer, not name of the webmap
            return layer.title === "OZP_Nov2019_Sim";
        });
        // Fetch all fields
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#outFields
        webLayer.outFields = ["*"];

        view.whenLayerView(webLayer).then(function(layerView) {
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
        content: "<div style='width:200px; padding:10px; background-color: #242424cc'><b>Click</b> the buttons to <b>draw</b> your area of interest. For lines and polygons, double click to finish drawing. <br><br><b>Move</b> the slider to change the buffer distance.</div>"
    });

    view.ui.add(instructionsExpand, "top-left");

    // Close the 'help' popup when view is focused
    view.watch("focused", function(isFocused) {
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
        defaultCreateOptions: {
            hasZ: false
        }
    });

    // query the OZP layer when geometry is created or updated
    sketchViewModel.on("create", function(event) {
        if (event.state === "complete") {
            sketchGeometry = event.graphic.geometry;
            console.log(sketchGeometry)
            runQuery();
        }
    });

    sketchViewModel.on("update", function(event) {
        if (event.state === "complete") {
            sketchGeometry = event.graphics[0].geometry;
            console.log(sketchGeometry)
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
        clearResults();
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
        labelFormatFunction: function(value, type) {
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

    // Listener of "Clear Results" Button
    document
        .getElementById("clearResults")
        .addEventListener("click", clearResults);

    // Clear the geometry and set the default renderer
    // Reset all to default
    function clearResults() {
        sketchGeometry = null;
        sketchViewModel.cancel();
        sketchLayer.removeAll();
        bufferLayer.removeAll();
        // clearHighlighting();
        clearCharts();

        document.getElementById("buffer-size-ha").innerHTML = 0;
        document.getElementById("buffer-size-sqkm").innerHTML = 0;
        document.getElementById("OZP-size-ha").innerHTML = 0;
        document.getElementById("OZP-size-sqkm").innerHTML = 0;
        // resultDiv.style.display = "none";
    }

    // set the geometry query on the visible webLayerView
    var debouncedRunQuery = promiseUtils.debounce(function() {
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

    async function calculateAreaByZoning() {
        // getAreaInBufferByZoning(bufferSize);

        var selectedZoningAreas = [];

        const selectedZonings = ["R(A)", "R(B)", "R(C)", "G/IC", "O", "C"];
        // const selectedZonings = ["R(A)", "R(B)", "R(C)", "G/IC", "O", "C", "MRDJ"]

        // TODO: improve efficiency with async + map array
        // https://flaviocopes.com/javascript-async-await-array-map/

        for (var zoning of selectedZonings) {
            selectedZoningAreas.push(await getAreaInBuffer(bufferSize, zoning));
        }

        var totalAreaInOZP = await getAreaInBuffer(bufferSize);
        console.log("totalAreaInOZP: ", totalAreaInOZP);

        // Format the size and update the value
        document.getElementById("OZP-size-ha").innerHTML = parseFloat((totalAreaInOZP * 1e-4).toPrecision(3));
        document.getElementById("OZP-size-sqkm").innerHTML = parseFloat((totalAreaInOZP * 1e-7).toPrecision(3));


        // https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
        majorZoningsTotalArea = selectedZoningAreas.reduce((partial_sum, a) => partial_sum + a, 0);

        // Get total area of other zonings
        selectedZoningAreas.push(totalAreaInOZP - majorZoningsTotalArea);

        console.log(selectedZoningAreas);

        console.log("updating zoning area chart!");

        // Round to nearest integer for readability
        updateChart(zoningAreaChart, selectedZoningAreas.map(Math.round));


        /*        var selectedZoningsArea = await selectedZonings.map(
                    async function (x) { return await getAreaInBuffer(x, bufferSize); }
                );


        /*        console.log(getAreaInBuffer("R(A)", bufferSize));*/
        /*

                const test1 = Promise.all(selectedZoningsArea).then(x => {
                    console.log(selectedZoningsArea, "inside all promise");
                            console.log(getAreaInBuffer("R(A)", bufferSize), "inside all promise");
                    areaByZoning = selectedZonings.reduce((acc, key, index) => ({ ...acc, [key]: selectedZoningsArea[index] }), {})

                    console.log(areaByZoning["R(A)"]);

                    alert(areaByZoning["R(A)"]);
                });

                const test = async () => {
                    const a = await test1;
                    console.log(a);
                    alert("async here");
                };*/

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
        geometryEngine.intersect(bufferGeometry, OZPLayer);
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
    // if zoning is provided, get total area of that specific zoning
    // async function, will wait until query process finished, not suitable for large dataset

    // Steps: query OZP in featurelayer intersect with buffer (select by location) and in that zoning (select by attributes)
    // -> union all "selected" zoning (needed?)
    // -> use buffer to intersect (act as cookie cutter) to cut the result geoms -> calculate geom area

    // TODO: to improve, find ways to clip FeatureLayer by Graphics, GeometryEngine seems only works with grahpics
    async function getAreaInBuffer(buffer, zoning) {

        // TODO: test if Only execute function when buffer has actual size?

        var geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

        var areaInBuffer = 0;

        let query = webLayerView.createQuery();

        query.geometry = sketchGeometry;
        query.distance = bufferSize;

        // If zoning params is provided
        // https://stackoverflow.com/questions/13019640/how-to-test-if-a-parameter-is-provided-to-a-function
        if (zoning !== undefined) {
            query.where = "ZONE_MAS = '" + zoning + "'";
            console.log("Will query zoning of " + zoning + " intersects with buffer");
        }

        query.spatialRelationship = "intersects";

        // console.log(zoning, "outside queryFeatures");

        let results = await webLayerView.queryFeatures(query);

        console.log("Queried zoning intersects with buffer");
        console.log(results);

        // Check if any features intersect with the buffer
        // If no, length of results will be 0, i.e. area in buffer = 0
        if (results.features.length > 0) {

            //
            var selectedOZPGeoms = [];

            // results is a query, but only gemoetry of the queried is needed
            // Get the geometry value inside the object
            results.features.forEach(function(item) {
                selectedOZPGeoms.push(item.geometry);
            });

            // console.log(selectedOZPGeoms);

            // bufferGeometry is required for intersecting OZP
            var bufferGeometry = geometryEngine.geodesicBuffer(
                sketchGeometry,
                buffer,
                "meters"
            );

            var unionGeoms = await geometryEngine.union(selectedOZPGeoms);
            // console.log("union function performed");

            var bufferOZPIntersect = await geometryEngine.intersect(bufferGeometry, unionGeoms);
            // console.log("intersect function performed");

            areaInBuffer = await geometryEngine.geodesicArea(bufferOZPIntersect, "square-meters");
            console.log("area calculated");

            console.log(areaInBuffer);

        }

        return areaInBuffer;
    }

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

    const statDefinitions = [{
            onStatisticField: "CASE WHEN ZONE_MAS = 'R(A)' THEN 1 ELSE 0 END",
            outStatisticFieldName: "zone_RA",
            statisticType: "sum"
        },
        {
            onStatisticField: "CASE WHEN ZONE_MAS = 'R(B)' THEN 1 ELSE 0 END",
            outStatisticFieldName: "zone_RB",
            statisticType: "sum"
        },
        {
            onStatisticField: "CASE WHEN ZONE_MAS = 'R(C)' THEN 1 ELSE 0 END",
            outStatisticFieldName: "zone_RC",
            statisticType: "sum"
        },
        {
            onStatisticField: "CASE WHEN ZONE_MAS = 'G/IC' THEN 1 ELSE 0 END",
            outStatisticFieldName: "zone_GIC",
            statisticType: "sum"
        },
        {
            onStatisticField: "CASE WHEN ZONE_MAS = 'O' THEN 1 ELSE 0 END",
            outStatisticFieldName: "zone_O",
            statisticType: "sum"
        },
        {
            onStatisticField: "CASE WHEN ZONE_MAS = 'C' THEN 1 ELSE 0 END",
            outStatisticFieldName: "zone_C",
            statisticType: "sum"
        }
    ];


    function queryStatistics() {

        const query = webLayerView.createQuery();

        query.geometry = sketchGeometry;
        query.distance = bufferSize;
        query.outStatistics = statDefinitions;

        return webLayerView.queryFeatures(query).then(function(result) {

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
    createzoningAreaChart();

    document.getElementById("lastModified").innerHTML = document.lastModified;
});
