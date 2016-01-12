# https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input

Browser = require    "./namespace"
{log} = require      "../log"
BaseObject = require '../base_object'
$ = require          "jquery"
require "jquery.cookie"

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
