StandardLib = require "../../../standard_lib" #foundation
BaseObject = require "../../base_object"
{escapeJavascriptString} = StandardLib

module.exports = class String extends BaseObject
  constructor: (clonedString) ->
    super
    @string = clonedString

  toString: -> escapeJavascriptString @string
