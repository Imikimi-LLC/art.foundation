StandardLib = require '../../standard_lib'
Inspect = require    "./namespace"
Inspector = require  "./inspector"

{isString, isArray, isFunction, isObject, escapeJavascriptString, isPlainObject, isPlainArray} = StandardLib

customInspect = (obj) =>
  return unless obj && !isFunction obj
  obj.inspect() if isFunction obj.inspect

  # a non-recursive inspect
Inspect.miniInspect = (obj) =>
  if !obj?                                then ""+obj
  else if customInspectable obj           then inspect obj
  else if isString obj                    then escapeJavascriptString obj
  else if isArray obj                     then "<<Array length: #{obj.length}>>"
  else if isFunction(obj) && obj.name=="" then "<<function args: #{obj.length}>>"
  else                                         "<<#{typeof obj}: " + (if obj.name then obj.name else obj) + ">>"

# strips enclosing '{}' or '[]' from plainObjects and plainArrays
Inspect.inspectLean = inspectLean = (object, options) =>
  fullInspect = inspect object, options
  if !isFunction(object?.inspect) && (isPlainObject(object) || (isPlainArray(object) && object.length > 1))
    match = fullInspect.match /^\[(.+)\]$|^\{(.+)\}$/
    if match then match[1] || match[2] || match[3] else fullInspect
  else
    fullInspect

Inspect.inspect = inspect = (obj, options = {}) =>
  inspector = new Inspector options
  inspector.inspect obj
  inspector.result

  # inspect obj, options
