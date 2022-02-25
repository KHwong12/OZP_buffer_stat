/// *** Create Charts *** ///

// https://www.chartjs.org/docs/latest/general/fonts.html
// White text colour and font same as esri theme css
Chart.defaults.global.defaultFontColor = '#232323'
Chart.defaults.global.defaultFontFamily = "'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif"
Chart.defaults.global.defaultFontSize = 12

const zoningLabels = [
  'R(A)',
  'R(B)',
  'R(C)',
  'G/IC',
  'O',
  'C',
  'MRDJ',
  'Others'
]

const zoningLabelsFull = [
  'Residential (Group A)',
  'Residential (Group B)',
  'Residential (Group C)',
  'Government, Institution or Community',
  'Open Space',
  'Commercial',
  'Major Road and Junction',
  'Others'
]

const zoningColors = [
  '#a1291f',
  '#c27428',
  '#e6b831',
  '#bee1e6',
  '#7eb827',
  '#eb5b60',
  '#FCE0BD',
  '#cccccc'
]

// An array of 0 with the same length of zoningLabels
const zeroArray = [...Array(zoningLabels.length)].map(() => 0)

const zoningNumberCanvas = document.getElementById('zoning-number-chart')

// Create the "number of zoning pieces" chart
export const zoningNumberChart = new Chart(zoningNumberCanvas.getContext('2d'), {
  type: 'horizontalBar',
  data: {
    labels: zoningLabels,
    datasets: [{
      label: 'Number of pieces',
      backgroundColor: zoningColors,
      stack: 'Stack 0',
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
      fontSize: 16,
      text: 'Zoning pieces'
    },
    scales: {
      xAxes: [{
        stacked: true,
        // remove grid lines
        gridLines: {
          display: false,
          color: '#FFFFFF33'
        },
        ticks: {
          beginAtZero: true,
          precision: 0
        }
      }],
      yAxes: [{
        stacked: true,
        // yAxes is zoning category, no need lines
        gridLines: {
          display: false,
          color: '#232323'
        }
      }]
    }
  }
})

const zoningAreaCanvas = document.getElementById('zoning-area-chart')

// Create the "area by zoning" chart
export const zoningAreaChart = new Chart(zoningAreaCanvas.getContext('2d'), {
  type: 'doughnut',
  data: {
    labels: zoningLabelsFull,
    datasets: [{
      label: 'Area (sq.m.)',
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
      fontSize: 16,
      text: 'Distribution of zoning areas'
    },
    // Add thousand separator & wihtout title
    // https://josephfitzsimmons.com/adding-a-thousands-separator-to-chartjss-y-axis-and-tooltips/
    tooltips: {
      // Add percentages
      // https://stackoverflow.com/questions/37257034/chart-js-2-0-doughnut-tooltip-percentages/49717859#49717859
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex]
          const meta = dataset._meta[Object.keys(dataset._meta)[0]]
          const total = meta.total
          const currentValue = dataset.data[tooltipItem.index]
          const percentage = parseFloat((currentValue / total * 100).toFixed(1))
          return ' ' + currentValue.toLocaleString() + ' sq.m.' + ' (' + percentage + '%)'
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index]
        }
      }
    }
  }
})

// Updates the given chart with new data
export function updateChart (chart, dataValues) {
  chart.data.datasets[0].data = dataValues
  chart.update()
}

export function clearCharts () {
  updateChart(zoningNumberChart, zeroArray)
  updateChart(zoningAreaChart, zeroArray)
}
