'use strict';
define(function(require) {
  var _ = require("underscore");
  var $ = require("jQuery");
  var angular = require("angular");

  var directives = angular.module('elicit.directives', []);

  directives.directive('slider', function($filter) {
    var initialize = function(scope, element) {
      var type = scope.type;
      var from = scope.range.from;
      var to = scope.range.to;
      var fromIncl = !scope.range.leftOpen;
      var toIncl = !scope.range.rightOpen;
      var delta = to - from;
      var steps = 100;

      if (!fromIncl) {
        from += delta / steps;
        delta -= delta / steps;
        --steps;
      }

      if (!toIncl) {
        to -= delta / steps;
        delta -= delta / steps;
        --steps;
      }

      var stepToValue = function(step) {
        return $filter('number')((from + (step / steps) * delta));
      };

      var valueToStep = function(value) {
        return $filter('number')(((value - from) / delta * steps));
      };

      var getModelValue = function() {
        return type === 'point' ? valueToStep(scope.model) :
          valueToStep(scope.model.lower) + ';' + valueToStep(scope.model.upper);
      };

      var getValueModel = function(value) {
        if (type === 'point') {
          return parseFloat(stepToValue(value));
        } else {
          var steps = value.split(';');
          var values = _.map([stepToValue(steps[0]), stepToValue(steps[1])], parseFloat);
          return {
            lower: values[0],
            upper: values[1]
          };
        }
      };

      require("jquery-slider");
      $(element).empty();
      $(element).append('<input type="slider"></input>');
      $(element).find('input').attr('value', getModelValue());
      var myElem = $(element).find('input');
      myElem.slider({
        from: 0,
        to: steps,
        step: 1,
        calculate: stepToValue,
        skin: 'round_plastic',
        onstatechange: _.debounce(function(value) {
          var values = getValueModel(value);
          scope.$root.$safeApply(scope, function() {
            scope.model = values;
          });
        }, 10)
      });

      if (scope.range && _.has(scope.range, 'restrictTo') && _.has(scope.range, 'restrictFrom')) {
        $(element).find('.jslider-bg').append('<i class="x"></i>');
        var width = valueToStep(scope.range.restrictTo) - valueToStep(scope.range.restrictFrom);
        var left = valueToStep(scope.range.restrictFrom);
        $(element).find('.jslider-bg .x').attr('style', 'left: ' + left + '%; width:' + width + '%');
      }
    };

    return {
      restrict: 'E',
      replace: true,
      scope: {
        type: '@',
        model: '=',
        range: '='
      },
      link: function(scope, $element) {
        var init = function() {
          if (scope.range) {
            initialize(scope, $element);
          }
        };
        scope.$on('nextState', init);
        scope.$on('prevState', init);
        scope.$watch('range', init, true);
      },
      template: '<div class="slider"></div>'
    };
  });

  directives.directive('addisAlert', function(RootPath) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        type: '@',
        close: '&'
      },
      link: function(scope, element) {
        scope.animatedClose = function() {
          $(element).fadeOut(200, function() {
            scope.close();
          });
        };
      },
      templateUrl: RootPath + 'partials/alert.html'
    };
  });

  directives.directive('criterion', function() {
    return {
      restrict: "E",
      replace: true,
      scope: {
        criterion: '=of'
      },
      link: function(scope, element) {
        var c = scope.criterion;

        var hasDescription = !!c.description;
        var dimensionlessUnits = ["proportion"];
        var isDimensionless = !c.unitOfMeasurement || dimensionlessUnits.indexOf(c.unitOfMeasurement.toLowerCase()) !== -1;

        var text;
        if(hasDescription) {
          text = c.description.replace(/(\.$)/g, "") + " (" + c.title + (!isDimensionless ? ", " + c.unitOfMeasurement : "") + ")";
        } else {
          text = c.title + (!isDimensionless ? " " + c.unitOfMeasurement : "");

        }
        scope.text = text;
      },
      template: "<span>{{text}}</span>"
    };
  });

  return directives;
});
