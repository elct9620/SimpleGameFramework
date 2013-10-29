###
# Framework Application
###

define ['domReady', 'Framework/Loader', 'Paper', 'Framework/Sprite'], (domReady, Loader, Paper, Sprite)->

  class Application
    version: '0.1.0'
    constructor: ()->
      console.log "Game Framework Version: #{@version}"

    run: ()->
      domReady ()->
        Paper.setup(document.getElementById('GameWindow'))
        loader = new Loader()
        objects = loader.addImages(['images/character/Actor4.png'])
        object = null
        objectState = ""
        loader.onComplete ()->
          object = new Sprite(objects[0])
          object.addAnimation("down", [1, 2, 3])
          object.addAnimation("left", [4, 5, 6])
          object.addAnimation("right", [7, 8, 9])
          object.addAnimation("up", [10, 11, 12])

        Paper.tool.onKeyDown = (event) ->
          if objectState != event.key
            object.play(event.key)
            objectState = event.key

        Paper.tool.onKeyUp = (event) ->
          object.stop()
          objectState = null

        Paper.view.onFrame = (event) ->
          switch objectState
            when "up"
              object.translate(new Paper.Point(0, -1))
            when "down"
              object.translate(new Paper.Point(0, 1))
            when "left"
              object.translate(new Paper.Point(-1, 0))
            when "right"
              object.translate(new Paper.Point(1, 0))

        loader.start()


