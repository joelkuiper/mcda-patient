({
  appDir: "./",
  baseUrl: "./js",
  dir: "../build",
  mainConfigFile: './js/main.js',
  useStrict: true,
  findNestedDependencies: true,
  optimize: "uglify2",
  removeCombined: true,
  optimizeCss: 'default',
  uglify2: {
    mangle: false
  },
  paths: {
    'jQuery': '../bower_components/jquery/dist/jquery.min',
    'underscore': '../bower_components/underscore/underscore-min',
    'angular': '../bower_components/angular/angular.min',
    'angular-resource': '../bower_components/angular-resource/angular-resource.min',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
    'jquery-slider': '../bower_components/jslider/dist/jquery.slider.min',
    'mmfoundation': '../bower_components/angular-foundation/mm-foundation-tpls.min'
  },
  modules: [
    {
      name: 'main',
      exclude: ['angular', 'angular-resource', 'angular-ui-router', 'mmfoundation']
    }
  ]
})
