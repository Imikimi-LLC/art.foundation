{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art-foundation"
{
  eq, clone, inspect, capitalize, upperCamelCase, lowerCamelCase
  snakeCase, pluralize, allIndexes, randomString
  consistentJsonStringify
  splitRuns
  humanFriendlyShorten
  formattedInspect
  getLowerCaseCodeWords
} = Foundation

suite "Art.Foundation.String.Case", ->

  test "capitalize", ->
    assert.eq "Foo", capitalize "foo"
    assert.eq "Foo", capitalize "Foo"
    assert.eq "Foo bar", capitalize "foo bar"


testCodeCase = (testIn) ->
  suite "Art.Foundation.String.Case.getLowerCaseCodeWords", ->
    test "getLowerCaseCodeWords #{formattedInspect testIn} >> ['foo', 'bar', 'baz']", ->
      assert.eq getLowerCaseCodeWords(testIn), ['foo', 'bar', 'baz']

  suite "Art.Foundation.String.Case.upperCamelCase", ->
    test "upperCamelCase #{formattedInspect testIn} >> 'FooBarBaz'", ->
      assert.eq upperCamelCase(testIn), 'FooBarBaz'

  suite "Art.Foundation.String.Case.lowerCamelCase", ->
    test "lowerCamelCase #{formattedInspect testIn} >> 'fooBarBaz'", ->
      assert.eq lowerCamelCase(testIn), 'fooBarBaz'

  suite "Art.Foundation.String.Case.snaleCase", ->
    test "snaleCase #{formattedInspect testIn} >> 'foo_bar_baz'", ->
      assert.eq snakeCase(testIn), 'foo_bar_baz'

testCodeCase "foo_bar_baz"
testCodeCase "foo-bar-baz"
testCodeCase "-foo-bar-baz"
testCodeCase "FooBarBaz"
testCodeCase "FooBar_baz"
testCodeCase "fooBarBaz"
testCodeCase "FOO_BAR_BAZ"
testCodeCase "  ??foo !bar_ baz- "
