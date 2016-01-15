{assert} = require 'art.foundation/src/art/dev_tools/test/art_chai'
{Binary, log} = require 'art.foundation'

suite "Art.Foundation.Binary.RestClient", ->
  test "GET", (done)->
    Binary.RestClient.get "#{testAssetRoot}/array_buffer_rest_client_test/hello.txt", (binaryString, url) ->
      assert.equal "hello in a file.", binaryString.toString()
      done()

  test "onprogress", (done)->
    Binary.RestClient.get "#{testAssetRoot}/array_buffer_rest_client_test/hello.txt", (binaryString, url) ->
      assert.equal "hello in a file.", binaryString.toString()
    , null, (e) -> #onprogress
      if e.lengthComputable
        log "#{(e.loaded / e.total) * 100}% loaded by RestClient. size: #{e.total}"
        done()

  test "onerror", (done)->
    Binary.RestClient.get "#{testAssetRoot}/array_buffer_rest_client_test/doesnotexist.txt", (binaryString, url) ->
      assert.equal "hello in a file.", binaryString.toString()
    , (e) -> #onerror
      done()

