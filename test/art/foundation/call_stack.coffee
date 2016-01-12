define [
  'art.foundation/src/art/dev_tools/test/art_chai'
  'lib/art/namespace'
  'lib/art/foundation'
], (chai, Art, Foundation) ->
  assert = chai.assert
  rawLog = Foundation.Log.rawLog

  suite "Art.Foundation.CallStackLine", ->
    test "log with function", ->
      myFunc = ->
        a = Art.Foundation.callStack()
        rawLog Art.Foundation.Inspect.inspectLean myFuncReturning:a, 1
        a
      s = myFunc()
      rawLog Art.Foundation.Inspect.inspect s, 1

    test "log without function", ->
      callIt = (f) -> f()
      s = callIt ->
        a = Art.Foundation.callStack()
        rawLog Art.Foundation.Inspect.inspectLean myFuncReturning:a, 1
        a

      rawLog Art.Foundation.Inspect.inspect s[0], 1

    test "parse anonumous", ->
      csl = new Foundation.CallStackLine line = "at Context.<anonymous> (http://0.0.0.0:9000/kimi_editor/test/spec/text_effects.js:8:9)"
      assert.equal csl.original, line
      assert.equal csl.sourceLine, 8
      assert.equal csl.function, undefined
      assert.equal csl.sourceColumn, 9
      assert.equal csl.source, "http://0.0.0.0:9000/kimi_editor/test/spec/text_effects.js"
      assert.equal csl.sourceFileName, "text_effects.js"
      assert.equal csl.sourcePath, "/kimi_editor/test/spec"
      assert.equal csl.sourceHostWithPort, "0.0.0.0:9000"

    test "parse 1", ->
      csl = new Foundation.CallStackLine line = "at myFunc (http://0.0.0.0:9000/scripts/spec/art/foundation/call_stack.js:10:30)"
      assert.equal csl.original, line
      assert.equal csl.sourceLine, 10
      assert.equal csl.function, "myFunc"
      assert.equal csl.sourceColumn, 30
      assert.equal csl.source, "http://0.0.0.0:9000/scripts/spec/art/foundation/call_stack.js"
      assert.equal csl.sourceFileName, "call_stack.js"
      assert.equal csl.sourcePath, "/scripts/spec/art/foundation"
      assert.equal csl.sourceHostWithPort, "0.0.0.0:9000"

    test "parse without function", ->
      csl = new Foundation.CallStackLine line = "at http://0.0.0.0:9000/scripts/spec/art/foundation/call_stack.js:26:30"
      assert.equal csl.original, line
      assert.equal csl.sourceLine, 26
      assert.equal csl.function, undefined
      assert.equal csl.sourceColumn, 30
      assert.equal csl.source, "http://0.0.0.0:9000/scripts/spec/art/foundation/call_stack.js"
      assert.equal csl.sourceFileName, "call_stack.js"
      assert.equal csl.sourcePath, "/scripts/spec/art/foundation"
      assert.equal csl.sourceHostWithPort, "0.0.0.0:9000"
