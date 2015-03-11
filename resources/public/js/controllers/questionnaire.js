'use strict';
define(function(require) {
  var angular = require("angular");
  var _ = require("underscore");
  var Wizard = require("./helpers/wizard");

  return function(Config, $scope, $state, $injector, currentWorkspace, RootPath) {
    var steps = angular.copy(Config.steps);
    var currentHandler = null;

    var initializeStep = function(step, workspace) {
      var handlerPath = "../steps/" + step.handler;

      require([handlerPath], function(Handler) {
        currentHandler = $injector.invoke(Handler, this, { $scope: $scope, currentWorkspace: workspace});

        $injector.invoke(Wizard, this, {
          $scope: $scope,
          handler: currentHandler
        });

        $scope.stepTemplate = RootPath + "views/" + step.templateUrl;

        $scope.$apply();
      });
    };

    $scope.proceed = function(state) {
      if(steps.length === 0) return;
      state.prefs = currentHandler.standardize(state.prefs);
      state = _.pick(state, ['problem', 'prefs']);
      initializeStep(steps.shift(), state);
    };


    $scope.submit = function(state) {
      console.log("I will store this crap", state);
      $state.go("thankYou");
    };

    $scope.isDone = function() {
      return steps.length === 0;
    };

    initializeStep(steps.shift(), currentWorkspace);



  };

});
