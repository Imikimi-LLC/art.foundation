{EncodedImage, log, binary} = Neptune.Art.Foundation
{RestClient} = Neptune.Art

if self.Image
  suite "Art.Foundation.Binary.EncodedImage", ->
    test "base64", ->
      buffer = binary("hi")
      buffer.toBase64()
      .then (base64) ->
        assert.equal atob(base64), "hi"
        assert.equal base64, btoa("hi")

    test "base64 png", ->
      RestClient.getArrayBuffer "#{testAssetRoot}/array_buffer_image_test/sample.png"
      .then (arrayBuffer) ->
        binary(arrayBuffer).toBase64()
      .then (base64) ->
        assert.equal base64[0..9], "iVBORw0KGg"

    test "jpg toImage", ->
      RestClient.getArrayBuffer "#{testAssetRoot}/array_buffer_image_test/sample.jpg"
      .then (arrayBuffer) ->
        EncodedImage.toImage binary(arrayBuffer)
      .then (image)->
        assert.equal image.width, 256
        assert.equal image.height, 256

    test "EncodedImage.get url", ->
      EncodedImage.get "#{testAssetRoot}/array_buffer_image_test/sample.jpg"
      .then (image) ->
        assert.equal image.width, 256
        assert.equal image.height, 256

    test "EncodedImage.get img imeediate load", ->
      img = new Image
      img.src = "#{testAssetRoot}/array_buffer_image_test/sample.jpg"
      EncodedImage.get img
      .then (image) ->
        log {image}
        assert.equal image.width, 256
        assert.equal image.height, 256

    test "EncodedImage.get img delayed load", ->
      img = new Image
      img.src = "#{testAssetRoot}/asset_loader_test/image1.png"
      EncodedImage.get img
      .then (image) ->
        log {image}
        assert.equal image.width, 48
        assert.equal image.height, 58

    test "png toImage", ->
      RestClient.getArrayBuffer "#{testAssetRoot}/array_buffer_image_test/sample.png"
      .then (arrayBuffer) ->
        EncodedImage.toImage binary(arrayBuffer)
      .then (image)->
          assert.equal image.width, 256
          assert.equal image.height, 256
