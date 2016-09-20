{assert} = Chai = require 'chai'
Foundation = require 'art-foundation'
{
  log, eq, inspect, formattedInspect, floatEq, compactFlatten, escapeRegExp, isString
  Types
  inspectedObjectLiteral
  wordsArray
  compactFlattenJoin
  isFunction
  inspectLean
  isPlainArray
} = Foundation

{assert} = Chai

indent = (str) -> '  ' + str.replace /\n/g, "\n  "

getTesterFor = (name, tester) ->
  switch tester.length
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
            name
            value2
    else throw new Error "unsupported tester - expecting 1 or 2 args. name: #{name}, tester #{tester}"

assert.test = {}

addTester = (name, tester) ->
  assert[name] = testerFor = getTesterFor name, tester
  assert.test[name] = if tester.length == 1
    (func, args, context) ->
      args = [] unless args?
      invoke = if args.length == 0 then "#{func.getName()}()" else "#{func.getName()} #{inspectLean(args, forArgs:true)}"
      args = [args] unless isPlainArray args
      test "#{name} #{invoke}", ->
        testerFor func(args...), context
  else
    (func, args, testValue, context) ->
      args = [] unless args?
      invoke = if args.length == 0 then "#{func.getName()}()" else "(#{func.getName()} #{inspectLean(args, forArgs:true)})"
      args = [args] unless isPlainArray args
      test "#{name} #{invoke}, #{inspect testValue}", ->
        testerFor func(args...), testValue, context

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
    v

assert.rejectsWith = (promise, rejectValue, context) ->
  log.error "DEPRICATED: assert.rejectsWith. Use: assert.rejects().then (rejectValue) -> assert.eq rejectValue, expectedRejectValue"
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
    else
      getTesterFor("to eq this promise-rejection-value:", Foundation.eq) v, rejectValue, context

addTester name, tester for name, tester of Types when name.match /^is/
addTester name, Foundation[name] for name in wordsArray "gt gte lte lt eq neq floatEq"
addTester "instanceof", (klass, obj) -> obj instanceof klass
addTester "match",    (a) -> a.match if isString a then escapeRegExp a else a
addTester "notMatch", (a) -> !a.match if isString a then escapeRegExp a else a
addTester "same",     (a, b) -> a == b
addTester "notSame",  (a, b) -> a != b

# create a version of all tests functions that resolves all inputs first
assert.resolved = {}
for k, v of assert when isFunction v
  assert.resolved[k] = ->
    Promise.all arguments
    .then (args) -> v args

module.exports = Chai
