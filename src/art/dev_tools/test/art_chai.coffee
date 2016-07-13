{assert} = Chai = require 'chai'
Foundation = require 'art-foundation'
{log, eq, inspect, formattedInspect, floatEq, compactFlatten, escapeRegExp, isString} = Foundation

{assert} = Chai

indent = (str) ->
  '  ' + str.replace /\n/g, "\n  "

failWithExpectedMessage = (context, a, verb, b, verb2, c) ->
  assert.fail a, b, (compactFlatten [
    context
    "expected"
    indent formattedInspect a
    "to #{verb}"
    indent formattedInspect b
    if verb2
      [
        "and to #{verb}"
        indent formattedInspect c
      ]
  ]).join("\n\n") + "\n"

assert.eq      = (a, b, context) -> failWithExpectedMessage context, a, "eq",      b if !eq a, b, true
assert.floatEq = (a, b, context) -> failWithExpectedMessage context, a, "floatEq", b if !floatEq a, b
assert.neq     = (a, b, context) -> failWithExpectedMessage context, a, "not eq",  b if eq a, b, true

assert.within = (a, b, c, context) ->
  if a && a.gte && a.lte
    failWithExpectedMessage context, a, "be gte", b, "be lte", c unless a.gte(b) and a.lte(c)
  else
    failWithExpectedMessage context, a, "be >=",  b, "be <=" , c unless a >= b and a <=c

assert.instanceof = (klass, obj, context) ->
  failWithExpectedMessage context, obj, "be an instance of", klass unless obj instanceof klass

assert.rejects = (promise, context) ->
  context || = "The promise"
  str = "#{context} should be rejected."
  promise.then -> Promise.reject str
  .catch (v) -> throw v if v == str

assert.match  = (a, b, context) ->
  b = escapeRegExp b if isString b
  failWithExpectedMessage context, a, "match", b if not a.match b

assert.doesNotMatch = (a, b, context) ->
  b = escapeRegExp b if isString b
  failWithExpectedMessage context, a, "not match", b if a.match b

module.exports = Chai
