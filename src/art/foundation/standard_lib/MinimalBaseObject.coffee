{capitalize} = require './string_case'

module.exports = class MinimalBasObject

  propGetterName = (prop) -> "get" + capitalize prop

  @_addGetter: (prop, getter) ->
    @::[propGetterName prop] = getter
    Object.defineProperty @::, prop, get: getter, configurable: yes
    prop

  @getter: (map) ->
    @_addGetter prop, getter for prop, getter of map
    map
