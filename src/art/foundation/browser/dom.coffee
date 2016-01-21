# https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input

{$$} = require "art-foundation/src/extlib/node_list" if self.window

module.exports = class Dom
  @createElementFromHtml: (html) ->
    div = document.createElement 'div'
    div.innerHTML = html
    div.firstChild

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
