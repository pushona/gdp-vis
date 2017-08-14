import Charts from './charts.config.js';
import Data from './data.config.js';

export default class AppService {
  constructor($interval, CONST) {
    this.play = null;

    this.$interval = $interval;
    this.CONST = CONST;
    this.charts = Charts;
    this.data = Data;
    this.model = {};

    this.vm = {
      countriesAll: [],
      countryFirst: null,
      countrySecond: null,
      compareYear: CONST.YEAR_LAST,
      timelineYear: CONST.YEAR_FIRST,
      isPlayed: false,
      showContinents: {
        'Africa': true,
        'Americas': true,
        'Asia': true,
        'Europe': true,
        'Oceania': true
      }
    };

    this.firstPopulationCanvas = null;
    this.secondPopulationCanvas = null;
    this.firstPopulationCtx = null;
    this.secondPopulationCtx = null;
    this.canvasWidth = this.CONST.CANVAS_WIDTH;
    this.canvasHeight = this.CONST.CANVAS_HEIGHT;
    
    this.createDataModelByYears(this.data, this.model);
    this.updateGdpTab();
    this.createTimelineChart(this.charts.history, this.model, this.CONST.YEAR_FIRST);
    this.createTopChart(this.charts.top, this.model, this.CONST.YEAR_FIRST);
  }

  calculateDimensions () {
    /* Population */
    this.firstPopulationCanvas = document.getElementById('firstCountryPopulation');
    this.secondPopulationCanvas = document.getElementById('secondCountryPopulation');
    this.firstPopulationCtx = this.firstPopulationCanvas.getContext('2d');
    this.secondPopulationCtx = this.secondPopulationCanvas.getContext('2d');
    /* Consumption */
    this.firstConsumptionCanvas = document.getElementById('firstCountryConsumption');
    this.secondConsumptionCanvas = document.getElementById('secondCountryConsumption');
    this.firstConsumptionCtx = this.firstConsumptionCanvas.getContext('2d');
    this.secondConsumptionCtx = this.secondConsumptionCanvas.getContext('2d');
    /* Investments */
    this.firstInvestmentsCanvas = document.getElementById('firstCountryInvestments');
    this.secondInvestmentsCanvas = document.getElementById('secondCountryInvestments');
    this.firstInvestmentsCtx = this.firstInvestmentsCanvas.getContext('2d');
    this.secondInvestmentsCtx = this.secondInvestmentsCanvas.getContext('2d');
    /* Government Spending */
    this.firstGovernmentSpendingCanvas = document.getElementById('firstCountryGovernmentSpending');
    this.secondGovernmentSpendingCanvas = document.getElementById('secondCountryGovernmentSpending');
    this.firstGovernmentSpendingCtx = this.firstGovernmentSpendingCanvas.getContext('2d');
    this.secondGovernmentSpendingCtx = this.secondGovernmentSpendingCanvas.getContext('2d');
    /* Net Export */
    this.firstNetExportCanvas = document.getElementById('firstCountryNetExport');
    this.secondNetExportCanvas = document.getElementById('secondCountryNetExport');
    this.firstNetExportCtx = this.firstNetExportCanvas.getContext('2d');
    this.secondNetExportCtx = this.secondNetExportCanvas.getContext('2d');
    /* GDP */
    this.firstTotalGdpCanvas = document.getElementById('firstCountryTotalGdp');
    this.secondTotalGdpCanvas = document.getElementById('secondCountryTotalGdp');
    this.firstTotalGdpCtx = this.firstTotalGdpCanvas.getContext('2d');
    this.secondTotalGdpCtx = this.secondTotalGdpCanvas.getContext('2d');

    let cell = document.getElementsByClassName('population-1')[0];
    this.canvasWidth = cell.offsetWidth;
    this.canvasHeight = cell.offsetHeight;

    this.firstPopulationCanvas.width = this.canvasWidth;
    this.firstPopulationCanvas.height = this.canvasHeight;
    this.secondPopulationCanvas.width = this.canvasWidth;
    this.secondPopulationCanvas.height = this.canvasHeight;
    this.firstConsumptionCanvas.width = this.canvasWidth;
    this.firstConsumptionCanvas.height = this.canvasHeight;
    this.secondConsumptionCanvas.width = this.canvasWidth;
    this.secondConsumptionCanvas.height = this.canvasHeight;
    this.firstInvestmentsCanvas.width = this.canvasWidth;
    this.firstInvestmentsCanvas.height = this.canvasHeight;
    this.secondInvestmentsCanvas.width = this.canvasWidth;
    this.secondInvestmentsCanvas.height = this.canvasHeight;
    this.firstGovernmentSpendingCanvas.width = this.canvasWidth;
    this.firstGovernmentSpendingCanvas.height = this.canvasHeight;
    this.secondGovernmentSpendingCanvas.width = this.canvasWidth;
    this.secondGovernmentSpendingCanvas.height = this.canvasHeight;
    this.firstNetExportCanvas.width = this.canvasWidth;
    this.firstNetExportCanvas.height = this.canvasHeight;
    this.secondNetExportCanvas.width = this.canvasWidth;
    this.secondNetExportCanvas.height = this.canvasHeight;
    this.firstTotalGdpCanvas.width = this.canvasWidth;
    this.firstTotalGdpCanvas.height = this.canvasHeight;
    this.secondTotalGdpCanvas.width = this.canvasWidth;
    this.secondTotalGdpCanvas.height = this.canvasHeight;

    this.firstPopulationCtx.fillStyle = '#9C27B0';
    this.secondPopulationCtx.fillStyle = '#9C27B0';
    this.firstConsumptionCtx.fillStyle = '#4CAF50';
    this.secondConsumptionCtx.fillStyle = '#4CAF50';
    this.firstInvestmentsCtx.fillStyle = '#2196F3';
    this.secondInvestmentsCtx.fillStyle = '#2196F3';
    this.firstGovernmentSpendingCtx.fillStyle = '#F44336';
    this.secondGovernmentSpendingCtx.fillStyle = '#F44336';
    this.firstNetExportCtx.fillStyle = '#FFEB3B';
    this.secondNetExportCtx.fillStyle = '#FFEB3B';
    this.firstTotalGdpCtx.fillStyle = '#9E9E9E';
    this.secondTotalGdpCtx.fillStyle = '#9E9E9E';
  }

