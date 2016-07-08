{isString, isPlainObject, isPlainArray, max, pad} = require '../../standard_lib'
{inspect} = require './inspector'
{log} = require '../log'
toInspectedObjects = require './to_inspected_objects'

niceNodeInspectIndent = '  '
newLineWithNiceNodeInspectIndent = "\n#{niceNodeInspectIndent}"

formatMultilineSubStructure = (m, inspected) ->
  return inspected unless inspected.match /\n/
  inspected = inspected.replace /\n/g, newLineWithNiceNodeInspectIndent
  if isPlainObject m
    "#{newLineWithNiceNodeInspectIndent}#{inspected}"
  else if isPlainArray m
    "[]#{newLineWithNiceNodeInspectIndent}#{inspected}"
  else
    inspected

formattedInspectRecursive = (m, maxLineLength) ->
  if isPlainObject m
    maxKeyLength = 0
    inspectedLength = 0

    forceMultilineOutput = false
    shouldBeOnOwnLine = false
    inspectedValues = for key, value of m
      maxKeyLength = max maxKeyLength, key.length
      inspectedValue = formatMultilineSubStructure value, formattedInspectRecursive value, maxLineLength
      key = inspect key if key.match /[:\n]/
      inspectedLength += inspectedValue.length + key.length + 2
      forceMultilineOutput ||= shouldBeOnOwnLine # if previous entry should be on own line, force all on own line
      shouldBeOnOwnLine = !inspectedValue.match /^([^,:]|\(.*\)|\{.*\}|\".*\"|\'.*\'|\[.*\])*$/
      [key, inspectedValue]

    index = 0
    if !forceMultilineOutput && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2
      finalInspectedValues = for [k, v] in inspectedValues
        "#{k}: #{v}"
      finalInspectedValues.join ', '
    else
      finalInspectedValues = for [k, v] in inspectedValues
        "#{pad k + ':', maxKeyLength + 1} #{v}"
      finalInspectedValues.join "\n"

  else if isPlainArray m
    inspectedLength = 0
    lastWasObject = false
    lastWasArray = false
    containsConsecutiveObjects = false
    containsConsecutiveArrays = false
    inspectedValues = for value in m
      if isPlainObject value
        containsConsecutiveObjects ||= lastWasObject
        lastWasObject = true
      if isPlainArray value
        containsConsecutiveArrays ||= lastWasArray
        lastWasArray = true
      inspected = formatMultilineSubStructure value, formattedInspectRecursive value, maxLineLength
      inspectedLength += inspected.length
      inspected

    if !containsConsecutiveArrays && !containsConsecutiveObjects && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2
      if inspectedValues.length <= 1
        "[] #{inspectedValues.join ', '}"
      else
        inspectedValues.join ', '
    else
      indentedInspectedArray = for inspectedEl, i in inspectedValues
        v = inspectedEl
        v = "{} #{v}" if containsConsecutiveObjects && isPlainObject m[i]
        v
      """
      #{indentedInspectedArray.join "\n"}
      """
  else
    throw new Error "expecting string: #{inspect m}" unless isString m
    m

module.exports = (m, maxLineLength = 80) -> formattedInspectRecursive toInspectedObjects(m), maxLineLength
