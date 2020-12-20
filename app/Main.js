require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/geometry/Extent"
], function (
    Map,
    MapView,
    FeatureLayer,
    Extent
) {
    // Load webscene and display it in a SceneView
    const map = new Map({
        basemap: "dark-gray-vector"
    });
    // create the SceneView
    const view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 10,
        center: [114.145, 22.360] // lon, lat
    });


    const layer = new FeatureLayer({
        portalItem: {   // autocasts as new PortalItem
            id: "d32594d7352e40a291603bfd6a57f0fa"
        }
    });

    map.add(layer);  // adds the layer to the map




});
