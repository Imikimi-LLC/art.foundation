{BaseObject} = require "art.foundation"

module.exports = class HotLoader extends BaseObject
  @singletonClass()

  @runHot: (m, f) => @singleton.runHot m, f
  @getModuleState: => @singleton._modulePersistantState

  constructor: ->
    @_modulePersistantState = null

  runHot: (_module, f) ->
    if _module.hot
      @_modulePersistantState = (_module.hot.data ||= modulePersistantState: {}).modulePersistantState

      _module.hot.accept()
      _module.hot.dispose (data)->

        data.modulePersistantState = _module.hot.data.modulePersistantState

    res = f()

    @_modulePersistantState = null

    res
