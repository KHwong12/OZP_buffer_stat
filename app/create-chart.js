/// *** Create Charts *** ///

function queryStatistics() {
    // TODO
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

    const query = webLayerView.createQuery();
    query.geometry = sketchGeometry;
    query.distance = bufferSize;
    query.outStatistics = statDefinitions;

    return webLayerView.queryFeatures(query).then(function (result) {
        const allStats = result.features[0].attributes;

        console.log(result);

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

function createzoningNumberChart() {

    const zoningNumberCanvas = document.getElementById("zoning-number-chart");

    zoningNumberChart = new Chart(zoningNumberCanvas.getContext("2d"), {
        type: "horizontalBar",
        data: {
            labels: [
                "R(A)",
                "R(B)",
                "R(C)",
                "G/IC",
                "O",
                "C"
            ],
            datasets: [
                {
                    label: "Zoning",
                    backgroundColor: "#149dcf",
                    stack: "Stack 0",
                    data: [0, 0, 0, 0, 0, 0]
                }
            ]
        },
        options: {
            responsive: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Zoning"
            },
            scales: {
                xAxes: [
                    {
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                            precision: 0
                        }
                    }
                ],
                yAxes: [
                    {
                        stacked: true
                    }
                ]
            }
        }
    });
}

// Updates the given chart with new data
function updateChart(chart, dataValues) {
    chart.data.datasets[0].data = dataValues;
    chart.update();
}

function clearCharts() {
    updateChart(zoningNumberChart, [0, 0, 0, 0, 0, 0]);
    document.getElementById("count").innerHTML = 0;
}
