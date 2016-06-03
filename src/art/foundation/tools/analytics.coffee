StandardLib = require '../standard_lib'
ClassSystem = require '../class_system'
{BaseObject} = ClassSystem
{inspectLean} = StandardLib

class Analytics extends BaseObject
  @defaultCategory: "Foundation.Analytics"
  @event: (options={})->
    category = options.category || @defaultCategory
    action = options.action
    label = options.label
    value = options.value
    noninteraction = !!options.noninteraction
    if self._gaq
      self._gaq.push ['_trackEvent', category, action, label, value, noninteraction]
      @rawLog "ANALYTICS-EVENT: #{inspectLean options}"
    else
      @rawLog "(no)ANALYTICS-EVENT: #{inspectLean options}"
