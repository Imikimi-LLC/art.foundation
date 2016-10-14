{deepMap, isPlainArray, isPlainObject, isString, isFunction, isPromise} = require '../types'
{escapeJavascriptString} = require '../string'
{inspectedObjectLiteral} = require './inspected_object_literal'

module.exports = class InspectedObjects
  @toInspectedObjects: toInspectedObjects = (m) ->
    return m unless m?
    oldm = m
    if m == global
      inspectedObjectLiteral "global"
    else if out = m.getInspectedObjects?()
      out
    else if isPromise m
      inspectedObjectLiteral "Promise"
    else if isPlainObject(m) || isPlainArray(m)
      deepMap m, (v) -> toInspectedObjects v
    else if m instanceof Error
      inspectedObjectLiteral m.stack || m.toString(), true
    # else if isString m
    #   inspectedObjectLiteral if m.match /\n/
    #     [
    #       '"""'
    #       m.replace /"""/, '""\\"'
    #       '"""'
    #     ].join '\n'
    #   else
    #     escapeJavascriptString m
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
