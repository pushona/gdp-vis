export default class AppConfig {
  constructor($mdIconProvider, $mdThemingProvider) {
    $mdIconProvider
      .icon('home', './dist/assets/home.svg', 27)
      .icon('human', './dist/assets/human.svg', 479)
      .icon('plus', './dist/assets/plus.svg', 52)
      .icon('equal', './dist/assets/equal.svg', 64)
      .defaultIconSet('./dist/assets/icons.svg', 128);
    /* Register a default set of SVG icons */

    $mdThemingProvider /* Register a default theme */
      .theme('default')
      .primaryPalette('blue')
      .accentPalette('amber')
      .warnPalette('red')
      .backgroundPalette('grey');
  }
}