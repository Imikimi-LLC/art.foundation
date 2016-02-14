{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
{Binary, RestClient} = require 'art-foundation'
EncodedImage = Binary.EncodedImage
binary = Binary.binary

suite "Art.Foundation.Binary.EncodedImage", ->
  test "base64", ->
    buffer = binary("hi")
    base64 = buffer.toBase64()
    assert.equal atob(base64), "hi"
    assert.equal base64, btoa("hi")

  test "base64 png", (done)->
    RestClient.getArrayBuffer "#{testAssetRoot}/array_buffer_image_test/sample.png"
    .then (arrayBuffer) ->
      base64 = binary(arrayBuffer).toBase64()
      assert.equal base64[0..9], "iVBORw0KGg"
      done()


  test 'loadImage', ->
    EncodedImage.loadImage "#{testAssetRoot}/array_buffer_image_test/sample.jpg"
    .then (image)->
      assert.equal image.width, 256
      assert.equal image.height, 256

  test "jpg toImage", ->
    RestClient.getArrayBuffer "#{testAssetRoot}/array_buffer_image_test/sample.jpg"
    .then (arrayBuffer) ->
      EncodedImage.toImage binary(arrayBuffer)
    .then (image)->
      assert.equal image.width, 256
      assert.equal image.height, 256

  test "EncodedImage.get", ->
    EncodedImage.get "#{testAssetRoot}/array_buffer_image_test/sample.jpg"
    .then (image) ->
      assert.equal image.width, 256
      assert.equal image.height, 256

  test "png toImage", ->
    RestClient.getArrayBuffer "#{testAssetRoot}/array_buffer_image_test/sample.png"
    .then (arrayBuffer) ->
      EncodedImage.toImage binary(arrayBuffer)
    .then (image)->
        assert.equal image.width, 256
        assert.equal image.height, 256
