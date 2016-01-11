define [
  './log'
  './hash'
], ({log}, {mergeInto}) ->

  ###
  TODO:
    BaseModule should be with BaseObject
    BaseObject should be renamed BaseClass

    Some of BaseObject's code should be shared with BaseModule via a common extended parent class.
      - getPrototypePropertyExtendedByInheritance

    BaseObject should maintain a list of all included modules:
      - should prevent including a module twice
      - should call each module's constructor from BaseObject's constructor
      -
  ###
  class BaseModule
    ###
    TODO: @_getters should work with inheritance. Right now, an inheriting class's @getter
    declarations will add to the top-mose inheriting from class with getters!
    ###
    @getter: (getters) -> @_getters = mergeInto @_getters, getters
    @setter: (setters) -> @_setters = mergeInto @_setters, setters

    ###
    this/@: the module
    IN:
      includedInto: the BaseObject-extending-class this module was included into
    ###
    @included: (includedInto) ->
      includedInto.getter @_getters if @_getters
      includedInto.setter @_setters if @_setters

