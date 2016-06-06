
###
To customize how an object shows up in the DOM console, add
getInspectObjects member method. For more info, see base_object.coffee
###

require "!style!css!./style.css" if self.document

{$$} = require "art-foundation/src/extlib/node_list" if self.window

Foundation = require 'art-foundation'
Atomic = require 'art-atomic'
ToolBar = require './tool_bar'

{color, Color, point, Point, matrix, Matrix, rect, Rectangle} = Atomic
{
  BaseObject, inspect, clone, merge, Map, nextTick, timeout, flatten,
  isArray, isString, isFunction
  isNumber
  createWithPostCreate
  colorRegex
  Promise
} = Foundation

{Div, Pre, Span, Img, Li, Ul} = Foundation.Browser.DomElementFactories

isImage = (o) -> o && ((typeof o.toImage == "function") || o.constructor == HTMLImageElement)
htmlEscape = (str) -> str

insertBetweenEveryElement = (array, el) ->
  res = []
  first = true
  for v in array
    if first
      first = false
    else
      res.push el
    res.push v
  res

domConsoleId = 'Art-Dom-Console'

packageLogArgs = (args) ->
  if args.length == 1
    args[0]
  else args

wrapDomElement = (a, withB) ->
  bElement = $ withB
  bElement.append a
  bElement

