StandardLib = require '../../standard_lib'
{compare} = StandardLib

module.exports = class InspectedObjectLiteral
  @inspectedObjectLiteral: (literal) -> new InspectedObjectLiteral literal
  constructor: (@literal) ->
  getInspectedObjects: -> @
  inspect: -> @literal
  compare: (b) -> compare @literal, b.literal
