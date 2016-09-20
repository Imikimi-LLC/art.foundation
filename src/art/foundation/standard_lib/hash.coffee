{compactFlatten, deepArrayEach, isArrayOrArguments} = require './array_compact_flatten'
{isPlainObject, isFunction, isPlainArray} = require './types'

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

  @hasKeys: hasKeys = (o) ->
    return true for k, v of o
    false

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
  @inject: inject = (input, a, b) ->
    {log} = Neptune.Art.Foundation
    block = if arguments.length == 2
      memoSet = false
      memo = null
      a
    else
      memo = a
      memoSet = true
      b

    twoInputBlock = block.length >= 3

    # log inject: input: input, block: block, memo: memo, memoSet: memoSet, twoInputBlock: twoInputBlock
    if isPlainObject input
      for k, v of input
        unless memoSet
          # log setInitialMemo: v
          memo = v
          memoSet = true
        else
          memo = if twoInputBlock then block memo, k, v else block memo, v
    else
      for v, k in input
        unless memoSet
          # log setInitialMemoArray: v
          memo = v
          memoSet = true
        else
          memo = if twoInputBlock then block memo, k, v else block memo, v
    memo

  ###
  IN:
    input: array or object
    block: (map, k, v) -> OR
    block: (k, v) -> OR
    block: (v) -> newV
      for arrays, k is the index
  ###
  @newMapFromEach: (input, block = (map, k, v) -> map[k] = v) ->
    inject input, {}, if isPlainArray input
      switch block.length
        when 0, 1 then (memo, k, v) -> memo[v] = block v;     memo
        when 2    then (memo, k, v) -> memo[v] = block k, v;  memo
        when 3    then (memo, k, v) -> block memo, k, v;      memo
        else
          throw new Error "expecting block-function with 0, 1, 2 or 3 arguments"
    else
      switch block.length
        when 0, 1 then (memo, k, v) -> memo[k] = block v;     memo
        when 2    then (memo, k, v) -> memo[k] = block k, v;  memo
        when 3    then (memo, k, v) -> block memo, k, v;      memo
        else
          throw new Error "expecting block-function with 0, 1, 2 or 3 arguments"

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

  ###
  Just like mergeInfo except only merge into the result object UNLESs result.hasOwnProperty

  if
    mergeInfo a, b is just like merge a, b except it modifies and returns a instead of returning a new object
  then
    mergeIntoUnless b, a is just like merge a, b except it modifies and returns b instead of returning a new object

  Note: mergeIntoUnless a, b, c, d, e, f is like merge f, e, d, c, b, a
  ###
  @mergeIntoUnless: ->
    sources = compactFlatten arguments
    return null if sources.length == 0
    result = sources[0] || {}
    for i in [1...sources.length] by 1
      source = sources[i]
      for k, v of source
        result[k] = v unless result.hasOwnProperty k
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
