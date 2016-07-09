Inspector = require  "./inspector"
{inspect} = Inspector
StandardLib = require '../../standard_lib'
{deepMap, isPlainArray, isPlainObject, isClass, isString, isFunction, pluralize, compare} = StandardLib
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
      m
    else if isFunction m
      inspectedObjectLiteral (m.name || "function") + "(#{pluralize m.length, 'argument'})"
    else #if self.HTMLImageElement && m instanceof self.HTMLImageElement
      m
    #else m.toString()
