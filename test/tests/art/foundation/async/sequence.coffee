{assert} = require 'art.foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art.foundation"
{timeout, Sequence, log} = Foundation

suite "Art.Foundation.Async.Sequence", ->
  test "basic async sequence", (testDone)->
    sequence = new Sequence
    results = []
    for i in [0..20] by 2
      do (i) ->
        sequence.do (done) ->
          timeout 20 - i, ->
            results.push i
            done i

    assert.eq results, []

    sequence.do ->
      assert.eq results, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
      testDone()

  test "one call sequence", (testDone)->
    sequence = new Sequence
    results = []
    sequence.do (done) ->
        timeout 20, ->
          results.push 1
          done()
      , (done) ->
        timeout 0, ->
          results.push 2
          done()
      , ->
        assert.eq results, [1, 2]
        testDone()

    assert.eq results, []

  test "sequence join", (testDone)->
    sequence = new Sequence
    order = []
    sequence.do -> order.push 1
    sequence.do -> order.push 2
    sequence.do -> order.push 3
    sequence.join (results) ->
      assert.eq order, [1,2,3]
      assert.eq results, [1,2,3]
      testDone()


  test "sequence with mixede async and sync DOs", (testDone)->
    sequence = new Sequence
    order = []
    sequence.do -> order.push(10);10
    sequence.do (done)-> timeout 1, -> order.push done 20
    sequence.do -> order.push(30);30
    sequence.join (results) ->
      assert.eq order, [10,20,30]
      assert.eq results, [10,20,30]
      testDone()

  test "basic fully synchronous async sequence", (testDone)->
    sequence = new Sequence
    results = []
    for i in [0..20] by 2
      do (i) ->
        sequence.do ->
          results.push i

    assert.eq results, []

    sequence.do ->
      assert.eq results, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
      testDone()
