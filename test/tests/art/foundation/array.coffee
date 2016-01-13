{assert} = require 'art.foundation/src/art/dev_tools/test/art_chai'
Foundation = require 'art.foundation'
{
  clone
  eq
  inspect
  compact
  compactFlatten
  flatten
  minimumOrderedOverlappingMerge
  longestCommonSubsequence
  insert
  withInserted
  deepEach
  stableSort
  log
  findSortedFirst
} = Foundation

suite "Art.Foundation.Array", ->

  test "compact", ->
    assert.eq (compact [1,2,3,null,4]), [1,2,3,4]
    assert.eq (compact [1,2,3,null]), [1,2,3]
    assert.eq (compact [null,1,2,3]), [1,2,3]

  test "compact doesn't remove false", ->
    assert.eq ["child2", "child3", false, "child4"], compact [undefined, "child2", null, "child3", false, "child4"]

  test "compact not needed returns exactly the input array", ->
    a = [1,3,4]
    assert.equal a, compact a

  test "compact with custom keepTester", ->
    structure = [0, false, 1, 2, null, 3, 4, undefined, 5]
    assert.eq (compact structure), [0, false, 1, 2, 3, 4, 5]
    assert.eq (compact structure, (a) -> !!a), [1, 2, 3, 4, 5]

  test "flatten empty array", ->
    assert.eq (flatten []), []

  test "flatten not needed returns exactly the input array", ->
    a = [1,3,4]
    assert.equal a, flatten a

  test "flatten args returns array", ->
    assert.eq (flatten 1,2,3).constructor, Array

  test "flatten() => []",           -> assert.eq [], flatten()
  test "flatten [] => []",          -> assert.eq [], flatten []
  test "flatten 1 => [1]",          -> assert.eq [1], flatten 1
  test "flatten [1] => [1]",        -> assert.eq [1], flatten [1]
  test "flatten 1, 2 => [1, 2]",    -> assert.eq [1, 2], flatten 1, 2
  test "flatten [1], 2 => [1, 2]",  -> assert.eq [1, 2], flatten [1], 2
  test "flatten 1, [2] => [1, 2]",  -> assert.eq [1, 2], flatten 1, [2]
  test "flatten [1, 2] => [1, 2]",  -> assert.eq [1, 2], flatten [1, 2]

  test "flatten already flat array returns untouched input", ->
    b = flatten a = [1,2,3,4,5]
    assert.eq true, a == b

  test "flatten keeps nulls, undefineds, falses and 0s", ->
    assert.eq (flatten [null, undefined, false, 0]), [null, undefined, false, 0]

  test "flatten array with one sub-array", ->
    assert.eq (flatten [1,2,3,[4,5]]), [1,2,3,4,5]

  test "flatten array lots of direct nesting", ->
    assert.eq (flatten [[[1]]]), [1]
    assert.eq (flatten [[[]]]), []

  test "flatten array with random nesting", ->
    assert.eq (flatten [[0, [1, 2], 3], [4, [5, [6, 7]]]]), [0, 1, 2, 3, 4, 5, 6, 7]

  test "flatten array with nested []", ->
    assert.eq (flatten [[],1,2,3,[4,5]]), [1,2,3,4,5]

  test "compactFlatten with only compacting needed", ->
    assert.eq (compactFlatten [1, null, undefined]), [1]

  test "compactFlatten with only flattening needed", ->
    assert.eq (compactFlatten [1,2,3,[4,5]]), [1,2,3,4,5]

  test "compactFlatten(a) and compact(flatten(a)) return same structure", ->
    structure = [0, [false], 1, 2, null, 3, [4, undefined, 5]]
    cF = compactFlatten structure
    c_f = compact flatten structure
    assert.eq cF, c_f

  test "compactFlatten with custom keepTester", ->
    structure = [0, [false], 1, 2, null, 3, [4, undefined, 5]]
    assert.eq (compactFlatten structure), [0, false, 1, 2, 3, 4, 5]
    assert.eq (compactFlatten structure, (a) -> !!a), [1, 2, 3, 4, 5]

  test "insert 0", ->
    assert.eq (insert [1,2,3], 0, 999), [999, 1, 2, 3]

  test "insert 3", ->
    assert.eq (insert [1,2,3], 3, 999), [1, 2, 3, 999]

  test "insert -1", ->
    assert.eq (insert [1,2,3], -1, 999), [1, 2, 3, 999]

  test "insert -2", ->
    assert.eq (insert [1,2,3], -2, 999), [1, 2, 999, 3]

  test "withInserted 0", ->
    a = [1,2,3]
    b = withInserted a, 0, 999
    assert.eq a, [1, 2, 3]
    assert.eq b, [999, 1, 2, 3]

  test "longestCommonSubsequence [2], [2]", ->
    c = longestCommonSubsequence [2], [2]
    assert.eq c, [2]

  test "longestCommonSubsequence [2], [2, 1]", ->
    c = longestCommonSubsequence [2], [2, 1]
    assert.eq c, [2]

  test "longestCommonSubsequence [2, 1], [2, 1]", ->
    c = longestCommonSubsequence [2, 1], [2, 1]
    assert.eq c, [2, 1]

  test "longestCommonSubsequence [2, 1, 2], [2, 1]", ->
    c = longestCommonSubsequence [2, 1, 2], [2, 1]
    assert.eq c, [2, 1]

  test "longestCommonSubsequence [1, 2], [2, 1]", ->
    c = longestCommonSubsequence [1, 2], [2, 1]
    assert.eq c, [1]

  test "longestCommonSubsequence [1], [2, 1, 4]", ->
    c = longestCommonSubsequence [1], [2, 1, 4]
    assert.eq c, [1]

  test "minimumOrderedOverlappingMerge [1,2], [2, 1]", ->
    c = minimumOrderedOverlappingMerge [1,2], [2, 1]
    assert.eq c, [2, 1]

  test "minimumOrderedOverlappingMerge [1,3], [2, 1]", ->
    c = minimumOrderedOverlappingMerge [1,3], [2, 1]
    assert.eq c, [2, 1, 3]

  test "minimumOrderedOverlappingMerge [1], [2, 1, 4]", ->
    c = minimumOrderedOverlappingMerge [1], [2, 1, 4]
    assert.eq c, [2, 1, 4]

  test "stableSort works like sort (except for stability)", ->
    arrays = [
      [1, 2, 3, 4]
      [4, 3, 2, 1]
      [3, 1, 2, 4]
      []
      [1]
      [2, 1]
      [1, 2, 3]
      [1, 1]
      [2, 3, 1, 1, 4]
    ]
    for a in arrays
      assert.eq a.sort(), stableSort a

  test "stableSort maintains order of 'same' elements", ->
    list = [
      [2, 'a']
      [1, 'b']
      [1, 'c']
      [0, 'f']
      [1, 'd']
      [1, 'e']
    ]
    stableSortedList = [
      [0, 'f']
      [1, 'b']
      [1, 'c']
      [1, 'd']
      [1, 'e']
      [2, 'a']
    ]
    sortFunciton = (a, b) -> a[0] - b[0]
    assert.eq stableSortedList, stableSort list, sortFunciton


  suite "findSortedFirst", ->
    test "empty or null/undefined array returns undefined", ->
      assert.eq undefined, findSortedFirst []
      assert.eq undefined, findSortedFirst null
      assert.eq undefined, findSortedFirst undefined

    test "numbers", ->
      assert.eq 1, findSortedFirst [3, 1, 2]
      assert.eq 1, findSortedFirst [1, 2, 3]
      assert.eq 1, findSortedFirst [1, 3, 2]

    test "custom compareFunction with numbers", ->
      assert.eq 3, findSortedFirst [3, 1, 2], (a, b) -> b - a
      assert.eq 3, findSortedFirst [1, 2, 3], (a, b) -> b - a
      assert.eq 3, findSortedFirst [1, 3, 2], (a, b) -> b - a

  test "flatten, compact(flatten), compactFlatten", ->
    toArgs = -> arguments

    structure = toArgs(
      "child1" if false
      "child2"
      [
        null
        "child3"
        false
        "child4"
      ]
    )

    assert.eq [undefined, "child2", null, "child3", false, "child4"], flatten structure
    assert.eq ["child2", "child3", false, "child4"], compact flatten structure
    assert.eq ["child2", "child3", false, "child4"], compactFlatten structure

