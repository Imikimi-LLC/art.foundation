/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation;

	module.exports = Foundation = __webpack_require__(1);

	Foundation.All = __webpack_require__(3);

	Foundation.Analytics = __webpack_require__(46);

	Foundation.Array = __webpack_require__(27);

	Foundation.BaseModule = __webpack_require__(47);

	Foundation.BaseObject = __webpack_require__(12);

	Foundation.BatchLoader = __webpack_require__(48);

	Foundation.CallStack = __webpack_require__(13);

	Foundation.Clone = __webpack_require__(29);

	Foundation.Epoch = __webpack_require__(49);

	Foundation.Eq = __webpack_require__(8);

	Foundation.Function = __webpack_require__(31);

	Foundation.Hash = __webpack_require__(28);

	Foundation.JsonStore = __webpack_require__(50);

	Foundation.Log = __webpack_require__(7);

	Foundation.Map = __webpack_require__(18);

	Foundation.Math = __webpack_require__(4);

	Foundation.Parse = __webpack_require__(14);

	Foundation.Promise = __webpack_require__(39);

	Foundation.Regexp = __webpack_require__(5);

	Foundation.Ruby = __webpack_require__(38);

	Foundation.SequencedEventManager = __webpack_require__(51);

	Foundation.ShallowClone = __webpack_require__(17);

	Foundation.SingleObjectTransaction = __webpack_require__(52);

	Foundation.Stat = __webpack_require__(53);

	Foundation.String = __webpack_require__(16);

	Foundation.Time = __webpack_require__(30);

	Foundation.Transaction = __webpack_require__(54);

	Foundation.Types = __webpack_require__(6);

	Foundation.Unique = __webpack_require__(15);

	Foundation.WebWorker = __webpack_require__(45);

	Foundation.WorkerRpc = __webpack_require__(55);

	Foundation.Async = __webpack_require__(32);

	Foundation.Binary = __webpack_require__(56);

	Foundation.Inspect = __webpack_require__(9);

	Foundation.finishLoad(["All", "Analytics", "Array", "BaseModule", "BaseObject", "BatchLoader", "CallStack", "Clone", "Epoch", "Eq", "Function", "Hash", "JsonStore", "Log", "Map", "Math", "Parse", "Promise", "Regexp", "Ruby", "SequencedEventManager", "ShallowClone", "SingleObjectTransaction", "Stat", "String", "Time", "Transaction", "Types", "Unique", "WebWorker", "WorkerRpc"]);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Art,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Art = __webpack_require__(2);

	module.exports = Art.Foundation || (Art.Foundation = (function(superClass) {
	  extend(Foundation, superClass);

	  function Foundation() {
	    return Foundation.__super__.constructor.apply(this, arguments);
	  }

	  Foundation.namespace = Art;

	  Foundation.namespacePath = "Neptune.Art.Foundation";

	  return Foundation;

	})(Neptune.Base));


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Neptune,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	self.Neptune || (self.Neptune = Neptune = (function() {
	  var Base;

	  function Neptune() {}

	  Neptune.namespacePath = "Neptune";

	  Neptune.Base = Base = (function() {
	    function Base() {}

	    Base.finishLoad = function(classes) {
	      var child, childName, i, len, results;
	      results = [];
	      for (i = 0, len = classes.length; i < len; i++) {
	        childName = classes[i];
	        if (!(child = this[child])) {
	          continue;
	        }
	        child.namespace = this;
	        results.push(child.namespacePath = this.namespacePath + "." + child);
	      }
	      return results;
	    };

	    return Base;

	  })();

	  return Neptune;

	})());

	module.exports = Neptune.Art || (Neptune.Art = (function(superClass) {
	  extend(Art, superClass);

	  function Art() {
	    return Art.__super__.constructor.apply(this, arguments);
	  }

	  Art.namespace = Neptune;

	  Art.namespacePath = "Neptune.Art";

	  return Art;

	})(Neptune.Base));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(9), __webpack_require__(6), __webpack_require__(7), __webpack_require__(8), __webpack_require__(29), __webpack_require__(17), __webpack_require__(18), __webpack_require__(13), __webpack_require__(30), __webpack_require__(16), __webpack_require__(4), __webpack_require__(12), __webpack_require__(27), __webpack_require__(5), __webpack_require__(28), __webpack_require__(31), __webpack_require__(32), __webpack_require__(38), __webpack_require__(39), __webpack_require__(45)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Foundation, Inspect, Types, Log, Eq, Clone, ShallowClone, Map, CallStack, Time, String, Math, BaseObject, Array, Regexp, Hash, Function, Async, Ruby, Promise, WebWorker) {
	  var GlobalCounts, createAllClass, select;
	  createAllClass = BaseObject.createAllClass;
	  select = Hash.select;
	  GlobalCounts = (function() {
	    var currentSecond, globalCounts, globalTime, isPlainObject;

	    function GlobalCounts() {}

	    isPlainObject = Types.isPlainObject;

	    currentSecond = Time.currentSecond;

	    Foundation.globalCounts = globalCounts = {};

	    globalTime = null;

	    GlobalCounts.resetGlobalCounts = function() {
	      globalTime = currentSecond();
	      return Foundation.globalCounts = globalCounts = {};
	    };

	    GlobalCounts.globalCount = function(name, amount) {
	      var k, last, results, v;
	      if (amount == null) {
	        amount = 1;
	      }
	      if (isPlainObject(amount)) {
	        if (last = globalCounts[name]) {
	          results = [];
	          for (k in amount) {
	            v = amount[k];
	            results.push(last[k] += v);
	          }
	          return results;
	        } else {
	          return globalCounts[name] = amount;
	        }
	      } else {
	        return globalCounts[name] = (globalCounts[name] || 0) + amount;
	      }
	    };

	    GlobalCounts.countStep = function() {
	      var globalCount, nextTime;
	      nextTime = currentSecond();
	      if (nextTime - globalCount > .002) {
	        console.error("gap");
	      }
	      globalCount = nextTime;
	      return Foundation.globalCount("step");
	    };

	    return GlobalCounts;

	  })();
	  return createAllClass(Foundation, select(BaseObject, "createWithPostCreate", "mixInto", "createAllClass"), select(Inspect, "inspect", "inspectLean", "miniInspect"), GlobalCounts, Array, Ruby, CallStack, Clone, ShallowClone, Eq, Hash, Log, Math, Regexp, String, Time, Types, Function, Async, WebWorker);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Foundation, Regexp) {
	  var Math, abs, ceil, float32Precision, float64Precision, floor, inverseFloat64Precision, inverstFlaot32Precision, max, min, numberRegexp, pow, random, ref, round;
	  numberRegexp = Regexp.numberRegexp;
	  float64Precision = 0.0000000001;
	  float32Precision = 0.0000001;
	  inverseFloat64Precision = 1 / float64Precision;
	  inverstFlaot32Precision = 1 / float32Precision;
	  ref = self.Math, abs = ref.abs, min = ref.min, max = ref.max, ceil = ref.ceil, floor = ref.floor, round = ref.round, random = ref.random, pow = ref.pow;
	  return Math = (function() {
	    var bound;

	    function Math() {}

	    Math.nearInfinity = pow(10, 100);

	    Math.nearInfinityResult = pow(10, 50);

	    Math.float32Precision = float32Precision;

	    Math.float64Precision = float64Precision;

	    Math.modulo = function(a, b) {
	      var r;
	      r = a % b;
	      if (r < 0) {
	        return r + b;
	      } else {
	        return r;
	      }
	    };

	    Math.stringToNumberArray = function(string) {
	      var a, i, j, len, match, v;
	      a = string.split(",");
	      for (i = j = 0, len = a.length; j < len; i = ++j) {
	        v = a[i];
	        match = v.match(numberRegexp);
	        a[i] = match != null ? match[0] - 0 : 0;
	      }
	      return a;
	    };

	    Math.minMagnitude = function(a, magnitude) {
	      if (a < 0) {
	        return min(a, -magnitude);
	      } else {
	        return max(a, magnitude);
	      }
	    };

	    Math.maxMagnitude = function(a, magnitude) {
	      return bound(-magnitude, a, magnitude);
	    };

	    Math.maxChange = function(newValue, oldValue, maxChangeV) {
	      return bound(oldValue - maxChangeV, newValue, oldValue + maxChangeV);
	    };

	    Math.bound = bound = function(a, b, c) {
	      if (isNaN(b)) {
	        return a;
	      }
	      if (b < a) {
	        return a;
	      } else if (b > c) {
	        return c;
	      } else {
	        return b;
	      }
	    };

	    Math.absGt = function(a, b) {
	      return abs(a) > abs(b);
	    };

	    Math.absLt = function(a, b) {
	      return abs(a) < abs(b);
	    };

	    Math.absGte = function(a, b) {
	      return abs(a) >= abs(b);
	    };

	    Math.absLte = function(a, b) {
	      return abs(a) <= abs(b);
	    };

	    Math.abs = abs;

	    Math.min = min;

	    Math.max = max;

	    Math.round = round;

	    Math.ceil = function(v, m) {
	      if (m == null) {
	        m = 1;
	      }
	      return ceil(v / m) * m;
	    };

	    Math.floor = function(v, m) {
	      if (m == null) {
	        m = 1;
	      }
	      return floor(v / m) * m;
	    };

	    Math.round = function(v, m) {
	      if (m == null) {
	        m = 1;
	      }
	      return round(v / m) * m;
	    };

	    Math.simplifyNum = function(num) {
	      return round(num * inverseFloat64Precision) * float64Precision;
	    };

	    Math.floatEq = function(n1, n2) {
	      return n1 === n2 || float64Precision > abs(n1 - n2);
	    };

	    Math.float32Eq = function(n1, n2) {
	      return n1 === n2 || float32Precision > abs(n1 - n2);
	    };

	    Math.floatEq0 = function(n1) {
	      return n1 === 0 || float64Precision > abs(n1);
	    };

	    Math.float32Eq0 = function(n1) {
	      return n1 === 0 || float32Precision > abs(n1);
	    };

	    Math.random = random;

	    Math.intRand = function(max) {
	      return random() * max | 0;
	    };

	    Math.iPart = function(v) {
	      return v - (v % 1);
	    };

	    Math.fPart = function(v) {
	      return v % 1;
	    };

	    Math.commaize = function(x) {
	      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    };

	    Math.cyclingSequenceFunction = function(sequence) {
	      var sequencePos;
	      sequencePos = sequence.length;
	      return function() {
	        sequencePos++;
	        if (sequencePos >= sequence.length) {
	          sequencePos = 0;
	        }
	        return sequence[sequencePos];
	      };
	    };

	    return Math;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var Regexp;
	  return Regexp = (function() {
	    var domainRegexp, urlPathRegexp, urlProtocolRegexp, urlQueryRegexp;

	    function Regexp() {}

	    urlProtocolRegexp = '[\\w-]+://';

	    domainRegexp = '[\\w]+(?:-[\\w]+)*(?:\\.[\\w]+(?:-[\\w]+)*)*\\.[a-z]{2,20}';

	    urlPathRegexp = '(?:/(?:[-+*._\\w]|%[a-f\\d]{2})*)*';

	    urlQueryRegexp = '(?:[-=+*._\\w]|%[a-f\\d]{2})*';

	    Regexp.emailRegexp = RegExp("^([_\\w-]+(?:\\.[_\\w]+)*)@(" + domainRegexp + ")$", "i");

	    Regexp.numberRegexp = /([-]?\.[0-9]+)|([-]?[0-9]+(\.[0-9]+)?)/;

	    Regexp.urlProtocolRegexp = RegExp("^" + urlProtocolRegexp + "$", "i");

	    Regexp.domainRegexp = RegExp("^" + domainRegexp + "$", "i");

	    Regexp.urlPathRegexp = RegExp("^" + urlPathRegexp + "$", "i");

	    Regexp.urlQueryRegexp = RegExp("^" + urlQueryRegexp + "$", "i");

	    Regexp.isoDateRegexp = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

	    Regexp.hex16ColorRegex = /^#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?$/i;

	    Regexp.hex256ColorRegex = /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?$/i;

	    Regexp.rgbColorRegex = /rgb *\( *(\d+%?) *, *(\d+%?) *, *(\d+%?) *\)/;

	    Regexp.rgbaColorRegex = /rgba *\( *(\d+%?) *, *(\d+%?) *, *(\d+%?) *, *(\d*\.?\d*)\)/;

	    Regexp.colorRegex = new RegExp("(" + Regexp.hex16ColorRegex.source + ")|(" + Regexp.hex256ColorRegex.source + ")|(" + Regexp.rgbColorRegex.source + ")|(" + Regexp.rgbaColorRegex.source + ")");

	    Regexp.urlRegexp = RegExp("^(" + urlProtocolRegexp + ")(" + domainRegexp + ")(" + urlPathRegexp + ")?(?:\\?(" + urlQueryRegexp + "))?$", "i");

	    return Regexp;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /*
	  Maybe we should just the API for array compatibility rather than specific types.
	    typeof obj == "object" &&
	      && isFunction obj.forEach
	      && isFunction obj.indexOf
	      && isNumber obj.length
	   */
	  var Types, isArray;
	  isArray = self.Uint8ClampedArray ? function(obj) {
	    return !!obj && (obj.constructor === Array || obj instanceof Uint8ClampedArray || obj instanceof Int8Array || obj instanceof Uint8Array || obj instanceof Int16Array || obj instanceof Uint16Array || obj instanceof Int32Array || obj instanceof Uint32Array || obj instanceof Float32Array || obj instanceof Float64Array);
	  } : function(obj) {
	    return !!obj && (obj.constructor === Array || obj instanceof Int8Array || obj instanceof Uint8Array || obj instanceof Int16Array || obj instanceof Uint16Array || obj instanceof Int32Array || obj instanceof Uint32Array || obj instanceof Float32Array || obj instanceof Float64Array);
	  };
	  return Types = (function() {
	    var cloneObjectUpToKey, deepEach, deepMap, deepMapArray, deepMapObject, functionName, hasKeys, isClass, isFunction, isObject, isPlainArray, isPlainObject, isString, noopMapper, objectName;

	    function Types() {}

	    Types.isRegExp = function(obj) {
	      return obj instanceof RegExp;
	    };

	    Types.isNumber = function(obj) {
	      return typeof obj === "number";
	    };

	    Types.isArray = isArray;

	    Types.isDate = function(obj) {
	      return obj && obj.constructor === Date;
	    };

	    Types.isString = isString = function(obj) {
	      return typeof obj === "string";
	    };

	    Types.isFunction = isFunction = function(obj) {
	      return typeof obj === "function";
	    };

	    Types.isEmptyObject = function(obj) {
	      return Object.keys(obj).length === 0;
	    };

	    Types.isClass = isClass = function(obj) {
	      return !!(typeof obj === "function" && ((typeof obj.__super__ === "object") || (obj.prototype && hasKeys(obj.prototype))));
	    };


	    /*
	    like RubyOnRails#present:
	      "An object is present if it's not blank."
	    
	    Examples:
	      "", undefined, null => false
	      0 => true
	    
	    If 'obj' has method: obj.present() => !!obj.present()
	     */

	    Types.present = function(obj) {
	      if (isFunction(obj != null ? obj.present : void 0)) {
	        return !!obj.present();
	      } else {
	        return obj !== "" && obj !== void 0 && obj !== null;
	      }
	    };

	    Types.isObject = isObject = function(obj) {
	      return !!obj && typeof obj === "object" && !isArray(obj);
	    };

	    Types.functionName = functionName = function(f) {
	      var matched;
	      return f.name || ((matched = ("" + f).match(/function ([a-zA-Z]+)\(/)) && matched[1]) || "function";
	    };

	    Types.objectName = objectName = function(obj) {
	      var a, name, ref;
	      if (!obj) {
	        return "" + obj;
	      } else if (a = typeof obj.getClassPathName === "function" ? obj.getClassPathName() : void 0) {
	        return a;
	      } else if (a = obj.classPathName) {
	        return a;
	      } else if (obj.constructor === Object) {
	        return "Object";
	      } else if (isFunction(obj)) {
	        return functionName(obj);
	      } else if (isString(name = (ref = obj.constructor) != null ? ref.name : void 0) && name.length > 0) {
	        return name;
	      } else if (obj instanceof Object) {
	        return "(anonymous instanceof Object)";
	      } else {
	        return "(objectName unknown)";
	      }
	    };

	    Types.isBrowserObject = function(obj) {
	      var name;
	      if (!Types.isObject(obj)) {
	        return false;
	      }
	      name = Types.objectName(obj);
	      return name.slice(0, 4) === "HTML" || name.slice(0, 22) === "CanvasRenderingContext";
	    };

	    Types.isPlainArray = isPlainArray = function(v) {
	      if (v) {
	        return v.constructor === Array;
	      } else {
	        return false;
	      }
	    };

	    Types.isPlainObject = isPlainObject = function(v) {
	      if (v) {
	        return v.constructor === Object;
	      } else {
	        return false;
	      }
	    };

	    Types.hasKeys = hasKeys = function(o) {
	      var k;
	      for (k in o) {
	        return true;
	      }
	      return false;
	    };

	    Types.deepEach = deepEach = function(v, f) {
	      var j, k, len, subV;
	      if (isPlainArray(v)) {
	        for (j = 0, len = v.length; j < len; j++) {
	          subV = v[j];
	          deepEach(subV, f);
	        }
	      } else if (isPlainObject(v)) {
	        for (k in v) {
	          subV = v[k];
	          deepEach(subV, f);
	        }
	      } else {
	        f(v);
	      }
	      return v;
	    };


	    /*
	    only creates a new array if the children changed
	     */

	    deepMapArray = function(array, mapper, options) {
	      var i, j, len, r, res, v;
	      res = null;
	      for (i = j = 0, len = array.length; j < len; i = ++j) {
	        v = array[i];
	        r = deepMap(v, mapper, options);
	        if (r !== v) {
	          res || (res = array.slice());
	          res[i] = r;
	        }
	      }
	      return res || array;
	    };

	    cloneObjectUpToKey = function(obj, k) {
	      var k2, res, v;
	      res = {};
	      for (k2 in obj) {
	        v = obj[k2];
	        if (k2 === k) {
	          break;
	        }
	        res[k2] = v;
	      }
	      return res;
	    };

	    deepMapObject = function(obj, mapper, options) {
	      var k, r, res, v;
	      res = null;
	      for (k in obj) {
	        v = obj[k];
	        r = deepMap(v, mapper, options);
	        if (r !== v || res) {
	          res || (res = cloneObjectUpToKey(obj, k));
	          res[k] = r;
	        }
	      }
	      return res || obj;
	    };


	    /*
	    Applies "f" to every -value- in a nested structure of plain arrays and objects.
	    Pure functional efficient:
	      If an array or object, and all its sub values, didn't change, the original array/object is reused.
	     */

	    noopMapper = function(v) {
	      return v;
	    };

	    Types.deepMap = deepMap = function(v, mapper, options) {
	      var arrayMapper, objectMapper;
	      arrayMapper = (options != null ? options.arrays : void 0) || noopMapper;
	      objectMapper = (options != null ? options.objects : void 0) || noopMapper;
	      mapper || (mapper = noopMapper);
	      if (isPlainArray(v)) {
	        return deepMapArray(arrayMapper(v), mapper, options);
	      } else if (isPlainObject(v)) {
	        return deepMapObject(objectMapper(v), mapper, options);
	      } else {
	        return mapper(v);
	      }
	    };

	    Types.toPlainStructure = function(o) {
	      return deepMap(o, function(o) {
	        if (isObject(o) && !isPlainObject(o)) {
	          if (o.toPlainStructure) {
	            return o.toPlainStructure();
	          } else {
	            return objectName(o);
	          }
	        } else {
	          return o;
	        }
	      });
	    };

	    return Types;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var slice = [].slice;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Foundation) {
	  var Log, log;
	  Log = (function() {
	    function Log() {}

	    Log.contextString = function(stack, defaultContext) {
	      var caller, context;
	      if (stack && (caller = stack[1])) {
	        context = caller["function"] ? caller["class"] ? caller["class"] + "::" + caller["function"] + "()" : caller["function"] + "()" : defaultContext ? defaultContext + ":" : "";
	        if (caller.sourceFileName) {
	          return caller.sourceFileName + ("-" + caller.sourceLine + ": ") + context;
	        }
	      } else {
	        return "()";
	      }
	    };

	    Log.autoSizedIndepect = function(toInspect, maxLength, maxDepth) {
	      var depth, inspected;
	      if (maxLength == null) {
	        maxLength = 512;
	      }
	      if (maxDepth == null) {
	        maxDepth = 10;
	      }
	      inspected = null;
	      depth = maxDepth;
	      while ((inspected = Foundation.Inspect.inspectLean(toInspect, {
	          maxDepth: depth,
	          maxLength: maxLength
	        })).match(/\.\.\.$/)) {
	        depth--;
	      }
	      return inspected;
	    };

	    Log.loggedParamsString = function(params) {
	      if (typeof params === "string") {
	        return params;
	      } else {
	        return this.autoSizedIndepect(params);
	      }
	    };

	    Log.hideLogging = function() {
	      return this.loggingHidden = true;
	    };

	    Log.showLogging = function() {
	      return this.loggingHidden = false;
	    };

	    Log.rawLog = function() {
	      if (!this.loggingHidden) {
	        return console.log.apply(console, arguments);
	      }
	    };

	    Log.rawErrorLog = function() {
	      if (!this.loggingHidden) {
	        return console.error.apply(console, arguments);
	      }
	    };

	    Log.logCore = function(m, stack, className) {
	      if (this.alternativeLogger) {
	        return this.alternativeLogger.logCore(m, stack, className);
	      } else {
	        return this.rawLog(((this.contextString(stack, className)) + " ") + this.loggedParamsString(m));
	      }
	    };

	    return Log;

	  })();
	  Log.log = log = function() {
	    var args, m, stack;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    m = args.length === 1 ? args[0] : args;
	    stack = Foundation.callStack();
	    Log.logCore(m, stack, this.name);
	    return args[args.length - 1];
	  };
	  Log.logL = function(obj) {
	    var k, ret, v;
	    ret = null;
	    for (k in obj) {
	      v = obj[k];
	      ret = v;
	    }
	    log(obj);
	    return ret;
	  };
	  return Log;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9), __webpack_require__(27), __webpack_require__(28), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Inspect, FoundationArray, Hash, arg) {
	  var Eq, inspect, isNumber, isString, min, objectKeyCount, remove;
	  isString = arg.isString, isNumber = arg.isNumber;
	  inspect = Inspect.inspect;
	  remove = FoundationArray.remove;
	  objectKeyCount = Hash.objectKeyCount;
	  min = Math.min;
	  return Eq = (function() {
	    var plainObjectsDeepDiff, plainObjectsDeepEq;

	    function Eq() {}


	    /*
	    IN: see @compare
	    OUT:
	      true: if a and b are structurally equal
	      false: otherwise
	     */

	    Eq.eq = function(a, b, recursionBlockEnabled) {
	      return 0 === Eq.compare(a, b, recursionBlockEnabled);
	    };

	    Eq._compareArray = function(a, b, recursionBlockArray) {
	      var aLength, av, bLength, bv, i, j, ref, val;
	      aLength = a.length;
	      bLength = b.length;
	      for (i = j = 0, ref = Math.min(aLength, bLength); j < ref; i = j += 1) {
	        av = a[i];
	        bv = b[i];
	        if (0 !== (val = Eq._compare(av, bv, recursionBlockArray))) {
	          return val;
	        }
	      }
	      return aLength - bLength;
	    };

	    Eq._compareObject = function(a, b, recursionBlockArray) {
	      var aLength, av, bv, compared, k, val;
	      aLength = 0;
	      compared = 0;
	      for (k in a) {
	        av = a[k];
	        aLength++;
	        av = a[k];
	        bv = b[k];
	        if (bv !== void 0 || b.hasOwnProperty(k)) {
	          compared++;
	          if (0 !== (val = Eq._compare(av, bv, recursionBlockArray))) {
	            return val;
	          }
	        }
	      }
	      if (aLength === compared && compared === objectKeyCount(b)) {
	        return 0;
	      } else {
	        return NaN;
	      }
	    };


	    /*
	    compare is recursive. However, it only recurses for 'plain' objects and arrays.
	    
	    If you want to compare custom objects deeply, you must add an .eq or .compare function to your custom objects.
	      signature: a.eq b, recursionBlockArray => truthy if a equals b
	      signature: a.compare b, recursionBlockArray => NaN / <0 / 0 / >0 for incomparable / a<b / a==b / a>b respectively
	      IN:
	        a: => this/@
	        b: compared with a
	        recursionBlockArray: an array of objects already on the stack being tested, pass this to
	      It is an array of every object recursively currently being tested - don't test an object in this array
	      recursionBlockArray can be altered, but should be returned in its original state. It may be null.
	    
	    IN:
	      a and b: compare a and b
	      recursionBlockEnabled:
	        truthy: recursive structures will be handled correctly
	        falsey: (default) faster, but recursive structures result in infinite recursion
	    OUT:
	      NaN:
	        a and b are different types
	        a and b are otherwise not comparable
	    
	      <0: a < b
	      0:  a == b
	      >0: a > b
	     */

	    Eq.compare = function(a, b, recursionBlockEnabled) {
	      var error, error1, info;
	      try {
	        return Eq._compare(a, b, recursionBlockEnabled && []);
	      } catch (error1) {
	        error = error1;
	        info = "compare(a, b, " + recursionBlockEnabled + ") threw error: ";
	        console.error(info, error);
	        throw new Error(info + error);
	      }
	    };

	    Eq._compare = function(a, b, recursionBlockArray) {
	      var _constructor;
	      if (a === b) {
	        return 0;
	      }
	      if (a && b && a.constructor === (_constructor = b.constructor)) {
	        if (isString(a)) {
	          return a.localeCompare(b);
	        }
	        if (isNumber(a)) {
	          return a - b;
	        }
	        if (recursionBlockArray) {
	          if (indexOf.call(recursionBlockArray, a) >= 0 || indexOf.call(recursionBlockArray, b) >= 0) {
	            return 0;
	          }
	          recursionBlockArray.push(a);
	          recursionBlockArray.push(b);
	        }
	        if (a.compare) {
	          return a.compare(b, recursionBlockArray);
	        }
	        if (_constructor === Array) {
	          return Eq._compareArray(a, b, recursionBlockArray);
	        }
	        if (_constructor === Object) {
	          return Eq._compareObject(a, b, recursionBlockArray);
	        }
	        if (a.eq && a.eq(b, recursionBlockArray)) {
	          return 0;
	        }
	        if (recursionBlockArray) {
	          remove(recursionBlockArray, recursionBlockArray.length - 2, 2);
	        }
	      }
	      return NaN;
	    };

	    Eq.plainObjectsDeepEqArray = function(a, b) {
	      var av, i, j, len1;
	      if (a.length !== b.length) {
	        return false;
	      }
	      for (i = j = 0, len1 = a.length; j < len1; i = ++j) {
	        av = a[i];
	        if (!Eq.plainObjectsDeepEq(av, b[i])) {
	          return false;
	        }
	      }
	      return true;
	    };

	    Eq.plainObjectsDeepEqObject = function(a, b) {
	      var aLength, av, bv, k;
	      aLength = 0;
	      for (k in a) {
	        av = a[k];
	        aLength++;
	        bv = b[k];
	        if (!((bv !== void 0 || b.hasOwnProperty(k)) && Eq.plainObjectsDeepEq(av, bv))) {
	          return false;
	        }
	      }
	      return aLength === objectKeyCount(b);
	    };

	    Eq.plainObjectsDeepEq = plainObjectsDeepEq = function(a, b) {
	      var _constructor;
	      if (a === b) {
	        return true;
	      } else if (a && b && a.constructor === (_constructor = b.constructor)) {
	        if (a.eq) {
	          return a.eq(b);
	        } else if (_constructor === Array) {
	          return Eq.plainObjectsDeepEqArray(a, b);
	        } else if (_constructor === Object) {
	          return Eq.plainObjectsDeepEqObject(a, b);
	        } else {
	          return false;
	        }
	      } else {
	        return false;
	      }
	    };

	    Eq.plainObjectsDeepDiffArray = function(before, after) {
	      var diff, i, j, l, len, m, ref, ref1, ref2, ref3, ref4, res;
	      res = null;
	      len = min(before.length, after.length);
	      for (i = j = 0, ref = len; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	        if (!(diff = plainObjectsDeepDiff(before[i], after[i]))) {
	          continue;
	        }
	        res || (res = {});
	        res[i] = diff;
	      }
	      if (len < before.length) {
	        for (i = l = ref1 = len, ref2 = before.length; ref1 <= ref2 ? l < ref2 : l > ref2; i = ref1 <= ref2 ? ++l : --l) {
	          res || (res = {});
	          res[i] = {
	            removed: before[i]
	          };
	        }
	      }
	      if (len < after.length) {
	        for (i = m = ref3 = len, ref4 = after.length; ref3 <= ref4 ? m < ref4 : m > ref4; i = ref3 <= ref4 ? ++m : --m) {
	          res || (res = {});
	          res[i] = {
	            added: after[i]
	          };
	        }
	      }
	      return res;
	    };

	    Eq.plainObjectsDeepDiffObject = function(before, after) {
	      var afterV, beforeV, diff, k, res;
	      res = null;
	      for (k in before) {
	        beforeV = before[k];
	        if (after.hasOwnProperty(k)) {
	          if (diff = plainObjectsDeepDiff(beforeV, after[k])) {
	            res || (res = {});
	            res[k] = diff;
	          }
	        } else {
	          res || (res = {});
	          res[k] = {
	            removed: beforeV
	          };
	        }
	      }
	      for (k in after) {
	        afterV = after[k];
	        if (!(!before.hasOwnProperty(k))) {
	          continue;
	        }
	        res || (res = {});
	        res[k] = {
	          added: afterV
	        };
	      }
	      return res;
	    };

	    Eq.plainObjectsDeepDiff = plainObjectsDeepDiff = function(before, after) {
	      var _constructor;
	      if (before === after) {
	        return null;
	      } else if (before && after && before.constructor === (_constructor = after.constructor)) {
	        if (before.eq) {
	          if (before.eq(after)) {
	            return null;
	          } else {
	            return {
	              before: before,
	              after: after
	            };
	          }
	        } else if (_constructor === Array) {
	          return Eq.plainObjectsDeepDiffArray(before, after);
	        } else if (_constructor === Object) {
	          return Eq.plainObjectsDeepDiffObject(before, after);
	        } else {
	          return {
	            before: before,
	            after: after
	          };
	        }
	      } else {
	        return {
	          before: before,
	          after: after
	        };
	      }
	    };

	    Eq.shallowEq = function(a, b) {
	      return a === b || (a && b && a.eq && a.eq(b));
	    };

	    return Eq;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Inspect;

	module.exports = Inspect = __webpack_require__(10);

	Inspect.Inspector = __webpack_require__(11);

	Inspect.Inspector2 = __webpack_require__(19);

	Inspect.Main = __webpack_require__(26);

	Inspect.Inspected = __webpack_require__(20);

	Inspect.finishLoad(["Inspector", "Inspector2", "Main"]);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(1);

	module.exports = Foundation.Inspect || (Foundation.Inspect = (function(superClass) {
	  extend(Inspect, superClass);

	  function Inspect() {
	    return Inspect.__super__.constructor.apply(this, arguments);
	  }

	  Inspect.namespace = Foundation;

	  Inspect.namespacePath = "Neptune.Art.Foundation.Inspect";

	  return Inspect;

	})(Neptune.Base));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(12), __webpack_require__(6), __webpack_require__(16), __webpack_require__(18), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function(BaseObject, Types, StringExtensions, Map, Inspect) {
	  var Inspector, escapeJavascriptString, isArray, isBrowserObject, isClass, isFunction, isObject, isString, objectName;
	  escapeJavascriptString = StringExtensions.escapeJavascriptString;
	  isString = Types.isString, isArray = Types.isArray, isFunction = Types.isFunction, isObject = Types.isObject, isClass = Types.isClass, objectName = Types.objectName, isBrowserObject = Types.isBrowserObject;
	  return Inspector = (function(superClass) {
	    extend(Inspector, superClass);

	    Inspector.unquotablePropertyRegex = /^([0-9]+|[_a-zA-Z][_0-9a-zA-Z]*)$/;

	    Inspector.customInspectable = function(obj) {
	      return obj.inspect && !(typeof obj === "function");
	    };

	    Inspector.parentString = function(distance) {
	      switch (distance) {
	        case 0:
	          return "parent";
	        case 1:
	          return "grandparent";
	        case 2:
	          return "great grandparent";
	        default:
	          return "great^" + (distance - 1) + " grandparent";
	      }
	    };

	    function Inspector(options) {
	      if (options == null) {
	        options = {};
	      }
	      this.inspect = bind(this.inspect, this);
	      this.inspectInternal = bind(this.inspectInternal, this);
	      this.inspectObject = bind(this.inspectObject, this);
	      this.inspectArray = bind(this.inspectArray, this);
	      this.maxLength = options.maxLength || 1000;
	      this.allowCustomInspectors = !options.noCustomInspectors;
	      this.maxDepth = options.maxDepth != null ? options.maxDepth : 10;
	      this.outArray = [];
	      this.length = 0;
	      this.depth = 0;
	      this.inspectingMap = new Map;
	      this.done = false;
	    }

	    Inspector.prototype.put = function(s) {
	      if (this.done) {
	        return;
	      }
	      this.outArray.push(this.length + s.length > this.maxLength ? (this.done = true, "...") : (this.length += s.length, s));
	      return s;
	    };

	    Inspector.getter({
	      result: function() {
	        return this.outArray.join("");
	      }
	    });

	    Inspector.prototype.maxDepthOutput = function(obj) {
	      var keys, name;
	      switch (typeof obj) {
	        case "string":
	        case "number":
	        case "boolean":
	        case "undefined":
	          return this.inspectInternal(obj);
	        case "function":
	          return this.put(objectName(obj));
	        case "object":
	          return this.put(obj === null ? "null" : isArray(obj) ? "[" + obj.length + " elements]" : (keys = Object.keys(obj), name = objectName(obj), name === "Object" ? "{" + keys.length + " keys}" : keys.length > 0 ? "{" + name + " " + keys.length + " keys}" : name));
	      }
	    };

	    Inspector.prototype.inspectArray = function(array) {
	      var first, i, len, obj;
	      this.put("[");
	      first = true;
	      for (i = 0, len = array.length; i < len; i++) {
	        obj = array[i];
	        if (!first) {
	          this.put(", ");
	        }
	        this.inspect(obj);
	        first = false;
	      }
	      return this.put("]");
	    };

	    Inspector.prototype.inspectObject = function(obj) {
	      var attributes, first, i, k, keys, len, name, v;
	      attributes = [];
	      keys = Object.keys(obj);
	      name = objectName(obj);
	      if (isFunction(obj) && keys.length === 0) {
	        return this.put(name + "()");
	      } else if (isBrowserObject(obj)) {
	        return this.put("{" + name + "}");
	      } else {
	        this.put("{");
	        if (obj.constructor !== Object) {
	          this.put(name + " ");
	        }
	        first = true;
	        for (i = 0, len = keys.length; i < len; i++) {
	          k = keys[i];
	          if (!(k !== "__uniqueId")) {
	            continue;
	          }
	          if (!first) {
	            this.put(", ");
	          }
	          v = obj[k];
	          if (Inspector.unquotablePropertyRegex.test(k)) {
	            this.put(k);
	          } else {
	            this.inspect(k);
	          }
	          this.put(": ");
	          this.inspect(v);
	          first = false;
	        }
	        return this.put("}");
	      }
	    };

	    Inspector.prototype.inspectInternal = function(obj) {
	      if (obj == null) {
	        return this.put("" + obj);
	      } else if (isString(obj)) {
	        return this.put(escapeJavascriptString(obj));
	      } else if (isArray(obj)) {
	        return this.inspectArray(obj);
	      } else if (isClass(obj)) {
	        return this.put(objectName(obj));
	      } else if (this.allowCustomInspectors && Inspector.customInspectable(obj)) {
	        return obj.inspect(this);
	      } else if (isObject(obj) || isFunction(obj)) {
	        return this.inspectObject(obj);
	      } else {
	        return this.put("" + obj);
	      }
	    };

	    Inspector.prototype.inspect = function(obj) {
	      var objDepth;
	      if (this.done) {
	        return;
	      }
	      if (objDepth = this.inspectingMap.get(obj)) {
	        this.put("<" + (Inspector.parentString(this.depth - objDepth)) + ">");
	        return null;
	      }
	      if (this.depth >= this.maxDepth) {
	        this.maxDepthOutput(obj);
	      } else {
	        this.depth++;
	        this.inspectingMap.set(obj, this.depth);
	        this.inspectInternal(obj);
	        this.inspectingMap["delete"](obj);
	        this.depth--;
	      }
	      return null;
	    };

	    return Inspector;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var slice = [].slice,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(13), __webpack_require__(7), __webpack_require__(6), __webpack_require__(15), __webpack_require__(16), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = function(CallStack, Log, Types, Unique, String, ShallowClone) {
	  var BaseObject, callStack, capitalize, decapitalize, extendClone, functionName, isFunction, isPlainObject, log, nextUniqueObjectId, objectName;
	  capitalize = String.capitalize, decapitalize = String.decapitalize;
	  log = Log.log;
	  callStack = CallStack.callStack;
	  extendClone = ShallowClone.extendClone;
	  isFunction = Types.isFunction, objectName = Types.objectName, isPlainObject = Types.isPlainObject, functionName = Types.functionName;
	  nextUniqueObjectId = Unique.nextUniqueObjectId;
	  return BaseObject = (function() {
	    var addGetter, addGetters, addSetter, addSetters, defProperties, defProperty, excludedKeys, mixInto, propGetterName, propInternalName, propSetterName;

	    BaseObject.objectsCreated = 0;

	    BaseObject.objectsCreatedByType = {};

	    BaseObject.resetStats = function() {
	      BaseObject.objectsCreated = 0;
	      return BaseObject.objectsCreatedByType = {};
	    };

	    BaseObject.createWithPostCreate = function(klass) {
	      return (klass != null ? klass.postCreate() : void 0) || klass;
	    };

	    BaseObject.postCreate = function() {
	      return this;
	    };

	    excludedKeys = ["__super__", "namespace", "namespacePath"].concat(Object.keys(Neptune.Base));

	    BaseObject.mixInto = mixInto = function() {
	      var i, intoClass, k, keys, klass, len, v;
	      intoClass = arguments[0], klass = arguments[1], keys = 3 <= arguments.length ? slice.call(arguments, 2) : [];
	      if (keys.length === 0) {
	        keys = Object.keys(klass);
	      }
	      for (i = 0, len = keys.length; i < len; i++) {
	        k = keys[i];
	        if (!(indexOf.call(excludedKeys, k) < 0)) {
	          continue;
	        }
	        v = klass[k];
	        if (intoClass[k]) {
	          console.error("Foundation.mixInto - mix " + klass.name + " into " + intoClass.name + ": " + k + " already exists.");
	        }
	        intoClass[k] = v;
	      }
	      return intoClass;
	    };

	    BaseObject.createAllClass = function() {
	      var All, arg, args, i, len, namespace;
	      namespace = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      for (i = 0, len = args.length; i < len; i++) {
	        arg = args[i];
	        if (arg.prototype instanceof BaseObject) {
	          console.error("createAllClass arguments cannot be subclasses of BaseObject: " + namespace.name + ":" + arg.name);
	        }
	        mixInto(namespace, arg);
	      }
	      return All = (function(superClass) {
	        extend(All, superClass);

	        function All() {
	          return All.__super__.constructor.apply(this, arguments);
	        }

	        return All;

	      })(namespace);
	    };

	    function BaseObject() {
	      this.__uniqueId = null;
	    }

	    BaseObject.implementsInterface = function(object, methods) {
	      var i, len, method;
	      for (i = 0, len = methods.length; i < len; i++) {
	        method = methods[i];
	        if (typeof object[method] !== "function") {
	          return false;
	        }
	      }
	      return true;
	    };


	    /*
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
	     */

	    BaseObject.include = function(obj) {
	      var key, ref, value;
	      for (key in obj) {
	        value = obj[key];
	        if (key !== 'included') {
	          if (!this[key]) {
	            this[key] = value;
	          }
	        }
	      }
	      ref = obj.prototype;
	      for (key in ref) {
	        value = ref[key];
	        if (key) {
	          if (!this.prototype[key]) {
	            this.prototype[key] = value;
	          }
	        }
	      }
	      if (typeof obj.included === "function") {
	        obj.included(this);
	      }
	      return this;
	    };

	    BaseObject.getPrototypePropertyExtendedByInheritance = function(propertyName, defaultStructure) {
	      if (this.prototype.hasOwnProperty(propertyName)) {
	        return this.prototype[propertyName];
	      } else {
	        return this.prototype[propertyName] = extendClone(this.__super__[propertyName] || defaultStructure);
	      }
	    };

	    BaseObject._propInternalName = propInternalName = function(prop) {
	      return "_" + prop;
	    };

	    BaseObject._propGetterName = propGetterName = function(prop) {
	      return "get" + capitalize(prop);
	    };

	    BaseObject._propSetterName = propSetterName = function(prop) {
	      return "set" + capitalize(prop);
	    };

	    BaseObject._addGetter = addGetter = function(obj, prop, getter) {
	      obj[propGetterName(prop)] = getter;
	      Object.defineProperty(obj, prop, {
	        get: getter,
	        configurable: true
	      });
	      return prop;
	    };

	    BaseObject._addGetters = addGetters = function(obj, a, b) {
	      var getter, map, prop;
	      if (isPlainObject(map = a)) {
	        for (prop in map) {
	          getter = map[prop];
	          addGetter(obj, prop, getter);
	        }
	        return map;
	      } else {
	        return addGetter(obj, a, b);
	      }
	    };

	    BaseObject._addSetter = addSetter = function(obj, prop, setter) {
	      obj[propSetterName(prop)] = setter;
	      Object.defineProperty(obj, prop, {
	        set: setter,
	        configurable: true
	      });
	      return prop;
	    };

	    BaseObject._addSetters = addSetters = function(obj, a, b) {
	      var map, prop, setter;
	      if (isPlainObject(map = a)) {
	        for (prop in map) {
	          setter = map[prop];
	          addSetter(obj, prop, setter);
	        }
	        return map;
	      } else {
	        return addSetter(obj, a, b);
	      }
	    };

	    BaseObject._defProperty = defProperty = function(obj, prop, defineGetter, defineSetter, initializer) {
	      var propName;
	      propName = propInternalName(prop);
	      if (defineGetter) {
	        addGetter(obj, prop, obj[propGetterName(prop)] = isFunction(initializer) ? function() {
	          if (this[propName] != null) {
	            return this[propName];
	          } else {
	            return this[propName] = initializer();
	          }
	        } : initializer ? function() {
	          if (this[propName] != null) {
	            return this[propName];
	          } else {
	            return this[propName] = initializer;
	          }
	        } : function() {
	          return this[propName];
	        });
	      }
	      if (defineSetter) {
	        return addSetter(obj, prop, function(v) {
	          return this[propName] = v;
	        });
	      }
	    };

	    BaseObject._defProperties = defProperties = function(obj, props, defineGetter, defineSetter) {
	      var i, initializer, len, prop, propMap, results;
	      results = [];
	      for (i = 0, len = props.length; i < len; i++) {
	        prop = props[i];
	        if (isPlainObject(propMap = prop)) {
	          results.push((function() {
	            var results1;
	            results1 = [];
	            for (prop in propMap) {
	              initializer = propMap[prop];
	              results1.push(defProperty(obj, prop, defineGetter, defineSetter, initializer));
	            }
	            return results1;
	          })());
	        } else {
	          results.push(defProperty(obj, prop, defineGetter, defineSetter, null));
	        }
	      }
	      return results;
	    };

	    BaseObject.property = function() {
	      var props;
	      props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return defProperties(this.prototype, props, true, true);
	    };

	    BaseObject.propGetter = function() {
	      var props;
	      props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return defProperties(this.prototype, props, true, false);
	    };

	    BaseObject.propSetter = function() {
	      var props;
	      props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return defProperties(this.prototype, props, false, true);
	    };

	    BaseObject.getter = function(a, b) {
	      return addGetters(this.prototype, a, b);
	    };

	    BaseObject.setter = function(a, b) {
	      return addSetters(this.prototype, a, b);
	    };

	    BaseObject.classGetter = function(a, b) {
	      return addGetters(this, a, b);
	    };

	    BaseObject.classSetter = function(a, b) {
	      return addSetters(this, a, b);
	    };

	    BaseObject.classProperty = function() {
	      var props;
	      props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return defProperties(this.prototype, props, true, true);
	    };

	    BaseObject.classPropGetter = function() {
	      var props;
	      props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return defProperties(this.prototype, props, true, false);
	    };

	    BaseObject.classPropSetter = function() {
	      var props;
	      props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return defProperties(this.prototype, props, false, true);
	    };

	    BaseObject.classGetter({
	      classPath: function() {
	        return this.parentNamespace.namespacePath;
	      },
	      classPathArray: function() {
	        return this.namespacePathArray || (this.namespacePathArray = this.classPath.split("."));
	      },
	      classPathName: function() {
	        return this.namespacePath;
	      },
	      className: function() {
	        return this.prototype.constructor.name;
	      }
	    });


	    /*
	    creates the classGetter "singleton" which returns a single instance of the current class.
	    
	    IN: args are passed to the singleton constructor
	    OUT: null
	    
	    The singleton instance is created on demand the first time it is accessed.
	     */

	    BaseObject.singletonClass = function() {
	      var args, map;
	      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      map = {
	        singleton: (function(_this) {
	          return function() {
	            return _this._singleton || (_this._singleton = (function(func, args, ctor) {
	              ctor.prototype = func.prototype;
	              var child = new ctor, result = func.apply(child, args);
	              return Object(result) === result ? result : child;
	            })(_this, args, function(){}));
	          };
	        })(this)
	      };
	      map[decapitalize(functionName(this))] = (function(_this) {
	        return function() {
	          return _this.getSingleton();
	        };
	      })(this);
	      this.classGetter(map);
	      return null;
	    };

	    BaseObject.getter({
	      className: function() {
	        return this["class"].name;
	      },
	      "class": function() {
	        return this.constructor;
	      },
	      keys: function() {
	        return Object.keys(this);
	      },
	      classPathArray: function() {
	        return this["class"].classPathArray;
	      },
	      classPath: function() {
	        return this["class"].classPath;
	      },
	      classPathName: function() {
	        return this["class"].classPathName;
	      },
	      classPathNameAndId: function() {
	        return this.classPathName + ":" + this.objectId;
	      },
	      uniqueId: function() {
	        return this.__uniqueId || (this.__uniqueId = nextUniqueObjectId());
	      },
	      objectId: function() {
	        return this.__uniqueId || (this.__uniqueId = nextUniqueObjectId());
	      }
	    });

	    BaseObject.prototype.implementsInterface = function(methods) {
	      return Function.BaseObject.implementsInterface(this, methods);
	    };

	    BaseObject.prototype.tap = function(f) {
	      f(this);
	      return this;
	    };

	    BaseObject.rawLog = function() {
	      return Log.rawLog.apply(Log, arguments);
	    };

	    BaseObject.log = function() {
	      var a, stack, toLog;
	      stack = callStack();
	      toLog = (function() {
	        var i, len, results;
	        if (arguments.length > 1) {
	          results = [];
	          for (i = 0, len = arguments.length; i < len; i++) {
	            a = arguments[i];
	            results.push(a);
	          }
	          return results;
	        } else {
	          return arguments[0];
	        }
	      }).apply(this, arguments);
	      Log.logCore(toLog, stack, this.className);
	      return arguments[arguments.length - 1];
	    };

	    BaseObject.prototype.log = BaseObject.log;

	    BaseObject.prototype.rawLog = BaseObject.rawLog;

	    return BaseObject;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	/*
	IE11 callstack example:
	  "Error
	    at eval code (eval code:1:6)
	    at Global code (Unknown script code:5:1)"
	Chrome 33 callstack example:
	  "Error
	    at <anonymous>:2:5
	    at Object.InjectedScript._evaluateOn (<anonymous>:613:39)
	    at Object.InjectedScript._evaluateAndWrap (<anonymous>:573:52)
	    at Object.InjectedScript.evaluate (<anonymous>:492:21)"
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function(arg) {
	  var CallStack, CallStackLine, parseURL;
	  parseURL = arg.parseURL;
	  CallStackLine = (function() {
	    CallStackLine.getter = function(map) {
	      var getter, prop, results;
	      results = [];
	      for (prop in map) {
	        getter = map[prop];
	        results.push(Object.defineProperty(this.prototype, prop, {
	          get: getter,
	          configurable: true
	        }));
	      }
	      return results;
	    };

	    CallStackLine.setter = function(map) {
	      var prop, results, setter;
	      results = [];
	      for (prop in map) {
	        setter = map[prop];
	        results.push(Object.defineProperty(this.prototype, prop, {
	          set: setter,
	          configurable: true
	        }));
	      }
	      return results;
	    };

	    function CallStackLine(line) {
	      this.original = line;
	      this["function"] = null;
	      this.source = null;
	      this["class"] = null;
	      this.classPath = null;
	      this.sourceFileName = null;
	      this.sourcePath = null;
	      this.sourceHostWithPort = null;
	      this.sourceLine = 0;
	      this.sourceColumn = 0;
	      if (this.parseLineWithFunction(line)) {

	      } else {
	        this.parseLineWithoutFunction(line);
	      }
	      this.subParseFunction();
	      this.subParseSource();
	    }

	    CallStackLine.prototype.toString = function() {
	      return this.original;
	    };

	    CallStackLine.getter({
	      fileWithLocation: function() {
	        return this._fileWithLocation || (this._fileWithLocation = this.sourceFileName ? this.sourcePath + "/" + this.sourceFileName + ":" + this.sourceLine + ":" + this.sourceColumn : this.original);
	      }
	    });

	    CallStackLine.prototype.parseLineWithFunction = function(line) {
	      var r;
	      if (r = line.match(/\s*at\s((new\s)?[a-zA-Z0-9_.<>]+)\s\(([^)]*):([0-9]+):([0-9]+)\)/)) {
	        this["function"] = r[1];
	        this.source = r[3];
	        this.sourceLine = r[4] | 0;
	        return this.sourceColumn = r[5] | 0;
	      }
	    };

	    CallStackLine.prototype.parseLineWithoutFunction = function(line) {
	      var r;
	      if (r = line.match(/\s*at\s([^)]*):([0-9]+):([0-9]+)/)) {
	        this.source = r[1];
	        this.sourceLine = r[2] | 0;
	        return this.sourceColumn = r[3] | 0;
	      }
	    };

	    CallStackLine.prototype.subParseSource = function() {
	      var url;
	      if (this.source) {
	        url = parseURL(this.source);
	        this.sourceFileName = url.fileName;
	        this.sourcePath = url.path;
	        return this.sourceHostWithPort = url.hostWithPort;
	      }
	    };

	    CallStackLine.prototype.subParseFunction = function() {
	      var f;
	      if (this["function"]) {
	        f = this["function"].split(".");
	        this["function"] = f[f.length - 1];
	        if (this["function"] === "<anonymous>") {
	          this["function"] = void 0;
	        }
	        this["class"] = f[f.length - 2];
	        return this.classPath = f.slice(0, f.length - 2);
	      }
	    };

	    return CallStackLine;

	  })();
	  return CallStack = (function() {
	    function CallStack() {}

	    CallStack.rawCallStack = (new Error).stack ? function(ignoreTop) {
	      if (ignoreTop == null) {
	        ignoreTop = 0;
	      }
	      return (new Error).stack.split(/\n  */).slice(ignoreTop + 2);
	    } : function(ignoreTop) {
	      var e, error;
	      if (ignoreTop == null) {
	        ignoreTop = 0;
	      }
	      try {
	        throw new Error;
	      } catch (error) {
	        e = error;
	        return e.stack.split(/\n  */).slice(ignoreTop + 2);
	      }
	    };

	    CallStack.callStack = function(ignoreTop) {
	      var i, len, line, ref, results;
	      if (ignoreTop == null) {
	        ignoreTop = 0;
	      }
	      ref = Foundation.rawCallStack(ignoreTop + 1);
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        line = ref[i];
	        results.push(new Foundation.CallStackLine(line));
	      }
	      return results;
	    };

	    return CallStack;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var Parse;
	  return Parse = (function() {
	    function Parse() {}

	    Parse.parseQuery = function(qs) {
	      var i, j, key, len, obj, pair, ref, val;
	      if (qs == null) {
	        qs = self.location.search;
	      }
	      obj = {};
	      ref = qs.replace('?', '').split('&');
	      for (j = 0, len = ref.length; j < len; j++) {
	        pair = ref[j];
	        i = pair.indexOf('=');
	        key = pair.slice(0, i);
	        val = pair.slice(i + 1);
	        if (key.length > 0) {
	          obj[key] = decodeURIComponent(val);
	        }
	      }
	      return obj;
	    };

	    Parse.parseUrl = function(url) {
	      var _, a, anchor, fileName, host, hostWithPort, m, password, path, pathName, port, protocol, query, username;
	      m = url.match(/(([A-Za-z]+):(\/\/)?)?(([\-;&=\+\$,\w]+)(:([\-;:&=\+\$,\w]+))?@)?([A-Za-z0-9\.\-]+)(:([0-9]+))?(\/[\+~%\/\.\w\-]*)?(\?([\-\+=&;%@\.\w,]*))?(\#([\.\!\/\\\w]*))?/);
	      if (!m) {
	        return void 0;
	      }
	      _ = m[0], _ = m[1], protocol = m[2], _ = m[3], _ = m[4], username = m[5], _ = m[6], password = m[7], host = m[8], _ = m[9], port = m[10], pathName = m[11], _ = m[12], query = m[13], _ = m[14], anchor = m[15];
	      if (pathName) {
	        a = pathName.split("/");
	        fileName = a[a.length - 1];
	        path = (a.slice(0, a.length - 1)).join("/");
	      }
	      host = host.toLowerCase();
	      hostWithPort = host;
	      if (port) {
	        hostWithPort += ":" + port;
	      }
	      return {
	        protocol: protocol,
	        username: username,
	        password: password,
	        hostWithPort: hostWithPort,
	        host: host,
	        port: port,
	        pathName: pathName,
	        path: path,
	        fileName: fileName,
	        query: query && Parse.query(query),
	        anchor: anchor
	      };
	    };

	    return Parse;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var Unique, nextId;
	  nextId = 1;
	  return Unique = (function() {
	    var nextUniqueObjectId, objectId;

	    function Unique() {}

	    Unique.nextUniqueObjectId = nextUniqueObjectId = function() {
	      return "object_" + nextId++;
	    };

	    Unique.objectId = objectId = function(o) {
	      if (o.hasOwnProperty("__uniqueId")) {
	        return o.__uniqueId || (o.__uniqueId = nextUniqueObjectId());
	      } else {
	        Object.defineProperty(o, "__uniqueId", {
	          enumerable: false,
	          value: nextUniqueObjectId()
	        });
	        return o.__uniqueId;
	      }
	    };

	    Unique.id = function(key) {
	      if (typeof key === "object") {
	        if (key) {
	          if (typeof key.getUniqueId === "function") {
	            return key.getUniqueId();
	          } else {
	            return objectId(key);
	          }
	        } else {
	          return "null";
	        }
	      } else if (typeof key === "number") {
	        return "" + key;
	      } else if (typeof key === "string") {
	        return "string_" + key;
	      } else if (typeof key === "boolean") {
	        if (key) {
	          return "true";
	        } else {
	          return "false";
	        }
	      } else if (key === void 0) {
	        return "undefined";
	      } else {
	        return (typeof key) + "_" + key;
	      }
	    };

	    return Unique;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(FoundationMath, Types) {
	  var String, escapedNonQuoteRegex, escapedQuoteRegex, floor, intRand, isArray, isNumber, isPlainObject, isString, jString;
	  intRand = FoundationMath.intRand;
	  isString = Types.isString, isNumber = Types.isNumber, isPlainObject = Types.isPlainObject, isArray = Types.isArray;
	  jString = self.String;
	  escapedQuoteRegex = /[\\]["]/;
	  escapedNonQuoteRegex = /[\\][^"]/;
	  floor = Math.floor;
	  return String = (function() {
	    var consistentJsonStringify, escapeDoubleQuoteJavascriptString, escapeJavascriptString, pluralize, repeat;

	    function String() {}

	    String.randomString = function(length, chars) {
	      var charsLength, i, result;
	      if (length == null) {
	        length = 32;
	      }
	      if (chars == null) {
	        chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	      }
	      result = '';
	      charsLength = chars.length;
	      return ((function() {
	        var j, ref, results;
	        results = [];
	        for (i = j = 0, ref = length; j < ref; i = j += 1) {
	          results.push(chars[intRand(charsLength)]);
	        }
	        return results;
	      })()).join('');
	    };

	    String.pluralize = pluralize = function(a, b, pluralForm) {
	      if (typeof a === "number") {
	        return a + " " + (a === 1 ? b : pluralForm || pluralize(b));
	      } else {
	        return a + "s";
	      }
	    };

	    String.replaceLast = function(str, find, replaceWith) {
	      var index;
	      index = str.lastIndexOf(find);
	      if (index >= 0) {
	        return str.substring(0, index) + replaceWith + str.substring(index + find.length);
	      } else {
	        return str.toString();
	      }
	    };

	    String.pad = function(str, length, padding) {
	      if (padding == null) {
	        padding = "0";
	      }
	      str = jString(str);
	      return Array(Math.max(length - str.length + 1, 0)).join(padding) + str;
	    };

	    String.capitalize = function(str) {
	      return str.charAt(0).toUpperCase() + str.slice(1);
	    };

	    String.decapitalize = function(str) {
	      return str.charAt(0).toLowerCase() + str.slice(1);
	    };

	    String.upperCamelCase = function(str) {
	      var capWords, word, words;
	      words = str.split('_');
	      capWords = (function() {
	        var j, len, results;
	        results = [];
	        for (j = 0, len = words.length; j < len; j++) {
	          word = words[j];
	          results.push(this.capitalize(word));
	        }
	        return results;
	      }).call(String);
	      return capWords.join("");
	    };

	    String.lowerCamelCase = function(str) {
	      var capWords, word, words;
	      words = str.split('_');
	      capWords = [words[0]].concat((function() {
	        var j, len, ref, results;
	        ref = words.slice(1, words.length);
	        results = [];
	        for (j = 0, len = ref.length; j < len; j++) {
	          word = ref[j];
	          results.push(this.capitalize(word));
	        }
	        return results;
	      }).call(String));
	      return capWords.join("");
	    };

	    String.snakeCase = function(str) {
	      var word;
	      return ((function() {
	        var j, len, ref, results;
	        ref = str.split(/(?=[A-Z])/);
	        results = [];
	        for (j = 0, len = ref.length; j < len; j++) {
	          word = ref[j];
	          results.push(word.toLowerCase());
	        }
	        return results;
	      })()).join("_");
	    };

	    String.escapeDoubleQuoteJavascriptString = escapeDoubleQuoteJavascriptString = function(str) {
	      var s;
	      s = jString(str).replace(/[\\"]/g, "\\$&").replace(/[\0\b\f\n\r\t\v\u2028\u2029]/g, function(x) {
	        switch (x) {
	          case '\0':
	            return "\\0";
	          case '\b':
	            return "\\b";
	          case '\f':
	            return "\\f";
	          case '\n':
	            return "\\n";
	          case '\r':
	            return "\\r";
	          case '\t':
	            return "\\t";
	          case '\v':
	            return "\\v";
	          case '\u2028':
	            return "\\u2028";
	          case '\u2029':
	            return "\\u2029";
	        }
	      });
	      return s = '"' + s + '"';
	    };

	    String.escapeJavascriptString = escapeJavascriptString = function(str) {
	      return JSON.stringify(str);
	    };

	    String.allIndexes = function(str, regex) {
	      var indexes, lastIndex, result;
	      indexes = [];
	      if (!((regex instanceof RegExp) && regex.global)) {
	        throw new Error("regex must be a global RegExp");
	      }
	      regex.lastIndex = 0;
	      while (result = regex.exec(str)) {
	        indexes.push(result.index);
	        lastIndex = result;
	      }
	      return indexes;
	    };

	    String.repeat = repeat = " ".repeat ? function(str, times) {
	      return str.repeat(times);
	    } : function(str, count) {
	      var result;
	      count === floor(count);
	      result = '';
	      if (count > 0 && str.length > 0) {
	        while (true) {
	          if ((count & 1) === 1) {
	            result += str;
	          }
	          count >>>= 1;
	          if (count === 0) {
	            break;
	          }
	          str += str;
	        }
	      }
	      return result;
	    };

	    String.rightAlign = function(str, width) {
	      if (str.length >= width) {
	        return str;
	      } else {
	        return repeat(" ", width - str.length) + str;
	      }
	    };

	    String.eachMatch = function(str, regex, f) {
	      var result;
	      regex.lastIndex = 0;
	      while (result = regex.exec(str)) {
	        f(result);
	      }
	      return null;
	    };

	    String.consistentJsonStringify = consistentJsonStringify = function(object) {
	      var error, k, v;
	      if (object === false || object === true || object === null || isNumber(object)) {
	        return "" + object;
	      } else if (isString(object)) {
	        return escapeJavascriptString(object);
	      } else if (isPlainObject(object)) {
	        return "{" + ((function() {
	          var j, len, ref, results;
	          ref = (Object.keys(object)).sort();
	          results = [];
	          for (j = 0, len = ref.length; j < len; j++) {
	            k = ref[j];
	            if (object[k] !== void 0) {
	              results.push(escapeJavascriptString(k) + ": " + consistentJsonStringify(object[k]));
	            }
	          }
	          return results;
	        })()).join(', ') + "}";
	      } else if (isArray(object)) {
	        return "[" + ((function() {
	          var j, len, results;
	          results = [];
	          for (j = 0, len = object.length; j < len; j++) {
	            v = object[j];
	            results.push(consistentJsonStringify(v));
	          }
	          return results;
	        })()).join(', ') + "]";
	      } else {
	        console.error(error = "invalid object type for Json. Expecting: null, false, true, number, string, plain-object or array", object);
	        throw new Error(error);
	      }
	    };

	    String.splitRuns = function(str) {
	      var ch, chCount, i, j, lastCh, ref, result;
	      if (str.length === 0) {
	        return [];
	      }
	      lastCh = str[0];
	      chCount = 1;
	      result = [];
	      for (i = j = 1, ref = str.length; j < ref; i = j += 1) {
	        ch = str[i];
	        if (ch === lastCh) {
	          chCount++;
	        } else {
	          result.push([lastCh, chCount]);
	          chCount = 1;
	        }
	        lastCh = ch;
	      }
	      result.push([lastCh, chCount]);
	      return result;
	    };

	    String.eachRunAsCharCodes = function(str, f) {
	      var ch, chCount, i, j, lastCh, ref;
	      lastCh = str.charCodeAt(0);
	      chCount = 1;
	      for (i = j = 1, ref = str.length; j < ref; i = j += 1) {
	        ch = str.charCodeAt(i);
	        if (ch === lastCh) {
	          chCount++;
	        } else {
	          f(lastCh, chCount);
	          chCount = 1;
	        }
	        lastCh = ch;
	      }
	      f(lastCh, chCount);
	      return null;
	    };


	    /*
	    TODO: I think this can be generalized to cover most all ellipsies and word-wrap scenarios:
	      a) have an options object with options:
	        maxLength: number         # similar to current maxLength
	        minLength: number         # currently implied to be maxLength / 2, in additional customizable, it would also be optional
	        brokenWordEllipsis: "…"   # used when only part of a word is included
	        moreWordsEllipsis: "…"    # used when there are more words, but the last word is whole
	        wordLengthFunction: (string) -> string.length
	           * can be replaced with, say, the font pixel-width for a string
	           * in this way, this function can be used by text-layout
	           * minLength and maxLength would then be in pixels
	        breakWords: false         # currently, this is effectively true - will break the last word on line in most situations
	        breakOnlyWord: true       # even if breakWords is false, if this is the only word on the line and it doesn't fit, should we break it?
	                                   * should this even be an option?
	         * future:
	        wordBreakFunction: (word, maxLength) -> shorterWord
	           * given a word and the maximum length of that word, returns
	           * a word <= maxLength according to wordLengthFunction
	    
	      b) Use cases
	        - TextLayout - uses pixels for length rather than characters
	        - Art.Engine.Element 'flow' layout
	          - if the input was an array of "words" and
	          - wordLengthFunction returns the Element's width...
	          I think this works. We'd need a way to handle margins though. I think this works:
	            spaceLength: (leftWord, rightWord) -> 1
	        - Shortend user display names:
	          Options:
	            wordBreakFunction: (word, maxLength) -> word[0]
	            brokenWordEllipsis: "." or ""
	          Example Output:
	            "Shane Delamore", 10 > "Shane D." or
	            "Shane Delamore", 10 > "Shane D"
	          Or, just leave breakwords: false and get:
	            "Shane Delamore", 10 > "Shane"
	    
	      c) returns both the output string and the "string remaining" - everything not included
	      d) alternate input: an array of strings already broken up by words - the "remainging" return value would then also be an array of "words"
	        (this would be for efficiency when doing multi-line layout)
	    
	    Right now, it works as follows:
	    The output string is guaranteed to be:
	      <= maxLength
	      >= maxLength / 2 in almost all secenarios as long as inputString is >= maxLength / 2
	     */

	    String.humanFriendlyShorten = function(inputString, maxLength) {
	      var j, len, minLength, part, string, stringParts;
	      if (!(maxLength > 0)) {
	        throw new error("maxLength must be > 0");
	      }
	      inputString = inputString.trim();
	      if (!(inputString.length > maxLength)) {
	        return inputString;
	      }
	      minLength = maxLength / 2;
	      stringParts = inputString.split(/\s+/);
	      string = "";
	      for (j = 0, len = stringParts.length; j < len; j++) {
	        part = stringParts[j];
	        if (string.length === 0) {
	          string = part;
	        } else if ((string.length < minLength) || string.length + part.length + 2 <= maxLength) {
	          string += " " + part;
	        } else {
	          break;
	        }
	      }
	      if (string.length > maxLength) {
	        string = string.slice(0, maxLength - 1).trim();
	      }
	      return string + "…";
	    };

	    return String;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	/*
	This current iteration of clone relies on some singleton variables shared across all invocations of clone.
	This is fine as long as javascript stays single-threaded.
	It also introduces a little bit of uglyness initializing clonedMap necessitating the "top" variable.

	FUTURE
	A potentially better solution would be to create a new closer each time clone is called at the top-most level,
	but when recursing, pass in a new function bound to that closure which is different from the global clone function.

	populateClone would need to take an additional argument - the clone function to use for recursive cloning.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var ShallowClone;
	  return ShallowClone = (function() {
	    function ShallowClone() {}

	    ShallowClone.extendClone = function(obj) {
	      if (obj.constructor === Array) {
	        return obj.slice();
	      } else {
	        return Object.create(obj);
	      }
	    };

	    ShallowClone.shallowClone = function(obj) {
	      var k, ret, v;
	      if (!obj) {
	        return obj;
	      }
	      if (obj.constructor === Array) {
	        return obj.slice();
	      } else {
	        ret = {};
	        for (k in obj) {
	          v = obj[k];
	          ret[k] = v;
	        }
	        return ret;
	      }
	    };

	    return ShallowClone;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	/*
	Map is a Key-Value map which preserves order.

	Unlike Javascript objects, you can use any object or value as keys. This includes:

	  Strings
	  Numbers
	  null
	  undefined
	  Arrays
	  Objects

	Arrays and Objects are assigned a unique id using the Foundation.Unique library.
	"0", "", null, undefined and 0 are all different unique keys and can each have unique values.
	 */
	var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(15), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Foundation, Unique, BaseObject) {
	  var Map, Node, i, j, len, v;
	  for (i = j = 0, len = arguments.length; j < len; i = ++j) {
	    v = arguments[i];
	    if (!v) {
	      throw new Error("require didn't load argument number #" + i);
	    }
	  }
	  Node = (function() {
	    function Node(key, value, prev, next) {
	      this.key = key;
	      this.value = value;
	      this.prev = prev || null;
	      this.next = next || null;
	      if (prev) {
	        prev.next = this;
	      }
	      if (next) {
	        next.prev = this;
	      }
	    }

	    Node.prototype.remove = function() {
	      var n, p;
	      n = this.next;
	      p = this.prev;
	      if (p) {
	        p.next = n;
	        this.prev = null;
	      }
	      if (n) {
	        n.prev = p;
	        return this.next = null;
	      }
	    };

	    return Node;

	  })();
	  return Map = (function(superClass) {
	    extend(Map, superClass);

	    Map.inverseMap = function(array) {
	      var k, l, len1, result;
	      result = new Map;
	      for (k = l = 0, len1 = array.length; l < len1; k = ++l) {
	        v = array[k];
	        result.set(v, k);
	      }
	      return result;
	    };

	    function Map() {
	      this._length = 0;
	      this._map = {};
	      this._first = this._last = null;
	    }

	    Map.getter({
	      length: function() {
	        return this._length;
	      },
	      nodes: function() {
	        var n, result;
	        result = [];
	        n = this._first;
	        while (n) {
	          result.push(n);
	          n = n.next;
	        }
	        return result;
	      },
	      keys: function() {
	        var l, len1, node, ref, results;
	        ref = this.nodes;
	        results = [];
	        for (l = 0, len1 = ref.length; l < len1; l++) {
	          node = ref[l];
	          results.push(node.key);
	        }
	        return results;
	      },
	      values: function() {
	        var l, len1, node, ref, results;
	        ref = this.nodes;
	        results = [];
	        for (l = 0, len1 = ref.length; l < len1; l++) {
	          node = ref[l];
	          results.push(node.value);
	        }
	        return results;
	      }
	    });

	    Map.prototype.get = function(key) {
	      var node;
	      node = this._map[Unique.id(key)];
	      return node && node.value;
	    };

	    Map.prototype.set = function(key, value) {
	      var id;
	      id = Unique.id(key);
	      if (this._map[id]) {
	        this._map[id].value = value;
	      } else {
	        this._length++;
	        this._last = this._map[id] = new Node(key, value, this._last);
	        if (!this._first) {
	          this._first = this._last;
	        }
	      }
	      return value;
	    };

	    Map.prototype._remove = function(key) {
	      var id, n;
	      id = Unique.id(key);
	      if (n = this._map[id]) {
	        this._length--;
	        delete this._map[id];
	        if (this._first === n) {
	          this._first = n.next;
	        }
	        if (this._last === n) {
	          this._last = n.prev;
	        }
	        n.remove();
	        return n;
	      } else {
	        return void 0;
	      }
	    };

	    Map.prototype.remove = function(key) {
	      var n;
	      if (n = this._remove(key)) {
	        return n.value;
	      } else {
	        return void 0;
	      }
	    };

	    Map.prototype["delete"] = function(key) {
	      return !!this._remove(key);
	    };

	    Map.prototype.exists = function(key) {
	      return this._map[Unique.id(key)];
	    };

	    Map.prototype.forEach = function(f) {
	      var l, len1, node, ref;
	      ref = this.nodes;
	      for (l = 0, len1 = ref.length; l < len1; l++) {
	        node = ref[l];
	        f(node.value);
	      }
	      return this;
	    };

	    Map.prototype.findFirst = function(testF) {
	      var l, len1, node, ref;
	      ref = this.nodes;
	      for (l = 0, len1 = ref.length; l < len1; l++) {
	        node = ref[l];
	        if (testF(node.value)) {
	          return node.value;
	        }
	      }
	      return void 0;
	    };

	    Map.prototype.each = function(f) {
	      var l, len1, node, ref;
	      ref = this.nodes;
	      for (l = 0, len1 = ref.length; l < len1; l++) {
	        node = ref[l];
	        f(node.key, node.value);
	      }
	      return this;
	    };

	    Map.prototype.map = function(f) {
	      var l, len1, node, ref, results;
	      ref = this.nodes;
	      results = [];
	      for (l = 0, len1 = ref.length; l < len1; l++) {
	        node = ref[l];
	        results.push(f(node.key, node.value));
	      }
	      return results;
	    };

	    Map.prototype.inspect = function(inspector) {
	      var _inspect, first;
	      _inspect = function(o) {
	        if (typeof o === "string" && o.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) {
	          return inspector.put(o);
	        } else {
	          return inspector.inspect(o);
	        }
	      };
	      inspector.put("{Map ");
	      first = true;
	      this.map(function(k, v) {
	        if (!first) {
	          inspector.put(", ");
	        }
	        _inspect(k);
	        inspector.put(": ");
	        inspector.inspect(v);
	        return first = false;
	      });
	      return inspector.put("}");
	    };

	    Map.prototype.verifyNodes = function() {
	      var inspect, length, node, prev;
	      inspect = Foundation.Inspect.inspect;
	      if ((this._first == null) && (this._last == null) && this._length === 0) {
	        return;
	      }
	      if (this._length === 0 && this._first) {
	        throw new Error("length == " + this.length + " but @_first is not null");
	      }
	      if (this._length === 0 && this._last) {
	        throw new Error("length == " + this.length + " but @_last is not null");
	      }
	      if (!this._first) {
	        throw new Error("length == " + this.length + " and @_first is null");
	      }
	      if (!this._last) {
	        throw new Error("length == " + this.length + " and @_last is null");
	      }
	      if (this._first.prev) {
	        throw new Error("@_first has prev");
	      }
	      if (this._last.next) {
	        throw new Error("@_last has next");
	      }
	      length = 0;
	      prev = null;
	      node = this._first;
	      while (node) {
	        length++;
	        if (node.prev !== prev) {
	          throw new Error("node.prev != prev. " + (inspect({
	            lenght: length,
	            nodePrev: node.prev,
	            prev: prev
	          }, 1)));
	        }
	        prev = node;
	        node = node.next;
	      }
	      if (this.length !== length) {
	        throw new Error("@length is " + this.length + ", but it should be " + length);
	      }
	    };

	    return Map;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(12), __webpack_require__(6), __webpack_require__(16), __webpack_require__(18), __webpack_require__(20)], __WEBPACK_AMD_DEFINE_RESULT__ = function(BaseObject, Types, StringExtensions, Map, Inspected) {
	  var Inspector2, escapeJavascriptString, isArray, isBrowserObject, isClass, isDate, isFunction, isHTMLImageElement, isObject, isPlainObject, isRegExp, isString, objectName, parentString;
	  escapeJavascriptString = StringExtensions.escapeJavascriptString;
	  isString = Types.isString, isArray = Types.isArray, isFunction = Types.isFunction, isObject = Types.isObject, isPlainObject = Types.isPlainObject, isClass = Types.isClass, isDate = Types.isDate, isRegExp = Types.isRegExp, objectName = Types.objectName, isBrowserObject = Types.isBrowserObject;
	  isHTMLImageElement = function(obj) {
	    return obj instanceof HTMLImageElement;
	  };
	  parentString = (function(_this) {
	    return function(distance) {
	      switch (distance) {
	        case 0:
	          return "parent";
	        case 1:
	          return "grandparent";
	        case 2:
	          return "great grandparent";
	        default:
	          return "great^" + (distance - 1) + " grandparent";
	      }
	    };
	  })(this);
	  return Inspector2 = (function(superClass) {
	    extend(Inspector2, superClass);

	    function Inspector2(options) {
	      if (options == null) {
	        options = {};
	      }
	      this.inspectObject = bind(this.inspectObject, this);
	      this.inspectWithToImage = bind(this.inspectWithToImage, this);
	      this.inspectHTMLImageElement = bind(this.inspectHTMLImageElement, this);
	      this.inspectArray = bind(this.inspectArray, this);
	      this.withImages = options.withImages;
	      this.maxLength = options.maxLength || 1000;
	      this.allowCustomInspectors = !options.noCustomInspectors;
	      this.maxDepth = options.maxDepth != null ? options.maxDepth : 10;
	      this.outArray = [];
	      this.length = 0;
	      this.depth = 0;
	      this.inspectingMap = new Map;
	    }

	    Inspector2.prototype.inspectArray = function(array) {
	      var a;
	      return new Inspected.Array((function() {
	        var i, len, results;
	        results = [];
	        for (i = 0, len = array.length; i < len; i++) {
	          a = array[i];
	          results.push(this.inspectInternal(a));
	        }
	        return results;
	      }).call(this));
	    };

	    Inspector2.prototype.inspectHTMLImageElement = function(obj) {
	      var res;
	      res = new Inspected.Object({}, "HTMLImageElement", obj);
	      if (!(res.image = obj).complete) {
	        this.addPendingTask();
	        obj.onload = (function(_this) {
	          return function() {
	            return _this.completePendingTask();
	          };
	        })(this);
	      }
	      return res;
	    };

	    Inspector2.prototype.inspectWithToImage = function(obj) {
	      var name, res;
	      name = objectName(obj);
	      if (typeof obj.classPathName === "string") {
	        name = obj.classPathName;
	      }
	      if (name === "Object") {
	        name = null;
	      }
	      res = new Inspected.Object({}, name, obj);
	      this.addPendingTask();
	      obj.toImage((function(_this) {
	        return function(image) {
	          res.image = image;
	          return _this.completePendingTask();
	        };
	      })(this));
	      return res;
	    };

	    Inspector2.prototype.inspectObject = function(obj, recurse) {
	      var attributes, i, k, keys, len, name, res, result;
	      if (recurse == null) {
	        recurse = true;
	      }
	      attributes = [];
	      keys = Object.keys(obj);
	      name = objectName(obj);
	      if (isFunction(obj) && keys.length === 0) {
	        return new Inspected.Core(name + "()");
	      } else {
	        if (typeof obj.classPathName === "string") {
	          name = obj.classPathName;
	        }
	        if (name === "Object") {
	          name = null;
	        }
	        result = {};
	        if (recurse) {
	          for (i = 0, len = keys.length; i < len; i++) {
	            k = keys[i];
	            result[k] = this.inspectInternal(obj[k]);
	          }
	        }
	        res = new Inspected.Object(result, name, obj);
	        if (typeof obj.inspect2 === "function") {
	          res.inspected = obj.inspect2();
	        }
	        return res;
	      }
	    };

	    Inspector2.prototype.addPendingTask = function() {
	      return this.pendingTasks++;
	    };

	    Inspector2.prototype.completePendingTask = function() {
	      this.pendingTasks--;
	      if (this.pendingTasks === 0) {
	        return this.completionCallBack();
	      }
	    };

	    Inspector2.prototype.inspectByType = function(obj) {
	      if (isFunction(obj != null ? obj.inspectStructure : void 0)) {
	        obj = obj.inspectStructure();
	      }
	      if (obj === null || obj === void 0 || obj === true || obj === false || typeof obj === "number") {
	        return new Inspected.Core(obj);
	      } else if (obj === self) {
	        return new Inspected.Core("self");
	      } else if (isRegExp(obj)) {
	        return new Inspected.Core(obj.toString());
	      } else if (isString(obj)) {
	        return new Inspected.String(obj);
	      } else if (isArray(obj)) {
	        return this.inspectArray(obj);
	      } else if (isClass(obj)) {
	        return new Inspected.Core(objectName(obj));
	      } else if (isHTMLImageElement(obj)) {
	        return this.inspectHTMLImageElement(obj);
	      } else if (isDate(obj)) {
	        return new Inspected.Core(obj.toString());
	      } else if (isBrowserObject(obj)) {
	        return new Inspected.Core(objectName(obj));
	      } else if (this.withImages && typeof obj.toImage === "function" && !isFunction(obj)) {
	        return this.inspectWithToImage(obj);
	      } else if (isPlainObject(obj) || isFunction(obj)) {
	        return this.inspectObject(obj);
	      } else if (isObject(obj)) {
	        return this.inspectObject(obj, false);
	      } else {
	        return new Inspected.Core(objectName(obj));
	      }
	    };

	    Inspector2.prototype.inspectInternal = function(obj) {
	      var objDepth, res;
	      if (objDepth = this.inspectingMap.get(obj)) {
	        return new Inspected.Core("<" + (parentString(this.depth - objDepth)) + ">");
	      } else if (this.depth >= this.maxDepth) {
	        return new Inspected.Core("<maxDepth reached: " + this.maxDepth + ">");
	      } else {
	        this.depth++;
	        this.inspectingMap.set(obj, this.depth);
	        res = this.inspectByType(obj);
	        this.inspectingMap["delete"](obj);
	        this.depth--;
	        return res;
	      }
	    };

	    Inspector2.prototype.inspect = function(obj, callBack) {
	      var res;
	      this.pendingTasks = 0;
	      if (this.withImages && typeof callBack !== "function") {
	        throw new Error("callBack required if withImages requested");
	      }
	      this.completionCallBack = (function(_this) {
	        return function() {
	          return callBack && callBack(res);
	        };
	      })(this);
	      res = this.inspectInternal(obj);
	      if (this.pendingTasks === 0) {
	        this.completionCallBack();
	      }
	      return res;
	    };

	    return Inspector2;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Inspected;

	module.exports = Inspected = __webpack_require__(21);

	Inspected.Array = __webpack_require__(22);

	Inspected.Core = __webpack_require__(23);

	Inspected.Object = __webpack_require__(24);

	Inspected.String = __webpack_require__(25);

	Inspected.finishLoad(["Array", "Core", "Object", "String"]);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Inspect,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Inspect = __webpack_require__(10);

	module.exports = Inspect.Inspected || (Inspect.Inspected = (function(superClass) {
	  extend(Inspected, superClass);

	  function Inspected() {
	    return Inspected.__super__.constructor.apply(this, arguments);
	  }

	  Inspected.namespace = Inspect;

	  Inspected.namespacePath = "Neptune.Art.Foundation.Inspect.Inspected";

	  return Inspected;

	})(Neptune.Base));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(21), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Inspected, BaseObject) {
	  return Inspected.Array = (function(superClass) {
	    extend(Array, superClass);

	    function Array(inspectedArray) {
	      Array.__super__.constructor.apply(this, arguments);
	      this.array = inspectedArray;
	    }

	    Array.getter({
	      arrayOfStrings: function() {
	        var i, len, ref, results, v;
	        ref = this.array;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          v = ref[i];
	          results.push(v.toString());
	        }
	        return results;
	      },
	      children: function() {
	        return this.array.slice();
	      }
	    });

	    Array.prototype.delimitedString = function(delimiter) {
	      if (delimiter == null) {
	        delimiter = ", ";
	      }
	      return this.arrayOfStrings.join(", ");
	    };

	    Array.prototype.toString = function() {
	      return "[" + (this.delimitedString()) + "]";
	    };

	    return Array;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(21), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Inspected, BaseObject) {
	  return Inspected.Core = (function(superClass) {
	    extend(Core, superClass);

	    function Core(value) {
	      Core.__super__.constructor.apply(this, arguments);
	      this.value = value;
	      if (value && value.constructor.name === "HTMLImageElement") {
	        this.image = value;
	      }
	    }

	    Core.getter({
	      children: function() {
	        return null;
	      }
	    });

	    Core.prototype.toString = function() {
	      return "" + this.value;
	    };

	    return Core;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(21), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Inspected, BaseObject) {
	  return Inspected.Object = (function(superClass) {
	    extend(Object, superClass);

	    function Object(properties, instanceOf, originalObject) {
	      this.properties = properties;
	      this.instanceOf = instanceOf;
	      this.originalObject = originalObject;
	      Object.__super__.constructor.apply(this, arguments);
	      this.length = this.properties ? self.Object.keys(this.properties).length : 0;
	    }

	    Object.getter({
	      arrayOfStrings: function() {
	        var k, ref, results, v;
	        ref = this.properties;
	        results = [];
	        for (k in ref) {
	          v = ref[k];
	          results.push(k + ": " + v);
	        }
	        return results;
	      },
	      children: function() {
	        var k, ref, ret, v;
	        ret = {};
	        ref = this.properties;
	        for (k in ref) {
	          v = ref[k];
	          ret[k] = v;
	        }
	        return ret;
	      }
	    });

	    Object.prototype.delimitedString = function(delimiter) {
	      if (delimiter == null) {
	        delimiter = ", ";
	      }
	      return this.arrayOfStrings.join(", ");
	    };

	    Object.prototype.toString = function() {
	      if (this.inspected) {
	        return this.inspected;
	      } else if (this.instanceOf) {
	        return "{" + this.instanceOf + " " + (this.delimitedString()) + "}";
	      } else {
	        return "{" + (this.delimitedString()) + "}";
	      }
	    };

	    return Object;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(21), __webpack_require__(12), __webpack_require__(1), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Inspected, BaseObject, Foundation) {
	  return Inspected.String = (function(superClass) {
	    extend(String, superClass);

	    function String(clonedString) {
	      String.__super__.constructor.apply(this, arguments);
	      this.string = clonedString;
	    }

	    String.prototype.toString = function() {
	      return Foundation.String.escapeJavascriptString(this.string);
	    };

	    return String;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(10), __webpack_require__(6), __webpack_require__(11), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Foundation, Inspect, Types, Inspector) {
	  var customInspectable, inspect, inspectLean, isArray, isFunction, isObject, isString;
	  isString = Types.isString, isArray = Types.isArray, isFunction = Types.isFunction, isObject = Types.isObject;
	  customInspectable = (function(_this) {
	    return function(obj) {
	      return obj && obj.inspect2 && !(typeof obj === "function");
	    };
	  })(this);
	  Inspect.miniInspect = (function(_this) {
	    return function(obj) {
	      if (obj == null) {
	        return "" + obj;
	      } else if (customInspectable(obj)) {
	        return inspect(obj);
	      } else if (isString(obj)) {
	        return Foundation.String.escapeJavascriptString(obj);
	      } else if (isArray(obj)) {
	        return "<<Array length: " + obj.length + ">>";
	      } else if (isFunction(obj) && obj.name === "") {
	        return "<<function args: " + obj.length + ">>";
	      } else {
	        return ("<<" + (typeof obj) + ": ") + (obj.name ? obj.name : obj) + ">>";
	      }
	    };
	  })(this);
	  inspectLean = Inspect.inspectLean = (function(_this) {
	    return function(obj, options) {
	      var i, inspected, k, keys, last, v;
	      if (customInspectable(obj)) {
	        return obj.inspect2();
	      } else if (isObject(obj)) {
	        keys = Object.keys(obj);
	        last = keys.length - 1;
	        inspected = (function() {
	          var j, len, results;
	          results = [];
	          for (i = j = 0, len = keys.length; j < len; i = ++j) {
	            k = keys[i];
	            v = obj[k];
	            v = i === last ? inspectLean(v, options) : inspect(v, options);
	            if (!Inspector.unquotablePropertyRegex.test(k)) {
	              k = inspect(k);
	            }
	            results.push(k + ": " + v);
	          }
	          return results;
	        })();
	        return inspected.join(', ');
	      } else {
	        return inspect(obj, options);
	      }
	    };
	  })(this);
	  return inspect = Inspect.inspect = (function(_this) {
	    return function(obj, options) {
	      var inspector;
	      if (options == null) {
	        options = {};
	      }
	      inspector = new Inspector(options);
	      inspector.inspect(obj);
	      return inspector.result;
	    };
	  })(this);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(FoundationMath, Log) {
	  var ArrayExtensions, arraySlice, bound, doFlattenInternal, flattenIfNeeded, intRand, isArguments, isArray, isArrayOrArguments, javascriptArrayPrototype, keepAll, log, max, moveArrayElement1, moveArrayElement2, needsFlatteningOrCompacting;
	  bound = FoundationMath.bound, max = FoundationMath.max, intRand = FoundationMath.intRand;
	  log = Log.log;
	  javascriptArrayPrototype = Array.prototype;
	  arraySlice = Array.prototype.slice;
	  isArguments = function(o) {
	    return o.constructor === Object && (typeof o.callee === "function") && (typeof o.length === "number");
	  };
	  isArrayOrArguments = function(o) {
	    return o && (o.constructor === Array || isArguments(o));
	  };
	  isArray = function(o) {
	    return o && o.constructor === Array;
	  };
	  doFlattenInternal = function(array, keepTester, output) {
	    var a, len1, p;
	    output || (output = []);
	    for (p = 0, len1 = array.length; p < len1; p++) {
	      a = array[p];
	      if (isArrayOrArguments(a)) {
	        flattenIfNeeded(a, keepTester, output);
	      } else if (keepTester(a)) {
	        output.push(a);
	      }
	    }
	    return output;
	  };
	  needsFlatteningOrCompacting = function(array, keepTester) {
	    var a, len1, p;
	    for (p = 0, len1 = array.length; p < len1; p++) {
	      a = array[p];
	      if (isArrayOrArguments(a) || !keepTester(a)) {
	        return true;
	      }
	    }
	    return false;
	  };
	  keepAll = function() {
	    return true;
	  };
	  flattenIfNeeded = function(array, keepTester, output) {
	    var len1, p, v;
	    if (keepTester == null) {
	      keepTester = keepAll;
	    }
	    if (needsFlatteningOrCompacting(array, keepTester)) {
	      return doFlattenInternal(array, keepTester, output);
	    } else if (output) {
	      for (p = 0, len1 = array.length; p < len1; p++) {
	        v = array[p];
	        output.push(v);
	      }
	      return output;
	    } else if (array.constructor !== Array) {
	      return arraySlice.call(array);
	    } else {
	      return array;
	    }
	  };
	  moveArrayElement1 = function(array, from, to) {
	    array.splice(to, 0, array[from]);
	    return array;
	  };
	  moveArrayElement2 = function(array, from, to) {
	    var i, p, q, ref, ref1, ref2, ref3, tmp;
	    tmp = array[from];
	    if (from < to) {
	      for (i = p = ref = from, ref1 = to - 1; p <= ref1; i = p += 1) {
	        array[i] = array[i + 1];
	      }
	    } else {
	      for (i = q = ref2 = from, ref3 = to + 1; q <= ref3; i = q += 1) {
	        array[i] = array[i - 1];
	      }
	    }
	    array[to] = tmp;
	    return array;
	  };
	  return ArrayExtensions = (function() {
	    var basicCompareFunction, compact, discardNullAndUndefined, flatten, keepIfRubyTrue, longestCommonSubsequence, randomElement;

	    function ArrayExtensions() {}


	    /*
	    Useful compact and compactFlatten keepTester functions
	     */

	    ArrayExtensions.keepAll = keepAll = function() {
	      return true;
	    };

	    ArrayExtensions.discardNullAndUndefined = discardNullAndUndefined = function(a) {
	      return a !== void 0 && a !== null;
	    };

	    ArrayExtensions.keepIfRubyTrue = keepIfRubyTrue = function(a) {
	      return a !== void 0 && a !== null && a !== false;
	    };

	    ArrayExtensions.peek = function(array, offset) {
	      if (offset == null) {
	        offset = -1;
	      }
	      if (array) {
	        return array[array.length + offset];
	      } else {
	        return void 0;
	      }
	    };

	    basicCompareFunction = function(a, b) {
	      return a - b;
	    };


	    /*
	    findSortedFirst
	    
	    Acts as-if it sorted the array and returned the first element.
	    
	    Details:
	      tests each element in the array againts the current "smallest"
	      returns the element for which tests "smaller" than every other
	      element a is "smaller" than b if compareFunction(a, b) returns >0 value
	    
	    IN:
	      array - the array to search or null
	      compareFunction - (a, b) -> # standard compare function
	        returns:
	          0: if a and b are equal
	          <0: if b is greater than a
	          >0: if a is greater than b
	        default: (a, b) -> a - b
	    
	    OUT:
	      largest value in array or undefined if array is null or length 0
	     */

	    ArrayExtensions.findSortedFirst = function(array, compareFunction) {
	      var element, i, p, ref, returnElement;
	      if (compareFunction == null) {
	        compareFunction = basicCompareFunction;
	      }
	      if (!((array != null ? array.length : void 0) > 0)) {
	        return void 0;
	      }
	      log("findSortedFirst");
	      returnElement = array[0];
	      for (i = p = 1, ref = array.length; p < ref; i = p += 1) {
	        if (0 < compareFunction(returnElement, element = array[i])) {
	          returnElement = element;
	        }
	      }
	      return returnElement;
	    };

	    ArrayExtensions.first = function(array) {
	      return array[0];
	    };

	    ArrayExtensions.second = function(array) {
	      return array[1];
	    };

	    ArrayExtensions.third = function(array) {
	      return array[2];
	    };

	    ArrayExtensions.forth = function(array) {
	      return array[3];
	    };

	    ArrayExtensions.fifth = function(array) {
	      return array[4];
	    };

	    ArrayExtensions.last = function(array) {
	      if (array) {
	        return array[array.length - 1];
	      } else {
	        return void 0;
	      }
	    };

	    ArrayExtensions.compact = compact = function(array, keepTester) {
	      var a, len1, p;
	      if (keepTester == null) {
	        keepTester = discardNullAndUndefined;
	      }
	      for (p = 0, len1 = array.length; p < len1; p++) {
	        a = array[p];
	        if (!keepTester(a)) {
	          return (function() {
	            var len2, q, results;
	            results = [];
	            for (q = 0, len2 = array.length; q < len2; q++) {
	              a = array[q];
	              if (keepTester(a)) {
	                results.push(a);
	              }
	            }
	            return results;
	          })();
	        }
	      }
	      return array;
	    };

	    ArrayExtensions.pushIfNotPresent = function(array, item) {
	      if (indexOf.call(array, item) >= 0) {
	        return false;
	      } else {
	        array.push(item);
	        return true;
	      }
	    };

	    ArrayExtensions.randomElement = randomElement = function(array, fromFirstN) {
	      if (fromFirstN == null) {
	        fromFirstN = array.length;
	      }
	      return array[Math.random() * fromFirstN | 0];
	    };

	    ArrayExtensions.randomSort = function(array) {
	      var a, i, j, len, p, ref;
	      len = array.length;
	      for (i = p = ref = len - 1; p >= 0; i = p += -1) {
	        j = intRand(i);
	        a = array[i];
	        array[i] = array[j];
	        array[j] = a;
	      }
	      return array;
	    };

	    ArrayExtensions.flatten = flatten = function(firstArg) {
	      return flattenIfNeeded(arguments.length === 1 ? isArrayOrArguments(firstArg) ? firstArg : [firstArg] : arguments);
	    };

	    ArrayExtensions.compactFlatten = function(array, keepTester) {
	      if (keepTester == null) {
	        keepTester = discardNullAndUndefined;
	      }
	      return flattenIfNeeded(array, keepTester);
	    };

	    ArrayExtensions.insert = function(array, index, item) {
	      if (index < 0) {
	        index = array.length + index + 1;
	      }
	      array.splice(index, 0, item);
	      array;
	      return array;
	    };

	    ArrayExtensions.withInserted = function(array, index, item) {
	      return ArrayExtensions.insert(array.slice(), index, item);
	    };

	    ArrayExtensions.remove = function(array, index, amount) {
	      if (amount == null) {
	        amount = 1;
	      }
	      if (index < 0) {
	        index = array.length + index + 1;
	      }
	      array.splice(index, amount);
	      return array;
	    };

	    ArrayExtensions.removeFirstMatch = function(array, toMatchValue) {
	      var index;
	      index = array.indexOf(toMatchValue);
	      if (index >= 0) {
	        return ArrayExtensions.remove(array, index);
	      } else {
	        return array;
	      }
	    };

	    ArrayExtensions.arrayWithout = function(array, index, amount) {
	      if (amount == null) {
	        amount = 1;
	      }
	      return ArrayExtensions.remove(array.slice(), index, amount);
	    };

	    ArrayExtensions.arrayWithoutValue = function(array, value) {
	      return ArrayExtensions.remove(array.slice(), array.indexOf(value), 1);
	    };

	    ArrayExtensions.arrayWith = function(array, value) {
	      if (!array) {
	        return [value];
	      }
	      array = array.slice();
	      array.push(value);
	      return array;
	    };

	    ArrayExtensions.truncatedArrayWith = function(array, length, value) {
	      if (!array) {
	        return [value];
	      }
	      array = array.slice(0, length);
	      array.push(value);
	      return array;
	    };

	    ArrayExtensions.poppedArray = function(array) {
	      return array.slice(0, array.length - 1);
	    };

	    ArrayExtensions.arrayWithOne = function(array, value) {
	      if (!array) {
	        return [value];
	      }
	      array = array.slice();
	      if (indexOf.call(array, value) < 0) {
	        array.push(value);
	      }
	      return array;
	    };

	    ArrayExtensions.slice = function(a, b, c) {
	      return arraySlice.call(a, b, c);
	    };

	    ArrayExtensions.shuffleArray = function(a) {
	      var i, j, t;
	      i = a.length;
	      while (--i > 0) {
	        j = ~~(Math.random() * (i + 1));
	        t = a[j];
	        a[j] = a[i];
	        a[i] = t;
	      }
	      return a;
	    };

	    ArrayExtensions.moveArrayElement1 = moveArrayElement1;

	    ArrayExtensions.moveArrayElement2 = moveArrayElement2;

	    ArrayExtensions.moveArrayElement = function(array, from, to) {
	      from = bound(0, from | 0, array.length(-1));
	      to = bound(0, to | 0, array.length(-1));
	      if (Math.abs(from - to) > 300) {
	        return moveArrayElement1(array, from, to);
	      } else {
	        return moveArrayElement2(array, from, to);
	      }
	    };

	    ArrayExtensions.stableSort = function(array, compare) {
	      var a, b, i, length, notSorted, p, ref;
	      compare || (compare = function(a, b) {
	        return a - b;
	      });
	      notSorted = true;
	      length = array.length;
	      while (notSorted) {
	        notSorted = false;
	        for (i = p = 1, ref = length; p < ref; i = p += 1) {
	          if (compare(a = array[i - 1], b = array[i]) > 0) {
	            array[i - 1] = b;
	            array[i] = a;
	            notSorted = true;
	          }
	        }
	      }
	      return array;
	    };

	    ArrayExtensions.longestCommonSubsequence = longestCommonSubsequence = function(a, b) {
	      var c, diag, i, j, latch, lcs, left, m, n, p, q, r, ref, ref1, ref2, row, s;
	      lcs = [];
	      row = [];
	      c = [];
	      if (m < n) {
	        s = a;
	        a = b;
	        b = s;
	      }
	      m = a.length;
	      n = b.length;
	      for (j = p = 0, ref = n; p < ref; j = p += 1) {
	        row[j] = 0;
	      }
	      for (i = q = 0, ref1 = m; q < ref1; i = q += 1) {
	        c[i] = row = row.slice();
	        diag = 0;
	        for (j = r = 0, ref2 = n - 1; r <= ref2; j = r += 1) {
	          latch = row[j];
	          if (a[i] === b[j]) {
	            row[j] = diag + 1;
	          } else {
	            left = row[j - 1] || 0;
	            if (left > row[j]) {
	              row[j] = left;
	            }
	          }
	          diag = latch;
	        }
	      }
	      i--;
	      j--;
	      while (i > -1 && j > -1) {
	        switch (c[i][j]) {
	          case i && c[i - 1][j]:
	            i--;
	            continue;
	          case j && c[i][j - 1]:
	            j--;
	            break;
	          default:
	            j--;
	            lcs.unshift(a[i]);
	            i--;
	            continue;
	        }
	      }
	      return lcs;
	    };

	    ArrayExtensions.minimumOrderedOverlappingMerge = function(a, b) {
	      var ai, bj, c, ck, i, j, k, l, m, n, o, out;
	      c = longestCommonSubsequence(a, b);
	      m = a.length;
	      n = b.length;
	      o = c.length;
	      out = new Array(n);
	      i = 0;
	      j = 0;
	      k = 0;
	      l = 0;
	      while (i < m && j < n && k < o) {
	        ai = a[i];
	        bj = b[j];
	        ck = c[k];
	        if (ai === ck && bj === ck) {
	          i++;
	          j++;
	          k++;
	          out[l++] = ai;
	        } else if (ai !== ck) {
	          i++;
	          if (indexOf.call(b, ai) < 0) {
	            out[l++] = ai;
	          }
	        } else {
	          j++;
	          out[l++] = bj;
	        }
	      }
	      while (i < m) {
	        ai = a[i++];
	        if (indexOf.call(b, ai) < 0) {
	          out[l++] = ai;
	        }
	      }
	      while (j < n) {
	        out[l++] = b[j++];
	      }
	      return out;
	    };

	    return ArrayExtensions;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var slice = [].slice,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Array) {
	  var Hash, compactFlatten;
	  compactFlatten = Array.compactFlatten;
	  return Hash = (function() {
	    var defaultEq, mergeInto;

	    function Hash() {}

	    Hash.countKeys = function(o) {
	      return Object.keys(o).length;
	    };

	    defaultEq = function(a, b) {
	      return a === b;
	    };

	    Hash.objectDiff = function(o1, o2, added, removed, changed, nochange, eq, o2KeyCount) {
	      var k, o1KeyCount, o2KeyCountIsAtLeast, v1, v2;
	      if (eq == null) {
	        eq = defaultEq;
	      }
	      o2KeyCountIsAtLeast = 0;
	      o1KeyCount = 0;
	      for (k in o1) {
	        v1 = o1[k];
	        o1KeyCount++;
	        if (typeof (v2 = o2[k]) !== "undefined" || o2.hasOwnProperty(k)) {
	          o2KeyCountIsAtLeast++;
	          if (!eq(v1, v2)) {
	            changed(k, v1, v2);
	          } else {
	            if (typeof nochange === "function") {
	              nochange(k, v1);
	            }
	          }
	        } else {
	          added(k, v1);
	        }
	      }
	      if (!(o2KeyCount != null) || o2KeyCountIsAtLeast !== o2KeyCount) {
	        for (k in o2) {
	          if (!(typeof o1[k] !== "undefined" || o1.hasOwnProperty(k))) {
	            removed(k, o2[k]);
	          }
	        }
	      }
	      return o1KeyCount;
	    };

	    Hash.objectWithout = function() {
	      var fields, k, o, result, v;
	      o = arguments[0], fields = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      result = {};
	      for (k in o) {
	        v = o[k];
	        if (indexOf.call(compactFlatten(fields), k) < 0) {
	          result[k] = v;
	        }
	      }
	      return result;
	    };

	    Hash.objectKeyCount = function(o) {
	      var count, k, v;
	      count = 0;
	      for (k in o) {
	        v = o[k];
	        count++;
	      }
	      return count;
	    };


	    /*
	    
	    merge "flattens" its arguments and then adds all keys from all objects in
	    the list into a new object which is returned.
	    
	    return: new object
	    
	    The first object's keys are added first. If two or more objects have the same
	    keys, the value set in the result is the last object's in the list with that key.
	     */

	    Hash.merge = function() {
	      return mergeInto({}, arguments);
	    };


	    /*
	    The same as 'merge' with one difference:
	    
	    Instead of a new object, all objects are merged into the first object in the list.
	    
	    return: first object in the flattened list
	    return: null if no source objects
	     */

	    Hash.mergeInto = mergeInto = function() {
	      var i, j, k, ref, result, source, sources, v;
	      sources = compactFlatten(arguments);
	      if (sources.length === 0) {
	        return null;
	      }
	      result = sources[0] || {};
	      for (i = j = 1, ref = sources.length; j < ref; i = j += 1) {
	        source = sources[i];
	        for (k in source) {
	          v = source[k];
	          result[k] = v;
	        }
	      }
	      return result;
	    };

	    Hash.hasAllProps = function(o1, o2) {
	      var k, v;
	      for (k in o1) {
	        v = o1[k];
	        if (!o2.hasOwnProperty(k)) {
	          return false;
	        }
	      }
	      return true;
	    };

	    Hash.pureMerge = function() {
	      var j, last, len, source, sources;
	      sources = compactFlatten(arguments);
	      if (sources.length === 0) {
	        return null;
	      }
	      if (sources.length === 1) {
	        return sources[0];
	      }
	      last = sources[sources.length - 1];
	      for (j = 0, len = sources.length; j < len; j++) {
	        source = sources[j];
	        if (source !== last) {
	          if (!Hash.hasAllProps(source, last)) {
	            return Hash.merge(sources);
	          }
	        }
	      }
	      return last;
	    };

	    Hash.select = function() {
	      var j, len, obj, prop, properties, ref, result, v;
	      obj = arguments[0], properties = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      result = {};
	      ref = compactFlatten(properties);
	      for (j = 0, len = ref.length; j < len; j++) {
	        prop = ref[j];
	        if (v = obj[prop] || obj.hasOwnProperty(prop)) {
	          result[prop] = v;
	        }
	      }
	      return result;
	    };

	    Hash.selectAll = function() {
	      var j, len, obj, prop, properties, ref, result;
	      obj = arguments[0], properties = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      result = {};
	      ref = compactFlatten(properties);
	      for (j = 0, len = ref.length; j < len; j++) {
	        prop = ref[j];
	        result[prop] = obj[prop];
	      }
	      return result;
	    };

	    Hash.objectWithout = function() {
	      var anythingToDo, j, len, obj, prop, properties, result, v;
	      obj = arguments[0], properties = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      if (properties.length === 1 && !(typeof properties[0] === "string")) {
	        properties = properties[0];
	      }
	      anythingToDo = false;
	      for (j = 0, len = properties.length; j < len; j++) {
	        prop = properties[j];
	        if (obj.hasOwnProperty(prop)) {
	          anythingToDo = true;
	          break;
	        }
	      }
	      if (anythingToDo) {
	        result = {};
	        for (prop in obj) {
	          v = obj[prop];
	          if (indexOf.call(properties, prop) < 0) {
	            result[prop] = v;
	          }
	        }
	        return result;
	      } else {
	        return obj;
	      }
	    };

	    return Hash;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	/*
	This current iteration of clone relies on some singleton variables shared across all invocations of clone.
	This is fine as long as javascript stays single-threaded.
	It also introduces a little bit of uglyness initializing clonedMap necessitating the "top" variable.

	FUTURE
	A potentially better solution would be to create a new closer each time clone is called at the top-most level,
	but when recursing, pass in a new function bound to that closure which is different from the global clone function.

	populateClone would need to take an additional argument - the clone function to use for recursive cloning.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(18), __webpack_require__(15), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Foundation, Map, Unique, Inspect) {
	  var byProperties, byStructure, clone, cloneArray, cloneByProperties, cloneByStructure, cloneObject, clonedMap, emptyClone, inspect, topObject, uniquePropertyName;
	  uniquePropertyName = Unique.PropertyName;
	  inspect = Inspect.inspect;
	  clonedMap = null;
	  byStructure = false;
	  byProperties = false;
	  topObject = null;
	  emptyClone = function(obj) {
	    if (obj.constructor === Array) {
	      return [];
	    } else {
	      return Object.create(Object.getPrototypeOf(obj));
	    }
	  };
	  clone = function(obj, mode) {
	    var clonedObject, got;
	    switch (mode) {
	      case "byStructure":
	        byStructure = true;
	        break;
	      case "byProperties":
	        byProperties = true;
	    }
	    if (obj === null || obj === void 0 || typeof obj !== "object") {
	      return obj;
	    }
	    if (byStructure && (obj.constructor !== Array && obj.constructor !== Object)) {
	      return obj;
	    }
	    if (clonedMap) {
	      if (got = clonedMap.get(obj)) {
	        return got;
	      }
	    } else {
	      topObject = obj;
	      clonedMap = new Map;
	    }
	    clonedObject = obj.constructor === Array ? cloneArray(obj) : cloneObject(obj);
	    if (topObject === obj) {
	      byStructure = false;
	      byProperties = false;
	      topObject = null;
	      clonedMap = null;
	    }
	    return clonedObject;
	  };
	  cloneArray = function(array) {
	    var clonedArray, i, index, len, value;
	    clonedArray = clonedMap.set(array, array.slice());
	    for (index = i = 0, len = clonedArray.length; i < len; index = ++i) {
	      value = clonedArray[index];
	      clonedArray[index] = clone(value);
	    }
	    return clonedArray;
	  };
	  cloneObject = function(obj) {
	    var clonedObject, k, v;
	    clonedObject = clonedMap.set(obj, emptyClone(obj));
	    if ((obj !== topObject || !byProperties) && obj.populateClone) {
	      obj.populateClone(clonedObject);
	    } else {
	      for (k in obj) {
	        v = obj[k];
	        clonedObject[k] = clone(v);
	      }
	    }
	    return clonedObject;
	  };
	  cloneByProperties = function(obj) {
	    return clone(obj, "byProperties");
	  };
	  cloneByStructure = function(obj) {
	    return clone(obj, "byStructure");
	  };
	  Foundation.TestMe = (function() {
	    function TestMe() {
	      this.count || (this.count = 1);
	      this.count += 1;
	    }

	    return TestMe;

	  })();
	  return Foundation.Clone = (function() {
	    function Clone() {}

	    Clone.emptyClone = emptyClone;

	    Clone.clone = clone;

	    Clone.cloneByProperties = cloneByProperties;

	    Clone.cloneByStructure = cloneByStructure;

	    return Clone;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Log, Math) {
	  var Time, base, commaize, dateSecondMinusPerformanceSecond, initDateSecond, initPerformanceSecond, log;
	  log = Log.log;
	  commaize = Math.commaize;
	  self.performance || (self.performance = {});
	  (base = self.performance).now || (base.now = self.performance.mozNow || self.performance.msNow || self.performance.oNow || self.performance.webkitNow || function() {
	    return new Date().getTime();
	  });
	  initPerformanceSecond = self.performance.now() / 1000;
	  initDateSecond = new Date().getTime() / 1000;
	  dateSecondMinusPerformanceSecond = initDateSecond - initPerformanceSecond;
	  return Time = (function() {
	    var currentSecond, multiples, timerStack;

	    function Time() {}

	    multiples = [["mo", 30 * 24 * 60 * 60], ["d", 24 * 60 * 60], ["h", 60 * 60], ["m", 60], ["s", 1], ["ms", .001], ["μs", .000001], ["ns", .000000001]];

	    Time.dateSecondToPerformanceSecond = function(dateSecond) {
	      return dateSecond - dateSecondMinusPerformanceSecond;
	    };

	    Time.performanceSecondToDateSecond = function(performanceSecond) {
	      return performanceSecond + dateSecondMinusPerformanceSecond;
	    };

	    Time.timeStampToPerformanceSecond = function(htmlEventTimeStamp) {
	      return htmlEventTimeStamp / 1000 - dateSecondMinusPerformanceSecond;
	    };

	    Time.durationString = function(seconds) {
	      var i, len, multiplier, name, ref;
	      for (i = 0, len = multiples.length; i < len; i++) {
	        ref = multiples[i], name = ref[0], multiplier = ref[1];
	        if (seconds >= multiplier) {
	          return "" + ((seconds / multiplier) | 0) + name;
	        }
	      }
	      return "0";
	    };

	    Time.dateAgeInSeconds = function(date) {
	      return ((new Date) - date) * .001;
	    };

	    Time.dateToSeconds = function(date) {
	      return post.getTime() * .001;
	    };

	    Time.perTimeString = function(secondsPerRun) {
	      var perTime;
	      perTime = 1 / secondsPerRun;
	      if (perTime > 100) {
	        return (commaize(perTime | 0)) + "/s";
	      } else if (perTime * 60 > 100) {
	        return (commaize(perTime * 60 | 0)) + "/m";
	      } else {
	        return (commaize(perTime * 3600 | 0)) + "/h";
	      }
	    };

	    Time.currentMillisecond = function() {
	      return self.performance.now();
	    };

	    Time.currentSecond = currentSecond = function() {
	      return self.performance.now() / 1000;
	    };

	    Time.currentDateSecond = function() {
	      return new Date().getTime() / 1000;
	    };

	    Time.time = function(a, b) {
	      var f, fResult, start, timeResult;
	      f = b || a;
	      start = currentSecond();
	      fResult = f();
	      timeResult = currentSecond() - start;
	      if (b) {
	        log("time: " + a + " took " + (Time.durationString(timeResult)));
	        return fResult;
	      } else {
	        return timeResult;
	      }
	    };

	    timerStack = [];

	    Time.stackTime = function(f) {
	      var start, subTimeTotal, timeResult, tsl;
	      start = currentSecond();
	      timerStack.push(0);
	      f();
	      subTimeTotal = timerStack.pop();
	      timeResult = currentSecond() - start;
	      if ((tsl = timerStack.length) > 0) {
	        timerStack[tsl - 1] += timeResult;
	      }
	      return {
	        count: 1,
	        total: timeResult,
	        subTimeTotal: subTimeTotal,
	        remainder: timeResult - subTimeTotal
	      };
	    };

	    Time.logTimeSinceLast = function(a) {
	      var time;
	      time = Time.currentSecond();
	      log(a + " (" + (Time.lastTime ? Time.durationString(time - Time.lastTime) : void 0) + ")");
	      return Time.lastTime = time;
	    };

	    return Time;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var Function;
	  return Function = (function() {
	    function Function() {}

	    Function.fastBind = function(fn, _this) {
	      switch (fn.length) {
	        case 0:
	          return function() {
	            return fn.call(_this);
	          };
	        case 1:
	          return function(a) {
	            return fn.call(_this, a);
	          };
	        case 2:
	          return function(a, b) {
	            return fn.call(_this, a, b);
	          };
	        case 3:
	          return function(a, b, c) {
	            return fn.call(_this, a, b, c);
	          };
	        case 4:
	          return function(a, b, c, d) {
	            return fn.call(_this, a, b, c, d);
	          };
	        case 5:
	          return function(a, b, c, d, e) {
	            return fn.call(_this, a, b, c, d, e);
	          };
	        case 6:
	          return function(a, b, c, d, e, f) {
	            return fn.call(_this, a, b, c, d, e, f);
	          };
	        case 7:
	          return function(a, b, c, d, e, f, g) {
	            return fn.call(_this, a, b, c, d, e, f, g);
	          };
	        case 8:
	          return function(a, b, c, d, e, f, g, h) {
	            return fn.call(_this, a, b, c, d, e, f, g, h);
	          };
	        case 9:
	          return function(a, b, c, d, e, f, g, h, i) {
	            return fn.call(_this, a, b, c, d, e, f, g, h, i);
	          };
	        case 10:
	          return function(a, b, c, d, e, f, g, h, i, j) {
	            return fn.call(_this, a, b, c, d, e, f, g, h, i, j);
	          };
	        default:
	          return function() {
	            return fn.apply(_this, arguments);
	          };
	      }
	    };

	    return Function;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var Async;

	module.exports = Async = __webpack_require__(33);

	Async.All = __webpack_require__(34);

	Async.Basic = __webpack_require__(35);

	Async.Join = __webpack_require__(36);

	Async.Sequence = __webpack_require__(37);

	Async.finishLoad(["All", "Basic", "Join", "Sequence"]);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(1);

	module.exports = Foundation.Async || (Foundation.Async = (function(superClass) {
	  extend(Async, superClass);

	  function Async() {
	    return Async.__super__.constructor.apply(this, arguments);
	  }

	  Async.namespace = Foundation;

	  Async.namespacePath = "Neptune.Art.Foundation.Async";

	  return Async;

	})(Neptune.Base));


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(33), __webpack_require__(35), __webpack_require__(36), __webpack_require__(37)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Async, Basic) {
	  var All, addAll;
	  addAll = function(klass) {
	    var k, results, v;
	    results = [];
	    for (k in klass) {
	      v = klass[k];
	      if (Async[k]) {
	        console.log("addAll to Foundation: conflict on " + k + " from " + klass.name);
	      }
	      results.push(Async[k] = v);
	    }
	    return results;
	  };
	  addAll(Basic);
	  return All = (function(superClass) {
	    extend(All, superClass);

	    function All() {
	      return All.__super__.constructor.apply(this, arguments);
	    }

	    return All;

	  })(Async);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Log) {
	  var Basic, log;
	  log = Log.log;
	  return Basic = (function() {
	    var timeout;

	    function Basic() {}

	    Basic.timeout = timeout = function(ms, f) {
	      return setTimeout(f, ms);
	    };

	    Basic.requestAnimationFrame = self.requestAnimationFrame || self.webkitRequestAnimationFrame || self.mozRequestAnimationFrame || self.oRequestAnimationFrame || self.msRequestAnimationFrame || function(f) {
	      return setTimeout(f, 1000 / 60);
	    };

	    Basic.nextTick = function(f) {
	      return timeout(0, f);
	    };

	    Basic.throwErrorOutOfStack = function(e) {
	      return timeout(0, function() {
	        throw e;
	      });
	    };

	    Basic.evalAndThrowErrorsOutOfStack = function(f) {
	      var e, error;
	      try {
	        return f();
	      } catch (error) {
	        e = error;
	        console.error(e.stack);
	        return Basic.throwErrorOutOfStack(e);
	      }
	    };

	    return Basic;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(12), __webpack_require__(35)], __WEBPACK_AMD_DEFINE_RESULT__ = function(BaseObject, Basic) {
	  var Join, nextTick;
	  nextTick = Basic.nextTick;
	  return Join = (function(superClass) {
	    extend(Join, superClass);

	    function Join(onJoin) {
	      Join.__super__.constructor.apply(this, arguments);
	      this.onJoin = onJoin;
	      this.results = [];
	      this.functions = [];
	      this.resultsPending = 0;
	    }

	    Join.prototype.join = function(onJoin) {
	      this.onJoin = onJoin;
	      if (!this.startQueued) {
	        return this.queueStart();
	      }
	    };

	    Join.prototype["do"] = function() {
	      var f, i, len;
	      if (this.started) {
	        throw new Error("already started");
	      }
	      for (i = 0, len = arguments.length; i < len; i++) {
	        f = arguments[i];
	        this.functions.push(f);
	      }
	      if (!this.startQueued) {
	        return this.queueStart();
	      }
	    };

	    Join.prototype.queueStart = function() {
	      this.startQueued = true;
	      return nextTick((function(_this) {
	        return function() {
	          return _this.start();
	        };
	      })(this));
	    };

	    Join.prototype.start = function() {
	      var f, i, len, ref, resultIndex, results;
	      if (this.functions.length === 0) {
	        return this.onJoin(this.results);
	      }
	      this.started = true;
	      this.results = new Array(this.functions.length);
	      this.resultsPending = this.functions.length;
	      ref = this.functions;
	      results = [];
	      for (resultIndex = i = 0, len = ref.length; i < len; resultIndex = ++i) {
	        f = ref[resultIndex];
	        results.push((function(_this) {
	          return function(f, resultIndex) {
	            if (f.length > 0) {
	              return f(function(result) {
	                return _this.jobDone(resultIndex, result);
	              });
	            } else {
	              return _this.jobDone(resultIndex, f());
	            }
	          };
	        })(this)(f, resultIndex));
	      }
	      return results;
	    };

	    Join.prototype.jobDone = function(resultIndex, result) {
	      this.results[resultIndex] = result;
	      this.resultsPending--;
	      if (this.resultsPending === 0) {
	        return this.onJoin(this.results);
	      }
	    };

	    return Join;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(12), __webpack_require__(35)], __WEBPACK_AMD_DEFINE_RESULT__ = function(BaseObject, Basic) {
	  var Sequence, nextTick;
	  nextTick = Basic.nextTick;
	  return Sequence = (function(superClass) {
	    extend(Sequence, superClass);

	    function Sequence() {
	      Sequence.__super__.constructor.apply(this, arguments);
	      this.toExecute = [];
	      this.resultIndex = 0;
	      this.results = [];
	      this.nextQueued = false;
	    }

	    Sequence.prototype["do"] = function() {
	      var f, j, len;
	      for (j = 0, len = arguments.length; j < len; j++) {
	        f = arguments[j];
	        if (f.length > 0) {
	          this.addAsyncFunction(f);
	        } else {
	          this.addSyncFunction(f);
	        }
	      }
	      return this.executeNext();
	    };

	    Sequence.prototype.join = function(f) {
	      var j, len;
	      for (j = 0, len = arguments.length; j < len; j++) {
	        f = arguments[j];
	        if (f.length > 0) {
	          this.addAsyncJoinFunction(f);
	        } else {
	          this.addJoinFunction(f);
	        }
	      }
	      return this.executeNext();
	    };

	    Sequence.prototype.addAsyncFunction = function(f) {
	      var i;
	      i = this.resultIndex++;
	      return this.toExecute.push((function(_this) {
	        return function() {
	          return f(function(result) {
	            _this.results[i] = result;
	            _this.executeNext();
	            return result;
	          });
	        };
	      })(this));
	    };

	    Sequence.prototype.addSyncFunction = function(f) {
	      var i;
	      i = this.resultIndex++;
	      return this.toExecute.push((function(_this) {
	        return function() {
	          _this.results[i] = f();
	          return _this.executeNext();
	        };
	      })(this));
	    };

	    Sequence.prototype.addJoinFunction = function(f) {
	      return this.toExecute.push((function(_this) {
	        return function() {
	          f(_this.results);
	          return _this.executeNext();
	        };
	      })(this));
	    };

	    Sequence.prototype.addAsyncJoinFunction = function(f) {
	      return this.toExecute.push((function(_this) {
	        return function() {
	          return f(_this.results, function() {
	            return _this.executeNext();
	          });
	        };
	      })(this));
	    };

	    Sequence.prototype.executeNext = function() {
	      if (this.nextQueued) {
	        return;
	      }
	      this.nextQueued = true;
	      return nextTick((function(_this) {
	        return function() {
	          var next;
	          _this.nextQueued = false;
	          if (_this.toExecute.length > 0) {
	            next = _this.toExecute[0];
	            _this.toExecute = _this.toExecute.slice(1);
	            return next();
	          }
	        };
	      })(this));
	    };

	    return Sequence;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Foundation) {
	  return Foundation.Ruby = (function() {
	    function Ruby() {}

	    Ruby.rubyTrue = function(a) {
	      return a !== void 0 && a !== null && a !== false;
	    };

	    Ruby.rubyFalse = function(a) {
	      return a === void 0 || a === null || a === false;
	    };

	    Ruby.rubyOr = function(a, b) {
	      if (a != null) {
	        return a;
	      } else {
	        return b;
	      }
	    };

	    Ruby.rubyAnd = function(a, b) {
	      if (a != null) {
	        return b;
	      } else {
	        return a;
	      }
	    };

	    Ruby.reopenInstanceProps = function(klass, instanceProps) {
	      var k, results, v;
	      results = [];
	      for (k in instanceProps) {
	        if (!hasProp.call(instanceProps, k)) continue;
	        v = instanceProps[k];
	        results.push(klass.prototype[k] = v);
	      }
	      return results;
	    };

	    Ruby.reopenClassProps = function(klass, classProps) {
	      var k, results, v;
	      results = [];
	      for (k in classProps) {
	        if (!hasProp.call(classProps, k)) continue;
	        v = classProps[k];
	        results.push(klass[k] = v);
	      }
	      return results;
	    };

	    return Ruby;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(40)], __WEBPACK_AMD_DEFINE_RESULT__ = function(PromiseLib) {
	  var ArtPromise, Promise;
	  Promise = self.Promise || PromiseLib.Promise;

	  /*
	  ArtPromise extends ES6 Promises in the following ways:
	  
	  - constructing a promise with no parameters is allowed
	  - promise.resolve and promise.reject are supported as
	    alternative ways to resolve or reject a promise
	  
	  If native promises are supported, they are used,
	  otherwise a polyfill is used.
	   */
	  return ArtPromise = (function() {
	    ArtPromise.all = Promise.all;

	    ArtPromise.race = Promise.race;

	    ArtPromise.reject = Promise.reject;

	    ArtPromise.resolve = Promise.resolve;

	    function ArtPromise(_function) {
	      this.resolve = this.reject = null;
	      this._nativePromise = null;
	      this._nativePromise = new Promise((function(_this) {
	        return function(resolve, reject) {
	          _this.resolve = resolve;
	          _this.reject = reject;
	          return typeof _function === "function" ? _function(_this.resolve, _this.reject) : void 0;
	        };
	      })(this));
	    }

	    ArtPromise.prototype.then = function(a, b) {
	      return this._nativePromise.then(a, b);
	    };

	    ArtPromise.prototype["catch"] = function(a) {
	      return this._nativePromise["catch"](a);
	    };

	    return ArtPromise;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.0.2
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$toString = {}.toString;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(43);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);

	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;

	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;

	        enumerator._init();

	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };

	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;

	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;

	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }

	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

	    var lib$es6$promise$promise$$counter = 0;

	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }

	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }

	        lib$es6$promise$$internal$$initializePromise(this, resolver);
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;

	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }

	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;

	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$asap(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }

	        return child;
	      },

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(44)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41), (function() { return this; }()), __webpack_require__(42)(module)))

/***/ },
/* 41 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 43 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Log, BaseObject) {
	  var WebWorker, log;
	  log = Log.log;

	  /*
	  SRC:
	    http://jsfiddle.net/uqcFM/49/
	    http://stackoverflow.com/a/10372280/2121000
	   */
	  return WebWorker = (function() {
	    var startWorkerFromJsString;

	    function WebWorker() {}

	    WebWorker.echoWebWorker = "self.onmessage=function(e){postMessage('Worker: '+e.data);}";

	    WebWorker.isBrowser = !!(self.window && self.navigator && self.document);

	    WebWorker.isWebWorker = !WebWorker.isBrowser && self.importScripts;

	    WebWorker.startWorkerFromJsString = startWorkerFromJsString = function(workerSource) {
	      return new Worker(URL.createObjectURL(new Blob([workerSource], {
	        type: 'application/javascript'
	      })));
	    };

	    WebWorker.startWorkerFromFunction = function(workerFunction) {
	      return startWorkerFromJsString("(" + workerFunction + ")();");
	    };

	    return WebWorker;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(12), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(BaseObject, Inspect) {
	  var Analytics, inspect;
	  inspect = Inspect.inspectLean;
	  return Analytics = (function(superClass) {
	    extend(Analytics, superClass);

	    function Analytics() {
	      return Analytics.__super__.constructor.apply(this, arguments);
	    }

	    Analytics.defaultCategory = "Foundation.Analytics";

	    Analytics.event = function(options) {
	      var action, category, label, noninteraction, value;
	      if (options == null) {
	        options = {};
	      }
	      category = options.category || this.defaultCategory;
	      action = options.action;
	      label = options.label;
	      value = options.value;
	      noninteraction = !!options.noninteraction;
	      if (self._gaq) {
	        self._gaq.push(['_trackEvent', category, action, label, value, noninteraction]);
	        return this.rawLog("ANALYTICS-EVENT: " + (inspect(options)));
	      } else {
	        return this.rawLog("(no)ANALYTICS-EVENT: " + (inspect(options)));
	      }
	    };

	    return Analytics;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(28)], __WEBPACK_AMD_DEFINE_RESULT__ = function(arg, arg1) {
	  var BaseModule, log, mergeInto;
	  log = arg.log;
	  mergeInto = arg1.mergeInto;

	  /*
	  TODO:
	    BaseModule should be with BaseObject
	    BaseObject should be renamed BaseClass
	  
	    Some of BaseObject's code should be shared with BaseModule via a common extended parent class.
	      - getPrototypePropertyExtendedByInheritance
	  
	    BaseObject should maintain a list of all included modules:
	      - should prevent including a module twice
	      - should call each module's constructor from BaseObject's constructor
	      -
	   */
	  return BaseModule = (function() {
	    function BaseModule() {}


	    /*
	    TODO: @_getters should work with inheritance. Right now, an inheriting class's @getter
	    declarations will add to the top-mose inheriting from class with getters!
	     */

	    BaseModule.getter = function(getters) {
	      return this._getters = mergeInto(this._getters, getters);
	    };

	    BaseModule.setter = function(setters) {
	      return this._setters = mergeInto(this._setters, setters);
	    };


	    /*
	    this/@: the module
	    IN:
	      includedInto: the BaseObject-extending-class this module was included into
	     */

	    BaseModule.included = function(includedInto) {
	      if (this._getters) {
	        includedInto.getter(this._getters);
	      }
	      if (this._setters) {
	        return includedInto.setter(this._setters);
	      }
	    };

	    return BaseModule;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(12), __webpack_require__(7), __webpack_require__(9), __webpack_require__(32)], __WEBPACK_AMD_DEFINE_RESULT__ = function(BaseObject, Log, Inspect, Async) {
	  var BatchLoader, inspect, log, nextTick, timeout;
	  inspect = Inspect.inspect;
	  log = Log.log;
	  nextTick = Async.nextTick, timeout = Async.timeout;
	  return BatchLoader = (function(superClass) {
	    extend(BatchLoader, superClass);

	    function BatchLoader(loadFunction) {
	      this.assets = {};
	      this.loadingAssets = {};
	      this.loadFunction = loadFunction;
	    }

	    BatchLoader.prototype.load = function(sources, onLoad) {
	      if (typeof sources === "string") {
	        sources = [sources];
	      }
	      return this.loadAssets(sources, onLoad);
	    };

	    BatchLoader.prototype.addAsset = function(source, asset) {
	      var base;
	      if (asset == null) {
	        throw new Error("not a valid asset: " + (inspect(asset)));
	      }
	      delete this.loadingAssets[source];
	      (base = this.assets)[source] || (base[source] = asset);
	      return this.notifyListeners();
	    };

	    BatchLoader.getter({
	      blankInfo: function() {
	        return {
	          loadedFromCache: 0,
	          loadedAsynchronously: 0,
	          alreadyLoadingAsynchronously: 0
	        };
	      }
	    });

	    BatchLoader.prototype.loadAssets = function(sources, onLoad) {
	      var info;
	      info = this.blankInfo;
	      sources.forEach((function(_this) {
	        return function(src) {
	          if (_this.assets[src] != null) {
	            return info.loadedFromCache++;
	          } else if (_this.loadingAssets[src]) {
	            info.loadedAsynchronously++;
	            return info.alreadyLoadingAsynchronously++;
	          } else {
	            info.loadedAsynchronously++;
	            _this.loadingAssets[src] = true;
	            return _this.loadFunction(src, function(src, asset) {
	              return _this.addAsset(src, asset);
	            });
	          }
	        };
	      })(this));
	      this.addLoaderListener(sources, onLoad, info);
	      return nextTick((function(_this) {
	        return function() {
	          return _this.notifyListeners();
	        };
	      })(this));
	    };

	    BatchLoader.prototype.addLoaderListener = function(sources, onLoad, info) {
	      this.loadingListeners || (this.loadingListeners = []);
	      return this.loadingListeners.push({
	        sources: sources,
	        onLoad: onLoad,
	        info: info
	      });
	    };

	    BatchLoader.prototype.notifyListeners = function() {
	      var allLoaded, i, j, len, len1, listener, oldloadingListeners, ref, source;
	      if (!this.loadingListeners) {
	        return;
	      }
	      oldloadingListeners = this.loadingListeners;
	      this.loadingListeners = [];
	      for (i = 0, len = oldloadingListeners.length; i < len; i++) {
	        listener = oldloadingListeners[i];
	        allLoaded = true;
	        ref = listener.sources;
	        for (j = 0, len1 = ref.length; j < len1; j++) {
	          source = ref[j];
	          if (!this.assets[source]) {
	            allLoaded = false;
	          }
	        }
	        if (allLoaded) {
	          listener.onLoad(this.assets, listener.sources, listener.info);
	        } else {
	          this.loadingListeners.push(listener);
	        }
	      }
	      return this.loadingListeners;
	    };

	    return BatchLoader;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(12), __webpack_require__(32), __webpack_require__(9), __webpack_require__(39)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Foundation, BaseObject, Async, Inspect, Promise) {
	  var Epoch, evalAndThrowErrorsOutOfStack, inspect, requestAnimationFrame;
	  requestAnimationFrame = Async.requestAnimationFrame, evalAndThrowErrorsOutOfStack = Async.evalAndThrowErrorsOutOfStack;
	  inspect = Inspect.inspect;
	  return Epoch = (function(superClass) {
	    extend(Epoch, superClass);

	    function Epoch(options) {
	      if (options == null) {
	        options = {};
	      }
	      Epoch.__super__.constructor.apply(this, arguments);
	      this._emptyQueueAfterProcessing = !!options.emptyQueueAfterProcessing;
	      this._queuedItems = [];
	      this._nextReadyQueue = [];
	      this._epochQueued = false;
	      this._processingEpoch = false;
	      this._epochCount = 0;
	    }

	    Epoch.propGetter("processingEpoch", "epochQueued", "epochCount", "emptyQueueAfterProcessing");

	    Epoch.getter({
	      epochLength: function() {
	        return this._queuedItems.length + this._nextReadyQueue.length;
	      }
	    });

	    Epoch.prototype.updateGlobalCounts = function() {
	      Foundation.globalCount(this["class"].name + "_queuedItems", this._queuedItems.length);
	      return Foundation.globalCount(this["class"].name + "_nextReadyQueue", this._nextReadyQueue.length);
	    };

	    Epoch.prototype.onNextReady = function(f) {
	      if (f) {
	        if (typeof f !== "function") {
	          throw new Error("not a function: " + (inspect(f)));
	        }
	        if (!this._processingEpoch) {
	          this.queueNextEpoch();
	        }
	        return this._nextReadyQueue.push(f);
	      } else {
	        return new Promise((function(_this) {
	          return function(resolve) {
	            return _this._nextReadyQueue.push(function() {
	              return resolve();
	            });
	          };
	        })(this));
	      }
	    };

	    Epoch.prototype._ready = function() {
	      var f, i, len, nrq, results;
	      if (!((nrq = this._nextReadyQueue).length > 0)) {
	        return;
	      }
	      this._nextReadyQueue = [];
	      results = [];
	      for (i = 0, len = nrq.length; i < len; i++) {
	        f = nrq[i];
	        results.push(evalAndThrowErrorsOutOfStack((function(_this) {
	          return function() {
	            return f();
	          };
	        })(this)));
	      }
	      return results;
	    };

	    Epoch.prototype.queueItem = function(item) {
	      if (item) {
	        this._queuedItems.push(item);
	        this.queueNextEpoch();
	      }
	      return item;
	    };

	    Epoch.prototype.isItemQueued = function(item) {
	      return indexOf.call(this._queuedItems, item) >= 0;
	    };

	    Epoch.prototype.queueNextEpoch = function() {
	      if (!this._epochQueued) {
	        this._epochQueued = true;
	        return requestAnimationFrame((function(_this) {
	          return function() {
	            _this._epochQueued = false;
	            return _this.processEpoch();
	          };
	        })(this));
	      }
	    };

	    Epoch.prototype.flushEpochNow = function() {
	      return this.processEpoch();
	    };

	    Epoch.prototype.processEpoch = function() {
	      var items;
	      this._processingEpoch = true;
	      items = this._queuedItems;
	      if (this._emptyQueueAfterProcessing) {
	        this.processEpochItemsWithErrorHandling(items);
	        this._queuedItems = [];
	      } else {
	        this._queuedItems = [];
	        this.processEpochItemsWithErrorHandling(items);
	      }
	      this._processingEpoch = false;
	      this._epochCount++;
	      return this._ready();
	    };

	    Epoch.prototype.processEpochItemsWithErrorHandling = function(items) {
	      return evalAndThrowErrorsOutOfStack((function(_this) {
	        return function() {
	          return _this.processEpochItems(items);
	        };
	      })(this));
	    };

	    Epoch.prototype.processEpochItems = function(items) {
	      var i, item, len, results;
	      results = [];
	      for (i = 0, len = items.length; i < len; i++) {
	        item = items[i];
	        results.push(item());
	      }
	      return results;
	    };

	    return Epoch;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Foundation, BaseObject) {
	  return Foundation.JsonStore = (function(superClass) {
	    extend(JsonStore, superClass);

	    function JsonStore(store) {
	      if (store == null) {
	        store = localStorage;
	      }
	      this.store = store;
	    }

	    JsonStore.prototype.setItem = function(k, v) {
	      return this.store.setItem(k, JSON.stringify(v));
	    };

	    JsonStore.prototype.getItem = function(k) {
	      return JSON.parse(this.store.getItem(k));
	    };

	    JsonStore.prototype.removeItem = function(k) {
	      return this.store.removeItem(k);
	    };

	    JsonStore.prototype.clear = function() {
	      return this.store.clear();
	    };

	    JsonStore.prototype.key = function(k) {
	      return this.store.key(k);
	    };

	    JsonStore.getter({
	      length: function() {
	        return this.store.length;
	      }
	    });

	    return JsonStore;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(9), __webpack_require__(32)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Log, Inspect, Async) {
	  var EventStackNode, SequencedEventManager, nextTick, rawLog;
	  rawLog = Log.rawLog;
	  nextTick = Async.nextTick;
	  EventStackNode = (function() {
	    function EventStackNode(eventFunction, options, parent) {
	      this["catch"] = options != null ? options["catch"] : void 0;
	      this.parent = parent;
	      this.eventFunction = eventFunction;
	      this.nextSubNode = null;
	      this.lastSubNode = null;
	      this.nextPeer = null;
	      this.done = false;
	      this.started = false;
	    }

	    EventStackNode.prototype.addSubNode = function(node) {
	      node.parent = this;
	      if (!this.lastSubNode) {
	        return this.lastSubNode = this.nextSubNode = node;
	      } else {
	        this.lastSubNode.nextPeer = node;
	        return this.lastSubNode = node;
	      }
	    };

	    EventStackNode.prototype.queue = function(eventFunction, options) {
	      return this.addSubNode(new EventStackNode(eventFunction, options));
	    };

	    EventStackNode.prototype.evaluateFunction = function() {
	      var error, error1;
	      try {
	        SequencedEventManager.currentNode = this;
	        return this.eventFunction();
	      } catch (error1) {
	        error = error1;
	        return SequencedEventManager["throw"](error);
	      }
	    };

	    EventStackNode.prototype.topmostParent = function() {
	      var parent;
	      parent = this;
	      while (parent.parent) {
	        parent = parent.parent;
	      }
	      return parent;
	    };

	    EventStackNode.prototype.notDoneParent = function() {
	      var parent;
	      parent = this.parent;
	      while (parent && parent.done) {
	        parent = parent.parent;
	      }
	      return parent;
	    };

	    EventStackNode.prototype.unstartedSelfOrChild = function() {
	      var result;
	      if (!this.started) {
	        return this;
	      }
	      if (this.done) {
	        return null;
	      }
	      while (this.nextSubNode && !(result = this.nextSubNode.unstartedSelfOrChild())) {
	        this.nextSubNode = this.nextSubNode.nextPeer;
	      }
	      if (result) {
	        return result;
	      } else {
	        this.done = true;
	        return null;
	      }
	    };

	    EventStackNode.prototype.unstartedParentOrChild = function() {
	      var notDoneParent, result;
	      result = null;
	      while (!result && (notDoneParent = this.notDoneParent())) {
	        result = notDoneParent.unstartedSelfOrChild();
	      }
	      return result;
	    };

	    EventStackNode.prototype.nextUnstartedNode = function() {
	      return this.unstartedSelfOrChild() || this.unstartedParentOrChild();
	    };

	    EventStackNode.prototype.next = function() {
	      var ref;
	      return (ref = this.nextUnstartedNode()) != null ? ref.start() : void 0;
	    };

	    EventStackNode.prototype.start = function() {
	      this.started = true;
	      this.done = false;
	      this.evaluateFunction();
	      return true;
	    };

	    EventStackNode.prototype.inspectStructure = function() {
	      var node, result;
	      result = !this.eventFunction ? "" : this.done ? "d" : this.started ? "s" : "p";
	      if (this.nextSubNode) {
	        node = this.nextSubNode;
	        result += "(" + (node.inspectStructure());
	        while (node = node.nextPeer) {
	          result += ", " + (node.inspectStructure());
	        }
	        return result + ")";
	      } else {
	        return result;
	      }
	    };

	    return EventStackNode;

	  })();
	  return SequencedEventManager = (function() {
	    function SequencedEventManager() {}

	    SequencedEventManager.currentNode = null;

	    SequencedEventManager.resetIds = function() {
	      return EventStackNode.resetIds();
	    };

	    SequencedEventManager.queue = function(eventFunction, options) {
	      if (options == null) {
	        options = {};
	      }
	      this.scheduleNextTick();
	      if (!this.currentNode) {
	        this.currentNode = new EventStackNode;
	        this.currentNode.started = true;
	      }
	      return this.currentNode.queue(eventFunction, options);
	    };

	    SequencedEventManager.inspectStructure = function() {
	      return this.currentNode && this.currentNode.topmostParent().inspectStructure();
	    };


	    /*
	    User should not call methods below directly
	    private:
	     */

	    SequencedEventManager["throw"] = function(error) {
	      while (this.currentNode) {
	        if (this.currentNode["catch"]) {
	          this.currentNode.done = true;
	          this.currentNode["catch"](error);
	          return;
	        } else {
	          this.currentNode = this.currentNode.parent;
	        }
	      }
	      rawLog("SequencedEventManager. Uncaught exception: " + error.name);
	      rawLog(error);
	      throw error;
	    };

	    SequencedEventManager.next = function() {
	      var ref;
	      while ((ref = this.currentNode) != null ? ref.done : void 0) {
	        this.currentNode = this.currentNode.parent;
	      }
	      if (this.currentNode) {
	        return this.currentNode.next();
	      } else {
	        this.rootNode = this.currentNode = null;
	        rawLog("SequencedEventManager.next: everything is already done!");
	        return false;
	      }
	    };

	    SequencedEventManager.scheduleNextTick = function() {
	      if (!this.nextTickScheduled) {
	        this.nextTickScheduled = true;
	        return nextTick((function(_this) {
	          return function() {
	            var ref;
	            _this.nextTickScheduled = false;
	            _this.next();
	            if ((ref = _this.currentNode) != null ? ref.nextUnstartedNode() : void 0) {
	              return _this.scheduleNextTick();
	            } else {
	              return _this.currentNode = null;
	            }
	          };
	        })(this));
	      }
	    };

	    return SequencedEventManager;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


	/*
	each time we execute a user eventFunction, we push an item onto the stack
	each time we finish a eventFunction we execute the next eventFunction - which is always the next eventFunction of the most recent stack-node
	we only pop stack nodes when all eventFunctions have been executed
	 */


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(18), __webpack_require__(27), __webpack_require__(38), __webpack_require__(12), __webpack_require__(8), __webpack_require__(9), __webpack_require__(29)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Map, FoundationArray, Ruby, BaseObject, Eq, Inspect, Clone) {
	  var SingleObjectTransaction, cloneByStructure, eq, implementsInterface, inspect, interpolateableObjectInterface, removeFirstMatch, rubyTrue;
	  removeFirstMatch = FoundationArray.removeFirstMatch;
	  cloneByStructure = Clone.cloneByStructure;
	  rubyTrue = Ruby.rubyTrue;
	  eq = Eq.eq;
	  inspect = Inspect.inspect;
	  implementsInterface = BaseObject.implementsInterface;
	  interpolateableObjectInterface = ["add", "sub", "mul"];
	  return SingleObjectTransaction = (function(superClass) {
	    var setValues;

	    extend(SingleObjectTransaction, superClass);

	    function SingleObjectTransaction(a) {
	      var options;
	      SingleObjectTransaction.__super__.constructor.apply(this, arguments);
	      this.object = (function() {
	        if (a.constructor === Array) {
	          if (a.length !== 2) {
	            throw new Error("new SingleObjectTransaction: expected length-2 array like: [obj, optionsMap]");
	          }
	          this.options = a[1];
	          return a[0];
	        } else {
	          this.options = {};
	          return a;
	        }
	      }).call(this);
	      if (this.object == null) {
	        throw new Error("object must not be null or undefined");
	      }
	      this.props = [];
	      this.from = {};
	      options = this.options;
	      if (options.properties) {
	        this.addProperties(options.properties);
	      }
	      if (options.property) {
	        this.addProp(options.property);
	      }
	      if (options.from) {
	        this.addFromValues(options.from);
	      }
	      if (options.to) {
	        this.addToValues(options.to);
	      }
	    }

	    SingleObjectTransaction.prototype.toString = function() {
	      return (inspect(this.object, 0)) + " from:" + (inspect(this.from, 1)) + " to:" + (inspect(this.to, 1));
	    };

	    SingleObjectTransaction.prototype.inspect = function(inspector) {
	      var i, k, len, ref, results;
	      inspector.put(this.object.classPathName + ":");
	      ref = this.props;
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        k = ref[i];
	        inspector.put("\n    " + k + ": ");
	        if (rubyTrue(this.from && this.from[k])) {
	          inspector.inspect(this.from[k], 1);
	        }
	        inspector.put(" ... ");
	        if (rubyTrue(this.to && this.to[k])) {
	          results.push(inspector.inspect(this.to[k], 1));
	        } else {
	          results.push(void 0);
	        }
	      }
	      return results;
	    };

	    SingleObjectTransaction.getter({
	      properties: function() {
	        return this.props;
	      },
	      hasToValues: function() {
	        return !!this.to;
	      },
	      valuesChanged: function() {
	        var fromValue, k, ref, toValue;
	        ref = this.from;
	        for (k in ref) {
	          fromValue = ref[k];
	          toValue = this.to[k];
	          if (!eq(fromValue, toValue)) {
	            return true;
	          }
	        }
	        return false;
	      }
	    });

	    SingleObjectTransaction.prototype.addFromValues = function(from) {
	      var base, k, v;
	      for (k in from) {
	        v = from[k];
	        this.addProp(k);
	        this.from[k] = v;
	      }
	      return typeof (base = this.object).preprocessProperties === "function" ? base.preprocessProperties(this.from) : void 0;
	    };

	    SingleObjectTransaction.prototype.addToValues = function(to) {
	      var base, k, v;
	      this.to || (this.to = {});
	      for (k in to) {
	        v = to[k];
	        this.addProp(k);
	        this.to[k] = v;
	      }
	      return typeof (base = this.object).preprocessProperties === "function" ? base.preprocessProperties(this.to) : void 0;
	    };

	    SingleObjectTransaction.prototype.addProperties = function(props) {
	      var i, len, prop, results, results1, v;
	      if (props.constructor === Array) {
	        results = [];
	        for (i = 0, len = props.length; i < len; i++) {
	          prop = props[i];
	          results.push(this.addProp(prop));
	        }
	        return results;
	      } else {
	        results1 = [];
	        for (prop in props) {
	          v = props[prop];
	          results1.push(this.addProp(prop));
	        }
	        return results1;
	      }
	    };

	    SingleObjectTransaction.prototype.addProp = function(propName) {
	      if (indexOf.call(this.props, propName) < 0) {
	        return this.props.push(propName);
	      }
	    };

	    SingleObjectTransaction.prototype.deleteProp = function(propName) {
	      removeFirstMatch(this.props, propName);
	      delete this.from[propName];
	      return delete this.to[propName];
	    };

	    SingleObjectTransaction.prototype.saveValues = function(saveTo) {
	      var getterName, i, len, metaProperties, prop, ref, ref1, value;
	      this.clearOptimizations();
	      metaProperties = this.object.metaProperties;
	      ref = this.props;
	      for (i = 0, len = ref.length; i < len; i++) {
	        prop = ref[i];
	        if (!saveTo.hasOwnProperty(prop)) {
	          value = saveTo[prop] = cloneByStructure((getterName = metaProperties != null ? (ref1 = metaProperties[prop]) != null ? ref1.getterName : void 0 : void 0) ? this.object[getterName]() : this.object[prop]);
	        }
	      }
	      return null;
	    };

	    SingleObjectTransaction.prototype.saveFromValues = function() {
	      return this.saveValues(this.from || (this.from = {}));
	    };

	    SingleObjectTransaction.prototype.saveToValues = function() {
	      return this.saveValues(this.to || (this.to = {}));
	    };

	    SingleObjectTransaction._setValues = setValues = function(o, values, f) {
	      var metaProperties, prop, ref, setterName, v;
	      metaProperties = o.metaProperties;
	      for (prop in values) {
	        v = values[prop];
	        if (f) {
	          v = f(prop, v);
	        }
	        if (setterName = metaProperties != null ? (ref = metaProperties[prop]) != null ? ref.setterName : void 0 : void 0) {
	          o[setterName](v);
	        } else {
	          o[prop] = v;
	        }
	      }
	      return null;
	    };

	    SingleObjectTransaction.prototype.rollBack = function() {
	      return setValues(this.object, this.from);
	    };

	    SingleObjectTransaction.prototype.rollForward = function() {
	      return setValues(this.object, this.to);
	    };

	    SingleObjectTransaction.prototype.clearOptimizations = function() {
	      return this.numberDeltas = this.interpolateToObjects = null;
	    };

	    SingleObjectTransaction.prototype.optimizeInterpolation = function() {
	      var field, from, ref, results, to;
	      this.numberDeltas = {};
	      this.interpolateToObjects = {};
	      this.nonInterpolatingFields = {
	        to: {},
	        from: {}
	      };
	      ref = this.from;
	      results = [];
	      for (field in ref) {
	        from = ref[field];
	        to = this.to[field];
	        if (typeof from === "number") {
	          results.push(this.numberDeltas[field] = to - from);
	        } else if (typeof (from != null ? from.interpolate : void 0) === "function") {
	          results.push(this.interpolateToObjects[field] = to);
	        } else {
	          this.nonInterpolatingFields.from[field] = from;
	          results.push(this.nonInterpolatingFields.to[field] = to);
	        }
	      }
	      return results;
	    };

	    SingleObjectTransaction.prototype.interpolateNumberFields = function(p) {
	      return setValues(this.object, this.numberDeltas, (function(_this) {
	        return function(field, delta) {
	          return _this.from[field] + delta * p;
	        };
	      })(this));
	    };

	    SingleObjectTransaction.prototype.interpolateObjectFields = function(p) {
	      var e, error;
	      try {
	        return setValues(this.object, this.interpolateToObjects, (function(_this) {
	          return function(field, toObject) {
	            return _this.from[field].interpolate(toObject, p);
	          };
	        })(this));
	      } catch (error) {
	        e = error;
	        this.log("Art.Foundation.Transaction#interpolateObjectFields(p=" + p + "): error " + e + " deltas: " + (inspect(this.interpolateToObjects)) + " from:   " + (inspect(this.from)) + " to:     " + (inspect(this.to)));
	        throw e;
	      }
	    };

	    SingleObjectTransaction.prototype.setNonInterpolatingFields = function(p) {
	      return setValues(this.object, this.nonInterpolatingFields[p >= 1 ? "to" : "from"]);
	    };

	    SingleObjectTransaction.prototype.interpolate = function(p) {
	      if (!this.numberDeltas) {
	        this.optimizeInterpolation();
	      }
	      this.interpolateNumberFields(p);
	      this.interpolateObjectFields(p);
	      return this.setNonInterpolatingFields(p);
	    };

	    SingleObjectTransaction.getter({
	      noChanges: function() {
	        return this.props.length === 0;
	      }
	    });

	    SingleObjectTransaction.prototype.optimizeProperties = function() {
	      var i, len, prop, ref, results;
	      this.clearOptimizations();
	      ref = this.props;
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        prop = ref[i];
	        if (!this.from.hasOwnProperty(prop) || !this.to.hasOwnProperty(prop) || eq(this.from[prop], this.to[prop])) {
	          results.push(this.deleteProp(prop));
	        } else {
	          results.push(void 0);
	        }
	      }
	      return results;
	    };

	    return SingleObjectTransaction;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(12), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(MathExtensions, BaseObject, Inspect) {
	  var Stat, inspect, max, min, round;
	  min = MathExtensions.min, max = MathExtensions.max, round = MathExtensions.round;
	  inspect = Inspect.inspect;
	  return Stat = (function(superClass) {
	    extend(Stat, superClass);

	    function Stat() {
	      this.reset();
	    }

	    Stat.prototype.reset = function() {
	      this.values = [];
	      this.sum = 0;
	      return this.max = this.min = null;
	    };

	    Stat.getter({
	      length: function() {
	        return this.values.length;
	      },
	      average: function() {
	        return this.sum / this.values.length;
	      },
	      median: function() {
	        return this.values.slice().sort()[this.length / 2 | 0];
	      }
	    });

	    Stat.prototype.percential = function(zeroToOneHundred) {
	      var i, sorted;
	      i = ((this.length - 1) * zeroToOneHundred / 100) | 0;
	      sorted = this.values.slice().sort(function(v1, v2) {
	        return v2 - v1;
	      });
	      return sorted[i];
	    };

	    Stat.prototype.histogram = function(divisions, min, max) {
	      var bin, delta, hist, j, k, len, mul, ref, ref1, v;
	      if (min == null) {
	        min = this.min;
	      }
	      if (max == null) {
	        max = this.max;
	      }
	      delta = max - min;
	      mul = divisions / delta;
	      hist = {};
	      for (v = j = 0, ref = divisions; j < ref; v = j += 1) {
	        hist[min + v / mul] = 0;
	      }
	      ref1 = this.values;
	      for (k = 0, len = ref1.length; k < len; k++) {
	        v = ref1[k];
	        bin = (v - min) * mul | 0;
	        if (bin < 0) {
	          bin = 0;
	        }
	        if (bin >= divisions) {
	          bin = divisions - 1;
	        }
	        hist[min + bin / mul]++;
	      }
	      return hist;
	    };

	    Stat.prototype.toString = function() {
	      return inspect({
	        length: this.length,
	        average: this.average,
	        median: this.median,
	        min: this.min,
	        max: this.max
	      });
	    };

	    Stat.prototype.toInfoMap = function() {
	      return {
	        length: this.length,
	        average: this.average,
	        median: this.median,
	        min: this.min,
	        max: this.max,
	        p90: this.percential(90),
	        p95: this.percential(95),
	        p99: this.percential(99)
	      };
	    };

	    Stat.prototype.toIntInfoMap = function() {
	      return {
	        length: this.length,
	        average: round(this.average),
	        median: round(this.median),
	        min: round(this.min),
	        max: round(this.max),
	        p90: round(this.percential(90)),
	        p95: round(this.percential(95)),
	        p99: round(this.percential(99))
	      };
	    };

	    Stat.prototype.toIntString = function() {
	      return inspect(this.toIntInfoMap());
	    };

	    Stat.prototype.add = function(v) {
	      this.values.push(v);
	      this.sum += v;
	      if (this.values.length === 1) {
	        return this.max = this.min = v;
	      } else {
	        this.max = max(this.max, v);
	        return this.min = min(this.min, v);
	      }
	    };

	    return Stat;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	/*
	Transaction provides a manual, yet easy way to log the before and after values
	of fields over many objects.

	It is "manual" in that you must:

	  Pre-specify all objects you wish to track.
	  Specify the properties you wish to track for all objects and/or uniquely for each object.
	  Pass in the "from" values or call saveFromValues
	  Pass in the "to" values or call saveToValues

	Once you have capture the "from" and "to" values of the transaction, you can:

	  rollBack and set all properties to their "from" values
	  rollForward and set all properties to their "to" values
	  interpolate(p) and set all properties to their linearly interpolated value
	    between their saved "from" (p=0) and "to" (p=1) values.
	    If you use interpolate:
	      to/from values should be pair-wise the same type
	      only to/from values of the following types will be interpolated:
	        numbers
	        objects implementing: a.add(b), a.sub(b) and a.mul(number)
	      Non-interpolatable types are handled as follows:
	        switch p
	          when 0 then set to "from" values
	          when 1 then set to "to" values
	          else left unchanged

	Example initializers:

	   * example-a: track obj's "foo" and "bar" properties
	  new Transaction obj, properties: ["foo", "bar"]

	   * same as example-a, but also initialize obj's from-values as obj.foo=1 and obj.bar=2
	  new Transaction obj, from: foo:1, bar:2

	   * same as example-a, but also initialize obj's to-values as obj.foo=1 and obj.bar=2
	  new Transaction obj, to: foo:1, bar:2

	   * track obj1 and obj2's "foo" and "bar" properties
	  new Transaction [obj1, obj2], properties: ["foo", "bar"]

	   * track:
	   *   obj1's foo, bar, noo and mar properties, with both from and to values initialized
	   *   obj2's goo, har, noo and mar properties, with both from and to values initialized
	  new Transaction [
	      [obj1,
	        from: foo:1, bar:2
	        to:   foo:2, bar:3
	      ],
	      [obj2,
	        from: goo:1, har:2
	        to:   goo:2, har:3
	      ]
	    ],
	    from: noo:4, mar:5
	    to:   noo:4, mar:5
	 */
	var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(52), __webpack_require__(18), __webpack_require__(38), __webpack_require__(12), __webpack_require__(8), __webpack_require__(9), __webpack_require__(29)], __WEBPACK_AMD_DEFINE_RESULT__ = function(SingleObjectTransaction, Map, Ruby, BaseObject, Eq, Inspect, Clone) {
	  var Transaction, cloneByStructure, eq, implementsInterface, inspect, interpolateableObjectInterface, rubyTrue;
	  cloneByStructure = Clone.cloneByStructure;
	  rubyTrue = Ruby["true"];
	  eq = Eq.eq;
	  inspect = Inspect.inspect;
	  implementsInterface = BaseObject.implementsInterface;
	  interpolateableObjectInterface = ["add", "sub", "mul"];
	  return Transaction = (function(superClass) {
	    extend(Transaction, superClass);

	    Transaction.SingleObjectTransaction = SingleObjectTransaction;

	    function Transaction(objects, options) {
	      if (options == null) {
	        options = {};
	      }
	      Transaction.__super__.constructor.apply(this, arguments);
	      this._objects = new Map;
	      if (objects.constructor === Array) {
	        this.addObjects(objects);
	      } else {
	        this.addObject(objects);
	      }
	      if (options.properties) {
	        this.addProperties(options.properties);
	      }
	      if (options.property) {
	        this.addProperties([options.property]);
	      }
	      if (options.from) {
	        this.addFromValues(options.from);
	      }
	      if (options.to) {
	        this.addToValues(options.to);
	      }
	      this.saveFromValues();
	    }

	    Transaction.prototype.inspect = function(inspector) {
	      inspector.put(this.classPathName + ":");
	      return this.inspectParts(inspector);
	    };

	    Transaction.prototype.inspectParts = function(inspector) {
	      return this._objects.each((function(_this) {
	        return function(k, v) {
	          inspector.put("\n  ");
	          return inspector.inspect(v);
	        };
	      })(this));
	    };

	    Transaction.getter({
	      objects: function() {
	        return this._objects.keys;
	      }
	    });

	    Transaction.prototype.properties = function(obj) {
	      return this._objects.get(obj).properties;
	    };

	    Transaction.prototype.from = function(obj) {
	      return this._objects.get(obj).from;
	    };

	    Transaction.prototype.to = function(obj) {
	      return this._objects.get(obj).to;
	    };

	    Transaction.prototype.rollBack = function() {
	      return this._objects.forEach((function(_this) {
	        return function(oi) {
	          return oi.rollBack();
	        };
	      })(this));
	    };

	    Transaction.prototype.rollForward = function() {
	      return this._objects.forEach((function(_this) {
	        return function(oi) {
	          return oi.rollForward();
	        };
	      })(this));
	    };

	    Transaction.prototype.interpolate = function(p) {
	      return this._objects.forEach((function(_this) {
	        return function(oi) {
	          return oi.interpolate(p);
	        };
	      })(this));
	    };

	    Transaction.prototype.optimize = function() {
	      this.optimizeProperties();
	      return this.optimizeObjects();
	    };

	    Transaction.getter({
	      hasToValues: function() {
	        var result;
	        result = false;
	        this._objects.forEach((function(_this) {
	          return function(oi) {
	            if (oi.hasToValues) {
	              return result = true;
	            }
	          };
	        })(this));
	        return result;
	      },
	      valuesChanged: function() {
	        var result;
	        result = false;
	        this._objects.forEach((function(_this) {
	          return function(object) {
	            if (object.valuesChanged) {
	              return result = true;
	            }
	          };
	        })(this));
	        return result;
	      }
	    });

	    Transaction.prototype.toString = function() {
	      return (this.className + "\n  ") + (this._objects.map(function(obj, single) {
	        return single.toString();
	      })).join("  \n");
	    };

	    Transaction.prototype.addFromValues = function(from) {
	      return this._objects.forEach((function(_this) {
	        return function(oi) {
	          return oi.addFromValues(from);
	        };
	      })(this));
	    };

	    Transaction.prototype.addToValues = function(to) {
	      return this._objects.forEach((function(_this) {
	        return function(oi) {
	          return oi.addToValues(to);
	        };
	      })(this));
	    };

	    Transaction.prototype.addProperties = function(properties) {
	      return this._objects.forEach((function(_this) {
	        return function(oi) {
	          return oi.addProperties(properties);
	        };
	      })(this));
	    };

	    Transaction.prototype.addObject = function(obj) {
	      var oi;
	      oi = new SingleObjectTransaction(obj);
	      return this._objects.set(oi.object, oi);
	    };

	    Transaction.prototype.addObjects = function(objects) {
	      var i, len, obj, results;
	      results = [];
	      for (i = 0, len = objects.length; i < len; i++) {
	        obj = objects[i];
	        results.push(this.addObject(obj));
	      }
	      return results;
	    };

	    Transaction.prototype.saveFromValues = function() {
	      return this._objects.forEach((function(_this) {
	        return function(oi) {
	          return oi.saveFromValues();
	        };
	      })(this));
	    };

	    Transaction.prototype.saveToValues = function() {
	      return this._objects.forEach((function(_this) {
	        return function(oi) {
	          return oi.saveToValues();
	        };
	      })(this));
	    };

	    Transaction.prototype.optimizeProperties = function() {
	      return this._objects.forEach((function(_this) {
	        return function(oi) {
	          return oi.optimizeProperties();
	        };
	      })(this));
	    };

	    Transaction.prototype.optimizeObjects = function() {
	      var objs;
	      objs = this._objects;
	      this._objects = new Map;
	      return objs.forEach((function(_this) {
	        return function(oi) {
	          if (!oi.noChanges) {
	            return _this._objects.set(oi.object, oi);
	          }
	        };
	      })(this));
	    };

	    return Transaction;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  slice = [].slice;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(12), __webpack_require__(6), __webpack_require__(28), __webpack_require__(45), __webpack_require__(39)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Log, BaseObject, arg, arg1, arg2, Promise) {
	  var WorkerRpc, debugPrefix, isFunction, isPlainArray, isString, isWebWorker, log, mergeInto;
	  isPlainArray = arg.isPlainArray, isFunction = arg.isFunction, isString = arg.isString;
	  mergeInto = arg1.mergeInto;
	  isWebWorker = arg2.isWebWorker;
	  log = Log.log;

	  /*
	  WorkerRPC has two modes: singleton and instanced.
	  
	  SINGLETON:
	    Including WorkerRPC automatically creates the singleton instance.
	    In a worker, the singleton automatically binds to the worker's self.onmessage and starts listenting.
	    In workers or the browser, any handler registered with the singleton will be available to respond
	    to any message received by the singleton OR ANY OTHER INSTANCE of WorkerRPC in that thread.
	    You can think of the singleton as the global registry for handlers.
	  
	  In practice:
	    In browser:
	       * to register all your handlers, call this one or more times:
	      WorkerRpc.register ...
	  
	       * call for each each worker you want to listen for RPC calls from,
	       * and bind any remote procedures you want to be able to invoke on that specific worker-thread
	      aBoundWorker = new WorkerRpc worker,
	        bind: ...
	        bindWithPromises: ...
	  
	       * to make remote-procedure-calls to the worker:
	       * NOTE: if registered with bindWithPromises, will return a promise for the RPC's result.
	      aBoundWorker.MyWorkerNamespace.myWorkerFunction ...
	  
	    In worker:
	       * to register all your handlers, call this one or more times:
	      WorkerRpc.register ...
	  
	       * bind any remote procedures you want to be able to invoke on the browser-thread
	      WorkerRpc.bind ...
	      WorkerRpc.bindWithPromises ...
	  
	  NOTES:
	    registered functions are invoked with @/this set to the namespace. That way you can invoke
	    callback functions you previously bound back to the specific worker that invoked the
	    function with: @MyWorkerNamespace.myWorkerFunction()
	  
	  Real world example:
	  
	    Suppose you want to access the localStorage object on the browser thread from your worker.
	    The 6 lines of code below create the 'self.asyncLocalStorage' object which works just like
	    'localStorage' except it returns Art.Foundation.Promises for the function results.
	  
	    browser: (before starting the worker)
	      {WorkerRpc} = Art.Foundation
	      WorkerRpc.register localStorage: localStorage
	      new WorkerRpc workerSourcePath
	  
	    worker:
	      {workerRpc} = Art.Foundation.WorkerRpc
	      workerRpc.bindWithPromises localStorage: ["getItem", "setItem", "removeItem", "clear"]
	      self.asyncLocalStorage = workerRpc.localStorage
	  
	    SBD: Isn't that nice! So streamlined!
	  
	  General examples:
	  
	  Usage with no return value expected:
	    browser thread:
	  
	      new WorkerRpc (new Worker workerUrl),
	        register:
	          MyMainNamespace:
	            doWork: (a) -> ...
	  
	    worker thread:
	  
	      {MyMainNamespace} = new WorkerRpc self,
	        bind:
	          MyMainNamespace: ["doWork"]
	  
	      MyMainNamespace.doWork myStructuredData
	  
	  Usage with promises:
	  
	    browser thread:
	  
	      new WorkerRpc (new Worker workerUrl),
	        register:
	          MyMainNamespace:
	            concatStrings: (a, b) ->
	              a + b
	               * equivelent to: Promise.resolve a + b
	               * if the result is not a Promse, Promise.resolve(result) is automatically applied
	  
	    worker thread:
	  
	      {MyMainNamespace} = new WorkerRpc self,
	        bindWithPromises:
	          MyMainNamespace: ["concatStrings"]
	  
	      MyMainNamespace.concatStrings "hi ", "Shane"
	      .then (result) ->
	         * result == "hi Shane"
	  
	  Usage with arbitrary response messages:
	  
	    Sometimes you want a handle to the workerRpc instance for the thread that just send
	    you the message inside your registered response functions. You can access that
	    via the global: WorkerRpc.lastMessageReceivedFrom.
	  
	    browser thread:
	  
	      new WorkerRpc (new Worker workerUrl),
	        register:
	          MyMainNamespace:
	            doWorkAndRespond: (key) ->
	              count == 0
	              invokeThreeTimes =>
	                count++
	                WorkerRpc.lastMessageReceivedFrom.MyWorkerNamespace.respond key, count
	  
	    worker thread:
	  
	      {MyMainNamespace} = new WorkerRpc self,
	        register:
	          MyWorkerNamespace:
	            respond: (key, count) -> console.log "MyWorkerNamespace#respond: #{key} #{count}"
	        bind:
	          MyMainNamespace: ["doWorkAndRespond"]
	  
	      MyMainNamespace.doWorkAndRespond "myKey"
	  
	  Usage - add to global registery:
	  
	    WorkerRpc.register
	      MyGlobalClass:
	        doSomethingNoMatterWhoCalls: ->
	          ...
	   */
	  debugPrefix = isWebWorker ? "WorkerRpc(worker)" : "WorkerRpc(browser)";
	  return WorkerRpc = (function(superClass) {
	    extend(WorkerRpc, superClass);

	    WorkerRpc.singletonClass();

	    WorkerRpc.register = function(toRegister) {
	      return WorkerRpc.singleton.register(toRegister);
	    };

	    WorkerRpc.bind = function(toBind) {
	      return WorkerRpc.singleton._bind(toBind, false);
	    };

	    WorkerRpc.bindWithPromises = function(toBind) {
	      return WorkerRpc.singleton._bind(toBind, true);
	    };


	    /*
	    INPUT:
	      thread:
	        must implement onmessage= and postMessage or be null
	        In a webworker, this gets set to self if it is null.
	      options:
	        bind: map # invokes: @bind map
	        bindWithPromises: map # invokes: @bindWithPromises map
	     */

	    function WorkerRpc(thread, options) {
	      if (isString(thread)) {
	        thread = new Worker(thread);
	      }
	      if (!(thread || self === self.window)) {
	        thread = self;
	      }
	      this._reset();
	      this._bindOnmessage(this._thread = thread);
	      if (options) {
	        this._applyOptions(options);
	      }
	    }

	    WorkerRpc.prototype.register = function(toRegister) {
	      var functionMap, namespaceName;
	      if (!toRegister) {
	        return;
	      }
	      for (namespaceName in toRegister) {
	        functionMap = toRegister[namespaceName];
	        if (this._registry.hasOwnProperty(namespaceName)) {
	          mergeInto(this._registry[namespaceName], functionMap);
	        } else {
	          this._registry[namespaceName] = functionMap;
	        }
	      }
	      return this._registry;
	    };


	    /*
	    Creates functions to make specific remote-procedure-calls.
	    
	    IN:
	      toBind: map to arrays of strings
	        Each key in the map specifies a namespace.
	        The array of strings specify the names of each RPC you want to be able to invoke.
	    
	    For a given namespaceName and functionName, this binds the function so you can
	    invoke it as follows:
	      @myNamespaceName.myFunctionName()
	    
	    The created functions are one-way. They return null as soon as the message has been sent
	    to the remote thread. If you want the results, see @bindWithPromises
	     */

	    WorkerRpc.prototype.bind = function(toBind) {
	      return this._bind(toBind, false);
	    };


	    /*
	    Same as @bind except each function created will return a promise which will return
	    the results return from the remote procedure call when they are ready.
	     */

	    WorkerRpc.prototype.bindWithPromises = function(toBind) {
	      return this._bind(toBind, true);
	    };

	    WorkerRpc.prototype._bind = function(toBind, withPromises) {
	      var functionName, functionNames, i, len, namespace, namespaceName, ref;
	      if (!isFunction((ref = this._thread) != null ? ref.postMessage : void 0)) {
	        throw new Error("@_thread.postMessage required for remote requests");
	      }
	      if (!toBind) {
	        return;
	      }
	      for (namespaceName in toBind) {
	        functionNames = toBind[namespaceName];
	        if (!this.hasOwnProperty(namespaceName)) {
	          this[namespaceName] = {};
	        }
	        namespace = this[namespaceName];
	        for (i = 0, len = functionNames.length; i < len; i++) {
	          functionName = functionNames[i];
	          namespace[functionName] = withPromises ? this._newRemoteRequestFunctionWithPromise(namespaceName, functionName) : this._newRemoteRequestFunction(namespaceName, functionName);
	        }
	      }
	      return null;
	    };

	    WorkerRpc.prototype._reset = function() {
	      return this._registry = {
	        promiseCallback: {
	          success: (function(_this) {
	            return function(promiseId, result) {
	              return WorkerRpc._resolvePromise(promiseId, result);
	            };
	          })(this),
	          error: (function(_this) {
	            return function(promiseId, error) {
	              return WorkerRpc._rejectPromise(promiseId, error);
	            };
	          })(this)
	        }
	      };
	    };

	    WorkerRpc.prototype._applyOptions = function(arg3) {
	      var bind, bindWithPromises, register;
	      register = arg3.register, bind = arg3.bind, bindWithPromises = arg3.bindWithPromises;
	      this.register(register);
	      this.bind(bind);
	      this.bind(bindWithPromises, true);
	      return this;
	    };

	    WorkerRpc.prototype._send = function(namespaceName, functionName, promiseId, args) {
	      return this._thread.postMessage([namespaceName, functionName, promiseId, args]);
	    };

	    WorkerRpc.prototype._newRemoteRequestFunctionWithPromise = function(namespaceName, functionName) {
	      return (function(_this) {
	        return function() {
	          var args;
	          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	          return WorkerRpc._bindPromise(function(promiseId) {
	            return _this._send(namespaceName, functionName, promiseId, args);
	          });
	        };
	      })(this);
	    };

	    WorkerRpc.prototype._newRemoteRequestFunction = function(namespaceName, functionName) {
	      return (function(_this) {
	        return function() {
	          var args;
	          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	          return _this._send(namespaceName, functionName, null, args);
	        };
	      })(this);
	    };

	    WorkerRpc.prototype._bindOnmessage = function(thread) {
	      return thread != null ? thread.onmessage = (function(_this) {
	        return function(arg3) {
	          var args, data, functionName, namespaceName, promiseId;
	          data = arg3.data;
	          if (!isPlainArray(data)) {
	            return console.warn(debugPrefix + ": data was not an array", data);
	          }
	          namespaceName = data[0], functionName = data[1], promiseId = data[2], args = data[3];
	          return _this._invokeLocalFunction(namespaceName, functionName, promiseId, args);
	        };
	      })(this) : void 0;
	    };

	    WorkerRpc.prototype._invokeLocalFunction = function(namespaceName, functionName, promiseId, args) {
	      var localFunction, namespace, singleton;
	      if ((namespace = this._registry[namespaceName]) && (localFunction = namespace[functionName])) {
	        localFunction;
	      } else {
	        singleton = WorkerRpc.singleton;
	        if (this !== singleton && (namespace = singleton._registry[namespaceName]) && (localFunction = namespace[functionName])) {
	          localFunction;
	        }
	      }
	      if (!localFunction) {
	        console.warn(debugPrefix + "_onmessage: could not find: '" + namespaceName + "." + functionName + "'\n\nnamespaces: " + (Object.keys(this._registry).join(', ')) + "\nglobal namespaces: " + (singleton === this ? "(same)" : Object.keys(singleton._registry).join(', ')));
	      }
	      if (localFunction) {
	        WorkerRpc.lastMessageReceivedFrom = this;
	        return this._resolveOrRejectRemotePromise(promiseId, localFunction.apply(namespace, args));
	      }
	    };

	    WorkerRpc.prototype._resolveOrRejectRemotePromise = function(promiseId, result) {
	      if (promiseId == null) {
	        return;
	      }
	      return Promise.resolve(result).then((function(_this) {
	        return function(result) {
	          return _this._send("promiseCallback", "success", null, [promiseId, result], function(error) {
	            return _this._send("promiseCallback", "error", null, [promiseId, error]);
	          });
	        };
	      })(this));
	    };


	    /*
	    IN:   f: (promiseId) -> ignored
	    OUT:  promise
	    
	    Creates a new promise, addes it to @_promises with a unique id, and invokes f, passing in
	    the promise's id.
	     */

	    WorkerRpc._promises = {};

	    WorkerRpc._nextPromiseId = 0;

	    WorkerRpc._bindPromise = function(f) {
	      var promise, promiseId;
	      this._promises[promiseId = this._nextPromiseId++] = promise = new Promise;
	      f(promiseId);
	      return promise;
	    };

	    WorkerRpc._resolvePromise = function(promiseId, result) {
	      var ref;
	      if ((ref = this._promises[promiseId]) != null) {
	        ref.resolve(result);
	      }
	      return delete this._promises[promiseId];
	    };

	    WorkerRpc._rejectPromise = function(promiseId, error) {
	      var ref;
	      if ((ref = this._promises[promiseId]) != null) {
	        ref.reject(error);
	      }
	      return delete this._promises[promiseId];
	    };

	    return WorkerRpc;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var Binary;

	module.exports = Binary = __webpack_require__(57);

	Binary.EncodedImage = __webpack_require__(58);

	Binary.RestClient = __webpack_require__(59);

	Binary.Stream = __webpack_require__(62);

	Binary.String = __webpack_require__(60);

	Binary.Utf8 = __webpack_require__(61);

	Binary.finishLoad(["EncodedImage", "RestClient", "Stream", "String", "Utf8"]);


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(1);

	module.exports = Foundation.Binary || (Foundation.Binary = (function(superClass) {
	  extend(Binary, superClass);

	  function Binary() {
	    return Binary.__super__.constructor.apply(this, arguments);
	  }

	  Binary.namespace = Foundation;

	  Binary.namespacePath = "Neptune.Art.Foundation.Binary";

	  return Binary;

	})(Neptune.Base));


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9), __webpack_require__(7), __webpack_require__(59), __webpack_require__(60)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Inspect, Log, RestClient, BinaryString) {
	  var EncodedImage, binary, inspect, log;
	  inspect = Inspect.inspect;
	  log = Log.log;
	  binary = BinaryString.binary;
	  return EncodedImage = (function() {
	    function EncodedImage() {}

	    EncodedImage.get = function(url, callBack, errorBack) {
	      var image;
	      if (errorBack == null) {
	        errorBack = null;
	      }
	      image = new Image;

	      /*
	      NOTE: This crossOrigin setting makes file:// urls not work with WkWebKit
	      image.crossOrigin = "Anonymous"
	      
	      Odly, everything currently seems to work without it. I thought it was required to request
	      remote images. I'm leaving it commented out here in case we have future problems. It is
	      possible we could included it only if the url is not a file:// url.
	       */
	      image.onload = function() {
	        return callBack(image);
	      };
	      image.onerror = function(e) {
	        self.encodedImageErrorEvent = e;
	        console.log("EncodedImage.get error START");
	        console.log("self.encodedImageErrorEvent = e");
	        console.log(e);
	        console.log(e.currentTarget);
	        console.log(e.target);
	        console.log(image);
	        console.log("image status");
	        console.log(image.status);
	        console.log("EncodedImage.get error END");
	        return errorBack(e);
	      };
	      return image.src = url;
	    };

	    EncodedImage.toDataURI = function(data, callBack, errorBack) {
	      var dataURI, reader;
	      if (data instanceof self.File) {
	        reader = new FileReader;
	        reader.readAsDataURL(data);
	        reader.onerror = errorBack;
	        reader.onload = (function(_this) {
	          return function(e) {
	            var dataURI;
	            dataURI = e.target.result;
	            return _this.toDataURI(dataURI, callBack, errorBack);
	          };
	        })(this);
	        return;
	      }
	      dataURI = (function() {
	        if ((typeof data) === "string" && data.slice(0, 5) === "data:") {
	          return data;
	        } else {
	          if (!data) {
	            throw new Error("data must be set");
	          }
	          return "data:image/png;base64," + binary(data).toBase64();
	        }
	      })();
	      errorBack || (errorBack = function(error) {
	        return log("WARNING - Image loading failed. Error was not handled.\nbuffer: " + (inspect(data)));
	      });
	      return callBack(dataURI);
	    };

	    EncodedImage.toImage = function(data, callBack, errorBack) {
	      return this.toDataURI(data, function(dataURI) {
	        var image;
	        image = new Image;
	        image.src = dataURI;
	        image.onload = function() {
	          return callBack(image, dataURI);
	        };
	        return image.onerror = errorBack;
	      }, errorBack);
	    };

	    return EncodedImage;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(57), __webpack_require__(12), __webpack_require__(60)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Binary, BaseObject) {
	  var binary;
	  binary = Binary.binary;
	  return Binary.RestClient = (function(superClass) {
	    extend(RestClient, superClass);

	    function RestClient() {
	      return RestClient.__super__.constructor.apply(this, arguments);
	    }

	    RestClient.get = function(url, onSuccess, onError, onProgress) {
	      var request;
	      request = new XMLHttpRequest;
	      request.open("GET", url, true);
	      request.responseType = "arraybuffer";
	      request.onload = function(rawEvent) {
	        var arrayBuffer;
	        arrayBuffer = request.response;
	        if (arrayBuffer && arrayBuffer.byteLength > 0 && (request.status === 200 || request.status === 0)) {
	          return onSuccess(binary(arrayBuffer), url, request);
	        } else {
	          if (onError) {
	            return onError(rawEvent, url, request);
	          }
	        }
	      };
	      if (onProgress) {
	        request.onprogress = function(rawEvent) {
	          return onProgress(rawEvent, url, request);
	        };
	      }
	      if (onError) {
	        request.onerror = function(rawEvent) {
	          return onError(rawEvent, url, request);
	        };
	      }
	      return request.send(null);
	    };

	    RestClient.multipartPost = function(url, parts, onSuccess, onError, onProgress) {
	      var formData, k, request, v;
	      formData = new FormData;
	      for (k in parts) {
	        v = parts[k];
	        this.log({
	          k: k,
	          v: v
	        });
	        formData.append(k, v);
	      }
	      request = new XMLHttpRequest;
	      request.open("POST", url, true);
	      request.onload = function(rawEvent) {
	        if (request.status === 200) {
	          return onSuccess(request.response, url, request);
	        } else if (onError) {
	          return onError(rawEvent, url, parts, request);
	        }
	      };
	      if (onProgress) {
	        request.upload.onprogress = function(rawEvent) {
	          return onProgress(rawEvent, url, parts, request);
	        };
	      }
	      if (onError) {
	        request.onerror = (function(_this) {
	          return function(rawEvent) {
	            return onError(rawEvent, url, parts, request);
	          };
	        })(this);
	      }
	      return request.send(formData);
	    };

	    return RestClient;

	  })(BaseObject);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(57), __webpack_require__(61), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Binary, Utf8, Types) {
	  var encodings, isFunction, isString, jString;
	  isString = Types.isString, isFunction = Types.isFunction;
	  encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  jString = self.String;
	  Binary.binary = function(arg) {
	    if (arg instanceof Binary.String) {
	      return arg;
	    } else {
	      return new Binary.String(arg);
	    }
	  };
	  return Binary.String = (function() {
	    String.binary = Binary.binary;

	    String.cloneUint8Array = function(srcU8A) {
	      var dstU8A;
	      dstU8A = new Uint8Array(new ArrayBuffer(src.length));
	      dstU8A.set(srcU8A);
	      return dstU8A;
	    };

	    function String(arg) {
	      this.bytes = (function() {
	        if (arg instanceof Binary.String) {
	          return Binary.String.cloneUint8Array(arg.bytes);
	        } else if (isFunction(arg.uint8Array)) {
	          return arg.uint8Array();
	        } else if (arg instanceof ArrayBuffer) {
	          return new Uint8Array(arg);
	        } else if (arg instanceof Uint8Array) {
	          return arg;
	        } else if (isString(arg)) {
	          return Binary.UTF8.toBuffer(arg);
	        } else {
	          throw new Error("invalid argument: " + arg);
	        }
	      })();
	      this.length = this.bytes.length;
	    }

	    String.fromBase64 = function(base64encoding) {
	      var byteString, i, j, len, ref, uInt8Array;
	      byteString = atob(base64encoding);
	      len = byteString.length;
	      uInt8Array = new Uint8Array(new ArrayBuffer(len));
	      for (i = j = 0, ref = len; j < ref; i = j += 1) {
	        uInt8Array[i] = byteString.charCodeAt(i);
	      }
	      return new Binary.String(uInt8Array);
	    };

	    String.prototype.toDataURI = function(callback) {
	      var blob, reader;
	      blob = new Blob([this.bytes]);
	      reader = new FileReader;
	      reader.readAsDataURL(blob);
	      return reader.onloadend = function() {
	        return callback(reader.result);
	      };
	    };

	    String.prototype.toBase64Callback = function(callback) {
	      return this.toDataURI(function(r) {
	        return callback(r.split(',')[1]);
	      });
	    };

	    String.fromDataURI = function(dataURI) {
	      var base64encoding, splitDataURI;
	      splitDataURI = dataURI.split(',');
	      base64encoding = splitDataURI[1];
	      return this.fromBase64(base64encoding);
	    };

	    String.prototype.toString = function() {
	      return Binary.UTF8.toString(this.bytes);
	    };

	    String.prototype.toBlob = function() {
	      return new Blob([this.bytes]);
	    };

	    String.prototype.toBase64 = function() {
	      return btoa(jString.fromCharCode.apply(null, Array.prototype.slice.call(this.bytes)));
	    };

	    return String;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(57)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Binary) {
	  return Binary.UTF8 = (function() {
	    function UTF8() {}

	    UTF8.toBuffer = function(string) {
	      return new Uint8Array(this.toArray(string));
	    };

	    UTF8.toArray = function(string) {
	      var char, i, results, uriEncoded;
	      uriEncoded = encodeURIComponent(string);
	      i = 0;
	      results = [];
	      while (i < uriEncoded.length) {
	        char = uriEncoded.charCodeAt(i++);
	        if (char === 0x25) {
	          i += 2;
	          results.push(parseInt(uriEncoded.substr(i - 2, 2), 16));
	        } else {
	          results.push(char);
	        }
	      }
	      return results;
	    };

	    UTF8.toString = function(a) {
	      var error, error1, x, y;
	      if (a === void 0) {
	        return "<undefined>";
	      }
	      if (a === null) {
	        return "<null>";
	      }
	      try {
	        if (a instanceof ArrayBuffer) {
	          a = new Uint8Array(a);
	        }
	        return decodeURIComponent(((function() {
	          var j, len, results;
	          results = [];
	          for (j = 0, len = a.length; j < len; j++) {
	            x = a[j];
	            y = x.toString(16);
	            if (y.length < 2) {
	              y = "0" + y;
	            }
	            results.push("%" + y);
	          }
	          return results;
	        })()).join(''));
	      } catch (error1) {
	        error = error1;
	        return "<" + a.length + " binary bytes>";
	      }
	    };

	    return UTF8;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(57), __webpack_require__(60)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Binary) {
	  var binary;
	  binary = Binary.binary;
	  Binary.stream = function(arg) {
	    if (arg instanceof Binary.Stream) {
	      return arg;
	    } else if (arg instanceof ArrayBuffer) {
	      return Binary.Stream.from_array_buffer(arg);
	    } else if (arg instanceof Uint8Array) {
	      return new Binary.Stream(arg);
	    } else {
	      return new Binary.Stream(binary(arg).bytes);
	    }
	  };
	  return Binary.Stream = (function() {
	    Stream.from_array_buffer = function(array_buffer) {
	      return new Binary.Stream(new Uint8Array(array_buffer, 0, array_buffer.byteLength));
	    };

	    function Stream(byte_view) {
	      this.byte_view = byte_view;
	      this.pos = 0;
	    }

	    Stream.prototype.read_byte = function() {
	      return this.byte_view[this.pos++];
	    };

	    Stream.prototype.read_asi = function() {
	      var debug, ret, shift, val;
	      debug = this.inspect();
	      ret = 0;
	      shift = 0;
	      val = 128;
	      while (val >= 128) {
	        val = this.read_byte();
	        ret += (val % 128) << shift;
	        shift += 7;
	      }
	      return ret;
	    };

	    Stream.prototype.uint8Array = function() {
	      return this.byte_view;
	    };

	    Stream.prototype.read = function(length) {
	      var begin, end;
	      begin = this.pos;
	      this.pos += length;
	      end = this.pos;
	      return new Binary.Stream(this.byte_view.subarray(begin, end));
	    };

	    Stream.prototype.inspect = function() {
	      return "{Binary.Stream pos=" + this.pos + " byteOffset=" + this.byte_view.byteOffset + " length=" + this.byte_view.length + "}";
	    };

	    Stream.prototype.read_asi_string = function() {
	      return this.read(this.read_asi());
	    };

	    Stream.prototype.done = function() {
	      return this.pos >= this.byte_view.length;
	    };

	    Stream.prototype.toString = function() {
	      return binary(this.byte_view).toString();
	    };

	    return Stream;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ]);