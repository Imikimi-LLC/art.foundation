define [
  'art.foundation'
  'extlib/mocha/mocha'
], (Foundation) ->
  {log, fastBind} = Foundation

  # console.log Mocha.reporters.HTML

  class SuiteReporter
    constructor: (@suite)->
      @failedTests = []
      @passedTests = []
      @tests = []

    addTest: (test) ->
      @tests.push test

    addFailure: (test, err) ->
      @failedTests.push [test, err]

    addPass: (test) ->
      @passedTests.push test

    outputFailedTests: ->
      console.group "Failures"
      for [test, err] in @failedTests
        console.error test.err.stack
        console.log Expected: err.expected, Actual: err.actual
      console.groupEnd()

    outputPassedTest: ->
      console.groupCollapsed "Passes"
      for test in @passedTests
        console.log test.title
      console.groupEnd()

    output: ->
      title = "#{@suite.title} (#{@tests.length - @failedTests.length}/#{@tests.length} passed)"
      if @failedTests.length == 0
        console.groupCollapsed title
      else
        console.group title
        @outputFailedTests()

      @outputPassedTest()
      console.groupEnd()

  class Reporter
    constructor: (@runner, options)->
      new Mocha.reporters.HTML runner
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
