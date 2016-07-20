{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art-foundation"
{
  clone
  eq
  inspect
  merge
  mergeInto
  pureMerge
  objectWithout
  objectKeyCount
  compact
  plainObjectsDeepEq
  deepMerge
  toObject
} = Foundation

suite "Art.Foundation.Hash.merge", ->

  test "merge(a, b)", ->
    a = foo:1
    b = bar:2
    res = merge a, b
    assert.eq res, foo: 1, bar: 2
    assert.eq a, foo:1
    assert.eq b, bar:2
    assert.neq a, res
    assert.neq b, res

  test "merge(a, b, c)", ->
    a = foo:1
    b = foo:2
    c = foo:3
    res = merge a, b, c
    assert.eq res, foo:3

  test "merge(a, [b, c])", ->
    a = foo:1
    b = foo:2
    c = foo:3
    res = merge a, [b, c]
    assert.eq res, foo:3

  test "merge(a, null, c)", ->
    a = foo:1
    b = null
    c = foo:3
    res = merge a, b, c
    assert.eq res, foo:3

  test "merge()", ->
    res = merge()
    assert.eq res, {}

  test "merge([a, b])", ->
    a = foo:1
    b = bar:2
    res = merge [a, b]
    assert.eq res, foo: 1, bar: 2

  test "mergeInto()", ->
    res = mergeInto()
    assert.eq res, null

  test "mergeInto(a, b)", ->
    a = foo:1
    b = bar:2
    res = mergeInto a, b
    assert.eq res, foo: 1, bar: 2
    assert.eq a, res
    assert.eq b, bar:2

  test "pureMerge()", ->
    res = pureMerge()
    assert.eq res, null

  test "pureMerge(a)", ->
    a = foo:1
    res = pureMerge a
    assert.eq true, res == a

  test "pureMerge(a, b) b shadows a", ->
    a = foo:1
    b = foo:2
    res = pureMerge a, b
    assert.eq true, res == b

  test "pureMerge(a, b) b doesn't shadow a", ->
    a = foo:1
    b = bar:2
    res = pureMerge a, b
    assert.eq res, foo:1, bar:2
    assert.neq a, res
    assert.neq b, res

suite "Art.Foundation.Hash.objectWithout", ->

  test "objectWithout", ->
    a = foo:1, bar:2, fooz:3, baz:4
    b = objectWithout a, "bar", "baz"
    assert.eq b,
      foo: 1
      fooz: 3

  test "objectWithout with nothing to do returns original object", ->
    a = foo:1, bar:2, fooz:3, baz:4
    b = objectWithout a, "cat", "frog"
    assert.eq true, a == b

suite "Art.Foundation.Hash.toObject", ->
  test "simple key-value", ->
    assert.eq
      123: "foo"
    , toObject 123, "foo"

  test "two key-values", ->
    assert.eq
      123: "foo"
      456: "bar"
    , toObject 123, "foo", 456, "bar"

  test "missing value for key becomes undefined", ->
    assert.eq
      foo: undefined
    , toObject "foo"

  test "null values", ->
    assert.eq
      1: null
      2: false
      3: undefined
      4: 0
      456: "foo"
    ,
      toObject 1, null, 2, false, 3, undefined, 4, 0, null, undefined, 456, "foo"

  test "objects in the list get merged in", ->
    assert.eq
      foo: 1
      bar: 2
      bob: 3
      123: "foo"
    , toObject
      foo: 1
      bar: 2
      [123, "foo"]
      bob: 3

  test "array of pairs", ->
    assert.eq
      foo: 1
      bar: 2
      baz: 3
      bat: 4
    , toObject [
      ["baz", 3]
      ["foo", 1]
      ["bat", 4]
      ["bar", 2]
    ]

  test "last value for same key sticks", ->
    assert.eq
      foo: 1
      bar: 2
      baz: 3
      bat: 5
    , toObject [
      ["baz", 3]
      ["foo", 1]
      ["bat", 4]
      ["bat", 5]
      ["bar", 2]
    ]

  test "compactFlatten IN DA HOUSE", ->
    assert.eq
      foo: 1
      bar: 2
      baz: 3
      bat: 4
    , toObject [
      null
      ["baz", 3]
      [
        ["foo", 1]
        ["bat", 4]
      ]
      undefined
      [[["bar", 2]]]
    ]

suite "Art.Foundation.Hash.objectKeyCount", ->
  test "objectKeyCount {}"        , -> assert.eq 0, objectKeyCount {}
  test "objectKeyCount a:1"       , -> assert.eq 1, objectKeyCount a:1
  test "objectKeyCount a:1, b:2"  , -> assert.eq 2, objectKeyCount a:1, b:2

suite "Art.Foundation.Hash.deepMerge", ->
  test "same as merge", ->
    a = foo: 1, bar: 2
    b = bar: 3, baz: 4
    assert.eq deepMerge(a, b), merge(a, b)

  test "nested objects with the same key get merged", ->
    a = foo: 1, bar: {one: 1, two: 2}
    b = bad: "wolf"
    c = bar: {two: 200, three: 3}, baz: 4
    assert.neq deepMerge(a, b, c), merge(a, b, c)
    assert.eq deepMerge(a, b, c),
      foo: 1
      bar: one: 1, two: 200, three: 3
      baz: 4
      bad: "wolf"


  test "three level test", ->
    a = bad: "wolf"
    b = foo: 1, bar: baz: a: 123
    c = foo: 1, bar: baz: b: 123
    assert.neq deepMerge(a, b, c), merge(a, b, c)
    assert.eq deepMerge(a, b, c),
      bad: "wolf"
      foo: 1
      bar: baz: a: 123, b: 123
