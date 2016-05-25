StandardLib = require '../standard_lib'
{Promise} = StandardLib
# Uint8Array - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays/Uint8Array

module.exports = class File
  @_readWithPromise: (file, readFunction) ->
    (file) -> new Promise (resolve, reject) ->
      fr = new FileReader
      fr[readFunction] file
      fr.onerror = reject
      fr.onload  = (event) => resolve event.target.result

  @readAsArrayBuffer: @_readWithPromise "readAsArrayBuffer"
  @readAsDataURL:     @_readWithPromise "readAsDataURL"
