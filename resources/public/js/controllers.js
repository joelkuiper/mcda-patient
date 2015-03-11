'use strict';
define(function(require) {
  var angular = require('angular');
  return angular.module('elicit.controllers', [])
    .controller('QuestionnaireController', require('./controllers/questionnaire'))
    .controller('ThankYouController', require('./controllers/thankYou'));
});
