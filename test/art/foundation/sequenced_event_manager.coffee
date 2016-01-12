define [
  'art.foundation/src/art/dev_tools/test/art_chai'
  'lib/art/foundation'
], (chai, Foundation) ->
  assert = chai.assert
  inspect = Foundation.Inspect.inspect
  clone = Foundation.Clone.clone
  eq = Foundation.Eq.eq

  {timeout} = Foundation
  time = Foundation.Time.time
  currentSecond = Foundation.Time.currentSecond
  SEM = Foundation.SequencedEventManager

  suite "Art.Foundation.SequencedEventManager", ->
    test "inspectStructure for empty", ->
      assert.eq SEM.inspectStructure(), null

    test "inspectStructure for one", (done)->
      SEM.queue -> done()
      assert.eq SEM.inspectStructure(), '(p)'

    test "inspectStructure for two", (done)->
      SEM.queue -> 1
      SEM.queue -> done()
      assert.eq SEM.inspectStructure(), '(p, p)'

    test "inspectStructure for three, one nested", (done)->
      SEM.queue ->
        SEM.queue -> 1
        assert.eq SEM.inspectStructure(), '(s(p), p)'
      SEM.queue -> done()
      assert.eq SEM.inspectStructure(), '(p, p)'

    test "catch", (done)->
      SEM.queue ->
        throw new Error "fake error"
      , catch: (error)->
        1
      SEM.queue ->
        done()

    test "catch executes next peer", (done)->
      assert.eq SEM.inspectStructure(), null
      SEM.queue ->
        throw new Error "fake error"
      , catch: (error)->
        assert.eq error.message, "fake error"
      SEM.queue ->
        done()

    test "catch nested error", (done)->
      SEM.queue ->
        SEM.queue ->
          throw new Error "fake error"
      , catch: (error)->
        assert.eq error.message, "fake error"
      SEM.queue ->
        done()

    test "nested order", (done)->
      result = []
      SEM.queue ->
        SEM.queue ->
          result.push 2
        SEM.queue ->
          result.push 3
        result.push 1
      SEM.queue ->
        SEM.queue ->
          result.push 5
        SEM.queue ->
          SEM.queue ->
            result.push 7
          result.push 6
        result.push 4
      SEM.queue ->
        assert.eq result, [0, 1, 2, 3, 4, 5, 6, 7]
        done()
      result.push 0

    # test "tail recursion", (done) ->
    #   SEM.queue ->
    #     SEM.queue ->
    #       assert.eq SEM.inspectStructure(), '(s(s), p)'
    #       SEM.queue ->
    #         assert.eq SEM.inspectStructure(), '(s(s), p)'
    #         SEM.queue ->
    #           assert.eq SEM.inspectStructure(), '(s(s), p)'
    #         assert.eq SEM.inspectStructure(), '(s(s, p), p)'
    #       assert.eq SEM.inspectStructure(), '(s(s, p), p)'
    #   SEM.queue done







