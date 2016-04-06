# uses XMLHttpRequest2
#  http://www.w3.org/TR/XMLHttpRequest2/
#  http://www.html5rocks.com/en/tutorials/file/xhr2/
StandardLib = require './standard_lib'
ClassSystem = require './class_system'
{BaseObject} = ClassSystem
{present, Promise, log, merge} = StandardLib

module.exports = class RestClient extends BaseObject

  # http://stackoverflow.com/questions/15668339/can-onprogress-functionality-be-added-to-jquery-ajax-by-using-xhrfields
  # OLD - do we need this anymore??? (2016-Feb SBD)
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

  ###
  get/put/post

  IN:
    url: valid url string
    data: data to send
    options:
      headers: plain object of additional headers to set

      onProgress: (statusObject) -> return value ignored
        IN: statusObject - see below
        callback function used to report progress

      responseType: "arraybuffer", "blob", "document", "json", or "text"
        default: "text"
        https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType

  OUT: Promise:
    resolved: (responseData) ->
    rejected: (statusObject) ->

  responseData:
    a String, or the type specified by the responseType option

  statusObject:
    event:    # the HTML event object
    request:  # the XMLHttpRequest
    location: # the url location of the object just PUT or POSTEd
    progress:
      a value between 0 and 1
      If the progress is indeterminant, this is 0
      If this isn't an onProgress event, this is the amount of progress
      that was made up to the point of the event.
  ###

  @get:  (url, options) ->
    RestClient._sendRequest merge options,
      verb: "GET"
      url: url

  # OUT: Promise -> responseData is ArrayBuffer
  @getArrayBuffer: (url, options) ->
    @get url, merge options, responseType: "arraybuffer"

  # OUT: Promise -> responseData is plainObject (repsonseData string parsed as JSON)
  @getJson: (url, options) ->
    @get url, merge options, responseType: "json"

  @put:  (url, data, options) ->
    RestClient._sendRequest merge options,
      verb: "PUT"
      url: url
      data: data

  @post: (url, data, options) ->
    RestClient._sendRequest merge options,
      verb: "POST"
      url: url
      data: data

  ####################
  # PRIVATE
  ####################

  ###
  IN:
    options:
      verb: "GET", "PUT", "POST"

      data: data to _sendRequest - passed to xmlHttpRequest._sendRequest

      plus all the standard options for get/put/post

  OUT: see get/put/post above
  ###
  @_sendRequest: (options) ->
    {verb, url, data, headers, onProgress, responseType} = options
    new Promise (resolve, reject) ->

      request = new XMLHttpRequest
      request.open verb, url, true
      request.responseType = responseType if present responseType
      request.setRequestHeader k, v for k, v of headers if headers
      request.onerror = (event) -> reject merge status, event:event
      request.onload  = (event) ->
        if (request.status / 100 | 0) == 2
          if request.response
            resolve request.response
          else
            reject merge status, event:event
        else
          reject merge status, event:event

      status =
        progress: 0
        request: request
        location: url

      if onProgress
        progressCallbackInternal = (event) ->
          {total, loaded} = event
          onProgress? status = merge status, event:event, progress: (if total > 0 then loaded / total else 0)

        if verb == "GET"
          request.onprogress = progressCallbackInternal
        else
          request.upload.onprogress = progressCallbackInternal

      request.send if data
          if data.toArrayBuffer
            data.toArrayBuffer()
          else
            data
        else
          null
