###
# Game Loader
#
# Load game resource via wrapper PxLoader
###

define ['PxLoader', 'PxLoaderImage', 'PxLoaderSound'], (PxLoader, PxLoaderImage, PxLoaderSound)->

  class Loader extends PxLoader
    imageResources: {}
    soundResources: {}
    totalCount: 0
    completedCount: 0

    addImages: (images) ->
      objects = []
      for image in images
        if typeof(image) == "string"
          objects.push(@addImage image)
          continue

        objects.push(@addImage image.url, image.tags, image.priority)

      return objects

    addImage: (url, tags, priority) ->
      @totalCount = @totalCount + 1
      @imageResources[url] = super url, tags, priority

    getImage: (imageUrl) ->
      @imageResources[imageUrl]

    addSounds: (sounds) ->
      objects = []
      for sound in sounds
        if typeof(sound) == "string"
          objects.push(@addSound sound)
          continue

        objects.push(@addSound sound.url, sound.tags, sound.priority)

      return objects

    addSound: (url, tags, priority) ->
      @totalCount = @totalCount + 1
      @soundResources[url] = super url, tags, priority

    getSound: (soundUrl) ->
      @soundResources[soundUrl]

    onComplete: (callback) ->
      @addCompletionListener(callback)

    onProgress: (callback) ->
      @addProgressListener (e)->
        @completedCount = e.completedCount

        callback(e)
