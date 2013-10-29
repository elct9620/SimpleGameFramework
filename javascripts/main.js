(function() {
  require.config({
    baseUrl: "javascripts",
    paths: {
      'domReady': '../vendor/requirejs-domready/domReady',
      'Paper': '../vendor/paper/dist/paper-full',
      'PxLoader': '../vendor/pxloader/PxLoader',
      'PxLoaderImage': '../vendor/pxloader/PxLoaderImage',
      'PxLoaderSound': '../vendor/pxloader/PxLoaderSound'
    },
    packages: ['Framework'],
    shim: {
      'Paper': {
        "export": 'Paper'
      },
      'Loader': {
        exports: 'PxLoader'
      },
      'ImageLoader': {
        exports: 'PxLoaderImage',
        deps: ['PxLoader']
      },
      'SoundLoader': {
        exports: 'PxLoaderSound',
        deps: ['PxLoader']
      }
    }
  });

  require(['App'], function(App) {
    var game;

    game = new App;
    return game.run();
  });

}).call(this);
