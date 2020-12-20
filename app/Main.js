require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/geometry/Extent"
], function (
    WebMap,
    MapView,
    FeatureLayer,
    Extent
) {
    // Load webscene and display it in a SceneView
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

});
