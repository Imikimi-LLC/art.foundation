{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art-foundation"
{WorkerRpc, BaseObject, timeout, Promise, intRand, log, deepAll} = Foundation

suite "Art.Foundation.StandardLib.Promise", ->

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
      assert.ok count >= 1
      assert.ok count <= 3

suite "Art.Foundation.StandardLib.Promise.deepAll", ->
  test 'deepAll {}', ->
    deepAll
      a: Promise.resolve 123
      b: Promise.resolve c: 1, d: 2
    .then (result) ->
      assert.eq result,
        a: 123
        b: c: 1, d: 2

  test 'deepAll [{}]', ->
    deepAll [
      999
      a: Promise.resolve 123
      b: Promise.resolve c: 1, d: 2
    ]
    .then (result) ->
      assert.eq result, [
        999
        a: 123
        b: c: 1, d: 2
      ]

  test 'deepAll []', ->
    deepAll [
      Promise.resolve 123
      Promise.resolve c: 1, d: 2
    ]
    .then (result) ->
      assert.eq result, [
        123
        c: 1, d: 2
      ]


suite "Art.Foundation.StandardLib.Promise.Serializer", ->
  test "Promise.serialize", ->
    count = 0
    delays = [100, 0, 10]
    delaysUsed = []
    order = []
    f = Promise.serialize ->
      timeout delays[count], ->
        delaysUsed.push delays[count]
        order.push count++

    f()
    f()
    f()
    .then ->
      assert.eq order, [0, 1, 2]
      assert.eq delaysUsed, delays

  test "always", ->
    serializer = new Promise.Serializer
    serializer.then -> throw "oh no!"
    serializer.always -> "oh, ok!"
    serializer.then (out)-> assert.eq out, "oh, ok!"
    serializer.always -> "oh, ok!!!"
    serializer.then (out)-> assert.eq out, "oh, ok!!!"

  test "serializer with forEach", ->
    count = 0
    delays = [100, 0, 10]
    delaysUsed = []
    order = []

    serializer = new Promise.Serializer
    delays.forEach serializer.serialize (delay) ->
      timeout delay, ->
        delaysUsed.push delay
        order.push count++

    serializer.then ->
      assert.eq order, [0, 1, 2]
      assert.eq delaysUsed, delays
