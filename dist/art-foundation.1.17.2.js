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

	module.exports = __webpack_require__(19);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var DomElementFactories, supportLibs,
	  slice = [].slice;

	supportLibs = [Neptune.NeptuneLib, __webpack_require__(3), __webpack_require__(4)];


	/*
	DomElementFactories allows for Art.React-style creation of DOM elements.

	 * HOW TO LOAD:
	 * -- IF: you are already using Art.Foundation
	Foundation = require 'art-foundation'
	{DomElementFactories} = Foundation.Browser

	 * -- IF: You have the Art.Foundation NPM but only want DomElementFactories:
	DomElementFactories = require 'art-foundation/dom_element_factories'

	 * -- IF: You just have dom_element_factories.js
	 * first, load it prior via a <script> tag, then:
	 * window.DomElementFactories will be set.

	Usage:

	{Div, Span, B, Em} = DomElementFactories

	mySharedTextStyle =
	  style:
	    fontSize: "16pt"
	    color: "#444"
	    fontFamily: "Times"

	Div
	  class: "foo"
	  id:    "123"

	Span
	  class: "dude"
	  "This is some really"
	  B "bold"
	  "text."
	  "Also, here is some"
	  Em "emphasized"
	  "text."

	Span mySharedTextStyle,
	  internalHTML: "Or you can do <b>this</b> and <em>this</em>."

	Div mySharedTextStyle,
	  style:
	    bottom:          0
	    height:          "50px"
	    left:            "100px"
	    right:           "100px"
	    position:        "fixed"
	    backgroundColor: "white"
	    textAlign:       "center"
	  "Styles are easy, too."

	VERSION HISTORY:
	  1.1.1 - added H2-H6
	  1.1.0 - new-lines in text-children become <BR> tags
	  1.0.0 - initial
	 */

	module.exports = DomElementFactories = (function() {
	  var isPlainObject, isString, j, k, len, mergeInto, ref, supportLib, v;

	  function DomElementFactories() {}

	  DomElementFactories.version = "1.1.1";

	  DomElementFactories.src = "https://github.com/Imikimi-LLC/art-foundation";

	  for (j = 0, len = supportLibs.length; j < len; j++) {
	    supportLib = supportLibs[j];
	    for (k in supportLib) {
	      v = supportLib[k];
	      DomElementFactories[k] = v;
	    }
	  }

	  DomElementFactories.isString = isString = function(obj) {
	    return typeof obj === "string";
	  };

	  DomElementFactories.isPlainObject = isPlainObject = function(obj) {
	    return obj.constructor === Object;
	  };

	  DomElementFactories.mergeInto = mergeInto = function(into, source) {
	    if (into == null) {
	      into = {};
	    }
	    for (k in source) {
	      v = source[k];
	      into[k] = v;
	    }
	    return into;
	  };

	  DomElementFactories.setDomElementProp = function(element, prop, value, oldValue) {
	    var clearStyle, setStyle, style;
	    switch (prop) {
	      case "class":
	        return element.className = value || "";
	      case "id":
	        return element.id = value || "";
	      case "innerHTML":
	        return element.innerHTML = value || "";
	      case "on":
	        if (!isPlainObject(value)) {
	          throw new Error("object expected for 'on' property");
	        }
	        setStyle = function(eventType, newEventListener) {
	          return element.addEventListener(eventType, newEventListener);
	        };
	        clearStyle = function(eventType, oldEventListener) {
	          return element.removeEventListner(eventType, oldEventListener);
	        };
	        return DomElementFactories.objectDiff(value, oldValue, setStyle, clearStyle, setStyle);
	      case "style":
	        if (!isPlainObject(value)) {
	          throw new Error("object expected for 'style' property");
	        }
	        style = element.style;
	        setStyle = function(k, v) {
	          return style[k] = v;
	        };
	        clearStyle = function(k) {
	          return style[k] = "";
	        };
	        return DomElementFactories.objectDiff(value, oldValue, setStyle, clearStyle, setStyle);
	      default:
	        return element.setAttribute(prop, value);
	    }
	  };

	  DomElementFactories.setDomElementProps = function(element, props) {
	    var results;
	    results = [];
	    for (k in props) {
	      v = props[k];
	      results.push(this.setDomElementProp(element, k, v));
	    }
	    return results;
	  };

	  DomElementFactories.setDomElementChildren = function(element, children) {
	    var child, i, l, len1, message, ref, ref1, ref2, results, text;
	    results = [];
	    for (l = 0, len1 = children.length; l < len1; l++) {
	      child = children[l];
	      if (isString(child)) {
	        results.push((function() {
	          var len2, m, ref, results1;
	          ref = child.split("\n");
	          results1 = [];
	          for (i = m = 0, len2 = ref.length; m < len2; i = ++m) {
	            text = ref[i];
	            if (i > 0) {
	              element.appendChild(document.createElement("br"));
	            }
	            results1.push(element.appendChild(document.createTextNode(text)));
	          }
	          return results1;
	        })());
	      } else {
	        if (!(child instanceof Node)) {
	          message = "DomElementFactory:" + nodeName + ": Child is not a string or instance of Node. Child: " + child;
	          (typeof Neptune !== "undefined" && Neptune !== null ? (ref = Neptune.Art) != null ? (ref1 = ref.Foundation) != null ? (ref2 = ref1.log) != null ? typeof ref2.error === "function" ? ref2.error(message, child) : void 0 : void 0 : void 0 : void 0 : void 0) || console.log(message, child);
	          throw new Error(message);
	        }
	        results.push(element.appendChild(child));
	      }
	    }
	    return results;
	  };


	  /*
	  IN: any combination of arrays and strings
	  OUT: All element-names found in all strings are used to generate dom-element-factory-functions
	    for elements with those names.
	    The output is a plain Object where they keys are the upperCamelCase version of the element-names
	    passed in. The values are the element-factories.
	   */

	  DomElementFactories.createDomElementFactories = function() {
	    var list;
	    list = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return DomElementFactories.createObjectTreeFactories({
	      mergePropsInto: function(into, source) {
	        var results;
	        results = [];
	        for (k in source) {
	          v = source[k];
	          results.push(into[k] = k === "style" ? mergeInto(into[k], v) : v);
	        }
	        return results;
	      }
	    }, list, function(nodeName, props, children) {
	      var element;
	      element = document.createElement(nodeName);
	      DomElementFactories.setDomElementProps(element, props);
	      DomElementFactories.setDomElementChildren(element, children);
	      return element;
	    });
	  };

	  DomElementFactories.allDomElementNames = "A Abbr Acronym Address Applet Area Article Aside Audio B Base BaseFont Bdi Bdo Big BlockQuote Body Br Button Canvas Caption Center Cite Code Col ColGroup DataList Dd Del Details Dfn Dialog Dir Div Dl Dt Em Embed FieldSet FigCaption Figure Font Footer Form Frame FrameSet H1 H2 H3 H4 H5 H6 Head Header Hr Html I IFrame Img Input Ins Kbd KeyGen Label Legend Li Link Main Map Mark Menu MenuItem Meta Meter Nav NoFrames NoScript Object Ol OptGroup Option Output P Param Pre Progress Q Rp Rt Ruby S Samp Script Section Select Small Source Span Strike Strong Style Sub Summary Sup Table TBody Td TextArea TFoot Th THead Time Title Tr Track Tt U Ul Var Video Wbr";

	  ref = DomElementFactories.createDomElementFactories(DomElementFactories.allDomElementNames);
	  for (k in ref) {
	    v = ref[k];
	    DomElementFactories[k] = v;
	  }

	  return DomElementFactories;

	})();


