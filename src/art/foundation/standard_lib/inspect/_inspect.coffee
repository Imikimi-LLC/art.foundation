###
TODO: refactor so nothing in inspect/* uses BaseObject
Then, move into StandardLib.
###

module.exports = [
  [(require  "./inspector"), "shallowInspect inspectLean inspect"]
  require './formatted_inspect'
  require './to_inspected_objects'
  require './to_plain_objects'
  require './inspected_object_literal'
]
