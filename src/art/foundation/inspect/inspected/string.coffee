BaseObject = require "../../base_object"
Foundation = require "../../namespace" #foundation
module.exports = class String extends BaseObject
  constructor: (clonedString) ->
    super
    @string = clonedString

  toString: -> Foundation.String.escapeJavascriptString @string
