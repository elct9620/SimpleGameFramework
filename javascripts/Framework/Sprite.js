/*
# Sprite
#
# Manage sprite sheet animat
*/


(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Paper'], function(Paper) {
    var Group, Path, Point, Raster, Rectangle, Size, Sprite, framePerSecond, onFrame, playSpeed, spriteColumn, spriteHeight, spriteRow, spriteWidth;

    Raster = Paper.Raster;
    Rectangle = Paper.Rectangle;
    Point = Paper.Point;
    Path = Paper.Path;
    Size = Paper.Size;
    Group = Paper.Group;
    spriteWidth = 32;
    spriteHeight = 32;
    spriteColumn = 3;
    spriteRow = 4;
    framePerSecond = 12;
    playSpeed = 1 / framePerSecond;
    onFrame = function(event) {
      if (this.isStop) {
        return;
      }
      if (!this.currentAnimate) {
        return;
      }
      if (event.time - this.lastFrameTime > this.playSpeed) {
        if (this.animateLoop >= this.currentAnimateLength) {
          this.animateLoop = 0;
        }
        this.updateSpritePosition();
        this.animateLoop = this.animateLoop + 1;
        return this.lastFrameTime = event.time;
      }
    };
    return Sprite = (function(_super) {
      __extends(Sprite, _super);

      Sprite.prototype.width = spriteWidth;

      Sprite.prototype.height = spriteHeight;

      Sprite.prototype.column = spriteColumn;

      Sprite.prototype.row = spriteRow;

      Sprite.prototype.spriteImage = null;

      Sprite.prototype.spriteFrame = null;

      Sprite.prototype.spriteClip = null;

      Sprite.prototype.animation = {};

      Sprite.prototype.fps = framePerSecond;

      Sprite.prototype.playSpeed = playSpeed;

      Sprite.prototype.animateLoop = 0;

      Sprite.prototype.isStop = false;

      Sprite.prototype.currentAnimate = null;

      Sprite.prototype.currentAnimateLength = 0;

      Sprite.prototype.lastFrameTime = 0;

      function Sprite(image, options) {
        var _this = this;

        options || (options = {});
        if (options.width) {
          this.width = options.width;
        }
        if (options.height) {
          this.height = options.height;
        }
        if (options.column) {
          this.column = options.column;
        }
        if (options.row) {
          this.row = options.row;
        }
        if (options.animation) {
          this.animation = this.options.animation;
        }
        this.spriteImage = new Raster(image);
        this.spriteImage.position = new Point(this.spriteImage.size.width / 2, this.spriteImage.size.height / 2);
        this.spriteFrame = new Rectangle(new Point(0, 0), new Size(this.width, this.height));
        this.spriteClip = new Path.Rectangle(this.spriteFrame);
        Sprite.__super__.constructor.call(this, [this.spriteClip, this.spriteImage]);
        this.clipped = true;
        this.onFrame = function(event) {
          return onFrame.call(_this, event);
        };
      }

      Sprite.prototype.addAnimation = function(name, frameSet) {
        return this.animation[name] = frameSet;
      };

      Sprite.prototype.setAnimation = function(name, frameSet) {
        return this.addAnimation(name, frameSet);
      };

      Sprite.prototype.getFramePosition = function(name) {
        var column, frameNumber, frameSet, positions, row, _i, _len;

        frameSet = this.animation[name];
        positions = [];
        for (_i = 0, _len = frameSet.length; _i < _len; _i++) {
          frameNumber = frameSet[_i];
          frameNumber = frameNumber - 1;
          column = frameNumber % this.column;
          row = Math.floor(frameNumber / this.column);
          positions.push(new Point(column * this.width, row * this.height));
        }
        return positions;
      };

      Sprite.prototype.calcSpritePosition = function() {
        var animatePosition, groupPosition;

        groupPosition = this.position;
        animatePosition = this.currentAnimate[this.animateLoop];
        return new Point(groupPosition.x - animatePosition.x, groupPosition.y - animatePosition.y);
      };

      Sprite.prototype.updateSpritePosition = function() {
        return this.spriteImage.position = this.calcSpritePosition();
      };

      Sprite.prototype.play = function(name) {
        this.isStop = false;
        return this.setAnimation(name);
      };

      Sprite.prototype.setAnimation = function(name) {
        this.currentAnimate = this.getFramePosition(name);
        return this.currentAnimateLength = this.currentAnimate.length;
      };

      Sprite.prototype.stop = function(name, frame) {
        this.isStop = true;
        if (name && frame) {
          this.setAnimation(name);
          this.animateLoop = frame;
          return this.updateSpritePosition();
        }
      };

      Sprite.prototype.setFPS = function(fps) {
        this.fps = fps;
        return this.playSpeed = 1 / fps;
      };

      return Sprite;

    })(Group);
  });

}).call(this);
