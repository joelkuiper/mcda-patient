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
    id: 'exact-swing',
    title: 'Exact Swing Elicitation',
    handler: 'exactSwing',
    templateUrl: 'exactSwing.html'
  }, {
    id: 'personal-info',
    title: 'About you',
    handler: 'personalInfo',
    templateUrl: 'personalInfo.html'
  }];

  return {
    steps: steps,
    sequence: ["introduction", "ordinal-swing", "exact-swing", "personal-info"],
    workspacesRepositoryUrl: "/questionnaires/",
    defaultQuestionaire: "regorafenib.json"
  };
});
