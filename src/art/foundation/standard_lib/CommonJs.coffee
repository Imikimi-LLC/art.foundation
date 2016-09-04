{isClass, isFunction} = require './types'

module.exports = class CommonJs
  definingModule = null
  @getModuleBeingDefined: -> definingModule

  ###
  IN:
    defineFunciton ||
  ###
  @defineModule: (_module, a) ->
    lastModule = definingModule
    definingModule = _module

    mod = if isFunction a
      if isClass a then a else a()
    else
      a

    _module.exports = mod?.createWithPostCreate?(mod) || mod
    definingModule = lastModule
