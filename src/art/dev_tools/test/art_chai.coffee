{assert} = Chai = require 'chai'
Foundation = require 'art.foundation'
{log, eq, inspect, inspectLean, floatEq} = Foundation

{assert} = Chai

eqFailure = (a, b, optionalInfo, method) ->
    aInspected = inspectLean a
    bInspected = inspectLean b
    if aInspected == bInspected
      aInspected = inspectLean a, noCustomInspectors: true
      bInspected = inspectLean b, noCustomInspectors: true
    message = "expected\n  #{aInspected}\nto equal (#{method})\n  #{bInspected}\n"
    message += "info: #{optionalInfo}\n" if optionalInfo
    assert.fail a, b, message

withinFailure = (a, b, c, optionalInfo, method) ->
    aInspected = inspectLean a
    bInspected = inspectLean b
    cInspected = inspectLean c
    if aInspected == bInspected || aInspected == cInspected
      aInspected = inspectLean a, noCustomInspectors: true
      bInspected = inspectLean b, noCustomInspectors: true
      cInspected = inspectLean c, noCustomInspectors: true
    message = "expected\n  #{aInspected}\nto be >=\n  #{bInspected}\nand <=\n  #{cInspected}"
    message += "\ninfo: #{optionalInfo}\n" if optionalInfo
    assert.fail [a, c], b, message

assert.instanceof = (klass, obj, optionalInfo) ->
  unless obj instanceof klass
    message = "expected\n  #{inspect obj}\nto be an instance of\n  #{inspect klass}\n"
    message += "info: #{optionalInfo}\n" if optionalInfo
    assert.fail klass, obj, message

assert.floatEq = (a, b, optionalInfo) ->
  if !floatEq a, b
    eqFailure a, b, optionalInfo, "floatEq"

assert.eq = (a, b, optionalInfo) ->
  if !eq a, b, true
    eqFailure a, b, optionalInfo, "eq"

assert.within = (a, b, c, optionalInfo) ->
  useMethods = a && a.gte && a.lte
  unless (if useMethods then a.gte(b) and a.lte(c) else a >= b and a <=c)
    withinFailure a, b, c, optionalInfo, "within"


assert.neq = (a, b, optionalInfo) ->
  if eq a, b, true
    message = "expected\n  #{inspect a}\nto NOT equal (eq)\n  #{inspect b}\n"
    message += "info: #{optionalInfo}\n" if optionalInfo
    assert.fail "1", "2", message

module.exports = Chai
