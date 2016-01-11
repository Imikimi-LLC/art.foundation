# https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input

define [
  "extlib/jquery"
  "./namespace"
], ($, Browser) ->

  class Browser.Dom
    @getDevicePixelRatio: -> (self.devicePixelRatio? && self.devicePixelRatio) || 1
    @zIndex: ( target, setZIndex ) ->
      target = $ target
      return target.css "zIndex", setZIndex if setZIndex != undefined

      elem = $ target[0]
      while elem.length && elem[0] != document
        # Ignore z-index if position is set to a value where z-index is ignored by the browser
        # This makes behavior of this function consistent across browsers
        # WebKit always returns auto if the element is positioned
        switch elem.css "position"
          when "absolute", "relative", "fixed"
            # IE returns 0 when zIndex is not specified
            # other browsers return a string
            # we ignore the case of nested elements with an explicit value of 0
            # <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
            value = parseInt elem.css "zIndex"
            return value if !isNaN( value ) && value != 0
        elem = elem.parent()

      0
