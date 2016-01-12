define [
  'require'
  'art.foundation/src/art/dev_tools/test/art_chai'
  'lib/art/foundation'
], (require, chai, Foundation) ->
  {assert} = chai
  {WorkerRpc, BaseObject, timeout, Promise} = Foundation

  suite "Art.Foundation.Promise", ->

    test "new Promise().resolve()", ->
      new Promise().resolve()

    test "new Promise().reject() and .catch", ->
      (p = new Promise()).reject 321
      p.catch (v) -> assert.eq v, 321

    test "new Promise() thrown error is caught", ->
      p = new Promise (resolve) ->
        throw new Error 123
      p.then (v) ->
        assert.fail()
      , (error) ->
        assert.eq error.message, "123"

    test "new Promise().reject() and .then success, fail", ->
      (p = new Promise()).reject 321
      p.then (v) ->
        assert.fail()
      , (v) ->
        assert.eq v, 321

    test "new Promise() with true async", ->
      p = new Promise
      timeout 0, -> p.resolve()
      p

    test "new Promise (resolve, reject)->", ->
      new Promise (resolve, reject) ->
        timeout 0, -> resolve()

    test "new Promise().then", ->
      new Promise (resolve, reject) ->
        timeout 0, -> resolve 123
      .then (v) ->
        assert.eq v, 123

    test "new Promise (resolve, reject)-> - resolved externally", ->
      p = new Promise (resolve, reject) ->
      timeout 0, -> p.resolve()
      p

    test "Promise.resolve", ->
      Promise.resolve 123

    test "Promise.all", ->
      count = 0
      Promise.all [
        new Promise (resolve) -> timeout 0, -> count++; resolve()
        new Promise (resolve) -> timeout 0, -> count++; resolve()
        new Promise (resolve) -> timeout 0, -> count++; resolve()
      ]
      .then ->
        assert.eq count, 3

    test "Promise.race", ->
      count = 0
      Promise.race [
        new Promise (resolve) -> timeout 0, -> count++; resolve()
        new Promise (resolve) -> timeout 0, -> count++; resolve()
        new Promise (resolve) -> timeout 0, -> count++; resolve()
      ]
      .then ->
        assert.eq count, 1
