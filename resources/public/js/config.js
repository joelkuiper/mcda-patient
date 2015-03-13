'use strict';
define(function(require) {
  var steps = [{
    id: 'Introduction',
    title: 'Introduction',
    handler: 'introduction',
    templateUrl: 'introduction.html'
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
