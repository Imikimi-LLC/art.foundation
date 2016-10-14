{
  defineModule
  isFunction
  fastBind
  log
} = require '../standard_lib'

defineModule module, ->
  (superClass) -> class InstanceFunctionBindingMixin extends superClass

    @getFunctionsToBindList: ->
      if @hasOwnProperty "_functionsToBindList"
        @_functionsToBindList
      else
        @_functionsToBindList = @getFunctionsToBindList()

    @getFunctionsToBindList: ->
      k for k, v of @prototype when k != "constructor" &&
        isFunction(v) &&
        @propertyIsConcrete(k) &&
        (!@nonBindingFunctions || k not in @nonBindingFunctions)

    getBoundFunctionList: -> @_boundFunctionList

    bindFunctionsToInstance: ->
      functionsToBindList = @class.getFunctionsToBindList()

      if @_boundFunctionList
        delete @[k] for k in @_boundFunctionList when k not in functionsToBindList

      {prototype} = @class
      for k in functionsToBindList
        @[k] = fastBind prototype[k], @

      @_boundFunctionList = functionsToBindList
