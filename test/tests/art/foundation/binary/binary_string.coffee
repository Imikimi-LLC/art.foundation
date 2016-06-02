{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
Foundation = require 'art-foundation'

{inspect, log, binary, BinaryString} = Foundation

self.atob ||= require 'atob'

allPossibleValuesString = new BinaryString new ArrayBuffer 256
for i in [0..255]
  allPossibleValuesString.bytes[i] = i

suite "Art.Foundation.Binary.BinaryString", ->
  test "allocate", ->
    my_binary = binary "hello"
    my_str = my_binary.toString()
    assert.equal "hello", my_str

  test "toBase64", ->
    allPossibleValuesString.toBase64()
    .then (base64) ->
      assert.eq base64, "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w=="

  test "fromBase64", ->
    allPossibleValuesString.toBase64()
    .then (base64) ->
      BinaryString.fromBase64 base64
      .toBase64()
      .then (base64b) ->
        assert.eq base64, base64b
