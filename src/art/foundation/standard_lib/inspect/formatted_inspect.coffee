{isString, isPlainObject, isPlainArray, isFunction} = require '../types'
{max} = Math
{pad, stripTrailingWhitespace, escapeJavascriptString} = require '../string'
{inspect} = require './inspector'
{toInspectedObjects} = require './to_inspected_objects'

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
    inspectedLength = 0

    forceMultilineOutput = false
    shouldBeOnOwnLine = false
    keyCount = 0

    inspectedValues = for key, value of m
      keyCount++
      inspectedValue = formatMultilineSubStructure value, formattedInspectRecursive value, maxLineLength
      key = inspect key unless key.match /^[_a-zA-Z[_a-zA-Z0-9]*$/
      inspectedLength += inspectedValue.length + key.length + 2
      forceMultilineOutput ||= shouldBeOnOwnLine # if previous entry should be on own line, force all on own line
      shouldBeOnOwnLine = !inspectedValue.match /^([^,:]|\(.*\)|\{.*\}|\".*\"|\'.*\'|\[.*\])*$/
      [key, inspectedValue]

    return "{}" if keyCount == 0

    index = 0
    if !forceMultilineOutput && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2
      finalInspectedValues = for [k, v] in inspectedValues
        "#{k}: #{v}"
      finalInspectedValues.join ",\t"
    else
      finalInspectedValues = for [k, v] in inspectedValues
        "#{k}:#{if v.match /(\[\]|\{\})\n/ then " " else "\t"}#{v}"
      finalInspectedValues.join "\n"

  else if isPlainArray m
    inspectedLength = 0
    lastWasObject = false
    lastWasArray = false
    containsConsecutiveObjects = false
    containsConsecutiveArrays = false
    inspectedValues = for value in m
      if _isPlainObject = isPlainObject value
        containsConsecutiveObjects ||= lastWasObject
        lastWasObject = true
      else
        lastWasObject = false
      if isPlainArray value
        containsConsecutiveArrays ||= lastWasArray
        lastWasArray = true
      inspected = formattedInspectRecursive value, maxLineLength
      inspected = formatMultilineSubStructure value, inspected unless _isPlainObject

      inspectedLength += inspected.length
      inspected

    if !containsConsecutiveArrays && !containsConsecutiveObjects && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2
      if inspectedValues.length <= 1
        "[] #{inspectedValues.join ",\t"}"
      else
        inspectedValues.join ",\t"
    else
      indentedInspectedArray = for inspectedEl, i in inspectedValues
        v = inspectedEl
        v = "{}#{if v.match("\n") then "\n  " else " "}#{v.replace(/\n/g, "\n  ")}" if containsConsecutiveObjects && isPlainObject m[i]
        v
      """
      #{indentedInspectedArray.join "\n"}
      """
  else if isString m
    if m.length > 10 && m.match(/\n/) && !m.match /\ (\n|$)/
      [
        '"""'
        m.replace /"""/, '""\\"'
        '"""'
      ].join '\n'
    else
      escapeJavascriptString m
  else
    inspect m

alignTabs = (linesString) ->
  tabStops = 1
  lines = linesString.split "\n"

  # if all lines have the same number of columns, then numColumns == that number
  # Otherwise, it == 2.
  # In that case, all tabs after the first tabs are treated as spaces.
  # This a poor man's attempt to smartly align things like:
  #   {} AttributeName: "chatRoom",   AttributeType: "S"
  #   {} AttributeName: "createdAt",  AttributeType: "N"
  #   {} AttributeName: "id",         AttributeType: "S"
  # A better test would be if each column had the same label...

  numColumnsToPad = null
  maxColumnSizes = []
  for line in lines when (elements = line.split "\t").length > 1
    if !numColumnsToPad?
      numColumnsToPad = elements.length - 1
    else if numColumnsToPad != elements.length - 1
      numColumnsToPad = 1

    for el, i in elements
      maxColumnSizes.push 0 if maxColumnSizes.length == i
      maxColumnSizes[i] = max maxColumnSizes[i], Math.ceil((el.length + 1)/tabStops) * tabStops
  # console.log maxColumnSizes: maxColumnSizes

  alignedLines = for line in lines
    elements = line.split "\t"
    r = if elements.length > 1
      for el, i in elements
        if i >= numColumnsToPad
          "#{el} "
        else
          pad el, maxColumnSizes[i]
    else
      elements
    r.join ""

  alignedLines.join "\n"

alignTabStopsByBlocks = (linesString) ->
  # console.log blocks: linesString.split(/\n[ \t]*\n/).length, linesString: linesString
  alignedBlocks = for block in linesString.split /\n[ \t]*\n/
    alignTabs block
  alignedBlocks.join "\n\n"

module.exports = class FormattedInspect
  @formattedInspect: (m, maxLineLength = 80) ->
    stripTrailingWhitespace alignTabStopsByBlocks formattedInspectRecursive toInspectedObjects(m), maxLineLength
