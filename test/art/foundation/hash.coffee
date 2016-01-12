define [
  'art.foundation/src/art/dev_tools/test/art_chai'
  'lib/art/foundation'
], (chai, Foundation) ->
  assert = chai.assert
  {
    clone
    eq
    inspect
    merge
    mergeInto
    pureMerge
    objectWithout
    objectDiff
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

    suite "objectDiff", ->
      added = removed = changed = unchanged = 0
      add = -> added++
      remove = -> removed++
      change = -> changed++
      noChange = -> unchanged++
      diffTest = (name, o1, o2, expectedAdded, expectedRemoved, expectedChanged, expectedUnchanged, options = {}) ->
        {useO2LenthHint, eqF} = options
        test name, ->
          o2LengthHint = if useO2LenthHint then objectKeyCount o2 else null
          added = removed = changed = unchanged = 0
          objectDiff o1, o2, add, remove, change, noChange, eqF, o2LengthHint
          assert.eq expectedAdded,      added,      "added"
          assert.eq expectedRemoved,    removed,    "removed"
          assert.eq expectedChanged,    changed,    "changed"
          assert.eq expectedUnchanged,  unchanged,  "unchanged"
      diffTestSuite = (name, o1, o2, expectedAdded, expectedRemoved, expectedChanged, expectedUnchanged) ->
        suite "#{name}: o1: #{inspect o1}, o2: #{inspect o2}", ->
          diffTest "basic",               o1, o2, expectedAdded, expectedRemoved, expectedChanged, expectedUnchanged
          diffTest "o2-length-hint",      o1, o2, expectedAdded, expectedRemoved, expectedChanged, expectedUnchanged, useO2LenthHint:true
          diffTest "compare values with plainObjectsDeepEq",  o1, o2, expectedAdded, expectedRemoved, expectedChanged, expectedUnchanged, eqF:plainObjectsDeepEq

      diffTestSuite "same",                         {a:1, b:2},       {a:1, b:2},         0, 0, 0, 2
      diffTestSuite "added",                        {a:1, b:2, c:3},  {a:1, b:2},         1, 0, 0, 2
      diffTestSuite "removed",                      {a:1, b:2},       {a:1, b:2, c:3},    0, 1, 0, 2
      diffTestSuite "changed",                      {a:1, b:2},       {a:1, b:3},         0, 0, 1, 1
      diffTestSuite "added, removed and changed",   {a:1, b:2, c:3},  {a:1, b:3, d:4},    1, 1, 1, 1
