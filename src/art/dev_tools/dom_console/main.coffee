
###
# SASS
# compile it with: http://sassmeister.com/

###

define [
  'extlib/jquery'
  'require'
  'art.foundation'
  'lib/art/atomic'
  './namespace'
], ($, Require, Foundation, Atomic, DomConsole) ->

  {color, Color, point, Point, matrix, Matrix, rect, Rectangle} = Atomic
  {BaseObject, inspect, clone, merge, Map, nextTick, timeout, flatten,
  isArray, isString, isFunction
  isNumber
  createWithPostCreate
  colorRegex
  } = Foundation

  isImage = (o) -> o && ((typeof o.toImage == "function") || o.constructor == HTMLImageElement)
  htmlEscape = (str) -> str
    # $('<div/>').text(str).html()

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

  DomConsole.enable = ->
    Foundation.Log.alternativeLogger = DomConsole.Console.console
    DomConsole.enabled = true
    DomConsole.Console.console.show()

  DomConsole.disable = ->
    DomConsole.enabled = false
    Foundation.Log.alternativeLogger = null
    DomConsole.Console.console.hide()
    DomConsole.Console.console.reset()

  DomConsole.hide = -> DomConsole.Console.console.hide()
  DomConsole.show = -> DomConsole.Console.console.show()
  DomConsole.reset = -> DomConsole.Console.console.reset()

  DomConsole.logCore = (m, callStack, contextName) ->
    DomConsole.Console.console.logCore m, callStack, contextName

  DomConsole.logF = (options) ->
    DomConsole.Console.console.logF options
  DomConsole.log = (args...) ->
    DomConsole.Console.console.log args...

  packageLogArgs = (args) ->
    if args.length == 1
      args[0]
    else args

  wrapDomElement = (a, withB) ->
    bElement = $ withB
    bElement.append a
    bElement

  createWithPostCreate class DomConsole.Console extends BaseObject
    @singletonClass()

    @postCreate: ->
      self.domConsole = DomConsole.singleton
      super

    constructor: ->
      window.domConsole = @
      @_devicePixelRatio = Foundation.Browser.Dom.getDevicePixelRatio()
      @initDom()

    initCss: ->
      $('<link>')
        .appendTo($('head'))
        .attr({type : 'text/css', rel : 'stylesheet'})
        .attr('href', Require.toUrl 'lib/art/dev_tools/dom_console/style.css');

    reset: -> @domContainer.html ""
    hide: -> @domContainer.hide()
    show: -> @domContainer.show()

    initDom: ->
      @initCss()
      domEl = $ "<div></div>",
        id: domConsoleId
        class: "domConsole"
      domEl.on "click", ".collapsable", (e)=>
        $target = $(e.target).closest ".collapsable"
        $target.siblings().show()
        $target.hide()

      # leave space for mocha-stats bar
      if (mocha=$("#mocha")).length > 0
        maxAttempts = 8
        delay = 125/2
        fixMochaStats = ->
          unless maxAttempts--
            console.log "fixMochaStats... giving up; sorry for the ugly screen"
            return
          delay *= 2
          ms = $("#mocha-stats")
          if ms.length == 0
            console.log "fixMochaStats... (waiting #{delay}ms for #mocha-stats div to appear: #{maxAttempts})"
            timeout delay, fixMochaStats
          else
            ms.css "right":"530px"
        timeout delay, -> fixMochaStats()
        mocha.css "margin-right":"530px"

      domEl.appendTo $("body")
      @domContainer = $ "#" + domConsoleId

    appendLog: (domElement)->
      @domContainer.append domElement
      nextTick =>
        @domContainer.scrollTop @domContainer[0].scrollHeight

    newLogLine: ->
      $ "<div/>", class:"logLine"

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

    arrayKidsToDomArray: (arrayOfInspectedObjects, tagName, options, addCommasAndBrackets) ->
      options.maxDepth--
      kids = for child in arrayOfInspectedObjects
        $(tagName, class:"value").append @toDom child, options
      options.maxDepth++
      if addCommasAndBrackets
        kids = @addCommasAndBrackets kids, "[", "]"
      kids

    arrayToDomBasic: (arrayOfInspectedObjects, options) ->
      if options.maxDepth == 0
        return $("<span/>", class:"array maxdepth").text if arrayOfInspectedObjects.length == 0
          "[]"
        else
          "[... #{arrayOfInspectedObjects.length}]"

      $("<span/>", class:"array")
        .append @arrayKidsToDomArray arrayOfInspectedObjects, "<span/>", options, true


    arrayToDom: (arrayOfInspectedObjects, options) ->
      if options.treeView
        @arrayToDomTreeView arrayOfInspectedObjects, options
      else
        @arrayToDomBasic arrayOfInspectedObjects, options

    addCommasAndBrackets: (kids, leftBracket, rightBracket, typeName) ->
      for kid, i in kids when i + 1 < kids.length
        kid.append ", "
      flatten leftBracket, typeName, kids, rightBracket

    mapKidsToDomArray: (inspectedObject, tagName, options, addCommasAndBrackets) ->
      options.maxDepth--
      kids = for k, v of inspectedObject.children
        $(tagName).append [
          $("<span/>", class:"key").append k+": "
          $("<span/>", class:"value").append @toDom v, options
        ]
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
          $("<span/>", class:"object maxdepth").text "{#{inside}}"

      $ "<span/>", class:"object"
        .append @mapKidsToDomArray inspectedObject, "<span/>", options, true

    treeViewCollapsable: (collapsablePair, options) ->
      collapsablePair[if options.collapsed then 0 else 1].hide()
      collapsablePair

    instanceOfDomElement: (inspectedObject, inside) ->
      $("<span/>", class:"object maxdepth").text "<#{inspectedObject.instanceOf}#{inside || ""}>"

    arrayToDomTreeView: (arrayOfInspectedObjects, options) ->

      if arrayOfInspectedObjects.length == 0
        el = $ "<span/>", class:"array"
        return el.append "[]"

      @treeViewCollapsable [
        $("<ul/>", class:"collapsable open array").append @arrayKidsToDomArray arrayOfInspectedObjects, "<li/>", options
        $(@arrayToDomBasic arrayOfInspectedObjects, merge options, maxDepth:0, treeView:false).addClass "collapsable closed"
      ], options

    objectToDomTreeView: (inspectedObject, options) ->
      if inspectedObject.length == 0
        return if inspectedObject.instanceOf
          @instanceOfDomElement inspectedObject
        else
          el = $ "<span/>", class:"object"
          el.append "{}"

      @treeViewCollapsable [
        $("<ul/>", class:"object open collapsable").append @mapKidsToDomArray inspectedObject, "<li/>", options
        $(@objectToDomBasic inspectedObject, merge options, maxDepth:0, treeView:false).addClass "collapsable closed"
      ], options

    objectToDom: (inspectedObject, options) ->
      if options.treeView
        @objectToDomTreeView inspectedObject, options
      else
        @objectToDomBasic inspectedObject, options

    literalToDom: (inspectedObject) ->
      $("<span/>", class:"literal").text inspectedObject.toString()

    literalWithInspectedToDom: (inspectedObject) ->
      $("<span/>", class:"inspected literal").append inspectedObject.inspected

    colorToDom: (clr) ->
      displayString = if isString(clrString = clr)
        clr = color clr
        "'#{clrString}'"
      else
        clr.toString()

      style = "
        background-color: #{clr};
        padding:0 5px;
        color: #{if clr.perceptualLightness < .8 && clr.a > .25 then 'white' else 'black'};
        "
        # border: 1px solid #{if clr.a <= .25 then '#333' else clr.withLightness clr.l * .75};
      $("<span/>", class:"inspected", style: style).append "#{displayString}"

    toDom: (inspectedObject, options={}) ->
      if image = inspectedObject.image
        minImageDisplaySize = point 0 # 32
        maxImageDisplaySize = point(1024, 512).mul @_devicePixelRatio
        domEl = $(inspectedObject.image).clone()

        size = point image.width, image.height

        scale = 1 / @_devicePixelRatio

        if !size.gte minImageDisplaySize
          scale *= Math.ceil minImageDisplaySize.div(size).min()
        else if !size.lt maxImageDisplaySize
          scale *= maxImageDisplaySize.div(size).min()

        domEl.css("width", "#{image.naturalWidth  * scale | 0}px")
        domEl.css("height", "#{image.naturalHeight  * scale | 0}px")
        domEl

      else if inspectedObject.inspected
        # is Atomic.Color
        console.log inspectedObject.inspected
        if inspectedObject.originalObject instanceof Color
          @colorToDom inspectedObject.originalObject
        else
          @literalWithInspectedToDom inspectedObject
      else if children = inspectedObject.children
        # options.maxDepth = -1 unless typeof options.maxDepth is "number"
        if isArray children then @arrayToDom children, options
        else                     @objectToDom inspectedObject, options
      # string matching colorRegex
      else if isString(inspectedString = inspectedObject.string) && inspectedString.match colorRegex
        @colorToDom inspectedString
      else
        @literalToDom inspectedObject

    logCore: (m, callStack, name, options = {}) ->
      console.log m
      options.treeView = true
      {maxDepth} = options
      unless isNumber maxDepth
        maxDepth = 10

      inspector = new Foundation.Inspect.Inspector2 withImages:true, maxDepth:maxDepth
      domEl = @newLogLine()

      if typeof m is "string"
        return @appendLog @format domEl.append($("<pre/>").text(m)), options

      inspector.inspect m, (inspected) =>
        domEl.append @toDom inspected, options
        @appendLog @format domEl, options
