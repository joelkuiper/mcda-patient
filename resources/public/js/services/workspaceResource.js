'use strict';
define(function(require) {
  var angular = require("angular");
  var _ = require("underscore");

  var dependencies = [];

  var WorkspaceResource = function(Config, $q, $resource, $filter, $rootScope) {
    var resource = {
      get: function() {
        var deferred = $q.defer();
        deferred.resolve({problem: window.models.problem});
        return deferred;
      }
    };

    return resource;
  };

  return angular.module('elicit.workspaceResource', dependencies).factory('WorkspaceResource', WorkspaceResource);
});
