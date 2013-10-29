/*
# Framework Application
*/


(function() {
  define(['domReady', 'Framework/Loader', 'Paper', 'Framework/Sprite'], function(domReady, Loader, Paper, Sprite) {
    var Application;

    return Application = (function() {
      Application.prototype.version = '0.1.0';

      function Application() {
        console.log("Game Framework Version: " + this.version);
      }

      Application.prototype.run = function() {
        return domReady(function() {
          var loader, object, objectState, objects;

          Paper.setup(document.getElementById('GameWindow'));
          loader = new Loader();
          objects = loader.addImages(['images/character/Actor4.png']);
          object = null;
          objectState = "";
          loader.onComplete(function() {
            object = new Sprite(objects[0]);
            object.addAnimation("down", [1, 2, 3]);
            object.addAnimation("left", [4, 5, 6]);
            object.addAnimation("right", [7, 8, 9]);
            return object.addAnimation("up", [10, 11, 12]);
          });
          Paper.tool.onKeyDown = function(event) {
            if (objectState !== event.key) {
              object.play(event.key);
              return objectState = event.key;
            }
          };
          Paper.tool.onKeyUp = function(event) {
            object.stop();
            return objectState = null;
          };
          Paper.view.onFrame = function(event) {
            switch (objectState) {
              case "up":
                return object.translate(new Paper.Point(0, -1));
              case "down":
                return object.translate(new Paper.Point(0, 1));
              case "left":
                return object.translate(new Paper.Point(-1, 0));
              case "right":
                return object.translate(new Paper.Point(1, 0));
            }
          };
          return loader.start();
        });
      };

      return Application;

    })();
  });

}).call(this);
