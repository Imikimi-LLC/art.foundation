{assert} = require 'art.foundation/src/art/dev_tools/test/art_chai'
Foundation = require 'art.foundation'

{inspect, log, Binary} = Foundation
{RestClient, binary} = Binary

allPossibleValuesString = new Binary.String new ArrayBuffer 256
for i in [0..255]
  allPossibleValuesString.bytes[i] = i

suite "Art.Foundation.Binary.String", ->
  test "allocate", ->
    my_binary = binary "hello"
    my_str = my_binary.toString()
    assert.equal "hello", my_str

  test "toBase64", (done)->
    base64 = allPossibleValuesString.toBase64()

    allPossibleValuesString.toBase64Callback (base64b) ->
      assert.eq base64, base64b
      done()

  test "fromBase64", ->
    base64 = allPossibleValuesString.toBase64()
    str2 = Binary.String.fromBase64 base64
    base64b = str2.toBase64()
    assert.eq base64, base64b
