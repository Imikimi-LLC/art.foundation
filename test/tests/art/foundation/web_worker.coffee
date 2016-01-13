{assert} = require 'art.foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art.foundation"
{
  log
  startWorkerFromJsString, echoWebWorker, startWorkerFromFunction
} = Foundation

suite "Art.Foundation.Browser.WebWorker", ->

  test "startWorkerFromJsString WebWorker.echoWebWorker", (done)->
    worker = startWorkerFromJsString echoWebWorker
    worker.onmessage = -> done()
    worker.postMessage 'Test'

  test 'startWorkerFromFunction', (done) ->
    worker = startWorkerFromFunction -> @onmessage = (e) -> postMessage e.data
    worker.onmessage = ({data}) ->
      assert.eq messageData, data
      done()
    worker.postMessage messageData = 'Test'
