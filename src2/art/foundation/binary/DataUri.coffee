StandardLib = require '../StandardLib'

{binary}     = require "./binary_string"
{readAsDataURL} = require './file'

{Promise, isString} = StandardLib

module.exports = class DataUri

  @isDataUri: isDataUri= (dataString) ->
    isString(dataString) && dataString[0..4] == "data:"

  ###
  IN: data can be any of
    File: HTML File object is read as ArrayBuffer
    DataURI string: if it is already a data-uri string it is just returned as a successful promise
    any type 'binary' accepts

  OUT:
    promise.then (dataUri) ->
    , (errorEventOrErrorObject) ->
  ###
  @toDataUri: (data) ->
    throw new Error "data not set" unless data
    return readAsDataURL data if data instanceof self.File
    return Promise.resolve data if isDataUri data
    binary(data).toBase64()
    .then (base64) ->
      "data:image/png;base64,#{base64}"
