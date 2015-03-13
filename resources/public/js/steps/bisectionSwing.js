'use strict';
define(function(require) {
  var angular = require("angular");
  var _ = require("underscore");

  return function($scope, currentWorkspace, PartialValueFunction) {
    var getOrdinalPreferences = function(prefs) {
      return _.filter(prefs, function(pref) { return pref.type === "ordinal"; });
    };

    var getCriteriaOrder = function(prefs) {
      return _.reduce(getOrdinalPreferences(prefs), function(memo, statement) {
        if (memo.length === 0) {
          return statement.criteria;
        } else {
          if (_.last(memo) !== statement.criteria[0]) {
            return null;
          }
          return memo.concat(statement.criteria[1]);
        }
      }, []);
    };

    var criteria = {};
    var pvf = PartialValueFunction;
    $scope.pvf = pvf;

    $scope.title = function(step, total) {
      var base = 'Bisection weighting';
      if (step > total) {
        return base + ' (DONE)';
      }
      return base + ' (' + step + '/' + total + ')';
    };

    function buildInitial(criterionA, criterionB, step) {
      var bounds = pvf.getBounds(criteria[criterionA]);
      var state =  {
        step: step,
        total: (_.size(criteria) - 1) * 2,
        criterionA: criterionA,
        criterionB: criterionB,
        cutoff: 0.5
      };
      return state;
    }

    var initialize = function(state) {
      criteria = state.problem.criteria;
      state = _.extend(state, {
        'criteriaOrder': getCriteriaOrder(state.prefs)
      });

      state = _.extend(state, buildInitial(state.criteriaOrder[0], state.criteriaOrder[1], 1));
      return state;
    };

    var validChoice = function(state) {
      if (!state) {
        return false;
      }
      var value = state.choice;
      return !!state.choice;
    };

    var nextState = function(state) {
      if (!validChoice(state)) {
        return null;
      }

      var order = state.criteriaOrder;
      var idx = _.indexOf(order, state.criterionB);

      if (state.cutoff === 0.5) {
        next = { step: 2 * idx };
        if (state.choice === state.criterionB) {
          next.cutoff = 0.75;
        } else {
          next.cutoff = 0.25;
        }
        return _.extend(_.omit(angular.copy(state), "choice"), next);
      }

      var next;
      if (idx > order.length - 2) {
        next = {
          type: 'done',
          step: idx + 1
        };
      } else {
        next = buildInitial(order[idx], order[idx + 1], 2 * idx + 1);
      }

      function getRatioBounds(state) {
        if (state.cutoff === 0.75) {
          if (state.choice === state.criterionB) {
            return [1, 4/3];
          } else {
            return [4/3, 2];
          }
        } else {
          if (state.choice === state.criterionB) {
            return [2, 4];
          } else {
            return [4, null];
          }
        }
      }

      next.prefs = angular.copy(state.prefs);
      next.prefs.push({
        criteria: [order[idx - 1], order[idx]],
        ratio: getRatioBounds(state),
        type: 'ratio bound'
      });

      return _.extend(_.omit(angular.copy(state), "choice"), next);
    };


    var isFinished = function(state) {
      return state && state.step === state.total;
    };

    var save = function(state) {
      var next = nextState(state);
      return _.pick(next, ['problem', 'prefs']);
    };

    return {
      isFinished: isFinished,
      validChoice: validChoice,
      fields: ['prefs', 'total', 'choice', 'criteriaOrder', 'criterionA', 'criterionB', 'cutoff'],
      nextState: nextState,
      standardize: _.identity,
      save: save,
      initialize: _.partial(initialize, currentWorkspace)
    };
  };
});
