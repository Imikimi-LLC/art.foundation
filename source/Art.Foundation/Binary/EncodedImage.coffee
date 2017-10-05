StandardLib = require 'art-standard-lib'
{toDataUri} = require './DataUri'
{log, Promise, readFileAsDataUrl, ErrorWithInfo, isString} = StandardLib
{isBinary, binary} = require './BinaryString'
require 'art-rest-client'
{Image, HTMLImageElement} = global

module.exports = class EncodedImage

  ###
  IN:
    first arg:
      String: url
      or
      Binary: image data
      or
      HTMLImageElement
    options: options for RestClient.getArrayBuffer
      NOTE: if options is provided, image-data is fetched using
        RestClient.getArrayBuffer
      This seems to work to endrun TAINT.

  OUT:
    promise.then (fullyLoadedHtmlImage) ->
    , (htmlImageOnerrorEvent) ->

  ###
  @get: get = (source, options) ->
    return Promise.reject() unless source?
    if source.constructor == HTMLImageElement || source.constructor == Image
      image = source
      {complete, naturalWidth} = source
      new Promise (resolve, reject) ->
        if complete && naturalWidth > 0
          resolve source
        else
          image.onload  = -> resolve image
          image.onerror = (event) -> reject new ErrorWithInfo "image load error", event
    else
      Promise.then ->

        if isBinary source
          if Neptune.isNode
            # node canvas can load directly from a "Buffer" object
            binary(source).nodeBuffer
          else
            toDataUri source

        else if isString source
          if options
            Neptune.Art.RestClient.getArrayBuffer source, options
            .then (arrayBuffer) -> readFileAsDataUrl new Blob [arrayBuffer]
          else source
        else throw new Error "expected arg #1 to be string or binary"

      .then (url) ->
        image = new Image
        image.src = url

        ###
        crossOrigin = "Anonymous" required to getImageData and avoid this error
          "The canvas has been tainted by cross-origin data."

        NOTE:
          file: urls break with crossOrigin in WkWebKit
          data: urls break with crossOrigin in Safari
        ###
        image.crossOrigin = "Anonymous" if url.match? /^(file|data)\:/i

        get image

  # IN: encodedImageData is
  #   - image-data encoded in a browser-compatible format (jpg, png, etc)
  #   - wrapped in any data-type toDataUri accepts (includes: File, BinaryString, ArrayBuffer, data-uris...)
  @toImage: (encodedImageData) ->
    toDataUri(encodedImageData).then (dataUri) => get dataUri