  createDataModelByYears(raw, refined) {
    if (!raw || !refined) return;

    refined.years = refined.years || {};

    for (let i = this.CONST.YEAR_FIRST; i <= this.CONST.YEAR_LAST; i++) {
      refined.years[i] = {};

      raw.population.forEach(function (item, index) {
        let code = item['Country Code 3L'];
        let code2 = item['Country Code 2L'];
        let continent = item['Continent_1'];
        let name = item['Country Name'];
        let consumption = raw.consumption[index][i];
        let governmentSpending = raw.governmentSpending[index][i];
        let netExport = raw.netExport[index][i];
        let gdpTotal = raw.gdp[index][i];
        let gdpPerCapita = raw.gdpPerCapita[index][i];
        let population = raw.population[index][i];
        let investments = (gdpTotal && consumption && governmentSpending && netExport) ? gdpTotal - consumption - governmentSpending - netExport : void 0;

        refined.years[i][code] = {
          code: code,
          code2: code2,
          continent: continent,
          name: name,
          consumption: consumption,
          investments: investments,
          governmentSpending: governmentSpending,
          netExport: netExport,
          gdpTotal: gdpTotal,
          gdpPerCapita: gdpPerCapita,
          population: population
        };
      });
    }

    return refined;
  }


  isContinentShown (continent) {
    return this.vm.showContinents[continent];
  }
  createTimelineChart (chart, data, year) {
    // chart.options.title = 'CORRELATION BETWEEN GDP, GDP/CAPITA AND POPULATION OF COUNTRIES: ' + this.vm.timelineYear;
    for (let key in data.years[year]) {
      if (data.years[year].hasOwnProperty(key)) {
        let country = data.years[year][key];
        if (country.gdpTotal && country.gdpPerCapita && this.isContinentShown(country.continent)) {
          let chartRow = {c: [{v: country.name}, {v: country.gdpTotal}, {v: country.gdpPerCapita}, {v: country.continent}, {v: country.population}]};
          chart.data.rows.push(chartRow);
        }
      }
    }
  }
  updateTimelineChart () {
    let year = this.vm.timelineYear;
    let chart = this.charts.history;
    let data = this.model;
    chart.data.rows = [];

    this.createTimelineChart(chart, data, year);
  }
  playTimelineChart () {
    if (this.vm.isPlayed) {
      this.$interval.cancel(this.play);
    } else {
      if (this.vm.timelineYear === this.CONST.YEAR_LAST) this.vm.timelineYear = this.CONST.YEAR_FIRST;
      this.play = this.$interval(() => {
        this.vm.timelineYear++;
        this.updateTimelineChart();
        this.updateTopChart();

        if (this.vm.timelineYear === this.CONST.YEAR_LAST) {
          this.vm.timelineYear = this.CONST.YEAR_FIRST;
          this.vm.isPlayed = false;
        }
      }, this.CONST.PLAY_SPEED, this.CONST.YEAR_LAST - this.vm.timelineYear);
    }

    this.vm.isPlayed = !this.vm.isPlayed;
  }
  stopTimelineChart () {
    this.vm.isPlayed = false;
    if (this.play) {
      this.$interval.cancel(this.play);
    }
  }
  createTopChart (chart, data, year) {
    let countries = [];
    for (let key in data.years[year]) {
      if (data.years[year].hasOwnProperty(key)) {
        let country = data.years[year][key];
        if (country.gdpTotal) {
          let chartRow = {
            c: [{v: country.code2}, {v: this.CONST.CONTINENTS.indexOf(country.continent)}, {v: country.name}],
            sortBy: parseFloat(country.gdpTotal)
          };
          countries.push(chartRow);
        }
      }
    }
    chart.data.rows = countries.sort(function (a, b) { return b.sortBy - a.sortBy }).slice(0,10);
  }
  updateTopChart () {
    let year = this.vm.timelineYear;
    let chart = this.charts.top;
    let data = this.model;
    chart.data.rows = [];

    this.createTopChart(chart, data, year);
  }

