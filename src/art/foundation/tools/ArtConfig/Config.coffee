{
  defineModule
  log
} = require '../../standard_lib'
{BaseObject} = require '../../class_system'

ConfigRegistry = require './ConfigRegistry'

defineModule module, class Config extends BaseObject
  @abstractClass()

  @register: -> ConfigRegistry.registerConfig @getName(), @_props || {}

  @postCreateConcreteClass: ({hotReloaded}) ->
    @register()
    ConfigRegistry.reload() if hotReloaded
    super

  # use this to define your config props
  @props: (@_props) ->