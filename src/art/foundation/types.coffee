define [], ->

  ###
  Maybe we should just the API for array compatibility rather than specific types.
    typeof obj == "object" &&
      && isFunction obj.forEach
      && isFunction obj.indexOf
      && isNumber obj.length
  ###
  isArray = if self.Uint8ClampedArray
    (obj) -> !!obj && (
      obj.constructor == Array ||
      obj instanceof Uint8ClampedArray ||
      obj instanceof Int8Array     ||
      obj instanceof Uint8Array    ||
      obj instanceof Int16Array    ||
      obj instanceof Uint16Array   ||
      obj instanceof Int32Array    ||
      obj instanceof Uint32Array   ||
      obj instanceof Float32Array  ||
      obj instanceof Float64Array
    )
  else
    # IE 11 compatible
    (obj) -> !!obj && (
      obj.constructor == Array ||
      # obj instanceof Uint8ClampedArray ||
      obj instanceof Int8Array     ||
      obj instanceof Uint8Array    ||
      obj instanceof Int16Array    ||
      obj instanceof Uint16Array   ||
      obj instanceof Int32Array    ||
      obj instanceof Uint32Array   ||
      obj instanceof Float32Array  ||
      obj instanceof Float64Array
    )

  class Types
    @isRegExp: (obj) => obj instanceof RegExp
    @isNumber: (obj) => typeof obj == "number"

    # tests for all built-in array-like types
    @isArray: isArray
    @isDate: (obj) => obj && obj.constructor == Date
    @isString: isString = (obj) => typeof obj == "string"
    @isFunction: isFunction = (obj) => typeof obj == "function"
    @isEmptyObject: (obj) => Object.keys(obj).length == 0
    @isClass: isClass = (obj) =>
      !! (
        typeof obj is "function" && (
          # any CoffeeScript class which inherits from another has __super__
          (typeof obj.__super__ is "object") ||
          # We can't detect CoffeeScript classes which don't inherit since they are just Functions
          (obj.prototype && hasKeys obj.prototype)
        )
      )


    ###
    like RubyOnRails#present:
      "An object is present if it's not blank."

    Examples:
      "", undefined, null => false
      0 => true

    If 'obj' has method: obj.present() => !!obj.present()
    ###
    @present: (obj) ->
      if isFunction obj?.present
        !!obj.present()
      else
        obj != "" && obj != undefined && obj != null

    @isObject: isObject = (obj) =>
      !!obj && typeof obj == "object" && !isArray obj

    @functionName: functionName = (f) ->
      (f.name || ((matched = "#{f}".match(/function ([a-zA-Z]+)\(/)) && matched[1]) || "function")

    @objectName: objectName = (obj) ->
      if !obj then "" + obj
      else if a = obj.getClassPathName?() then a
      else if a = obj.classPathName then a
      else if obj.constructor == Object then "Object"
      else if isFunction obj then functionName obj
      else if isString(name = obj.constructor?.name) && name.length > 0 then name
      else if obj instanceof Object then "(anonymous instanceof Object)"
      else "(objectName unknown)"

    @isBrowserObject: (obj) =>
      return false unless @isObject obj
      name = @objectName obj
      name.slice(0,4)=="HTML" || name.slice(0,22) == "CanvasRenderingContext"

    ######################
    # Plain Data
    ######################

    @isPlainArray:  isPlainArray  = (v) -> if v then v.constructor == Array  else false
    @isPlainObject: isPlainObject = (v) -> if v then v.constructor == Object else false

    @hasKeys: hasKeys = (o) ->
      return true for k of o
      false

    @deepEach: deepEach = (v, f) ->
      if isPlainArray v
        deepEach subV, f for subV in v
      else if isPlainObject v
        deepEach subV, f for k, subV of v
      else
        f v
      v

    ###
    only creates a new array if the children changed
    ###
    deepMapArray = (array, mapper, options) ->
      res = null
      for v, i in array
        r = deepMap v, mapper, options
        if r!=v
          res ||= array.slice()
          res[i] = r
      res || array

    cloneObjectUpToKey = (obj, k) ->
      res = {}
      for k2, v of obj
        break if k2 == k
        res[k2] = v
      res

    deepMapObject = (obj, mapper, options) ->
      res = null
      for k, v of obj
        r = deepMap v, mapper, options
        if r!=v || res
          res ||= cloneObjectUpToKey obj, k
          res[k] = r
      res || obj

    ###
    Applies "f" to every -value- in a nested structure of plain arrays and objects.
    Pure functional efficient:
      If an array or object, and all its sub values, didn't change, the original array/object is reused.
    ###
    noopMapper = (v) -> v

    @deepMap: deepMap = (v, mapper, options) ->
      arrayMapper  = options?.arrays  || noopMapper
      objectMapper = options?.objects || noopMapper
      mapper ||= noopMapper

      if isPlainArray v       then deepMapArray  arrayMapper(v),  mapper, options
      else if isPlainObject v then deepMapObject objectMapper(v), mapper, options
      else mapper v

    # convert structure to only built-in types.
    # functions are left untouched
    # Non-PlainObjects are converted to their objectName string
    @toPlainStructure: (o) ->
      deepMap o, (o) ->
        if isObject(o) && !isPlainObject o
          if o.toPlainStructure
            o.toPlainStructure()
          else
            objectName o
        else o

