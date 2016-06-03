StandardLib = require '../standard_lib'
WebpackHotLoader = require './webpack_hot_loader'
{callStack} = require './call_stack'
Log = require './log'

{
  capitalize, decapitalize, log, extendClone
  isFunction, objectName, isPlainObject, functionName, isString
  Unique
} = StandardLib

{nextUniqueObjectId} = Unique


module.exports = class BaseObject
  @objectsCreated: 0
  @objectsCreatedByType: {}
  @resetStats: =>
    @objectsCreated = 0
    @objectsCreatedByType = {}

  ###
  NOTE: only hasOwnProperties are considered! Inherited properties are not touched.
  IN:
    toObject:   object will be altered to be an "imprint" of fromObject
    fromObject: object pattern used to imprint toObject
    preserveState:
      false:
        toObject has every property updated to exactly match fromObject

        This includes:
          1. delete properties in toObject that are not in fromObject
          2. add every property in fromObject but not in toObject
          3. overwriting every property in toObject also in fromObject

      true:
        Attempts to preserve the state of toObject while updating its functionality.
        This means properties which are functions in either object are updated.

        WARNING: This is a grey area for JavaScript. It is not entirely clear what is
          state and what is 'functionality'. I, SBD, have made the following heuristic decisions:

        Imprint actions taken when preserving State:

        1. DO NOTHING to properties in toObject that are not in fromObject
        2. add every property in fromObject but not in toObject
        3. properties in toObject that are also in fromObject are updated
          if one of the following are true:
          - isFunction fromObject[propName]
          - isFunction toObject[propName]
          - !toObject.hasOwnProperty propName
  ###
  @imprintObject: imprintObject = (toObject, fromObject, preserveState = false) ->

    unless preserveState
      for k, v of toObject when !fromObject.hasOwnProperty k
        delete toObject[k]

    for k, fromValue of fromObject when fromObject.hasOwnProperty k
      if !preserveState || isFunction(fromValue) || isFunction(toObject[k]) || !toObject.hasOwnProperty k
        toObject[k] = fromValue

    fromObject

  ###
  imprints both the class and its prototype.

  preserved in spite of imprintObject's rules:
    @namespace
    @::constructor
  ###
  @imprintFromClass: (updatedKlass) ->
    unless updatedKlass == @
      oldNamespace = @namespace
      oldConstructor = @::constructor

      imprintObject @, updatedKlass, true
      imprintObject @::, updatedKlass::, false

      @::constructor = oldConstructor
      @namespace = oldNamespace
    @

  @inspect: -> @getClassPathName()

  ###
  inspect: ->
  IN: ()
  OUT: string

  Can override with same or alternate, recursion-block-supported signature:
    IN: (inspector) ->
    OUT: if inspector then null else string

    To handle the case where the inspector is not set, we
    recommneded declaring your 'inspect' as follows:
      inspect: (inspector) ->
        return Foundation.inspect @ unless inspector
        # ...
        # custom code which writes all output to inspector.put
        # and uses inspector.inspect for inspecting sub-objects
        # ...
        null

    EFFECT:
      call inspector.put one or multiple times with strings to add to the inspected output
      call inspector.inspect foo to sub-inspect other objects WITH RECURSION BLOCK

  # Example 1:
  inspect: (inspector) ->
    return Foundation.inspect @ unless inspector
    inspector.put @getClassPathName()

  # Example 2:
  inspect: ->
    @getClassPathName()
  ###

  ###
  getInspectObjects: -> plainObjects

  usually implemented this way:
  @getter inspectObjects: -> plainObjects or objects which implement "inspect"

  You can provide this function for fine-grained control of what Inspector2 outputs and hence
  what DomConsole displays.

  If you would like for a string to appear without quotes, use:
    {inspect: -> 'your string without quotes here'}
  ###


  # @name is not settable, so we have @_name as an override for use with dynamically generated classes
  @getName: ->
    @_name || @name

  ###
  TODO: consolidated on one inspector system
  NOTE: "inspector" parameter is part of the old inspect system
    The purpose was to resolve recurson on recursive structures.
    But it ended up being ungainly most the time.
  ###
  @createWithPostCreate: (klass) -> klass?.postCreate() || klass

  ###
  IN:
    _module should be the CommonJS 'module'
    klass: class object which extends BaseObject

  OUT: liveClass.postCreate(
    hotReloaded
    classModuleState: {liveClass, hotUpdatedFromClass}
    _module
  )

  EFFECTS:
    liveClass.imprintFromClass newKlass
    liveClass.postCreate hotReloaded, classModuleState, hotUpdatedFromClass, _module

  ###
  @createHotWithPostCreate: (_module, hotUpdatedFromClass) ->
    WebpackHotLoader.runHot _module, (moduleState) ->
      classModuleState = moduleState[hotUpdatedFromClass.getName()] ||=
        liveClass: null
        hotUpdatedFromClass: null
        hotReloadVersion: 0
      classModuleState.hotReloadVersion++
      liveClass = classModuleState.liveClass ||= hotUpdatedFromClass
      classModuleState.hotUpdatedFromClass = hotUpdatedFromClass

      hotReloaded = liveClass != hotUpdatedFromClass
      hotReloaded && Log.log "Foundation.BaseObject: subClass hot-reload":
        subClass: liveClass.getClassPathName()
        version: classModuleState.hotReloadVersion

      liveClass.imprintFromClass hotUpdatedFromClass
      liveClass.postCreate(
        hotReloaded
        classModuleState
        _module
      )

  ###
  called every load
  IN:
    NOTE: hot-loading inputs are only set if this class created as follows:
      createHotWithPostCreate module, class Foo extends BaseObject

    hotReload: true/false
      true if this class was hot-reloaded

    classModuleState:
      liveClass:            the first-loaded version of the class.
                            This is the official version of the class at all times.
                            The hot-reloaded version of the class is "imprinted" onto the liveClass
                            but otherwise is not used (but can be accessed via classModuleState.hotUpdatedFromClass)
      hotUpdatedFromClass:  The most recently loaded version of the class.
      hotReloadVersion:     number, starting at 1, and counting up each load

      classModuleState is a plain-object specific to the class and its CommonJS module. If there is
      more than one hot-loaded class in the same module, each will have its own classModuleState.

      SBD NOTE: Though we could allow clients to add fields to classModuleState, I think it works
      just as well, and is cleaner, if any state is stored in the actual class objects and
      persisted via postCreate.

    hotUpdatedFromClass: the newly loaded class object

    _module: the CommonJs module object.

  ###
  @postCreate: (hotReloaded, classModuleState, _module) -> @

  excludedKeys = ["__super__", "namespace", "namespacePath"].concat Object.keys Neptune.Base
  @mixInto = mixInto = (intoClass, klass, keys...)->
    if keys.length == 0
      keys = Object.keys klass
    for k in keys when k not in excludedKeys
      v = klass[k]
      console.error "Foundation.mixInto - mix #{getClassName(klass)} into #{getClassName(intoClass)}: #{k} already exists." if intoClass[k]
      intoClass[k] = v
    intoClass

  @createAllClass = (namespace, args...)->
    for arg in args
      if arg.prototype instanceof BaseObject
        console.error "createAllClass arguments cannot be subclasses of BaseObject: #{getClassName(namespace)}:#{getClassName(arg)}"
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
  @propInternalName: propInternalName = (prop) -> "_#{prop}"
  @_propInternalName: propInternalName
  @_propGetterName: propGetterName = (prop) -> "get" + capitalize prop
  @_propSetterName: propSetterName = (prop) -> "set" + capitalize prop

  # defines "o.getFoo() as well as "o.foo" since getFoo is 100x faster on Safari 7 (OSX & iOS)
  # use o.getFoo() wherever speed is a concern
  @_addGetter: addGetter = (obj, prop, getter) ->
    obj[propGetterName prop] = getter
    Object.defineProperty obj, prop, {get: getter, configurable: yes}
    prop

  @_addGetters: addGetters = (obj, map) ->
    addGetter obj, prop, getter for prop, getter of map
    map

  # we define "o.setFoo(v) as well as "o.foo = v" since setFoo is 100x faster on Safari 7 (OSX & iOS)
  # use o.setFoo(v) wherever speed is a concern
  @_addSetter: addSetter = (obj, prop, setter) ->
    obj[propSetterName prop] = setter
    Object.defineProperty obj, prop, {set: setter, configurable: yes}
    prop

  @_addSetters: addSetters = (obj, map) ->
    addSetter obj, prop, setter for prop, setter of map
    map

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
  @propGetter: (props...) -> console.error("DEPRICATED: propGetter. Use @getter");defProperties @::, props, true, false
  @propSetter: (props...) -> console.error("DEPRICATED: propSetter. Use @setter");defProperties @::, props, false, true

  @_propListStringToArray: (propList) ->
    propList.match /[_a-z][_a-z0-9]*/gi

  @_getterSetterHelper: (isGetter, args, obj = @::) ->
    for arg in args
      if isPlainObject arg
        if isGetter
          addGetters obj, arg
        else
          addSetters obj, arg
      else if isString arg
        defProperties obj, @_propListStringToArray(arg), isGetter, !isGetter
      else
        throw new Error "invalid value. Expected string or plain-object:", arg

  # 2 signatures for @getter and @setter declarations:
  #   (map from props to getter/setter functions) -> # => map
  #   (property, getter/setter function) -> # => property
  @getter: -> @_getterSetterHelper true, arguments
  @setter: -> @_getterSetterHelper false, arguments

  # NOTE: parts of classGetters and classSetters are NOT inherited with CoffeeScript-style inheritance
  #   NOT INHERITED: obj.prop & obj.prop=
  #   INHERITED:     setProp and getProp
  @classGetter: -> @_getterSetterHelper true, arguments, @
  @classSetter: -> @_getterSetterHelper false, arguments, @
  @classProperty:   (props...) -> defProperties @::, props, true, true
  @classPropGetter: (props...) -> console.error("DEPRICATED: classPropGetter. Use @classGetter");defProperties @::, props, true, false
  @classPropGetter: (props...) -> console.error("DEPRICATED: classPropGetter. Use @classSetter");defProperties @::, props, false, true

  ######################################################
  # Class Info
  ######################################################
  @classGetter
    classPath:      -> @namespace.namespacePath
    classPathArray: -> @namespacePathArray ||= @getClassPath().split "."
    classPathName:  ->
      if p = @namespace?.namespacePath
        p + "." + @getClassName()
      else
        @getClassName()

  @getClassName: (klass = @) ->
    klass.getName?() || klass.name

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
    # return if @hasOwnProperty("getSingleton") && isFunction @getSingleton
    map = singleton: ->
      if @_singleton?.class == @
        @_singleton
      else
        @_singleton = new @ args...
    map[decapitalize functionName @] = -> @getSingleton()
    @classGetter map
    null

  ######################################################
  # Instance Methods
  ######################################################

  @getter
    className: -> @class.getClassName()
    class: -> @constructor
    keys: -> Object.keys @
    classPathArray: -> @class.getClassPathArray()
    classPath:      -> @class.getClassPath()
    classPathName:  -> @class.getClassPathName()
    classPathNameAndId: -> "#{@classPathName}:#{@objectId}"
    uniqueId: -> @__uniqueId ||= nextUniqueObjectId() # unique across all things
    objectId: -> @__uniqueId ||= nextUniqueObjectId() # number unique across objects

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
