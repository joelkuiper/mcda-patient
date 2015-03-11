'use strict';
define(function(require) {
  var angular = require("angular");
  var _ = require("underscore");

  var dependencies = ['ngResource'];

  var WorkspaceResource = function(Config, $q, $resource, $filter, $rootScope) {


    var getProblem = function(response) {
      var deferred = $q.defer();
      var resource = response.resource;

      deferred.resolve({problem: resource});

      return deferred.promise;

    };

    var resource = $resource(
      Config.workspacesRepositoryUrl + ':workspaceId', { workspaceId: '@id' }, {
        get:    { method:'GET',  interceptor: { response: getProblem }},
        save:   { method:'POST',  interceptor: { response: getProblem }},
        create: { method:'POST', transformRequest: function(problem, headersGetter) {
          return angular.toJson({
            title: problem.title,
            problem: problem
          });
        }}
      }
    );

    return resource;
  };

  return angular.module('elicit.workspaceResource', dependencies).factory('WorkspaceResource', WorkspaceResource);
});
