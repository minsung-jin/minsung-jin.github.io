
require.config({
  baseUrl: 'js',
  paths: {
    // directories

    // library
    bluebird: '../lib/bluebird/bluebird',
    bootstrap: '../lib/bootstrap-3.3.7-dist/js/bootstrap',
    jquery: '../lib/jquery/jquery-3.1.1',
    lodash: '../lib/lodash/lodash',
    moment: '../lib/moment/moment'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    }
  }
});

// Load the main app module to start the application.
require(['app/main']);

