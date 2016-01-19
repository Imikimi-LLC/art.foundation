{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art-foundation"
{nextTick, eq, inspect, clone} = Foundation

suite "Art.Foundation.Async.Basic", ->
  test "one nextTick", (done)->
    nextTick done

  test "two nextTicks", (done)->
    count = 0
    nextTick ->
      count++
    nextTick ->
      assert.equal count, 1
      done()

  test "nested nextTicks", (done) ->
    sequence = ""
    nextTick -> sequence += "a"
    nextTick ->
      sequence += "b"
      nextTick ->
        sequence += "d"
        assert.equal sequence, "abcd"
        done()
    nextTick -> sequence += "c"
