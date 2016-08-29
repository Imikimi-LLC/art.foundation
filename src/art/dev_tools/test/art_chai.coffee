{assert} = Chai = require 'chai'
Foundation = require 'art-foundation'
{
  log, eq, inspect, formattedInspect, floatEq, compactFlatten, escapeRegExp, isString
  Types
  inspectedObjectLiteral
  wordsArray
  compactFlattenJoin
} = Foundation

{assert} = Chai

indent = (str) -> '  ' + str.replace /\n/g, "\n  "

addTester = (name, tester) ->
  assert[name] = switch tester.length
    when 1
      (testValue, context) ->
        unless tester testValue
          failWithExpectedMessage context,
            inspectedObjectLiteral name
            "to be true for"
            testValue
    when 2
      (value1, value2, context) ->
        unless tester value1, value2
          failWithExpectedMessage context,
            value1
            "to be #{name}"
            value2
    else throw new Error "unsupported tester - expecting 1 or 2 args. name: #{name}, tester #{tester}"

maxLength = 30
format = (val) ->
  formattedInspect val, maxLength

failWithExpectedMessage = (context, a, verb, b, verb2, c) ->
  assert.fail a, b, compactFlattenJoin("\n\n", [
    "expected"
    indent format a
    verb
    indent format b
    [verb2, indent format c] if verb2
    "Context: #{context}" if context
  ]) + "\n"

# generalize this if we have more assert functions with TWO binary tests
assert.within = (a, b, c, context) ->
  if a && a.gte && a.lte
    failWithExpectedMessage context, a, "to be gte", b, "to be lte", c unless a.gte(b) and a.lte(c)
  else
    failWithExpectedMessage context, a, "to be >=",  b, "to be <=" , c unless a >= b and a <=c

# returns promise
# Either use as last line of test, or follow with .then ->
assert.rejects = (promise, context) ->
  uniqueObject = {}
  promise.then (v) ->
    uniqueObject.value = v
    Promise.reject uniqueObject
  .catch (v) ->
    if v == uniqueObject
      failWithExpectedMessage context,
        promise
        "to be rejected. Instead, it succeeded with:"
        v.value

addTester name, tester for name, tester of Types when name.match /^is/
addTester name, Foundation[name] for name in wordsArray "gt gte lte lt eq neq floatEq"
addTester "instanceof", (klass, obj) -> obj instanceof klass
addTester "match",    (a) -> a.match if isString a then escapeRegExp a else a
addTester "notMatch", (a) -> !a.match if isString a then escapeRegExp a else a

module.exports = Chai
