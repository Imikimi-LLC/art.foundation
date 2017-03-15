StandardLib = require 'art-standard-lib'
{toDataUri} = require './DataUri'
{log, Promise, readFileAsDataUrl, ErrorWithInfo, isString} = StandardLib
{isBinary, binary} = require './BinaryString'

module.exports = class EncodedImage

  ###
  OUT:
    promise.then (fullyLoadedHtmlImage) ->
    , (htmlImageOnerrorEvent) ->

  ###
  @get: get = (urlOrBinary, options) ->
    Promise.then ->
      if isBinary urlOrBinary
        if Neptune.isNode
          # node canvas can load directly from a "Buffer" object
          binary(urlOrBinary).nodeBuffer
        else
          toDataUri urlOrBinary
      else if isString urlOrBinary
        if options
          Neptune.Art.Foundation.RestClient.getArrayBuffer urlOrBinary, options
          .then (arrayBuffer) -> readFileAsDataUrl new Blob [arrayBuffer]
        else urlOrBinary
      else throw new Error "expected arg #1 to be string or binary"

    .then (url) -> new Promise (resolve, reject) ->
      image = new Image
      image.crossOrigin = "Anonymous" if url.match? /^(file|data)\:/i
      ###
      crossOrigin = "Anonymous" required to getImageData and avoid this error
        "The canvas has been tainted by cross-origin data."

      NOTE:
        file: urls break with crossOrigin in WkWebKit
        data: urls break with crossOrigin in Safari
      ###
      image.onload  = -> resolve image
      image.onerror = (event) -> reject new ErrorWithInfo "image load error", event

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
