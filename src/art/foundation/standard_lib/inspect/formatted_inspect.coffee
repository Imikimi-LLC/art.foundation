{isString, isPlainObject, isPlainArray, isFunction, isNumber} = require '../types'
{max} = Math
{pad, stripTrailingWhitespace, escapeJavascriptString} = require '../string'
{inspect} = require './inspector'
{toInspectedObjects} = require './to_inspected_objects'

niceNodeInspectIndent = '  '
newLineWithNiceNodeInspectIndent = "\n#{niceNodeInspectIndent}"

formatMultilineSubStructure = (m, inspected, implicitRepresentationOk) ->
  return inspected unless inspected.match /\n/
  inspected.replace /\n/g, newLineWithNiceNodeInspectIndent

formatMultilineSubStructureForObject = (m, inspected, implicitRepresentationOk) ->
  return inspected unless inspected.match /\n/
  if inspected.match /^- /
    "\n#{inspected}\n"
  else
    newLineWithNiceNodeInspectIndent + inspected.replace /\n/g, newLineWithNiceNodeInspectIndent

formattedInspectRecursive = (m, options, implicitRepresentationOk) ->
  {maxLineLength} = options
  if isPlainObject m
    inspectedLength = 0

    forceMultilineOutput = false
    shouldBeOnOwnLine = false
    keyCount = 0

    inspectedValues = for key, value of m
      keyCount++
      inspectedValue = formatMultilineSubStructureForObject value, formattedInspectRecursive(value, options)
      key = inspect key unless key.match /^[-._a-zA-Z[_a-zA-Z0-9]*$/
      inspectedLength += inspectedValue.length + key.length + 2
      forceMultilineOutput ||= shouldBeOnOwnLine # if previous entry should be on own line, force all on own line
      shouldBeOnOwnLine = !inspectedValue.match /^([^,:]|\(.*\)|\{.*\}|\".*\"|\'.*\'|\[.*\])*$/
      [key, inspectedValue]

    return "{}" if keyCount == 0

    index = 0
    finalInspectedValues = for [k, v] in inspectedValues
      "#{k}:\t#{v}"

    finalInspectedValues.join if !forceMultilineOutput && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2
      ",\t"
    else
      "\n"

  else if isPlainArray m
    inspectedLength = 0
    lastWasObject = false
    lastWasArray = false
    containsConsecutiveObjects = false
    containsConsecutiveArrays = false
    inspectedValues = for value in m
      implicitRepresentationOk = true
      if _isPlainObject = isPlainObject value
        containsConsecutiveObjects ||= lastWasObject
        lastWasObject = true
      else
        lastWasObject = false
      if isPlainArray value
        implicitRepresentationOk = false
        containsConsecutiveArrays ||= lastWasArray
        lastWasArray = true
      inspected = formattedInspectRecursive value, options, implicitRepresentationOk
      inspected = formatMultilineSubStructure value, inspected, implicitRepresentationOk #unless _isPlainObject

      inspectedLength += inspected.length
      inspected

    if !containsConsecutiveArrays && !containsConsecutiveObjects && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2
      if inspectedValues.length == 0
        "[]"
      else if inspectedValues.length <= 1
        "- #{inspectedValues.join ",\t"}"
      else
        inspectedValues.join ",\t"
    else
      indentedInspectedArray = for inspectedEl, i in inspectedValues
        # v = inspectedEl
        # v = "{}#{if v.match("\n") then "\n  " else " "}#{v.replace(/\n/g, "\n  ")}" if containsConsecutiveObjects && isPlainObject m[i]
        # v
        "- #{inspectedEl}"
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

alignTabs = (maxLineLength, linesString) ->
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
  maxColumnWidth = maxLineLength / 2
  for line in lines when (elements = line.split "\t").length > 1
    if !numColumnsToPad?
      numColumnsToPad = elements.length - 1
    else if numColumnsToPad != elements.length - 1
      numColumnsToPad = 1

    for el, i in elements when i < elements.length - 1 && (i == 0 || el.length < maxColumnWidth)
      maxColumnSizes.push 0 if maxColumnSizes.length == i
      maxColumnSizes[i] = max maxColumnSizes[i], el.length + 1
  # console.log maxColumnSizes: maxColumnSizes, numColumnsToPad:numColumnsToPad

  alignedLines = for line in lines
    elements = line.split "\t"
    r = if elements.length > 1
      totalPad = 0
      for el, i in elements
        totalPad += maxColumnSizes[i] || 0
        if maxColumnSizes[i] # && (!maxLineLength? || totalPad < maxLineLength)
          pad el, maxColumnSizes[i]
        else
          "#{el} "
    else
      elements
    r.join ""

  alignedLines.join "\n"

alignTabStopsByBlocks = (maxLineLength, linesString) ->
  # console.log blocks: linesString.split(/\n[ \t]*\n/).length, linesString: linesString
  # alignedBlocks = for block in linesString.split /\n[ \t]*\n/
    alignTabs maxLineLength, linesString
  # alignedBlocks.join "\n\n"

module.exports = class FormattedInspect
  @formattedInspect: (m, options = {}) ->
    if isNumber options
      options = maxLineLength: options
    options.maxLineLength ?= 80
    stripTrailingWhitespace alignTabStopsByBlocks options.maxLineLength, formattedInspectRecursive toInspectedObjects(m), options
