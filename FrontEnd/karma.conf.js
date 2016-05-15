// Karma configuration
// Generated on Thu May 12 2016 01:11:12 GMT+0800 (CST)

var loaders = [
    {test: /\.css$/, loader: 'style!css'},
    {test: /\.html$/, loader: 'raw'},
]

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      //do write app.js before angular-mocks,
      //due to angular-mocks should after angular.js
      //which is required in app.js
      'src/js/app.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/unit_test/*_test.js'
    ],

    preprocessors: {
      'src/js/app.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: loaders
      }
    },

    exclude: [
      '**/*.swp'
    ],

    reporters: ['spec', 'progress', 'coverage'],
    port: 9876,
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,

    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    junitReporter : {
        outputFile: 'test_out/unit.xml',
        suite: 'unit'
    },
    coverageReporter: {
        dir: 'coverage/',
        type: 'html'
    },
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
