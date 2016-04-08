StandardLib = require '../../standard_lib'
Inspect = require    "./namespace"
Inspector = require  "./inspector"

{isString, isArray, isFunction, isObject, escapeJavascriptString} = StandardLib

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

  # strips enclosing '{}' if they exist
Inspect.inspectLean = inspectLean = (obj, options) =>
  # if isArray obj
  #   (inspect i, options for i in obj).join ', '
  # else
  if inspected = customInspect obj
    inspected
  else if isObject obj
    keys = Object.keys obj
    last = keys.length - 1
    inspected = for k, i in keys
      v = obj[k]
      v = if i == last
        inspectLean v, options
      else
        inspect v, options
      k = inspect k unless Inspector.unquotablePropertyRegex.test k
      "#{k}: #{v}"
    inspected.join ', '
  else
    inspect obj, options

  # main inspect
  # options
  #   maxDepth: 10 # don't recurse more than 10 levels deep
  #   noCustomInspectors: false # if true, then objects implemented "inspect" methods won't be used.
Inspect.inspect = inspect = (obj, options = {}) =>
    inspector = new Inspector options
    inspector.inspect obj
    inspector.result

    # inspect obj, options
