if !document.getElementById "mocha"
  document.write "<div id=\"mocha\"></div>"

chai = require 'art-foundation/src/art/dev_tools/test/art_chai'
self.assert = chai.assert
require "!style!css!mocha/mocha.css"
require "!script!mocha/mocha.js"
DomConsole = require '../dom_console'
{log} = require 'art-foundation'

mocha.setup reporter: require './mocha_browser_reporter'

###
Use mocha as normal, but if you added dots (.) in your suite names, this will
break them out into nested test suites and group suites with the same path together.
It also alphabetizes them.

Ex:

  suite "Art.Foundation.Async", asyncTests
  suite "Art.Foundation.Binary", binaryTests
  suite "Art.Atomic", atomicTests

Becomes:

  suite "Art", ->
    suite "Atomic", atomicTests
    suite "Foundation", ->
      suite "Async", asyncTests
      suite "Binary", binaryTests
###
class NestedSuites
  constructor: ->
    @suites = {}
    @suiteFunctions = {}

  addSuite: (name, f) ->
    (@suiteFunctions[name] ||= []).push f

    splitName = name.split '.'
    suiteMap = @suites
    for suitePart in splitName
      suiteMap = (suiteMap[suitePart] ||= {})

  _createMochaSuites: (suites = @suites, suitePath = null)->
    for suitePart in Object.keys suites
      subSuites = suites[suitePart]
      do (suitePart, subSuites) =>
        path = if suitePath then suitePath + "." + suitePart else suitePart

        self = @
        suite suitePart, ->
          self._createMochaSuites subSuites, path
          if functions = self.suiteFunctions[path]
            for f in functions
              f.call @

  groupTestSuites: (defineAllTests) ->
    self.suite = (name, f) =>
      @addSuite name, f

    defineAllTests chai

    mocha.setup 'tdd'

    @_createMochaSuites()

module.exports = class MyMocha
  @assert: chai.assert
  @run: (defineAllTests)=>
    self.skipKnownFailingTest = (name, f) ->
      message = "SKIPPING KNOWN-FAILING TEST: #{name}"
      test message, ->
        console.error log message

    DomConsole.enable()
    (new NestedSuites).groupTestSuites defineAllTests
    mocha.run()
