{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art-foundation"
{ProgressAdapter, eq, inspect, clone} = Foundation

suite "Art.Foundation.Async.ProgressAdapter", ->
  test "checks parameters", ->
    assert.throws -> pa = new ProgressAdapter()
    assert.throws -> pa = new ProgressAdapter 4
    assert.throws -> pa = new ProgressAdapter "hi", ->
    assert.throws -> pa = new ProgressAdapter {}, ->
    new ProgressAdapter 4, ->
    new ProgressAdapter [4, 4], ->

suite "Art.Foundation.Async.ProgressAdapter.steps", ->
  test "new ProgressAdapter 4", ->
    pa = new ProgressAdapter 4, ->
    assert.eq pa.steps, [.25, .5, .75, 1]

  test "new ProgressAdapter [1, 1]", ->
    pa = new ProgressAdapter [1, 1], ->
    assert.eq pa.steps, [.5, 1]

  test "new ProgressAdapter [1, 2, 1]", ->
    pa = new ProgressAdapter [1, 2, 1], ->
    assert.eq pa.steps, [.25, .75, 1]

suite "Art.Foundation.Async.ProgressAdapter.makeProgress", ->
  test "new ProgressAdapter 2", ->
    callbackValues = []
    pa = new ProgressAdapter 2, (v) -> callbackValues.push v
    pa.makeProgress()
    pa.makeProgress()
    assert.eq callbackValues, [0, .5, 1]

  test "new ProgressAdapter [1, 2, 1]", ->
    callbackValues = []
    pa = new ProgressAdapter [1, 2, 1], (v) -> callbackValues.push v
    pa.makeProgress()
    pa.makeProgress()
    pa.makeProgress()
    assert.eq callbackValues, [0, .25, .75, 1]

suite "Art.Foundation.Async.ProgressAdapter.makeProgressCallback", ->
  test "new ProgressAdapter 2", ->
    callbackValues = []
    pa = new ProgressAdapter 2, (v) -> callbackValues.push v
    pa.makeProgress()
    cb = pa.makeProgressCallback()
    cb 0
    cb .5
    cb 1
    assert.eq callbackValues, [0, .5, .5, .75, 1]

  test "new ProgressAdapter 2 cant go backwards", ->
    callbackValues = []
    pa = new ProgressAdapter 2, (v) -> callbackValues.push v
    pa.makeProgress()
    cb = pa.makeProgressCallback()
    cb 0
    cb .5
    cb 0
    cb 1
    assert.eq callbackValues, [0, .5, .5, .75, .75, 1]

  test "new ProgressAdapter [1, 2, 1]", ->
    callbackValues = []
    pa = new ProgressAdapter [1, 2, 1], (v) -> callbackValues.push v
    pa.makeProgress()
    cb = pa.makeProgressCallback()
    cb 0
    cb .5
    cb 1
    pa.makeProgress()
    assert.eq callbackValues, [0, .25, .25, .5, .75, 1]
