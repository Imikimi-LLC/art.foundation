{
  defineModule
  isFunction
  fastBind
} = require '../standard_lib'

defineModule module, class InstanceFunctionBindingMixin

  @getFunctionsToBindList: ->
    if @hasOwnProperty "_functionsToBindList"
      @_functionsToBindList
    else
      @_functionsToBindList = @getFunctionsToBindList()

  @getFunctionsToBindList: ->
    prototype = @::
    k for k, v of prototype when k != "constructor" &&
      isFunction(v) &&
      prototype.hasOwnProperty(k) &&
      (!@nonBindingFunctions || k not in @nonBindingFunctions)

  getBoundFunctionList: -> @_boundFunctionList

  bindFunctionsToInstance: ->
    functionsToBindList = @class.getFunctionsToBindList()

    if @_boundFunctionList
      delete @[k] for k in @_boundFunctionList when k not in functionsToBindList

    for k in functionsToBindList
      @[k] = fastBind @class.prototype[k], @

    @_boundFunctionList = functionsToBindList
