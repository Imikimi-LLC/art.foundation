define [
  'art.foundation/src/art/dev_tools/test/art_chai'
  'lib/art/foundation/binary'
], (chai, Binary) ->
  assert = chai.assert
  EncodedImage = Binary.EncodedImage
  binary = Binary.binary
  RestClient = Binary.RestClient

  suite "Art.Foundation.Binary.EncodedImage", ->
    test "base64", ->
      buffer = binary("hi")
      base64 = buffer.toBase64()
      assert.equal atob(base64), "hi"
      assert.equal base64, btoa("hi")

    test "base64 png", (done)->
      RestClient.get "/neptune/test/assets/array_buffer_image_test/sample.png", (binaryString, url) ->
        base64 = binaryString.toBase64()
        assert.equal base64[0..9], "iVBORw0KGg"
        done()

    test "jpg toImage", (done)->
      RestClient.get "/neptune/test/assets/array_buffer_image_test/sample.jpg", (binaryString, url) ->
        EncodedImage.toImage binaryString, (image)->
          assert.equal image.width, 256
          assert.equal image.height, 256
          done()

    test "EncodedImage.get", (done)->
      EncodedImage.get "/neptune/test/assets/array_buffer_image_test/sample.jpg", (image) ->
        assert.equal image.width, 256
        assert.equal image.height, 256
        done()

    test "png toImage", (done)->
      RestClient.get "/neptune/test/assets/array_buffer_image_test/sample.png", (binaryString, url) ->
        EncodedImage.toImage binaryString, (image)->
          assert.equal image.width, 256
          assert.equal image.height, 256
          done()
