# uses XMLHttpRequest2
#  http://www.w3.org/TR/XMLHttpRequest2/
#  http://www.html5rocks.com/en/tutorials/file/xhr2/
StandardLib = require './standard_lib'
{present, Promise, log, merge} = StandardLib

module.exports = class RestClient

  ###
  get/put/post

  IN:
    url: valid url string

    data: (only on PUT/POST requests)
      data to send
      NOTE: must be null if using formData

    options:

      formData: plain object of key-value pairs to submit as form-data
        You can even use this for "get" requests.
        NOTE: "data" must be null if using "formData"

      headers: plain object of additional HTTP headers to set

      onProgress: (restRequestStatus) -> null
        called each time progress is made
        NOTE: restRequestStatus.progress contains a 0-to-1 number that indicates how much progress has been made.
          progress indicates DOWNLOAD progress for GET requests and UPLOAD progress for all others.

      responseType: "arraybuffer", "blob", "document", "json", or "text"
        default: "text"
        NOTE: "json" is handled manually since IE11 and iOS7 don't support the "json" option.
        https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType

  OUT: Promise:
    resolved: (responseData) ->
    rejected: (restRequestStatus) ->

  responseData:
    a String, or the type specified by the responseType option

  restRequestStatus:
    event:    # the HTML event object
    request:  # the XMLHttpRequest
    options:  # the restRequest options: verb, url, data, headers, onProgress, responseType, formData
    status:   # the HTML status code, if the request completed
    response: # responseData
    error:    # Error object or string-explaination of why the request was rejected
    progress:
      a value between 0 and 1
      If the progress is indeterminant, this is 0
      If this isn't an onProgress event, this is the amount of progress
      that was made up to the point of the event.
  ###

  @get:  (url, options) ->
    RestClient.restRequest merge options,
      verb: "GET"
      url: url

  @delete:  (url, options) ->
    RestClient.restRequest merge options,
      verb: "DELETE"
      url: url

  # OUT: Promise -> responseData is ArrayBuffer
  @getArrayBuffer: (url, options) ->
    @get url, merge options, responseType: "arraybuffer"

  @put:  (url, data, options) ->
    RestClient.restRequest merge options,
      verb: "PUT"
      url: url
      data: data

  @post: (url, data, options) ->
    RestClient.restRequest merge options,
      verb: "POST"
      url: url
      data: data

  ###
  OUT: Promise -> responseData is plainObject (responseData string parsed as JSON)
  NOTE: if the response fails to parse as JSON, the promise will be rejected.
    The unparsed response can be accessed as follows: promise.then ..., (restRequestStatus) -> restRequestStatus.response

  IN:
    data:     if data is provided, it will be encoded as JSON (this becomes the request body)
    url:      (See above)
    options:  (See above)
  ###
  @getJson:     (url, options)       -> @get  url,                               merge options, responseType: "json", headers: Accept: 'application/json'
  @deleteJson:  (url, options)       -> @delete  url,                            merge options, responseType: "json", headers: Accept: 'application/json'
  @putJson:     (url, data, options) -> @put  url, data && JSON.stringify(data), merge options, responseType: "json", headers: Accept: 'application/json'
  @postJson:    (url, data, options) -> @post url, data && JSON.stringify(data), merge options, responseType: "json", headers: Accept: 'application/json'

  ###
  IN:
    options:
      verb: "GET", "PUT", "POST"

      data: data to restRequest - passed to xmlHttpRequest.restRequest

      plus all the options for get/put/post listed above

  OUT: see get/put/post above
  ###
  @restRequest: (options) ->
    {verb, url, data, headers, onProgress, responseType, formData} = options
    if formData
      throw new Error "can't specify both 'data' and 'formData'" if data
      data = new FormData
      data.append k, v for k, v of formData
    else
      data = data?.toArrayBuffer?() || data

    new Promise (resolve, reject) ->

      restRequestStatus =
        request: request = new XMLHttpRequest
        progress: 0
        options: options

      rescuedGetResponse = ->
        try
          @getResponse()
        catch
          request.response

      getResponse = ->
        {response} = request
        if response && responseType == "json"
          response = JSON.parse response
        else
          response

      request.open verb, url, true

      # NOTE: IE11 and IOS7 don't support responseType "json"
      # https://developer.mozilla.org/en-US/docs/Web/API/FormData
      # http://caniuse.com/#search=FormData
      request.responseType = responseType if present(responseType) && responseType != "json"

      request.setRequestHeader k, v for k, v of headers if headers

      request.addEventListener "error", (event) ->
        reject merge restRequestStatus, event: event, response: getResponse(), error: "XMLHttpRequest error"

      request.addEventListener "load", (event) ->
        {status, response} = request

        if (status / 100 | 0) == 2
          try
            resolve getResponse()
          catch error
            reject merge restRequestStatus, event: event, status: status, response: rescuedGetResponse(), error: error
        else
          reject merge restRequestStatus, event: event, status: status, response: rescuedGetResponse(), error: "HTTP #{status} error"

      if onProgress
        progressCallbackInternal = (event) ->
          {total, loaded} = event
          onProgress? restRequestStatus = merge restRequestStatus, event:event, progress: (if total > 0 then loaded / total else 0)

        if verb == "GET"
          request.addEventListener "progress", progressCallbackInternal
        else
          request.upload.addEventListener "progress", progressCallbackInternal

      request.send data
