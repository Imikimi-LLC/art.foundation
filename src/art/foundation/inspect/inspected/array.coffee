define [
  './namespace'
  '../../base_object'
], (Inspected, BaseObject) ->
  class Inspected.Array extends BaseObject
    constructor: (inspectedArray) ->
      super
      @array = inspectedArray

    @getter
      arrayOfStrings: -> v.toString() for v in @array
      children: -> @array.slice()

    delimitedString: (delimiter = ", ") -> @arrayOfStrings.join(", ")

    toString: -> "[#{@delimitedString()}]"
