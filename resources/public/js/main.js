'use strict';

require.config({
  paths: {
    'jQuery': 'bower_components/jquery/dist/jquery',
    'underscore': 'bower_components/underscore/underscore',
    'angular': 'bower_components/angular/angular',
    'angular-resource': 'bower_components/angular-resource/angular-resource',
    'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
    'jquery-slider': 'bower_components/jslider/dist/jquery.slider',
    'mmfoundation': 'bower_components/angular-foundation/mm-foundation-tpls'
  },
  baseUrl: '.',
  shim: {
    'angular': { exports : 'angular' },
    'angular-resource': { deps:['angular'], exports: 'angular-resource' },
    'angular-ui-router': { deps:['angular'] },
    'underscore': { exports : '_' },
    'jQuery': { exports : 'jQuery' },
    'jquery-slider': { deps: ['jQuery'] },
    'mmfoundation': { deps: ['angular'] }
  },
  priority: ['angular']
});

define(function (require) {
  var angular = require("angular");
  var app = require("js/elicit");

  angular.bootstrap(document, ['elicit']);
});
