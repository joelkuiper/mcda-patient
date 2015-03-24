'use strict';
define(function(require) {
  var steps = [{
    id: 'consent',
    title: 'Consent form',
    handler: 'consent',
    templateUrl: 'consent.html'
  }, {
    id: 'introduction',
    title: 'General introduction',
    handler: 'introduction',
    templateUrl: 'introduction.html'
  }, {
    id: 'explainOrdinal',
    title: 'What is ordinal elicitation',
    handler: 'explainOrdinal',
    templateUrl: 'explainOrdinal.html'
  }, {
    id: 'ordinal-swing',
    title: 'Ordinal Swing Elicitation',
    handler: 'ordinalSwing',
    templateUrl: 'ordinalSwing.html'
  }, {
    id: 'explain-trade-off',
    title: 'Explaining Trade Off steps',
    handler: 'explainTradeOff',
    templateUrl: 'explainTradeOff.html'
  }, {
    id: 'bisection-swing',
    title: 'Bisection Swing Elicitation',
    handler: 'bisectionSwing',
    templateUrl: 'bisectionSwing.html'
  }];

  return {
    steps: steps
  };
});
