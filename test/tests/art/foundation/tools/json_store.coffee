
{Foundation} = Neptune.Art
{
  clone
  cloneByProperties
  cloneByStructure
  inspect
  Unique
} = Foundation

console.log "DEPRICATED?"

if self.sessionStorage
  jsonStore = new Foundation.JsonStore sessionStorage
  jsonStore.clear()

  suite "Art.Foundation.Tools.JsonStore", ->
    setup ->
      jsonStore.clear()

    test "clear, setItem, removeItem & length", ->
      assert.resolved.eq jsonStore.getLength(), 0
      .then -> jsonStore.setItem "foo", "bar"
      .then -> assert.resolved.eq jsonStore.getLength(), 1
      .then -> jsonStore.setItem "foo2", "bar2"
      .then -> assert.resolved.eq jsonStore.getLength(), 2
      .then -> jsonStore.setItem "foo2", "bar3"
      .then -> assert.resolved.eq jsonStore.getLength(), 2
      .then -> jsonStore.removeItem "foo"
      .then -> assert.resolved.eq jsonStore.getLength(), 1

    test "setItem k, custom:'hash'", ->
      o = null
      jsonStore.setItem "foo", o = custom:'hash'
      .then -> assert.resolved.eq      o, jsonStore.getItem "foo"
      .then -> assert.resolved.notSame o, jsonStore.getItem "foo"

    test "setItem k, ['custom', 'array']", ->
      jsonStore.setItem "foo", o = ['custom', 'array']
      .then -> assert.resolved.eq      o, jsonStore.getItem "foo"
      .then -> assert.resolved.notSame o, jsonStore.getItem "foo"

    test "setItem k, complex:['object', 'with', 1], and:true", ->
      jsonStore.setItem "foo", o = complex:['object', 'with', 1], and:true
      .then -> assert.resolved.eq      o, jsonStore.getItem "foo"
      .then -> assert.resolved.notSame o, jsonStore.getItem "foo"
