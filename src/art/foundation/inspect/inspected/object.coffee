define [
  './namespace'
  '../../base_object'
], (Inspected, BaseObject) ->
  class Inspected.Object extends BaseObject
    constructor: (@properties, @instanceOf, @originalObject) ->
      super
      @length = if @properties then self.Object.keys(@properties).length else 0

    @getter
      arrayOfStrings: -> "#{k}: #{v}" for k, v of @properties
      children: ->
        ret = {}
        ret[k] = v for k, v of @properties
        ret

    delimitedString: (delimiter = ", ") -> @arrayOfStrings.join(", ")

    toString: ->
      if @inspected
        @inspected
      else if @instanceOf
        "{#{@instanceOf} #{@delimitedString()}}"
      else
        "{#{@delimitedString()}}"
