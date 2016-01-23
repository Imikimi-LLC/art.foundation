# uses XMLHttpRequest2
#  http://www.w3.org/TR/XMLHttpRequest2/
#  http://www.html5rocks.com/en/tutorials/file/xhr2/
{binary}   = require "./string"
BaseObject = require "../base_object"
Promise = require '../promise'

module.exports = class RestClient extends BaseObject

  # NOTE, these callbacks work a little different than the raw XMLHttpRequest callbacks
  #   onSuccess arrayBuffer, url, request
  #     called only on successful request with HTTP 2xx status
  #   onProgress rawEvent, url, request
  #     called as progress is made. Useful properties:
  #       rawEvent.lengthComputable - is the length known?
  #       rawEvent.loaded           - bytes loaded so far
  #       rawEvent.total            - total bytes (length) to load
  #   onError rawEvent, url, request
  #     called if onSuccess is not called
  # errorBack url, request
  @get: (url, onSuccess, onError, onProgress) ->
    request = new XMLHttpRequest
    request.open "GET", url, true
    request.responseType = "arraybuffer"

    request.onload = (rawEvent) ->
      arrayBuffer = request.response # Note: not request.responseText
      if arrayBuffer && arrayBuffer.byteLength > 0 && (request.status == 200 || request.status == 0)
        onSuccess binary(arrayBuffer), url, request
      else
        if onError
          onError rawEvent, url, request

    (request.onprogress = (rawEvent) -> onProgress rawEvent, url, request) if onProgress
    (request.onerror = (rawEvent) -> onError rawEvent, url, request) if onError

    request.send null

  @getJson: (url) ->
    console.log getJson: url
    new Promise (resolve, reject) ->
      request = new XMLHttpRequest
      request.open "GET", url, true
      request.withCredentials = true
      request.setRequestHeader "X-Requested-With", "XMLHttpRequest"

      request.onload = (rawEvent) ->
        console.log getJson_success: url, response:request.response
        resolve JSON.parse(request.response), request, rawEvent
      request.onerror = (rawEvent) -> reject rawEvent

      request.send null

  # http://stackoverflow.com/questions/15668339/can-onprogress-functionality-be-added-to-jquery-ajax-by-using-xhrfields
  @multipartPost: (url, parts, onSuccess, onError, onProgress) ->
    formData = new FormData
    for k, v of parts
      @log k:k, v:v
      formData.append k, v

    request = new XMLHttpRequest
    request.open "POST", url, true
    request.onload = (rawEvent) ->
      if request.status == 200
        onSuccess request.response, url, request
      else if onError
        onError rawEvent, url, parts, request

    (request.upload.onprogress = (rawEvent) -> onProgress rawEvent, url, parts, request) if onProgress
    (request.onerror = (rawEvent) => onError rawEvent, url, parts, request) if onError

    request.send formData


