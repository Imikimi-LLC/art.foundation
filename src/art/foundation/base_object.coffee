define [
  './call_stack'
  './log'
  './types'
  './neptune_coffee'
  './unique'
  './string'
  './shallow_clone'
], (CallStack, Log, Types, NeptuneCoffee, Unique, String, ShallowClone) ->
  {capitalize, decapitalize} = String
  {log} = Log
  {callStack} = CallStack
  {extendClone} = ShallowClone
  {isFunction, objectName, isPlainObject, functionName} = Types
  {nextUniqueObjectId} = Unique

  class BaseObject
    @objectsCreated: 0
    @objectsCreatedByType: {}
    @resetStats: =>
      @objectsCreated = 0
      @objectsCreatedByType = {}

    @createWithPostCreate: (klass) -> klass?.postCreate() || klass
    @postCreate: -> @

    @mixInto = mixInto = (intoClass, klass, keys...)->
      if keys.length == 0
        keys = Object.keys klass
      for k in keys
        v = klass[k]
        console.error "Foundation.mixInto - mix #{klass.name} into #{intoClass.name}: #{k} already exists." if intoClass[k]
        intoClass[k] = v
      intoClass

    @createAllClass = (namespace, args...)->
      for arg in args
        if arg.prototype instanceof BaseObject
          console.error "createAllClass arguments cannot be subclasses of BaseObject: #{namespace.name}:#{arg.name}"
        mixInto namespace, arg
      class All extends namespace

    constructor: ->
      @__uniqueId = null
      # Object.defineProperty @, "__uniqueId",
      #   enumerable: false
      #   value: null
      # Neptune.Lib.Art.DevTools.Profiler.sample && Neptune.Lib.Art.DevTools.Profiler.sample()
      # type = @classPathName
      # BaseObject.objectsCreatedByType[type] = (BaseObject.objectsCreatedByType[type]||0) + 1
      # BaseObject.objectsCreated++

    # True if object implementsInterface all methods (an array of strings)
    # (i.e. the named properties are all functions)
    @implementsInterface: (object, methods) ->
      for method in methods
        return false unless typeof object[method] is "function"
      true

    #####################################
    # Module-like features (mixins)
    #####################################
    ###
    mix-in class methods
    Define getters/setters example:
      class MyMixin
        included: ->
          @getter foo: -> @_foo
          @setter foo: (v) -> @_foo = v

    NOTE! This will NOT include any properties you defined with getter or setter!
    NOTE! This only copies over values if there aren't already values in the included-into class
      This somewhat mirrors Ruby's include where the included-into-class's methods take precidence.
      However, if you include two modules in a row, the first module gets priority here.
      In ruby the second module gets priority (I believe).
    ###
    @include: (obj) ->
      for key, value of obj when key != 'included'
        @[key] = value unless @[key]

      for key, value of obj.prototype when key
        @::[key] = value unless @::[key]

      obj.included? @
      this

    # Allows you to define properties on the prototype that inherit their data from
    # their super-classes prototype.
    # NOTE: Object properties actually create a parallel inheritance structure such that
    #   later-changes on the super-object are reflected in the inheriting object.
    # NOTE: Array properties inherit the values in the super-class array at declaration time,
    #   but they are not updated with any later-changes.
    #   If we ever need that functionality, we'll need to make a special Object-type
    #   that extendClone recognizes that handles the logic of "ExtendableArray".
    @getPrototypePropertyExtendedByInheritance: (propertyName, defaultStructure) ->
      if @::hasOwnProperty propertyName
        @::[propertyName]
      else
        @::[propertyName] = extendClone @__super__[propertyName] || defaultStructure

    #####################################
    # Properties, Getters and Setters
    #####################################
    @_propInternalName: propInternalName = (prop) -> "_#{prop}"
    @_propGetterName: propGetterName = (prop) -> "get" + capitalize prop
    @_propSetterName: propSetterName = (prop) -> "set" + capitalize prop

    # defines "o.getFoo() as well as "o.foo" since getFoo is 100x faster on Safari 7 (OSX & iOS)
    # use o.getFoo() wherever speed is a concern
    @_addGetter: addGetter = (obj, prop, getter) ->
      obj[propGetterName prop] = getter
      Object.defineProperty obj, prop, {get: getter, configurable: yes}
      prop

    @_addGetters: addGetters = (obj, a, b) ->
      if isPlainObject map = a
        addGetter obj, prop, getter for prop, getter of map
        map
      else
        addGetter obj, a, b

    # we define "o.setFoo(v) as well as "o.foo = v" since setFoo is 100x faster on Safari 7 (OSX & iOS)
    # use o.setFoo(v) wherever speed is a concern
    @_addSetter: addSetter = (obj, prop, setter) ->
      obj[propSetterName prop] = setter
      Object.defineProperty obj, prop, {set: setter, configurable: yes}
      prop

    @_addSetters: addSetters = (obj, a, b) ->
      if isPlainObject map = a
        addSetter obj, prop, setter for prop, setter of map
        map
      else
        addSetter obj, a, b

    # If the property is null or undefined:
    #   If initialier is not a function, the property is set to intializer before its value is returned
    #   If initialier is a function, it is invoke to initialize the property.
    @_defProperty: defProperty = (obj, prop, defineGetter, defineSetter, initializer) ->
      propName = propInternalName prop

      if defineGetter
        addGetter obj, prop, obj[propGetterName prop] = if isFunction initializer
            -> if @[propName]? then @[propName] else @[propName] = initializer()
          else if initializer
            -> if @[propName]? then @[propName] else @[propName] = initializer
          else
            -> @[propName]

      if defineSetter
        addSetter obj, prop, (v) -> @[propName] = v

    @_defProperties: defProperties = (obj, props, defineGetter, defineSetter) ->
      for prop in props
        if isPlainObject propMap = prop
          for prop, initializer of propMap
            defProperty obj, prop, defineGetter, defineSetter, initializer
        else
          defProperty obj, prop, defineGetter, defineSetter, null

    # props is a list of strings or objects
    #  * strings are just the names of the properties
    #  * objects map from prop names to initializers
    @property:   (props...) -> defProperties @::, props, true, true
    @propGetter: (props...) -> defProperties @::, props, true, false
    @propSetter: (props...) -> defProperties @::, props, false, true

    # 2 signatures for @getter and @setter declarations:
    #   (map from props to getter/setter functions) -> # => map
    #   (property, getter/setter function) -> # => property
    @getter: (a, b) -> addGetters @::, a, b
    @setter: (a, b) -> addSetters @::, a, b

    # NOTE: parts of classGetters and classSetters are NOT inherited with CoffeeScript-style inheritance
    #   NOT INHERITED: obj.prop & obj.prop=
    #   INHERITED:     setProp and getProp
    @classGetter: (a, b) -> addGetters @, a, b
    @classSetter: (a, b) -> addSetters @, a, b
    @classProperty:   (props...) -> defProperties @::, props, true, true
    @classPropGetter: (props...) -> defProperties @::, props, true, false
    @classPropSetter: (props...) -> defProperties @::, props, false, true

    ######################################################
    # Class Info
    #
    # NOTE: These are only valid if, at some point, the defining
    #   file's parent NeptuneCoffee module file was loaded.
    ######################################################
    @classGetter
      classPath:      -> NeptuneCoffee.classPathArray @
      classPathArray: -> NeptuneCoffee.classPath @
      classPathName:  -> NeptuneCoffee.classPathName @
      className: -> @prototype.constructor.name

    ######################################################
    # Class Methods
    ######################################################

    ###
    creates the classGetter "singleton" which returns a single instance of the current class.

    IN: args are passed to the singleton constructor
    OUT: null

    The singleton instance is created on demand the first time it is accessed.
    ###
    @singletonClass: (args...) ->
      map =
        singleton: => @_singleton ||= new @ args...
      map[decapitalize functionName @] = => @getSingleton()
      @classGetter map
      null

    ######################################################
    # Instance Methods
    ######################################################

    @getter
      className: -> @class.name
      class: -> @constructor
      keys: -> Object.keys @
      classPathArray: -> NeptuneCoffee.classPathArray @
      classPath: -> NeptuneCoffee.classPath @
      classPathName: -> NeptuneCoffee.classPathName @
      classPathNameAndId: -> "#{@classPathName}:#{@objectId}"
      uniqueId: -> @__uniqueId ||= nextUniqueObjectId() # unique across all things
      objectId: -> @__uniqueId ||= nextUniqueObjectId() # number unique across objects

    # the "F" versions of these methods are provided so if you don't know if you
    # have the Class or an Instance you can still use the same API.
    # The getter methods are still provided for Instances since they are the RIGHT API. It's just
    # Not possible to do that API on classes the way CoffeeScript inheritance works.
    classPathArrayF: -> NeptuneCoffee.classPathArray @
    classPathF: -> NeptuneCoffee.classPath @
    classPathNameF: -> NeptuneCoffee.classPathName @

    implementsInterface: (methods) -> Function.BaseObject.implementsInterface @, methods
    tap: (f)-> f(@);@

    ######################################################
    # log
    ######################################################
    @rawLog: -> Log.rawLog arguments...
    @log: ->
      stack = callStack()
      toLog = if arguments.length > 1
        a for a in arguments
      else arguments[0]
      Log.logCore toLog, stack, @className
      arguments[arguments.length-1]

    log: @log
    rawLog: @rawLog
