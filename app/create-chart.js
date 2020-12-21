/// *** Create Charts *** ///

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
