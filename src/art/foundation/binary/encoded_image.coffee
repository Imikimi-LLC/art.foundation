Inspect      = require "../inspect"
Log          = require "../log"
{binary}     = require "./binary_string"
Promise      = require '../promise'
File         = require '../browser/file'
{inspect} = Inspect
{log} = Log

module.exports = class EncodedImage

  @get: (url, callback) ->
    throw new Error "EncodedImage.get: callback is no longer supported; use returned Promise" if callback
    new Promise (resolve, reject) ->
      image = new Image
      ###
      NOTE: This crossOrigin setting makes file:// urls not work with WkWebKit
      image.crossOrigin = "Anonymous"

      Odly, everything currently seems to work without it. I thought it was required to request
      remote images. I'm leaving it commented out here in case we have future problems. It is
      possible we could included it only if the url is not a file:// url.
      ###
      image.onload = ->
        callBack? image
        resolve image

      image.onerror = (e) ->
        self.encodedImageErrorEvent = e
        console.log "EncodedImage.get error START"
        console.log "self.encodedImageErrorEvent = e"
        console.log e
        console.log e.currentTarget
        console.log e.target
        console.log image
        console.log "image status"
        console.log image.status
        console.log "EncodedImage.get error END"
        reject e

      # must specify src last or crossOrigin won't get set on Safari.
      image.src = url

  ###
  data can be a data URI or
  data can be any type Binary.String.binary accepts

  OUT:
    promise.then (dataUri) ->
    , (errorEventOrErrorObject) ->
  ###
  @toDataUri: (data, callback) ->
    throw new Error "EncodedImage.toDataUri: callback is no longer supported; use returned Promise" if callback
    p = if data instanceof self.File
      new Promise (resolve, reject) =>
        reader = new FileReader
        reader.readAsDataURL data
        reader.onerror = (e) =>
          console.warn "EncodedImage.toDataUri: Image loading failed. Error was not handled.\n  data: #{inspect data}"
          reject error
        reader.onload = (e) =>
          @toDataUri e.target.result
          .then (dataUri) -> resolve dataUri
          , (error) -> reject error
    else if data
      Promise.resolve data
    else
      Promise.reject "data not set"

    p.then (dataString) ->
      dataStringUri = if (typeof dataString) == "string" && dataString[0..4] == "data:"
        dataString
      else
        binary(dataString).toBase64()
        .then (base64) ->
          "data:image/png;base64,#{base64}"

  ###
  OUT:
    promise.then (fullyLoadedHtmlImage) ->
    , (htmlImageOnerrorEvent) ->

  ###
  @loadImage: (source) ->
    new Promise (resolve, reject) ->
      image = new Image
      image.onload  =     -> resolve image
      image.onerror = (e) -> reject e
      image.src = self.source = source

  @toImage: (data, callback) ->
    throw new Error "EncodedImage.toImage: callback is no longer supported; use returned Promise" if callback
    @toDataUri data
    .then (dataUri) =>
      @loadImage dataUri
