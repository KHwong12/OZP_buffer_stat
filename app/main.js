import { changeMenuIcon } from "./ui";
import { zoningNumberChart, zoningAreaChart, updateChart, clearCharts } from "./create-chart";


import Map from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import Slider from "@arcgis/core/widgets/Slider";
import { geodesicBuffer, geodesicArea, union, intersect } from "@arcgis/core/geometry/geometryEngine";
import Graphic from "@arcgis/core/Graphic";
import { debounce, eachAlways } from "@arcgis/core/core/promiseUtils";
import Expand from "@arcgis/core/widgets/Expand";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";

const map = new Map({
  basemap: "gray-vector"
});

const zonePopupTemplate = new PopupTemplate({
  title: "Zoning Details",
  defaultPopupTemplateEnabled: true,
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "ZONE_LABEL",
          label: "ZONE_LABEL"
        },
        {
          fieldName: "DESC_ENG",
          label: "DESC_ENG"
        },
        {
          fieldName: "DESC_CHT",
          label: "DESC_CHT"
        },
        {
          fieldName: "SPUSE_ENG",
          label: "SPUSE_ENG"
        },
        {
          fieldName: "SPUSE_CHT",
          label: "SPUSE_CHT"
        },
        {
          fieldName: "PLAN_NO",
          label: "PLAN_NO"
        },
        {
          fieldName: "NAME_ENG",
          label: "NAME_ENG"
        },
        {
          fieldName: "NAME_CHT",
          label: "NAME_CHT"
        },
        {
          fieldName: "PUB_DATE",
          label: "PUB_DATE"
        },
        {
          fieldName: "APRV_DATE",
          label: "APRV_DATE"
        },
        {
          fieldName: "SECT_NO",
          label: "SECT_NO"
        }
      ]
    }
  ]
});

const zone = new FeatureLayer({
  url: "https://services5.arcgis.com/xH8UmTNerx1qYfXM/ArcGIS/rest/services/ZONE_MASTER_LATEST/FeatureServer",
  outFields: ["*"],
  popupTemplate: zonePopupTemplate
});

const schemeArea = new FeatureLayer({
  url: "https://services5.arcgis.com/xH8UmTNerx1qYfXM/arcgis/rest/services/PLAN_SCHEME_AREA_20220224/FeatureServer",
  outFields: ["*"]
});

// Put zoning polygons to the bottom. bottom-most layer has an index of 0.
map.add(zone, 0);
map.add(schemeArea);

// create the MapView
const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 14,
  center: [114.172, 22.281], // lon, lat
  constraints: {
    maxScale: 0,
    minScale: 200000,
    rotationEnabled: false
  }
});

// window.view = view;

// add a GraphicsLayer for the sketches and the buffer
const sketchLayer = new GraphicsLayer();
const bufferLayer = new GraphicsLayer();
view.map.addMany([bufferLayer, sketchLayer]);

const featureToQuery = zone;
let bufferSize = 0;

// https://developers.arcgis.com/javascript/latest/sample-code/widgets-scalebar/index.html
const scaleBar = new ScaleBar({
  view: view,
  unit: "metric"
});

// Add the widget to the bottom left corner of the view
view.ui.add(scaleBar, {
  position: "bottom-right"
});

const queryPanel = document.getElementById("queryDiv");

zone
  .load()
  .then(() => {
    queryPanel.style.display = "block";
  });

view.ui.add([queryDiv], "bottom-left");

// https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html
// https://developers.arcgis.com/javascript/latest/sample-code/layers-imagery-clientside/index.html
const instructionsExpand = new Expand({
  expandIconClass: "esri-icon-question",
  expandTooltip: "How to use",
  view: view,
  expanded: true,
  content: "<div class='expand-widget'><b>Click</b> the buttons to <b>draw</b> your area of interest. For lines and polygons, <b>double click</b> to finish drawing. <br><br><b>Move</b> the slider to change the buffer distance.</div>"
});

view.ui.add(instructionsExpand, "top-left");

// Close the 'help' popup when view is focused
view.watch("focused", function (isFocused) {
  if (isFocused) {
    instructionsExpand.expanded = false;
  }
});

