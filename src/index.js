import 'angular';
import 'angular-material';
import 'angular-google-chart';

import './img/home.svg';
import './img/human.svg';
import './img/plus.svg';
import './img/equal.svg';
import './img/icons.svg';
import './img/world.svg';
import './img/globe.png';
import './img/globe2.png';
import './img/puzzle.png';
import './img/scatter-chart.png';

import 'angular-material/angular-material.min.css';
import './style.scss';

import AppConfig from './app/app.config';
import AppConstants from './app/app.constants';
import AppController from './app/app.controller';
import AppService from './app/app.service';

angular.module('App', ['ngMaterial', 'googlechart'])
  .config(AppConfig)
  .constant('CONST', AppConstants)
  .controller('AppController', AppController)
  .service('AppService', AppService);