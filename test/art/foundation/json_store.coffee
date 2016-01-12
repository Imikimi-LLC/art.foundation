define [
  'art.foundation/src/art/dev_tools/test/art_chai'
  'lib/art/foundation'
], (chai, Foundation) ->
  assert = chai.assert
  clone = Foundation.Clone.clone
  cloneByProperties = Foundation.Clone.cloneByProperties
  cloneByStructure = Foundation.Clone.cloneByStructure
  inspect = Foundation.Inspect.inspect
  Unique = Foundation.Unique
  jsonStore = new Foundation.JsonStore sessionStorage
  jsonStore.clear()

  suite "Art.Foundation.JsonStore", ->

    test "clear, setItem, removeItem & length", ->
      jsonStore.clear()
      assert.eq jsonStore.length, 0
      jsonStore.setItem "foo", "bar"
      assert.eq jsonStore.length, 1
      jsonStore.setItem "foo2", "bar2"
      assert.eq jsonStore.length, 2
      jsonStore.setItem "foo2", "bar3"
      assert.eq jsonStore.length, 2
      jsonStore.removeItem "foo"
      assert.eq jsonStore.length, 1

    test "setItem k, custom:'hash'", ->
      jsonStore.clear()
      jsonStore.setItem "foo", o = custom:'hash'
      o2 = jsonStore.getItem "foo"
      assert.eq o, o2
      assert.ok o != o2

    test "setItem k, ['custom', 'array']", ->
      jsonStore.clear()
      jsonStore.setItem "foo", o = ['custom', 'array']
      o2 = jsonStore.getItem "foo"
      assert.eq o, o2
      assert.ok o != o2

    test "setItem k, complex:['object', 'with', 1], and:true", ->
      jsonStore.clear()
      jsonStore.setItem "foo", o = complex:['object', 'with', 1], and:true
      o2 = jsonStore.getItem "foo"
      assert.eq o, o2
      assert.ok o != o2
