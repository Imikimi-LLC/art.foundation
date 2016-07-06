###
TODO: refactor so nothing in inspect/* uses BaseObject
Then, move into StandardLib.
###

module.exports = [
  [(require  "./inspector"), "shallowInspect inspectLean inspect"]
  formattedInspect: require './formatted_inspect'
  toInspectedObjects: require './to_inspected_objects'

]
