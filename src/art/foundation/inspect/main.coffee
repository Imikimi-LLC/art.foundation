define [
  "../namespace"
  "./namespace"
  "../types"
  "./inspector"
  "../string"
], (Foundation, Inspect, Types, Inspector) ->

  {isString, isArray, isFunction, isObject} = Types

  customInspectable = (obj) => obj && obj.inspect2 && !(typeof obj == "function")

    # a non-recursive inspect
  Inspect.miniInspect = (obj) =>
    if !obj?                                then ""+obj
    else if customInspectable obj           then inspect obj
    else if isString obj                    then Foundation.String.escapeJavascriptString obj
    else if isArray obj                     then "<<Array length: #{obj.length}>>"
    else if isFunction(obj) && obj.name=="" then "<<function args: #{obj.length}>>"
    else                                         "<<#{typeof obj}: " + (if obj.name then obj.name else obj) + ">>"

    # strips enclosing '{}' if they exist
  inspectLean = Inspect.inspectLean = (obj, options) =>
    # if isArray obj
    #   (inspect i, options for i in obj).join ', '
    # else
    if customInspectable obj
      obj.inspect2()
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
  inspect = Inspect.inspect = (obj, options = {}) =>
      inspector = new Inspector options
      inspector.inspect obj
      inspector.result

      # inspect obj, options
