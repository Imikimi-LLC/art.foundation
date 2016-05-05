# https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input

{$$} = require "art-foundation/src/extlib/node_list" if self.window

{isString} = require "../standard_lib"
{createObjectTreeFactories} = require "../class_system/object_tree_factory"

module.exports = class Dom
  @createElementFromHtml: (html) ->
    div = document.createElement 'div'
    div.innerHTML = html
    div.firstChild

  @allElementNames: "
    A Abbr Acronym Address Applet Area Article Aside Audio B Base BaseFont Bdi Bdo
    Big BlockQuote Body Br Button Canvas Caption Center Cite Code Col ColGroup
    DataList Dd Del Details Dfn Dialog Dir Div Dl Dt Em Embed FieldSet FigCaption
    Figure Font Footer Form Frame FrameSet H1 Head Header Hr Html I IFrame Img Input
    Ins Kbd KeyGen Label Legend Li Link Main Map Mark Menu MenuItem Meta Meter Nav
    NoFrames NoScript Object Ol OptGroup Option Output P Param Pre Progress Q Rp Rt
    Ruby S Samp Script Section Select Small Source Span Strike Strong Style Sub
    Summary Sup Table TBody Td TextArea TFoot Th THead Time Title Tr Track Tt U Ul
    Var Video Wbr
    "

  @createDomElementFactories: (list...) ->
    createObjectTreeFactories list, (nodeName, props, children) ->
      element = document.createElement nodeName
      for k, v of props
        switch k
          when "class" then element.className = v
          when "id" then element.id = v
          when "innerHTML" then element.innerHTML = v
          when "on"
            for eventType, eventListener of v
              element.addEventListener eventType, eventListener
          when "style"
            if isString v
              element.setAttribute k, v
            else
              {style} = element
              for styleKey, styleValue of v
                style[styleKey] = styleValue

          else element.setAttribute k, v
      for child in children
        child = document.createTextNode child if isString child
        unless child instanceof Node
          message = "DomElementFactory:#{nodeName}: Child is not a string or instance of Node. Child: #{child}"
          console.error message, child
          throw new Error message
        element.appendChild child
      element

  @getDevicePixelRatio: -> (self.devicePixelRatio? && self.devicePixelRatio) || 1
  @zIndex: ( target, setZIndex ) ->
    target = $$ target
    return target.style.zIndex = setZIndex if setZIndex != undefined

    elem = $$ target[0]
    while elem.length && elem[0] != document
      # Ignore z-index if position is set to a value where z-index is ignored by the browser
      # This makes behavior of this function consistent across browsers
      # WebKit always returns auto if the element is positioned
      switch elem.style.position
        when "absolute", "relative", "fixed"
          # IE returns 0 when zIndex is not specified
          # other browsers return a string
          # we ignore the case of nested elements with an explicit value of 0
          # <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
          value = parseInt elem.style.zIndex
          return value if !isNaN( value ) && value != 0
      elem = elem.parentNode

    0

  @domElementOffset: (elem) ->
    box = elem.getBoundingClientRect()

    body = document.body
    docEl = document.documentElement

    scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
    scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

    clientTop = docEl.clientTop || body.clientTop || 0
    clientLeft = docEl.clientLeft || body.clientLeft || 0

    top  = box.top +  scrollTop - clientTop
    left = box.left + scrollLeft - clientLeft

    top:  Math.round top
    left: Math.round left
