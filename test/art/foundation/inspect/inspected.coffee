define [
  'art.foundation/src/art/dev_tools/test/art_chai'
  'lib/art/foundation'
], (chai, Foundation) ->
  assert = chai.assert
  clone = Foundation.Clone.clone
  Inspected = Foundation.Inspect.Inspected

  suite "Art.Foundation.Inspect.Inspected", ->
    test "Inspected.Core number", ->
      inspected = new Inspected.Core 123
      assert.equal inspected.toString(), "123"

    test "Inspected.Core null", ->
      inspected = new Inspected.Core null
      assert.equal inspected.toString(), "null"

    test "Inspected.Core undefined", ->
      inspected = new Inspected.Core undefined
      assert.equal inspected.toString(), "undefined"

    test "Inspected.String basic", ->
      inspected = new Inspected.String "hi"
      assert.equal inspected.toString(), '"hi"'

    test "Inspected.String with needs-escaping", ->
      inspected = new Inspected.String "\"hi\"\n\"bye\""
      assert.equal inspected.toString(), "\"\\\"hi\\\"\\n\\\"bye\\\"\""

    test "Inspected.Array basic", ->
      inspected = new Inspected.Array [
        new Inspected.String "foo"
        new Inspected.String "bar"
      ]
      assert.equal inspected.toString(), "[\"foo\", \"bar\"]"

    test "Inspected.Object basic", ->
      inspected = new Inspected.Object
        foo: new Inspected.Core 13
        bar: new Inspected.Core 17
      assert.equal inspected.toString(), "{foo: 13, bar: 17}"

    test "Inspected.Object with instanceOf", ->
      inspected = new Inspected.Object {
        foo: new Inspected.Core 13
        bar: new Inspected.Core 17
      }, "myClass"
      assert.equal inspected.toString(), "{myClass foo: 13, bar: 17}"
