# {log} = require '../../foundation'
# DomConsole = require '../dom_console'
# require "mocha/mocha"
# require "mocha/mocha.css"

require("!style!css!mocha/mocha.css");
require("!script!mocha/mocha.js");

chai = require 'art.foundation/src/art/dev_tools/test/art_chai'
mocha.setup reporter: require './mocha_browser_reporter'

suites = []

defineMySuite = ->
  baseSuite = self.suite
  log baseSuite:baseSuite
  self.suite = (name, f) ->
    recursiveSuite = (suites) =>
      if suites.length == 1
        baseSuite suites[0], f
      else
        baseSuite suites[0], =>
          suites = suites.slice 1, suites.length
          recursiveSuite suites

    recursiveSuite name.split "."

unless self.suite
  self.suite = mySuite = (name, f) ->
    suites.push name:name, f:f

module.exports = class MyMocha
  @assert: chai.assert

  # @initCss: ->
  #   $('<link>')
  #     .appendTo $ 'head'
  #     .attr type: 'text/css', rel: 'stylesheet'
  #     .attr 'href', log __dirname + '/extlib/mocha/mocha.css'

  # @initDom: ->
  #   $("<div id='mocha'/>").appendTo $ 'body'

  @run: (defineTestSuites)=>
    # window.suite = null if window.suite == mySuite
    # @initCss()
    # @initDom()
    # mocha.setup 'tdd'
    # defineMySuite()

    # DomConsole.enable()

    defineTestSuites chai

    mocha.setup 'tdd'

    for {name, f} in suites
      suite name, f

    mocha.run()
