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
    id: 'exact-swing',
    title: 'Exact Swing Elicitation',
    handler: 'exactSwing',
    templateUrl: 'exactSwing.html'
  }];

  return {
    steps: steps
  };
});