// Create a BasemapGallery widget instance and set
// its container to a div element
// https://developers.arcgis.com/javascript/latest/sample-code/widgets-expand/index.html

const basemapGallery = new BasemapGallery({
  view: view,
  container: document.createElement("div")
});

// Create an Expand instance and set the content
// property to the DOM node of the basemap gallery widget
// Use an Esri icon font to represent the content inside
// of the Expand widget

const bgExpand = new Expand({
  view: view,
  content: basemapGallery,
  expandTooltip: "Change Basemap"
});

// close the expand whenever a basemap is selected
basemapGallery.watch("activeBasemap", function () {
  const mobileSize =
          view.heightBreakpoint === "xsmall" ||
          view.widthBreakpoint === "xsmall";

  if (mobileSize) {
    bgExpand.collapse();
  }
});

// Add the expand instance to the ui
view.ui.add(bgExpand, "top-left");

/// ///////////////////////////////////////
// web map now initialised
/// ///////////////////////////////////////

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
sketchViewModel.on("create", function (event) {
  if (event.state === "complete") {
    sketchGeometry = event.graphic.geometry;
    showSidePanel();
    runQuery();
  }
});

sketchViewModel.on("update", function (event) {
  if (event.state === "complete") {
    sketchGeometry = event.graphics[0].geometry;
    showSidePanel();
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

function geometryButtonsClickHandler (event) {
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

function bufferVariablesChanged (event) {
  bufferSize = event.value;
  runQuery();
}

// Listener of "Clear Results" Button
document
  .getElementById("clearResults")
  .addEventListener("click", clearResults);

// Show sidePanel again if folded
// do not use it when users are changing buffer variables only
function showSidePanel () {
  const sidebar = document.querySelector(".sidebar");

  // If a class that the element is already a member of is added, classList.add will ignore it
  sidebar.classList.add("open");
}

// Clear the geometry and set the default renderer
// Reset all to default
function clearResults () {
  sketchGeometry = null;
  sketchViewModel.cancel();
  sketchLayer.removeAll();
  bufferLayer.removeAll();
  // clearHighlighting();
  clearCharts();

  // Clear numbers
  document.getElementById("count").innerHTML = 0;
  document.getElementById("query-geometry-size-ha").innerHTML = 0;
  document.getElementById("query-geometry-size-sqkm").innerHTML = 0;
  document.getElementById("OZP-size-ha").innerHTML = 0;
  document.getElementById("OZP-size-sqkm").innerHTML = 0;
}

const selectedZonings = ["R(A)", "R(B)", "R(C)", "G/IC", "O", "C", "MRDJ"];

// set the geometry query on the visible webLayerView
const debouncedRunQuery = debounce(function () {
  if (!sketchGeometry) {
    return;
  }

  updateBufferGraphic(bufferSize);

  // Update geometry stats
  updateQueryGeomSize(sketchGeometry, bufferSize);

  // calculate area of each zoning type, then update the zoning area chart & area figures
  calculateAreaByZoning();

  return eachAlways([
    queryStatistics(),
    updateMapLayer()
  ]);
});

function runQuery () {
  debouncedRunQuery().catch((error) => {
    if (error.name === "AbortError") {
      return;
    }

    console.error(error);
  });

  // scroll to the results
  const elmnt = document.querySelector(".query-stats");
  elmnt.scrollIntoView({ behavior: "smooth" });
}

async function calculateAreaByZoning () {
  console.time("test_parallel");

  // Need to access var outside the try loop, therefore need to declare the variable first
  // https://stackoverflow.com/questions/40925094/javascript-set-const-variable-inside-of-a-try-block
  let selectedZoningAreas;

  // map to get land area of each zoning type (parallelly await)
  // faster then the above method (sequentially await) with .push(await)
  // https://stackoverflow.com/questions/45285129/any-difference-between-await-promise-all-and-multiple-await
  try {
    selectedZoningAreas = await Promise.all(
      selectedZonings.map(zoning => getZoningAreaInBuffer(bufferSize, zoning))
    );

    console.log("selectedZoningAreas: ", selectedZoningAreas);
  } catch (error) {
    console.error("error: ", error);
  }

  console.timeEnd("test_parallel");

  // cannot directly add up selectedZoningAreas since it only includes values of SELECTED zonings
  const totalAreaInOZP = await getZoningAreaInBuffer(bufferSize);
  console.log("totalAreaInOZP: ", totalAreaInOZP);

  // Format the size and update the value
  document.getElementById("OZP-size-ha").innerHTML = (totalAreaInOZP * 1e-4).toLocaleString();
  document.getElementById("OZP-size-sqkm").innerHTML = (totalAreaInOZP * 1e-6).toLocaleString();

  // Get total area of all zoning types
  // https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
  const majorZoningsTotalArea = selectedZoningAreas.reduce((partialSum, a) => partialSum + a, 0);

  // Add total area of other zonings at the end of the zoning area array
  selectedZoningAreas.push(totalAreaInOZP - majorZoningsTotalArea);

  console.log("selectedZoningAreas", selectedZoningAreas);

  console.log("updating zoning area chart!");

  // Round to nearest integer for readability
  updateChart(zoningAreaChart, selectedZoningAreas.map(Math.round));
}

// update graphic and size figure of buffer
function updateBufferGraphic (buffer) {
  // add a polygon graphic for the buffer
  if (buffer > 0) {
    const bufferGeometry = geodesicBuffer(
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
          }
        })
      );
    } else {
      bufferLayer.graphics.getItemAt(0).geometry = bufferGeometry;
    }
  } else {
    bufferLayer.removeAll();
  }
}

