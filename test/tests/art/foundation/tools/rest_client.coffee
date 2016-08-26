{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
{binary, log, RestClient} = require 'art-foundation'

if self.XMLHttpRequest
  suite "Art.Foundation.Tools.RestClient", ->

    test "get", ->
      RestClient.get "#{testAssetRoot}/array_buffer_rest_client_test/hello.txt"
      .then (string) ->
        assert.equal "hello in a file.", string

    test "getJson", ->
      RestClient.getJson "#{testAssetRoot}/array_buffer_rest_client_test/test.json"
      .then (json) ->
        assert.eq json, number: 123, object: {a: 1, b: 2, c: 3}, array: [1, 2, 3], true: true, false: false, string: "hi mom"

    test "getJson invalid json is rejected", (done) ->
      RestClient.getJson "#{testAssetRoot}/array_buffer_rest_client_test/invalid.json"
      .then (json) ->
        log "here"
        assert.fail "should not get here since json is invalid", json
      , (error) ->
        log "there"
        log invalidJson:error
        self.invalidJson = error
        done()

    test "getArrayBuffer", ->
      RestClient.getArrayBuffer "#{testAssetRoot}/array_buffer_rest_client_test/hello.txt"
      .then (arrayBuffer) ->
        assert.equal "hello in a file.", binary(arrayBuffer).toString()

    test "onProgress", ->
      lastProgress =
      RestClient.get "#{testAssetRoot}/array_buffer_rest_client_test/hello.txt",
        showProgressAfter: 0
        onProgress: (progress) -> #onProgress
          lastProgress = progress
      .then (string) ->
        assert.equal "hello in a file.", string.toString()
        {event, progress} = lastProgress
        assert.equal progress, 1
        assert.equal event.loaded, event.total

    test "get 404 is rejected", (done)->
      RestClient.get "#{testAssetRoot}/array_buffer_rest_client_test/doesnotexist.txt"
      .then (string) ->
        assert.equal "hello in a file.", string.toString()
      , (error) ->
        done()

