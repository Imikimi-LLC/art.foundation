{compactFlatten, deepArrayEach, isArrayOrArguments, mergeInto} = Neptune.NeptuneLib
{isPlainObject, isObject, isFunction, isPlainArray} = require './Types'

module.exports = class ObjectExtensions
  # http://jsperf.com/counting-object-properties/3
  @countKeys: (o) ->
    Object.keys(o).length

  @objectKeyCount: objectKeyCount = (o) ->
    count = 0
    count++ for k, v of o
    count

  @objectHasKeys: (o) ->
    return true for k, b of o
    false
    # Caf: find o with true

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
    console.error "toObject is DEPRICATED. Use toPlainObjects."
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
  IN:
    obj: the object to select fields from

    2nd argument can be:
      selectFunction: (value, key) -> true / false

    OR obj can be followed by any number of strings or arrays in any nesting, possibly with null fields
  ###
  @select: (obj, a) ->
    return {} unless obj
    result = {}
    if isFunction a
      if a.length == 1
        result[k] = v for k, v of obj when a v
      else
        result[k] = v for k, v of obj when a k, v
    else
      properties = compactFlatten Array.prototype.slice.call arguments, 1
      result[prop] = v for prop in properties when v = obj[prop] || obj.hasOwnProperty prop
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

  @propertyIsPathed: propertyIsPathed = (key) -> !!key.match /[\s\.\/]/

  @withPropertyPath: withPropertyPath = (obj, propertyPath, action) ->
    propertyPath = propertyPath.match /[^\s\.\/]+/g
    for key, i in propertyPath
      if i == propertyPath.length - 1
        action obj, key
      else
        obj = obj[key]||={}
    obj

  @setPathedProperty: setPathedProperty = (obj, propertyPath, value) ->
    withPropertyPath obj, propertyPath, (o, k) -> o[k] = value
    obj

  @expandPathedProperties: expandPathedProperties = (obj, into = {}) ->
    for k, v of obj
      if propertyIsPathed k
        withPropertyPath into, k, (o, finalKey) ->
          if isPlainObject v
            expandPathedProperties v, o[finalKey] = {}
          else
            o[finalKey] = v
      else if isPlainObject v
          expandPathedProperties v, into[k] = {}
      else
        into[k] = v

    into