function updateQueryGeomSize (queryGeom, buffer) {
  let queryGeomGeodesicArea = 0;

  // if buffer > 0, compute buffer geom
  if (buffer > 0) {
    const bufferGeometry = geodesicBuffer(
      queryGeom,
      buffer,
      "meters"
    );

    // Calculate buffer size
    queryGeomGeodesicArea = geodesicArea(bufferGeometry, "square-meters");

    // else if query geometry is a polygon, get the size of it (line and point must size area of 0)
  } else if (queryGeom.type === "polygon") {
    queryGeomGeodesicArea = geodesicArea(queryGeom, "square-meters");
  }

  // Format the size and update the value
  document.getElementById("query-geometry-size-ha").innerHTML = (queryGeomGeodesicArea * 1e-4).toLocaleString();
  document.getElementById("query-geometry-size-sqkm").innerHTML = (queryGeomGeodesicArea * 1e-6).toLocaleString();
}

// Get total zoning area within the buffer
// if zoning is provided, get total area of that specific zoning
// async function as the queryFeatures() process is a promise
// Will wait until query process finished, not suitable for large dataset

// Steps: query OZP in featurelayer intersect with buffer (select by location) and in that zoning (select by attributes)
// -> union all "selected" zoning (needed?)
// -> use buffer to intersect (act as cookie cutter) to cut the result geoms -> calculate geom area

// TODO: to improve, find ways to clip FeatureLayer by Graphics, GeometryEngine seems only works with graphics
async function getZoningAreaInBuffer (bufferLength, zoning) {
  // console.log("sketchGeometry: ", sketchGeometry);
  // console.log("bufferLength === 0:", bufferLength === 0);

  // TODO: test if Only execute function when buffer has actual size?
  // TODO: write unit test

  // Sanity Check to ensure the query is not point or line (i.e. query geom has 0 area)
  // return 0 (or should be null)?
  if (bufferLength === 0 && sketchGeometry.type !== "polygon") {
    console.log("The query geometry is a point/line. Returning area of 0.");
    return 0;
  }

  let areaInBuffer = 0;

  const query = featureToQuery.createQuery();

  query.geometry = sketchGeometry;
  query.distance = bufferLength;
  query.spatialRelationship = "intersects";

  // Select by zoning attributes if zoning params is provided
  // https://stackoverflow.com/questions/13019640/how-to-test-if-a-parameter-is-provided-to-a-function
  if (zoning !== undefined) {
    query.where = `ZONE_MAS = '${zoning}'`;
    console.log(`Query zoning of ${zoning} intersects with buffer`);
  }

  const results = await featureToQuery.queryFeatures(query);

  // console.log("Queried zoning intersects with buffer");
  // console.log(results);

  // Check if any features intersect with the buffer
  // If no, length of results will be 0, i.e. area in buffer = 0
  if (results.features.length > 0) {
    //
    const selectedOZPGeoms = [];

    // results is a query, but only gemoetry of the queried is needed
    // Get the geometry value inside the object
    results.features.forEach(function (item) {
      selectedOZPGeoms.push(item.geometry);
    });

    // bufferGeometry is required for intersecting OZP
    const bufferGeometry = geodesicBuffer(
      sketchGeometry,
      bufferLength,
      "meters"
    );

    // "Union" to merge the selected OZP zones into one single layer for intersect use
    const unionGeoms = await union(selectedOZPGeoms);
    // console.log("union function performed");

    const bufferOZPIntersect = await intersect(bufferGeometry, unionGeoms);
    // console.log("intersect function performed");

    areaInBuffer = await geodesicArea(bufferOZPIntersect, "square-meters");
    // console.log("getZoningAreaInBuffer(): area calculated");
    // console.log("areaInBuffer: ", areaInBuffer);
  }

  return areaInBuffer;
}

