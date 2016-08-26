
Foundation = require "art-foundation"
{nextTick, eq, inspect, clone} = Foundation

suite "Art.Foundation.StandardLib.nextTick", ->
  test "one nextTick", (done)->
    nextTick done

  test "nextTick with Promise", ->
    nextTick()

  test "nextTick is not immediate", ->
    nextTickHappened = false
    p = nextTick -> nextTickHappened = true
    assert.eq nextTickHappened, false
    p.then ->
      assert.eq nextTickHappened, true

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
