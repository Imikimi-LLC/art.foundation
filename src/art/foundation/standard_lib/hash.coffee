{compactFlatten, deepArrayEach, isArrayOrArguments} = require './array_compact_flatten'
{isPlainObject} = require './types'

module.exports = class Hash
  # http://jsperf.com/counting-object-properties/3
  @countKeys: (o) ->
    Object.keys(o).length

  @objectWithout: (o, fields...) ->
    result = {}
    for k, v of o when k not in compactFlatten fields
      result[k] = v
    result

  @objectKeyCount: objectKeyCount = (o) ->
    count = 0
    count++ for k, v of o
    count

  @objectLength: objectKeyCount

  ###
  NOTE:
    null and undefined keys are NOT SUPPORTED

    They should be converted to strings, first,
    which is what they would become anyway.

  IN: 0 or more arguments
    out = {}
    list = arguments

    for element in list
      objects: merge into out
      arrays or argument lists: recurse using element as the list
      null or undefined: skip
      else out[element] = next element (or undefined if none)

  OUT: plain object
  ###
  toObjectInternal = (list, out) ->
    key = null
    for element in list
      if key
        out[key] = element
        key = null
      else if isPlainObject element
        mergeInto out, element
      else if isArrayOrArguments element
        toObjectInternal element, out
      else if element?
        key = element
    out[key] = undefined if key

  @toObject: ->
    out = {}
    toObjectInternal arguments, out
    out

  ###
  IN:
    inputArray: any array
    transformFunction: (element) -> [key, value]
      default: transforms an array of the form: [[key1, value1], [key2, value2], etc...]
  ###
  @arrayToMap: (inputArray, transformFunction = (element) -> element) ->
    outputMap = {}
    for element in inputArray
      [key, value] = transformFunction element
      outputMap[key] = value
    outputMap

  ###

  merge "flattens" its arguments and then adds all keys from all objects in
  the list into a new object which is returned.

  return: new object

  The first object's keys are added first. If two or more objects have the same
  keys, the value set in the result is the last object's in the list with that key.

  ###
  @merge: merge = => mergeInto {}, arguments

  ###
  The same as 'merge' with one difference:

  Instead of a new object, all objects are merged into the first object in the list.

  return: first object in the flattened list
  return: null if no source objects
  ###
  @mergeInto: mergeInto = ->
    sources = compactFlatten arguments
    return null if sources.length == 0
    result = sources[0] || {}
    for i in [1...sources.length] by 1
      source = sources[i]
      result[k] = v for k, v of source
    result

  @deepMerge: deepMerge = ->
    list = compactFlatten arguments
    out = merge list
    for k, v of out
      if isPlainObject v
        out[k] = deepMerge (val[k] for val in list)
    out

  # true if o2 has all the properties of o1 (possibly more, and possibly with different values including undefined or nul)
  @hasAllProps: (o1, o2) ->
    for k, v of o1
      return false unless o2.hasOwnProperty k
    true

  # Like merge, it doesn't alter any of the inputs
  # Unlike merge, it returns o2 without creating a new object if the result would be identical to o2.
  # if o1 or o2 is null/undefined, return the other
  # if both are unll/undefined, return o2
  # the name "pureMerge" comes from pure-functional-merge - as in this is how you'd implement
  # merge if you were asuming o1, o2 and the result of pureMerge were never modified.
  # TODO: a better name may be leanMerge - since it is ligher weight than "merge".
  @pureMerge: =>
    sources = compactFlatten arguments
    return null if sources.length == 0
    return sources[0] if sources.length == 1

    # only apply merge if the last object is missing a key from another object
    last = sources[sources.length - 1]
    for source in sources when source != last
      return @merge sources unless @hasAllProps source, last
    last

  @select: (obj, properties...) ->
    return {} unless obj
    result = {}
    result[prop] = v for prop in compactFlatten properties when v = obj[prop] || obj.hasOwnProperty prop
    result

  # same as select, but ignore hasOwnProperty test
  @selectAll: (obj, properties...) ->
    return {} unless obj
    result = {}
    result[prop] = obj[prop] for prop in compactFlatten properties
    result

  @objectWithout: (obj, properties...) ->
    properties = properties[0] if properties.length == 1 && !(typeof properties[0] is "string")
    anythingToDo = false
    for prop in properties
      if obj.hasOwnProperty prop
        anythingToDo = true
        break
    if anythingToDo
      result = {}
      result[prop] = v for prop, v of obj when prop not in properties
      result
    else
      obj
