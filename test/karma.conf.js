module.exports= function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '..',

    // frameworks to use
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/threejs/build/three.js',
      'src/third-party/*.js',
      'src/sensorama.js',
      'test/spec.js'
    ],

    // list of files to exclude
    exclude: [],

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress', 'junit', 'teamcity'
    reporters: ['html', 'dots'],

    // web server port
    port: 9876,

    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'Chrome',
      'Firefox'
    ],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 5000,

    // Auto run tests on start (when browsers are captured) and exit
    singleRun: false

    // report which specs are slower than 700ms
    // reportSlowerThan: 700
  });
};