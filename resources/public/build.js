({
  appDir: './',
  baseUrl: './js',
  dir: '../build',
  useStrict: true,
  optimize: 'uglify2',
  removeCombined: true,
  findNestedDependencies: true,
  optimizeCss: 'default',
  mainConfigFile: './js/main.js',
  uglify2: {
    mangle: false
  },
  paths: {
    'angular': 'empty:',
    'angular-resource': 'empty:',
    'angular-ui-router': 'empty:'
  },
  modules: [
    {
      name: 'main',
      exclude: ['angular', 'angular-resource', 'angular-ui-router', 'mmfoundation']
    }
  ]
})
