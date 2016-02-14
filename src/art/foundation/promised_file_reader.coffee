Promise = require './promise'

module.exports = class PromisedFileReader

  @readFileAsDataUrl: (file) ->
    new Promise (resolve, reject) ->
      reader = new FileReader
      reader.readAsDataURL file
      reader.onload =  (e) => resolve e.target.result
      reader.onerror = (e) => reject error
