{assert} = require 'art.foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art.foundation"
{rubyTrue, rubyFalse, inspect} = Foundation

suite "Art.Foundation.Ruby", ->
  pairs = [
    [0, true]
    ["", true]
    ["0", true]
    [0.1, true]
    [1, true]
    [{}, true]
    [[], true]
    [(->), true]
    [true, true]
    [false, false]
    [undefined, false]
    [null, false]
  ]
  for [input, output] in pairs
    test "#{output} == rubyTrue #{inspect input}", ->
      assert.equal output, rubyTrue input
      assert.equal output, !rubyFalse input

