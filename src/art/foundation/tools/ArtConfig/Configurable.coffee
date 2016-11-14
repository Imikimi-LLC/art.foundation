{
  defineModule
  log
  merge
  isPlainObject
  mergeInto
} = require '../../standard_lib'
{BaseObject} = require '../../class_system'

ConfigRegistry = require './ConfigRegistry'

#####################################
###

TO USE:
1) Inherit from Configurable and
2) OPTIONAL: call @defaults to set configuration defaults
3) OPTIONAL, override one of:
  @configure
  @preprocessConfig
  @configured

###
#####################################

defineModule module, class Configurable extends BaseObject
  @abstractClass()

  # call this to initialize default values for your config
  @defaults: (@defaultConfig) ->

  # reset @config
  # NOTE: the goal is leave all direct references to @config intact; just update the props.
  @reset: ->
    if @config
      delete @config[k] for k, v of @config
    else
      @config = {}
    mergeInto @config, @defaultConfig if @defaultConfig
    @config

  #####################################
  # OVERRIDES
  #####################################

  # called just before config is passed to configure
  # IMPORTANT: should not alter config; return a new object
  @preprocessConfig: (config) ->
    preprocessedConfig = merge @getPathedConfiguration config

    # apply shared props
    for k, v of config when !isPlainObject(v) && !preprocessedConfig.hasOwnProperty k
      preprocessedConfig[k] = v

    preprocessedConfig

  # updates config
  @configure: (config) ->
    mergeInto @reset(), @preprocessConfig config
    @configured()

  # called after @config has been updated
  @configured: ->

  #####################################
  # HELPERS
  #####################################

  @getConfigurationPath: ->
    [_Neptune, path..., _Configurable] = @getNamespacePath().split '.'
    path

  @getPathedConfiguration: (globalConfig) ->
    globalConfig = globalConfig?[el] for el in @getConfigurationPath()
    globalConfig

  #####################################
  # PRIVATE
  #####################################
  @_register: ->
    @reset()
    ConfigRegistry.registerConfigurable @

  @postCreateConcreteClass: ({hotReloaded}) ->
    if hotReloaded
      ConfigRegistry.reload()
    else
      # only register once
      @_register()
    super
