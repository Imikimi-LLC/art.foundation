{log, isFunction, isPlainObject, merge} = require 'art-foundation'
chai = require 'art-foundation/src/Art/DevTools/Test/ArtChai'
self.assert = chai.assert

if self.document
  document.write "<div id=\"mocha\"></div>" unless document.getElementById "mocha"
  require "!style!css!mocha/mocha.css"
  require "!script!mocha/mocha.js"

  DomConsole = require '../DomConsole'
  mocha.setup reporter: require './MochaBrowserReporter'

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
    oldSuite = self.suite
    self.suite = (name, f) =>
      @addSuite name, f

    defineSuitesByNamespaces defineAllTests chai

    self.suite = oldSuite
    mocha?.setup 'tdd'

    @_createMochaSuites()

###
IN: rootNamespace
EFFECT:
  Traverses all of rootNamespace looking for modules with a 'suite' function.
  When found, creates a suite with the namespacePath of that module and evalutest
  the module's suite function in that suite.
###
defineSuitesByNamespaces = (namespace, rootNamespacePath) ->
  {namespacePath, namespaces, modules} = namespace
  rootNamespacePath ||= namespacePath + "."
  [..., relativeNamespacePath] = namespacePath.split rootNamespacePath
  for nsName, ns of namespaces
    defineSuitesByNamespaces ns, rootNamespacePath
  for modName, mod of modules
    mod = namespace[modName]
    if isFunction mod.suite
      suite "#{relativeNamespacePath}.#{modName}", mod.suite
    else if isPlainObject mod.suite
      defineSuitesByObjectStructure mod.suite, "#{relativeNamespacePath}.#{modName}"

defineSuitesByObjectStructure = (object, namespacePath) ->
  for k, v of object
    if isFunction v
      suite "#{namespacePath}.#{k}", v
    else if isPlainObject v
      defineSuitesByObjectStructure v, "#{namespacePath}.#{k}"

module.exports = class MyMocha
  @assert: chai.assert
  @run: (defineAllTests)=>
    self.skipKnownFailingTest = (name, f) ->
      message = "SKIPPING KNOWN-FAILING TEST: #{name}"
      test message, ->
        log.error log message

    DomConsole?.enable()
    (new NestedSuites).groupTestSuites defineAllTests
    mocha?.run()
