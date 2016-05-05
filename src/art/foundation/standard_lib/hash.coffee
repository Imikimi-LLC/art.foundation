{compactFlatten} = require './array_compact_flatten'

module.exports = class Hash
  # http://jsperf.com/counting-object-properties/3
  @countKeys: (o) ->
    Object.keys(o).length

  # SBD this has been thouroughly benchmarked on Safari and Chrome as of 2015-11-06
  # This is as fast as I could make it.
  defaultEq = (a, b) -> a == b
  @objectDiff: (o1, o2, added, removed, changed, nochange, eq = defaultEq, o2KeyCount) ->
    o2KeyCountIsAtLeast = 0
    o1KeyCount = 0
    for k, v1 of o1
      o1KeyCount++
      if typeof (v2 = o2[k]) != "undefined" || o2.hasOwnProperty k
        o2KeyCountIsAtLeast++
        if !eq v1, v2
          changed k, v1, v2
        else
          nochange? k, v1
      else
        added k, v1

    if !(o2KeyCount?) || o2KeyCountIsAtLeast != o2KeyCount
      for k of o2
        removed k, o2[k] unless typeof o1[k] != "undefined" || o1.hasOwnProperty k
    o1KeyCount

  @objectWithout: (o, fields...) ->
    result = {}
    for k, v of o when k not in compactFlatten fields
      result[k] = v
    result

  @objectKeyCount: (o) ->
    count = 0
    count++ for k, v of o
    count

  ###

  merge "flattens" its arguments and then adds all keys from all objects in
  the list into a new object which is returned.

  return: new object

  The first object's keys are added first. If two or more objects have the same
  keys, the value set in the result is the last object's in the list with that key.

  ###
  @merge: => mergeInto {}, arguments

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
