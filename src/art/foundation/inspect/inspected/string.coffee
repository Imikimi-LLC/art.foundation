define [
  "./namespace" #inspected
  "../../base_object"
  "../../namespace" #foundation
  "../../string"
], (Inspected, BaseObject, Foundation) ->
  class Inspected.String extends BaseObject
    constructor: (clonedString) ->
      super
      @string = clonedString

    toString: -> Foundation.String.escapeJavascriptString @string
