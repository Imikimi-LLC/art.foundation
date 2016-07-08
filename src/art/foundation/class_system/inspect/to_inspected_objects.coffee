###
TODO: refactor so nothing in inspect/* users BaseObject
Then, move into StandardLib.
###

Inspector = require  "./inspector"
{inspect} = Inspector
StandardLib = require '../../standard_lib'
{deepMap, isPlainArray, isPlainObject, isClass, isString, isFunction, pluralize} = StandardLib

module.exports = toInspectedObjects = (m) ->
  return m unless m?
  oldm = m
  m = m.getInspectedObjects?() || m
  console.log toInspectedObjects: m, oldm:m

  if isFunction m.inspect
    m.inspect()
  else if isPlainObject(m) || isPlainArray(m)
    deepMap m, (v) -> toInspectedObjects v
  else if isString m
    inspect m
  else if isClass m
    "<#{m.getNamespacePath?() || m.getName?() || m.name || "unknown class"}>"
  else if isFunction m
    (m.name || "function") + "(#{pluralize m.length, 'argument'})"
  else if self.HTMLImageElement && m instanceof self.HTMLImageElement
    m
  else m.toString()
