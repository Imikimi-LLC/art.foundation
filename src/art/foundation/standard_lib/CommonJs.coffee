{isClass} = require './types'

module.exports = class CommonJs
  definingModule = null
  @getModuleBeingDefined: -> definingModule

  @defineModule: (_module, defineFunction) ->
    lastModule = definingModule
    definingModule = _module
    mod = if isClass defineFunction then defineFunction else defineFunction()
    console.log "defineModule mod: #{mod?.getName?() || mod}, #{mod?.createWithPostCreate}"
    _module.exports = mod?.createWithPostCreate?(mod) || mod
    definingModule = lastModule
