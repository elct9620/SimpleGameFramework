/*
# Game Loader
#
# Load game resource via wrapper PxLoader
*/


(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['PxLoader', 'PxLoaderImage', 'PxLoaderSound'], function(PxLoader, PxLoaderImage, PxLoaderSound) {
    var Loader, _ref;

    return Loader = (function(_super) {
      __extends(Loader, _super);

      function Loader() {
        _ref = Loader.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Loader.prototype.imageResources = {};

      Loader.prototype.soundResources = {};

      Loader.prototype.totalCount = 0;

      Loader.prototype.completedCount = 0;

      Loader.prototype.addImages = function(images) {
        var image, objects, _i, _len;

        objects = [];
        for (_i = 0, _len = images.length; _i < _len; _i++) {
          image = images[_i];
          if (typeof image === "string") {
            objects.push(this.addImage(image));
            continue;
          }
          objects.push(this.addImage(image.url, image.tags, image.priority));
        }
        return objects;
      };

      Loader.prototype.addImage = function(url, tags, priority) {
        this.totalCount = this.totalCount + 1;
        return this.imageResources[url] = Loader.__super__.addImage.call(this, url, tags, priority);
      };

      Loader.prototype.getImage = function(imageUrl) {
        return this.imageResources[imageUrl];
      };

      Loader.prototype.addSounds = function(sounds) {
        var objects, sound, _i, _len;

        objects = [];
        for (_i = 0, _len = sounds.length; _i < _len; _i++) {
          sound = sounds[_i];
          if (typeof sound === "string") {
            objects.push(this.addSound(sound));
            continue;
          }
          objects.push(this.addSound(sound.url, sound.tags, sound.priority));
        }
        return objects;
      };

      Loader.prototype.addSound = function(url, tags, priority) {
        this.totalCount = this.totalCount + 1;
        return this.soundResources[url] = Loader.__super__.addSound.call(this, url, tags, priority);
      };

      Loader.prototype.getSound = function(soundUrl) {
        return this.soundResources[soundUrl];
      };

      Loader.prototype.onComplete = function(callback) {
        return this.addCompletionListener(callback);
      };

      Loader.prototype.onProgress = function(callback) {
        return this.addProgressListener(function(e) {
          this.completedCount = e.completedCount;
          return callback(e);
        });
      };

      return Loader;

    })(PxLoader);
  });

}).call(this);
