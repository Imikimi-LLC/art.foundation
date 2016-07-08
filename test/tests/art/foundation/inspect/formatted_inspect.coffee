{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art-foundation"
{log} = Foundation
{formattedInspect, inspect} = Foundation.Inspect

suite "Art.Foundation.Inspect.formattedInspect.singleLine", ->

  testFI = (input, out) ->
    test str = "formattedInspect #{inspect input} >>> #{out.replace(/\n/g,'\\n')}", ->
      o = formattedInspect(input)
      log inspect: -> str
      log input
      log o
      assert.eq o, out

  testFI ((a)->), 'function(1 argument)'
  testFI a:1, "a: 1"
  testFI [], "[] "
  testFI [1], "[] 1"
  testFI [1,2], "1, 2"
  testFI [a:1, 2], "a: 1, 2"
  testFI a:1, b:2, "a: 1, b: 2"
  testFI a:[1, 2], b:3, "a: 1, 2\nb: 3"
  testFI [[1, 2], [3,4]], "1, 2\n3, 4"
  testFI a:{a1:1, a2:2}, b:{b1:1, b2:2}, "a: a1: 1, a2: 2\nb: b1: 1, b2: 2"
  testFI [{a:1}, {b:2}], "{} a: 1\n{} b: 2"
  testFI 'has:':1, '"has:": 1'

suite "Art.Foundation.Inspect.formattedInspect.multiLine", ->

  testFIMultiLine = (input, out) ->
    test str = "formattedInspect #{inspect input}, 0 >>> #{out.replace(/\n/g,'\\n')}", ->
      o = formattedInspect input, 0
      log inspect: -> str
      log input
      log o
      assert.eq o, out

  testFIMultiLine [1, 2], "1\n2"
  testFIMultiLine [[1, 2], [3,4]], "[]\n  1\n  2\n[]\n  3\n  4"

  testFIMultiLine a:1, b:2, "a: 1\nb: 2"
  testFIMultiLine a:1, wxyz:4, "a:    1\nwxyz: 4"
  testFIMultiLine a:[1,2], b:2, "a: []\n  1\n  2\nb: 2"
  testFIMultiLine a:{a1:1, a2:2}, b:{b1:1, b2:2}, "a: \n  a1: 1\n  a2: 2\nb: \n  b1: 1\n  b2: 2"