  updateGdpTab () {
    this.vm.countryFirst = null;
    this.vm.countrySecond = null;
    this.vm.countriesAll = [];
    Object.values(this.model.years[this.vm.compareYear]).forEach((country) => {
      if (country && country.population && country.consumption && country.investments && country.governmentSpending && country.netExport && country.gdpTotal) {
        this.vm.countriesAll.push(country);
      }
    });
    this.updateGdpChart();
  }
  updateGdpChart () {
    let chart = this.charts.gdp;
    chart.data.rows = [];
    if (this.vm.countryFirst) chart.data.rows.push({c: [{v: this.vm.countryFirst.code2}, {v: this.CONST.CONTINENTS.indexOf(this.vm.countryFirst.continent)}, {v: this.vm.countryFirst.name}]});
    if (this.vm.countrySecond) chart.data.rows.push({c: [{v: this.vm.countrySecond.code2}, {v: this.CONST.CONTINENTS.indexOf(this.vm.countrySecond.continent)}, {v: this.vm.countrySecond.name}]});
  }
  updateCanvases () {
    this.firstPopulationCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.secondPopulationCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.firstConsumptionCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.secondConsumptionCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.firstInvestmentsCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.secondInvestmentsCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.firstGovernmentSpendingCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.secondGovernmentSpendingCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.firstNetExportCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.secondNetExportCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.firstTotalGdpCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.secondTotalGdpCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (!this.vm.countryFirst || !this.vm.countrySecond) return;

    /* Population */
    let firstPopulationNumber = Math.floor(this.vm.countryFirst.population / this.CONST.POPULATION_DIVIDER);
    let secondPopulationNumber = Math.floor(this.vm.countrySecond.population / this.CONST.POPULATION_DIVIDER);
    for (let i=0; i < firstPopulationNumber; i++) {
      this._fillCtx(this.firstPopulationCtx, i);
    }
    for (let i=0; i < secondPopulationNumber; i++) {
      this._fillCtx(this.secondPopulationCtx, i);
    }
    /* Consumption */
    let firstConsumptionNumber = Math.floor(this.vm.countryFirst.consumption / this.CONST.MONEY_DIVIDER);
    let secondConsumptionNumber = Math.floor(this.vm.countrySecond.consumption / this.CONST.MONEY_DIVIDER);
    for (let i=0; i < firstConsumptionNumber; i++) {
      this._fillCtx(this.firstConsumptionCtx, i);
    }
    for (let i=0; i < secondConsumptionNumber; i++) {
      this._fillCtx(this.secondConsumptionCtx, i);
    }
    /* Investments */
    let firstInvestmentsNumber = Math.floor(this.vm.countryFirst.investments / this.CONST.MONEY_DIVIDER);
    let secondInvestmentsNumber = Math.floor(this.vm.countrySecond.investments / this.CONST.MONEY_DIVIDER);
    for (let i=0; i < firstInvestmentsNumber; i++) {
      this._fillCtx(this.firstInvestmentsCtx, i);
    }
    for (let i=0; i < secondInvestmentsNumber; i++) {
      this._fillCtx(this.secondInvestmentsCtx, i);
    }
    /* Government Spending */
    let firstGovernmentSpendingNumber = Math.floor(this.vm.countryFirst.governmentSpending / this.CONST.MONEY_DIVIDER);
    let secondGovernmentSpendingNumber = Math.floor(this.vm.countrySecond.governmentSpending / this.CONST.MONEY_DIVIDER);
    for (let i=0; i < firstGovernmentSpendingNumber; i++) {
      this._fillCtx(this.firstGovernmentSpendingCtx, i);
    }
    for (let i=0; i < secondGovernmentSpendingNumber; i++) {
      this._fillCtx(this.secondGovernmentSpendingCtx, i);
    }
    /* Net Export */
    let firstNetExportNumber = Math.floor(this.vm.countryFirst.netExport / this.CONST.MONEY_DIVIDER);
    let secondNetExportNumber = Math.floor(this.vm.countrySecond.netExport / this.CONST.MONEY_DIVIDER);
    for (let i=0; i < firstNetExportNumber; i++) {
      this._fillCtx(this.firstNetExportCtx, i);
    }
    for (let i=0; i < secondNetExportNumber; i++) {
      this._fillCtx(this.secondNetExportCtx, i);
    }
    /* GDP */
    let firstTotalGdpNumber = Math.floor(this.vm.countryFirst.gdpTotal / this.CONST.MONEY_DIVIDER);
    let secondTotalGdpNumber = Math.floor(this.vm.countrySecond.gdpTotal / this.CONST.MONEY_DIVIDER);
    for (let i = 0; i < firstTotalGdpNumber; i++) {
      this._fillCtx(this.firstTotalGdpCtx, i);
    }
    for (let i = 0; i < secondTotalGdpNumber; i++) {
      this._fillCtx(this.secondTotalGdpCtx, i);
    }
  }

  _fillCtx (ctx, i) {
    let size = 5;
    let gap = 1;
    let y = (size + gap) * Math.floor(i / (Math.floor(this.canvasWidth/(size + gap))));
    let x = (size + gap) * (i % Math.floor(this.canvasWidth/(size + gap)));
    ctx.fillRect(x, y, size, size);
  }
}

AppService.$inject = ['$interval', 'CONST'];