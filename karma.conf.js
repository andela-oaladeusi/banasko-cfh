<<<<<<< HEAD
'use strict';
=======
>>>>>>> 9ac67ed... chore( front-end testing): environment setup adding karma and jasmine for unit testing Finishes #134249123
// Karma configuration
// Generated on Mon Nov 14 2016 18:07:44 GMT+0100 (WAT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
<<<<<<< HEAD
    // available frameworks:
    // https://npmjs.org/browse/keyword/karma-adapter
=======
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
>>>>>>> 9ac67ed... chore( front-end testing): environment setup adding karma and jasmine for unit testing Finishes #134249123
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'public/lib/angular/angular.js',
      'jasmine/spec/**/*.js',
      'public/js/**/*.js',
      'public/js/app.js'
    ],



    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
<<<<<<< HEAD
    // available preprocessors:
    // https://npmjs.org/browse/keyword/karma-preprocessor
=======
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
>>>>>>> 9ac67ed... chore( front-end testing): environment setup adding karma and jasmine for unit testing Finishes #134249123
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
<<<<<<< HEAD
    // available reporters:
    // https://npmjs.org/browse/keyword/karma-reporter
=======
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
>>>>>>> 9ac67ed... chore( front-end testing): environment setup adding karma and jasmine for unit testing Finishes #134249123
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
<<<<<<< HEAD
    // possible values: config.LOG_DISABLE ||
    // config.LOG_ERROR || config.LOG_WARN ||
    // config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests
    // whenever any file changes
=======
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
>>>>>>> 9ac67ed... chore( front-end testing): environment setup adding karma and jasmine for unit testing Finishes #134249123
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS', 'Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
<<<<<<< HEAD
  });
};
=======
  })
}
>>>>>>> 9ac67ed... chore( front-end testing): environment setup adding karma and jasmine for unit testing Finishes #134249123