/***/ },
/* 3 */
/***/ function(module, exports) {

	var ObjectDiff;

	module.exports = ObjectDiff = (function() {
	  var defaultEq;

	  function ObjectDiff() {}

	  defaultEq = function(a, b) {
	    return a === b;
	  };


	  /*
	  SBD this has been thouroughly benchmarked on Safari and Chrome as of 2015-11-06
	  This is as fast as I could make it.
	  
	  IN:
	    newObj:   the changed-to object   (must be set)
	    oldObj:   the changed-from object (default: {})
	    added:    (key, newValue) -> null
	              called for each key in newObj that was not in oldObj
	    removed:  (key, oldValue) -> null
	              called for each key in oldObj that is not in newObj
	    changed:  (key, newValue, oldValue) -> null
	              called for each key in both where the value changed
	    noChange: (key, value) -> null
	              called for each key in both where the value stayed the same
	    eq:       (a, b) -> true if a is equal to b
	              DEFAULT: use javascript ===
	              provided for custom concepts of equality
	    oldObjKeyCount: null or a the number of keys in oldObj
	      This last field provides an opportunity for further performance improvement.
	      If you have previously computed the number of keys in oldObj, pass it in.
	      Counting the number of keys in an object can be slow. If we know the number
	      of keys this routine can be more efficient.
	  
	      NOTE that this function returns the key-count of the new object. That way if you
	      are calling objecfDiff several times over a sequence of object changes, can you keep
	      the results from this function, you already have the oldObjKeyCount for the next call.
	  
	  OUT: newObjKeyCount - number of keys in the new object
	   */

	  ObjectDiff.objectDiff = function(newObj, oldObj, added, removed, changed, noChange, eq, oldObjKeyCount) {
	    var k, newObjKeyCount, newValue, oldObjKeyCountIsAtLeast, oldValue;
	    if (eq == null) {
	      eq = defaultEq;
	    }
	    newObjKeyCount = 0;
	    if (!oldObj) {
	      for (k in newObj) {
	        newValue = newObj[k];
	        newObjKeyCount++;
	        added(k, newValue);
	      }
	      return newObjKeyCount;
	    }
	    oldObjKeyCountIsAtLeast = 0;
	    for (k in newObj) {
	      newValue = newObj[k];
	      newObjKeyCount++;
	      if (typeof (oldValue = oldObj[k]) !== "undefined" || oldObj.hasOwnProperty(k)) {
	        oldObjKeyCountIsAtLeast++;
	        if (!eq(newValue, oldValue)) {
	          changed(k, newValue, oldValue);
	        } else {
	          if (typeof noChange === "function") {
	            noChange(k, newValue);
	          }
	        }
	      } else {
	        added(k, newValue);
	      }
	    }
	    if (!(oldObjKeyCount != null) || oldObjKeyCountIsAtLeast !== oldObjKeyCount) {
	      for (k in oldObj) {
	        if (!(typeof newObj[k] !== "undefined" || newObj.hasOwnProperty(k))) {
	          removed(k, oldObj[k]);
	        }
	      }
	    }
	    return newObjKeyCount;
	  };

	  return ObjectDiff;

	})();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectTreeFactory, compactFlatten, fastBind, isFunction, mergeIntoBasic, ref, upperCamelCase;

	ref = __webpack_require__(5), compactFlatten = ref.compactFlatten, upperCamelCase = ref.upperCamelCase;

	mergeIntoBasic = function(into, source) {
	  var k, v;
	  for (k in source) {
	    v = source[k];
	    into[k] = v;
	  }
	  return into;
	};

	isFunction = __webpack_require__(17).isFunction;

	fastBind = __webpack_require__(18).fastBind;

	module.exports = ObjectTreeFactory = (function() {
	  var compactFlattenObjectTreeNodeNames, deepArgsProcessing, nodeNameRegexp, preprocessElementBasic;

	  function ObjectTreeFactory() {}

	  deepArgsProcessing = function(array, children) {
	    var el, i, len;
	    for (i = 0, len = array.length; i < len; i++) {
	      el = array[i];
	      if (el) {
	        if (el.constructor === Array) {
	          deepArgsProcessing(el, children);
	        } else {
	          children.push(el);
	        }
	      }
	    }
	    return null;
	  };


	  /*
	  IN:
	    options:
	      mergePropsInto: (props, ...) ->
	        function to merge arguments 1 on into props
	        default: mergeIntoBasic
	  
	      inspectedName: string
	        for introspection:
	          Factory.getName() == inspectedName
	  
	      class: a class
	        if specified, additioanl properties will be set on the Factory function:
	          Factory.class = class
	          Factory._name = class.getName() + "Factory"
	  
	          all concrete class-methods are made available in the Factory
	          (see BaseObject.abstractClass)
	  
	      bind: string or array of strings
	        NODE: class must be set
	        list of method-names to bind from class onto the factory
	  
	      preprocessElement: (element) -> element
	        can do custom preprocssing of each argument to the factory.
	  
	  
	        defualt: preprocessElementBasic (no-op)
	    nodeFactory: ->
	      IN:
	        props:    plain object mapping props to prop-values
	        children: flat, compacted array of children nodes
	      OUT:
	        node
	  
	  OUT: objectTreeFactory = ->
	    IN:
	      Arguments are compacted and flattened
	      The resulting list of arguments can be any combination of:
	        plainObjects for props (merged in the order they appear)
	        other objects which become the 'children'
	  
	    OUT:
	      object-tree-node generated by the nodeFactory
	   */

	  preprocessElementBasic = function(a) {
	    return a;
	  };

	  ObjectTreeFactory.createObjectTreeFactory = function(options, nodeFactory) {
	    var Factory, abstractClass, bindList, i, inspectedName, k, klass, len, mergePropsInto, preprocessElement, v;
	    if (!nodeFactory) {
	      nodeFactory = options;
	      options = {};
	    }
	    mergePropsInto = options.mergePropsInto, inspectedName = options.inspectedName, preprocessElement = options.preprocessElement;
	    mergePropsInto || (mergePropsInto = mergeIntoBasic);
	    preprocessElement || (preprocessElement = preprocessElementBasic);
	    Factory = function() {
	      var children, el, i, len, oneProps, props;
	      oneProps = null;
	      props = null;
	      children = [];
	      for (i = 0, len = arguments.length; i < len; i++) {
	        el = arguments[i];
	        if (el = preprocessElement(el)) {
	          switch (el.constructor) {
	            case Object:
	              if (oneProps) {
	                props = {};
	                mergePropsInto(props, oneProps);
	                oneProps = null;
	              }
	              if (props) {
	                mergePropsInto(props, el);
	              } else {
	                oneProps = el;
	              }
	              break;
	            case Array:
	              deepArgsProcessing(el, children);
	              break;
	            default:
	              children.push(el);
	          }
	        }
	      }
	      props || (props = oneProps || {});
	      return nodeFactory(props, children);
	    };
	    if (klass = options["class"]) {
	      Factory["class"] = klass;
	      abstractClass = klass.getAbstractClass();
	      bindList = compactFlatten([
	        (function() {
	          var results;
	          results = [];
	          for (k in klass) {
	            v = klass[k];
	            if (!abstractClass[k] && isFunction(v)) {
	              results.push(k);
	            }
	          }
	          return results;
	        })(), options.bind
	      ]);
	      inspectedName || (inspectedName = klass.getName() + "Factory");
	      for (i = 0, len = bindList.length; i < len; i++) {
	        k = bindList[i];
	        Factory[k] = fastBind(klass[k], klass);
	      }
	    }
	    if (inspectedName) {
	      Factory._name = inspectedName;
	    }
	    Factory.inspect = function() {
	      return "<" + (inspectedName || 'ObjectTreeFactory') + ">";
	    };
	    return Factory;
	  };


	  /*
	  IN:
	    list: a string or abitrary structure of arrays, nulls and strings
	      each string is split into tokens and each token is used as the nodeTypeName to create a Tree-factory
	    nodeFactory: (nodeTypeName, props, children) -> node
	      IN:
	        nodeTypeName: node-type name
	        props:    plain object mapping props to prop-values
	        children: flat, compacted array of children nodes
	      OUT:
	        node
	  OUT:
	    map from nodeNames (upperCamelCased) to the factories returned from createObjectTreeFactory
	  
	  TODO:
	    PERFORMANCE TEST:
	      createObjectTreeFactoriesFromFactories
	      vs
	      createObjectTreeFactoriesFromFactoryFactories
	  
	      The latter is probably faster. It is also more powerful and generally cleaner.
	   */

	  ObjectTreeFactory.createObjectTreeFactories = function(options, list, nodeFactory) {
	    var ref1;
	    if (!nodeFactory) {
	      ref1 = [options, list], list = ref1[0], nodeFactory = ref1[1];
	      options = {};
	    }
	    if (nodeFactory.length === 1) {
	      return ObjectTreeFactory._createObjectTreeFactoriesFromFactoryFactories(options, list, nodeFactory);
	    } else {
	      return ObjectTreeFactory._createObjectTreeFactoriesFromFactories(options, list, nodeFactory);
	    }
	  };

	  ObjectTreeFactory._createObjectTreeFactoriesFromFactories = function(options, list, nodeFactory) {
	    var fn, i, len, nodeTypeName, out, ref1, suffix;
	    suffix = options.suffix || '';
	    out = {};
	    ref1 = compactFlattenObjectTreeNodeNames(list);
	    fn = function(nodeTypeName) {
	      options.inspectedName = nodeTypeName;
	      return out[upperCamelCase(nodeTypeName) + suffix] = ObjectTreeFactory.createObjectTreeFactory(options, function(props, children) {
	        return nodeFactory(nodeTypeName, props, children);
	      });
	    };
	    for (i = 0, len = ref1.length; i < len; i++) {
	      nodeTypeName = ref1[i];
	      fn(nodeTypeName);
	    }
	    return out;
	  };

	  nodeNameRegexp = /[a-z0-9_]+/ig;

	  ObjectTreeFactory._compactFlattenObjectTreeNodeNames = compactFlattenObjectTreeNodeNames = function(list) {
	    var i, len, out, ref1, str;
	    if (typeof list === "string") {
	      return list.match(nodeNameRegexp);
	    }
	    out = [];
	    ref1 = compactFlatten(list);
	    for (i = 0, len = ref1.length; i < len; i++) {
	      str = ref1[i];
	      out = out.concat(str.match(nodeNameRegexp));
	    }
	    return out;
	  };

	  ObjectTreeFactory._createObjectTreeFactoriesFromFactoryFactories = function(options, list, nodeFactoryFactory) {
	    var i, len, name, nodeFactory, nodeTypeName, out, ref1, suffix;
	    suffix = options.suffix || '';
	    out = {};
	    ref1 = compactFlattenObjectTreeNodeNames(list);
	    for (i = 0, len = ref1.length; i < len; i++) {
	      nodeTypeName = ref1[i];
	      nodeFactory = nodeFactoryFactory(nodeTypeName);
	      name = upperCamelCase(nodeTypeName) + suffix;
	      options.inspectedName = name;
	      out[name] = ObjectTreeFactory.createObjectTreeFactory(options, nodeFactory);
	    }
	    return out;
	  };

	  return ObjectTreeFactory;

	})();


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7).includeInNamespace(__webpack_require__(14)).addModules({
	  ArrayCompactFlatten: __webpack_require__(15),
	  StringCase: __webpack_require__(16)
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Neptune, NeptuneLib,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Neptune = __webpack_require__(8);

	module.exports = Neptune.NeptuneLib || Neptune.addNamespace('NeptuneLib', NeptuneLib = (function(superClass) {
	  extend(NeptuneLib, superClass);

	  function NeptuneLib() {
	    return NeptuneLib.__super__.constructor.apply(this, arguments);
	  }

	  return NeptuneLib;

	})(Neptune.Base));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/*
	TODO: Make NN ugifly-mangler friendly. In order to do that, we need
	to stop using the function.name attribute.

	I think we can do that with one change: addNamespace needs to
	change to take a name argument: @addNamespace: (name, namespace) ->
	 */
	var Base, Neptune, isFunction, isPlainArray,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	__webpack_require__(10);

	__webpack_require__(11);

	isFunction = function(f) {
	  return typeof f === "function";
	};

	isPlainArray = function(o) {
	  return o.constructor === Array;
	};

	Base = (function() {
	  var excludedPropNames;

	  function Base() {}

	  Base.allNamespaces = {};

	  Base.getAllNamespacePaths = function() {
	    return Object.keys(Base.allNamespaces).sort();
	  };

	  Base._name = "Base";

	  Base.namespacePath = "Neptune.Base";

	  Base.namespace = null;

	  Base.namespaces = {};

	  Base.modules = {};

	  Base.getNamespacePath = function() {
	    return this.namespacePath;
	  };

	  Base.getNamespaceNames = function() {
	    return Object.keys(this.namespaces).sort();
	  };

	  Base.getModuleNames = function() {
	    return Object.keys(this.modules).sort();
	  };

	  Base.getInspectedObjects = function(includeModules) {
	    var j, len, name, namespace, out, ref;
	    if (includeModules == null) {
	      includeModules = true;
	    }
	    out = {};
	    if (this.version) {
	      out.version = this.version;
	    }
	    ref = this.namespaces;
	    for (namespace = j = 0, len = ref.length; j < len; namespace = ++j) {
	      name = ref[namespace];
	      out[name] = namespace.getInspectedObjects(includeModules);
	    }
	    if (includeModules && this.getModuleNames().length > 0) {
	      out.modules = this.getModuleNames().join(', ');
	    }
	    return out;
	  };

	  Base.addNamespace = function(name, namespace) {
	    return this.allNamespaces[namespace.namespacePath] = this.namespaces[name] = this[name] = namespace._init(name, this);
	  };

	  Base.addModules = function(map) {
	    var module, name;
	    for (name in map) {
	      module = map[name];
	      this._setChildNamespaceProps(name, module);
	      if (!name.match(/^-/)) {
	        this.modules[name] = this[name] = module;
	      }
	    }
	    return this;
	  };


	  /*
	  IN: any combination of objects or arrays
	    object: all properties in the object are added to the namespace
	  
	    array: [fromObject, property names as one or more strings]
	      for propName in every sub-string in args matching: /[0-9a-z_]+/ig
	        @_addToNamespace propName, fromObject
	  
	      Each string is parsed to find everything that matches: /[0-9a-z_]+/ig
	      All resulting property names are concated into a one list.
	      Every property in fromObject that matches one of the property-names is added to the namespace.
	   */

	  Base.includeInNamespace = function() {
	    var arg, args, fromObject, i, j, k, l, len, len1, propName, ref, ref1, v;
	    args = arguments.length === 1 && isPlainArray(arguments[0]) ? arguments[0] : arguments;
	    for (j = 0, len = args.length; j < len; j++) {
	      arg = args[j];
	      if (arg) {
	        if (isPlainArray(arg)) {
	          fromObject = arg[0];
	          for (i = k = 1, ref = arg.length; 1 <= ref ? k < ref : k > ref; i = 1 <= ref ? ++k : --k) {
	            ref1 = arg[i].match(/[0-9a-z_]+/ig);
	            for (l = 0, len1 = ref1.length; l < len1; l++) {
	              propName = ref1[l];
	              this._addToNamespace(propName, fromObject);
	            }
	          }
	        } else {
	          for (propName in arg) {
	            v = arg[propName];
	            this._addToNamespace(propName, arg);
	          }
	        }
	      }
	    }
	    return this;
	  };


	  /*
	  Every child of a namespace gets these properties:
	  
	    namespace:      pointer to the parent namespace
	    namespacePath:  string path from global to child
	  
	  NOTE: only modules which return a class or function
	    get their namespace-props set.
	   */

	  Base._setChildNamespaceProps = function(name, child) {
	    if (isFunction(child)) {
	      if (isFunction(child["class"])) {
	        this._setChildNamespaceProps(name, child["class"]);
	      }
	      child.namespace = this;
	      return child.namespacePath = this.namespacePath + "." + name;
	    }
	  };


	  /*
	  CoffeeScript classes copy all class props when inheriting,
	  but some props need to be unique to each instance. This
	  function initializes those props.
	   */

	  Base._init = function(name, namespace1) {
	    this.namespace = namespace1;
	    this._name = name;
	    this.modules = {};
	    this.namespaces = {};
	    this.namespace._setChildNamespaceProps(name, this);
	    return this;
	  };

	  excludedPropNames = ["__super__"].concat(Object.keys(Base));


	  /*
	  Helper for includeInNamespace.
	  Add anything to the namespace.
	  
	  IN:
	    propName:   property name to  value will be assigned to in the namespace (string)
	    addingFrom: object
	      used for reporting errors if attempting to overwrite an
	      existing item.
	  
	  EFFECT:
	    Only adds value if @[propName] is not already set.
	    Otherwise, reports error and continues.
	  
	  OUT: value
	   */

	  Base._addToNamespace = function(propName, addingFrom) {
	    var addingFromString, value;
	    if (indexOf.call(excludedPropNames, propName) >= 0) {
	      return;
	    }
	    if (!(value = addingFrom[propName])) {
	      return;
	    }
	    if (this[propName]) {
	      if (this[propName] !== value) {
	        addingFromString = addingFrom.namespacePath || addingFrom.propName || (Object.keys(addingFrom)).join(', ');
	        console.error(this.namespacePath + " already has key: " + propName + ". Adding from: " + addingFromString);
	      }
	      return this[propName];
	    } else {
	      return this[propName] = value;
	    }
	  };

	  return Base;

	})();

	module.exports = global.Neptune = Neptune = (function(superClass) {
	  var _package;

	  extend(Neptune, superClass);

	  function Neptune() {
	    return Neptune.__super__.constructor.apply(this, arguments);
	  }

	  Neptune.Base = Base;

	  Neptune.namespacePath = "Neptune";

	  Neptune.namespace = null;

	  Neptune.isNamespace = function(klass) {
	    return (klass != null ? klass.prototype : void 0) instanceof Base;
	  };

	  Neptune.isNode = __webpack_require__(12);

	  Neptune["package"] = _package = __webpack_require__(13);

	  Neptune.version = _package.version;

	  return Neptune;

	})(Base);

	Base.namespace = Neptune;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {if (typeof global === 'object') {
	  global.self = global;
	} else if (typeof self === 'object') {
	  self.global = self;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {if ((function() {}).name == null) {
	  Object.defineProperty(global.Function.prototype, 'name', {
	    get: function() {
	      var matches, name;
	      name = (matches = this.toString().match(/^\s*function\s*([^\s(]+)/)) ? matches[1] : "";
	      Object.defineProperty(this, 'name', {
	        value: name
	      });
	      return name;
	    }
	  });
	}

	global.Function.prototype.getName = function() {
	  return this._name || this.name || "anonymousFunction";
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = false;

	// Only Node.JS has a process variable that is of [[Class]] process
	try {
	 module.exports = Object.prototype.toString.call(global.process) === '[object process]' 
	} catch(e) {}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {
		"name": "neptune-namespaces",
		"version": "1.4.1",
		"description": "Generate index.coffee and namespace.coffee files from directory structures",
		"scripts": {
			"test": "neptune-namespaces --std;mocha -u tdd --compilers coffee:coffee-script/register -w"
		},
		"author": "Shane Brinkman-Davis Delamore",
		"license": "MIT",
		"preferGlobal": true,
		"bin": {
			"neptune-namespaces": "./neptune-namespaces"
		},
		"repository": {
			"type": "git",
			"url": "https://github.com/Imikimi-LLC/neptune-namespaces"
		},
		"main": "index.coffee",
		"dependencies": {
			"coffee-loader": "^0.7.2",
			"coffee-script": "^1.10.0",
			"colors": "^1.1.2",
			"detect-node": "^2.0.3",
			"fs-promise": "^0.5.0",
			"glob": "^7.1.1",
			"commander": "^2.9.0"
		},
		"devDependencies": {
			"chai": "^3.5.0",
			"mocha": "^2.5.3"
		}
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [__webpack_require__(15), __webpack_require__(16)];


/***/ },
/* 15 */
/***/ function(module, exports) {

	var ArrayCompactFlatten;

	module.exports = ArrayCompactFlatten = (function() {
	  var arraySlice, compact, compactFlattenIfNeeded, deepArrayEach, doFlattenInternal, flatten, isArguments, isArrayOrArguments, keepAll, keepUnlessNullOrUndefined, needsFlatteningOrCompacting;

	  function ArrayCompactFlatten() {}

	  ArrayCompactFlatten.isArguments = isArguments = function(o) {
	    return o.constructor === Object && (typeof o.callee === "function") && (typeof o.length === "number");
	  };

	  ArrayCompactFlatten.isArrayOrArguments = isArrayOrArguments = function(o) {
	    return o && (o.constructor === Array || isArguments(o));
	  };

	  ArrayCompactFlatten.needsFlatteningOrCompacting = needsFlatteningOrCompacting = function(array, keepTester) {
	    var a, i, len;
	    for (i = 0, len = array.length; i < len; i++) {
	      a = array[i];
	      if (isArrayOrArguments(a) || !keepTester(a)) {
	        return true;
	      }
	    }
	    return false;
	  };

	  ArrayCompactFlatten.keepUnlessNullOrUndefined = keepUnlessNullOrUndefined = function(a) {
	    return a !== null && a !== void 0;
	  };


	  /*
	  IN:
	    array: array or arguments-object
	    keepTester: (value) -> true/false
	      OUT: return true if that element should be in the output
	  
	  OUT: array where all elements test true to keepTester
	  NOTE: NOT recursive - just does a shallow pass
	   */

	  ArrayCompactFlatten.compact = compact = function(array, keepTester) {
	    var a, i, len;
	    if (keepTester == null) {
	      keepTester = keepUnlessNullOrUndefined;
	    }
	    for (i = 0, len = array.length; i < len; i++) {
	      a = array[i];
	      if (!keepTester(a)) {
	        return (function() {
	          var j, len1, results;
	          results = [];
	          for (j = 0, len1 = array.length; j < len1; j++) {
	            a = array[j];
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


	  /*
	  IN: accepts any number of arguments
	  NOTE: RECURSIVE: recurses into all arry or arguments-objects and adds their contents
	    to the top level (flatten)
	   */

	  ArrayCompactFlatten.flatten = flatten = function(firstArg) {
	    return compactFlattenIfNeeded(arguments.length === 1 ? isArrayOrArguments(firstArg) ? firstArg : [firstArg] : arguments);
	  };


	  /*
	  IN: array: any object that has a length
	  
	  EFFECT:
	    itterates over array and recurse over any element which isArrayOrArguments
	    invokes f on every element that is not isArrayOrArguments
	  OUT: array (same as passed in)
	   */

	  ArrayCompactFlatten.deepArrayEach = deepArrayEach = function(array, f) {
	    var el, i, len;
	    for (i = 0, len = array.length; i < len; i++) {
	      el = array[i];
	      if (isArrayOrArguments(el)) {
	        deepArrayEach(el, f);
	      } else {
	        f(el);
	      }
	    }
	    return array;
	  };


	  /*
	  IN:
	    array: array or arguments-object
	    keepTester: (value) -> true/false
	      OUT: return true if that element should be in the output
	  
	  OUT: array where all elements test true to keepTester
	  NOTE: RECURSIVE: recurses into all arry or arguments-objects and adds their contents
	    to the top level (flatten)
	   */

	  ArrayCompactFlatten.compactFlatten = function(array, keepTester) {
	    if (keepTester == null) {
	      keepTester = keepUnlessNullOrUndefined;
	    }
	    return compactFlattenIfNeeded(array, keepTester);
	  };

	  arraySlice = Array.prototype.slice;

	  doFlattenInternal = function(array, keepTester) {
	    var output;
	    output = [];
	    deepArrayEach(array, function(el) {
	      if (keepTester(el)) {
	        return output.push(el);
	      }
	    });
	    return output;
	  };

	  keepAll = function() {
	    return true;
	  };

	  compactFlattenIfNeeded = function(array, keepTester) {
	    if (keepTester == null) {
	      keepTester = keepAll;
	    }
	    if (needsFlatteningOrCompacting(array, keepTester)) {
	      return doFlattenInternal(array, keepTester);
	    } else if (array.constructor !== Array) {
	      return arraySlice.call(array);
	    } else {
	      return array;
	    }
	  };

	  return ArrayCompactFlatten;

	})();


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var StringCase, compactFlatten;

	compactFlatten = __webpack_require__(15).compactFlatten;

	module.exports = StringCase = (function() {
	  function StringCase() {}

	  StringCase.getCodeWords = function(str) {
	    var _words, word, words;
	    _words = str.match(/[a-zA-Z][a-zA-Z0-9]*/g);
	    if (!_words) {
	      return [];
	    }
	    words = (function() {
	      var i, len, results;
	      results = [];
	      for (i = 0, len = _words.length; i < len; i++) {
	        word = _words[i];
	        results.push(word.match(/[A-Z]+[a-z0-9]*|[a-z0-9]+/g));
	      }
	      return results;
	    })();
	    return compactFlatten(words);
	  };

	  StringCase.capitalize = function(str) {
	    return str.charAt(0).toUpperCase() + str.slice(1);
	  };

	  StringCase.decapitalize = function(str) {
	    return str.charAt(0).toLowerCase() + str.slice(1);
	  };

	  StringCase.getLowerCaseCodeWords = function(str) {
	    var i, len, ref, results, word;
	    ref = StringCase.getCodeWords(str);
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      word = ref[i];
	      results.push(word.toLowerCase());
	    }
	    return results;
	  };

	  StringCase.upperCamelCase = function(str) {
	    var word;
	    return ((function() {
	      var i, len, ref, results;
	      ref = this.getLowerCaseCodeWords(str);
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        word = ref[i];
	        results.push(this.capitalize(word));
	      }
	      return results;
	    }).call(StringCase)).join("");
	  };

	  StringCase.lowerCamelCase = function(str) {
	    return StringCase.decapitalize(StringCase.upperCamelCase(str));
	  };

	  StringCase.snakeCase = function(str) {
	    return (StringCase.getLowerCaseCodeWords(str)).join("_");
	  };

	  StringCase.dashCase = function(str) {
	    return (StringCase.getLowerCaseCodeWords(str)).join("-");
	  };

	  return StringCase;

	})();


/***/ },
/* 17 */
/***/ function(module, exports) {

	
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

	module.exports = Types = (function() {
	  var cloneObjectUpToKey, deepEach, deepEachAll, deepMap, deepMapArray, deepMapObject, functionName, hasOwnProperties, hasProperties, isClass, isFunction, isJsonAtomicType, isNumber, isObject, isPlainArray, isPlainObject, isString, noopMapper, objectName, toJsonStructure, toPostMessageStructure;

	  function Types() {}

	  Types.isPromise = function(obj) {
	    return isFunction(obj != null ? obj.then : void 0);
	  };

	  Types.isRegExp = function(obj) {
	    return obj instanceof RegExp;
	  };

	  Types.isNumber = isNumber = function(obj) {
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

	  Types.isBoolean = function(obj) {
	    return obj === true || obj === false;
	  };

	  Types.isClass = isClass = function(obj) {
	    return !!(typeof obj === "function" && ((typeof obj.__super__ === "object") || (hasOwnProperties(obj)) || (obj.prototype && hasProperties(obj.prototype))));
	  };

	  Types.isJsonAtomicType = isJsonAtomicType = function(a) {
	    return isString(a) || isNumber(a) || a === true || a === false || a === null;
	  };

	  Types.isJsonType = function(a) {
	    return isJsonAtomicType(a) || isPlainObject(a) || isPlainArray(a);
	  };

	  Types.gt = function(a, b) {
	    if (isFunction(a.gt)) {
	      return a.gt(b);
	    } else {
	      return a > b;
	    }
	  };

	  Types.lt = function(a, b) {
	    if (isFunction(a.lt)) {
	      return a.lt(b);
	    } else {
	      return a < b;
	    }
	  };

	  Types.gte = function(a, b) {
	    if (isFunction(a.gte)) {
	      return a.gte(b);
	    } else {
	      return a >= b;
	    }
	  };

	  Types.lte = function(a, b) {
	    if (isFunction(a.lte)) {
	      return a.lte(b);
	    } else {
	      return a <= b;
	    }
	  };


	  /*
	  like RubyOnRails#present:
	    "An object is present if it's not blank."
	  
	  basic:
	    present null, undefined or "" returns false (or whatever returnIfNotPresent is set to)
	    all other values return something truish - generally themselves
	  
	  custom:
	    for bar where isFunction bar.present
	      present bar returns bar.present()
	  
	  special-case truish results:
	    present 0 or false returns true
	  
	  for any other value foo,
	    present foo returns foo
	  
	  IN:
	    obj:
	      object tested for presence
	    returnIfNotPresent: [false]
	      what to return if not present
	  
	  OUT:
	    returnIfNotPresent, true, or the value passed in
	  
	  If 'obj' has method: obj.present() => obj.present()
	   */

	  Types.present = function(obj, returnIfNotPresent) {
	    var present;
	    if (returnIfNotPresent == null) {
	      returnIfNotPresent = false;
	    }
	    present = isFunction(obj != null ? obj.getPresent : void 0) ? obj.getPresent() : isFunction(obj != null ? obj.present : void 0) ? obj.present() : isString(obj) ? !obj.match(/^\s*$/) : obj !== void 0 && obj !== null;
	    if (present) {
	      return obj || true;
	    } else {
	      return returnIfNotPresent;
	    }
	  };

	  Types.isObject = isObject = function(obj) {
	    return !!obj && typeof obj === "object" && !isPlainArray(obj);
	  };

	  Types.functionName = functionName = function(f) {
	    var matched;
	    return f.name || ((matched = ("" + f).match(/function ([a-zA-Z]+)\(/)) && matched[1]) || "function";
	  };

	  Types.objectName = objectName = function(obj) {
	    var a, name, ref;
	    if (!obj) {
	      return "" + obj;
	    } else if (a = typeof obj.getNamespacePath === "function" ? obj.getNamespacePath() : void 0) {
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

	  Types.hasProperties = hasProperties = function(o) {
	    var k;
	    for (k in o) {
	      return true;
	    }
	    return false;
	  };

	  Types.hasOwnProperties = hasOwnProperties = function(o) {
	    var k;
	    for (k in o) {
	      if (o.hasOwnProperty(k)) {
	        return true;
	      }
	    }
	    return false;
	  };


	  /*
	  IN:
	    f: (value, [key]) ->
	      f is called on every non-plainObject and non-plainArray reachable by traversing
	      the plainObject/plainArray structure
	      If f is called on a propery of a plainObject, the key for that property is also passed in.
	   */

	  Types.deepEach = deepEach = function(v, f, key) {
	    var j, k, len, subV;
	    if (isPlainArray(v)) {
	      for (j = 0, len = v.length; j < len; j++) {
	        subV = v[j];
	        deepEach(subV, f);
	      }
	    } else if (isPlainObject(v)) {
	      for (k in v) {
	        subV = v[k];
	        deepEach(subV, f, k);
	      }
	    } else {
	      f(v, key);
	    }
	    return v;
	  };


	  /*
	  deepEachAll: just like deepEach except 'f' gets called on every value found including the initial value.
	   */

	  Types.deepEachAll = deepEachAll = function(v, f, key) {
	    var j, k, len, subV;
	    f(v, key);
	    if (isPlainArray(v)) {
	      for (j = 0, len = v.length; j < len; j++) {
	        subV = v[j];
	        deepEachAll(subV, f);
	      }
	    } else if (isPlainObject(v)) {
	      for (k in v) {
	        subV = v[k];
	        deepEachAll(subV, f, k);
	      }
	    } else {

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

	  noopMapper = function(v) {
	    return v;
	  };


	  /*
	  Applies "f" to every -value- in a nested structure of plain arrays and objects.
	  Pure functional efficient:
	    If an array or object, and all its sub values, didn't change, the original array/object is reused.
	  
	  NOTE: deepMap only yields values to 'mapper' which are NOT plain arrays nor plain objects.
	   */

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
	      if (isObject(o)) {
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


	  /*
	  similar to toPlainStructure, except all non-JSON types are converted to strings
	   */

	  Types.toJsonStructure = toJsonStructure = function(o) {
	    return deepMap(o, function(o) {
	      if (isObject(o)) {
	        if (o.toJsonStructure) {
	          return o.toJsonStructure();
	        } else {
	          return toJsonStructure(o.toPlainStructure ? o.toPlainStructure() : "" + o);
	        }
	      } else if (isJsonAtomicType(o)) {
	        return o;
	      } else {
	        return "" + o;
	      }
	    });
	  };

	  Types.toPostMessageStructure = toPostMessageStructure = function(o) {
	    return deepMap(o, function(o) {
	      switch (o.constructor) {
	        case ArrayBuffer:
	        case Date:
	        case RegExp:
	        case Blob:
	        case File:
	        case FileList:
	        case ImageData:
	        case Boolean:
	        case String:
	          return o;
	        default:
	          if (isObject(o)) {
	            if (o.toPostMessageStructure) {
	              return o.toPostMessageStructure();
	            } else {
	              if (o.toPlainStructure) {
	                return toPostMessageStructure(o.toPlainStructure());
	              } else {
	                return "" + o;
	              }
	            }
	          } else {
	            return "" + o;
	          }
	      }
	    });
	  };

	  return Types;

	})();


/***/ },
/* 18 */
/***/ function(module, exports) {

	var Function;

	module.exports = Function = (function() {
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


	/*
	TODO:

	The above options are not hot-reload compatible. However, this alternative would be:

	  name = fn.name
	  -> _this[name].apply _this, arguments

	I need to perf-test this. Or, I need to finally start using a global "debug" mode that could use this
	in debug mode and the faster(?), non hot-reload options in production mode.
	 */


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var ref, ref1;

	module.exports = ((ref = global.Neptune) != null ? (ref1 = ref.Art) != null ? ref1.Foundation : void 0 : void 0) || __webpack_require__(20);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21).includeInNamespace(__webpack_require__(23));

	__webpack_require__(65);

	__webpack_require__(102);

	__webpack_require__(72);

	__webpack_require__(24);

	__webpack_require__(81);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Art, Foundation,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Art = __webpack_require__(22);

	module.exports = Art.Foundation || Art.addNamespace('Foundation', Foundation = (function(superClass) {
	  extend(Foundation, superClass);

	  function Foundation() {
	    return Foundation.__super__.constructor.apply(this, arguments);
	  }

	  return Foundation;

	})(Neptune.Base));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Art, Neptune,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Neptune = __webpack_require__(8);

	module.exports = Neptune.Art || Neptune.addNamespace('Art', Art = (function(superClass) {
	  extend(Art, superClass);

	  function Art() {
	    return Art.__super__.constructor.apply(this, arguments);
	  }

	  return Art;

	})(Neptune.Base));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var _package;

	module.exports = [
	  __webpack_require__(24), __webpack_require__(65), __webpack_require__(72), __webpack_require__(81), {
	    "package": _package = __webpack_require__(101),
	    version: _package.version
	  }
	];


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25).includeInNamespace(__webpack_require__(26)).addModules({
	  ArrayExtensions: __webpack_require__(31),
	  AsyncExtensions: __webpack_require__(34),
	  CallStack: __webpack_require__(64),
	  Clone: __webpack_require__(62),
	  CommonJs: __webpack_require__(43),
	  Eq: __webpack_require__(35),
	  Function: __webpack_require__(18),
	  Hash: __webpack_require__(36),
	  Log: __webpack_require__(63),
	  Map: __webpack_require__(48),
	  Math: __webpack_require__(32),
	  MinimalBaseObject: __webpack_require__(50),
	  ObjectDiff: __webpack_require__(3),
	  ParseUrl: __webpack_require__(37),
	  Promise: __webpack_require__(27),
	  PromisedFileReader: __webpack_require__(38),
	  Regexp: __webpack_require__(33),
	  Ruby: __webpack_require__(39),
	  ShallowClone: __webpack_require__(40),
	  String: __webpack_require__(41),
	  Time: __webpack_require__(42),
	  Types: __webpack_require__(17),
	  Unique: __webpack_require__(49)
	});

	__webpack_require__(44);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation, StandardLib,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(21);

	module.exports = Foundation.StandardLib || Foundation.addNamespace('StandardLib', StandardLib = (function(superClass) {
	  extend(StandardLib, superClass);

	  function StandardLib() {
	    return StandardLib.__super__.constructor.apply(this, arguments);
	  }

	  return StandardLib;

	})(Neptune.Base));


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [[__webpack_require__(27), "testPromise", "containsPromises", "deepAll"], __webpack_require__(5), __webpack_require__(31), __webpack_require__(34), __webpack_require__(35), __webpack_require__(18), __webpack_require__(3), __webpack_require__(36), __webpack_require__(32), __webpack_require__(37), __webpack_require__(38), __webpack_require__(33), __webpack_require__(39), __webpack_require__(40), __webpack_require__(41), __webpack_require__(42), __webpack_require__(17), __webpack_require__(43), __webpack_require__(44), __webpack_require__(62), __webpack_require__(63), __webpack_require__(64)];


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var ArtPromise, Promise, deepEach, deepMap, isFunction, ref;

	Promise = __webpack_require__(28);

	ref = __webpack_require__(17), deepMap = ref.deepMap, deepEach = ref.deepEach, isFunction = ref.isFunction;


	/*
	ArtPromise extends ES6 Promises in the following ways:

	- constructing a promise with no parameters is allowed
	- promise.resolve and promise.reject are supported as
	  alternative ways to resolve or reject a promise

	If native promises are supported, they are used,
	otherwise a polyfill is used.

	TODO:
	  ES6 says Promises are designed to be extensible:
	  http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects

	  If I properly extend Promise, will my new methods be available on all promise objects... ???
	    At least all promises chained off of one created using my Promise class... ???

	  But I had problems doing that. Maybe it's how CoffeeScript extends things?

	TODO:
	  I want a way to do 'then' and 'catch' without effecting any following 'thens' or 'caches'

	  It's easy to implement, but what to call it? Leaning towards tapThen. If I had Ruby's 'tap', then
	  I could do this effectively with:

	    .tap (a) -> a.then ->
	    but
	    .tapThen ->
	    is even nicer

	  Will it be available on returned promises?
	    (see ES6 Promise extension above)

	  tapThen: (successF, failF) ->
	    @then successF, failF
	    @ # return the current promise, not the one returned from the then-call above
	 */

	module.exports = ArtPromise = (function() {
	  var isPromise, noop;

	  ArtPromise.ES6Promise = Promise;

	  ArtPromise.all = Promise.all;

	  ArtPromise.race = Promise.race;

	  ArtPromise.reject = Promise.reject;

	  ArtPromise.resolve = Promise.resolve;

	  ArtPromise.then = function(f) {
	    return Promise.resolve().then(f);
	  };

	  ArtPromise.isPromise = isPromise = function(f) {
	    return isFunction(f != null ? f.then : void 0);
	  };

	  ArtPromise.testPromise = function(promise) {
	    promise.then(function(v) {
	      return console.log("promise.resolve", v);
	    });
	    return promise["catch"](function(v) {
	      return console.log("promise.reject", v);
	    });
	  };

	  ArtPromise.mapAll = function(map) {
	    var key, keys;
	    keys = Object.keys(map);
	    return Promise.all((function() {
	      var j, len, results;
	      results = [];
	      for (j = 0, len = keys.length; j < len; j++) {
	        key = keys[j];
	        results.push(map[key]);
	      }
	      return results;
	    })()).then(function(values) {
	      var i, j, key, len, out;
	      out = {};
	      for (i = j = 0, len = keys.length; j < len; i = ++j) {
	        key = keys[i];
	        out[key] = values[i];
	      }
	      return out;
	    });
	  };

	  ArtPromise.containsPromises = function(plainStructure) {
	    var containsPromises;
	    containsPromises = false;
	    deepEach(plainStructure, function(v) {
	      return containsPromises || (containsPromises = isPromise(v));
	    });
	    return containsPromises;
	  };

	  noop = function(a) {
	    return a;
	  };

	  ArtPromise.deepAll = function(plainStructure, resolvedResultPreprocessor) {
	    var promises;
	    if (resolvedResultPreprocessor == null) {
	      resolvedResultPreprocessor = noop;
	    }
	    promises = [];
	    deepEach(plainStructure, function(v) {
	      if (isPromise(v)) {
	        return promises.push(v);
	      }
	    });
	    return Promise.all(promises).then(function(resolved) {
	      var i;
	      i = 0;
	      return deepMap(plainStructure, function(v) {
	        if (isPromise(v)) {
	          return resolvedResultPreprocessor(resolved[i++]);
	        } else {
	          return v;
	        }
	      });
	    });
	  };


	  /*
	  Serializer makes it easy to ensure promise-returning functions are invoked in order, after each
	  promise is resolved.
	  
	  USAGE:
	  
	     * EXAMPLE 1: Basic - not too different from normal Promise sequences
	    serializer = new ArtPromise.Serializer
	    serializer.then -> doA()
	  
	     * then execute sometime later, possbly asynchronously:
	    serializer.then -> doB()
	  
	     * then execute sometime later, possbly asynchronously:
	    serializer.then (doBResult) ->
	       * doA and doB have completed and any returning promises resolved
	       * the result of the last 'then' is passed in
	  
	     * EXAMPLE 2: apply the same async function serially to each element in list
	     * - list's order is preserved
	     * - each invocation waits for the previous one to complete
	    serializer = new ArtPromise.Serializer
	    list.forEach serializer.serialize f = (element) -> # do something with element, possibly returning a promise
	    serializer.then (lastFResult) ->
	       * do something after the last invocation of f completes
	       * the result of the last invocation of 'f' is passed in
	  
	     * EXAMPLE 3: mix multiple serialized functions and manual @then invocations
	     * - invocation order is perserved
	    serializer = new ArtPromise.Serializer
	    serializedA = serializer.serialize aFunction
	    serializedB = serializer.serialize bFunction
	  
	    serializedB()
	    serializer.then -> @cFunction()
	    serializedB()
	    serializedA()
	    serializedB()
	  
	    serializer.then (lastBFunctionResult) ->
	       * this is invoked AFTER:
	       * evaluating, in order, waiting for any promises:
	       *   bFunction, cFunction, bFunction, aFunction, bFunction
	   */

	  ArtPromise.Serializer = (function() {
	    function Serializer() {
	      this._lastPromise = ArtPromise.resolve();
	    }


	    /*
	    Returns a new function, serializedF, that acts just like 'f'
	      - f is forced to be async:
	        - if f doesn't return a promise, a promise wrapping f's result is returned
	      - invoking serializedF queues f in this serializer instance's sequence via @then
	    IN: any function with any signature
	    OUT: (f's signature) -> promise.then (fResult) ->
	    
	    Example with Comparison:
	    
	       * all asyncActionReturningPromise(element)s get called immediately
	       * and may complete randomly at some later event
	      myArray.forEach (element) ->
	        asyncActionReturningPromise element
	    
	       * VS
	    
	       * asyncActionReturningPromise(element) only gets called
	       * after the previous call completes.
	       * If a previous call failes, the remaining calls never happen.
	      serializer = new Promise.Serializer
	      myArray.forEach serializer.serialize (element) ->
	        asyncActionReturningPromise element
	    
	       * bonus, you can do things when all the promises complete:
	      serializer.then =>
	    
	       * or if anything fails
	      serializer.catch =>
	    
	       * VS - shortcut
	    
	       * Just insert "Promise.serialize" before your forEach function to ensure serial invocations.
	       * However, you don't get the full functionality of the previous example.
	      myArray.forEach Promise.serialize (element) ->
	        asyncActionReturningPromise element
	     */

	    Serializer.prototype.serialize = function(f) {
	      return (function(_this) {
	        return function() {
	          var args;
	          args = arguments;
	          return _this.then(function() {
	            return f.apply(null, args);
	          });
	        };
	      })(this);
	    };

	    Serializer.prototype.then = function(resolved, rejected) {
	      return this._lastPromise = this._lastPromise.then(resolved, rejected);
	    };

	    Serializer.prototype["catch"] = function(rejected) {
	      return this._lastPromise = this._lastPromise["catch"](rejected);
	    };

	    Serializer.prototype.always = function(f) {
	      return this._lastPromise = this._lastPromise["catch"]((function(_this) {
	        return function() {
	          return null;
	        };
	      })(this)).then(f);
	    };


	    /*
	    OUT: promise that resolves / rejects only when there are no more
	      pending tasks queued with the serializer.
	    
	      .then (lastResult) ->
	      .catch (lastError) ->
	    
	    NOTE: allDonePromise could complete, then more tasks could be queued with the serializer.
	      Promises can't be resolved/rejected twice, so when the more-tasks complete, the first
	      allDonePromise won't do anything.
	      However, you can call allDonePromise again once the tasks are queued and get notified
	      when THEY are done.
	     */

	    Serializer.prototype.allDonePromise = function() {
	      var currentLastPromise;
	      currentLastPromise = this._lastPromise;
	      return currentLastPromise.then((function(_this) {
	        return function(lastResult) {
	          if (currentLastPromise === _this._lastPromise) {
	            return lastResult;
	          } else {
	            return _this.allDonePromise();
	          }
	        };
	      })(this))["catch"]((function(_this) {
	        return function(lastError) {
	          if (currentLastPromise === _this._lastPromise) {
	            throw lastError;
	          } else {
	            return _this.allDonePromise();
	          }
	        };
	      })(this));
	    };

	    return Serializer;

	  })();


	  /*
	  OUT: serializedF = -> Promise.resolve f arguments...
	    IN: any arguments
	    EFFECT: f is invoked with arguments passed in AFTER the last invocation of serializedF completes.
	    OUT: promise.then -> results from f
	  
	  NOTE: 'f' can return a promise, but it doesn't have to. If it does return a promise, the next
	    'f' invocation will not start until and if the previous one's promise completes.
	  
	  USAGE:
	    serializedF = Promise.serialize f = -> # do something, possibly returning a promise
	    serializedF()
	    serializedF()
	    serializedF()
	    .then (resultOfLastF)->
	       * executed after f was executed and any returned promises resolved, 3 times, sequentially
	  
	  OR
	    serializedF = Promise.serialize f = (element) -> # do something with element, possibly returning a promise
	    Promise.all (serializedF item for item in list)
	    .then (results) ->
	       * f was excuted list.length times sequentially
	       * results contains the result values from each execution, in order
	   */

	  ArtPromise.serialize = function(f) {
	    return new ArtPromise.Serializer().serialize(f);
	  };

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

	self.Promise || (self.Promise = ArtPromise);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {

	  // Store setTimeout reference so promise-polyfill will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var setTimeoutFunc = setTimeout;

	  function noop() {}
	  
	  // Polyfill for Function.prototype.bind
	  function bind(fn, thisArg) {
	    return function () {
	      fn.apply(thisArg, arguments);
	    };
	  }

	  function Promise(fn) {
	    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
	    if (typeof fn !== 'function') throw new TypeError('not a function');
	    this._state = 0;
	    this._handled = false;
	    this._value = undefined;
	    this._deferreds = [];

	    doResolve(fn, this);
	  }

	  function handle(self, deferred) {
	    while (self._state === 3) {
	      self = self._value;
	    }
	    if (self._state === 0) {
	      self._deferreds.push(deferred);
	      return;
	    }
	    self._handled = true;
	    Promise._immediateFn(function () {
	      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
	      if (cb === null) {
	        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
	        return;
	      }
	      var ret;
	      try {
	        ret = cb(self._value);
	      } catch (e) {
	        reject(deferred.promise, e);
	        return;
	      }
	      resolve(deferred.promise, ret);
	    });
	  }

	  function resolve(self, newValue) {
	    try {
	      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
	      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
	        var then = newValue.then;
	        if (newValue instanceof Promise) {
	          self._state = 3;
	          self._value = newValue;
	          finale(self);
	          return;
	        } else if (typeof then === 'function') {
	          doResolve(bind(then, newValue), self);
	          return;
	        }
	      }
	      self._state = 1;
	      self._value = newValue;
	      finale(self);
	    } catch (e) {
	      reject(self, e);
	    }
	  }

	  function reject(self, newValue) {
	    self._state = 2;
	    self._value = newValue;
	    finale(self);
	  }

	  function finale(self) {
	    if (self._state === 2 && self._deferreds.length === 0) {
	      Promise._immediateFn(function() {
	        if (!self._handled) {
	          Promise._unhandledRejectionFn(self._value);
	        }
	      });
	    }

	    for (var i = 0, len = self._deferreds.length; i < len; i++) {
	      handle(self, self._deferreds[i]);
	    }
	    self._deferreds = null;
	  }

	  function Handler(onFulfilled, onRejected, promise) {
	    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	    this.promise = promise;
	  }

	  /**
	   * Take a potentially misbehaving resolver function and make sure
	   * onFulfilled and onRejected are only called once.
	   *
	   * Makes no guarantees about asynchrony.
	   */
	  function doResolve(fn, self) {
	    var done = false;
	    try {
	      fn(function (value) {
	        if (done) return;
	        done = true;
	        resolve(self, value);
	      }, function (reason) {
	        if (done) return;
	        done = true;
	        reject(self, reason);
	      });
	    } catch (ex) {
	      if (done) return;
	      done = true;
	      reject(self, ex);
	    }
	  }

	  Promise.prototype['catch'] = function (onRejected) {
	    return this.then(null, onRejected);
	  };

	  Promise.prototype.then = function (onFulfilled, onRejected) {
	    var prom = new (this.constructor)(noop);

	    handle(this, new Handler(onFulfilled, onRejected, prom));
	    return prom;
	  };

	  Promise.all = function (arr) {
	    var args = Array.prototype.slice.call(arr);

	    return new Promise(function (resolve, reject) {
	      if (args.length === 0) return resolve([]);
	      var remaining = args.length;

	      function res(i, val) {
	        try {
	          if (val && (typeof val === 'object' || typeof val === 'function')) {
	            var then = val.then;
	            if (typeof then === 'function') {
	              then.call(val, function (val) {
	                res(i, val);
	              }, reject);
	              return;
	            }
	          }
	          args[i] = val;
	          if (--remaining === 0) {
	            resolve(args);
	          }
	        } catch (ex) {
	          reject(ex);
	        }
	      }

	      for (var i = 0; i < args.length; i++) {
	        res(i, args[i]);
	      }
	    });
	  };

	  Promise.resolve = function (value) {
	    if (value && typeof value === 'object' && value.constructor === Promise) {
	      return value;
	    }

	    return new Promise(function (resolve) {
	      resolve(value);
	    });
	  };

	  Promise.reject = function (value) {
	    return new Promise(function (resolve, reject) {
	      reject(value);
	    });
	  };

	  Promise.race = function (values) {
	    return new Promise(function (resolve, reject) {
	      for (var i = 0, len = values.length; i < len; i++) {
	        values[i].then(resolve, reject);
	      }
	    });
	  };

	  // Use polyfill for setImmediate for performance gains
	  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
	    function (fn) {
	      setTimeoutFunc(fn, 0);
	    };

	  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
	    if (typeof console !== 'undefined' && console) {
	      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
	    }
	  };

	  /**
	   * Set the immediate function to execute callbacks
	   * @param fn {function} Function to execute
	   * @deprecated
	   */
	  Promise._setImmediateFn = function _setImmediateFn(fn) {
	    Promise._immediateFn = fn;
	  };

	  /**
	   * Change the function to execute on unhandled rejection
	   * @param {function} fn Function to execute on unhandled rejection
	   * @deprecated
	   */
	  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
	    Promise._unhandledRejectionFn = fn;
	  };
	  
	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = Promise;
	  } else if (!root.Promise) {
	    root.Promise = Promise;
	  }

	})(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29).setImmediate))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(30).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29).setImmediate, __webpack_require__(29).clearImmediate))

/***/ },
/* 30 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var ArrayExtensions, bound, exactlyOneWordRegex, intRand, isNumber, isString, max, modulo, ref, ref1, ref2, wordsRegex,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	ref = __webpack_require__(32), bound = ref.bound, max = ref.max, intRand = ref.intRand, modulo = ref.modulo;

	ref1 = __webpack_require__(17), isNumber = ref1.isNumber, isString = ref1.isString;

	ref2 = __webpack_require__(33), wordsRegex = ref2.wordsRegex, exactlyOneWordRegex = ref2.exactlyOneWordRegex;

	module.exports = ArrayExtensions = (function() {
	  var _moveArrayElementLargeArray, _moveArrayElementSmallArray, a, arrayWithElementMoved, basicCompareFunction, indexOfOrLength, keepAll, keepIfRubyTrue, leftOfIndex, longestCommonSubsequence, moveArrayElement, randomElement, rightOfIndex, w;

	  function ArrayExtensions() {}


	  /*
	  Useful compact and compactFlatten keepTester functions
	   */

	  ArrayExtensions.keepAll = keepAll = function() {
	    return true;
	  };

	  ArrayExtensions.keepIfRubyTrue = keepIfRubyTrue = function(a) {
	    return a !== void 0 && a !== null && a !== false;
	  };

	  ArrayExtensions.reverseForEach = function(array, f) {
	    var p, v;
	    for (p = array.length - 1; p >= 0; p += -1) {
	      v = array[p];
	      f(v);
	    }
	    return array;
	  };

	  ArrayExtensions.arrayToTruthMap = function(array) {
	    var a, len1, p, res;
	    res = {};
	    for (p = 0, len1 = array.length; p < len1; p++) {
	      a = array[p];
	      res[a] = true;
	    }
	    return res;
	  };

	  ArrayExtensions.arrayToFalseMap = function(array) {
	    var a, len1, p, res;
	    res = {};
	    for (p = 0, len1 = array.length; p < len1; p++) {
	      a = array[p];
	      res[a] = false;
	    }
	    return res;
	  };

	  ArrayExtensions.concatInto = function(array, b) {
	    return array.push.apply(array, b);
	  };

	  ArrayExtensions.uniqueValues = function(sortedArray, eqF) {
	    var i, len1, p, results, v;
	    if (eqF == null) {
	      eqF = (function(a, b) {
	        return a === b;
	      });
	    }
	    results = [];
	    for (i = p = 0, len1 = sortedArray.length; p < len1; i = ++p) {
	      v = sortedArray[i];
	      if (i === 0 || !eqF(v, sortedArray[i - 1])) {
	        results.push(v);
	      }
	    }
	    return results;
	  };


	  /*
	  IN:
	    array: an array or falsy value
	    element: anything
	  OUT:
	    array containing element as the last element
	  
	  EFFECT:
	    if array was falsy, a new length-1 array is returned
	    else, array was mutated by pushing the current element
	  
	  WHY?
	    Why write this when arrays alread have push?
	  
	    1) if array is null, this works as desired
	    2) this returns array, not array.length
	      Returning the array is what Ruby's push does.
	      It makes chaining pushes easy.
	   */

	  ArrayExtensions.push = function(array, element) {
	    if (array) {
	      array.push(element);
	      return array;
	    } else {
	      return [element];
	    }
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

	  ArrayExtensions.leftOfIndex = leftOfIndex = function(array, index) {
	    if (!array) {
	      return array;
	    }
	    return array.slice(0, index);
	  };

	  ArrayExtensions.rightOfIndex = rightOfIndex = function(array, index) {
	    if (!array) {
	      return array;
	    }
	    if (index < 0) {
	      index += array.length;
	    }
	    return array.slice(index + 1);
	  };

	  indexOfOrLength = function(array, value) {
	    var i;
	    if (0 > (i = array.indexOf(value))) {
	      return array.length;
	    } else {
	      return i;
	    }
	  };

	  ArrayExtensions.leftOf = function(array, value) {
	    return leftOfIndex(array, indexOfOrLength(array, value));
	  };

	  ArrayExtensions.rightOf = function(array, value) {
	    return rightOfIndex(array, indexOfOrLength(array, value));
	  };

	  ArrayExtensions.splitArray = function(array, value) {
	    var index;
	    index = indexOfOrLength(array, value);
	    return [leftOfIndex(array, index), rightOfIndex(array, index)];
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
	    var element, i, p, ref3, returnElement;
	    if (compareFunction == null) {
	      compareFunction = basicCompareFunction;
	    }
	    if (!((array != null ? array.length : void 0) > 0)) {
	      return void 0;
	    }
	    returnElement = array[0];
	    for (i = p = 1, ref3 = array.length; p < ref3; i = p += 1) {
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
	    var a, i, j, len, p, ref3;
	    len = array.length;
	    for (i = p = ref3 = len - 1; p >= 0; i = p += -1) {
	      j = intRand(i);
	      a = array[i];
	      array[i] = array[j];
	      array[j] = a;
	    }
	    return array;
	  };

	  ArrayExtensions.insert = function(array, index, item) {
	    if (index < 0) {
	      index = array.length + index + 1;
	    }
	    array.splice(index, 0, item);
	    return array;
	  };

	  ArrayExtensions.withInserted = function(array, index, item) {
	    return ArrayExtensions.insert(array.slice(), index, item);
	  };

	  ArrayExtensions.withSort = function(array, sortFunction) {
	    array = array.slice();
	    return array.sort(sortFunction);
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
	    if (index == null) {
	      index = array.length - 1;
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

	  ArrayExtensions._moveArrayElementLargeArray = _moveArrayElementLargeArray = function(array, from, to) {
	    array.splice(to, 0, array.splice(from, 1)[0]);
	    return array;
	  };

	  ArrayExtensions._moveArrayElementSmallArray = _moveArrayElementSmallArray = function(array, from, to) {
	    var i, p, q, ref3, ref4, ref5, ref6, tmp;
	    from = from | 0;
	    to = to | 0;
	    tmp = array[from];
	    if (from < to) {
	      for (i = p = ref3 = from, ref4 = to - 1; p <= ref4; i = p += 1) {
	        array[i] = array[i + 1];
	      }
	    } else {
	      for (i = q = ref5 = from, ref6 = to + 1; q >= ref6; i = q += -1) {
	        array[i] = array[i - 1];
	      }
	    }
	    array[to] = tmp;
	    return array;
	  };

	  ArrayExtensions.moveArrayElement = moveArrayElement = function(array, from, to) {
	    from = modulo(from | 0, array.length);
	    to = modulo(to | 0, array.length);
	    if (Math.abs(from - to) > 300) {
	      _moveArrayElementLargeArray(array, from, to);
	    } else {
	      _moveArrayElementSmallArray(array, from, to);
	    }
	    return array;
	  };

	  ArrayExtensions.arrayWithElementMoved = arrayWithElementMoved = function(array, from, to) {
	    from = modulo(from | 0, array.length);
	    to = modulo(to | 0, array.length);
	    if (from === to) {
	      return array;
	    }
	    array = array.slice();
	    return moveArrayElement(array, from, to);
	  };

	  ArrayExtensions.arrayWithElementValueMoved = function(array, value, to) {
	    var from;
	    from = array.indexOf(value);
	    if (from < 0) {
	      return array;
	    }
	    return arrayWithElementMoved(array, from, to);
	  };

	  ArrayExtensions.arrayWithElementReplaced = function(array, value, index) {
	    array = array.slice();
	    array[index] = value;
	    return array;
	  };

	  ArrayExtensions.stableSort = function(array, compare) {
	    var a, b, i, length, notSorted, p, ref3;
	    compare || (compare = function(a, b) {
	      return a - b;
	    });
	    notSorted = true;
	    length = array.length;
	    while (notSorted) {
	      notSorted = false;
	      for (i = p = 1, ref3 = length; p < ref3; i = p += 1) {
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
	    var c, diag, i, j, latch, lcs, left, m, n, p, q, r, ref3, ref4, ref5, row, s;
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
	    for (j = p = 0, ref3 = n; p < ref3; j = p += 1) {
	      row[j] = 0;
	    }
	    for (i = q = 0, ref4 = m; q < ref4; i = q += 1) {
	      c[i] = row = row.slice();
	      diag = 0;
	      for (j = r = 0, ref5 = n - 1; r <= ref5; j = r += 1) {
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

	  ArrayExtensions.wordsArray = w = function() {
	    var arg, len1, out, p;
	    out = [];
	    for (p = 0, len1 = arguments.length; p < len1; p++) {
	      arg = arguments[p];
	      if (isString(arg) && !arg.match(exactlyOneWordRegex)) {
	        out = out.concat(arg.match(wordsRegex));
	      } else {
	        out.push(arg);
	      }
	    }
	    return out;
	  };

	  ArrayExtensions.wordArray = ArrayExtensions.wordsArray;

	  ArrayExtensions.w = ArrayExtensions.wordsArray;

	  ArrayExtensions.a = a = function() {
	    var arg, len1, out, p;
	    out = [];
	    for (p = 0, len1 = arguments.length; p < len1; p++) {
	      arg = arguments[p];
	      out.push(arg);
	    }
	    return out;
	  };

	  return ArrayExtensions;

	})();


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation, Math, Regexp, abs, ceil, float32Precision, float64Precision, floor, inverseFloat64Precision, inverstFlaot32Precision, max, min, numberRegexp, pow, random, ref, round;

	Foundation = __webpack_require__(25);

	Regexp = __webpack_require__(33);

	numberRegexp = Regexp.numberRegexp;

	float64Precision = 0.0000000001;

	float32Precision = 0.0000001;

	inverseFloat64Precision = 1 / float64Precision;

	inverstFlaot32Precision = 1 / float32Precision;

	ref = self.Math, abs = ref.abs, min = ref.min, max = ref.max, ceil = ref.ceil, floor = ref.floor, round = ref.round, random = ref.random, pow = ref.pow;

	module.exports = Math = (function() {
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

	  Math.floatEq0 = function(n) {
	    return n === 0 || float64Precision > abs(n);
	  };

	  Math.float32Eq0 = function(n) {
	    return n === 0 || float32Precision > abs(n);
	  };

	  Math.floatTrue0 = function(n) {
	    if (n === 0 || float64Precision > abs(n)) {
	      return 0;
	    } else {
	      return n;
	    }
	  };

	  Math.float32True0 = function(n) {
	    if (n === 0 || float32Precision > abs(n)) {
	      return 0;
	    } else {
	      return n;
	    }
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


/***/ },
/* 33 */
/***/ function(module, exports) {

	var Regexp;

	module.exports = Regexp = (function() {
	  function Regexp() {}

	  Regexp.escapeRegExp = function(string) {
	    return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	  };

	  Regexp.findUrlProtocolRegexp = /([\w-]+)(:\/\/)/;

	  Regexp.findDomainRegexp = /localhost|[\w]+(?:-[\w]+)*(?:\.[\w]+(?:-[\w]+)*)*(?:\.[a-z]{2,20})/;

	  Regexp.urlQueryParamsRegexp = /(?:[-+=&*._\w]|%[a-f\d]{2})+/i;

	  Regexp.findUrlPathRegexp = /(?:\/~?(?:[-+*._\w]|%[a-f\d]{2})*)*/;

	  Regexp.findUrlPortRegexp = /(\:)(\d+)/;

	  Regexp.findEmailRegexp = RegExp("([_\\w-]+(?:\\.[_\\w]+)*)@(" + Regexp.findDomainRegexp.source + ")", "i");

	  Regexp.emailRegexp = RegExp("^" + Regexp.findEmailRegexp.source + "$", "i");

	  Regexp.numberRegexp = /([-]?\.[0-9]+)|([-]?[0-9]+(\.[0-9]+)?)/;

	  Regexp.urlProtocolRegexp = RegExp("^" + Regexp.findUrlProtocolRegexp.source + "$", "i");

	  Regexp.domainRegexp = RegExp("^" + Regexp.findDomainRegexp.source + "$", "i");

	  Regexp.urlPathRegexp = RegExp("^" + Regexp.findUrlPathRegexp.source + "$", "i");

	  Regexp.urlQueryRegexp = RegExp("^" + Regexp.urlQueryParamsRegexp.source + "$", "i");

	  Regexp.isoDateRegexp = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

	  Regexp.hex16ColorRegex = /^#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?$/i;

	  Regexp.hex256ColorRegex = /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?$/i;

	  Regexp.rgbColorRegex = /rgb *\( *(\d+%?) *, *(\d+%?) *, *(\d+%?) *\)/;

	  Regexp.rgbaColorRegex = /rgba *\( *(\d+%?) *, *(\d+%?) *, *(\d+%?) *, *(\d*\.?\d*)\)/;

	  Regexp.colorRegex = new RegExp("(" + Regexp.hex16ColorRegex.source + ")|(" + Regexp.hex256ColorRegex.source + ")|(" + Regexp.rgbColorRegex.source + ")|(" + Regexp.rgbaColorRegex.source + ")");

	  Regexp.wordsRegex = /[^\s]+/g;

	  Regexp.exactlyOneWordRegex = /^[^\s]+$/;


	  /*
	  match OUTPUT: [url, protocol, '://', domain, ':', port, path, '?', query]
	  
	  USAGE:
	    [_, protocol, _, domain, _, port, path, _, query] = str.match findUrlRegexp
	  
	  DESIGN NOTE:
	    The reason why I included the fixed strings ('://', ':' and '?') was so that
	    you can take the matchResult, alter individual elements and create a value url easily by:
	  
	      matchResult.slice(1).join ''
	   */

	  Regexp.findUrlRegexp = RegExp("(?:" + Regexp.findUrlProtocolRegexp.source + ")(" + Regexp.findDomainRegexp.source + ")(?:" + Regexp.findUrlPortRegexp.source + ")?(" + Regexp.findUrlPathRegexp.source + ")?(?:(\\?)(" + Regexp.urlQueryParamsRegexp.source + ")?)?", "i");

	  Regexp.findSourceReferenceUrlRegexp = RegExp("(" + Regexp.findUrlProtocolRegexp.source + ")(" + Regexp.findDomainRegexp.source + ")?(?:" + Regexp.findUrlPortRegexp.source + ")?(" + Regexp.findUrlPathRegexp.source + ")?(?:(\\?)(" + Regexp.urlQueryParamsRegexp.source + ")?)?(?:\\:(\\d+))?(?:\\:(\\d+))?", "i");

	  Regexp.urlRegexp = RegExp("^" + Regexp.findUrlRegexp.source + "$", "i");

	  return Regexp;

	})();


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var AsyncExtensions, Promise;

	Promise = __webpack_require__(27);

	module.exports = AsyncExtensions = (function() {
	  var timeout;

	  function AsyncExtensions() {}

	  AsyncExtensions.timeout = timeout = function(ms, f) {
	    return new Promise(function(resolve) {
	      return setTimeout(function() {
	        if (typeof f === "function") {
	          f();
	        }
	        return resolve();
	      }, ms);
	    });
	  };

	  AsyncExtensions.requestAnimationFrame = self.requestAnimationFrame || self.webkitRequestAnimationFrame || self.mozRequestAnimationFrame || self.oRequestAnimationFrame || self.msRequestAnimationFrame || function(f) {
	    return setTimeout(f, 1000 / 60);
	  };

	  AsyncExtensions.nextTick = function(f) {
	    return Promise.resolve().then(f);
	  };

	  AsyncExtensions.throwErrorOutOfStack = function(e) {
	    return timeout(0, function() {
	      throw e;
	    });
	  };

	  AsyncExtensions.evalAndThrowErrorsOutOfStack = function(f) {
	    var e;
	    try {
	      return f();
	    } catch (error) {
	      e = error;
	      Neptune.Art.Foundation.log.error("evalAndThrowErrorsOutOfStack", e);
	      return AsyncExtensions.throwErrorOutOfStack(e);
	    }
	  };

	  return AsyncExtensions;

	})();


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var Eq, floatTrue0, isNumber, isString, min, objectKeyCount, ref, remove,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	remove = __webpack_require__(31).remove;

	objectKeyCount = __webpack_require__(36).objectKeyCount;

	floatTrue0 = __webpack_require__(32).floatTrue0;

	ref = __webpack_require__(17), isString = ref.isString, isNumber = ref.isNumber;

	min = Math.min;

	module.exports = Eq = (function() {
	  var plainObjectsDeepDiff, plainObjectsDeepEq;

	  function Eq() {}


	  /*
	  IN: see @compare
	  OUT:
	    true: if a and b are structurally equal
	    false: otherwise
	   */

	  Eq.eq = function(a, b) {
	    return 0 === Eq.compare(a, b, true);
	  };

	  Eq.neq = function(a, b) {
	    return 0 !== Eq.compare(a, b, true);
	  };

	  Eq.fastEq = function(a, b) {
	    return 0 === Eq.compare(a, b, false);
	  };

	  Eq.fastNeq = function(a, b) {
	    return 0 !== Eq.compare(a, b, false);
	  };

	  Eq._compareArray = function(a, b, recursionBlockArray) {
	    var aLength, av, bLength, bv, i, j, ref1, val;
	    aLength = a.length;
	    bLength = b.length;
	    for (i = j = 0, ref1 = Math.min(aLength, bLength); j < ref1; i = j += 1) {
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
	      return 0/0;
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
	    return Eq._compare(a, b, recursionBlockEnabled && []);
	  };

	  Eq._compare = function(a, b, recursionBlockArray) {
	    var _constructor;
	    if (a === b) {
	      return 0;
	    }
	    if ((a != null) && (b != null) && a.constructor === (_constructor = b.constructor)) {
	      if (isString(a)) {
	        return a.localeCompare(b);
	      }
	      if (isNumber(a)) {
	        return floatTrue0(a - b);
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
	    return 0/0;
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

	  Eq.propsEq = plainObjectsDeepEq;

	  Eq.plainObjectsDeepDiffArray = function(before, after) {
	    var diff, i, j, l, len, m, ref1, ref2, ref3, ref4, ref5, res;
	    res = null;
	    len = min(before.length, after.length);
	    for (i = j = 0, ref1 = len; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
	      if (!(diff = plainObjectsDeepDiff(before[i], after[i]))) {
	        continue;
	      }
	      res || (res = {});
	      res[i] = diff;
	    }
	    if (len < before.length) {
	      for (i = l = ref2 = len, ref3 = before.length; ref2 <= ref3 ? l < ref3 : l > ref3; i = ref2 <= ref3 ? ++l : --l) {
	        res || (res = {});
	        res[i] = {
	          removed: before[i]
	        };
	      }
	    }
	    if (len < after.length) {
	      for (i = m = ref4 = len, ref5 = after.length; ref4 <= ref5 ? m < ref5 : m > ref5; i = ref4 <= ref5 ? ++m : --m) {
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

	  Eq.diff = plainObjectsDeepDiff;

	  Eq.shallowEq = function(a, b) {
	    return a === b || (a && b && a.eq && a.eq(b));
	  };

	  return Eq;

	})();


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var Hash, compactFlatten, deepArrayEach, isArrayOrArguments, isFunction, isPlainArray, isPlainObject, ref, ref1,
	  slice = [].slice,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	ref = Neptune.NeptuneLib, compactFlatten = ref.compactFlatten, deepArrayEach = ref.deepArrayEach, isArrayOrArguments = ref.isArrayOrArguments;

	ref1 = __webpack_require__(17), isPlainObject = ref1.isPlainObject, isFunction = ref1.isFunction, isPlainArray = ref1.isPlainArray;

	module.exports = Hash = (function() {
	  var deepMerge, inject, merge, mergeInto, newObjectFromEach, objectKeyCount, pureMerge, toObjectInternal;

	  function Hash() {}

	  Hash.countKeys = function(o) {
	    return Object.keys(o).length;
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

	  Hash.objectKeyCount = objectKeyCount = function(o) {
	    var count, k, v;
	    count = 0;
	    for (k in o) {
	      v = o[k];
	      count++;
	    }
	    return count;
	  };

	  Hash.objectLength = objectKeyCount;


	  /*
	  NOTE:
	    null and undefined keys are NOT SUPPORTED
	  
	    They should be converted to strings, first,
	    which is what they would become anyway.
	  
	  IN: 0 or more arguments
	    out = {}
	    list = arguments
	  
	    for element in list
	      objects: merge into out
	      arrays or argument lists: recurse using element as the list
	      null or undefined: skip
	      else out[element] = next element (or undefined if none)
	  
	  OUT: plain object
	   */

	  toObjectInternal = function(list, out) {
	    var element, j, key, len;
	    key = null;
	    for (j = 0, len = list.length; j < len; j++) {
	      element = list[j];
	      if (key) {
	        out[key] = element;
	        key = null;
	      } else if (isPlainObject(element)) {
	        mergeInto(out, element);
	      } else if (isArrayOrArguments(element)) {
	        toObjectInternal(element, out);
	      } else if (element != null) {
	        key = element;
	      }
	    }
	    if (key) {
	      return out[key] = void 0;
	    }
	  };

	  Hash.toObject = function() {
	    var out;
	    out = {};
	    toObjectInternal(arguments, out);
	    return out;
	  };


	  /*
	  IN:
	    inputArray: any array
	    transformFunction: (element) -> [key, value]
	      default: transforms an array of the form: [[key1, value1], [key2, value2], etc...]
	   */

	  Hash.arrayToMap = function(inputArray, transformFunction) {
	    var element, j, key, len, outputMap, ref2, value;
	    if (transformFunction == null) {
	      transformFunction = function(element) {
	        return element;
	      };
	    }
	    outputMap = {};
	    for (j = 0, len = inputArray.length; j < len; j++) {
	      element = inputArray[j];
	      ref2 = transformFunction(element), key = ref2[0], value = ref2[1];
	      outputMap[key] = value;
	    }
	    return outputMap;
	  };


	  /*
	  IN:
	    input: array or object
	    memo: [optional] initial value; if not set, the first element is used, if no elements, null is used and returned
	    block: (memo, value) -> newMemo OR
	    block: (memo, key, value) -> newMemo
	      key is the index for arrays
	  
	      Why value or key, value? Mostly consistent with CoffeeScripts:
	        for...in and for...of signatures
	      Different from CoffeeScript?
	        for arrays, if block has two arguments, the signature is the SAME as
	        objects where indexes in arrays are equivelent to keys in objects: (memo, index, value) ->
	      Why different from CoffeeScript?
	        So two-input blocks work the same regardless of if an array or object is input.
	   */

	  Hash.inject = inject = function(input, a, b) {
	    var block, j, k, len, log, memo, memoSet, twoInputBlock, v;
	    log = Neptune.Art.Foundation.log;
	    block = arguments.length === 2 ? (memoSet = false, memo = null, a) : (memo = a, memoSet = true, b);
	    twoInputBlock = block.length >= 3;
	    if (isPlainObject(input)) {
	      for (k in input) {
	        v = input[k];
	        if (!memoSet) {
	          memo = v;
	          memoSet = true;
	        } else {
	          memo = twoInputBlock ? block(memo, k, v) : block(memo, v);
	        }
	      }
	    } else {
	      for (k = j = 0, len = input.length; j < len; k = ++j) {
	        v = input[k];
	        if (!memoSet) {
	          memo = v;
	          memoSet = true;
	        } else {
	          memo = twoInputBlock ? block(memo, k, v) : block(memo, v);
	        }
	      }
	    }
	    return memo;
	  };


	  /*
	  IN:
	    input: array or object
	    block: (map, k, v) -> OR
	    block: (k, v) -> OR
	    block: (v) -> newV
	      for arrays, k is the index
	   */

	  Hash.newObjectFromEach = newObjectFromEach = function(input, block) {
	    if (block == null) {
	      block = function(map, k, v) {
	        return map[k] = v;
	      };
	    }
	    return inject(input, {}, (function() {
	      if (isPlainArray(input)) {
	        switch (block.length) {
	          case 0:
	          case 1:
	            return function(memo, k, v) {
	              memo[v] = block(v);
	              return memo;
	            };
	          case 2:
	            return function(memo, k, v) {
	              memo[v] = block(k, v);
	              return memo;
	            };
	          case 3:
	            return function(memo, k, v) {
	              block(memo, k, v);
	              return memo;
	            };
	          default:
	            throw new Error("expecting block-function with 0, 1, 2 or 3 arguments");
	        }
	      } else {
	        switch (block.length) {
	          case 0:
	          case 1:
	            return function(memo, k, v) {
	              memo[k] = block(v);
	              return memo;
	            };
	          case 2:
	            return function(memo, k, v) {
	              memo[k] = block(k, v);
	              return memo;
	            };
	          case 3:
	            return function(memo, k, v) {
	              block(memo, k, v);
	              return memo;
	            };
	          default:
	            throw new Error("expecting block-function with 0, 1, 2 or 3 arguments");
	        }
	      }
	    })());
	  };

	  Hash.newMapFromEach = newObjectFromEach;


	  /*
	  
	  merge "flattens" its arguments and then adds all keys from all objects in
	  the list into a new object which is returned.
	  
	  return: new object
	  
	  The first object's keys are added first. If two or more objects have the same
	  keys, the value set in the result is the last object's in the list with that key.
	   */

	  Hash.merge = merge = function() {
	    return mergeInto({}, arguments);
	  };


	  /*
	  The same as 'merge' with one difference:
	  
	  Instead of a new object, all objects are merged into the first object in the list.
	  
	  return: first object in the flattened list
	  return: null if no source objects
	   */

	  Hash.mergeInto = mergeInto = function() {
	    var i, j, k, ref2, result, source, sources, v;
	    sources = compactFlatten(arguments);
	    if (sources.length === 0) {
	      return null;
	    }
	    result = sources[0] || {};
	    for (i = j = 1, ref2 = sources.length; j < ref2; i = j += 1) {
	      source = sources[i];
	      for (k in source) {
	        v = source[k];
	        result[k] = v;
	      }
	    }
	    return result;
	  };


	  /*
	  Just like mergeInfo except only merge into the result object UNLESs result.hasOwnProperty
	  
	  if
	    mergeInfo a, b is just like merge a, b except it modifies and returns a instead of returning a new object
	  then
	    mergeIntoUnless b, a is just like merge a, b except it modifies and returns b instead of returning a new object
	  
	  Note: mergeIntoUnless a, b, c, d, e, f is like merge f, e, d, c, b, a
	   */

	  Hash.mergeIntoUnless = function() {
	    var i, j, k, ref2, result, source, sources, v;
	    sources = compactFlatten(arguments);
	    if (sources.length === 0) {
	      return null;
	    }
	    result = sources[0] || {};
	    for (i = j = 1, ref2 = sources.length; j < ref2; i = j += 1) {
	      source = sources[i];
	      for (k in source) {
	        v = source[k];
	        if (!result.hasOwnProperty(k)) {
	          result[k] = v;
	        }
	      }
	    }
	    return result;
	  };

	  Hash.deepMerge = deepMerge = function() {
	    var k, list, out, v, val;
	    list = compactFlatten(arguments);
	    out = merge(list);
	    for (k in out) {
	      v = out[k];
	      if (isPlainObject(v)) {
	        out[k] = deepMerge((function() {
	          var j, len, results;
	          results = [];
	          for (j = 0, len = list.length; j < len; j++) {
	            val = list[j];
	            results.push(val[k]);
	          }
	          return results;
	        })());
	      }
	    }
	    return out;
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

	  Hash.pureMerge = pureMerge = function() {
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


	  /*
	  I might consider adding "o" - which works like Object-Tree constructors:
	    First, it compact-flattens args
	    Second, it gathers up and merges all plain-objects in its arguments list
	    Last, all remaining items get added to the "children" list
	  The question is, what does it return? Options:
	  
	    OPTION: If only plain-objects after compact-flatten, just return the merged object ELSE:
	  
	  Options if both objects and non-object values are present:
	    a. return compactFlatten [plainObject, nonObjectValues]
	    b. return merge plainObject, children: nonObjectValues
	    c. return new MClass plainObject, nonObjectValues
	      class MClass extends BaseObject
	        @properties "props children"
	        constructor: (@props, @children) ->
	   */

	  Hash.m = pureMerge;


	  /*
	  IN:
	    obj: the object to select fields from
	  
	    2nd argument can be:
	      selectFunction: (value, key) -> true / false
	  
	    OR obj can be followed by any number of strings or arrays in any nesting, possibly with null fields
	   */

	  Hash.select = function(obj, a) {
	    var j, k, len, prop, properties, result, v;
	    if (!obj) {
	      return {};
	    }
	    result = {};
	    if (isFunction(a)) {
	      if (a.length === 1) {
	        for (k in obj) {
	          v = obj[k];
	          if (a(v)) {
	            result[k] = v;
	          }
	        }
	      } else {
	        for (k in obj) {
	          v = obj[k];
	          if (a(k, v)) {
	            result[k] = v;
	          }
	        }
	      }
	    } else {
	      properties = compactFlatten(Array.prototype.slice.call(arguments, 1));
	      for (j = 0, len = properties.length; j < len; j++) {
	        prop = properties[j];
	        if (v = obj[prop] || obj.hasOwnProperty(prop)) {
	          result[prop] = v;
	        }
	      }
	    }
	    return result;
	  };

	  Hash.selectAll = function() {
	    var j, len, obj, prop, properties, ref2, result;
	    obj = arguments[0], properties = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    if (!obj) {
	      return {};
	    }
	    result = {};
	    ref2 = compactFlatten(properties);
	    for (j = 0, len = ref2.length; j < len; j++) {
	      prop = ref2[j];
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


/***/ },
/* 37 */
/***/ function(module, exports) {

	var ParseUrl;

	module.exports = ParseUrl = (function() {
	  function ParseUrl() {}

	  ParseUrl.parseQuery = function(qs) {
	    var i, j, key, len, obj, pair, ref, ref1, val;
	    if (qs == null) {
	      qs = (ref = self.location) != null ? ref.search : void 0;
	    }
	    obj = {};
	    ref1 = qs.replace('?', '').split('&');
	    for (j = 0, len = ref1.length; j < len; j++) {
	      pair = ref1[j];
	      i = pair.indexOf('=');
	      key = pair.slice(0, i);
	      val = pair.slice(i + 1);
	      if (key.length > 0) {
	        obj[key] = decodeURIComponent(val);
	      }
	    }
	    return obj;
	  };

	  ParseUrl.parseUrl = function(url) {
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
	      query: query && ParseUrl.parseQuery(query),
	      anchor: anchor
	    };
	  };

	  return ParseUrl;

	})();


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var Promise, PromisedFileReader;

	Promise = __webpack_require__(27);

	module.exports = PromisedFileReader = (function() {
	  function PromisedFileReader() {}

	  PromisedFileReader.readFileAsDataUrl = function(file) {
	    return new Promise(function(resolve, reject) {
	      var reader;
	      reader = new FileReader;
	      reader.readAsDataURL(file);
	      reader.onload = (function(_this) {
	        return function(e) {
	          return resolve(e.target.result);
	        };
	      })(this);
	      return reader.onerror = (function(_this) {
	        return function(e) {
	          return reject(error);
	        };
	      })(this);
	    });
	  };

	  PromisedFileReader.readFileAsArrayBuffer = function(file) {
	    return new Promise(function(resolve, reject) {
	      var reader;
	      reader = new FileReader;
	      reader.readAsArrayBuffer(file);
	      reader.onload = (function(_this) {
	        return function(e) {
	          return resolve(e.target.result);
	        };
	      })(this);
	      return reader.onerror = (function(_this) {
	        return function(e) {
	          return reject(error);
	        };
	      })(this);
	    });
	  };

	  return PromisedFileReader;

	})();


/***/ },
/* 39 */
/***/ function(module, exports) {

	var Ruby,
	  hasProp = {}.hasOwnProperty;

	module.exports = Ruby = (function() {
	  var rubyTrue;

	  function Ruby() {}

	  Ruby.rubyTrue = rubyTrue = function(a) {
	    return a !== void 0 && a !== null && a !== false;
	  };

	  Ruby.rubyFalse = function(a) {
	    return a === void 0 || a === null || a === false;
	  };

	  Ruby.rubyOr = function(a, b) {
	    var i, len;
	    if (arguments.length === 2) {
	      if (rubyTrue(a)) {
	        return a;
	      } else {
	        return b;
	      }
	    } else {
	      for (i = 0, len = arguments.length; i < len; i++) {
	        a = arguments[i];
	        if (rubyTrue(a)) {
	          break;
	        }
	      }
	      return a;
	    }
	  };

	  Ruby.rubyAnd = function(a, b) {
	    var i, len;
	    if (arguments.length === 2) {
	      if (rubyTrue(a)) {
	        return b;
	      } else {
	        return a;
	      }
	    } else {
	      for (i = 0, len = arguments.length; i < len; i++) {
	        a = arguments[i];
	        if (!rubyTrue(a)) {
	          break;
	        }
	      }
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


/***/ },
/* 40 */
/***/ function(module, exports) {

	
	/*
	This current iteration of clone relies on some singleton variables shared across all invocations of clone.
	This is fine as long as javascript stays single-threaded.
	It also introduces a little bit of uglyness initializing clonedMap necessitating the "top" variable.

	FUTURE
	A potentially better solution would be to create a new closer each time clone is called at the top-most level,
	but when recursing, pass in a new function bound to that closure which is different from the global clone function.

	populateClone would need to take an additional argument - the clone function to use for recursive cloning.
	 */
	var ShallowClone;

	module.exports = ShallowClone = (function() {
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


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var FoundationMath, StringExtensions, Types, compactFlatten, escapedDoubleQuoteRegex, floor, intRand, isArray, isNumber, isPlainObject, isString, wordsRegex;

	FoundationMath = __webpack_require__(32);

	Types = __webpack_require__(17);

	wordsRegex = __webpack_require__(33).wordsRegex;

	intRand = FoundationMath.intRand;

	isString = Types.isString, isNumber = Types.isNumber, isPlainObject = Types.isPlainObject, isArray = Types.isArray;

	compactFlatten = Neptune.NeptuneLib.compactFlatten;

	escapedDoubleQuoteRegex = /[\\]["]/g;

	floor = Math.floor;

	module.exports = StringExtensions = (function() {
	  var consistentJsonStringify, escapeDoubleQuoteJavascriptString, escapeJavascriptString, getPadding, pluralize, repeat, standardIndent;

	  function StringExtensions() {}


	  /*
	  IN: an array and optionally a string, in any order
	    joiner: the string
	    array-to-flatten-and-join: the array
	  
	  OUT:
	    compactFlatten(array).join joiner || ""
	  
	  NOTE: this uses Ruby's default value for joining - the empty array, not ',' which is JavaScripts
	   */

	  StringExtensions.compactFlattenJoin = function(a, b) {
	    var array, joiner;
	    array = null;
	    joiner = isString(a) ? (array = b, a) : (array = a, b || "");
	    return compactFlatten(array).join(joiner);
	  };

	  StringExtensions.randomString = function(length, chars) {
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

	  StringExtensions.pluralize = pluralize = function(a, b, pluralForm) {
	    if (typeof a === "number") {
	      return a + " " + (a === 1 ? b : pluralForm || pluralize(b));
	    } else {
	      return a + "s";
	    }
	  };

	  StringExtensions.replaceLast = function(str, find, replaceWith) {
	    var index;
	    index = str.lastIndexOf(find);
	    if (index >= 0) {
	      return str.substring(0, index) + replaceWith + str.substring(index + find.length);
	    } else {
	      return str.toString();
	    }
	  };

	  StringExtensions.getPadding = getPadding = function(length, padding) {
	    if (padding == null) {
	      padding = " ";
	    }
	    return Array(length).join(padding);
	  };

	  StringExtensions.pad = function(str, length, padding, alignRight) {
	    var exactPadding;
	    str = String(str);
	    if (str.length >= length) {
	      return str;
	    }
	    exactPadding = getPadding(Math.max(length - str.length + 1, 0), padding);
	    if (alignRight) {
	      return exactPadding + str;
	    } else {
	      return str + exactPadding;
	    }
	  };

	  StringExtensions.escapeDoubleQuoteJavascriptString = escapeDoubleQuoteJavascriptString = function(str) {
	    var s;
	    s = String(str).replace(/[\\"]/g, "\\$&").replace(/[\0\b\f\n\r\t\v\u2028\u2029]/g, function(x) {
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


	  /*
	  SBD for a while I only had JSON.stringify here, but I hate seeing: "I said, \"hello.\""
	  when I could be seeing: 'I said, "hello."'
	  
	  Is this going to break anything? I figure if you really need "" only, just use stringify.
	   */

	  StringExtensions.escapeJavascriptString = escapeJavascriptString = function(str) {
	    var s;
	    s = JSON.stringify(str);
	    if (s.match(escapedDoubleQuoteRegex)) {
	      return "'" + (s.replace(escapedDoubleQuoteRegex, '"').replace(/'/g, "\\'").slice(1, -1)) + "'";
	    } else {
	      return s;
	    }
	  };

	  StringExtensions.allIndexes = function(str, regex) {
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

	  StringExtensions.repeat = repeat = " ".repeat ? function(str, times) {
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

	  StringExtensions.rightAlign = function(str, width) {
	    if (str.length >= width) {
	      return str;
	    } else {
	      return repeat(" ", width - str.length) + str;
	    }
	  };

	  StringExtensions.eachMatch = function(str, regex, f) {
	    var result;
	    regex.lastIndex = 0;
	    while (result = regex.exec(str)) {
	      f(result);
	    }
	    return null;
	  };

	  standardIndent = {
	    joiner: ', ',
	    openObject: '{',
	    openArray: '[',
	    closeObject: "}",
	    closeArray: "]"
	  };

	  StringExtensions.consistentJsonStringify = consistentJsonStringify = function(object, indent) {
	    var closeArray, closeObject, error, indentObject, joiner, k, lastTotalIndent, openArray, openObject, out, totalIndent, v;
	    return out = (function() {
	      var ref;
	      if (object === false || object === true || object === null || isNumber(object)) {
	        return "" + object;
	      } else if (isString(object)) {
	        return escapeJavascriptString(object);
	      } else {
	        indentObject = indent ? typeof indent === "string" ? {
	          joiner: ",\n" + indent,
	          openObject: "{\n" + indent,
	          openArray: "[\n" + indent,
	          closeObject: "\n}",
	          closeArray: "\n]",
	          totalIndent: indent,
	          indent: indent
	        } : {
	          totalIndent: totalIndent = indent.indent + (lastTotalIndent = indent.totalIndent),
	          joiner: ",\n" + totalIndent,
	          openObject: "{\n" + totalIndent,
	          openArray: "[\n" + totalIndent,
	          closeObject: "\n" + lastTotalIndent + "}",
	          closeArray: "\n" + lastTotalIndent + "]",
	          indent: indent.indent
	        } : void 0;
	        ref = indentObject || standardIndent, joiner = ref.joiner, openObject = ref.openObject, openArray = ref.openArray, closeObject = ref.closeObject, closeArray = ref.closeArray;
	        if (isPlainObject(object)) {
	          return openObject + ((function() {
	            var j, len, ref1, results;
	            ref1 = (Object.keys(object)).sort();
	            results = [];
	            for (j = 0, len = ref1.length; j < len; j++) {
	              k = ref1[j];
	              if (object[k] !== void 0) {
	                results.push(escapeJavascriptString(k) + ": " + consistentJsonStringify(object[k], indentObject));
	              }
	            }
	            return results;
	          })()).join(joiner) + closeObject;
	        } else if (isArray(object)) {
	          return openArray + ((function() {
	            var j, len, results;
	            results = [];
	            for (j = 0, len = object.length; j < len; j++) {
	              v = object[j];
	              results.push(consistentJsonStringify(v, indentObject));
	            }
	            return results;
	          })()).join(joiner) + closeArray;
	        } else {
	          Neptine.Art.Foundation.log.error(error = "invalid object type for Json. Expecting: null, false, true, number, string, plain-object or array", object);
	          throw new Error(error);
	        }
	      }
	    })();
	  };

	  StringExtensions.splitRuns = function(str) {
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

	  StringExtensions.eachRunAsCharCodes = function(str, f) {
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

	  StringExtensions.humanFriendlyShorten = function(inputString, maxLength) {
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

	  StringExtensions.stripTrailingWhitespace = function(a) {
	    return a.split(/[ ]*\n/).join("\n").split(/[ ]*$/)[0].replace(/\n+$/, '');
	  };

	  return StringExtensions;

	})();


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var Time, base, commaize, dateSecondMinusPerformanceSecond, initDateSecond, initPerformanceSecond;

	commaize = __webpack_require__(32).commaize;

	self.performance || (self.performance = {});

	(base = self.performance).now || (base.now = self.performance.mozNow || self.performance.msNow || self.performance.oNow || self.performance.webkitNow || function() {
	  return new Date().getTime();
	});

	initPerformanceSecond = self.performance.now() / 1000;

	initDateSecond = new Date().getTime() / 1000;

	dateSecondMinusPerformanceSecond = initDateSecond - initPerformanceSecond;

	module.exports = Time = (function() {
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
	      Neptune.Art.Foundation.log("time: " + a + " took " + (Time.durationString(timeResult)));
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
	    console.log(a + " (" + (Time.lastTime ? Time.durationString(time - Time.lastTime) : void 0) + ")");
	    return Time.lastTime = time;
	  };

	  return Time;

	})();


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var CommonJs, isClass, isFunction, ref;

	ref = __webpack_require__(17), isClass = ref.isClass, isFunction = ref.isFunction;

	module.exports = CommonJs = (function() {
	  var definingModule;

	  function CommonJs() {}

	  definingModule = null;

	  CommonJs.getModuleBeingDefined = function() {
	    return definingModule;
	  };


	  /*
	  IN:
	    defineFunciton ||
	   */

	  CommonJs.defineModule = function(_module, a) {
	    var lastModule, mod, result;
	    lastModule = definingModule;
	    definingModule = _module;
	    mod = isFunction(a) ? isClass(a) ? a : a() : a;
	    result = _module.exports = (mod != null ? typeof mod.createWithPostCreate === "function" ? mod.createWithPostCreate(mod) : void 0 : void 0) || mod;
	    definingModule = lastModule;
	    return result;
	  };

	  return CommonJs;

	})();


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(45).includeInNamespace(__webpack_require__(46)).addModules({
	  FormattedInspect: __webpack_require__(51),
	  InspectedObjectLiteral: __webpack_require__(53),
	  Inspector: __webpack_require__(47),
	  Inspector2: __webpack_require__(55),
	  ToInspectedObjects: __webpack_require__(52),
	  ToPlainObjects: __webpack_require__(54)
	});

	__webpack_require__(56);


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var Inspect, StandardLib,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	StandardLib = __webpack_require__(25);

	module.exports = StandardLib.Inspect || StandardLib.addNamespace('Inspect', Inspect = (function(superClass) {
	  extend(Inspect, superClass);

	  function Inspect() {
	    return Inspect.__super__.constructor.apply(this, arguments);
	  }

	  return Inspect;

	})(Neptune.Base));


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	TODO: refactor so nothing in inspect/* uses BaseObject
	Then, move into StandardLib.
	 */
	module.exports = [[__webpack_require__(47), "shallowInspect inspectLean inspect"], __webpack_require__(51), __webpack_require__(52), __webpack_require__(54), __webpack_require__(53)];


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Inspector, Map, escapeJavascriptString, isArray, isBrowserObject, isClass, isFunction, isObject, isPlainArray, isPlainObject, isString, objectName, ref,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Map = __webpack_require__(48);

	escapeJavascriptString = __webpack_require__(41).escapeJavascriptString;

	ref = __webpack_require__(17), objectName = ref.objectName, isString = ref.isString, isArray = ref.isArray, isFunction = ref.isFunction, isObject = ref.isObject, isClass = ref.isClass, isBrowserObject = ref.isBrowserObject, isPlainObject = ref.isPlainObject, isPlainArray = ref.isPlainArray;

	module.exports = Inspector = (function() {
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

	  Inspector.inspect = function(obj, options) {
	    var inspector;
	    if (options == null) {
	      options = {};
	    }
	    inspector = new Inspector(options);
	    inspector.inspect(obj);
	    return inspector.getResult();
	  };

	  Inspector.shallowInspect = function(obj) {
	    if (obj == null) {
	      return "" + obj;
	    } else if (Inspector.customInspectable(obj)) {
	      return Inspector.inspect(obj);
	    } else if (isString(obj)) {
	      return escapeJavascriptString(obj);
	    } else if (isArray(obj)) {
	      return "<<Array length: " + obj.length + ">>";
	    } else if (isFunction(obj) && obj.name === "") {
	      return "<<function args: " + obj.length + ">>";
	    } else {
	      return "<<" + (typeof obj) + ": " + (obj.name || obj) + ">>";
	    }
	  };

	  Inspector.inspectLean = function(object, options) {
	    var fullInspect, match;
	    fullInspect = Inspector.inspect(object, options);
	    if (!isFunction(object != null ? object.inspect : void 0) && (isPlainObject(object) || (isPlainArray(object) && (object.length > 1 || (options != null ? options.forArgs : void 0))))) {
	      match = fullInspect.match(/^\[(.+)\]$|^\{(.+)\}$/);
	      if (match) {
	        return match[1] || match[2] || match[3];
	      } else {
	        return fullInspect;
	      }
	    } else {
	      return fullInspect;
	    }
	  };

	  Inspector.prototype.put = function(s) {
	    if (this.done) {
	      return;
	    }
	    this.outArray.push(this.length + s.length > this.maxLength ? (this.done = true, "...") : (this.length += s.length, s));
	    return s;
	  };

	  Inspector.prototype.getResult = function() {
	    return this.outArray.join("");
	  };

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
	      if (obj.inspect.length > 0) {
	        return obj.inspect(this);
	      } else {
	        return this.put(obj.inspect());
	      }
	    } else if (obj instanceof RegExp) {
	      return this.put("" + obj);
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

	})();


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	TODO: This is almost identical to ES6's Map: Switch to using a Polyfill like:
	  https://github.com/paulmillr/es6-shim

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
	var Map, MinimalBaseObject, Node, Unique,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Unique = __webpack_require__(49);

	MinimalBaseObject = __webpack_require__(50);

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

	module.exports = Map = (function(superClass) {
	  extend(Map, superClass);

	  Map.inverseMap = function(array) {
	    var i, k, len, result, v;
	    result = new Map;
	    for (k = i = 0, len = array.length; i < len; k = ++i) {
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
	      var i, len, node, ref, results;
	      ref = this.nodes;
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        node = ref[i];
	        results.push(node.key);
	      }
	      return results;
	    },
	    values: function() {
	      var i, len, node, ref, results;
	      ref = this.nodes;
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        node = ref[i];
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
	    var i, len, node, ref;
	    ref = this.nodes;
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      f(node.value);
	    }
	    return this;
	  };

	  Map.prototype.findFirst = function(testF) {
	    var i, len, node, ref;
	    ref = this.nodes;
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      if (testF(node.value)) {
	        return node.value;
	      }
	    }
	    return void 0;
	  };

	  Map.prototype.each = function(f) {
	    var i, len, node, ref;
	    ref = this.nodes;
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      f(node.key, node.value);
	    }
	    return this;
	  };

	  Map.prototype.map = function(f) {
	    var i, len, node, ref, results;
	    ref = this.nodes;
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      results.push(f(node.key, node.value));
	    }
	    return results;
	  };

	  Map.prototype.inspect = function(inspector) {
	    var _inspect, first;
	    if (!inspector) {
	      return Neptune.Art.Foundation.inspect(this);
	    }
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
	    inspect = Neptune.Art.Foundation.inspect;
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

	})(MinimalBaseObject);


/***/ },
/* 49 */
/***/ function(module, exports) {

	var Unique, nextId;

	nextId = 1;

	module.exports = Unique = (function() {
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
	    if (typeof key === "object" || typeof key === "function") {
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


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var MinimalBaseObject, capitalize, isFunction, isPlainObject, isString, ref;

	capitalize = Neptune.NeptuneLib.capitalize;

	ref = __webpack_require__(17), isFunction = ref.isFunction, isString = ref.isString, isPlainObject = ref.isPlainObject;

	module.exports = MinimalBaseObject = (function() {
	  var addGetter, addGetters, addProperties, addSetter, addSetters, defProperties, defProperty, propGetterName, propInternalName, propListStringToArray, propSetterName;

	  function MinimalBaseObject() {}

	  MinimalBaseObject.propInternalName = propInternalName = function(prop) {
	    return "_" + prop;
	  };


	  /*
	  IN: arguments is a list of strings or objects
	    strings: are just the names of the properties
	    objects: map from prop names to getter/setter functions
	   */

	  MinimalBaseObject.getter = function() {
	    return defProperties(this.prototype, arguments, true, false);
	  };

	  MinimalBaseObject.setter = function() {
	    return defProperties(this.prototype, arguments, false, true);
	  };

	  MinimalBaseObject.addGetter = function(prop, getter) {
	    return this._addGetter(this.prototype, prop, getter);
	  };

	  MinimalBaseObject.addSetter = function(prop, setter) {
	    return this._addSetter(this.prototype, prop, setter);
	  };

	  MinimalBaseObject.addClassGetter = function(prop, getter) {
	    return this._addGetter(this, prop, getter);
	  };

	  MinimalBaseObject.addClassSetter = function(prop, setter) {
	    return this._addSetter(this, prop, setter);
	  };


	  /*
	  IN: arguments is a list of strings or objects
	    strings: are just the names of the properties
	    objects: map from prop names to initializers
	   */

	  MinimalBaseObject.property = function() {
	    return defProperties(this.prototype, arguments, true, true);
	  };

	  MinimalBaseObject.classGetter = function() {
	    return defProperties(this, arguments, true, false);
	  };

	  MinimalBaseObject.classSetter = function() {
	    return defProperties(this, arguments, false, true);
	  };

	  MinimalBaseObject.classProperty = function() {
	    return defProperties(this, arguments, true, true);
	  };

	  MinimalBaseObject._propGetterName = propGetterName = function(prop) {
	    return "get" + capitalize(prop);
	  };

	  MinimalBaseObject._propSetterName = propSetterName = function(prop) {
	    return "set" + capitalize(prop);
	  };

	  MinimalBaseObject._addGetter = addGetter = function(obj, prop, getter) {
	    obj[propGetterName(prop)] = getter;
	    if (!isFunction(getter)) {
	      getter = (function() {
	        return getter;
	      });
	    }
	    Object.defineProperty(obj, prop, {
	      get: getter,
	      configurable: true
	    });
	    return prop;
	  };

	  MinimalBaseObject._addSetter = addSetter = function(obj, prop, setter) {
	    obj[propSetterName(prop)] = setter;
	    Object.defineProperty(obj, prop, {
	      set: setter,
	      configurable: true
	    });
	    return prop;
	  };

	  MinimalBaseObject._addGetters = addGetters = function(obj, map) {
	    var getter, prop;
	    for (prop in map) {
	      getter = map[prop];
	      addGetter(obj, prop, getter);
	    }
	    return map;
	  };

	  MinimalBaseObject._addSetters = addSetters = function(obj, map) {
	    var prop, setter;
	    for (prop in map) {
	      setter = map[prop];
	      addSetter(obj, prop, setter);
	    }
	    return map;
	  };

	  MinimalBaseObject._addProperties = addProperties = function(obj, map) {
	    var initializer, prop;
	    for (prop in map) {
	      initializer = map[prop];
	      defProperty(obj, prop, true, true, initializer);
	    }
	    return map;
	  };

	  MinimalBaseObject._defProperty = defProperty = function(obj, prop, defineGetter, defineSetter, initializer) {
	    var propName;
	    propName = propInternalName(prop);
	    if (defineGetter) {
	      addGetter(obj, prop, obj[propGetterName(prop)] = isFunction(initializer) ? function() {
	        if (this[propName] != null) {
	          return this[propName];
	        } else {
	          return this[propName] = initializer();
	        }
	      } : initializer != null ? function() {
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

	  MinimalBaseObject._defProperties = defProperties = function(obj, props, defineGetter, defineSetter) {
	    var i, len, prop, propFromString, propMap, results;
	    results = [];
	    for (i = 0, len = props.length; i < len; i++) {
	      prop = props[i];
	      if (isPlainObject(propMap = prop)) {
	        if (defineGetter && defineSetter) {
	          results.push(addProperties(obj, propMap));
	        } else if (defineGetter) {
	          results.push(addGetters(obj, propMap));
	        } else {
	          results.push(addSetters(obj, propMap));
	        }
	      } else if (isString(prop)) {
	        results.push((function() {
	          var j, len1, ref1, results1;
	          ref1 = propListStringToArray(prop);
	          results1 = [];
	          for (j = 0, len1 = ref1.length; j < len1; j++) {
	            propFromString = ref1[j];
	            results1.push(defProperty(obj, propFromString, defineGetter, defineSetter, null));
	          }
	          return results1;
	        })());
	      } else {
	        throw new Error("invalid value. Expected string or plain-object:", prop);
	      }
	    }
	    return results;
	  };

	  MinimalBaseObject._propListStringToArray = propListStringToArray = function(propList) {
	    return propList.match(/[_a-z][_a-z0-9]*/gi);
	  };

	  return MinimalBaseObject;

	})();


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var FormattedInspect, alignTabStopsByBlocks, alignTabs, escapeJavascriptString, formatMultilineSubStructure, formatMultilineSubStructureForObject, formattedInspectRecursive, inspect, isFunction, isNumber, isPlainArray, isPlainObject, isString, max, newLineWithNiceNodeInspectIndent, niceNodeInspectIndent, pad, ref, ref1, stripTrailingWhitespace, toInspectedObjects;

	ref = __webpack_require__(17), isString = ref.isString, isPlainObject = ref.isPlainObject, isPlainArray = ref.isPlainArray, isFunction = ref.isFunction, isNumber = ref.isNumber;

	max = Math.max;

	ref1 = __webpack_require__(41), pad = ref1.pad, stripTrailingWhitespace = ref1.stripTrailingWhitespace, escapeJavascriptString = ref1.escapeJavascriptString;

	inspect = __webpack_require__(47).inspect;

	toInspectedObjects = __webpack_require__(52).toInspectedObjects;

	niceNodeInspectIndent = '  ';

	newLineWithNiceNodeInspectIndent = "\n" + niceNodeInspectIndent;

	formatMultilineSubStructure = function(m, inspected, implicitRepresentationOk) {
	  if (!inspected.match(/\n/)) {
	    return inspected;
	  }
	  return inspected.replace(/\n/g, newLineWithNiceNodeInspectIndent);
	};

	formatMultilineSubStructureForObject = function(m, inspected, implicitRepresentationOk) {
	  if (!inspected.match(/\n/)) {
	    return inspected;
	  }
	  if (inspected.match(/^- /)) {
	    return "\n" + inspected + "\n";
	  } else {
	    return newLineWithNiceNodeInspectIndent + inspected.replace(/\n/g, newLineWithNiceNodeInspectIndent);
	  }
	};

	formattedInspectRecursive = function(m, options, implicitRepresentationOk) {
	  var _isPlainObject, containsConsecutiveArrays, containsConsecutiveObjects, finalInspectedValues, forceMultilineOutput, i, indentedInspectedArray, index, inspected, inspectedEl, inspectedLength, inspectedValue, inspectedValues, k, key, keyCount, lastWasArray, lastWasObject, maxLineLength, shouldBeOnOwnLine, v, value;
	  maxLineLength = options.maxLineLength;
	  if (isPlainObject(m)) {
	    inspectedLength = 0;
	    forceMultilineOutput = false;
	    shouldBeOnOwnLine = false;
	    keyCount = 0;
	    inspectedValues = (function() {
	      var results;
	      results = [];
	      for (key in m) {
	        value = m[key];
	        keyCount++;
	        inspectedValue = formatMultilineSubStructureForObject(value, formattedInspectRecursive(value, options));
	        if (!key.match(/^[-._a-zA-Z[_a-zA-Z0-9]*$/)) {
	          key = inspect(key);
	        }
	        inspectedLength += inspectedValue.length + key.length + 2;
	        forceMultilineOutput || (forceMultilineOutput = shouldBeOnOwnLine);
	        shouldBeOnOwnLine = !inspectedValue.match(/^([^,:]|\(.*\)|\{.*\}|\".*\"|\'.*\'|\[.*\])*$/);
	        results.push([key, inspectedValue]);
	      }
	      return results;
	    })();
	    if (keyCount === 0) {
	      return "{}";
	    }
	    index = 0;
	    finalInspectedValues = (function() {
	      var j, len, ref2, results;
	      results = [];
	      for (j = 0, len = inspectedValues.length; j < len; j++) {
	        ref2 = inspectedValues[j], k = ref2[0], v = ref2[1];
	        results.push(k + ":\t" + v);
	      }
	      return results;
	    })();
	    return finalInspectedValues.join(!forceMultilineOutput && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2 ? ",\t" : "\n");
	  } else if (isPlainArray(m)) {
	    inspectedLength = 0;
	    lastWasObject = false;
	    lastWasArray = false;
	    containsConsecutiveObjects = false;
	    containsConsecutiveArrays = false;
	    inspectedValues = (function() {
	      var j, len, results;
	      results = [];
	      for (j = 0, len = m.length; j < len; j++) {
	        value = m[j];
	        implicitRepresentationOk = true;
	        if (_isPlainObject = isPlainObject(value)) {
	          containsConsecutiveObjects || (containsConsecutiveObjects = lastWasObject);
	          lastWasObject = true;
	        } else {
	          lastWasObject = false;
	        }
	        if (isPlainArray(value)) {
	          implicitRepresentationOk = false;
	          containsConsecutiveArrays || (containsConsecutiveArrays = lastWasArray);
	          lastWasArray = true;
	        }
	        inspected = formattedInspectRecursive(value, options, implicitRepresentationOk);
	        inspected = formatMultilineSubStructure(value, inspected, implicitRepresentationOk);
	        inspectedLength += inspected.length;
	        results.push(inspected);
	      }
	      return results;
	    })();
	    if (!containsConsecutiveArrays && !containsConsecutiveObjects && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2) {
	      if (inspectedValues.length === 0) {
	        return "[]";
	      } else if (inspectedValues.length <= 1) {
	        return "- " + (inspectedValues.join(",\t"));
	      } else {
	        return inspectedValues.join(",\t");
	      }
	    } else {
	      indentedInspectedArray = (function() {
	        var j, len, results;
	        results = [];
	        for (i = j = 0, len = inspectedValues.length; j < len; i = ++j) {
	          inspectedEl = inspectedValues[i];
	          results.push("- " + inspectedEl);
	        }
	        return results;
	      })();
	      return "" + (indentedInspectedArray.join("\n"));
	    }
	  } else if (isString(m)) {
	    if (m.length > 10 && m.match(/\n/) && !m.match(/\ (\n|$)/)) {
	      return ['"""', m.replace(/"""/, '""\\"'), '"""'].join('\n');
	    } else {
	      return escapeJavascriptString(m);
	    }
	  } else {
	    return inspect(m);
	  }
	};

	alignTabs = function(maxLineLength, linesString) {
	  var alignedLines, el, elements, i, j, l, len, len1, line, lines, maxColumnSizes, maxColumnWidth, numColumnsToPad, r, tabStops, totalPad;
	  tabStops = 1;
	  lines = linesString.split("\n");
	  numColumnsToPad = null;
	  maxColumnSizes = [];
	  maxColumnWidth = maxLineLength / 2;
	  for (j = 0, len = lines.length; j < len; j++) {
	    line = lines[j];
	    if (!((elements = line.split("\t")).length > 1)) {
	      continue;
	    }
	    if (numColumnsToPad == null) {
	      numColumnsToPad = elements.length - 1;
	    } else if (numColumnsToPad !== elements.length - 1) {
	      numColumnsToPad = 1;
	    }
	    for (i = l = 0, len1 = elements.length; l < len1; i = ++l) {
	      el = elements[i];
	      if (!(i < elements.length - 1 && (i === 0 || el.length < maxColumnWidth))) {
	        continue;
	      }
	      if (maxColumnSizes.length === i) {
	        maxColumnSizes.push(0);
	      }
	      maxColumnSizes[i] = max(maxColumnSizes[i], el.length + 1);
	    }
	  }
	  alignedLines = (function() {
	    var len2, n, results;
	    results = [];
	    for (n = 0, len2 = lines.length; n < len2; n++) {
	      line = lines[n];
	      elements = line.split("\t");
	      r = (function() {
	        var len3, o, results1;
	        if (elements.length > 1) {
	          totalPad = 0;
	          results1 = [];
	          for (i = o = 0, len3 = elements.length; o < len3; i = ++o) {
	            el = elements[i];
	            totalPad += maxColumnSizes[i] || 0;
	            if (maxColumnSizes[i]) {
	              results1.push(pad(el, maxColumnSizes[i]));
	            } else {
	              results1.push(el + " ");
	            }
	          }
	          return results1;
	        } else {
	          return elements;
	        }
	      })();
	      results.push(r.join(""));
	    }
	    return results;
	  })();
	  return alignedLines.join("\n");
	};

	alignTabStopsByBlocks = function(maxLineLength, linesString) {
	  return alignTabs(maxLineLength, linesString);
	};

	module.exports = FormattedInspect = (function() {
	  function FormattedInspect() {}

	  FormattedInspect.formattedInspect = function(m, options) {
	    if (options == null) {
	      options = {};
	    }
	    if (isNumber(options)) {
	      options = {
	        maxLineLength: options
	      };
	    }
	    if (options.maxLineLength == null) {
	      options.maxLineLength = 80;
	    }
	    return stripTrailingWhitespace(alignTabStopsByBlocks(options.maxLineLength, formattedInspectRecursive(toInspectedObjects(m), options)));
	  };

	  return FormattedInspect;

	})();


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var InspectedObjects, deepMap, escapeJavascriptString, inspectedObjectLiteral, isFunction, isPlainArray, isPlainObject, isPromise, isString, ref;

	ref = __webpack_require__(17), deepMap = ref.deepMap, isPlainArray = ref.isPlainArray, isPlainObject = ref.isPlainObject, isString = ref.isString, isFunction = ref.isFunction, isPromise = ref.isPromise;

	escapeJavascriptString = __webpack_require__(41).escapeJavascriptString;

	inspectedObjectLiteral = __webpack_require__(53).inspectedObjectLiteral;

	module.exports = InspectedObjects = (function() {
	  var toInspectedObjects;

	  function InspectedObjects() {}

	  InspectedObjects.toInspectedObjects = toInspectedObjects = function(m) {
	    var functionString, oldm, out, reducedFunctionString;
	    if (m == null) {
	      return m;
	    }
	    oldm = m;
	    if (m === global) {
	      return inspectedObjectLiteral("global");
	    } else if (out = typeof m.getInspectedObjects === "function" ? m.getInspectedObjects() : void 0) {
	      return out;
	    } else if (isPromise(m)) {
	      return inspectedObjectLiteral("Promise");
	    } else if (isPlainObject(m) || isPlainArray(m)) {
	      return deepMap(m, function(v) {
	        return toInspectedObjects(v);
	      });
	    } else if (m instanceof Error) {
	      return inspectedObjectLiteral(m.stack || m.toString(), true);
	    } else if (isFunction(m)) {
	      functionString = "" + m;
	      reducedFunctionString = functionString.replace(/\s+/g, ' ').replace(/^function (\([^)]*\))/, "$1 ->").replace(/^\(\)\s*/, '');
	      return inspectedObjectLiteral(reducedFunctionString.length < 80 ? reducedFunctionString : functionString.slice(0, 5 * 80));
	    } else {
	      return m;
	    }
	  };

	  return InspectedObjects;

	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var InspectedObjectLiteral, compare;

	compare = __webpack_require__(35).compare;

	module.exports = InspectedObjectLiteral = (function() {
	  InspectedObjectLiteral.inspectedObjectLiteral = function(literal, isError) {
	    return new InspectedObjectLiteral(literal, isError);
	  };

	  function InspectedObjectLiteral(literal1, isError1) {
	    this.literal = literal1;
	    this.isError = isError1;
	  }

	  InspectedObjectLiteral.prototype.getInspectedObjects = function() {
	    return this;
	  };

	  InspectedObjectLiteral.prototype.inspect = function() {
	    return this.literal;
	  };

	  InspectedObjectLiteral.prototype.compare = function(b) {
	    return compare(this.literal, b.literal);
	  };

	  return InspectedObjectLiteral;

	})();


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var PlainObjects, deepMap, inspectedObjectLiteral, isFunction, isPlainArray, isPlainObject, ref;

	ref = __webpack_require__(17), deepMap = ref.deepMap, isPlainArray = ref.isPlainArray, isPlainObject = ref.isPlainObject, isFunction = ref.isFunction;

	inspectedObjectLiteral = __webpack_require__(53).inspectedObjectLiteral;

	module.exports = PlainObjects = (function() {
	  var toPlainObjects;

	  function PlainObjects() {}

	  PlainObjects.toPlainObjects = toPlainObjects = function(m) {
	    var functionString, oldm, out, reducedFunctionString;
	    if (m == null) {
	      return m;
	    }
	    oldm = m;
	    if (out = typeof m.getPlainObjects === "function" ? m.getPlainObjects() : void 0) {
	      return out;
	    } else if (isPlainObject(m) || isPlainArray(m)) {
	      return deepMap(m, function(v) {
	        return toPlainObjects(v);
	      });
	    } else if (isFunction(m)) {
	      functionString = "" + m;
	      reducedFunctionString = functionString.replace(/\s+/g, ' ').replace(/^function (\([^)]*\))/, "$1 ->").replace(/^\(\)\s*/, '');
	      return inspectedObjectLiteral(reducedFunctionString.length < 80 ? reducedFunctionString : functionString.slice(0, 5 * 80));
	    } else {
	      return m;
	    }
	  };

	  return PlainObjects;

	})();


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var Inspected, Inspector2, Map, MinimalBaseObject, escapeJavascriptString, isArray, isBrowserObject, isClass, isDate, isFunction, isHTMLImageElement, isObject, isPlainObject, isRegExp, isString, objectName, parentString, ref,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	MinimalBaseObject = __webpack_require__(50);

	Map = __webpack_require__(48);

	Inspected = __webpack_require__(56);

	escapeJavascriptString = __webpack_require__(41).escapeJavascriptString;

	ref = __webpack_require__(17), isString = ref.isString, isArray = ref.isArray, isFunction = ref.isFunction, isObject = ref.isObject, isPlainObject = ref.isPlainObject, isClass = ref.isClass, isDate = ref.isDate, isRegExp = ref.isRegExp, objectName = ref.objectName, isBrowserObject = ref.isBrowserObject;

	isHTMLImageElement = self.HTMLImageElement ? function(obj) {
	  return obj instanceof HTMLImageElement;
	} : function() {
	  return false;
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

	module.exports = Inspector2 = (function(superClass) {
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
	    obj.toImage().then((function(_this) {
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
	      if (isFunction(obj.inspect)) {
	        res.inspected = obj.inspect();
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
	    if (isFunction(obj != null ? obj.getInspectedObjects : void 0)) {
	      obj = obj.getInspectedObjects();
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

	})(MinimalBaseObject);


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(57).addModules({
	  Array: __webpack_require__(58),
	  Core: __webpack_require__(59),
	  Object: __webpack_require__(60),
	  String: __webpack_require__(61)
	});


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var Inspect, Inspected,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Inspect = __webpack_require__(45);

	module.exports = Inspect.Inspected || Inspect.addNamespace('Inspected', Inspected = (function(superClass) {
	  extend(Inspected, superClass);

	  function Inspected() {
	    return Inspected.__super__.constructor.apply(this, arguments);
	  }

	  return Inspected;

	})(Neptune.Base));


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var Array, MinimalBaseObject,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	MinimalBaseObject = __webpack_require__(50);

	module.exports = Array = (function(superClass) {
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

	})(MinimalBaseObject);


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var Core, MinimalBaseObject,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	MinimalBaseObject = __webpack_require__(50);

	module.exports = Core = (function(superClass) {
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

	})(MinimalBaseObject);


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var MinimalBaseObject, Object,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	MinimalBaseObject = __webpack_require__(50);

	module.exports = Object = (function(superClass) {
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

	})(MinimalBaseObject);


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var MinimalBaseObject, String, escapeJavascriptString,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	MinimalBaseObject = __webpack_require__(50);

	escapeJavascriptString = __webpack_require__(41).escapeJavascriptString;

	module.exports = String = (function(superClass) {
	  extend(String, superClass);

	  function String(clonedString) {
	    String.__super__.constructor.apply(this, arguments);
	    this.string = clonedString;
	  }

	  String.prototype.toString = function() {
	    return escapeJavascriptString(this.string);
	  };

	  return String;

	})(MinimalBaseObject);


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	This current iteration of clone relies on some singleton variables shared across all invocations of clone.
	This is fine as long as javascript stays single-threaded.
	It also introduces a little bit of uglyness initializing clonedMap necessitating the "top" variable.

	FUTURE
	A potentially better solution would be to create a new closer each time clone is called at the top-most level,
	but when recursing, pass in a new function bound to that closure which is different from the global clone function.

	populateClone would need to take an additional argument - the clone function to use for recursive cloning.
	 */
	var Clone, Foundation, Map, Unique, byProperties, byStructure, clonedMap, inspect, topObject, uniquePropertyName;

	Foundation = __webpack_require__(25);

	Map = __webpack_require__(48);

	Unique = __webpack_require__(49);

	inspect = __webpack_require__(44).inspect;

	uniquePropertyName = Unique.PropertyName;

	clonedMap = null;

	byStructure = false;

	byProperties = false;

	topObject = null;

	module.exports = Clone = (function() {
	  var clone, cloneArray, cloneByProperties, cloneByStructure, cloneObject, emptyClone;

	  function Clone() {}

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

	  Clone.emptyClone = emptyClone = function(obj) {
	    if (obj.constructor === Array) {
	      return [];
	    } else {
	      return Object.create(Object.getPrototypeOf(obj));
	    }
	  };

	  Clone.clone = clone = function(obj, mode) {
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

	  Clone.cloneByProperties = cloneByProperties = function(obj) {
	    return clone(obj, "byProperties");
	  };

	  Clone.cloneByStructure = cloneByStructure = function(obj) {
	    return clone(obj, "byStructure");
	  };

	  return Clone;

	})();


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var Inspect, Log, callStack, isString, peek,
	  slice = [].slice;

	Inspect = __webpack_require__(45);

	callStack = __webpack_require__(64).callStack;

	isString = __webpack_require__(17).isString;

	peek = __webpack_require__(31).peek;

	module.exports = Log = (function() {
	  var noOptions;

	  function Log() {}

	  Log.contextString = function(stack, defaultContext) {
	    var caller, context;
	    if (stack && (caller = stack[1])) {
	      if (caller.original) {
	        return caller.original;
	      } else {
	        context = caller["function"] ? caller["class"] ? caller["class"] + "::" + caller["function"] + "()" : caller["function"] + "()" : defaultContext ? defaultContext + ":" : "";
	        if (caller.sourceFileName) {
	          return "at " + caller.sourceFileName + ("-" + caller.sourceLine + ": ") + context;
	        }
	      }
	    } else {
	      return "at " + (defaultContext || "(unknown context)");
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
	    while ((inspected = Inspect.inspectLean(toInspect, {
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
	      return Log.autoSizedIndepect(params);
	    }
	  };

	  Log.hideLogging = function() {
	    return Log.loggingHidden = true;
	  };

	  Log.showLogging = function() {
	    return Log.loggingHidden = false;
	  };

	  Log.rawLog = function() {
	    if (!Log.loggingHidden) {
	      return console.log.apply(console, arguments);
	    }
	  };

	  Log.rawErrorLog = function() {
	    if (!Log.loggingHidden) {
	      return console.error.apply(console, arguments);
	    }
	  };

	  noOptions = {};

	  Log.logCore = function(m, stack, options) {
	    var className, isError, logger;
	    if (options == null) {
	      options = noOptions;
	    }
	    className = options.className, isError = options.isError;
	    if (Log.alternativeLogger) {
	      Log.alternativeLogger.logCore(m, stack, options);
	    }
	    logger = isError ? Log.rawErrorLog : Log.rawLog;
	    if (Neptune.isNode) {
	      return logger(isString(m) ? m : Inspect.formattedInspect(m));
	    } else {
	      return logger(m, "\n# Foundation.log called " + Log.contextString(stack, className));
	    }
	  };

	  Log.log = function() {
	    var args, m, stack;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    m = args.length === 1 ? args[0] : args;
	    stack = callStack();
	    Log.logCore(m, stack);
	    return peek(args);
	  };


	  /*
	  
	  IN:
	    labelString, value
	    OR object with one or more properties (usually just one)
	      returns the last value of the objects last key-value pair
	  
	  EX:
	    log.withLabel foo: myObject
	     * out: myObject
	  
	    log.withLabel "foo", myObject
	     * out: myObject
	   */

	  Log.log.withLabel = function(a, b) {
	    var k, obj, ret, v;
	    if (isString(a)) {
	      obj = {};
	      obj[a] = b;
	      Log.log(obj);
	      return b;
	    } else {
	      ret = null;
	      for (k in a) {
	        v = a[k];
	        ret = v;
	      }
	      Log.log(obj);
	      return ret;
	    }
	  };

	  Log.log.error = function() {
	    var args, m, stack;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    m = args.length === 1 ? args[0] : args;
	    stack = callStack();
	    Log.logCore(m, stack, {
	      isError: true
	    });
	    return peek(args);
	  };

	  Log.logL = function(obj) {
	    var k, ret, v;
	    console.warn("DEPRICATED: logL. USE log.labeled");
	    ret = null;
	    for (k in obj) {
	      v = obj[k];
	      ret = v;
	    }
	    Log.log(obj);
	    return ret;
	  };

	  return Log;

	})();


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var CallStack, inspect, isString, parseUrl;

	isString = __webpack_require__(17).isString;

	parseUrl = __webpack_require__(37).parseUrl;

	inspect = __webpack_require__(44).inspect;

	module.exports = CallStack = (function() {
	  var CallStackLine;

	  function CallStack() {}

	  CallStack.errorToString = function(error) {
	    return (error != null ? error.error : void 0) || (error != null ? error.message : void 0) || (isString(error) && error) || Neptune.Art.Foundation.formattedInspect(error);
	  };

	  CallStack.CallStackLine = CallStackLine = (function() {
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
	        url = parseUrl(this.source);
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

	  CallStack.rawCallStack = (new Error).stack ? function(ignoreTop) {
	    if (ignoreTop == null) {
	      ignoreTop = 0;
	    }
	    return (new Error).stack.split(/\n  */).slice(ignoreTop + 2);
	  } : function(ignoreTop) {
	    var e;
	    if (ignoreTop == null) {
	      ignoreTop = 0;
	    }
	    try {
	      throw new Error;
	    } catch (error1) {
	      e = error1;
	      return e.stack.split(/\n  */).slice(ignoreTop + 2);
	    }
	  };

	  CallStack.callStack = function(ignoreTop) {
	    var i, len, line, ref, results;
	    if (ignoreTop == null) {
	      ignoreTop = 0;
	    }
	    ref = CallStack.rawCallStack(ignoreTop + 1);
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      line = ref[i];
	      results.push(new CallStackLine(line));
	    }
	    return results;
	  };

	  return CallStack;

	})();


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(66).includeInNamespace(__webpack_require__(67)).addModules({
	  BinaryString: __webpack_require__(70),
	  DataUri: __webpack_require__(78),
	  EncodedImage: __webpack_require__(79),
	  File: __webpack_require__(69),
	  Stream: __webpack_require__(77),
	  TypedarraySlicePolyfill: __webpack_require__(68),
	  Utf8: __webpack_require__(71),
	  WriteStream: __webpack_require__(80)
	});


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var Binary, Foundation,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(21);

	module.exports = Foundation.Binary || Foundation.addNamespace('Binary', Binary = (function(superClass) {
	  extend(Binary, superClass);

	  function Binary() {
	    return Binary.__super__.constructor.apply(this, arguments);
	  }

	  return Binary;

	})(Neptune.Base));


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68);

	module.exports = [
	  __webpack_require__(69), {
	    stream: (__webpack_require__(77)).stream
	  }, [__webpack_require__(70), "binary binaryFromBlob"]
	];


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var base, base1, base10, base11, base2, base3, base4, base5, base6, base7, base8, base9, bound, genericSlice, ref, ref1;

	bound = __webpack_require__(24).bound;

	(base = Uint8Array.prototype).slice || (base.slice = genericSlice = function(start, end) {
	  var i, j, length, out, outIndex, ref, ref1;
	  if (end == null) {
	    end = this.length;
	  }
	  if (start < 0) {
	    start += this.length;
	  }
	  if (end < 0) {
	    end += this.length;
	  }
	  start = bound(0, start, this.length);
	  end = bound(0, end, this.length);
	  out = new Uint8Array(length = end - start);
	  outIndex = 0;
	  for (i = j = ref = start, ref1 = end; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
	    out[outIndex++] = this[i];
	  }
	  return out;
	});

	(base1 = Int8Array.prototype).slice || (base1.slice = genericSlice);

	(base2 = Uint8Array.prototype).slice || (base2.slice = genericSlice);

	(base3 = Int16Array.prototype).slice || (base3.slice = genericSlice);

	(base4 = Uint16Array.prototype).slice || (base4.slice = genericSlice);

	(base5 = Int32Array.prototype).slice || (base5.slice = genericSlice);

	(base6 = Uint32Array.prototype).slice || (base6.slice = genericSlice);

	(base7 = Float32Array.prototype).slice || (base7.slice = genericSlice);

	(base8 = Float64Array.prototype).slice || (base8.slice = genericSlice);

	if ((ref = self.Uint8ClampedArray) != null) {
	  (base9 = ref.prototype).slice || (base9.slice = genericSlice);
	}

	if ((ref1 = self.CanvasPixelArray) != null) {
	  (base10 = ref1.prototype).slice || (base10.slice = genericSlice);
	}

	(base11 = ArrayBuffer.prototype).slice || (base11.slice = function(start, end) {
	  return (new Uint8Array(this)).slice(start, end).buffer;
	});


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var BinaryString, File, Promise, StandardLib;

	StandardLib = __webpack_require__(24);

	Promise = StandardLib.Promise;

	BinaryString = __webpack_require__(70);

	module.exports = File = (function() {
	  var readAsArrayBuffer;

	  function File() {}

	  File._readWithPromise = function(readFunction) {
	    return function(file) {
	      return new Promise(function(resolve, reject) {
	        var fr;
	        fr = new FileReader;
	        fr[readFunction](file);
	        fr.onerror = reject;
	        return fr.onload = (function(_this) {
	          return function(event) {
	            return resolve(event.target.result);
	          };
	        })(this);
	      });
	    };
	  };

	  File.readAsArrayBuffer = readAsArrayBuffer = File._readWithPromise("readAsArrayBuffer");

	  File.readAsDataURL = File._readWithPromise("readAsDataURL");

	  File.readAsBinaryString = function(file) {
	    return readAsArrayBuffer(file).then(function(arrayBuffer) {
	      return new BinaryString(arrayBuffer);
	    });
	  };

	  return File;

	})();


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Binary, BinaryString, ClassSystem, StandardLib, Utf8, compactFlatten, encodings, inspect, isFunction, isPlainArray, isString, log, min, pad, readFileAsArrayBuffer, readFileAsDataUrl,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Binary = __webpack_require__(66);

	Utf8 = __webpack_require__(71);

	StandardLib = __webpack_require__(24);

	ClassSystem = __webpack_require__(72);

	isString = StandardLib.isString, isFunction = StandardLib.isFunction, isPlainArray = StandardLib.isPlainArray, log = StandardLib.log, min = StandardLib.min, inspect = StandardLib.inspect, readFileAsDataUrl = StandardLib.readFileAsDataUrl, readFileAsArrayBuffer = StandardLib.readFileAsArrayBuffer, compactFlatten = StandardLib.compactFlatten, pad = StandardLib.pad;

	BaseObject = ClassSystem.BaseObject, inspect = ClassSystem.inspect;

	encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	module.exports = BinaryString = (function(superClass) {
	  var binary;

	  extend(BinaryString, superClass);

	  BinaryString.binary = binary = function(arg) {
	    if (arg instanceof BinaryString) {
	      return arg;
	    } else {
	      return new BinaryString(arg);
	    }
	  };

	  BinaryString.binaryFromBlob = function(blob) {
	    return readFileAsArrayBuffer(blob).then(function(ab) {
	      return binary(ab);
	    });
	  };

	  BinaryString.cloneUint8Array = function(srcU8A) {
	    var dstU8A;
	    dstU8A = new Uint8Array(new ArrayBuffer(src.length));
	    dstU8A.set(srcU8A);
	    return dstU8A;
	  };

	  function BinaryString(arg) {
	    this.bytes = (function() {
	      if (arg instanceof BinaryString) {
	        return BinaryString.cloneUint8Array(arg.bytes);
	      } else if (isFunction(arg != null ? arg.uint8Array : void 0)) {
	        return arg.uint8Array();
	      } else if (isPlainArray(arg)) {
	        return new Uint8Array(arg);
	      } else if (arg instanceof ArrayBuffer) {
	        return new Uint8Array(arg);
	      } else if (arg instanceof Uint8Array) {
	        return arg;
	      } else if (isString(arg)) {
	        return Utf8.toBuffer(arg);
	      } else if (isFunction(arg.toString)) {
	        return Utf8.toBuffer(arg.toString());
	      } else {
	        throw new Error("invalid Binary string constructor argument: " + (inspect(arg)));
	      }
	    })();
	    this.length = this.bytes.length;
	  }

	  BinaryString.prototype.slice = function(a, b) {
	    return new BinaryString(this.bytes.slice(a, b));
	  };

	  BinaryString.fromBase64 = function(base64encoding) {
	    var byteString, i, j, len, ref, uint8Array;
	    byteString = atob(base64encoding);
	    len = byteString.length;
	    uint8Array = new Uint8Array(new ArrayBuffer(len));
	    for (i = j = 0, ref = len; j < ref; i = j += 1) {
	      uint8Array[i] = byteString.charCodeAt(i);
	    }
	    return new BinaryString(uint8Array);
	  };

	  BinaryString.prototype.toDataUri = function() {
	    return readFileAsDataUrl(new Blob([this.bytes]));
	  };

	  BinaryString.fromDataUri = function(dataURI) {
	    var base64encoding, splitDataURI;
	    splitDataURI = dataURI.split(',');
	    base64encoding = splitDataURI[1];
	    return this.fromBase64(base64encoding);
	  };

	  BinaryString.prototype.toString = function() {
	    return Utf8.toString(this.bytes);
	  };

	  BinaryString.prototype.toArrayBuffer = function() {
	    return this.bytes.buffer;
	  };

	  BinaryString.prototype.toBlob = function() {
	    return new Blob([this.bytes]);
	  };

	  BinaryString.prototype.eq = function(b) {
	    return this.compare(b) === 0;
	  };

	  BinaryString.prototype.compare = function(b) {
	    var bytesA, bytesB, diff, i, j, ref;
	    bytesA = this.bytes;
	    bytesB = b.bytes;
	    for (i = j = 0, ref = min(this.length, b.length); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      if (0 !== (diff = bytesA[i] - bytesB[i])) {
	        return diff;
	      }
	    }
	    return this.length - b.length;
	  };

	  BinaryString.prototype.inspect = function() {
	    return this.getInspectedString();
	  };

	  BinaryString.getter({
	    uint8Array: function() {
	      return this.bytes;
	    },
	    arrayBuffer: function() {
	      return this.bytes.buffer;
	    },
	    blob: function() {
	      return new Blob([this.bytes]);
	    },
	    plainArray: function() {
	      var b, j, len1, ref, results;
	      ref = this.bytes;
	      results = [];
	      for (j = 0, len1 = ref.length; j < len1; j++) {
	        b = ref[j];
	        results.push(b);
	      }
	      return results;
	    },
	    byteLength: function() {
	      return this.length;
	    },
	    inspectedString: function(stride, maxBytes) {
	      var characters, count, line, offset;
	      if (stride == null) {
	        stride = 8;
	      }
	      if (maxBytes == null) {
	        maxBytes = 64;
	      }
	      count = 0;
	      characters = [];
	      if (this.length < maxBytes) {
	        maxBytes = this.length;
	      }
	      line = new Array(stride);
	      return compactFlatten([
	        "BinaryString length: " + this.length + " bytes", maxBytes < this.length ? "First " + maxBytes + " bytes:" : void 0, (function() {
	          var j, ref, ref1, results;
	          results = [];
	          for (offset = j = 0, ref = maxBytes, ref1 = stride; ref1 > 0 ? j < ref : j > ref; offset = j += ref1) {
	            results.push(this._inspectLine(offset, stride, maxBytes));
	          }
	          return results;
	        }).call(this)
	      ]).join('\n');
	    }
	  });

	  BinaryString.prototype._inspectLine = function(offset, length, maxBytes) {
	    var b, characters, end, hexCharacters, i, y;
	    end = min(this.length, offset + length);
	    if (maxBytes >= 0) {
	      end = min(end, maxBytes);
	    }
	    characters = (function() {
	      var j, ref, ref1, results;
	      results = [];
	      for (i = j = ref = offset, ref1 = end; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
	        b = this.bytes[i];
	        if (b >= 31 && b <= 127) {
	          results.push(String.fromCharCode(b));
	        } else {
	          results.push('•');
	        }
	      }
	      return results;
	    }).call(this);
	    hexCharacters = (function() {
	      var j, ref, ref1, results;
	      results = [];
	      for (i = j = ref = offset, ref1 = end; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
	        b = this.bytes[i];
	        y = b.toString(16);
	        if (y.length < 2) {
	          y = "0" + y;
	        }
	        results.push(y);
	      }
	      return results;
	    }).call(this);
	    return (pad(hexCharacters.join(' '), length * 3)) + " '" + (characters.join('')) + "'";
	  };


	  /*
	  toBase64 performance
	  see: http://localhost:8080/webpack-dev-server/perf?grep=BinaryString
	  as-of 2016-02-14, the manual string manipulation version is surprisingly the best on average for FF, Chrome and Safari
	    For shorter lengths, toBase64Custom is by far the fastest, but
	    toBase64ToDataUri starts to be faster at longer lengths.
	   */

	  BinaryString.prototype.toBase64 = function() {
	    if (this.length > 16 * 1024) {
	      return this.toBase64ToDataUri();
	    } else {
	      return this.toBase64Custom();
	    }
	  };

	  BinaryString.prototype.toBase64ToDataUri = function() {
	    return this.toDataUri().then(function(dataUri) {
	      return dataUri.split(',')[1];
	    });
	  };

	  BinaryString.prototype.toBase64Custom = function() {
	    var a, b, base64, byteLength, byteRemainder, bytes, c, chunk, d, i, j, mainLength, ref;
	    bytes = this.bytes;
	    base64 = '';
	    byteLength = bytes.byteLength;
	    byteRemainder = byteLength % 3;
	    mainLength = byteLength - byteRemainder;
	    for (i = j = 0, ref = mainLength - 1; j <= ref; i = j += 3) {
	      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
	      a = (chunk & 16515072) >> 18;
	      b = (chunk & 258048) >> 12;
	      c = (chunk & 4032) >> 6;
	      d = chunk & 63;
	      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
	    }
	    return Promise.resolve((function() {
	      switch (byteRemainder) {
	        case 0:
	          return base64;
	        case 1:
	          chunk = bytes[mainLength];
	          a = (chunk & 252) >> 2;
	          b = (chunk & 3) << 4;
	          return base64 + encodings[a] + encodings[b] + '==';
	        case 2:
	          chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
	          a = (chunk & 64512) >> 10;
	          b = (chunk & 1008) >> 4;
	          c = (chunk & 15) << 2;
	          return base64 + encodings[a] + encodings[b] + encodings[c] + '=';
	      }
	    })());
	  };

	  return BinaryString;

	})(BaseObject);


/***/ },
/* 71 */
/***/ function(module, exports) {

	var Utf8;

	module.exports = Utf8 = (function() {
	  function Utf8() {}

	  Utf8.toBuffer = function(string) {
	    return new Uint8Array(this.toArray(string));
	  };

	  Utf8.toArray = function(string) {
	    var char, i, out, uriEncoded;
	    uriEncoded = encodeURIComponent(string);
	    i = 0;
	    out = (function() {
	      var results;
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
	    })();
	    return out;
	  };

	  Utf8.toString = function(a) {
	    var error, x, y;
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
	          y = "%" + y;
	          results.push(y);
	        }
	        return results;
	      })()).join(''));
	    } catch (error1) {
	      error = error1;
	      console.warn(error.toString(), error);
	      return "<" + a.length + " binary bytes>";
	    }
	  };

	  return Utf8;

	})();


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(73).includeInNamespace(__webpack_require__(74)).addModules({
	  BaseObject: __webpack_require__(75),
	  WebpackHotLoader: __webpack_require__(76)
	});


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var ClassSystem, Foundation,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(21);

	module.exports = Foundation.ClassSystem || Foundation.addNamespace('ClassSystem', ClassSystem = (function(superClass) {
	  extend(ClassSystem, superClass);

	  function ClassSystem() {
	    return ClassSystem.__super__.constructor.apply(this, arguments);
	  }

	  return ClassSystem;

	})(Neptune.Base));


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [[__webpack_require__(75), "mixInto createAllClass createWithPostCreate createHotWithPostCreate"]];


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Log, MinimalBaseObject, StandardLib, Unique, WebpackHotLoader, callStack, capitalize, clone, concatInto, decapitalize, extendClone, functionName, getModuleBeingDefined, inspectedObjectLiteral, isFunction, isPlainArray, isPlainObject, isString, log, mergeInto, nextUniqueObjectId, objectName,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  slice = [].slice,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	StandardLib = __webpack_require__(24);

	WebpackHotLoader = __webpack_require__(76);

	capitalize = StandardLib.capitalize, decapitalize = StandardLib.decapitalize, log = StandardLib.log, extendClone = StandardLib.extendClone, clone = StandardLib.clone, isFunction = StandardLib.isFunction, objectName = StandardLib.objectName, isPlainObject = StandardLib.isPlainObject, functionName = StandardLib.functionName, isString = StandardLib.isString, isPlainArray = StandardLib.isPlainArray, Unique = StandardLib.Unique, callStack = StandardLib.callStack, Log = StandardLib.Log, inspectedObjectLiteral = StandardLib.inspectedObjectLiteral, MinimalBaseObject = StandardLib.MinimalBaseObject, getModuleBeingDefined = StandardLib.getModuleBeingDefined, concatInto = StandardLib.concatInto, mergeInto = StandardLib.mergeInto, isString = StandardLib.isString;

	nextUniqueObjectId = Unique.nextUniqueObjectId;

	module.exports = BaseObject = (function(superClass) {
	  var arrayPropertyExtender, createWithPostCreate, excludedKeys, getOwnProperty, imprintObject, mixInto, objectPropertyExtender, warnedAboutIncludeOnce;

	  extend(BaseObject, superClass);

	  BaseObject.objectsCreated = 0;

	  BaseObject.objectsCreatedByType = {};

	  BaseObject.resetStats = function() {
	    BaseObject.objectsCreated = 0;
	    return BaseObject.objectsCreatedByType = {};
	  };

	  BaseObject._name = null;


	  /*
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
	   */

	  BaseObject.imprintObject = imprintObject = function(toObject, fromObject, preserveState) {
	    var fromValue, k, v;
	    if (preserveState == null) {
	      preserveState = false;
	    }
	    if (!preserveState) {
	      for (k in toObject) {
	        v = toObject[k];
	        if (!fromObject.hasOwnProperty(k)) {
	          delete toObject[k];
	        }
	      }
	    }
	    for (k in fromObject) {
	      fromValue = fromObject[k];
	      if (fromObject.hasOwnProperty(k)) {
	        if (!preserveState || isFunction(fromValue) || isFunction(toObject[k]) || !k.match(/^_/) || !toObject.hasOwnProperty(k)) {
	          toObject[k] = fromValue;
	        }
	      }
	    }
	    return fromObject;
	  };


	  /*
	  imprints both the class and its prototype.
	  
	  preserved in spite of imprintObject's rules:
	    @namespace
	    @::constructor
	   */

	  BaseObject.imprintFromClass = function(updatedKlass) {
	    var _name, namespace, namespacePath, oldConstructor, ref;
	    if (updatedKlass !== this) {
	      ref = this, namespace = ref.namespace, namespacePath = ref.namespacePath, _name = ref._name;
	      oldConstructor = this.prototype.constructor;
	      imprintObject(this, updatedKlass, true);
	      imprintObject(this.prototype, updatedKlass.prototype, false);
	      this.prototype.constructor = oldConstructor;
	      this.namespace = namespace;
	      this.namespacePath = namespacePath;
	      this._name = _name;
	    }
	    return this;
	  };


	  /*
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
	  
	       * always:
	      liveClass.postCreate hotReloaded, classModuleState, _module
	   */

	  BaseObject.createWithPostCreate = createWithPostCreate = function(a, b) {
	    var _module, klass;
	    klass = b ? (_module = a, b) : a;
	    _module || (_module = getModuleBeingDefined());
	    if (!(klass != null ? klass.postCreate : void 0)) {
	      return klass;
	    }
	    if (!(_module != null ? _module.hot : void 0)) {
	      return klass.postCreate({
	        hotReloadEnabled: false,
	        hotReloaded: false,
	        classModuleState: {},
	        module: _module
	      }) || klass;
	    }
	    return WebpackHotLoader.runHot(_module, function(moduleState) {
	      var classModuleState, hotReloaded, liveClass;
	      if (classModuleState = moduleState[klass.getName()]) {
	        liveClass = classModuleState.liveClass;
	        hotReloaded = true;
	        classModuleState.hotReloadVersion++;
	        classModuleState.hotUpdatedFromClass = klass;
	        liveClass.namespace._setChildNamespaceProps(liveClass.getName(), klass);
	        klass._name = liveClass._name;
	        liveClass.imprintFromClass(klass);
	        Log.log({
	          "Foundation.BaseObject: class hot-reload": {
	            "class": liveClass.getNamespacePath(),
	            version: classModuleState.hotReloadVersion
	          }
	        });
	      } else {
	        hotReloaded = false;
	        klass._hotClassModuleState = moduleState[klass.getName()] = classModuleState = {
	          liveClass: liveClass = klass,
	          hotUpdatedFromClass: null,
	          hotReloadVersion: 0
	        };
	      }
	      return liveClass.postCreate({
	        hotReloadEnabled: true,
	        hotReloaded: hotReloaded,
	        classModuleState: classModuleState,
	        module: _module
	      });
	    });
	  };

	  BaseObject.createHotWithPostCreate = function(a, b) {
	    log.error("createHotWithPostCreate is DEPRICATED");
	    return createWithPostCreate(a, b);
	  };


	  /*
	  called every load
	  IN: options:
	    NOTE: hot-loading inputs are only set if this class created as follows:
	      createHotWithPostCreate module, class Foo extends BaseObject
	  
	    hotReload: true/false
	      true if this class was hot-reloaded
	  
	    hotReloadEnabled: true/false
	  
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
	  
	    module: the CommonJs module object.
	  
	  {hotReloadEnabled, hotReloaded, classModuleState, module} = options
	   */

	  BaseObject.postCreate = function(options) {
	    if (this.getIsAbstractClass()) {
	      return this.postCreateAbstractClass(options);
	    } else {
	      return this.postCreateConcreteClass(options);
	    }
	  };

	  BaseObject.postCreateAbstractClass = function(options) {
	    return this;
	  };

	  BaseObject.postCreateConcreteClass = function(options) {
	    return this;
	  };

	  excludedKeys = ["__super__", "namespace", "namespacePath"].concat(Object.keys(Neptune.Base));

	  BaseObject.mixInto = mixInto = function() {
	    var i, intoClass, k, keys, klass, len, v;
	    intoClass = arguments[0], klass = arguments[1], keys = 3 <= arguments.length ? slice.call(arguments, 2) : [];
	    log.error("DEPRICATED: mixInto");
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
	        log.error("Foundation.mixInto - mix " + (getClassName(klass)) + " into " + (getClassName(intoClass)) + ": " + k + " already exists.");
	      }
	      intoClass[k] = v;
	    }
	    return intoClass;
	  };

	  BaseObject.createAllClass = function() {
	    var All, arg, args, i, len, namespace;
	    namespace = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    log.error("DEPRICATED: createAllClass. Use Neptune-Namespace feature: create file in directory that is the same name as the directory.");
	    for (i = 0, len = args.length; i < len; i++) {
	      arg = args[i];
	      if (arg.prototype instanceof BaseObject) {
	        log.error("createAllClass arguments cannot be subclasses of BaseObject: " + (getClassName(namespace)) + ":" + (getClassName(arg)));
	      }
	      mixInto(namespace, arg);
	    }
	    return All = (function(superClass1) {
	      extend(All, superClass1);

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
	  
	  DEPRICATED!!!
	  Time to do it "right" - and it's just a simple pattern:
	    Justin Fagnani figured this out. Thanks!
	    Read More:
	      http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
	  
	  To define a mixin:
	  
	    MyMixin = (superClass) ->
	      class MyMixin extends superClass
	        ... write your mixin as-if it were part of the normal inheritance hierachy
	  
	  To use a mixin:
	  
	    class MyClass extends MyMixin MySuperClass
	  
	  To use two mixins:
	  
	    class MyClass extends MyMixin1 MyMixin2 MySuperClass
	   */

	  warnedAboutIncludeOnce = false;

	  BaseObject.include = function(obj) {
	    var key, ref, value;
	    log.error("DEPRICATED: BaseObject.include. Use pattern.");
	    if (!warnedAboutIncludeOnce) {
	      warnedAboutIncludeOnce = true;
	      console.warn("Mixin pattern:\n\n  To define a mixin:\n\n    MyMixin = (superClass) ->\n      class MyMixin extends superClass\n        ... write your mixin as-if it were part of the normal inheritance hierachy\n\n  To use a mixin:\n\n    class MyClass extends MyMixin MySuperClass\n\n  To use two mixins:\n\n    class MyClass extends MyMixin1 MyMixin2 MySuperClass");
	    }
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


	  /*
	  Allows you to define properties on the prototype that inherit their data from
	  their super-classes prototype.
	  
	  By default, uses extendClone to init. extendClone has these semantics:
	    Object properties actually create a parallel inheritance structure such that
	      later-changes on the super-object are reflected in the inheriting object.
	      They ARE updated with later parent-changes
	    Array properties inherit the values in the super-class array at declaration time,
	      They ARE NOT updated with any later parent-changes!
	      If we ever need that functionality, we'll need to make a special Object-type
	      that extendClone recognizes that handles the logic of "ExtendableArray".
	   */

	  BaseObject.getPrototypePropertyExtendedByInheritance = function(propertyName, defaultStructure, _clone) {
	    if (_clone == null) {
	      _clone = extendClone;
	    }
	    log.error("DEPRICATED: getPrototypePropertyExtendedByInheritance. use extendableProperty");
	    return getOwnProperty(this.prototype, propertyName, function(object) {
	      return _clone(object[propertyName] || defaultStructure);
	    });
	  };


	  /*
	  IN
	    object: any object
	    property: string, property name
	    init:
	      (object) -> returning initial value for object
	      OR
	        initial value is computed by:
	        clone object[property] || init
	  
	  EFFECT:
	    if object.hasOwnProperty property, return its current value
	    otherwise, initialize and return it with init()
	   */

	  BaseObject.getOwnProperty = getOwnProperty = function(object, property, init) {
	    if (object.hasOwnProperty(property)) {
	      return object[property];
	    } else {
	      return object[property] = isFunction(init) ? init(object) : clone(object[property] || init);
	    }
	  };


	  /*
	  objectPropertyExtender
	  
	  IN: @ is set to the property-value to extend
	  
	  API 1:
	    IN: map
	    EFFECT: mergeInto propValue, map
	  
	  API 2:
	    IN: key, value
	    EFFECT: propValue[key] = valuee
	  
	  OUT: ignore
	   */

	  BaseObject.objectPropertyExtender = objectPropertyExtender = function(mapOrKey, value) {
	    if (isString(mapOrKey)) {
	      return this[mapOrKey] = value;
	    } else if (isPlainObject(mapOrKey)) {
	      return mergeInto(this, mapOrKey);
	    } else {
	      throw new Error("first value argument must be a plain object or string");
	    }
	  };


	  /*
	  arrayPropertyExtender
	  
	  IN: @ is set to the property-value to extend
	  
	  API 1:
	    IN: array
	    EFFECT: concatInto propValue, array
	  
	  API 2:
	    IN: value
	    EFFECT: propValue.push value
	  
	  NOTE: if you want to concat an array-as-a-value to the end of propValue, do this:
	    arrayPropertyExtender.call propValue, [arrayAsValue]
	  
	  OUT: ignore
	   */

	  BaseObject.arrayPropertyExtender = arrayPropertyExtender = function(arrayOrValue) {
	    if (isPlainArray(arrayOrValue)) {
	      return concatInto(this, arrayOrValue);
	    } else {
	      return this.push(arrayOrValue);
	    }
	  };


	  /*
	  Extendable Properties
	  
	  EXAMPLE:
	    class Foo extends BaseObject
	      @extendableProperty foo: {}
	  
	  Extendable properties work like inheritance:
	  
	    When any subclass or instance extends an extendable property, they
	    inherit a clone of the property from up the inheritance tree, and then
	    add their own extensions without effecting the parent copy.
	  
	    With Object property types, this can just be a parallel prototype chain.
	    (It isn't currently: if you modify a parent after extending it to a child,
	    the child won't get updates.)
	  
	    BUT, you can also have array or other types of extend-properties, which
	    JavaScript doesn't have any built-in mechanisms for inheriting.
	  
	  BASIC API:
	  @extendableProperty: (map, propertyExtender = defaultPropertyExtender) -> ...
	  
	  IN: map
	  IN: propertyExtender = (args...) ->
	    IN: @ is propValue
	    IN: 1 or more args
	    EFFECT: modifies propValue (passed as @), extending it, based on args...
	  
	  EFFECT: for each {foo: defaultValue} in map, extendableProperty:
	    defines standard getters:
	      @class.getFoo()
	      @prototype.getFoo()
	      @prototype.foo # getter
	      WARNING:
	        !!! Don't modify the object returned by a getter !!!
	  
	        Getters only return the current, most-extended property value. It may not be extended to the
	        current subclass or instance! Instead, call @extendFoo() if you wish to manually modify
	        the extended property.
	  
	    defines extender functions:
	      @class.extendFoo value      # extends the property on the PROTOTYPE object
	      @prototype.extendFoo value  # extends the property on the INSTANCE object (which inherits from the prototype)
	  
	      EFFECT: extends the property if not already extended
	      OUT: extendedPropValue
	  
	      API 1: IN: 0 args
	      API 2: IN: 1 or more args
	        ADDITIONAL EFFECT: calls: propExtender extendedPropValue, args...
	  
	    NOTE: gthe prototype getters call the class getter for extension purposes.
	      The result is each instance won't get its own version of the property.
	      E.G. Interitance is done at the Class level, not the Instance level.
	   */

	  BaseObject.extendableProperty = function(map, propertyExtender) {
	    var defaultValue, prop, results;
	    results = [];
	    for (prop in map) {
	      defaultValue = map[prop];
	      if (!(isPlainArray(defaultValue) || isPlainObject(defaultValue))) {
	        throw new Error("only plain objects or plain arrays supported for defaultValue");
	      }
	      results.push((function(_this) {
	        return function(prop, defaultValue) {
	          var extenderName, getterName, internalName, propExtender, ucProp;
	          propExtender = propertyExtender || (function() {
	            if (isPlainObject(defaultValue)) {
	              return objectPropertyExtender;
	            } else if (isPlainArray(defaultValue)) {
	              return arrayPropertyExtender;
	            } else {
	              throw new Error("Unsupported property type for extendableProperty: " + (inspect(defaultValue)) + ". Please specify a custom propertyExtender function.");
	            }
	          })();
	          internalName = _this.propInternalName(prop);
	          ucProp = capitalize(prop);
	          getterName = "get" + ucProp;
	          extenderName = "extend" + ucProp;
	          _this[getterName] = function() {
	            return this.prototype[internalName] || defaultValue;
	          };
	          _this.addGetter(prop, function() {
	            return this[internalName] || defaultValue;
	          });
	          _this[extenderName] = function(value) {
	            var propValue;
	            propValue = getOwnProperty(this.prototype, internalName, defaultValue);
	            if (arguments.length > 0) {
	              propExtender.apply(propValue, arguments);
	            }
	            return propValue;
	          };
	          return _this.prototype[extenderName] = function(value) {
	            var propValue;
	            propValue = getOwnProperty(this, internalName, defaultValue);
	            if (arguments.length > 0) {
	              propExtender.apply(propValue, arguments);
	            }
	            return propValue;
	          };
	        };
	      })(this)(prop, defaultValue));
	    }
	    return results;
	  };

	  BaseObject.getNamespacePath = function() {
	    var ref;
	    if (!this.namespacePath) {
	      return this.namespacePath = (this.getName()) + " extends " + (this.__super__["class"].getNamespacePath());
	    } else if (((ref = this.__super__) != null ? ref["class"].namespacePath : void 0) === this.namespacePath) {
	      return this.namespacePath = (this.getName()) + " extends " + (this.__super__["class"].getNamespacePath());
	    } else {
	      return this.namespacePath;
	    }
	  };

	  BaseObject.getClassName = function(klass) {
	    if (klass == null) {
	      klass = this;
	    }
	    return (typeof klass.getName === "function" ? klass.getName() : void 0) || klass.name;
	  };


	  /*
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
	         * ...
	         * custom code which writes all output to inspector.put
	         * and uses inspector.inspect for inspecting sub-objects
	         * ...
	        null
	  
	    EFFECT:
	      call inspector.put one or multiple times with strings to add to the inspected output
	      call inspector.inspect foo to sub-inspect other objects WITH RECURSION BLOCK
	  
	   * Example 1:
	  inspect: (inspector) ->
	    return Foundation.inspect @ unless inspector
	    inspector.put @getNamespacePath()
	  
	   * Example 2:
	  inspect: ->
	    @getNamespacePath()
	   */

	  BaseObject.inspect = function() {
	    return this.getNamespacePath();
	  };

	  BaseObject.prototype.inspect = function() {
	    return "<" + this["class"].namespacePath + ">";
	  };


	  /*
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
	   */

	  BaseObject.getter({
	    inspectObjects: function() {
	      console.warn("inspectObjects/getInspectObjects is DEPRICATED. Use: inspectedObjects/getInspectedObjects");
	      return this.getInspectedObjects();
	    },
	    inspectedObjects: function() {
	      return inspectedObjectLiteral("<" + (this["class"].getNamespacePath()) + ">");
	    }
	  });

	  BaseObject.classGetter({
	    inspectedObjects: function() {
	      return inspectedObjectLiteral(this.getNamespacePath());
	    }
	  });


	  /*
	  Define this class as an abstract class. Implicitly it means
	  any class it extends is also abstract, at least in this context.
	  
	  Definition: Abstract classes are not intended to every be instantiated.
	    i.e.: never do: new MyAbstractClass
	  
	  TODO: in Debug mode, in the constructor:
	    throw new Error "cannot instantiate abstract classes" if @class.getIsAbstractClass()
	   */

	  BaseObject.abstractClass = function() {
	    if (this.getIsSingletonClass()) {
	      throw new Error("abstract classes cannot also be singleton");
	    }
	    return this._firstAbstractAncestor = this;
	  };

	  BaseObject.classGetter({
	    isAbstractClass: function() {
	      return !(this.prototype instanceof this._firstAbstractAncestor);
	    },
	    abstractPrototype: function() {
	      return this._firstAbstractAncestor.prototype;
	    },
	    firstAbstractAncestor: function() {
	      return this._firstAbstractAncestor;
	    },
	    isSingletonClass: function() {
	      return !!this.getSingleton;
	    }
	  });

	  BaseObject.getAbstractClass = function() {
	    return this._firstAbstractAncestor;
	  };

	  BaseObject.abstractClass();

	  BaseObject.propertyIsAbstract = function(methodName) {
	    return this.getAbstractClass().prototype[methodName] === this.prototype[methodName];
	  };

	  BaseObject.propertyIsConcrete = function(methodName) {
	    return this.getAbstractClass().prototype[methodName] !== this.prototype[methodName];
	  };


	  /*
	  creates the classGetter "singleton" which returns a single instance of the current class.
	  
	  IN: args are passed to the singleton constructor
	  OUT: null
	  
	  The singleton instance is created on demand the first time it is accessed.
	   */

	  BaseObject.singletonClass = function() {
	    var args, map;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    if (this.getIsAbstractClass()) {
	      throw new Error("singleton classes cannot be abstract");
	    }
	    map = {
	      singleton: function() {
	        var ref;
	        if (((ref = this._singleton) != null ? ref["class"] : void 0) === this) {
	          return this._singleton;
	        } else {
	          return this._singleton = (function(func, args, ctor) {
	            ctor.prototype = func.prototype;
	            var child = new ctor, result = func.apply(child, args);
	            return Object(result) === result ? result : child;
	          })(this, args, function(){});
	        }
	      }
	    };
	    map[decapitalize(functionName(this))] = function() {
	      return this.getSingleton();
	    };
	    this.classGetter(map);
	    return null;
	  };

	  BaseObject.getter({
	    className: function() {
	      return this["class"].getClassName();
	    },
	    "class": function() {
	      return this.constructor;
	    },
	    keys: function() {
	      return Object.keys(this);
	    },
	    namespacePath: function() {
	      return this["class"].getNamespacePath();
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
	    Log.logCore(toLog, stack, {
	      className: this.className
	    });
	    return arguments[arguments.length - 1];
	  };

	  BaseObject.prototype.log = BaseObject.log;

	  BaseObject.prototype.rawLog = BaseObject.rawLog;

	  return BaseObject;

	})(MinimalBaseObject);


/***/ },
/* 76 */
/***/ function(module, exports) {

	var WebpackHotLoader;

	module.exports = WebpackHotLoader = (function() {
	  function WebpackHotLoader() {}


	  /*
	  IN:
	    _module should be the CommonJS 'module'
	    modulePostLoadAction: (moduleState) -> ignored internally, returned from @runHot
	  
	  OUT: modulePostLoadAction moduleState
	  
	  EFFECT:
	    modulePostLoadAction is run every time the module is loaded.
	  
	    Initially, moduleState is {}.
	  
	    moduleState is the same object every load:
	      modulePostLoadAction can modify moduleState and it will persist through every reload.
	  
	    modulePostLoadAction is responsible for any and all
	    update actions required due to the module load.
	  
	  NOTE:
	    If _module is not hot, modulePostLoadAction will be invoked once with an empty {}.
	   */

	  WebpackHotLoader.runHot = function(_module, modulePostLoadAction) {
	    var base, moduleState;
	    if (!(_module != null ? _module.hot : void 0)) {
	      return modulePostLoadAction({});
	    }
	    moduleState = (((base = _module.hot).data || (base.data = {
	      moduleState: {}
	    }))).moduleState;
	    _module.hot.accept();
	    _module.hot.dispose(function(data) {
	      return data.moduleState = moduleState;
	    });
	    return modulePostLoadAction(moduleState);
	  };

	  return WebpackHotLoader;

	})();


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Binary, ClassSystem, Stream, binary,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	ClassSystem = __webpack_require__(72);

	Binary = __webpack_require__(66);

	BaseObject = ClassSystem.BaseObject;

	binary = __webpack_require__(70).binary;

	module.exports = Stream = (function(superClass) {
	  extend(Stream, superClass);

	  Stream.stream = function(arg) {
	    if (arg instanceof Stream) {
	      return arg;
	    } else if (arg instanceof ArrayBuffer) {
	      return Stream.fromArrayBuffer(arg);
	    } else if (arg instanceof Uint8Array) {
	      return new Stream(arg);
	    } else {
	      return new Stream(binary(arg).bytes);
	    }
	  };

	  Stream.fromArrayBuffer = function(arrayBuffer) {
	    return new Stream(new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength));
	  };

	  function Stream(byteView) {
	    this.byteView = byteView;
	    this.pos = 0;
	  }

	  Stream.prototype.readByte = function() {
	    return this.byteView[this.pos++];
	  };

	  Stream.prototype.readAsi = function() {
	    var ret, shift, val;
	    ret = 0;
	    shift = 0;
	    val = 128;
	    while (val >= 128) {
	      val = this.readByte();
	      ret += (val % 128) << shift;
	      shift += 7;
	    }
	    return ret;
	  };

	  Stream.prototype.uint8Array = function() {
	    return this.byteView;
	  };

	  Stream.prototype.read = function(length) {
	    var begin, end;
	    begin = this.pos;
	    this.pos += length;
	    end = this.pos;
	    return new Stream(this.byteView.subarray(begin, end));
	  };

	  Stream.prototype.inspect = function() {
	    return "{Stream pos=" + this.pos + " byteOffset=" + this.byteView.byteOffset + " length=" + this.byteView.length + "}";
	  };

	  Stream.prototype.readAsiString = function() {
	    return this.read(this.readAsi());
	  };

	  Stream.prototype.done = function() {
	    return this.pos >= this.byteView.length;
	  };

	  Stream.getter({
	    isDone: function() {
	      return this.pos >= this.byteView.length;
	    },
	    binaryString: function() {
	      return binary(this.byteView);
	    },
	    inspectedString: function() {
	      return this.binaryString.inspectedString;
	    }
	  });

	  Stream.prototype.toString = function() {
	    return this.binaryString.toString();
	  };

	  return Stream;

	})(BaseObject);


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var DataUri, Promise, StandardLib, binary, isString, readAsDataURL;

	StandardLib = __webpack_require__(24);

	binary = __webpack_require__(70).binary;

	readAsDataURL = __webpack_require__(69).readAsDataURL;

	Promise = StandardLib.Promise, isString = StandardLib.isString;

	module.exports = DataUri = (function() {
	  var isDataUri;

	  function DataUri() {}

	  DataUri.isDataUri = isDataUri = function(dataString) {
	    return isString(dataString) && dataString.slice(0, 5) === "data:";
	  };


	  /*
	  IN: data can be any of
	    File: HTML File object is read as ArrayBuffer
	    DataURI string: if it is already a data-uri string it is just returned as a successful promise
	    any type 'binary' accepts
	  
	  OUT:
	    promise.then (dataUri) ->
	    , (errorEventOrErrorObject) ->
	   */

	  DataUri.toDataUri = function(data) {
	    if (!data) {
	      throw new Error("data not set");
	    }
	    if (data instanceof self.File) {
	      return readAsDataURL(data);
	    }
	    if (isDataUri(data)) {
	      return Promise.resolve(data);
	    }
	    return binary(data).toBase64().then(function(base64) {
	      return "data:image/png;base64," + base64;
	    });
	  };

	  return DataUri;

	})();


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var EncodedImage, Promise, StandardLib, readFileAsDataUrl, toDataUri;

	StandardLib = __webpack_require__(24);

	toDataUri = __webpack_require__(78).toDataUri;

	Promise = StandardLib.Promise, readFileAsDataUrl = StandardLib.readFileAsDataUrl;

	module.exports = EncodedImage = (function() {
	  var get;

	  function EncodedImage() {}


	  /*
	  OUT:
	    promise.then (fullyLoadedHtmlImage) ->
	    , (htmlImageOnerrorEvent) ->
	   */

	  EncodedImage.get = get = function(url, options) {
	    return Promise.resolve().then(function() {
	      if (options) {
	        return Neptune.Art.Foundation.RestClient.getArrayBuffer(url, options).then(function(arrayBuffer) {
	          return readFileAsDataUrl(new Blob([arrayBuffer]));
	        }).then((function(_this) {
	          return function(dataUri) {
	            return url = dataUri;
	          };
	        })(this));
	      }
	    }).then(function() {
	      return new Promise(function(resolve, reject) {
	        var image;
	        image = new Image;
	        if (!url.match(/^(file|data)\:/i)) {
	          image.crossOrigin = "Anonymous";
	        }

	        /*
	        crossOrigin = "Anonymous" required to getImageData and avoid this error
	          "The canvas has been tainted by cross-origin data."
	        
	        NOTE:
	          file: urls break with crossOrigin in WkWebKit
	          data: urls break with crossOrigin in Safari
	         */
	        image.onload = function() {
	          return resolve(image);
	        };
	        image.onerror = reject;
	        return image.src = url;
	      });
	    });
	  };

	  EncodedImage.loadImage = function(url) {
	    console.warn(this.namespacePath + "#loadImage DEPRICATED. Use #get");
	    return get(url);
	  };

	  EncodedImage.toImage = function(encodedImageData) {
	    return toDataUri(encodedImageData).then((function(_this) {
	      return function(dataUri) {
	        return get(dataUri);
	      };
	    })(this));
	  };

	  return EncodedImage;

	})();


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, ClassSystem, Promise, StandardLib, WriteStream, binary, bound, bufferSize, log, readFileAsArrayBuffer,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	StandardLib = __webpack_require__(24);

	ClassSystem = __webpack_require__(72);

	binary = __webpack_require__(70).binary;

	Promise = StandardLib.Promise, readFileAsArrayBuffer = StandardLib.readFileAsArrayBuffer, bound = StandardLib.bound;

	BaseObject = ClassSystem.BaseObject, log = ClassSystem.log;

	bufferSize = 1024;

	module.exports = WriteStream = (function(superClass) {
	  extend(WriteStream, superClass);

	  function WriteStream() {
	    this._written = [];
	    this._writeBuffer = new Uint8Array(bufferSize);
	    this._pos = 0;
	    this._writtenLength = 0;
	  }

	  WriteStream.prototype.writeByte = function(byte) {
	    if (this._pos === bufferSize) {
	      this._commitHead();
	    }
	    return this._writeBuffer[this._pos++] = byte;
	  };

	  WriteStream.prototype.writeAsi = function(number) {
	    var nextByte, results;
	    if (!(number >= 0)) {
	      throw new Error("expected number >= 0");
	    }
	    results = [];
	    while (true) {
	      nextByte = number & 0x7F;
	      number >>= 7;
	      if (number > 0) {
	        results.push(this.writeByte(nextByte | 0x80));
	      } else {
	        this.writeByte(nextByte);
	        break;
	      }
	    }
	    return results;
	  };

	  WriteStream.prototype.write = function(string) {
	    var binaryString;
	    binaryString = binary(string);
	    if (this._pos + binaryString.length <= bufferSize) {
	      this._writeBuffer.set(binaryString.uint8Array, this._pos);
	      return this._pos += binaryString.length;
	    } else {
	      this._commitHead();
	      this._writtenLength += binaryString.length;
	      return this._written.push(binaryString.uint8Array);
	    }
	  };

	  WriteStream.prototype.writeAsiString = function(string) {
	    var binaryString;
	    binaryString = binary(string);
	    this.writeAsi(binaryString.length);
	    return this.write(binaryString);
	  };

	  WriteStream.getter({
	    arrayBufferPromise: function() {
	      return this._compact().then(function(uint8Array) {
	        return uint8Array.buffer;
	      });
	    },
	    binaryStringPromise: function() {
	      return this.arrayBufferPromise.then(function(ab) {
	        return binary(ab);
	      });
	    },
	    length: function() {
	      return this._pos + this._writtenLength;
	    }
	  });


	  /*
	  Using new Blob is much faster, thus we use Promises since it is async
	    http://jsperf.com/appending-arraybuffers
	  
	  OUT: promise.then (compactedUint8Array) ->
	  EFFECT:
	    head was committed
	    if @_written.length <= 1 then it isn't changed
	    else @_written = [compactedUint8Array]
	   */

	  WriteStream.prototype._compact = function() {
	    this._commitHead();
	    switch (this._written.length) {
	      case 0:
	        return new Promise(function(resolve) {
	          return resolve(new Uint8Array(0));
	        });
	      case 1:
	        return new Promise((function(_this) {
	          return function(resolve) {
	            return resolve(_this._written[0]);
	          };
	        })(this));
	      default:
	        return readFileAsArrayBuffer(new Blob(this._written)).then((function(_this) {
	          return function(ab) {
	            _this._written = [new Uint8Array(ab)];
	            return _this._written[0];
	          };
	        })(this));
	    }
	  };

	  WriteStream.prototype._commitHead = function() {
	    if (!(this._pos > 0)) {
	      return;
	    }
	    this._writtenLength += this._pos;
	    this._written.push(this._writeBuffer.slice(0, this._pos));
	    return this._pos = 0;
	  };

	  return WriteStream;

	})(BaseObject);


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(82).includeInNamespace(__webpack_require__(83)).addModules({
	  Analytics: __webpack_require__(87),
	  AsyncLocalStorage: __webpack_require__(88),
	  BatchLoader: __webpack_require__(91),
	  CommunicationStatus: __webpack_require__(92),
	  Epoch: __webpack_require__(93),
	  GlobalCounts: __webpack_require__(86),
	  InstanceFunctionBindingMixin: __webpack_require__(94),
	  JsonStore: __webpack_require__(95),
	  ObjectTreeFactory: __webpack_require__(4),
	  ProgressAdapter: __webpack_require__(84),
	  RestClient: __webpack_require__(96),
	  SingleObjectTransaction: __webpack_require__(97),
	  Stat: __webpack_require__(98),
	  Transaction: __webpack_require__(99),
	  Validator: __webpack_require__(100),
	  WebWorker: __webpack_require__(85),
	  WorkerRpc: __webpack_require__(90)
	});


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation, Tools,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(21);

	module.exports = Foundation.Tools || Foundation.addNamespace('Tools', Tools = (function(superClass) {
	  extend(Tools, superClass);

	  function Tools() {
	    return Tools.__super__.constructor.apply(this, arguments);
	  }

	  return Tools;

	})(Neptune.Base));


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [[__webpack_require__(84), "executePromiseSequence"], __webpack_require__(85), __webpack_require__(86), __webpack_require__(4)];


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, ClassSystem, ProgressAdapter, StandardLib, isArray, isFunction, isNumber, log, max, min,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	StandardLib = __webpack_require__(24);

	ClassSystem = __webpack_require__(72);

	BaseObject = ClassSystem.BaseObject;

	isNumber = StandardLib.isNumber, isFunction = StandardLib.isFunction, isArray = StandardLib.isArray, log = StandardLib.log, max = StandardLib.max, min = StandardLib.min;

	module.exports = ProgressAdapter = (function(superClass) {
	  extend(ProgressAdapter, superClass);


	  /*
	  IN:
	    stepWeights can be a positive integer or an aray of positive, real numbers.
	  
	      integer N: specifies progress will be made in N even steps from 0 to 1
	  
	      array of numbers A: specifies progress will be made in A.length steps which
	        may not be even. Each step has its own "weight."
	  
	        Example: stepWeights = [850, 50, 100]
	        Will become:
	          steps:
	            0: 0.00 to 0.85
	            1: 0.85 to 0.90
	            2: 0.90 to 1.00
	  
	        Example: stepWeights = [1, 2, 1]
	        Will become:
	          steps:
	            0: 0.00 to 0.25
	            1: 0.25 to 0.75
	            2: 0.75 to 1.00
	  
	    progressCallback: progressCallback is a function which is invoked with a number
	      between 0 and 1. It is invoked immediatly with 0, then it is invoked by makeProgress()
	      and makeProgressCallback()(). It always increments or stays the same. It will
	      never go backwards.
	   */

	  function ProgressAdapter(stepWeights, progressCallback1) {
	    this.stepWeights = stepWeights;
	    this.progressCallback = progressCallback1;
	    if (!(isFunction(this.progressCallback) && (isArray(this.stepWeights) || isNumber(this.stepWeights)))) {
	      throw new Error("invalid params");
	    }
	    this._currentStep = 0;
	    this._generateSteps();
	    this._currentProgress = 0;
	    this._warningCount = 0;
	    this.setCurrentProgress(0);
	  }

	  ProgressAdapter.getter("steps currentStep currentProgress warningCount", {
	    currentProgressPercent: function() {
	      return (this._currentProgress * 100 | 0) + "%";
	    },
	    currentProgressBase: function() {
	      if (this._currentStep <= 0) {
	        return 0;
	      } else if (this._currentStep >= this._steps.length) {
	        return 1;
	      } else {
	        return this._steps[this._currentStep];
	      }
	    }
	  });

	  ProgressAdapter.setter({
	    currentProgress: function(p) {
	      return typeof this.progressCallback === "function" ? this.progressCallback(min(1, this._currentProgress = max(p, this._currentProgress))) : void 0;
	    }
	  });

	  ProgressAdapter.prototype.makeProgress = function() {
	    this._currentStep++;
	    if (this._currentStep > this._steps.length) {
	      this._warningCount++;
	      console.warn("ProgressAdapter: makeProgress/Callback called too many times!", {
	        currentStep: this._currentStep,
	        steps: this._steps,
	        stepWeights: this.stepWeights
	      });
	    }
	    return this.setCurrentProgress(this.currentProgressBase);
	  };

	  ProgressAdapter.prototype.makeProgressCallback = function() {
	    var rangeEnd, rangeStart;
	    this._finishLastProgress();
	    rangeStart = this.currentProgressBase;
	    this._currentStep++;
	    rangeEnd = this.currentProgressBase;
	    return (function(_this) {
	      return function(progress) {
	        return _this.setCurrentProgress(rangeStart + (rangeEnd - rangeStart) * progress);
	      };
	    })(this);
	  };

	  ProgressAdapter.prototype._finishLastProgress = function() {
	    var progress;
	    if (this._currentProgress < (progress = this.currentProgressBase)) {
	      return this.setCurrentProgress(progress);
	    }
	  };

	  ProgressAdapter.prototype._executePromiseSequence = function(sequence, lastResult, index, resolve) {
	    if (index >= sequence.length) {
	      this._finishLastProgress();
	      return resolve(lastResult);
	    }
	    return Promise.resolve(sequence[index](lastResult, this.makeProgressCallback())).then((function(_this) {
	      return function(nextResult) {
	        return _this._executePromiseSequence(sequence, nextResult, index + 1, resolve);
	      };
	    })(this));
	  };

	  ProgressAdapter.prototype.executePromiseSequence = function(sequence) {
	    return new Promise((function(_this) {
	      return function(resolve) {
	        return _this._executePromiseSequence(sequence, null, 0, resolve);
	      };
	    })(this));
	  };


	  /*
	  IN: (progressCallback, promiseSequence) ->
	     * stepWeights implicitly == promiseSequence.length
	  IN: (progressCallback, stepWeights, promiseSequence) ->
	   */

	  ProgressAdapter.executePromiseSequence = function(progressCallback, a, b) {
	    var pa, sequence, weights;
	    if (b) {
	      weights = a;
	      sequence = b;
	    } else {
	      sequence = a;
	      weights = sequence.length;
	    }
	    pa = new ProgressAdapter(weights, progressCallback);
	    return pa.executePromiseSequence(sequence);
	  };

	  ProgressAdapter.prototype._generateSteps = function() {
	    var i, j, len, numSteps, ref, s, step, total, w;
	    if (isNumber(numSteps = this.stepWeights)) {
	      return this._steps = (function() {
	        var j, ref, results;
	        results = [];
	        for (i = j = 0, ref = numSteps; j < ref; i = j += 1) {
	          results.push(i / numSteps);
	        }
	        return results;
	      })();
	    } else {
	      total = 0;
	      ref = this.stepWeights;
	      for (j = 0, len = ref.length; j < len; j++) {
	        w = ref[j];
	        total += w;
	      }
	      step = 0;
	      return this._steps = (function() {
	        var k, len1, ref1, results;
	        ref1 = this.stepWeights;
	        results = [];
	        for (k = 0, len1 = ref1.length; k < len1; k++) {
	          w = ref1[k];
	          s = step;
	          step += w / total;
	          results.push(s);
	        }
	        return results;
	      }).call(this);
	    }
	  };

	  return ProgressAdapter;

	})(BaseObject);


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var StandardLib, WebWorker, log;

	StandardLib = __webpack_require__(24);

	log = StandardLib.log;


	/*
	SRC:
	  http://jsfiddle.net/uqcFM/49/
	  http://stackoverflow.com/a/10372280/2121000
	 */

	module.exports = WebWorker = (function() {
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


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var GlobalCounts, StandardLib, currentSecond, isPlainObject, log;

	StandardLib = __webpack_require__(24);

	isPlainObject = StandardLib.isPlainObject, currentSecond = StandardLib.currentSecond, log = StandardLib.log;

	module.exports = GlobalCounts = (function() {
	  var globalTime;

	  function GlobalCounts() {}

	  GlobalCounts.globalCounts = {};

	  globalTime = null;

	  GlobalCounts.resetGlobalCounts = function() {
	    globalTime = currentSecond();
	    return GlobalCounts.globalCounts = {};
	  };

	  GlobalCounts.globalCount = function(name, amount) {
	    var k, last, results, v;
	    if (amount == null) {
	      amount = 1;
	    }
	    if (isPlainObject(amount)) {
	      if (last = GlobalCounts.globalCounts[name]) {
	        results = [];
	        for (k in amount) {
	          v = amount[k];
	          results.push(last[k] += v);
	        }
	        return results;
	      } else {
	        return GlobalCounts.globalCounts[name] = amount;
	      }
	    } else {
	      return GlobalCounts.globalCounts[name] = (GlobalCounts.globalCounts[name] || 0) + amount;
	    }
	  };

	  GlobalCounts.countStep = function() {
	    var nextTime;
	    nextTime = currentSecond();
	    if (nextTime - globalTime > .002) {
	      log.error("GlobalCounts gap");
	    }
	    globalTime = nextTime;
	    return GlobalCounts.globalCount("step");
	  };

	  return GlobalCounts;

	})();


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var Analytics, BaseObject, ClassSystem, StandardLib, inspectLean,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	StandardLib = __webpack_require__(24);

	ClassSystem = __webpack_require__(72);

	BaseObject = ClassSystem.BaseObject;

	inspectLean = StandardLib.inspectLean;

	Analytics = (function(superClass) {
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
	      return this.rawLog("ANALYTICS-EVENT: " + (inspectLean(options)));
	    } else {
	      return this.rawLog("(no)ANALYTICS-EVENT: " + (inspectLean(options)));
	    }
	  };

	  return Analytics;

	})(BaseObject);


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {var Promise, defineModule, isWebWorker, log, ref, workerRpc;

	ref = __webpack_require__(24), defineModule = ref.defineModule, Promise = ref.Promise, log = ref.log;

	isWebWorker = __webpack_require__(85).isWebWorker;

	workerRpc = __webpack_require__(90).workerRpc;


	/*
	AsyncLocalStorage defines a consistent API for localStorage across web-workers and the main thread.

	API:
	  AsyncLocalStorage.
	    getItem:    (path)        -> promise.then -> item at path
	    setItem:    (path, value) -> promise.then -> success
	    removeItem: (path)        -> promise.then -> success
	    clear:                    -> promise.then -> success
	 */

	defineModule(module, function() {
	  var AsyncLocalStorage, localStorage;
	  localStorage = global.localStorage;
	  if (isWebWorker) {
	    return workerRpc.bindWithPromises({
	      localStorage: ["getItem", "setItem", "removeItem", "clear", "key"]
	    });
	  } else {
	    workerRpc.register({
	      localStorage: localStorage
	    });
	    return AsyncLocalStorage = (function() {
	      function AsyncLocalStorage() {}

	      AsyncLocalStorage.getItem = function(path) {
	        return Promise.then(function() {
	          return localStorage.getItem(path);
	        });
	      };

	      AsyncLocalStorage.setItem = function(path, value) {
	        return Promise.then(function() {
	          return localStorage.setItem(path, value);
	        });
	      };

	      AsyncLocalStorage.removeItem = function(path) {
	        return Promise.then(function() {
	          return localStorage.removeItem(path);
	        });
	      };

	      AsyncLocalStorage.clear = function() {
	        return Promise.then(function() {
	          return localStorage.clear();
	        });
	      };

	      AsyncLocalStorage.key = function(index) {
	        return Promise.then(function() {
	          return localStorage.key(index);
	        });
	      };

	      AsyncLocalStorage.getLength = function() {
	        return Promise.then(function() {
	          return localStorage.length;
	        });
	      };

	      return AsyncLocalStorage;

	    })();
	  }
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(89)(module), (function() { return this; }())))

/***/ },
/* 89 */
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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, ClassSystem, Promise, StandardLib, WebWorker, WorkerRpc, debugPrefix, isFunction, isPlainArray, isString, isWebWorker, log, mergeInto,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  slice = [].slice;

	StandardLib = __webpack_require__(24);

	ClassSystem = __webpack_require__(72);

	WebWorker = __webpack_require__(85);

	Promise = StandardLib.Promise, log = StandardLib.log, isPlainArray = StandardLib.isPlainArray, isFunction = StandardLib.isFunction, isString = StandardLib.isString, mergeInto = StandardLib.mergeInto;

	BaseObject = ClassSystem.BaseObject;

	isWebWorker = WebWorker.isWebWorker;


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

	module.exports = WorkerRpc = (function(superClass) {
	  var workerRpcChannelIdString;

	  extend(WorkerRpc, superClass);

	  WorkerRpc.singletonClass();

	  WorkerRpc.workerRpcChannelIdString = workerRpcChannelIdString = "Art.Foundation.WorkerRpcChannel";

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
	      log("WorkerRpc starting worker: " + thread);
	      thread = new Worker(thread);
	      log("WorkerRpc starting worker: " + thread + ", started?:", thread);
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
	    namespace = null;
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
	    return namespace;
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

	  WorkerRpc.prototype._applyOptions = function(arg) {
	    var bind, bindWithPromises, register;
	    register = arg.register, bind = arg.bind, bindWithPromises = arg.bindWithPromises;
	    this.register(register);
	    this.bind(bind);
	    this.bindWithPromises(bindWithPromises);
	    return this;
	  };

	  WorkerRpc.prototype._send = function(namespaceName, functionName, promiseId, args) {
	    return this._thread.postMessage([workerRpcChannelIdString, namespaceName, functionName, promiseId, args]);
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
	    var handler;
	    if (!thread) {
	      return;
	    }
	    handler = (function(_this) {
	      return function(arg) {
	        var args, data, functionName, namespaceName, promiseId, testWorkerRpcChannelIdString;
	        data = arg.data;
	        if (!isPlainArray(data)) {
	          return;
	        }
	        testWorkerRpcChannelIdString = data[0], namespaceName = data[1], functionName = data[2], promiseId = data[3], args = data[4];
	        if (testWorkerRpcChannelIdString !== workerRpcChannelIdString) {
	          return;
	        }
	        return _this._invokeLocalFunction(namespaceName, functionName, promiseId, args);
	      };
	    })(this);
	    if (thread.addEventListener) {
	      return thread.addEventListener('message', handler);
	    } else {
	      return thread.onmessage = handler;
	    }
	  };

	  WorkerRpc.prototype._invokeLocalFunction = function(namespaceName, functionName, promiseId, args) {
	    var localFunction, namespace, singleton;
	    if (!((namespace = this._registry[namespaceName]) && (localFunction = namespace[functionName]))) {
	      singleton = WorkerRpc.singleton;
	      if (this !== singleton && (namespace = singleton._registry[namespaceName])) {
	        localFunction = namespace[functionName];
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


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, BatchLoader, ClassSystem, StandardLib, inspect, log, nextTick, timeout,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	StandardLib = __webpack_require__(24);

	ClassSystem = __webpack_require__(72);

	BaseObject = ClassSystem.BaseObject;

	log = StandardLib.log, inspect = StandardLib.inspect, nextTick = StandardLib.nextTick, timeout = StandardLib.timeout;

	module.exports = BatchLoader = (function(superClass) {
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


/***/ },
/* 92 */
/***/ function(module, exports) {

	
	/*
	A core set of status-codes that code can reason about easily.

	Goal:

	  Minimal set of codes so APIs can reason about network requests in a
	  consistant way.

	Why not HTTP Status codes?

	  They cover so much, most of which automatic code cannot do anything about
	  other than report an error, possibly to be viewed by a human later.

	My strategy is to have a small, simple set of status codes for our programs to
	reason about, and, if necessary, allow the communication channel to return
	additional information in the form of a 'message' that humans can look at to
	get more information about any failures.

	Note, these status-codes are used at the core of other Art Libs:

	  ArtFlux
	  ArtEry

	Possible additional statuses to add:

	  (only add if we have a very good use-case that requires it)

	  temporaryFailure: code can retry in a bit and it might work then

	  redirect: request can only be fulfilled at the new location

	    Note, I don't think we should have different statuses for all the  various
	    redirect semantics. It's up to the API to determine if a redirect is
	    temporary or permanent. I could imagine an API which returns a
	    redirectAddress  string as well as a connonicalAddress.
	 */
	var CommunicationStatus;

	module.exports = CommunicationStatus = (function() {
	  function CommunicationStatus() {}


	  /*
	  status: success
	  
	  * An unqualified success.
	  * I guess it could be qualified, with additional information in another field,
	    but the 'expected' data should be present.
	   */

	  CommunicationStatus.success = "success";


	  /*
	  status: pending
	  
	  * The request is proceeding.
	  * No errors so far.
	   */

	  CommunicationStatus.pending = "pending";


	  /*
	  status: missing
	  
	  * The request was properly formatted.
	  * There were no network errors.
	  * There were no server errors.
	  * The only problem is the server could not find the requested resource.
	   */

	  CommunicationStatus.missing = "missing";


	  /*
	  status: failure
	  
	  * All network and server errors.
	  * Provide additional information in 'message' or 'error' parameter.
	   */

	  CommunicationStatus.failure = "failure";


	  /*
	  OUT: true if status is a valid status-string
	   */

	  CommunicationStatus.validStatus = function(status) {
	    return CommunicationStatus[status] === status;
	  };

	  return CommunicationStatus;

	})();


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, ClassSystem, Epoch, Foundation, Promise, StandardLib, evalAndThrowErrorsOutOfStack, inspect, requestAnimationFrame,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	Foundation = __webpack_require__(21);

	StandardLib = __webpack_require__(24);

	ClassSystem = __webpack_require__(72);

	BaseObject = ClassSystem.BaseObject;

	inspect = StandardLib.inspect, Promise = StandardLib.Promise, requestAnimationFrame = StandardLib.requestAnimationFrame, evalAndThrowErrorsOutOfStack = StandardLib.evalAndThrowErrorsOutOfStack;

	module.exports = Epoch = (function(superClass) {
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
	    this._frameSecond = 0;
	  }

	  Epoch.getter("processingEpoch epochQueued epochCount emptyQueueAfterProcessing frameSecond", {
	    epochLength: function() {
	      return this._queuedItems.length;
	    }
	  });

	  Epoch.prototype.updateGlobalCounts = function() {
	    Foundation.globalCount(this["class"].name + "_queuedItems", this._queuedItems.length);
	    return Foundation.globalCount(this["class"].name + "_nextReadyQueue", this._nextReadyQueue.length);
	  };


	  /*
	  This guarantess there will be a next "ready" event.
	  If there were no setStates this epoch, then there won't be a next "ready" - unless you use this method.
	  
	  IN:
	    f: an optional function to invoke on-next-ready
	      mostly this is provided as a shortcut:
	        @onNextReady =>
	      is directly equivelent to:
	        @onNextReady().then =>
	  
	  OUT: promise.then (result of calling f() or null if no f) ->
	   */

	  Epoch.prototype.onNextReady = function(f, forceNextEpoch, passThroughArgument) {
	    if (forceNextEpoch == null) {
	      forceNextEpoch = true;
	    }
	    if (forceNextEpoch && !this._processingEpoch) {
	      this.queueNextEpoch();
	    }
	    return new Promise((function(_this) {
	      return function(resolve) {
	        return _this._nextReadyQueue.push(function() {
	          return resolve(f ? f(passThroughArgument) : passThroughArgument);
	        });
	      };
	    })(this));
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
	        return function(frameTimeMs) {
	          _this._frameSecond = frameTimeMs / 1000;
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


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var defineModule, fastBind, isFunction, log, ref,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	ref = __webpack_require__(24), defineModule = ref.defineModule, isFunction = ref.isFunction, fastBind = ref.fastBind, log = ref.log;

	defineModule(module, function() {
	  return function(superClass) {
	    var InstanceFunctionBindingMixin;
	    return InstanceFunctionBindingMixin = (function(superClass1) {
	      extend(InstanceFunctionBindingMixin, superClass1);

	      function InstanceFunctionBindingMixin() {
	        return InstanceFunctionBindingMixin.__super__.constructor.apply(this, arguments);
	      }

	      InstanceFunctionBindingMixin.getFunctionsToBindList = function() {
	        if (this.hasOwnProperty("_functionsToBindList")) {
	          return this._functionsToBindList;
	        } else {
	          return this._functionsToBindList = this.getFunctionsToBindList();
	        }
	      };

	      InstanceFunctionBindingMixin.getFunctionsToBindList = function() {
	        var k, ref1, results, v;
	        ref1 = this.prototype;
	        results = [];
	        for (k in ref1) {
	          v = ref1[k];
	          if (k !== "constructor" && isFunction(v) && this.propertyIsConcrete(k) && (!this.nonBindingFunctions || indexOf.call(this.nonBindingFunctions, k) < 0)) {
	            results.push(k);
	          }
	        }
	        return results;
	      };

	      InstanceFunctionBindingMixin.prototype.getBoundFunctionList = function() {
	        return this._boundFunctionList;
	      };

	      InstanceFunctionBindingMixin.prototype.bindFunctionsToInstance = function() {
	        var functionsToBindList, i, j, k, len, len1, prototype, ref1;
	        functionsToBindList = this["class"].getFunctionsToBindList();
	        if (this._boundFunctionList) {
	          ref1 = this._boundFunctionList;
	          for (i = 0, len = ref1.length; i < len; i++) {
	            k = ref1[i];
	            if (indexOf.call(functionsToBindList, k) < 0) {
	              delete this[k];
	            }
	          }
	        }
	        prototype = this["class"].prototype;
	        for (j = 0, len1 = functionsToBindList.length; j < len1; j++) {
	          k = functionsToBindList[j];
	          this[k] = fastBind(prototype[k], this);
	        }
	        return this._boundFunctionList = functionsToBindList;
	      };

	      return InstanceFunctionBindingMixin;

	    })(superClass);
	  };
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(89)(module)))

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var AsyncLocalStorage, BaseObject, ClassSystem, JsonStore, Promise, isNumber, log, ref,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	ref = __webpack_require__(24), log = ref.log, Promise = ref.Promise, isNumber = ref.isNumber;

	ClassSystem = __webpack_require__(72);

	AsyncLocalStorage = __webpack_require__(88);

	BaseObject = ClassSystem.BaseObject;

	module.exports = JsonStore = (function(superClass) {
	  extend(JsonStore, superClass);

	  function JsonStore(store) {
	    if (store == null) {
	      store = AsyncLocalStorage;
	    }
	    this.store = store;
	  }

	  JsonStore.prototype.setItem = function(k, v) {
	    return Promise.then((function(_this) {
	      return function() {
	        return _this.store.setItem(k, JSON.stringify(v));
	      };
	    })(this));
	  };

	  JsonStore.prototype.getItem = function(k) {
	    return Promise.resolve(this.store.getItem(k)).then((function(_this) {
	      return function(v) {
	        return JSON.parse(v);
	      };
	    })(this));
	  };

	  JsonStore.prototype.removeItem = function(k) {
	    return Promise.then((function(_this) {
	      return function() {
	        return _this.store.removeItem(k);
	      };
	    })(this));
	  };

	  JsonStore.prototype.clear = function() {
	    return Promise.then((function(_this) {
	      return function() {
	        return _this.store.clear();
	      };
	    })(this));
	  };

	  JsonStore.prototype.key = function(i) {
	    return Promise.then((function(_this) {
	      return function() {
	        return _this.store.key(i);
	      };
	    })(this));
	  };

	  JsonStore.prototype.getLength = function() {
	    return Promise.then((function(_this) {
	      return function() {
	        if (isNumber(_this.store.length)) {
	          return _this.store.length;
	        } else {
	          return _this.store.getLength();
	        }
	      };
	    })(this));
	  };

	  return JsonStore;

	})(BaseObject);


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var Promise, RestClient, StandardLib, isNumber, merge, present, timeout;

	StandardLib = __webpack_require__(24);

	present = StandardLib.present, Promise = StandardLib.Promise, merge = StandardLib.merge, isNumber = StandardLib.isNumber, timeout = StandardLib.timeout;

	module.exports = RestClient = (function() {
	  function RestClient() {}


	  /*
	  get/put/post
	  
	  IN:
	    url: valid url string
	  
	    data: (only on PUT/POST requests)
	      data to send
	      NOTE: must be null if using formData
	  
	    options:
	  
	      formData: plain object of key-value pairs to submit as form-data
	        You can even use this for "get" requests.
	        NOTE: "data" must be null if using "formData"
	  
	      headers: plain object of additional HTTP headers to set
	  
	      onProgress: (restRequestStatus) -> null
	        called each time progress is made
	        NOTE: restRequestStatus.progress contains a 0-to-1 number that indicates how much progress has been made.
	          progress indicates DOWNLOAD progress for GET requests and UPLOAD progress for all others.
	  
	      responseType: "arraybuffer", "blob", "document", "json", or "text"
	        default: "text"
	        NOTE: "json" is handled manually since IE11 and iOS7 don't support the "json" option.
	        https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
	  
	  OUT: Promise:
	    resolved: (responseData) ->
	    rejected: (restRequestStatus) ->
	  
	  responseData:
	    a String, or the type specified by the responseType option
	  
	  restRequestStatus:
	    event:    # the HTML event object
	    request:  # the XMLHttpRequest
	    options:  # the restRequest options: verb, url, data, headers, onProgress, responseType, formData
	    status:   # the HTML status code, if the request completed
	    response: # responseData
	    error:    # Error object or string-explaination of why the request was rejected
	    progress:
	      a value between 0 and 1
	      If the progress is indeterminant, this is 0
	      If this isn't an onProgress event, this is the amount of progress
	      that was made up to the point of the event.
	   */

	  RestClient.get = function(url, options) {
	    return RestClient.restRequest(merge(options, {
	      verb: "GET",
	      url: url
	    }));
	  };

	  RestClient["delete"] = function(url, options) {
	    return RestClient.restRequest(merge(options, {
	      verb: "DELETE",
	      url: url
	    }));
	  };

	  RestClient.getArrayBuffer = function(url, options) {
	    return this.get(url, merge(options, {
	      responseType: "arraybuffer"
	    }));
	  };

	  RestClient.put = function(url, data, options) {
	    return RestClient.restRequest(merge(options, {
	      verb: "PUT",
	      url: url,
	      data: data
	    }));
	  };

	  RestClient.post = function(url, data, options) {
	    return RestClient.restRequest(merge(options, {
	      verb: "POST",
	      url: url,
	      data: data
	    }));
	  };


	  /*
	  OUT: Promise -> responseData is plainObject (responseData string parsed as JSON)
	  NOTE: if the response fails to parse as JSON, the promise will be rejected.
	    The unparsed response can be accessed as follows: promise.then ..., (restRequestStatus) -> restRequestStatus.response
	  
	  IN:
	    data:     if data is provided, it will be encoded as JSON (this becomes the request body)
	    url:      (See above)
	    options:  (See above)
	   */

	  RestClient.getJson = function(url, options) {
	    return this.get(url, merge(options, {
	      responseType: "json",
	      headers: {
	        Accept: 'application/json'
	      }
	    }));
	  };

	  RestClient.deleteJson = function(url, options) {
	    return this["delete"](url, merge(options, {
	      responseType: "json",
	      headers: {
	        Accept: 'application/json'
	      }
	    }));
	  };

	  RestClient.putJson = function(url, data, options) {
	    return this.put(url, data && JSON.stringify(data), merge(options, {
	      responseType: "json",
	      headers: {
	        Accept: 'application/json'
	      }
	    }));
	  };

	  RestClient.postJson = function(url, data, options) {
	    return this.post(url, data && JSON.stringify(data), merge(options, {
	      responseType: "json",
	      headers: {
	        Accept: 'application/json'
	      }
	    }));
	  };


	  /*
	  IN:
	    options:
	      verb: "GET", "PUT", "POST"
	  
	      data: data to restRequest - passed to xmlHttpRequest.restRequest
	  
	      plus all the options for get/put/post listed above
	      showProgressAfter: milliseconds (default: 100)
	        only show progress after # milliseconds
	  
	      onProgress: (requestStatus) ->
	        see "All callbacks" below for details about inputs.
	        Note that onProgress is triggered a little differently than
	        the normal XMLHttpRequest progress events:
	          - it will only be called after showProgressAfter ms
	          - it is guaranteed to be called after showProgressAfter ms if the request hasn't completed
	          - if the request completes before showProgressAfter ms, it will never be called
	  
	  OUT: see get/put/post above
	  
	  All callbacks look like this: (requestStatus) ->
	    requestStatus:
	      request:  XMLHttpRequest
	      progress: number # between 0 and 1
	      options:  options # passed-in options object
	      event:    the most recent event
	      response: # the processed response data, if ready
	      error:    # if any
	      status:   number # HTTP status code, if the request is complete
	  
	  EFFECT:
	   */

	  RestClient.restRequest = function(options) {
	    var data, formData, headers, k, onProgress, responseType, showProgressAfter, url, v, verb;
	    verb = options.verb, url = options.url, data = options.data, headers = options.headers, onProgress = options.onProgress, responseType = options.responseType, formData = options.formData, showProgressAfter = options.showProgressAfter;
	    if (!isNumber(showProgressAfter)) {
	      showProgressAfter = 100;
	    }
	    if (formData) {
	      if (data) {
	        throw new Error("can't specify both 'data' and 'formData'");
	      }
	      data = new FormData;
	      for (k in formData) {
	        v = formData[k];
	        data.append(k, v);
	      }
	    } else {
	      data = (data != null ? typeof data.toArrayBuffer === "function" ? data.toArrayBuffer() : void 0 : void 0) || data;
	    }
	    return new Promise(function(resolve, reject) {
	      var getResponse, initialProgressCalled, lastProgressEvent, progressCallbackInternal, request, requestResolved, rescuedGetResponse, restRequestStatus;
	      restRequestStatus = {
	        request: request = new XMLHttpRequest,
	        progress: 0,
	        options: options
	      };
	      rescuedGetResponse = function() {
	        try {
	          return getResponse();
	        } catch (error1) {
	          return request.response;
	        }
	      };
	      getResponse = function() {
	        var response;
	        response = request.response;
	        if (response && responseType === "json") {
	          return response = JSON.parse(response);
	        } else {
	          return response;
	        }
	      };
	      request.open(verb, url, true);
	      if (present(responseType) && responseType !== "json") {
	        request.responseType = responseType;
	      }
	      if (headers) {
	        for (k in headers) {
	          v = headers[k];
	          request.setRequestHeader(k, v);
	        }
	      }
	      requestResolved = false;
	      request.addEventListener("error", function(event) {
	        requestResolved = true;
	        return reject(merge(restRequestStatus, {
	          event: event,
	          response: rescuedGetResponse(),
	          error: "XMLHttpRequest triggered 'error' event"
	        }));
	      });
	      request.addEventListener("load", function(event) {
	        var error, status;
	        requestResolved = true;
	        status = request.status;
	        if ((status / 100 | 0) === 2) {
	          try {
	            return resolve(getResponse());
	          } catch (error1) {
	            error = error1;
	            return reject(merge(restRequestStatus, {
	              event: event,
	              status: status,
	              response: rescuedGetResponse(),
	              error: error
	            }));
	          }
	        } else {
	          return reject(merge(restRequestStatus, {
	            event: event,
	            status: status,
	            response: rescuedGetResponse(),
	            error: "response status was " + status
	          }));
	        }
	      });
	      if (onProgress) {
	        initialProgressCalled = showProgressAfter <= 0;
	        lastProgressEvent = null;
	        timeout(showProgressAfter, function() {
	          initialProgressCalled = true;
	          return progressCallbackInternal(lastProgressEvent || {});
	        });
	        progressCallbackInternal = function(event) {
	          var loaded, ref, total;
	          ref = lastProgressEvent = event, total = ref.total, loaded = ref.loaded;
	          if (initialProgressCalled && !requestResolved) {
	            return typeof onProgress === "function" ? onProgress(restRequestStatus = merge(restRequestStatus, {
	              event: event,
	              progress: total > 0 ? loaded / total : 0
	            })) : void 0;
	          }
	        };
	        if (verb === "GET") {
	          request.addEventListener("progress", progressCallbackInternal);
	        } else {
	          request.upload.addEventListener("progress", progressCallbackInternal);
	        }
	      }
	      return request.send(data);
	    });
	  };

	  return RestClient;

	})();


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, ClassSystem, Map, SingleObjectTransaction, StandardLib, cloneByStructure, eq, inspect, removeFirstMatch, rubyTrue,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	StandardLib = __webpack_require__(24);

	ClassSystem = __webpack_require__(72);

	Map = StandardLib.Map, cloneByStructure = StandardLib.cloneByStructure, removeFirstMatch = StandardLib.removeFirstMatch, eq = StandardLib.eq, inspect = StandardLib.inspect, rubyTrue = StandardLib.rubyTrue;

	BaseObject = ClassSystem.BaseObject;

	module.exports = SingleObjectTransaction = (function(superClass) {
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
	    if (!inspector) {
	      return ClassSystem.Inspect.inspect(this);
	    }
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
	    var e;
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


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, ClassSystem, StandardLib, Stat, inspect, max, min, round,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	StandardLib = __webpack_require__(24);

	ClassSystem = __webpack_require__(72);

	BaseObject = ClassSystem.BaseObject;

	min = StandardLib.min, max = StandardLib.max, round = StandardLib.round, inspect = StandardLib.inspect;

	module.exports = Stat = (function(superClass) {
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


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	
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
	var BaseObject, ClassSystem, Map, SingleObjectTransaction, StandardLib, Transaction, cloneByStructure, eq, inspect, rubyTrue,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	StandardLib = __webpack_require__(24);

	ClassSystem = __webpack_require__(72);

	SingleObjectTransaction = __webpack_require__(97);

	rubyTrue = StandardLib.rubyTrue, eq = StandardLib.eq, inspect = StandardLib.inspect, Map = StandardLib.Map, cloneByStructure = StandardLib.cloneByStructure;

	BaseObject = ClassSystem.BaseObject;

	module.exports = Transaction = (function(superClass) {
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
	    if (!inspector) {
	      return ClassSystem.Inspect.inspect(this);
	    }
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


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Promise, StandardLib, Validator, emailRegexp, formattedInspect, isBoolean, isHexColor, isId, isNumber, isPlainArray, isPlainObject, isString, log, merge, mergeIntoUnless, present, select, shallowClone, validStatus, w,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	StandardLib = __webpack_require__(24);

	merge = StandardLib.merge, log = StandardLib.log, BaseObject = StandardLib.BaseObject, shallowClone = StandardLib.shallowClone, isNumber = StandardLib.isNumber, isString = StandardLib.isString, isPlainObject = StandardLib.isPlainObject, isPlainArray = StandardLib.isPlainArray, Promise = StandardLib.Promise, isBoolean = StandardLib.isBoolean, formattedInspect = StandardLib.formattedInspect, present = StandardLib.present, select = StandardLib.select, emailRegexp = StandardLib.emailRegexp, mergeIntoUnless = StandardLib.mergeIntoUnless, w = StandardLib.w;

	validStatus = __webpack_require__(92).validStatus;


	/*
	NOTES:

	  validators are evaluated before preprocessors

	  preprocessors should NOT throw validation-related errors

	  TODO?: We could add postValidators to allow you to validate AFTER the preprocessor...

	USAGE:
	  new Validator validatorFieldsProps, options

	    IN:
	      validatorFieldsProps:
	        plain object with zero or more field-validations defined:
	          fieldName: fieldProps
	      options:
	        exclusive: true/false
	          if true, only fields listed in validatorFieldsProps are allowed.

	    fieldProps:
	      string or plainObject
	      string: selects fieldProps from one of the standard @fieldTypes (see below)
	      plainObject: (all fields are optional)

	        validate: (v) -> true/false
	          whenever this field is included in an update OR create operation,
	            validate() must return true
	          NOTE: is evaluated BEFORE preprocess

	        preprocess: (v1) -> v2
	          whenever this field is included in an update OR create operation,
	            after validation succeeds,
	            value = preprocess value

	        required: true/false/string
	          if true/string
	            when creating records, this field must be included
	          if string
	            fieldProps = merge fieldProps, fieldTypes[string]

	        present: true/false
	          if true
	            when creating records, this field must be include and 'present' (see Art.Foundation.present)

	        fieldType: string
	          fieldProps = merge fieldTypes[string], fieldProps

	        dataType: string
	          sepecify which of the standard Json data-types this field contains
	          This is not used by Validator itself, but is available for clients to reflect on field-types.
	          Must be one of the values in: @dataTypes

	        instanceof: class
	          in addition to passing validate(), if present, the value must also be an instance of the
	          specified class

	EXAMPLES:
	  new
	 */

	BaseObject = __webpack_require__(72).BaseObject;

	isId = function(v) {
	  return isString(v) && v.match(/^[-_a-z0-9]+$/i);
	};

	isHexColor = function(v) {
	  return isString(v) && v.match(/^#([a-f0-9]{3})|([a-f0-9]{6})/i);
	};

	module.exports = Validator = (function(superClass) {
	  var arrayDataType, booleanDataType, dataTypes, fieldTypes, k, normalizeDepricatedProps, normalizeFieldProps, normalizeFieldTypeProp, normalizeInstanceOfProp, normalizePlainObjectProps, numberDataType, objectDataType, preCreate, preCreateSync, stringDataType, v;

	  extend(Validator, superClass);


	  /*
	  @dataTypes only includes the Standard Json types:
	    except 'null':
	      no field has the type of 'null'
	      instead, it has some other type and can be 'null' unless it is 'required'
	   */

	  Validator.dataTypes = dataTypes = {
	    boolean: {
	      validate: function(a) {
	        return isBoolean(a);
	      }
	    },
	    number: {
	      validate: function(a) {
	        return isNumber(a);
	      }
	    },
	    string: {
	      validate: function(a) {
	        return isString(a);
	      }
	    },
	    object: {
	      validate: function(a) {
	        return isPlainObject(a);
	      }
	    },
	    array: {
	      validate: function(a) {
	        return isPlainArray(a);
	      }
	    }
	  };

	  booleanDataType = "boolean";

	  numberDataType = "number";

	  stringDataType = "string";

	  objectDataType = "object";

	  arrayDataType = "array";


	  /*
	  standard FieldType props:
	    validate: (v) -> true/false
	    preprocess: (v1) -> v2
	    required: true/false
	    dataType: one of @dataTypes, default: 'string'
	  
	  You can add your own, too, but they are ignored by this class.
	   */

	  Validator.fieldTypes = fieldTypes = {
	    boolean: {
	      dataType: booleanDataType
	    },
	    number: {
	      dataType: numberDataType
	    },
	    string: {},
	    object: {
	      dataType: objectDataType
	    },
	    array: {
	      dataType: arrayDataType
	    },
	    count: {
	      dataType: numberDataType
	    },
	    id: {
	      required: true,
	      validate: function(v) {
	        return isId(v);
	      }
	    },
	    date: {
	      validate: function(v) {
	        return isString(v) || (v instanceof Date);
	      },
	      preprocess: function(v) {
	        if (isString(v)) {
	          return new Date(v);
	        } else {
	          return v;
	        }
	      }
	    },
	    timestamp: {
	      dataType: numberDataType,
	      validate: function(v) {
	        return isNumber(v) || (v instanceof Date);
	      },
	      preprocess: function(v) {
	        if (v instanceof Date) {
	          return v - 0;
	        } else {
	          return v;
	        }
	      }
	    },
	    color: {
	      validate: function(v) {
	        return isHexColor(v);
	      }
	    },
	    email: {
	      validate: function(v) {
	        return isString(v) && v.trim().match(emailRegexp);
	      },
	      preprocess: function(v) {
	        return v.trim().toLowerCase();
	      }
	    },
	    url: {
	      validate: function(v) {
	        return isString(v) && v.match(urlRegexp);
	      },
	      preprocess: function(v) {
	        return normalizeUrl(v);
	      }
	    },
	    communicationStatus: {
	      validate: function(v) {
	        return validStatus(v);
	      }
	    },
	    trimmedString: {
	      validate: function(v) {
	        return isString(v);
	      },
	      preprocess: function(v) {
	        return v.trim();
	      }
	    }
	  };

	  for (k in fieldTypes) {
	    v = fieldTypes[k];
	    v.dataType || (v.dataType = stringDataType);
	    v.validate || (v.validate = dataTypes[v.dataType].validate);
	  }

	  normalizeInstanceOfProp = function(ft) {
	    var _instanceof, validate;
	    if (_instanceof = ft["instanceof"]) {
	      validate = ft.validate;
	      return merge(ft, {
	        validate: function(v) {
	          return (v instanceof _instanceof) && (!validate || validate(v));
	        }
	      });
	    } else {
	      return ft;
	    }
	  };

	  normalizePlainObjectProps = function(ft) {
	    var out, subObject;
	    out = null;
	    for (k in ft) {
	      v = ft[k];
	      if (isPlainObject(subObject = v)) {
	        if (!out) {
	          out = shallowClone(ft);
	        }
	        out[k] = true;
	        mergeIntoUnless(out, normalizePlainObjectProps(subObject));
	      }
	    }
	    return out || ft;
	  };

	  normalizeDepricatedProps = function(ft) {
	    if (ft.requiredPresent) {
	      throw new Error("DEPRICATED: requiredPresent. Use: present: true");
	    }
	    if (isString(ft.required)) {
	      throw new Error("DEPRICATED: required can no longer specifiy the field-type. Use: required: fieldType: myFieldTypeString OR 'required myFieldTypeString'");
	    }
	    if (isString(ft.present)) {
	      throw new Error("DEPRICATED: present can no longer specifiy the field-type. Use: present: fieldType: myFieldTypeString OR 'present myFieldTypeString'");
	    }
	    return ft;
	  };

	  normalizeFieldTypeProp = function(ft) {
	    if (ft.fieldType) {
	      return merge(normalizeFieldProps(ft.fieldType), ft);
	    } else {
	      return ft;
	    }
	  };

	  Validator.normalizeFieldProps = normalizeFieldProps = function(ft) {
	    var array, processed, string, strings, subFt;
	    ft = (function() {
	      var i, len, ref;
	      if (isPlainObject(ft)) {
	        return normalizeFieldTypeProp(normalizeInstanceOfProp(normalizeDepricatedProps(normalizePlainObjectProps(ft))));
	      } else if (isPlainArray(array = ft)) {
	        processed = (function() {
	          var i, len, results;
	          results = [];
	          for (i = 0, len = array.length; i < len; i++) {
	            ft = array[i];
	            results.push(normalizeFieldProps(ft));
	          }
	          return results;
	        })();
	        return merge.apply(null, processed);
	      } else if (isString(strings = ft)) {
	        ft = {};
	        ref = w(strings);
	        for (i = 0, len = ref.length; i < len; i++) {
	          string = ref[i];
	          if (subFt = fieldTypes[string]) {
	            mergeIntoUnless(ft, subFt);
	          } else {
	            ft[string] = true;
	          }
	        }
	        return ft;
	      } else {
	        throw new Error("fieldType must be a string or plainObject: " + (formattedInspect(ft)));
	      }
	    })();
	    return merge(fieldTypes[ft.fieldType], ft);
	  };

	  function Validator(fieldDeclarationMap, options) {
	    this._fieldProps = {};
	    this._requiredFieldsMap = {};
	    this.addFields(fieldDeclarationMap);
	    if (options) {
	      this.exclusive = options.exclusive, this.context = options.context;
	    }
	  }

	  Validator.property("exclusive");

	  Validator.prototype.addFields = function(fieldDeclarationMap) {
	    var field, fieldOptions;
	    for (field in fieldDeclarationMap) {
	      fieldOptions = fieldDeclarationMap[field];
	      fieldOptions = this._addField(field, fieldOptions);
	      if (fieldOptions.required) {
	        this._requiredFieldsMap[field] = void 0;
	      }
	    }
	    return null;
	  };


	  /*
	  IN:
	    fields: object with fields to validate OR Promise returning said object
	  
	  OUT:
	    promise.then (validatedPreprocessedFields) ->
	    .catch (validationFailureInfoObject) ->
	   */

	  Validator.prototype.preCreate = preCreate = function(fields, options) {
	    return Promise.resolve(fields).then((function(_this) {
	      return function(fields) {
	        return _this.preCreateSync(fields, options);
	      };
	    })(this));
	  };

	  Validator.prototype.validate = preCreate;


	  /*
	  IN:
	    fields: object with fields to validate OR Promise returning said object
	  
	  OUT:
	    promise.then (validatedPreprocessedFields) ->
	    .catch (validationFailureInfoObject) ->
	   */

	  Validator.prototype.preUpdate = function(fields, options) {
	    return Promise.resolve(fields).then((function(_this) {
	      return function(fields) {
	        return _this.preUpdateSync(fields, options);
	      };
	    })(this));
	  };

	  Validator.prototype.preCreateSync = preCreateSync = function(fields, options) {
	    var info, presentFieldsValid, requiredFieldsPresent, status;
	    requiredFieldsPresent = this.requiredFieldsPresent(fields);
	    presentFieldsValid = this.presentFieldsValid(fields);
	    if (requiredFieldsPresent && presentFieldsValid) {
	      return this.preprocessFields(fields);
	    } else {
	      status = !presentFieldsValid ? !requiredFieldsPresent ? "invalid and missing" : "invalid" : "missing";
	      info = {
	        validationFailure: ((options != null ? options.context : void 0) || this.context || "Validator") + ": create: field(s) are " + status
	      };
	      if (!presentFieldsValid) {
	        info.invalidFields = this.invalidFields(fields);
	      }
	      if (!requiredFieldsPresent) {
	        info.missingFields = this.missingFields(fields);
	      }
	      throw info;
	    }
	  };

	  Validator.prototype.validateSync = preCreateSync;

	  Validator.prototype.preUpdateSync = function(fields, options) {
	    if (this.presentFieldsValid(fields)) {
	      return this.preprocessFields(fields);
	    } else {
	      throw {
	        validationFailure: ((options != null ? options.context : void 0) || this.context || "Validator") + ": update: field(s) are invalid",
	        invalidFields: this.invalidFields(fields)
	      };
	    }
	  };

	  Validator.prototype.presentFieldValid = function(fields, fieldName) {
	    var fieldProps, validate, value;
	    if (fieldProps = this._fieldProps[fieldName]) {
	      validate = fieldProps.validate;
	      return !validate || ((value = fields[fieldName]) == null) || value === null || value === void 0 || validate(value);
	    } else {
	      return !this.exclusive;
	    }
	  };

	  Validator.prototype.requiredFieldPresent = function(fields, fieldName) {
	    var fieldProps;
	    if (!(fieldProps = this._fieldProps[fieldName])) {
	      return true;
	    }
	    if (fieldProps.required && (fields[fieldName] == null)) {
	      return false;
	    }
	    if (fieldProps.present && !present(fields[fieldName])) {
	      return false;
	    }
	    return true;
	  };

	  Validator.prototype.presentFieldsValid = function(fields) {
	    var __, fieldName;
	    for (fieldName in fields) {
	      __ = fields[fieldName];
	      if (!this.presentFieldValid(fields, fieldName)) {
	        return false;
	      }
	    }
	    return true;
	  };

	  Validator.prototype.requiredFieldsPresent = function(fields) {
	    var __, fieldName, ref;
	    ref = this._fieldProps;
	    for (fieldName in ref) {
	      __ = ref[fieldName];
	      if (!this.requiredFieldPresent(fields, fieldName)) {
	        return false;
	      }
	    }
	    return true;
	  };

	  Validator.prototype.preprocessFields = function(fields) {
	    var fieldName, oldV, preprocess, processedFields, ref, value;
	    processedFields = null;
	    ref = this._fieldProps;
	    for (fieldName in ref) {
	      preprocess = ref[fieldName].preprocess;
	      if (preprocess && ((value = fields[fieldName]) != null)) {
	        if ((v = preprocess(oldV = fields[fieldName])) !== oldV) {
	          processedFields || (processedFields = shallowClone(fields));
	          processedFields[fieldName] = v;
	        }
	      }
	    }
	    return processedFields || fields;
	  };

	  Validator.prototype.invalidFields = function(fields) {
	    return select(fields, (function(_this) {
	      return function(key, value) {
	        return !_this.presentFieldValid(fields, key);
	      };
	    })(this));
	  };

	  Validator.prototype.missingFields = function(fields) {
	    fields = merge(this._requiredFieldsMap, fields);
	    return select(fields, (function(_this) {
	      return function(key, value) {
	        return !_this.requiredFieldPresent(fields, key);
	      };
	    })(this));
	  };

	  Validator.prototype._addField = function(field, options) {
	    return this._fieldProps[field] = normalizeFieldProps(options);
	  };

	  return Validator;

	})(BaseObject);


/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = {
		"author": "Shane Brinkman-Davis Delamore, Imikimi LLC",
		"dependencies": {
			"atob": "^2.0.3",
			"chai": "^3.5.0",
			"coffee-loader": "^0.7.2",
			"coffee-script": "^1.11.1",
			"commander": "^2.9.0",
			"css-loader": "^0.23.1",
			"json-loader": "^0.5.4",
			"mocha": "^2.5.3",
			"neptune-namespaces": "^1.4.0",
			"promise-polyfill": "^6.0.2",
			"script-loader": "^0.7.0",
			"sourcemapped-stacktrace": "^1.1.3",
			"style-loader": "^0.13.1",
			"webpack": "^1.13.2",
			"webpack-dev-server": "^1.16.2"
		},
		"description": "Foundation classes for the Art framework. Javascript extensions.",
		"license": "ISC",
		"name": "art-foundation",
		"scripts": {
			"dev": "neptune-namespaces --std; webpack-dev-server -d --progress",
			"hot": "neptune-namespaces --std; webpack-dev-server --hot --inline --progress",
			"nn": "neptune-namespaces --std",
			"nodeTest": "neptune-namespaces --std;mocha -u tdd --compilers coffee:coffee-script/register",
			"test": "neptune-namespaces --std; webpack-dev-server -d --progress"
		},
		"version": "1.17.2"
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(103).includeInNamespace(__webpack_require__(104)).addModules({
	  Cookie: __webpack_require__(105),
	  DomElementFactories: __webpack_require__(2),
	  Dom: __webpack_require__(106),
	  File: __webpack_require__(107)
	});


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var Browser, Foundation,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(21);

	module.exports = Foundation.Browser || Foundation.addNamespace('Browser', Browser = (function(superClass) {
	  extend(Browser, superClass);

	  function Browser() {
	    return Browser.__super__.constructor.apply(this, arguments);
	  }

	  return Browser;

	})(Neptune.Base));


/***/ },
/* 104 */
/***/ function(module, exports) {

	var Browser;

	module.exports = Browser = (function() {
	  var browserIsMobile, isMobileBrowserRegExp1, isMobileBrowserRegExp2;

	  function Browser() {}

	  isMobileBrowserRegExp1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;

	  isMobileBrowserRegExp2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|agent wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|agent|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)agent|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[agent-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(agent|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-agent|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;

	  browserIsMobile = null;

	  Browser.isMobileBrowser = function() {
	    var agent, check;
	    if (browserIsMobile != null) {
	      return browserIsMobile;
	    }
	    check = false;
	    agent = navigator.userAgent || navigator.vendor || window.opera;
	    return browserIsMobile = !!(isMobileBrowserRegExp1.test(agent) || isMobileBrowserRegExp2.test(agent.substr(0, 4)));
	  };

	  return Browser;

	})();


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, ClassSystem, Cookie, StandardLib, getCookie, isPlainArray, isPlainObject, isString, log, setCookie,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	StandardLib = __webpack_require__(24);

	ClassSystem = __webpack_require__(72);

	log = StandardLib.log, isString = StandardLib.isString, isPlainArray = StandardLib.isPlainArray, isPlainObject = StandardLib.isPlainObject;

	BaseObject = ClassSystem.BaseObject;

	setCookie = function(cookieName, cookieValue, arg) {
	  var cookieString, d, expires, path;
	  expires = arg.expires, path = arg.path;
	  if (!isString(cookieValue)) {
	    if (!(isPlainArray(cookieValue) || isPlainObject(cookieValue))) {
	      throw new Error("cookieValue must be a string, array or object");
	    }
	    cookieValue = JSON.stringify(cookieValue);
	  }
	  cookieString = cookieName + "=" + cookieValue;
	  if (expires) {
	    d = new Date();
	    d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000);
	    cookieString += "; expires=" + (d.toUTCString());
	  }
	  if (path) {
	    cookieString += "; path=" + path;
	  }
	  return document.cookie = cookieString;
	};

	getCookie = function(cookieName) {
	  var c, ca, i, len, name, value;
	  name = cookieName + "=";
	  ca = document.cookie.split(';');
	  for (i = 0, len = ca.length; i < len; i++) {
	    c = ca[i];
	    while (' ' === c.charAt(0)) {
	      c = c.substring(1);
	    }
	    if (0 === c.indexOf(name)) {
	      value = c.substring(name.length, c.length);
	      if (value.match(/^[{[]/)) {
	        value = JSON.parse(value);
	      }
	      return value;
	    }
	  }
	  return "";
	};

	module.exports = Cookie = (function(superClass) {
	  extend(Cookie, superClass);

	  function Cookie() {
	    return Cookie.__super__.constructor.apply(this, arguments);
	  }

	  Cookie.set = function(name, value, options) {
	    return setCookie(name, value, options);
	  };

	  Cookie.get = function(name) {
	    return getCookie(name);
	  };

	  Cookie.remove = function(name, options) {
	    return setCookie(name, {
	      path: options.path,
	      expires: -1
	    });
	  };

	  return Cookie;

	})(BaseObject);


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var Dom, DomElementFactories, isString;

	DomElementFactories = __webpack_require__(2);

	isString = __webpack_require__(24).isString;

	module.exports = Dom = (function() {
	  function Dom() {}

	  Dom.createElementFromHtml = function(html) {
	    var div;
	    div = document.createElement('div');
	    div.innerHTML = html;
	    return div.firstChild;
	  };

	  Dom.createDomElementFactories = DomElementFactories.createDomElementFactories;

	  Dom.getDevicePixelRatio = function() {
	    return ((self.devicePixelRatio != null) && self.devicePixelRatio) || 1;
	  };

	  Dom.zIndex = function(target, setZIndex) {
	    var element, value;
	    if (!(target instanceof HTMLElement)) {
	      target = document.getElementById(target);
	    }
	    if (setZIndex !== void 0) {
	      return target.style.zIndex = setZIndex;
	    }
	    element = target;
	    while (element && element !== document) {
	      switch (element.style.position) {
	        case "absolute":
	        case "relative":
	        case "fixed":
	          value = parseInt(element.style.zIndex);
	          if (value < 0 || value > 0) {
	            return value;
	          }
	      }
	      element = element.parentElement;
	    }
	    return 0;
	  };

	  Dom.domElementOffset = function(element) {
	    var body, box, clientLeft, clientTop, documentElement, left, scrollLeft, scrollTop, top;
	    box = element.getBoundingClientRect();
	    body = document.body, documentElement = document.documentElement;
	    scrollTop = window.pageYOffset || documentElement.scrollTop || body.scrollTop;
	    scrollLeft = window.pageXOffset || documentElement.scrollLeft || body.scrollLeft;
	    clientTop = documentElement.clientTop || body.clientTop || 0;
	    clientLeft = documentElement.clientLeft || body.clientLeft || 0;
	    top = box.top + scrollTop - clientTop;
	    left = box.left + scrollLeft - clientLeft;
	    return {
	      top: Math.round(top),
	      left: Math.round(left)
	    };
	  };

	  return Dom;

	})();


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var File, Promise, StandardLib, createElementFromHtml;

	StandardLib = __webpack_require__(24);

	createElementFromHtml = __webpack_require__(106).createElementFromHtml;

	Promise = StandardLib.Promise;

	module.exports = File = (function() {
	  function File() {}

	  File.request = function(options) {
	    if (options == null) {
	      options = {};
	    }
	    return new Promise(function(resolve, reject) {
	      var accept, body, fileInput, multiple, onChange, ref;
	      accept = options.accept, multiple = options.multiple, onChange = options.onChange;
	      if ((ref = this.hiddenDivForFileInput) != null) {
	        ref.parentNode.removeChild(this.hiddenDivForFileInput);
	      }
	      this.hiddenDivForFileInput = createElementFromHtml("<div style='height: 0px;width: 0px; overflow:hidden; position:absolute;'/>");
	      body = document.body;
	      fileInput = createElementFromHtml("<input type='file' " + (accept ? 'accept=' + accept : void 0) + " " + (multiple ? 'multiple=true' : void 0) + "/>");
	      this.hiddenDivForFileInput.appendChild(fileInput);
	      body.appendChild(this.hiddenDivForFileInput);
	      fileInput.onchange = function(e) {
	        var file, fileList, fileSizes, fileTypes;
	        fileList = (function() {
	          var i, len, ref1, results;
	          ref1 = fileInput.files;
	          results = [];
	          for (i = 0, len = ref1.length; i < len; i++) {
	            file = ref1[i];
	            results.push(file);
	          }
	          return results;
	        })();
	        fileTypes = (function() {
	          var i, len, results;
	          results = [];
	          for (i = 0, len = fileList.length; i < len; i++) {
	            file = fileList[i];
	            results.push(file.type);
	          }
	          return results;
	        })();
	        fileSizes = (function() {
	          var i, len, results;
	          results = [];
	          for (i = 0, len = fileList.length; i < len; i++) {
	            file = fileList[i];
	            results.push(file.size);
	          }
	          return results;
	        })();
	        if (fileList.length > 0 && fileList[0]) {
	          onChange && onChange(fileList);
	          return resolve(fileList);
	        } else {
	          return reject("no files returned");
	        }
	      };
	      return fileInput.click();
	    });
	  };

	  return File;

	})();


/***/ }
/******/ ]);