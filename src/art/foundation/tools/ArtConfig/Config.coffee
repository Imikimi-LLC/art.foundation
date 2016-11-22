{
  defineModule
  log
  newObjectFromEach
  merge
} = require '../../StandardLib'
{BaseObject} = require '../../ClassSystem'

ConfigRegistry = require './ConfigRegistry'

defineModule module, class Config extends BaseObject
  @abstractClass()

  @register: -> ConfigRegistry.registerConfig @getName(), @getProps()

  @postCreateConcreteClass: ({hotReloaded}) ->
    @register()
    ConfigRegistry.reload() if hotReloaded
    super

  @getProps: ->
    @getConcretePrototypeProperties()
