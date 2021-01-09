/// *** Create Charts *** ///

var zoningLabels = [
    "R(A)",
    "R(B)",
    "R(C)",
    "G/IC",
    "O",
    "C",
    "MRDJ",
    "Others"
];

var zoningColors = [
    '#a1291f',
    '#c27428',
    '#e6b831',
    '#bee1e6',
    '#7eb827',
    '#eb5b60',
    '#FCE0BD',
    '#cccccc'
];

// An array of 0 with the same length of zoningLabels
var zeroArray = [...Array(zoningLabels.length)].map(() => 0);

function createzoningNumberChart() {

    const zoningNumberCanvas = document.getElementById("zoning-number-chart");

    zoningNumberChart = new Chart(zoningNumberCanvas.getContext("2d"), {
        type: "horizontalBar",
        data: {
            labels: zoningLabels,
            datasets: [{
                label: "Number of pieces",
                backgroundColor: zoningColors,
                stack: "Stack 0",
                data: zeroArray
            }]
        },
        options: {
            responsive: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Zoning pieces"
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        precision: 0
                    }
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}

function createzoningAreaChart() {

    const zoningAreaCanvas = document.getElementById("zoning-area-chart");

    zoningAreaChart = new Chart(zoningAreaCanvas.getContext("2d"), {
        type: "doughnut",
        data: {
            labels: zoningLabels,
            datasets: [{
                label: "Area (sq.m.)",
                backgroundColor: zoningColors,
                borderWidth: 0,
                data: zeroArray
            }]
        },
        options: {
            responsive: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Distribution of zoning areas"
            },
            // Add thousand separator & wihtout title
            // https://josephfitzsimmons.com/adding-a-thousands-separator-to-chartjss-y-axis-and-tooltips/
            tooltips: {
                // Add percentages
                // https://stackoverflow.com/questions/37257034/chart-js-2-0-doughnut-tooltip-percentages/49717859#49717859
                callbacks: {
                    label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                        var total = meta.total;
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                        return ' ' + currentValue.toLocaleString() + ' sq.m.' + ' (' + percentage + '%)';
                    },
                    title: function (tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    }
                }
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
    updateChart(zoningNumberChart, zeroArray);
    updateChart(zoningAreaChart, zeroArray);
}
