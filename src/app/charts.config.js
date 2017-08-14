module.exports = {
  gdp: { /* GDP compare Chart */
    type: 'GeoChart', /* https://developers.google.com/chart/interactive/docs/gallery/geochart */
    data: {
      cols: [
        {id: "country", label: "Country", type: "string"},
        {id: "continent", label: "Region", type: "number"},
        {id: 'name', label: 'name', type: 'string', role: 'tooltip'}
      ],
      rows: []
    },
    options: {
      width: '100%',
      keepAspectRatio: true,
      colorAxis: {
        colors: ['#795548', '#4CAF50', '#F44336', '#03A9F4', '#FF9800'],
        values: [0, 1, 2, 3, 4]
      },
      legend: 'none'
    }
  },
  history: { /* Timeline Chart */
    type: 'BubbleChart', /* https://developers.google.com/chart/interactive/docs/gallery/bubblechart */
    data: {
      cols: [
        {id: "country", label: "Country", type: "string"}, /* Label */
        {id: "gdp", label: "Total GDP", type: "number"}, /* X Axis */
        {id: "gdppercapita", label: "GDP per capita", type: "number"}, /* Y Axis */
        {id: "region", label: "Region", type: "string"}, /* Y Axis */
        {id: "population", label: "Population", type: "number"} /* Circle Radius */
      ],
      rows: []
    },
    options: {
      width: '100%',
      keepAspectRatio: true,
      chartArea: {
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%'
      },
      // title: 'CORRELATION BETWEEN GDP, GDP/CAPITA AND POPULATION OF THE WORLD COUNTRIES',
      // titleTextStyle: {
      //   fontSize: 16,
      // },
      hAxis: {
        title: 'Total GDP, $',
        format: 'short',
        textPosition: 'in'
      },
      vAxis: {
        title: 'GDP per Capita, $',
        format: 'short'
      },
      bubble: {
        textStyle: {
          fontSize: 11
        }
      },
      series: {
        'Africa': {color: '#795548'},
        'Americas': {color: '#4CAF50'},
        'Asia': {color: '#F44336'},
        'Europe': {color: '#03A9F4'},
        'Oceania': {color: '#FF9800'}
      },
      legend: {
        position: 'none'
      },
      explorer: {
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        keepInBounds: false,
        maxZoomIn: .01,
        maxZoomOut: 100
      }
    }
  },
  top: { /* Top-10 Chart */
    type: 'GeoChart', /* https://developers.google.com/chart/interactive/docs/gallery/geochart */
    data: {
      cols: [
        {id: "country", label: "Country", type: "string"},
        {id: "continent", label: "Region", type: "number"},
        {id: 'name', label: 'name', type: 'string', role: 'tooltip'}
      ],
      rows: []
    },
    options: {
      width: '100%',
      keepAspectRatio: true,
      colorAxis: {
        colors: ['#795548', '#4CAF50', '#F44336', '#03A9F4', '#FF9800'],
        values: [0, 1, 2, 3, 4]
      },
      legend: 'none'
    }
  }
};