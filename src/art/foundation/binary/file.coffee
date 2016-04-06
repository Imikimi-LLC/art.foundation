StandardLib = require '../standard_lib'
{Promise} = StandardLib
# Uint8Array - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays/Uint8Array

module.exports = class File
  @readAsArrayBuffer: (file) ->
    new Promise (resolve, reject) ->
      fr = new FileReader
      fr.readAsArrayBuffer file
      fr.onerror = (event) => reject event
      fr.onload  = (event) => resolve event.target.result
