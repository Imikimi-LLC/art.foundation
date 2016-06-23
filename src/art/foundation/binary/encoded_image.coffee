StandardLib = require '../standard_lib'
{toDataUri} = require './data_uri'
{Promise, readFileAsDataUrl} = StandardLib

module.exports = class EncodedImage

  ###
  OUT:
    promise.then (fullyLoadedHtmlImage) ->
    , (htmlImageOnerrorEvent) ->

  ###
  @get: get = (url, options) ->
    Promise.resolve()
    .then ->
      if options
        Neptune.Art.Foundation.RestClient.getArrayBuffer url, options
        .then (arrayBuffer) -> readFileAsDataUrl new Blob [arrayBuffer]
        .then (dataUri) => url = dataUri

    .then -> new Promise (resolve, reject) ->
      image = new Image
      image.crossOrigin = "Anonymous" unless url.match /^(file|data)\:/i
      ###
      crossOrigin = "Anonymous" required to getImageData and avoid this error
        "The canvas has been tainted by cross-origin data."

      NOTE:
        file: urls break with crossOrigin in WkWebKit
        data: urls break with crossOrigin in Safari
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
