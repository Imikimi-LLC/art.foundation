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
} = Foundation

suite "Art.Foundation.Hash", ->

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

  suite "objectKeyCount", ->
    test "objectKeyCount {}"        , -> assert.eq 0, objectKeyCount {}
    test "objectKeyCount a:1"       , -> assert.eq 1, objectKeyCount a:1
    test "objectKeyCount a:1, b:2"  , -> assert.eq 2, objectKeyCount a:1, b:2
