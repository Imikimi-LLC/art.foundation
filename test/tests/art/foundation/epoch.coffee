{assert} = require 'art.foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art.foundation"
{inspect, Epoch} = Foundation

epoch = new Epoch

suite "Art.Foundation.Epoch", ->
  test "queue function", (done)->
    epoch.queueItem ->
      done()

  test "function handled on nextTick", (done)->
    count = 0
    epoch.queueItem ->
      assert.eq count, 1
      done()
    count++

  test "onNextReady works even if there are no changingElements", (done)->
    # call twice in case there are some channgingElements
    assert.eq epoch.epochLength, 0

    epoch.onNextReady ->
      done()

    assert.eq epoch.epochLength, 1
