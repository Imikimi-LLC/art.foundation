StandardLib = require '../standard_lib'
{toDataUri} = require './data_uri'
{Promise} = StandardLib

module.exports = class EncodedImage

  ###
  OUT:
    promise.then (fullyLoadedHtmlImage) ->
    , (htmlImageOnerrorEvent) ->

  ###
  @get: get = (url) ->
    new Promise (resolve, reject) ->
      image = new Image
      image.crossOrigin = "Anonymous" unless url.match /^file\:\/\//i
      ###
      crossOrigin = "Anonymous" required to getImageData and avoid this error
        "The canvas has been tainted by cross-origin data."

      NOTE: This crossOrigin setting makes file:// urls not work with WkWebKit, so we don't use it then.
      ###
      image.onload  = -> resolve image
      image.onerror = reject

      # must specify src last or crossOrigin won't get set on Safari.
      image.src = url

  # DEPRICATED
  @loadImage: (url) ->
    console.warn "#{@namespacePath}#loadImage DEPRICATED. Use #get"
    get url

  # IN: encodedImageData is
  #   - image-data encoded in a browser-compatible format (jpg, png, etc)
  #   - wrapped in any data-type toDataUri accepts (includes: File, BinaryString, ArrayBuffer, data-uris...)
  @toImage: (encodedImageData) ->
    toDataUri(encodedImageData).then (dataUri) => get dataUri
