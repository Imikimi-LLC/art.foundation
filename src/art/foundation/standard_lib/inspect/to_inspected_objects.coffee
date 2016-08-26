{deepMap, isPlainArray, isPlainObject, isString, isFunction} = require '../types'
{escapeJavascriptString} = require '../string'
{inspectedObjectLiteral} = require './inspected_object_literal'

module.exports = class InspectedObjects
  @toInspectedObjects: toInspectedObjects = (m) ->
    return m unless m?
    oldm = m
    if out = m.getInspectedObjects?()
      out
    else if isPlainObject(m) || isPlainArray(m)
      deepMap m, (v) -> toInspectedObjects v
    else if isString m
      inspectedObjectLiteral if m.match /\n/
        [
          '"""'
          m.replace /"""/, '""\\"'
          '"""'
        ].join '\n'
      else
        escapeJavascriptString m
    else if isFunction m
      functionString = "#{m}"
      reducedFunctionString = functionString
      .replace /\s+/g, ' '
      .replace /^function (\([^)]*\))/, "$1 ->"
      .replace /^\(\)\s*/, ''
      inspectedObjectLiteral if reducedFunctionString.length < 80
        reducedFunctionString
      else
        functionString.slice 0, 5 * 80
    else
      m
