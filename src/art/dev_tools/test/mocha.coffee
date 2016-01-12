define [
  'art.foundation'
  'require'
  'extlib/jquery'
  'lib/art/dev_tools/dom_console'
  'extlib/mocha/mocha'
  './mocha_browser_reporter'
], (Foundation, Require, $, DomConsole, _Mocha, MochaBrowserReporter) ->
  {log} = Foundation
  mocha.setup reporter: MochaBrowserReporter

  suites = []

  defineMySuite = ->
    baseSuite = window.suite
    log baseSuite:baseSuite
    window.suite = (name, f) ->
      recursiveSuite = (suites) =>
        if suites.length == 1
          baseSuite suites[0], f
        else
          baseSuite suites[0], =>
            suites = suites.slice 1, suites.length
            recursiveSuite suites

      recursiveSuite name.split "."
  # unless window.suite
  #   window.suite = mySuite = (name, f) ->
  #     suites.push name:name, f:f

  class MyMocha

    @initCss: ->
      $('<link>')
        .appendTo $ 'head'
        .attr type: 'text/css', rel: 'stylesheet'
        .attr 'href', log Require.toUrl 'extlib/mocha/mocha.css'

    @initDom: ->
      $("<div id='mocha'/>").appendTo $ 'body'

    @run: (testFiles...)=>
      # window.suite = null if window.suite == mySuite
      @initCss()
      @initDom()
      mocha.setup 'tdd'
      defineMySuite()
      DomConsole.enable()
      for {name, f} in suites
        suite name, f

      if testFiles.length > 0
        require testFiles, ->
          mocha.run()
      else
        mocha.run()
