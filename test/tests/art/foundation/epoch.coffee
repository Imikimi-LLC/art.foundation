{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art-foundation"
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
    assert.eq epoch.epochLength, 1

  test "onNextReady works even if there are no changingElements", ->
    # call twice in case there are some channgingElements
    assert.eq epoch.epochLength, 0

    promise = epoch.onNextReady()
    assert.eq epoch._epochQueued, true
    assert.eq epoch.epochLength, 0
    promise

  test "onNextReady forceNextEpoch = false: shouldn't force an epoch", ->
    # call twice in case there are some channgingElements
    assert.eq epoch.epochLength, 0

    epoch.onNextReady (->), false

    assert.eq epoch._epochQueued, false
    assert.eq epoch.epochLength, 0
