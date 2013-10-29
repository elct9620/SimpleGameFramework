###
# Sprite
#
# Manage sprite sheet animat
###

define ['Paper'], (Paper)->

  # Alias Paper
  Raster = Paper.Raster # Image Object
  Rectangle = Paper.Rectangle
  Point = Paper.Point
  Path = Paper.Path
  Size = Paper.Size
  Group = Paper.Group

  # Default Config
  spriteWidth = 32
  spriteHeight = 32
  spriteColumn = 3
  spriteRow = 4
  framePerSecond = 12
  playSpeed = 1 / framePerSecond

  # onFrame
  onFrame = (event)->
    return if @isStop
    return unless @currentAnimate
    if(event.time - @lastFrameTime > @playSpeed)
      if @animateLoop >= @currentAnimateLength
        @animateLoop = 0

      @updateSpritePosition()

      @animateLoop = @animateLoop + 1
      @lastFrameTime = event.time


  # Extend paper.js Group as Sprite
  class Sprite extends Group
    width: spriteWidth
    height: spriteHeight
    column: spriteColumn
    row: spriteRow

    spriteImage: null
    spriteFrame: null
    spriteClip: null

    animation: {}
    fps: framePerSecond
    playSpeed: playSpeed
    animateLoop: 0

    isStop: false
    currentAnimate: null
    currentAnimateLength: 0
    lastFrameTime: 0

    constructor: (image, options)->
      options ||= {}
      @width = options.width if options.width
      @height = options.height if options.height
      @column = options.column if options.column
      @row = options.row if options.row
      @animation = @options.animation if options.animation

      @spriteImage = new Raster(image)
      @spriteImage.position = new Point(@spriteImage.size.width / 2, @spriteImage.size.height / 2) # Move Image to left-top point
      @spriteFrame = new Rectangle(new Point(0, 0), new Size(@width, @height))
      @spriteClip = new Path.Rectangle(@spriteFrame)
      super [@spriteClip, @spriteImage] # Do original constructor and add ciip mask and image
      @clipped = true
      @onFrame = (event) =>
        onFrame.call(@, event)

    addAnimation: (name, frameSet)->
      @animation[name] = frameSet

    setAnimation: (name, frameSet)->
      @addAnimation(name, frameSet) # Alias to add animation

    getFramePosition: (name)->
      frameSet = @animation[name]

      positions = []

      for frameNumber in frameSet
        frameNumber = frameNumber - 1 # Fix to array type
        column = frameNumber % @column
        row = Math.floor(frameNumber / @column)
        positions.push(new Point(
          column * @width,
          row * @height
        ))

      return positions

    calcSpritePosition: ()->
     # Should using "@spriteGtoup.position - @currentAnimate[@animateLoop]" but not work
     groupPosition =  @position
     animatePosition = @currentAnimate[@animateLoop]
     new Point(groupPosition.x - animatePosition.x, groupPosition.y - animatePosition.y)

    updateSpritePosition: ()->
      @spriteImage.position =  @calcSpritePosition()

    play: (name)->
      @isStop = false
      @setAnimation(name)

    setAnimation: (name) ->
      @currentAnimate = @getFramePosition(name)
      @currentAnimateLength = @currentAnimate.length

    stop: (name, frame)->
      @isStop = true
      if name and frame
        @setAnimation(name)
        @animateLoop = frame
        @updateSpritePosition()

    setFPS: (fps)->
      @fps = fps
      @playSpeed = 1 / fps





