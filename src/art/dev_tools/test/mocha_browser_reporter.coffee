{log, fastBind, Promise, findSourceReferenceUrlRegexp} = require 'art.foundation'

{mapStackTrace} = require 'sourcemapped-stacktrace'

promisedMapStackTrace = (stack) ->
  new Promise (resolve)-> mapStackTrace stack, resolve

# console.log Mocha.reporters.HTML

class SuiteReporter
  constructor: (@suite)->
    @failedTests = []
    @passedTests = []
    @tests = []

  addTest: (test) ->
    @tests.push test

  addFailure: (test, err) ->
    # console.error "SuiteReporter: #{test}", err
    # console.log err.stack
    #   console.log "#{test}:stack", stack
    #   console.log "#{test}:mappedStack", mappedStack.join '\n'
    @failedTests.push (
      promisedMapStackTrace stack = err.stack
      .then (mappedStack) ->
        [test, err, mappedStack]
    )

      # resolve [test, err,  err.stack]

  addPass: (test) ->
    @passedTests.push test

  mergeStackTraces: (normalStackTrace, mappedStackTrace) ->
    normalStackTraceArray = normalStackTrace.split '\n'
    output = normalStackTraceArray.slice 0,1
    rest = normalStackTraceArray.slice 1
    if rest.length == mappedStackTrace?.length # good mappedStackTrace
      for line, i in rest
        mappedLine = mappedStackTrace[i]
        url = mappedLine.match(findSourceReferenceUrlRegexp)?[0]
        rest[i] = log line.replace findSourceReferenceUrlRegexp, url if url

    "#{normalStackTraceArray[0]}\n#{rest.join "\n"}"

  outputFailedTests: (failedTests)->
    console.group "Failures"
    for [test, err, mappedStackTrace] in failedTests
      # console.error test.err.stack
      console.error @mergeStackTraces test.err.stack, mappedStackTrace
      console.log Expected: err.expected, Actual: err.actual
    console.groupEnd()

  outputPassedTest: (passedTests)->
    console.groupCollapsed "Passes"
    for test in passedTests
      console.log test.title
    console.groupEnd()

  output: ->
    title = "#{@suite.title} (#{@tests.length - @failedTests.length}/#{@tests.length} passed)"
    {passedTests} = @
    Promise.all @failedTests
    .then (failedTests)=>
      if failedTests.length == 0
        console.groupCollapsed title
      else
        console.group title
        @outputFailedTests failedTests

      @outputPassedTest passedTests
      console.groupEnd()
    , (err) ->
      console.err "promise error", err

module.exports = class Reporter
  constructor: (@runner, options)->
    new Mocha.reporters.HTML @runner
    # for fName in "onPass onPending onStart onTest onFail onSuite onSuiteEnd onTestEnd onEnd".split(" ")
    #   @[fName] = fastBind @[fName], @
    @registerHandlers()

  registerHandlers: ->
    @runner.on 'pass'        , (test) => @suiteReporter.addPass test
    @runner.on 'test'        , (test) => @suiteReporter.addTest test
    @runner.on 'fail'        , (test, err) => @suiteReporter.addFailure test, err
    @runner.on 'suite'       , (suite) => @suiteReporter = new SuiteReporter suite
    @runner.on 'suite end'   , (suite) =>
      @suiteReporter?.output()
      @suiteReporter = null
