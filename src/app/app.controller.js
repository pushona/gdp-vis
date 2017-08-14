export default class AppController {
  constructor($mdDialog, AppService, CONST) {
    this.$mdDialog = $mdDialog;
    this.AppService = AppService;
    this.CONST = CONST;

    this.charts = AppService.charts;
    this.model = AppService.model;
    this.vm = AppService.vm;

    this.info = [
      $mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true)
        .title('Consumption')
        .textContent('Consumption is normally the largest GDP component in the economy, consisting of private expenditures in the economy (household final consumption expenditure). These personal expenditures fall under one of the following categories: durable goods, non-durable goods, and services. Examples include food, rent, jewellery, gasoline, and medical expenses, but not the purchase of new housing.')
        .ariaLabel('Consumption Dialog')
        .ok('Ok!'),
      $mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true)
        .title('Investments')
        .textContent('Investment includes, for instance, business investment in equipment, but does not include exchanges of existing assets. Examples include construction of a new mine, purchase of software, or purchase of machinery and equipment for a factory. Spending by households (not government) on new houses is also included in investment. In contrast to its colloquial meaning, "investment" in GDP does not mean purchases of financial products. Buying financial products is classed as \'saving\', as opposed to investment. This avoids double-counting: if one buys shares in a company, and the company uses the money received to buy plant, equipment, etc., the amount will be counted toward GDP when the company spends the money on those things; to also count it when one gives it to the company would be to count two times an amount that only corresponds to one group of products. Buying bonds or stocks is a swapping of deeds, a transfer of claims on future production, not directly an expenditure on products.')
        .ariaLabel('Investments Dialog')
        .ok('Ok!'),
      $mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true)
        .title('Government Spend')
        .textContent('Government spending is the sum of government expenditures on final goods and services. It includes salaries of public servants, purchases of weapons for the military and any investment expenditure by a government. It does not include any transfer payments, such as social security or unemployment benefits.')
        .ariaLabel('Government Spend Dialog')
        .ok('Ok!'),
      $mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true)
        .title('Net Export')
        .textContent('Net Export is calculated like difference between country Exports and country Imports. \n' +
          '\n' +
          'Exports represents gross exports. GDP captures the amount a country produces, including goods and services produced for other nations\' consumption, therefore exports are added.\n' +
          'Imports represents gross imports. Imports are subtracted since imported goods will be included in the terms Consumption, Investments or Government Spending, and must be deducted to avoid counting foreign supply as domestic.')
        .ariaLabel('Net Export Dialog')
        .ok('Ok!'),
    ];
  }

  redrawGdpTab () {
    this.AppService.updateGdpTab();
  }
  redrawGdpChart () {
    this.AppService.updateGdpChart();
    this.AppService.updateCanvases();
  }
  redrawTimelineCharts() {
    this.AppService.stopTimelineChart();
    this.AppService.updateTimelineChart();
    this.AppService.updateTopChart();
  }
  selectedGdpTab () {
    this.AppService.calculateDimensions();
  }
  setCanvases () {
    this.AppService.setCanvases();
  }
  showInfo (ev, id) {
    this.$mdDialog.show(this.info[id].targetEvent(ev));
  }
  timelinePlay () {
    this.AppService.playTimelineChart();
  }
  timelineStop () {
    this.AppService.stopTimelineChart();
  }
}

AppController.$inject = ['$mdDialog', 'AppService', 'CONST'];