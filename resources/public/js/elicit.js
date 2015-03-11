define(function(require) {
  var angular = require("angular");
  var _ = require("underscore");
  var Config = require("./config");

  require('mmfoundation');
  require('angular-ui-router');
  require('angular-resource');

  require('./services/errorHandling');
  require('./services/scaleRangeService');
  require('./services/hashCodeService');
  require('./services/workspaceResource');
  require('./services/partialValueFunction');
  require('./controllers');
  require('./directives');

  var dependencies = [
    'ngResource',
    'ui.router',
    'mm.foundation',

    'elicit.scaleRangeService',
    'elicit.errorHandling',
    'elicit.pvfService',
    'elicit.directives',
    'elicit.controllers',
    'elicit.workspaceResource'
  ];

  var app = angular.module('elicit', dependencies);

  app.constant('Config', Config);

  // Detect our location so we can get the templates from the correct place
  app.constant('RootPath', (function() {
    return require.toUrl(".").replace("js", "");
  })());

  app.config(function(Config, RootPath, $stateProvider, $urlRouterProvider, $httpProvider) {
    var baseTemplatePath = RootPath + 'views/';

    $httpProvider.interceptors.push('ErrorHandling');

    $stateProvider.state("questionnaire", {
      url: "/questionnaire",
      templateUrl: baseTemplatePath + "questionnaire.html",
      controller: "QuestionnaireController",
      resolve: {
        currentWorkspace: function($stateParams, WorkspaceResource, Config) {
          return WorkspaceResource.get({"workspaceId": Config.defaultQuestionaire}).$promise;
        }
      }
    });

    $stateProvider.state("thankYou", {
      url: "/thank-you",
      templateUrl: baseTemplatePath + "thankYou.html",

      controller: "ThankYouController",
      resolve: {
        currentWorkspace: function($stateParams, WorkspaceResource, Config) {
          return WorkspaceResource.get({"workspaceId": Config.defaultQuestionaire}).$promise;
        }
      }
    });



    $urlRouterProvider.otherwise("/questionnaire");
  });

  app.run(function($rootScope, $window, $http) {
    var csrfToken = $window.config._csrf_token;
    var csrfHeader = $window.config._csrf_header;

    $http.defaults.headers.common[csrfHeader] = csrfToken;

    $rootScope.$safeApply = function($scope, fn) {
      var phase = $scope.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        this.$eval(fn);
      } else {
        this.$apply(fn);
      }
    };


    $rootScope.$on('error', function(e, message) {
      $rootScope.$safeApply($rootScope, function() {
        $rootScope.error = _.extend(message, {
          close: function() {
            delete $rootScope.error;
          }
        });
      });
    });
  });

  return app;

});
