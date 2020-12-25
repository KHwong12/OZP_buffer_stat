/// *** Create Charts *** ///

var zoningLabels = [
    "R(A)",
    "R(B)",
    "R(C)",
    "G/IC",
    "O",
    "C",
    "Others"
];

var zoningColors = [
    '#a1291f',
    '#c27428',
    '#e6b831',
    '#bee1e6',
    '#7eb827',
    '#eb5b60',
    '#cccccc'
];

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
                data: [0, 0, 0, 0, 0, 0, 0]
            }]
        },
        options: {
            responsive: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Zoning Pieces"
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
                data: [0, 0, 0, 0, 0, 0, 0]
            }]
        },
        options: {
            responsive: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Distribution of zoning areas (sq.m.)"
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
    updateChart(zoningNumberChart, [0, 0, 0, 0, 0, 0, 0]);
    updateChart(zoningAreaChart, [0, 0, 0, 0, 0, 0, 0]);
    document.getElementById("count").innerHTML = 0;
}