module.exports = createWithPostCreate class Console extends BaseObject
  @singletonClass()

  @postCreate: ->
    self.domConsole = @singleton
    super

  constructor: ->
    window.domConsole = @
    @_devicePixelRatio = Foundation.Browser.Dom.getDevicePixelRatio()
    @initDom()

  reset: -> @domContainer.innerHTML = ""
  hide: -> @domContainer.style.display = "none"
  show: -> @domContainer.style.display = "block"

  @getter
    shown: -> @domContainer.style.display == "block"

  toggleCollapsable = (el) ->
    child.style.display = "block" for child in el.parentElement.children
    el.style.display = "none"

  initDom: ->
    document.body.appendChild Div
      id: domConsoleId
      style:
        position: "fixed"
        top: "0"
        right: "0"
        bottom: "0"

        display: "flex"
        flexDirection: "column"

      ToolBar()

      @domContainer = Div
        class: "domConsole"
        style:
          width: "500px"
          height: "100%"
          borderLeft: "1px solid #aaa"
        on: click: ({target})=>
          while target
            if target.className.match "collapsable"
              toggleCollapsable target
              break;
            target = target.parentElement

    # leave space for mocha-stats bar
    if (mocha = $$("#mocha")).length > 0
      maxAttempts = 8
      delay = 125/2
      fixMochaStats = ->
        unless maxAttempts--
          console.log "fixMochaStats... giving up; sorry for the ugly screen"
          return
        delay *= 2
        ms = $$("#mocha-stats")
        if ms.length == 0
          console.log "fixMochaStats... (waiting #{delay}ms for #mocha-stats div to appear: #{maxAttempts})"
          timeout delay, fixMochaStats
        else
          ms.style[0].right = "530px"
      timeout delay, -> fixMochaStats()
      mocha.style[0].marginRight = "530px"

  appendLog: (domElement)->
    @domContainer.appendChild Div class:"logLine", domElement
    nextTick =>
      @domContainer.scrollTop = @domContainer.scrollHeight

  # always returned the last argument passed in. That way you can:
  #     bar = foo # log foo's value in the middle of an expression, along with other values, without altering the rest of the expression
  #     bar = @log 1, 2, 3, foo
  log: (args...) ->
    @logCore packageLogArgs(args)
    args[args.length-1]

  logF: (options) ->
    @logCore options.log, null, null, options
    options.log

  format: (domEl, options) ->
    domEl = wrapDomElement domEl, "<#{options.tag}/>" if options && options.tag
    domEl

  arrayKidsToDomArray: (arrayOfInspectedObjects, Factory, options, addCommasAndBrackets) ->
    options.maxDepth--
    kids = for child, i in arrayOfInspectedObjects
      break if i > 50
      if i == 50
        Factory class:"value", "array length: #{arrayOfInspectedObjects.length} (showing the first #{i})"
      else
        Factory class:"value", @toDom child, options
    options.maxDepth++
    if addCommasAndBrackets
      kids = @addCommasAndBrackets kids, "[", "]"
    kids

  arrayToDomBasic: (arrayOfInspectedObjects, options) ->
    if options.maxDepth == 0
      return Span class:"array maxdepth #{options.class}", if arrayOfInspectedObjects.length == 0
        "[]"
      else
        "[... #{arrayOfInspectedObjects.length}]"

    Span
      class: "array #{options.class}"
      @arrayKidsToDomArray arrayOfInspectedObjects, Span, options, true


  arrayToDom: (arrayOfInspectedObjects, options) ->
    if options.treeView
      @arrayToDomTreeView arrayOfInspectedObjects, options
    else
      @arrayToDomBasic arrayOfInspectedObjects, options

  addCommasAndBrackets: (kids, leftBracket, rightBracket, typeName) ->
    for kid, i in kids when i + 1 < kids.length
      kid.append ", "
    flatten leftBracket, typeName, kids, rightBracket

  mapKidsToDomArray: (inspectedObject, Factory, options, addCommasAndBrackets) ->
    options.maxDepth--
    kids = for k, v of inspectedObject.children
      Factory null,
        Span class:"key", k + ": "
        Span class:"value", @toDom v, options

    options.maxDepth++
    if addCommasAndBrackets
      if inspectedObject.instanceOf
        @addCommasAndBrackets kids, "&lt;", "&gt;", inspectedObject.instanceOf + " "
      else
        @addCommasAndBrackets kids, "{", "}"
    else
      if inspectedObject.instanceOf
        flatten inspectedObject.instanceOf + " ", kids
      else
        kids

  objectToDomBasic: (inspectedObject, options) ->
    if options.maxDepth == 0
      inside = if inspectedObject.length == 0 then "" else "... #{inspectedObject.length}"
      return if inspectedObject.instanceOf
        @instanceOfDomElement inspectedObject, inside
      else
        Span class:"object maxdepth #{options.class}", "{#{inside}}"

    Span
      class:"object"
      @mapKidsToDomArray inspectedObject, Span, options, true

  treeViewCollapsable: (collapsablePair, options) ->
    collapsablePair[if options.collapsed then 0 else 1].style.display = "none"
    collapsablePair

  instanceOfDomElement: (inspectedObject, inside) ->
    Span class:"object maxdepth", "<#{inspectedObject.instanceOf}#{inside || ""}>"

  arrayToDomTreeView: (arrayOfInspectedObjects, options) ->

    if arrayOfInspectedObjects.length == 0
      console.log "empty damn array!"
      return Span class:"array", "[]"

    @treeViewCollapsable [
      Ul class:"collapsable open array", @arrayKidsToDomArray arrayOfInspectedObjects, Li, options
      @arrayToDomBasic arrayOfInspectedObjects, merge options, maxDepth:0, treeView:false, class: "collapsable closed"
    ], options

  objectToDomTreeView: (inspectedObject, options) ->
    if inspectedObject.length == 0
      return if inspectedObject.instanceOf
        @instanceOfDomElement inspectedObject
      else
        Span class: "object", "{}"

    @treeViewCollapsable [
      Ul class:"object open collapsable", @mapKidsToDomArray inspectedObject, Li, options
      @objectToDomBasic inspectedObject, merge options, maxDepth:0, treeView:false, class: "collapsable closed"
    ], options

  objectToDom: (inspectedObject, options) ->
    if options.treeView
      @objectToDomTreeView inspectedObject, options
    else
      @objectToDomBasic inspectedObject, options

  # if there are new-lines in the literal, show with PRE instead of SPAN
  literalToDomHelper = (classes, literalString) ->
    Factory = if literalString.match /\s\s+|\n/
      Pre
    else
      Span
    Factory class:classes, literalString

  literalToDom: (inspectedObject) ->
    literalToDomHelper "literal", inspectedObject.toString()

  literalWithInspectedToDom: (inspectedObject) ->
    literalToDomHelper "inspected literal", inspectedObject.inspected

  colorToDom: (clr) ->
    displayString = if isString clrString = clr
      clr = color clr
      "'#{clrString}'"
    else
      clr.toString()

    Span
      class: "inspected"
      style:
        backgroundColor:  clr
        padding:          "0 5px"
        color:            if clr.perceptualLightness < .8 && clr.a > .25 then 'white' else 'black'
      "#{displayString}"

  imgToDom: (image) ->
    minImageDisplaySize = point 0 # 32
    maxImageDisplaySize = point(1024, 512).mul @_devicePixelRatio

    size = point image.width, image.height

    scale = 1 / @_devicePixelRatio

    if !size.gte minImageDisplaySize
      scale *= Math.ceil minImageDisplaySize.div(size).min()
    else if !size.lt maxImageDisplaySize
      scale *= maxImageDisplaySize.div(size).min()

    Img
      src: image.src
      style:
        width:  "#{image.naturalWidth  * scale | 0}px"
        height: "#{image.naturalHeight * scale | 0}px"

  toDom: (inspectedObject, options={}) ->
    if image = inspectedObject.image
      @imgToDom image

    else if inspectedObject.inspected
      if inspectedObject.originalObject instanceof Color
        @colorToDom inspectedObject.originalObject
      else
        @literalWithInspectedToDom inspectedObject
    else if children = inspectedObject.children
      if isArray children then @arrayToDom children, options
      else                     @objectToDom inspectedObject, options
    else if isString(inspectedString = inspectedObject.string) && inspectedString.match colorRegex
      @colorToDom inspectedString
    else
      @literalToDom inspectedObject

  logSerializer = new Promise.Serializer
  logCore: (m, callStack, name, options = {}) ->
    logSerializer.then => new Promise (resolve) =>
      console.log m
      options.treeView = true
      {maxDepth} = options
      maxDepth = 10 unless isNumber maxDepth

      inspector = new Foundation.Inspect.Inspector2 withImages: true, maxDepth: maxDepth

      if typeof m is "string" && !m.match colorRegex
        resolve @appendLog @format Pre(m), options
      else
        inspector.inspect m, (inspected) =>
          domEl = @toDom inspected, options
          resolve @appendLog @format domEl, options
