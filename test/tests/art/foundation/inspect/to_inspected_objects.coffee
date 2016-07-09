{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art-foundation"
{toInspectedObjects, inspectedObjectLiteral, log} = Foundation

suite "Art.Foundation.Inspect.toInspectedObjects", ->
  test "toInspectedObjects 'hi'", ->
    assert.eq toInspectedObjects('hi'), 'hi'

  test "toInspectedObjects function", ->
    assert.eq toInspectedObjects((a)->), inspectedObjectLiteral 'function(1 argument)'

  test "toInspectedObjects a:1", ->
    assert.eq toInspectedObjects(a:1), a: 1

  test "toInspectedObjects [1, 2]", ->
    assert.eq toInspectedObjects([1,2]), [1, 2]

  test "toInspectedObjects [a:1, 2]", ->
    assert.eq toInspectedObjects([a:1, 2]), [a:1, 2]

  test "toInspectedObjects a:[1, 2], b:3", ->
    assert.eq toInspectedObjects(a:[1, 2], b:3), a:[1, 2], b: 3

  test "inspectedObjectLiteral", ->
    assert.eq toInspectedObjects(
      a: inspectedObjectLiteral "abc"
      ),
      a: inspectedObjectLiteral "abc"

  test "toInspectedObjects twice shouldn't change result", ->
    testStuff =
      string: "my string"
      number: 123
      literal: inspectedObjectLiteral "my literal"
      nestedObject: a: 1, b: 2
      nestedArray: [1, 2]
    once = toInspectedObjects testStuff
    twice = toInspectedObjects once
    assert.eq once, twice
