
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

export function queryStatistics (zoningFeature, sketchGeometry, bufferSize) {
  // https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-Query.html
  const query = zoningFeature.createQuery();

  query.geometry = sketchGeometry;
  query.distance = bufferSize;
  query.outStatistics = statDefinitions;

  // with outStatistics returned result is a "table" with geometry of null
  return zoningFeature.queryFeatures(query).then(function (result) {
    // console.log(result);

    const allStats = result.features[0].attributes;

    return allStats;
  }, console.error);
}
