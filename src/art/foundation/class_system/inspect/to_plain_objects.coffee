Inspector = require  "./inspector"
{inspect} = Inspector
StandardLib = require '../../standard_lib'
{
  deepMap, isPlainArray, isPlainObject, isClass, isString, isFunction, pluralize, compare
  escapeJavascriptString
  compactFlatten
} = StandardLib
{inspectedObjectLiteral} = require './inspected_object_literal'

module.exports = class PlainObjects
  @toPlainObjects: toPlainObjects = (m) ->
    return m unless m?
    oldm = m
    if out = m.getPlainObjects?()
      out
    else if isPlainObject(m) || isPlainArray(m)
      deepMap m, (v) -> toPlainObjects v
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
