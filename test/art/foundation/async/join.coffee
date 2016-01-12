define [
  'art.foundation/src/art/dev_tools/test/art_chai'
  'lib/art/foundation'
], (chai, Foundation) ->
  assert = chai.assert
  {timeout, log, Join} = Foundation

  suite "Art.Foundation.Async.Join", ->
    test "basic join", (testDone)->
      joiner = new Join
      for i in [0..9]
        do (i) ->
          joiner.do (done) ->
            timeout i, ->
              done i

      joiner.join (results) ->
        assert.eq results, [0,1,2,3,4,5,6,7,8,9]
        log results:results
        testDone()

    test "join with sync calls", (testDone)->
      joiner = new Join
      joiner.do -> order.push(10);10
      joiner.do -> order.push(20);20
      order = [0]
      joiner.join (results) ->
        assert.eq results, [10,20]
        assert.eq order, [0,10,20]
        testDone()

    test "join with mixed a/sync calls", (testDone)->
      joiner = new Join
      joiner.do -> order.push(10);10
      joiner.do (done)-> timeout 1, -> order.push(20);done 20
      joiner.do -> order.push(30);30
      order = [0]
      joiner.join (results) ->
        assert.eq results, [10,20,30]
        assert.eq order, [0,10,30,20]
        testDone()

    test "join empty list", (testDone)->
      joiner = new Join
      joiner.join (results) ->
        assert.eq results, []
        testDone()

    test "one call join", (testDone)->
      joiner = new Join
      orderResults = []
      joiner.do (done) ->
          timeout 20, -> orderResults.push(1);done 1
        , (done) -> orderResults.push(2);done 2

      joiner.join (results) ->
        assert.eq orderResults, [2, 1]
        assert.eq results, [1,2]
        testDone()
