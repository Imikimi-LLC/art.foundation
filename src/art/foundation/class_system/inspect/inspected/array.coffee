BaseObject = require '../../base_object'

module.exports = class Array extends BaseObject
  constructor: (inspectedArray) ->
    super
    @array = inspectedArray

  @getter
    arrayOfStrings: -> v.toString() for v in @array
    children: -> @array.slice()

  delimitedString: (delimiter = ", ") -> @arrayOfStrings.join(", ")

  toString: -> "[#{@delimitedString()}]"
