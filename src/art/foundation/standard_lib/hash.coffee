{compactFlatten, deepArrayEach, isArrayOrArguments, mergeInto} = Neptune.NeptuneLib
{isPlainObject, isObject, isFunction, isPlainArray} = require './types'

module.exports = class Hash
  # http://jsperf.com/counting-object-properties/3
  @countKeys: (o) ->
    Object.keys(o).length

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
    input: array or object
    memo: [optional] initial value; if not set, the first element is used, if no elements, null is used and returned
    block: (memo, value) -> newMemo OR
    block: (memo, key, value) -> newMemo
      key is the index for arrays

      Why value or key, value? Mostly consistent with CoffeeScripts:
        for...in and for...of signatures
      Different from CoffeeScript?
        for arrays, if block has two arguments, the signature is the SAME as
        objects where indexes in arrays are equivelent to keys in objects: (memo, index, value) ->
      Why different from CoffeeScript?
        So two-input blocks work the same regardless of if an array or object is input.

  ###
  truthWhenBlock = -> true
  @inject: inject = (input, a, b) ->
    {log} = Neptune.Art.Foundation
    doBlock = if arguments.length == 2
      memoSet = false
      memo = null
      a
    else
      memo = a
      memoSet = true
      b

    if isPlainObject doBlock
      whenBlock = doBlock.when
      doBlock = doBlock.do

    whenBlock ||= truthWhenBlock

    twoInputWhenBlock = whenBlock.length >= 2

    twoInputBlock = doBlock.length >= 3

    # log inject: input: input, doBlock: doBlock, memo: memo, memoSet: memoSet, twoInputBlock: twoInputBlock
    # TODO: detect if ES6 iterable
    if isObject input
      for k, v of input
        if (twoInputWhenBlock && whenBlock k, v) || whenBlock v
          unless memoSet
            # log setInitialMemo: v
            memo = v
            memoSet = true
          else
            memo = if twoInputBlock then doBlock memo, k, v else doBlock memo, v

    else if input.length >= 0
      for v, k in input
        if (twoInputWhenBlock && whenBlock k, v) || whenBlock v
          unless memoSet
            # log setInitialMemoArray: v
            memo = v
            memoSet = true
          else
            memo = if twoInputBlock then doBlock memo, k, v else doBlock memo, v
    memo

  ###
  IN:
    input: array or object
    block: (map, k, v) -> OR
    block: (k, v) -> OR
    block: (v) -> newV
      for arrays, k is the index
  ###
  copyDoBlock = (map, k, v) -> map[k] = v
  @newObjectFromEach: newObjectFromEach = (input, doBlock) ->
    if isPlainObject doBlock
      whenBlock = doBlock.when
      doBlock = doBlock.do

    doBlock ||= copyDoBlock

    inject input, {},
      when: whenBlock
      do:
        if isPlainArray input
          switch doBlock.length
            when 0, 1 then (memo, k, v) -> memo[v] = doBlock v;     memo
            when 2    then (memo, k, v) -> memo[v] = doBlock k, v;  memo
            when 3    then (memo, k, v) -> doBlock memo, k, v;      memo
            else
              throw new Error "expecting doBlock-function with 0, 1, 2 or 3 arguments"
        else
          switch doBlock.length
            when 0, 1 then (memo, k, v) -> memo[k] = doBlock v;     memo
            when 2    then (memo, k, v) -> memo[k] = doBlock k, v;  memo
            when 3    then (memo, k, v) -> doBlock memo, k, v;      memo
            else
              throw new Error "expecting doBlock-function with 0, 1, 2 or 3 arguments"

  # Alias - which one is best?
  @newMapFromEach: newObjectFromEach



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