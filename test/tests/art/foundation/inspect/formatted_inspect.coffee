
{Foundation} = Neptune.Art
{log} = Foundation
{formattedInspect, isString, inspect, toInspectedObjects, inspectedObjectLiteral, BaseObject, stripTrailingWhitespace} = Foundation

module.exports = suite:
  singleLine: ->
    class Foo extends BaseObject
      @namespacePath: "MyNamespace.Foo"

    testFI = (input, out) ->
      test str = "formattedInspect #{inspect input}", ->
        o = formattedInspect input
        log "input: #{input}"
        log "actual output: #{o}"
        log "expected output: #{out}"
        if isString out
          assert.eq o, out
        else
          assert.match o, out

    testFI '"hi"', "'\"hi\"'"
    testFI "'hi'", '"\'hi\'"'
    testFI ((a)->123), '(a) -> { return 123; }'
    testFI a:1, "a: 1"
    testFI /hi/, "/hi/"
    testFI inspect:(->'inspectOutput'), ///
      inspect.*function
      (.|\n)*
      inspectOutput
      ///
    testFI [], "[]"
    testFI ['string', foo: 'bar'], "\"string\", foo: \"bar\""
    testFI [1], "[] 1"
    testFI [1,2], "1, 2"
    testFI [a:1, 2], "a: 1, 2"
    testFI a:1, b:2, "a: 1, b: 2"
    testFI a:[1, 2], b:3, "a: 1, 2\nb: 3"
    testFI [[1, 2], [3,4]], "1, 2\n3, 4"
    testFI a:{a1:1, a2:2}, b:{b1:1, b2:2}, "a: a1: 1, a2: 2\nb: b1: 1, b2: 2"
    testFI [{a:1}, {b:2}], "{} a: 1\n{} b: 2"
    testFI 'has:':1, '"has:": 1'

    testFI Foo, Foo.namespacePath
    testFI (new Foo), "<#{Foo.namespacePath}>"

  multiLine: ->

    testFIMultiLine = (input, out) ->
      test str = "formattedInspect #{inspect input}, 0", ->
        o = stripTrailingWhitespace formattedInspect input, 0
        log inspect: -> str
        log input
        log o
        assert.eq o, out

    testFIMultiLine [1, 2], "1\n2"
    testFIMultiLine [[1, 2], [3,4]], """
      []
        1
        2
      []
        3
        4
      """

    testFIMultiLine ['string', foo: 'bar'], """
      "string"
      foo: "bar"
      """
    testFIMultiLine [inspectedObjectLiteral('string'), foo: 'bar'], """
      string
      foo: "bar"
      """
    testFIMultiLine a:1, b:2, "a: 1\nb: 2"
    testFIMultiLine a:1, wxyz:4, "a:    1\nwxyz: 4"
    testFIMultiLine a:[1,2], b:2, """
      a: []
        1
        2
      b: 2
      """
    testFIMultiLine a:{a1:1, a2:2}, b:{b1:1, b2:2}, """
      a:
        a1: 1
        a2: 2
      b:
        b1: 1
        b2: 2
      """
    testFIMultiLine (getInspectedObjects:-> [
        "A"
        foo: "B"
        bar: "C"
      ]), """
      "A"
      foo: "B"
      bar: "C"
      """

    testFIMultiLine [
        foo: "A"
        bar: "B"
        "C"
        fad: "D"
        baz: "E"
      ], """
      foo: "A"
      bar: "B"
      "C"
      fad: "D"
      baz: "E"
      """