// Calculate geodesic area of a graphic layer (multiple features possible)
// https://community.esri.com/t5/arcgis-api-for-javascript/calculate-geodesic-area-of-polygon/td-p/367598
function calculateGeodesicArea (graphicsLayer) {
  // TODO

  // var GeodesicArea = 0
  //
  // graphicsLayer.graphics.map(function (grap) {
  //   GeodesicArea = geodesicArea(grap.geometry, "square-meters");
  // });
  //
  // return GeodesicArea;
}

// Highlight feautres within buffer area
// Not used now

let highlightHandle = null;

function clearHighlighting () {
  if (highlightHandle) {
    highlightHandle.remove();
    highlightHandle = null;
  }
}

// Highlight (i.e. select) the geometries selected in the OZP layer
function highlightGeometries (objectIds) {
  // Remove any previous highlighting
  clearHighlighting();

  const objectIdField = webLayer.objectIdField;
  document.getElementById("count").innerHTML = objectIds.length;

  highlightHandle = featureToQuery.highlight(objectIds);
}

// Change count of features within buffer
function changeFeatureCount (objectIds) {
  document.getElementById("count").innerHTML = objectIds.length;
}

function updateMapLayer () {
  const query = featureToQuery.createQuery();

  query.geometry = sketchGeometry;
  query.distance = bufferSize;

  return featureToQuery.queryObjectIds(query).then(changeFeatureCount);
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
},
{
  onStatisticField: "CASE WHEN ZONE_MAS = 'MRDJ' THEN 1 ELSE 0 END",
  outStatisticFieldName: "zone_MRDJ",
  statisticType: "sum"
},
{
  onStatisticField: "CASE WHEN ZONE_MAS NOT IN ('R(A)', 'R(B)', 'R(C)', 'G/IC', 'O', 'C', 'MRDJ') THEN 1 ELSE 0 END",
  outStatisticFieldName: "zone_OTHERS",
  statisticType: "sum"
}
];

function queryStatistics () {
  // https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-Query.html
  const query = featureToQuery.createQuery();

  query.geometry = sketchGeometry;
  query.distance = bufferSize;
  query.outStatistics = statDefinitions;

  // with outStatistics returned result is a "table" with geometry of null
  return featureToQuery.queryFeatures(query).then(function (result) {
    // console.log(result);

    const allStats = result.features[0].attributes;

    updateChart(zoningNumberChart, [
      allStats.zone_RA,
      allStats.zone_RB,
      allStats.zone_RC,
      allStats.zone_GIC,
      allStats.zone_O,
      allStats.zone_C,
      allStats.zone_MRDJ,
      allStats.zone_OTHERS
    ]);
  }, console.error);
}


/* sidebar */

const sidebar = document.querySelector(".sidebar");
const collapseBtn = document.querySelector("#collapse-button");

// Show animation of expanding side panel when webpage is first initialised
sidebar.classList.toggle("open");
changeMenuIcon(sidebar, collapseBtn);

collapseBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  changeMenuIcon(sidebar, collapseBtn);
});
