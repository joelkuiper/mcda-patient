'use strict';
define(function(require) {
  var _ = require("underscore");
  var angular = require("angular");

  var Introduction = function($scope, currentWorkspace) {
    return {
      fields: ["consent"],
      standardize: _.identity,
      initialize: _.partial(_.identity, currentWorkspace),
      nextState: _.identity,
      validChoice: function(state) { return state.consent; },
      isFinished: function(state) { return state.consent; }
    };
  };

  return Introduction;

});
