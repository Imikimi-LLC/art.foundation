# https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input

define [
  "./namespace"
  "../log"
  '../base_object'
  "extlib/jquery"
  "extlib/jquery.cookie"
  "../log"
], (Browser, Log, BaseObject, $) ->
  {log} = Log

  $.cookie.json = true

  # see https://github.com/carhartl/jquery-cookie
  class Browser.Cookie extends BaseObject
    @set: (name, value, options) -> $.cookie name, value, options
    @get: (name)                 -> $.cookie name
    @remove: (name, options)     -> $.removeCookie name, options
    @classGetter
      all: -> $.cookie()
      json: -> $.cookie.json
      raw: -> $.cookie.raw

    @classSetter
      json: (v)-> $.cookie.json = v
      raw: (v)-> $.cookie.raw = v
