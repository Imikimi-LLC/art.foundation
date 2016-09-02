StandardLib = require '../standard_lib'
WebpackHotLoader = require './webpack_hot_loader'

{
  capitalize, decapitalize, log, extendClone
  isFunction, objectName, isPlainObject, functionName, isString
  Unique
  callStack
  Log
  inspectedObjectLiteral
  MinimalBaseObject
  getModuleBeingDefined
} = StandardLib

{nextUniqueObjectId} = Unique


module.exports = class BaseObject extends MinimalBaseObject
  @objectsCreated: 0
  @objectsCreatedByType: {}
  @resetStats: =>
    @objectsCreated = 0
    @objectsCreatedByType = {}

  # override to dynamically set a class's name (useful for programmatically generated classes)
  # NOTE: must use klass.getName() and not klass.name if you want to "see" dynamically assigned class-names
  @_name: null

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
          - propName does NOT start with "_"

  ###
  @imprintObject: imprintObject = (toObject, fromObject, preserveState = false) ->

    unless preserveState
      for k, v of toObject when !fromObject.hasOwnProperty k
        delete toObject[k]

    for k, fromValue of fromObject when fromObject.hasOwnProperty k
      if (
          !preserveState ||
          isFunction(fromValue) ||
          isFunction(toObject[k]) ||
          !k.match(/^_/) ||
          !toObject.hasOwnProperty k
        )
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
      {namespace, namespacePath, _name} = @
      oldConstructor = @::constructor

      imprintObject @, updatedKlass, true
      imprintObject @::, updatedKlass::, false

      @::constructor = oldConstructor
      @namespace = namespace
      @namespacePath = namespacePath
      @_name = _name

    @

  ###
  TODO: consolidated on one inspector system
  NOTE: "inspector" parameter is part of the old inspect system
    The purpose was to resolve recurson on recursive structures.
    But it ended up being ungainly most the time.
  ###
  @createWithPostCreate: (klass) ->
    createHotWithPostCreate null, klass

  ###
  IN:
    _module should be the CommonJS 'module'
    klass: class object which extends BaseObject

  liveClass:
    On the first load, liveClass gets set.
    Each subsequent hot-load UPDATES liveClass,
    but liveClass always points to the initially created class object.

  OUT: the result of the call to liveClass.postCreate()

  postCreate is passed:
    hotReloaded:            # true if this is anything but the initial load
    classModuleState:
      liveClass:            # the original liveClass
      hotUpdatedFromClass:  # the most recently hot-loaded class
      hotReloadVersion:     # number starting at 0 and incremented with each hot reload
    _module:                # the CommonJs module

  EFFECTS:
    The following two methods are invoked on liveClass:

      if hot-reloading
        liveClass.imprintFromClass klass

      # always:
      liveClass.postCreate hotReloaded, classModuleState, _module

  ###
  @createHotWithPostCreate: createHotWithPostCreate = (_module = getModuleBeingDefined(), klass) ->
    # if hot reloading is not supported:
    return klass unless klass?.postCreate
    return klass.postCreate(false, {}, _module) || klass unless _module?.hot

    # hot reloading supported:
    WebpackHotLoader.runHot _module, (moduleState) ->
      if classModuleState = moduleState[klass.getName()]
        # hot reloaded!
        {liveClass} = classModuleState
        hotReloaded = true

        classModuleState.hotReloadVersion++
        classModuleState.hotUpdatedFromClass = klass

        # set namespaceProps in case it uses them internally
        # NOTE: everyone else will access these props through liveClass, which is already correct
        liveClass.namespace._setChildNamespaceProps liveClass.getName(), klass

        klass._name = liveClass._name
        liveClass.imprintFromClass klass

        Log.log "Foundation.BaseObject: class hot-reload":
          class: liveClass.getNamespacePath()
          version: classModuleState.hotReloadVersion
      else
        # initial load
        hotReloaded = false

        klass._hotClassModuleState =
        moduleState[klass.getName()] = classModuleState =
          liveClass: liveClass = klass
          hotUpdatedFromClass: null
          hotReloadVersion: 0

      liveClass.postCreate
        hotReloadEnabled: true
        hotReloaded:      hotReloaded
        classModuleState: classModuleState
        module:           _module

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
  @getPrototypePropertyExtendedByInheritance: (propertyName, defaultStructure, _clone = extendClone) ->
    if @::hasOwnProperty propertyName
      @::[propertyName]
    else
      @::[propertyName] = _clone @__super__[propertyName] || defaultStructure


  ######################################################
  # Class Info
  ######################################################
  @getNamespacePath: ->
    if !@namespacePath
      # no namespacePath
      @namespacePath = "#{@getName()} extends #{@__super__.class.getNamespacePath()}"
    else if @__super__?.class.namespacePath == @namespacePath
      # namespacePath was inherited
      @namespacePath = "#{@getName()} extends #{@__super__.class.getNamespacePath()}"
    else
      @namespacePath

  # DEPRICATED - use NN stuff
  # @classGetter
  #   classPath:      -> @namespace.namespacePath
  #   classPathArray: -> @namespacePathArray ||= @getClassPath().split "."
  #   classPathName:  ->
  #     if p = @namespace?.namespacePath
  #       p + "." + @getClassName()
  #     else
  #       @getClassName()

  @getClassName: (klass = @) ->
    klass.getName?() || klass.name


  ######################################################
  # inspect
  ######################################################

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
    inspector.put @getNamespacePath()

  # Example 2:
  inspect: ->
    @getNamespacePath()
  ###
  @inspect: -> @getNamespacePath()

  inspect: -> "<#{@class.namespacePath}>"

  ###
  getInspectedObjects: -> plainObjects

  usually implemented this way:
  @getter inspectedObjects: -> plainObjects or objects which implement "inspect"

  TODO: I think I want to refactor inspectedObjects to ONLY return near-JSON-compatible objects:
    1. strings
    2. maps
    3. arrays

    Everything else should be rendered to a string. In general, strings should Eval to the object
    they represent:

      toInspectedObject(null):                    'null' # null becomes a string
      toInspectedObject(true):                    'true' # true becomes a string
      toInspectedObject(false):                   'false' # false becomes a string
      toInspectedObject(undefined):               'undefined' # undefined becomes a string
      toInspectedObject('hi'):                    '"hi"' # ESCAPED
      toInspectedObject((a) -> a):                'function(a){return a;}'
      toInspectedObject(rgbColor())               "rgbColor('#000000')"

    NOTE: inspectedObjects differs from plainObjects. The latter should be 100% JSON,
      and should return actual values where JSON allows, otherwise, return JSON data structures
      that encode the object's information in a human-readable format, ideally one that can be
      used as an input to the constructor of the object's class to recreate the original object.

      plainObjects:
        null:         null
        true:         true
        false:        false
        'str':        'str' # NOT escaped
        undefined:    null
        ((a) -> a):   'function(a){return a;}'
        rgbColor():   r: 0, g: 0, b: 0, a: 0

  You can provide this function for fine-grained control of what Inspector2 outputs and hence
  what DomConsole displays.

  If you would like for a string to appear without quotes, use:
    {inspect: -> 'your string without quotes here'}
  ###

  @getter
    inspectObjects: ->
      console.warn "inspectObjects/getInspectObjects is DEPRICATED. Use: inspectedObjects/getInspectedObjects"
      @getInspectedObjects()

    inspectedObjects: ->
      inspectedObjectLiteral "<#{@class.getNamespacePath()}>"

  @classGetter
    inspectedObjects: ->
      inspectedObjectLiteral @getNamespacePath()

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
    namespacePath:  -> @class.getNamespacePath()
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
