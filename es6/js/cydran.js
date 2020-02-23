/*!
 * v0.0.57
 * Cydran <http://cydran.io/>
 * Copyright The Cydran Team and other contributors <http://cydran.io/>
 * Released under MIT license <http://cydran.io/license>
 * Based on Lodash 4.17.15 <https://lodash.com/license>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cydran"] = factory();
	else
		root["cydran"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var PubSub_1 = __importDefault(__webpack_require__(13));
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var ValidationRegExp_1 = __webpack_require__(8);
var ParamUtils_1 = __webpack_require__(40);
var Modules_1 = __webpack_require__(6);
var Constants_1 = __webpack_require__(4);
var GuardGenerator_1 = __importDefault(__webpack_require__(20));
var requireNotNull = ObjectUtils_1.default.requireNotNull;
var requireValid = ObjectUtils_1.default.requireValid;
/**
 * The piece of code between the HTMLElement and the Mvvm
 * @type M {@link ModelMediator}
 * @type E extends HTMLElement
 * @implements {@link Disposable}
 */
var ElementMediator = /** @class */ (function () {
    function ElementMediator(dependencies, propagation) {
        this.____internal$$cydran____ = requireNotNull(dependencies, "dependencies");
        this.logger = LoggerFactory_1.default.getLogger("ElementMediator: " + dependencies.prefix);
        this.domListeners = {};
        this.pubSub = new PubSub_1.default(this, this.getModule());
        this.params = null;
        this.propagation = propagation;
        this.guard = GuardGenerator_1.default.INSTANCE.generate();
    }
    /**
     * Dispose of ElementMediator when released.
     * + All event listeners will be removed.
     * + This element mediator will be unwired from any other DOM entanglements
     * + The mediator reference to the model is released/nulled
     * + Any value representation of this element mediator is released/nulled
     * + The [[Mvvm|mvvm]] refernce is released/nulled
     * + The parental reference is released/nulled
     */
    ElementMediator.prototype.dispose = function () {
        this.removeDomListeners();
        this.unwire();
        this.____internal$$cydran____ = null;
        this.mediator = null;
    };
    /**
     * Initialize this element mediator.
     */
    ElementMediator.prototype.init = function () {
        this.mediator = this.mediate(this.getExpression());
        this.wire();
    };
    /**
     * Get the active module instance reference by id
     * @return U
     */
    ElementMediator.prototype.get = function (id) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        return this.moduleInstance.get(id);
    };
    /**
     * Set the [[Module|module]] instance reference
     * @param {Module} moduleInstance
     */
    ElementMediator.prototype.setModule = function (moduleInstance) {
        this.moduleInstance = requireNotNull(moduleInstance, "moduleInstance");
    };
    /**
     * [message description]
     * @param {string} channelName [description]
     * @param {string} messageName [description]
     * @param {any}    payload     [description]
     */
    ElementMediator.prototype.message = function (channelName, messageName, payload) {
        requireNotNull(channelName, "channelName");
        requireNotNull(messageName, "messageName");
        var actualPayload = (payload === null || payload === undefined) ? {} : payload;
        this.pubSub.message(channelName, messageName, actualPayload);
    };
    /**
     * Broadcast a message
     * @param {string} channelName [description]
     * @param {string} messageName [description]
     * @param {any}    payload     [description]
     */
    ElementMediator.prototype.broadcast = function (channelName, messageName, payload) {
        requireNotNull(channelName, "channelName");
        requireNotNull(messageName, "messageName");
        var actualPayload = (payload === null || payload === undefined) ? {} : payload;
        this.getModule().broadcast(channelName, messageName, actualPayload);
    };
    /**
     * Broadcast a message in the Global context
     * @param {string} channelName [description]
     * @param {string} messageName [description]
     * @param {any}    payload     [description]
     */
    ElementMediator.prototype.broadcastGlobally = function (channelName, messageName, payload) {
        requireNotNull(channelName, "channelName");
        requireNotNull(messageName, "messageName");
        var actualPayload = (payload === null || payload === undefined) ? {} : payload;
        Modules_1.Modules.broadcast(channelName, messageName, actualPayload);
    };
    ElementMediator.prototype.on = function (messageName) {
        var _this = this;
        requireNotNull(messageName, "messageName");
        return {
            forChannel: function (channelName) {
                requireNotNull(channelName, "channelName");
                return {
                    invoke: function (target) {
                        requireNotNull(target, "target");
                        _this.pubSub.on(messageName).forChannel(channelName).invoke(function (payload) {
                            target.apply(_this, [payload]);
                        });
                    }
                };
            },
            invoke: function (target) {
                requireNotNull(target, "target");
                _this.pubSub.on(messageName).forChannel(Constants_1.INTERNAL_CHANNEL_NAME).invoke(function (payload) {
                    target.apply(_this, [payload]);
                });
            }
        };
    };
    ElementMediator.prototype.requestMediatorSources = function (sources) {
        // Intentionally do nothing by default
    };
    ElementMediator.prototype.getParentGuard = function () {
        return this.____internal$$cydran____.mvvm.getGuard();
    };
    ElementMediator.prototype.getGuard = function () {
        return this.guard;
    };
    ElementMediator.prototype.requestMediators = function (consumer) {
        // Intentionally do nothing by default
    };
    ElementMediator.prototype.hasPropagation = function () {
        return this.propagation;
    };
    ElementMediator.prototype.getParams = function () {
        if (this.params === null) {
            this.params = ParamUtils_1.extractAttributes(this.getPrefix(), this.getEl());
        }
        return this.params;
    };
    ElementMediator.prototype.getModelFn = function () {
        return this.____internal$$cydran____.mvvm.getModelFn();
    };
    ElementMediator.prototype.getExternalFn = function () {
        return this.____internal$$cydran____.mvvm.getExternalFn();
    };
    ElementMediator.prototype.bridge = function (name) {
        var _this = this;
        requireNotNull(name, "name");
        var listener = function (event) {
            _this.message("dom", name, event);
        };
        if (!this.domListeners[name]) {
            this.domListeners[name] = listener;
            this.getEl().addEventListener(name, listener, false);
        }
    };
    /**
     * Get the associated {HTMLElement html element} of this element mediator.
     * @return {HTMLElement} [description]
     */
    ElementMediator.prototype.getEl = function () {
        return this.____internal$$cydran____.el;
    };
    /**
     * [getModule description]
     * @return {Module} [description]
     */
    ElementMediator.prototype.getModule = function () {
        return this["moduleInstance"];
    };
    /**
     * Gets the prefix.
     * @return the prefix
     */
    ElementMediator.prototype.getPrefix = function () {
        return this.____internal$$cydran____.prefix;
    };
    /**
     * [mediate description]
     * @param  {string}        expression [description]
     * @return {ModelMediator}            [description]
     */
    ElementMediator.prototype.mediate = function (expression) {
        requireNotNull(expression, "expression");
        return this.____internal$$cydran____.mvvm.mediate(expression);
    };
    /**
     * [getModel description]
     * @return {any} [description]
     */
    ElementMediator.prototype.getModel = function () {
        return this.____internal$$cydran____.model;
    };
    /**
     * [getParent description]
     * @return {Component} [description]
     */
    ElementMediator.prototype.getParent = function () {
        return this.____internal$$cydran____.parent.getComponent();
    };
    /**
     * [getMediator description]
     * @return {ModelMediator} [description]
     */
    ElementMediator.prototype.getModelMediator = function () {
        return this.mediator;
    };
    ElementMediator.prototype.$apply = function (fn, args) {
        requireNotNull(fn, "fn");
        requireNotNull(args, "args");
        if (this.____internal$$cydran____ && this.____internal$$cydran____.mvvm) {
            this.____internal$$cydran____.mvvm.$apply(fn, args);
        }
    };
    /**
     * Get the expression specified
     * @return {string} [description]
     */
    ElementMediator.prototype.getExpression = function () {
        return this.____internal$$cydran____.expression;
    };
    /**
     * Gets the logger.
     * @return {Logger} logger instance
     */
    ElementMediator.prototype.getLogger = function () {
        return this.logger;
    };
    ElementMediator.prototype.removeDomListeners = function () {
        for (var name_1 in this.domListeners) {
            if (!this.domListeners.hasOwnProperty(name_1)) {
                continue;
            }
            var listener = this.domListeners[name_1];
            this.getEl().removeEventListener(name_1, listener);
        }
        this.domListeners = {};
    };
    return ElementMediator;
}());
exports.default = ElementMediator;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerImpl_1 = __importDefault(__webpack_require__(18));
var LoggerServiceImpl_1 = __importDefault(__webpack_require__(19));
var LoggerFactory = /** @class */ (function () {
    function LoggerFactory() {
    }
    /**
     * Get the named logger
     * @param name of the associated logger
     */
    LoggerFactory.getLogger = function (name) {
        return new LoggerImpl_1.default(name, LoggerServiceImpl_1.default.INSTANCE);
    };
    return LoggerFactory;
}());
exports.default = LoggerFactory;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var Factories = /** @class */ (function () {
    function Factories() {
    }
    Factories.register = function (name, supportedTags, elementMediatorClass) {
        ObjectUtils_1.default.requireNotNull(name, "name");
        ObjectUtils_1.default.requireNotNull(supportedTags, "supportedTags");
        ObjectUtils_1.default.requireNotNull(elementMediatorClass, "elementMediatorClass");
        if (!Factories.factories[name]) {
            Factories.factories[name] = {};
        }
        for (var _i = 0, supportedTags_1 = supportedTags; _i < supportedTags_1.length; _i++) {
            var supportedTag = supportedTags_1[_i];
            Factories.factories[name][supportedTag] = elementMediatorClass;
        }
    };
    Factories.get = function (type) {
        return Factories.factories[type];
    };
    Factories.factories = {};
    return Factories;
}());
exports.default = Factories;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NullValueError_1 = __importDefault(__webpack_require__(17));
var ValidationError_1 = __importDefault(__webpack_require__(33));
/* tslint:disable */
var LARGE_ARRAY_SIZE = 200;
var FUNC_ERROR_TEXT = "Expected a function";
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG = 4;
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
var MAX_SAFE_INTEGER = 9007199254740991;
var argsTag = "[object Arguments]";
var arrayTag = "[object Array]";
var asyncTag = "[object AsyncFunction]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var nullTag = "[object Null]";
var objectTag = "[object Object]";
var promiseTag = "[object Promise]";
var proxyTag = "[object Proxy]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var symbolTag = "[object Symbol]";
var undefinedTag = "[object Undefined]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reFlags = /\w*$/;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var reIsUint = /^(?:0|[1-9]\d*)$/;
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
        typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
            typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
                typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
        typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
            typedArrayTags[errorTag] = typedArrayTags[funcTag] =
                typedArrayTags[mapTag] = typedArrayTags[numberTag] =
                    typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
                        typedArrayTags[setTag] = typedArrayTags[stringTag] =
                            typedArrayTags[weakMapTag] = false;
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
    cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
        cloneableTags[boolTag] = cloneableTags[dateTag] =
            cloneableTags[float32Tag] = cloneableTags[float64Tag] =
                cloneableTags[int8Tag] = cloneableTags[int16Tag] =
                    cloneableTags[int32Tag] = cloneableTags[mapTag] =
                        cloneableTags[numberTag] = cloneableTags[objectTag] =
                            cloneableTags[regexpTag] = cloneableTags[setTag] =
                                cloneableTags[stringTag] = cloneableTags[symbolTag] =
                                    cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
                                        cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
    cloneableTags[weakMapTag] = false;
var freeGlobal = typeof global === "object" && global && global.Object === Object && global;
var freeSelf = typeof self === "object" && self && self["Object"] === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var freeExports =  true && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module === "object" && module && !module["nodeType"] && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
function arrayEach(array, iteratee) {
    var length = array == null ? 0 : array.length;
    var index = -1;
    while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
            break;
        }
    }
    return array;
}
function arrayFilter(array, predicate) {
    var length = array == null ? 0 : array.length;
    var result = [];
    var index = -1;
    var resIndex = 0;
    while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
            result[resIndex++] = value;
        }
    }
    return result;
}
function arrayPush(array, values) {
    var length = values.length;
    var offset = array.length;
    var index = -1;
    while (++index < length) {
        array[offset + index] = values[index];
    }
    return array;
}
function arraySome(array, predicate) {
    var length = array == null ? 0 : array.length;
    var index = -1;
    while (++index < length) {
        if (predicate(array[index], index, array)) {
            return true;
        }
    }
    return false;
}
function baseTimes(n, iteratee) {
    var result = Array(n);
    var index = -1;
    while (++index < n) {
        result[index] = iteratee(index);
    }
    return result;
}
function cacheHas(cache, key) {
    return cache.has(key);
}
function getValue(object, key) {
    return object == null ? undefined : object[key];
}
function mapToArray(map) {
    var result = Array(map.size);
    var index = -1;
    map.forEach(function (value, key) {
        result[++index] = [key, value];
    });
    return result;
}
function overArg(func, transform) {
    return function (arg) {
        return func(transform(arg));
    };
}
function setToArray(set) {
    var result = Array(set.size);
    var index = -1;
    set.forEach(function (value) {
        result[++index] = value;
    });
    return result;
}
var context = root;
var arrayProto = Array.prototype;
var funcProto = Function.prototype;
var objectProto = Object.prototype;
var coreJsData = context["__core-js_shared__"];
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var maskSrcKey = (function () {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? ("Symbol(src)_1." + uid) : "";
}());
var nativeObjectToString = objectProto.toString;
var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
var Buffer = moduleExports ? context.Buffer : undefined;
var Symbol = context.Symbol;
var Uint8Array = context.Uint8Array;
var allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
var getPrototype = overArg(Object.getPrototypeOf, Object);
var objectCreate = Object.create;
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
var splice = arrayProto.splice;
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
var nativeKeys = overArg(Object.keys, Object);
var DataView = getNative(context, "DataView");
var Map = getNative(context, "Map");
var Promise = getNative(context, "Promise");
var Set = getNative(context, "Set");
var WeakMap = getNative(context, "WeakMap");
var nativeCreate = getNative(Object, "create");
var dataViewCtorString = toSource(DataView);
var mapCtorString = toSource(Map);
var promiseCtorString = toSource(Promise);
var setCtorString = toSource(Set);
var weakMapCtorString = toSource(WeakMap);
var symbolProto = Symbol ? Symbol.prototype : undefined;
var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
var baseCreate = (function () {
    function object() {
        // Intentionally do nothing
    }
    return function (proto) {
        if (!isObject(proto)) {
            return {};
        }
        if (objectCreate) {
            return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object();
        object.prototype = undefined;
        return result;
    };
}());
var Hash = /** @class */ (function () {
    function Hash(entries) {
        var index = -1;
        var length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    Hash.prototype.clear = function () {
        this.__DATA__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
    };
    Hash.prototype.delete = function (key) {
        var result = this.has(key) && delete this.__DATA__[key];
        this.size -= result ? 1 : 0;
        return result;
    };
    Hash.prototype.get = function (key) {
        var data = this.__DATA__;
        if (nativeCreate) {
            var result = data[key];
            return result === HASH_UNDEFINED ? undefined : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : undefined;
    };
    Hash.prototype.has = function (key) {
        var data = this.__DATA__;
        return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
    };
    Hash.prototype.set = function (key, value) {
        var data = this.__DATA__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
        return this;
    };
    return Hash;
}());
var ListCache = /** @class */ (function () {
    function ListCache(entries) {
        var index = -1;
        var length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    ListCache.prototype.clear = function () {
        this.__DATA__ = [];
        this.size = 0;
    };
    ListCache.prototype.delete = function (key) {
        var data = this.__DATA__;
        var index = assocIndexOf(data, key);
        if (index < 0) {
            return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
            data.pop();
        }
        else {
            splice.call(data, index, 1);
        }
        --this.size;
        return true;
    };
    ListCache.prototype.get = function (key) {
        var data = this.__DATA__;
        var index = assocIndexOf(data, key);
        return index < 0 ? undefined : data[index][1];
    };
    ListCache.prototype.has = function (key) {
        return assocIndexOf(this.__DATA__, key) > -1;
    };
    ListCache.prototype.set = function (key, value) {
        var data = this.__DATA__;
        var index = assocIndexOf(data, key);
        if (index < 0) {
            ++this.size;
            data.push([key, value]);
        }
        else {
            data[index][1] = value;
        }
        return this;
    };
    return ListCache;
}());
var MapCache = /** @class */ (function () {
    function MapCache(entries) {
        var index = -1;
        var length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    MapCache.prototype.clear = function () {
        this.size = 0;
        this.__DATA__ = {
            hash: new Hash(),
            map: new (Map || ListCache)(),
            string: new Hash(),
        };
    };
    MapCache.prototype.delete = function (key) {
        var result = getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
    };
    MapCache.prototype.get = function (key) {
        return getMapData(this, key).get(key);
    };
    MapCache.prototype.has = function (key) {
        return getMapData(this, key).has(key);
    };
    MapCache.prototype.set = function (key, value) {
        var data = getMapData(this, key);
        var size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
    };
    return MapCache;
}());
var SetCache = /** @class */ (function () {
    function SetCache(values) {
        var index = -1;
        var length = values == null ? 0 : values.length;
        this.__DATA__ = new MapCache();
        while (++index < length) {
            this.add(values[index]);
        }
    }
    SetCache.prototype.push = function (value) {
        return this.add(value);
    };
    SetCache.prototype.add = function (value) {
        this.__DATA__.set(value, HASH_UNDEFINED);
        return this;
    };
    SetCache.prototype.has = function (value) {
        return this.__DATA__.has(value);
    };
    return SetCache;
}());
var Stack = /** @class */ (function () {
    function Stack(entries) {
        var data = this.__DATA__ = new ListCache(entries);
        this.size = data.size;
    }
    Stack.prototype.clear = function () {
        this.__DATA__ = new ListCache();
        this.size = 0;
    };
    Stack.prototype.delete = function (key) {
        var data = this.__DATA__;
        var result = data["delete"](key);
        this.size = data.size;
        return result;
    };
    Stack.prototype.get = function (key) {
        return this.__DATA__.get(key);
    };
    Stack.prototype.has = function (key) {
        return this.__DATA__.has(key);
    };
    Stack.prototype.set = function (key, value) {
        var data = this.__DATA__;
        if (data instanceof ListCache) {
            var pairs = data.__DATA__;
            if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
                pairs.push([key, value]);
                this.size = ++data.size;
                return this;
            }
            data = this.__DATA__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
    };
    return Stack;
}());
function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value);
    var isArg = !isArr && isArguments(value);
    var isBuff = !isArr && !isArg && isBuffer(value);
    var isType = !isArr && !isArg && !isBuff && isTypedArray(value);
    var skipIndexes = isArr || isArg || isBuff || isType;
    var result = skipIndexes ? baseTimes(value.length, String) : [];
    var length = result.length;
    for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (
            // Safari 9 has enumerable `arguments.length` in strict mode.
            key == "length" ||
                // Node.js 0.10 has enumerable non-index properties on buffers.
                (isBuff && (key == "offset" || key == "parent")) ||
                // PhantomJS 2 has enumerable non-index properties on typed arrays.
                (isType && (key == "buffer" || key == "byteLength" || key == "byteOffset")) ||
                // Skip index properties.
                isIndex(key, length)))) {
            result.push(key);
        }
    }
    return result;
}
function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
        (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
    }
}
function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
        if (eq(array[length][0], key)) {
            return length;
        }
    }
    return -1;
}
function baseAssign(object, source) {
    return object && copyObject(source, keys(source), object);
}
function baseAssignIn(object, source) {
    return object && copyObject(source, keysIn(source), object);
}
function baseAssignValue(object, key, value) {
    if (key == "__proto__" && Object.defineProperty) {
        Object.defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            value: value,
            writable: true,
        });
    }
    else {
        object[key] = value;
    }
}
function baseClone(value, bitmask, customizer, key, object, stack) {
    var result;
    var isDeep = bitmask & CLONE_DEEP_FLAG;
    var isFlat = bitmask & CLONE_FLAT_FLAG;
    var isFull = bitmask & CLONE_SYMBOLS_FLAG;
    if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
        return result;
    }
    if (!isObject(value)) {
        return value;
    }
    var isArr = isArray(value);
    if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
            return copyArray(value, result);
        }
    }
    else {
        var tag = getTag(value);
        var isFunc = tag == funcTag || tag == genTag;
        if (isBuffer(value)) {
            return cloneBuffer(value, !!isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
            result = (isFlat || isFunc) ? {} : initCloneObject(value);
            if (!isDeep) {
                return isFlat
                    ? copySymbolsIn(value, baseAssignIn(result, value))
                    : copySymbols(value, baseAssign(result, value));
            }
        }
        else {
            if (!cloneableTags[tag]) {
                return object ? value : {};
            }
            result = initCloneByTag(value, tag, !!isDeep);
        }
    }
    // Check for circular references and return its corresponding clone.
    stack = (!stack) ? new Stack() : stack;
    var stacked = stack.get(value);
    if (stacked) {
        return stacked;
    }
    stack.set(value, result);
    if (isSet(value)) {
        value.forEach(function (subValue) {
            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
    }
    else if (isMap(value)) {
        value.forEach(function (subValue, key) {
            result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
    }
    var keysFunc = isFull ? (isFlat ? getAllKeysIn : getAllKeys) : (isFlat ? keysIn : keys);
    var props = isArr ? undefined : keysFunc(value);
    arrayEach(props || value, function (subValue, key) {
        if (props) {
            key = subValue;
            subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
}
function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
}
function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
        return true;
    }
    if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object);
    var othIsArr = isArray(other);
    var objTag = objIsArr ? arrayTag : getTag(object);
    var othTag = othIsArr ? arrayTag : getTag(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag;
    var othIsObj = othTag == objectTag;
    var isSameTag = objTag == othTag;
    if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
            return false;
        }
        objIsArr = true;
        objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
        stack = (!stack) ? new Stack() : stack;
        return (objIsArr || isTypedArray(object))
            ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
            : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__");
        var othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object;
            var othUnwrapped = othIsWrapped ? other.value() : other;
            stack = (!stack) ? new Stack() : stack;
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
    }
    if (!isSameTag) {
        return false;
    }
    stack = (!stack) ? new Stack() : stack;
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
function baseIsMap(value) {
    return isObjectLike(value) && getTag(value) == mapTag;
}
function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
        return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
}
function baseIsSet(value) {
    return isObjectLike(value) && getTag(value) == setTag;
}
function baseIsTypedArray(value) {
    return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseKeys(object) {
    if (!isPrototype(object)) {
        return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
            result.push(key);
        }
    }
    return result;
}
function baseKeysIn(object) {
    if (!isObject(object)) {
        return nativeKeysIn(object);
    }
    var isProto = isPrototype(object);
    var result = [];
    for (var key in object) {
        if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key);
        }
    }
    return result;
}
function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
        return buffer.slice();
    }
    var length = buffer.length;
    var ctor = buffer.constructor;
    var result = allocUnsafe ? allocUnsafe(length) : new ctor(length);
    buffer.copy(result);
    return result;
}
function cloneArrayBuffer(arrayBuffer) {
    var ctor = arrayBuffer["constructor"];
    var result = new ctor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
}
function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
}
function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
function copyArray(source, array) {
    var index = -1;
    var length = source.length;
    array = (!array) ? Array(length) : array;
    while (++index < length) {
        array[index] = source[index];
    }
    return array;
}
function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object = (isNew) ? {} : object;
    var index = -1;
    var length = props.length;
    while (++index < length) {
        var key = props[index];
        var newValue = customizer
            ? customizer(object[key], source[key], key, object, source)
            : undefined;
        if (newValue === undefined) {
            newValue = source[key];
        }
        if (isNew) {
            baseAssignValue(object, key, newValue);
        }
        else {
            assignValue(object, key, newValue);
        }
    }
    return object;
}
function copySymbols(source, object) {
    return copyObject(source, getSymbols(source), object);
}
function copySymbolsIn(source, object) {
    return copyObject(source, getSymbolsIn(source), object);
}
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
    var arrLength = array.length;
    var othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
        return stacked == other;
    }
    var index = -1;
    var result = true;
    var seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache() : undefined;
    stack.set(array, other);
    stack.set(other, array);
    var _loop_1 = function () {
        var arrValue = array[index];
        var othValue = other[index];
        var compared = void 0;
        if (customizer) {
            compared = isPartial
                ? customizer(othValue, arrValue, index, other, array, stack)
                : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
            if (compared) {
                return "continue";
            }
            result = false;
            return "break";
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
            if (!arraySome(other, function (othValue, othIndex) {
                if (!cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                }
            })) {
                result = false;
                return "break";
            }
        }
        else if (!(arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
            return "break";
        }
    };
    // Ignore non-index properties.
    while (++index < arrLength) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
}
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
        case dataViewTag:
            if ((object.byteLength != other.byteLength) ||
                (object.byteOffset != other.byteOffset)) {
                return false;
            }
            object = object.buffer;
            other = other.buffer;
        case arrayBufferTag:
            if ((object.byteLength != other.byteLength) ||
                !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                return false;
            }
            return true;
        case boolTag:
        case dateTag:
        case numberTag:
            // Coerce booleans to `1` or `0` and dates to milliseconds.
            // Invalid dates are coerced to `NaN`.
            return eq(+object, +other);
        case errorTag:
            return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
            // Coerce regexes to strings and treat strings, primitives and objects,
            // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
            // for more details.
            return object == (other + "");
        case mapTag:
            var convert = mapToArray;
        case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert = (!convert) ? setToArray : convert;
            if (object.size != other.size && !isPartial) {
                return false;
            }
            // Assume cyclic values are equal.
            var stacked = stack.get(object);
            if (stacked) {
                return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            // Recursively compare objects (susceptible to call stack limits).
            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result;
        case symbolTag:
            if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
    }
    return false;
}
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
    var objProps = getAllKeys(object);
    var objLength = objProps.length;
    var othProps = getAllKeys(other);
    var othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
        return false;
    }
    var index = objLength;
    while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
        }
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) {
        return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = !!isPartial;
    while (++index < objLength) {
        var key = objProps[index];
        var objValue = object[key];
        var othValue = other[key];
        var compared = void 0;
        if (customizer) {
            compared = isPartial
                ? customizer(othValue, objValue, key, other, object, stack)
                : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
            ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
            : compared)) {
            result = false;
            break;
        }
        skipCtor = (!skipCtor) ? key == "constructor" : skipCtor;
    }
    if (result && !skipCtor) {
        var objCtor = object.constructor;
        var othCtor = other.constructor;
        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ("constructor" in object && "constructor" in other) &&
            !(typeof objCtor == "function" && objCtor instanceof objCtor &&
                typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result = false;
        }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
}
function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
}
function getAllKeysIn(object) {
    return baseGetAllKeys(object, keysIn, getSymbolsIn);
}
function getMapData(map, key) {
    var data = map.__DATA__;
    return isKeyable(key) ? data[typeof key === "string" ? "string" : "hash"]
        : data.map;
}
function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
}
function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag);
    var tag = value[symToStringTag];
    var unmasked = false;
    try {
        value[symToStringTag] = undefined;
        unmasked = true;
    }
    catch (e) {
        // Intentionally do nothing
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag] = tag;
        }
        else {
            delete value[symToStringTag];
        }
    }
    return result;
}
var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
    if (object == null) {
        return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function (symbol) {
        return propertyIsEnumerable.call(object, symbol);
    });
};
var getSymbolsIn = !nativeGetSymbols ? stubArray : function (object) {
    var result = [];
    while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
    }
    return result;
};
var getTag = baseGetTag;
// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) !== dataViewTag) ||
    (Map && getTag(new Map()) !== mapTag) ||
    (Promise && getTag(Promise.resolve()) !== promiseTag) ||
    (Set && getTag(new Set()) !== setTag) ||
    (WeakMap && getTag(new WeakMap()) !== weakMapTag)) {
    getTag = function (value) {
        var result = baseGetTag(value);
        var Ctor = result === objectTag ? value.constructor : undefined;
        var ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
            switch (ctorString) {
                case dataViewCtorString: return dataViewTag;
                case mapCtorString: return mapTag;
                case promiseCtorString: return promiseTag;
                case setCtorString: return setTag;
                case weakMapCtorString: return weakMapTag;
            }
        }
        return result;
    };
}
function initCloneArray(array) {
    var length = array.length;
    var result = new array.constructor(length);
    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] === "string" && hasOwnProperty.call(array, "index")) {
        result.index = array.index;
        result.input = array.input;
    }
    return result;
}
function initCloneObject(object) {
    return (typeof object.constructor === "function" && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
}
function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
        case arrayBufferTag:
            return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
            return new Ctor(+object);
        case dataViewTag:
            return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
            return cloneTypedArray(object, isDeep);
        case mapTag:
            return new Ctor();
        case numberTag:
        case stringTag:
            return new Ctor(object);
        case regexpTag:
            return cloneRegExp(object);
        case setTag:
            return new Ctor();
        case symbolTag:
            return cloneSymbol(object);
    }
}
function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length &&
        (type === "number" ||
            (type !== "symbol" && reIsUint.test(value))) &&
        (value > -1 && value % 1 === 0 && value < length);
}
function isKeyable(value) {
    var type = typeof value;
    return (type === "string" || type === "number" || type === "symbol" || type === "boolean")
        ? (value !== "__proto__")
        : (value === null);
}
function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
}
function isPrototype(value) {
    var Ctor = value && value.constructor;
    var proto = (typeof Ctor === "function" && Ctor.prototype) || objectProto;
    return value === proto;
}
function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
        /* tslint:disable-next-line */
        for (var key in Object(object)) {
            result.push(key);
        }
    }
    return result;
}
function objectToString(value) {
    return nativeObjectToString.call(value);
}
function toSource(func) {
    if (func != null) {
        try {
            return funcToString.call(func);
        }
        catch (e) {
            // Intentionally do nothing
        }
        try {
            return (func + "");
        }
        catch (e) {
            // Intentionally do nothing
        }
    }
    return "";
}
function memoize(func, resolver) {
    if (typeof func !== "function" || (resolver != null && typeof resolver !== "function")) {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function () {
        var args = arguments;
        var key = resolver ? resolver.apply(this, args) : args[0];
        var cache = memoized["cache"];
        if (cache.has(key)) {
            return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized["cache"] = cache.set(key, result) || cache;
        return result;
    };
    memoized["cache"] = new (memoize.Cache || MapCache)();
    return memoized;
}
// Expose `MapCache`.
memoize.Cache = MapCache;
function cloneDeep(value) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
function eq(value, other) {
    return value === other || (value !== value && other !== other);
}
var isArguments = baseIsArguments(function () { return arguments; }()) ? baseIsArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArray = Array.isArray;
function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}
var isBuffer = nativeIsBuffer || stubFalse;
function isEqual(value, other) {
    return baseIsEqual(value, other);
}
function isFunction(value) {
    if (!isObject(value)) {
        return false;
    }
    var tag = baseGetTag(value);
    return tag === funcTag || tag === genTag || tag === asyncTag || tag === proxyTag;
}
function isLength(value) {
    return typeof value === "number" && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
}
function isObject(value) {
    var type = typeof value;
    return value != null && (type === "object" || type === "function");
}
function isObjectLike(value) {
    return value != null && typeof value === "object";
}
var isMap = baseIsMap;
var isSet = baseIsSet;
var isTypedArray = baseIsTypedArray;
function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
function stubArray() {
    return [];
}
function stubFalse() {
    return false;
}
var encodeHtmlMap = {
    '"': "&quot;",
    "&": "&amp;",
    "'": "&#39;",
    "<": "&lt;",
    ">": "&gt;",
};
function lookupEncodeHtmlMap(key) {
    return encodeHtmlMap[key];
}
function encodeHtml(source) {
    return (source === null) ? null : (source + "").replace(/[&"'<>]/g, lookupEncodeHtmlMap);
}
exports.default = {
    clone: function (source) {
        return cloneDeep(source);
    },
    equals: function (first, second) {
        return isEqual(first, second);
    },
    requireNotNull: function (value, name) {
        if (value === null || value === undefined) {
            throw new NullValueError_1.default(name + " shall not be null");
        }
        return value;
    },
    requireValid: function (value, name, regex) {
        if (value === null || value === undefined) {
            throw new NullValueError_1.default(name + " shall not be null");
        }
        if (!regex.test(value)) {
            throw new ValidationError_1.default(name + " must be valid");
        }
        return value;
    },
    isDefined: function (value) {
        return value !== null && value !== undefined;
    },
    encodeHtml: encodeHtml
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(16), __webpack_require__(32)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var INTERNAL_DIRECT_CHANNEL_NAME = "Cydran$$Direct$$Internal$$Channel";
exports.INTERNAL_DIRECT_CHANNEL_NAME = INTERNAL_DIRECT_CHANNEL_NAME;
var TEXT_NODE_TYPE = 3;
exports.TEXT_NODE_TYPE = TEXT_NODE_TYPE;
var MODULE_FIELD_NAME = "____internal$$cydran$$module____";
exports.MODULE_FIELD_NAME = MODULE_FIELD_NAME;
var INTERNAL_CHANNEL_NAME = "Cydran$$Internal$$Channel";
exports.INTERNAL_CHANNEL_NAME = INTERNAL_CHANNEL_NAME;
var COMPONENT_INTERNALS_FIELD_NAME = "____internal$$cydran____";
exports.COMPONENT_INTERNALS_FIELD_NAME = COMPONENT_INTERNALS_FIELD_NAME;
var DEFAULT_MODULE_KEY = "DEFAULT";
exports.DEFAULT_MODULE_KEY = DEFAULT_MODULE_KEY;
function NO_OP_FN() {
    // Intentionally do nothing
}
exports.NO_OP_FN = NO_OP_FN;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CydranError = /** @class */ (function (_super) {
    __extends(CydranError, _super);
    /**
     * Constructor
     *
     * @param msg string object specific to context
     * @param reps optional {key:value, <n^1>} object of named substitution values
     * @returns string filled in values in the mesage
     */
    function CydranError(msg, reps) {
        var _newTarget = this.constructor;
        var _this = _super.call(this) || this;
        _this.name = _newTarget.name;
        _this.message = (reps) ? CydranError.doMsgFilling(msg, reps) : msg;
        return _this;
    }
    CydranError.doMsgFilling = function (msg, reps) {
        return msg.replace(/%\w+%/g, function (all) { return (reps[all] + "") || all; });
    };
    return CydranError;
}(Error));
exports.CydranError = CydranError;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var ValidationRegExp_1 = __webpack_require__(8);
var Constants_1 = __webpack_require__(4);
var ScopeImpl_1 = __importDefault(__webpack_require__(10));
var Factories_1 = __importDefault(__webpack_require__(2));
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var Registry_1 = __webpack_require__(37);
var BrokerImpl_1 = __importDefault(__webpack_require__(39));
var Constants_2 = __webpack_require__(4);
var requireNotNull = ObjectUtils_1.default.requireNotNull;
var requireValid = ObjectUtils_1.default.requireValid;
var ModuleImpl = /** @class */ (function () {
    function ModuleImpl(name, scope) {
        this.name = name;
        this.registry = new Registry_1.RegistryImpl();
        this.broker = new BrokerImpl_1.default();
        this.scope = new ScopeImpl_1.default();
        if (scope) {
            this.scope.setParent(scope);
        }
    }
    ModuleImpl.prototype.getLogger = function () {
        return LoggerFactory_1.default.getLogger(this.name);
    };
    ModuleImpl.prototype.getName = function () {
        return this.name;
    };
    ModuleImpl.prototype.associate = function () {
        var _this = this;
        var componentClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            componentClasses[_i] = arguments[_i];
        }
        componentClasses.forEach(function (componentClass) {
            requireNotNull(componentClass, "componentClass");
            componentClass["prototype"][Constants_2.MODULE_FIELD_NAME] = _this;
        });
        return this;
    };
    ModuleImpl.prototype.disassociate = function () {
        var _this = this;
        var componentClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            componentClasses[_i] = arguments[_i];
        }
        componentClasses.forEach(function (componentClass) {
            requireNotNull(componentClass, "componentClass");
            componentClass["prototype"][Constants_2.MODULE_FIELD_NAME] = _this;
        });
        return this;
    };
    ModuleImpl.prototype.clear = function () {
        return this;
    };
    ModuleImpl.prototype.broadcast = function (channelName, messageName, payload) {
        requireNotNull(channelName, "channelName");
        requireNotNull(messageName, "messageName");
        this.broker.broadcast(channelName, messageName, payload);
    };
    ModuleImpl.prototype.message = function (channelName, messageName, payload) {
        requireNotNull(channelName, "channelName");
        requireNotNull(messageName, "messageName");
        var actualPayload = (payload === null || payload === undefined) ? {} : payload;
        if (channelName === Constants_2.INTERNAL_DIRECT_CHANNEL_NAME) {
            if (messageName === "addListener") {
                this.addListener(actualPayload);
            }
            else if (messageName === "removeListener") {
                this.removeListener(actualPayload);
            }
        }
    };
    ModuleImpl.prototype.get = function (id) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        var result = this.registry.get(id);
        if (!result) {
            result = Modules.get(id);
        }
        return result;
    };
    ModuleImpl.prototype.getLocal = function (id) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        return this.registry.get(id);
    };
    ModuleImpl.prototype.getScope = function () {
        return this.scope;
    };
    ModuleImpl.prototype.registerConstant = function (id, instance) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        requireNotNull(instance, "instance");
        this.registry.registerConstant(id, instance);
        return this;
    };
    ModuleImpl.prototype.registerPrototype = function (id, classInstance, dependencies) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        requireNotNull(classInstance, "classInstance");
        this.registry.registerPrototype(id, classInstance, dependencies);
        return this;
    };
    ModuleImpl.prototype.registerSingleton = function (id, classInstance, dependencies) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        requireNotNull(classInstance, "classInstance");
        this.registry.registerSingleton(id, classInstance, dependencies);
        return this;
    };
    ModuleImpl.prototype.addStrategy = function (strategy) {
        requireNotNull(strategy, "strategy");
        this.registry.addStrategy(strategy);
        return this;
    };
    ModuleImpl.prototype.expose = function (id) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        ModuleImpl.ALIASES[id] = this.name;
        return this;
    };
    ModuleImpl.prototype.addListener = function (listener) {
        this.broker.addListener(listener);
    };
    ModuleImpl.prototype.removeListener = function (listener) {
        this.broker.removeListener(listener);
    };
    ModuleImpl.prototype.logError = function (e) {
        this.getLogger().error(e);
    };
    ModuleImpl.ALIASES = {};
    return ModuleImpl;
}());
exports.ModuleImpl = ModuleImpl;
var Modules = /** @class */ (function () {
    function Modules() {
    }
    Modules.getModule = function (name) {
        requireValid(name, "name", ValidationRegExp_1.VALID_ID);
        if (!Modules.modules[name]) {
            Modules.modules[name] = new ModuleImpl(name, Modules.DEFAULT_MODULE.getScope());
        }
        return Modules.modules[name];
    };
    Modules.getDefaultModule = function () {
        return this.getModule(Constants_1.DEFAULT_MODULE_KEY);
    };
    Modules.forEach = function (fn) {
        requireNotNull(fn, "fn");
        for (var name_1 in Modules.modules) {
            if (!Modules.modules.hasOwnProperty(name_1)) {
                continue;
            }
            var current = Modules.modules[name_1];
            fn(current);
        }
    };
    Modules.broadcast = function (channelName, messageName, payload) {
        Modules.forEach(function (instance) { return instance.broadcast(channelName, messageName, payload); });
    };
    Modules.registerConstant = function (id, instance) {
        this.getDefaultModule().registerConstant(id, instance);
    };
    Modules.registerPrototype = function (id, classInstance, dependencies) {
        this.getDefaultModule().registerPrototype(id, classInstance, dependencies);
    };
    Modules.registerSingleton = function (id, classInstance, dependencies) {
        this.getDefaultModule().registerSingleton(id, classInstance, dependencies);
    };
    Modules.registerElementMediator = function (name, supportedTags, elementMediatorClass) {
        Factories_1.default.register(name, supportedTags, elementMediatorClass);
    };
    Modules.getScope = function () {
        return this.getDefaultModule().getScope();
    };
    Modules.get = function (id) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        var result = null;
        var moduleId = ModuleImpl.ALIASES[id];
        if (moduleId) {
            result = Modules.getModule(id).getLocal(id);
        }
        if (!result) {
            result = Modules.DEFAULT_MODULE.getLocal(id);
        }
        return result;
    };
    Modules.DEFAULT_MODULE = new ModuleImpl(Constants_1.DEFAULT_MODULE_KEY);
    Modules.modules = {
        DEFAULT: Modules.DEFAULT_MODULE
    };
    return Modules;
}());
exports.Modules = Modules;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var Properties = /** @class */ (function () {
    function Properties() {
    }
    Properties.setWindow = function (window) {
        Properties.window = window;
    };
    Properties.getWindow = function () {
        return Properties.window;
    };
    return Properties;
}());
Properties.setWindow(global["window"]);
exports.default = Properties;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(16)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VALID_ID = /^[a-zA-Z][a-zA-Z0-9\$\@\-\_\.\:\\\/]*$/m;
exports.VALID_ID = VALID_ID;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var requireNotNull = ObjectUtils_1.default.requireNotNull;
var ComponentConfigImpl = /** @class */ (function () {
    function ComponentConfigImpl() {
        this.metadata = {};
        this.attributes = [];
        this.prefix = "c";
        this.topComponentIds = [];
        this.bottomComponentIds = [];
        this.parentModelFn = null;
    }
    ComponentConfigImpl.prototype.getMetadata = function (key) {
        return this.metadata[key] ? this.metadata[key] : null;
    };
    ComponentConfigImpl.prototype.getPrefix = function () {
        return this.prefix;
    };
    ComponentConfigImpl.prototype.getAttributes = function () {
        return this.attributes.slice();
    };
    ComponentConfigImpl.prototype.withMetadata = function (name, value) {
        this.metadata[name] = value;
    };
    ComponentConfigImpl.prototype.withAttribute = function (name) {
        this.attributes.push(name);
    };
    ComponentConfigImpl.prototype.withPrefix = function (prefix) {
        this.prefix = prefix;
    };
    ComponentConfigImpl.prototype.setTopComponentIds = function (topComponentIds) {
        this.topComponentIds = topComponentIds;
    };
    ComponentConfigImpl.prototype.setBottomComponentIds = function (bottomComponentIds) {
        this.bottomComponentIds = bottomComponentIds;
    };
    ComponentConfigImpl.prototype.getTopComponentIds = function () {
        return this.topComponentIds;
    };
    ComponentConfigImpl.prototype.getBottomComponentIds = function () {
        return this.bottomComponentIds;
    };
    ComponentConfigImpl.prototype.setParentModelFn = function (parentModelFn) {
        this.parentModelFn = parentModelFn;
    };
    ComponentConfigImpl.prototype.getParentModelFn = function () {
        return this.parentModelFn;
    };
    return ComponentConfigImpl;
}());
exports.ComponentConfigImpl = ComponentConfigImpl;
var ComponentConfigBuilder = /** @class */ (function () {
    function ComponentConfigBuilder() {
        this.instance = new ComponentConfigImpl();
    }
    ComponentConfigBuilder.prototype.withMetadata = function (name, value) {
        requireNotNull(name, "name");
        requireNotNull(value, "value");
        this.instance.withMetadata(name, value);
        return this;
    };
    ComponentConfigBuilder.prototype.withAttribute = function (name) {
        requireNotNull(name, "name");
        this.instance.withAttribute(name);
        return this;
    };
    ComponentConfigBuilder.prototype.withPrefix = function (prefix) {
        requireNotNull(prefix, "prefix");
        this.instance.withPrefix(prefix);
        return this;
    };
    ComponentConfigBuilder.prototype.build = function () {
        return this.instance;
    };
    return ComponentConfigBuilder;
}());
exports.ComponentConfigBuilder = ComponentConfigBuilder;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NullValueError_1 = __importDefault(__webpack_require__(17));
var ScopeError_1 = __importDefault(__webpack_require__(35));
var EXCLUSIONS = {
    e: "e",
    external: "external",
    i: "i",
    item: "item",
    m: "m",
    model: "model",
    p: "p",
    parent: "parent"
};
var VALID_KEY_REGEX = new RegExp(/^[a-zA-Z\$\_][a-zA-Z0-9\$\_]*$/);
var ScopeImpl = /** @class */ (function () {
    function ScopeImpl(restricted) {
        this.children = [];
        this.localItems = {};
        this.items = {};
        this.code = "";
        this.parent = null;
        this.restricted = (restricted === null || restricted === undefined) || restricted;
    }
    ScopeImpl.prototype.setParent = function (parent) {
        if (!parent) {
            return;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.parent = parent;
        this.parent.addChild(this);
        this.refresh();
    };
    ScopeImpl.prototype.addChild = function (child) {
        if (child) {
            this.children.push(child);
        }
    };
    ScopeImpl.prototype.removeChild = function (child) {
        var index = this.children.indexOf(child);
        if (index >= 0) {
            this.children.splice(index, 1);
        }
    };
    ScopeImpl.prototype.getItems = function () {
        return this.items;
    };
    ScopeImpl.prototype.getCode = function () {
        return this.code;
    };
    ScopeImpl.prototype.add = function (name, item) {
        this.checkName(name);
        this.localItems[name] = item;
        this.refresh();
        this.refreshChildren();
    };
    ScopeImpl.prototype.remove = function (name) {
        this.checkName(name);
        delete this.localItems[name];
        this.refresh();
        this.refreshChildren();
    };
    ScopeImpl.prototype.checkName = function (name) {
        if (name === null || name === undefined) {
            throw new NullValueError_1.default("name must not be null or undefined.");
        }
        if (!VALID_KEY_REGEX.test(name)) {
            throw new ScopeError_1.default("Only objects with names containing letters and numbers and starting with a letter are allowed.");
        }
        if (this.restricted && EXCLUSIONS[name]) {
            throw new ScopeError_1.default(name + " is a reserved name in the scope.");
        }
    };
    ScopeImpl.prototype.refresh = function () {
        this.items = {};
        if (this.parent) {
            var parentItems = this.parent.getItems();
            for (var key in parentItems) {
                if (parentItems.hasOwnProperty(key)) {
                    this.items[key] = parentItems[key];
                }
            }
        }
        for (var key in this.localItems) {
            if (this.localItems.hasOwnProperty(key)) {
                this.items[key] = this.localItems[key];
            }
        }
        this.refreshCode();
    };
    ScopeImpl.prototype.refreshCode = function () {
        this.code = "";
        for (var key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                var statement = "var " + key + " = arguments[0]['" + key + "'];\n";
                this.code += statement;
            }
        }
    };
    ScopeImpl.prototype.refreshChildren = function () {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.refresh();
        }
    };
    return ScopeImpl;
}());
exports.default = ScopeImpl;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Level;
(function (Level) {
    Level[Level["TRACE"] = 0] = "TRACE";
    Level[Level["DEBUG"] = 1] = "DEBUG";
    Level[Level["INFO"] = 2] = "INFO";
    Level[Level["WARN"] = 3] = "WARN";
    Level[Level["ERROR"] = 4] = "ERROR";
    Level[Level["FATAL"] = 5] = "FATAL";
    Level[Level["DISABLED"] = 6] = "DISABLED";
})(Level || (Level = {}));
exports.default = Level;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var Constants_1 = __webpack_require__(4);
var ComponentInternalsImpl_1 = __importDefault(__webpack_require__(15));
var Modules_1 = __webpack_require__(6);
var requireNotNull = ObjectUtils_1.default.requireNotNull;
/**
 * Core class for Cydran
 */
var Component = /** @class */ (function () {
    /**
     * Constructor
     * @param template - string value representation of a template
     * @param config - optional {@link ComponentConfig} argument
     */
    function Component(template, config) {
        this.____internal$$cydran$$init____(template, config);
    }
    /**
     * Get the {@link MetadataContinuation} of the {@link Component}
     */
    Component.prototype.metadata = function () {
        var internal = this.____internal$$cydran____;
        return {
            get: function (name) { return internal.getMetadata(name); },
            has: function (name) { return internal.hasMetadata(name); }
        };
    };
    /**
     * Component has a {@link Region}
     * @returns boolean - true | false
     */
    Component.prototype.hasRegion = function (name) {
        return this.____internal$$cydran____.hasRegion(name);
    };
    /**
     * Set a child component
     * @param name - string name value of the child {@link Component}
     * @param component - the {@link Component} reference
     */
    Component.prototype.setChild = function (name, component) {
        this.____internal$$cydran____.setChild(name, component);
    };
    Component.prototype.setChildFromRegistry = function (name, componentName, defaultComponentName) {
        this.____internal$$cydran____.setChildFromRegistry(name, componentName, defaultComponentName);
    };
    Component.prototype.message = function (channelName, messageName, payload) {
        this.____internal$$cydran____.message(channelName, messageName, payload);
    };
    Component.prototype.dispose = function () {
        this.____internal$$cydran____.dispose();
    };
    Component.prototype.getParent = function () {
        return this.____internal$$cydran____.getParent();
    };
    Component.prototype.getEl = function () {
        return this.____internal$$cydran____.getEl();
    };
    Component.prototype.get = function (id) {
        return this.____internal$$cydran____.get(id);
    };
    Component.prototype.scope = function () {
        return this.____internal$$cydran____.getScope();
    };
    Component.prototype.reset = function () {
        this.init();
    };
    Component.prototype.getPrefix = function () {
        return this.____internal$$cydran____.getPrefix();
    };
    Component.prototype.isConnected = function () {
        return this.____internal$$cydran____.isConnected();
    };
    Component.prototype.getId = function () {
        return this.____internal$$cydran____.getGuard();
    };
    Component.prototype.init = function () {
        // Intentionally do nothing by default
    };
    Component.prototype.getItem = function () {
        return this.____internal$$cydran____.getData();
    };
    Component.prototype.getExternals = function () {
        return this.____internal$$cydran____.getExternalCache();
    };
    Component.prototype.broadcast = function (channelName, messageName, payload) {
        this.____internal$$cydran____.broadcast(channelName, messageName, payload);
    };
    Component.prototype.broadcastGlobally = function (channelName, messageName, payload) {
        this.____internal$$cydran____.broadcastGlobally(channelName, messageName, payload);
    };
    Component.prototype.$apply = function (fn, args) {
        this.____internal$$cydran____.$apply(fn, args);
    };
    Component.prototype.watch = function (expression, target) {
        this.____internal$$cydran____.watch(expression, target);
    };
    Component.prototype.on = function (messageName) {
        var _this = this;
        requireNotNull(messageName, "messageName");
        return {
            forChannel: function (channelName) {
                requireNotNull(channelName, "channelName");
                return {
                    invoke: function (target) {
                        requireNotNull(target, "target");
                        _this.____internal$$cydran____.on(target, messageName, channelName);
                    }
                };
            },
            invoke: function (target) {
                requireNotNull(target, "target");
                _this.____internal$$cydran____.on(target, messageName, Constants_1.INTERNAL_CHANNEL_NAME);
            }
        };
    };
    Component.prototype.getLogger = function () {
        return this.____internal$$cydran____.getLogger();
    };
    Component.prototype.____internal$$cydran$$init____ = function (template, config) {
        this.____internal$$cydran____ = new ComponentInternalsImpl_1.default(this, template, config);
        this.____internal$$cydran____.init();
    };
    return Component;
}());
Component["prototype"][Constants_1.MODULE_FIELD_NAME] = Modules_1.Modules.DEFAULT_MODULE;
exports.default = Component;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ListenerImpl_1 = __importDefault(__webpack_require__(34));
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var Modules_1 = __webpack_require__(6);
var Constants_1 = __webpack_require__(4);
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var requireNotNull = ObjectUtils_1.default.requireNotNull;
// TODO - Refactor into common constants
var INTERNAL_DIRECT_CHANNEL_NAME = "Cydran$$Direct$$Internal$$Channel";
var PubSub = /** @class */ (function () {
    function PubSub(context, moduleInstance) {
        this.context = requireNotNull(context, "context");
        this.logger = LoggerFactory_1.default.getLogger("PubSub");
        this.globalEnabled = false;
        this.listeners = [];
        this.listenersByChannel = {};
        this.moduleInstance = (moduleInstance) ? moduleInstance : Modules_1.Modules.getModule("DEFAULT");
    }
    PubSub.prototype.message = function (channelName, messageName, payload) {
        requireNotNull(channelName, "channelName");
        requireNotNull(messageName, "messageName");
        var actualPayload = (payload === null || payload === undefined) ? {} : payload;
        if (INTERNAL_DIRECT_CHANNEL_NAME === channelName) {
            if (messageName === "enableGlobal") {
                this.enableGlobal();
            }
            else if (messageName === "disableGlobal") {
                this.disableGlobal();
            }
        }
        else {
            this.listeners.forEach(function (listener) {
                if (channelName === listener.getChannelName()) {
                    listener.receive(messageName, actualPayload);
                }
            });
        }
    };
    PubSub.prototype.broadcast = function (channelName, messageName, payload) {
        requireNotNull(channelName, "channelName");
        requireNotNull(messageName, "messageName");
        var actualPayload = (payload === null || payload === undefined) ? {} : payload;
        this.moduleInstance.broadcast(channelName, messageName, actualPayload);
    };
    PubSub.prototype.broadcastGlobally = function (channelName, messageName, payload) {
        Modules_1.Modules.broadcast(channelName, messageName, payload);
    };
    PubSub.prototype.dispose = function () {
        this.disableGlobal();
        this.listeners = [];
        this.listenersByChannel = {};
    };
    PubSub.prototype.on = function (messageName) {
        requireNotNull(messageName, "messageName");
        var mine = this;
        return {
            forChannel: function (channelName) {
                requireNotNull(channelName, "channelName");
                return {
                    invoke: function (target) {
                        requireNotNull(target, "target");
                        mine.listenTo(channelName, messageName, target);
                    }
                };
            },
            invoke: function (target) {
                requireNotNull(target, "target");
                mine.listenTo(Constants_1.INTERNAL_CHANNEL_NAME, messageName, target);
            }
        };
    };
    PubSub.prototype.enableGlobal = function () {
        if (this.globalEnabled) {
            return;
        }
        this.logger.trace("Enabling global");
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            this.moduleInstance.message(INTERNAL_DIRECT_CHANNEL_NAME, "addListener", listener);
        }
        this.globalEnabled = true;
    };
    PubSub.prototype.disableGlobal = function () {
        if (!this.globalEnabled) {
            return;
        }
        this.logger.trace("Disabling global");
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            this.moduleInstance.message(INTERNAL_DIRECT_CHANNEL_NAME, "removeListener", listener);
        }
        this.globalEnabled = false;
    };
    PubSub.prototype.listenTo = function (channel, messageName, target) {
        var listener = this.listenersByChannel[channel];
        if (!listener) {
            listener = new ListenerImpl_1.default(channel, this.context);
            if (this.globalEnabled) {
                this.moduleInstance.message(INTERNAL_DIRECT_CHANNEL_NAME, "addListener", listener);
            }
            this.listeners.push(listener);
        }
        listener.register(messageName, target);
    };
    PubSub.prototype.isGlobalEnabled = function () {
        return this.globalEnabled;
    };
    return PubSub;
}());
exports.default = PubSub;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Events = {
    AFTER_CHILD_ADDED: "AFTER_CHILD_ADDED",
    AFTER_CHILD_CHANGED: "AFTER_CHILD_CHANGED",
    AFTER_CHILD_REMOVED: "AFTER_CHILD_REMOVED",
    AFTER_PARENT_ADDED: "AFTER_PARENT_ADDED",
    AFTER_PARENT_CHANGED: "AFTER_PARENT_CHANGED",
    AFTER_PARENT_REMOVED: "AFTER_PARENT_REMOVED",
    BEFORE_CHILD_ADDED: "BEFORE_CHILD_ADDED",
    BEFORE_CHILD_CHANGED: "BEFORE_CHILD_CHANGED",
    BEFORE_CHILD_REMOVED: "BEFORE_CHILD_REMOVED",
    BEFORE_DISPOSE: "BEFORE_DISPOSE",
    BEFORE_PARENT_ADDED: "BEFORE_PARENT_ADDED",
    BEFORE_PARENT_CHANGED: "BEFORE_PARENT_CHANGED",
    BEFORE_PARENT_REMOVED: "BEFORE_PARENT_REMOVED",
    COMPONENT_NESTING_CHANGED: "COMPONENT_NESTING_CHANGED"
};
exports.default = Events;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateError_1 = __importDefault(__webpack_require__(21));
var Properties_1 = __importDefault(__webpack_require__(7));
var Region_1 = __importDefault(__webpack_require__(54));
var UnknownRegionError_1 = __importDefault(__webpack_require__(55));
var ValidationRegExp_1 = __webpack_require__(8);
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var ScopeImpl_1 = __importDefault(__webpack_require__(10));
var PubSub_1 = __importDefault(__webpack_require__(13));
var SequenceGenerator_1 = __importDefault(__webpack_require__(56));
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var SetComponentError_1 = __importDefault(__webpack_require__(57));
var Constants_1 = __webpack_require__(4);
var ComponentConfig_1 = __webpack_require__(9);
var Events_1 = __importDefault(__webpack_require__(14));
var ExternalMediator_1 = __importDefault(__webpack_require__(58));
var MvvmImpl_1 = __importDefault(__webpack_require__(59));
var Modules_1 = __webpack_require__(6);
var DirectEvents_1 = __importDefault(__webpack_require__(24));
var requireNotNull = ObjectUtils_1.default.requireNotNull;
var requireValid = ObjectUtils_1.default.requireValid;
var isDefined = ObjectUtils_1.default.isDefined;
var DEFAULT_COMPONENT_CONFIG = new ComponentConfig_1.ComponentConfigBuilder().build();
var ComponentInternalsImpl = /** @class */ (function () {
    function ComponentInternalsImpl(component, template, config) {
        requireNotNull(template, "template");
        if (typeof template !== "string") {
            throw new TemplateError_1.default("Template must be a string");
        }
        this.config = (config || DEFAULT_COMPONENT_CONFIG);
        this.hasExternals = false;
        this.parentModelFn = this.config.getParentModelFn();
        this.data = {};
        this.id = SequenceGenerator_1.default.INSTANCE.next();
        this.logger = LoggerFactory_1.default.getLogger(component.constructor.name + " Component " + this.id);
        this.parent = null;
        this.component = component;
        this.prefix = this.config.getPrefix().toLowerCase();
        this.template = template.trim();
        this.scope = new ScopeImpl_1.default();
        this.externalMediators = {};
        this.externalCache = {};
        this.externalFields = {};
        var effectiveExternalAttributes = this.config.getAttributes();
        for (var _i = 0, effectiveExternalAttributes_1 = effectiveExternalAttributes; _i < effectiveExternalAttributes_1.length; _i++) {
            var attribute = effectiveExternalAttributes_1[_i];
            this.externalize(attribute);
        }
        this.flags = {
            repeatable: false
        };
        if (this.getModule()) {
            this.scope.setParent(this.getModule().getScope());
        }
        this.regions = {};
        this.pubSub = new PubSub_1.default(this.component, this.getModule());
    }
    ComponentInternalsImpl.prototype.init = function () {
        var _this = this;
        this.component.reset();
        this.mvvm = new MvvmImpl_1.default(this.component, this.getModule(), this.prefix, this.scope, this.parentModelFn);
        this.render();
        this.mvvm.init(this.el, this, function (name) { return _this.getRegion(name); });
    };
    ComponentInternalsImpl.prototype.hasMetadata = function (name) {
        return this.getMetadata(name) ? true : false;
    };
    ComponentInternalsImpl.prototype.getMetadata = function (name) {
        requireNotNull(name, "name");
        return this.config.getMetadata(name);
    };
    ComponentInternalsImpl.prototype.hasRegion = function (name) {
        requireNotNull(name, "name");
        return ((this.regions[name]) ? true : false);
    };
    ComponentInternalsImpl.prototype.$apply = function (fn, args) {
        requireNotNull(fn, "fn");
        requireNotNull(args, "args");
        this.mvvm.$apply(fn, args);
    };
    ComponentInternalsImpl.prototype.setChild = function (name, component) {
        requireNotNull(name, "name");
        if (!this.hasRegion(name)) {
            throw new UnknownRegionError_1.default("Region \'%rName%\' is unknown and must be declared in component template.", { "%rName%": name });
        }
        var hasComponent = this.getRegion(name).hasComponent();
        var childAdded = !!(component !== null && !hasComponent);
        var childRemoved = !!(component === null && hasComponent);
        this.messageInternalIf(childAdded, Events_1.default.BEFORE_CHILD_ADDED, { name: name });
        this.messageInternalIf(childRemoved, Events_1.default.BEFORE_CHILD_REMOVED, { name: name });
        this.message(Constants_1.INTERNAL_CHANNEL_NAME, Events_1.default.BEFORE_CHILD_CHANGED, { name: name });
        this.getRegion(name).setComponent(component);
        this.message(Constants_1.INTERNAL_CHANNEL_NAME, Events_1.default.AFTER_CHILD_CHANGED, { name: name });
        this.messageInternalIf(childAdded, Events_1.default.AFTER_CHILD_ADDED, { name: name });
        this.messageInternalIf(childRemoved, Events_1.default.AFTER_CHILD_REMOVED, { name: name });
        this.broadcastGlobally(Constants_1.INTERNAL_CHANNEL_NAME, Events_1.default.COMPONENT_NESTING_CHANGED);
    };
    ComponentInternalsImpl.prototype.setChildFromRegistry = function (name, componentId, defaultComponentName) {
        requireNotNull(name, "name");
        requireValid(componentId, "componentId", ValidationRegExp_1.VALID_ID);
        if (!this.hasRegion(name)) {
            throw new UnknownRegionError_1.default("Region \'%rName%\' is unknown and must be declared in component template.", { "%rName%": name });
        }
        var component = this.get(componentId);
        if (!component && defaultComponentName) {
            component = this.get(defaultComponentName);
        }
        if (component) {
            this.setChild(name, component);
        }
        else {
            var error = new SetComponentError_1.default("Unable to set component %cName% on region %name%", { "%cName%": componentId, "%name%": name });
            this.getLogger().error(error);
        }
    };
    ComponentInternalsImpl.prototype.messageInternalIf = function (condition, messageName, payload) {
        if (condition) {
            this.message(Constants_1.INTERNAL_CHANNEL_NAME, messageName, payload);
        }
    };
    ComponentInternalsImpl.prototype.messageInternalDirectIf = function (condition, messageName, payload) {
        if (condition) {
            this.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, messageName, payload);
        }
    };
    ComponentInternalsImpl.prototype.message = function (channelName, messageName, payload) {
        var _this = this;
        var handlers = {
            setMode: function () {
                switch (payload) {
                    case "repeatable":
                        _this.flags.repeatable = true;
                        break;
                    default:
                        _this.flags.repeatable = false;
                }
            },
            consumeDigestionCandidates: function () { return payload.push(_this.mvvm); },
            NESTING_CHANGED: function () { return _this.nestingChanged(); },
            digest: function () { return _this.digest(); },
            setParent: function () { return _this.setParent(payload); },
            skipGuard: function () { return _this.mvvm.skipGuard(payload); },
            setParentScope: function () { return _this.setParentScope(payload); },
            setData: function () { return _this.setData(payload); },
            addExternalAttribute: function () { return _this.addExternalAttribute(payload); }
        };
        if (channelName === Constants_1.INTERNAL_DIRECT_CHANNEL_NAME) {
            var handler = handlers[messageName];
            if (handler !== null && handler !== undefined) {
                handler();
            }
        }
        else {
            this.pubSub.message(channelName, messageName, payload);
        }
    };
    ComponentInternalsImpl.prototype.broadcast = function (channelName, messageName, payload) {
        this.getModule().broadcast(channelName, messageName, payload);
    };
    ComponentInternalsImpl.prototype.broadcastGlobally = function (channelName, messageName, payload) {
        Modules_1.Modules.broadcast(channelName, messageName, payload);
    };
    ComponentInternalsImpl.prototype.dispose = function () {
        this.message(Constants_1.INTERNAL_CHANNEL_NAME, Events_1.default.BEFORE_DISPOSE, {});
        this.pubSub.dispose();
        this.parent = null;
        this.parentScope = null;
        this.scope = null;
    };
    ComponentInternalsImpl.prototype.getId = function () {
        return this.id;
    };
    ComponentInternalsImpl.prototype.getEl = function () {
        return this.el;
    };
    ComponentInternalsImpl.prototype.getComponent = function () {
        return this.component;
    };
    ComponentInternalsImpl.prototype.get = function (id) {
        return this.getModule().get(id);
    };
    ComponentInternalsImpl.prototype.getPrefix = function () {
        return this.prefix;
    };
    ComponentInternalsImpl.prototype.isConnected = function () {
        return this.parent !== null && this.parent !== undefined && this.parent.isConnected();
    };
    ComponentInternalsImpl.prototype.getScope = function () {
        return this.scope;
    };
    ComponentInternalsImpl.prototype.watch = function (expression, target) {
        requireNotNull(expression, "expression");
        requireNotNull(target, "target");
        this.mvvm.mediate(expression).watch(this.component, target);
    };
    ComponentInternalsImpl.prototype.on = function (target, messageName, channel) {
        var _this = this;
        this.pubSub.on(messageName).forChannel(channel || Constants_1.INTERNAL_CHANNEL_NAME).invoke(function (payload) { return _this.$apply(target, [payload]); });
    };
    ComponentInternalsImpl.prototype.getLogger = function () {
        return this.logger;
    };
    ComponentInternalsImpl.prototype.getModule = function () {
        return this.component[Constants_1.MODULE_FIELD_NAME];
    };
    ComponentInternalsImpl.prototype.getParent = function () {
        return this.parent;
    };
    ComponentInternalsImpl.prototype.setData = function (data) {
        this.data = (data === null || data === undefined) ? {} : data;
    };
    ComponentInternalsImpl.prototype.getData = function () {
        return this.data;
    };
    ComponentInternalsImpl.prototype.importExternals = function () {
        this.externalCache = {};
        for (var key in this.externalMediators) {
            if (this.externalMediators.hasOwnProperty(key)) {
                var mediator = this.externalMediators[key];
                this.externalCache[key] = mediator.get(this.parentScope);
            }
        }
    };
    ComponentInternalsImpl.prototype.exportExternals = function () {
        for (var key in this.externalMediators) {
            if (this.externalMediators.hasOwnProperty(key)) {
                var mediator = this.externalMediators[key];
                mediator.set(this.parentScope, this.externalCache[key]);
            }
        }
        this.externalCache = {};
    };
    ComponentInternalsImpl.prototype.hasExternalMediators = function () {
        return this.hasExternals;
    };
    ComponentInternalsImpl.prototype.getExternalCache = function () {
        return this.externalCache;
    };
    ComponentInternalsImpl.prototype.getFlags = function () {
        return this.flags;
    };
    ComponentInternalsImpl.prototype.getGuard = function () {
        return this.mvvm.getGuard();
    };
    ComponentInternalsImpl.prototype.getConfig = function () {
        return this.config;
    };
    ComponentInternalsImpl.prototype.getRegion = function (name) {
        if (!this.regions[name]) {
            this.getLogger().ifTrace(function () { return "Creating region " + name; });
            this.regions[name] = new Region_1.default(name, this);
        }
        return this.regions[name];
    };
    ComponentInternalsImpl.prototype.getTemplate = function () {
        return this.template;
    };
    ComponentInternalsImpl.prototype.render = function () {
        this.getLogger().trace("Rendering");
        var templateEl = Properties_1.default.getWindow().document.createElement("template");
        templateEl.insertAdjacentHTML("afterbegin", this.template.trim());
        var count = templateEl.childElementCount;
        if (count !== 1) {
            var parmObj = { "%count%": "" + count, "%template%": this.template };
            var errmsg = "Component template must have a single top level element, but had %count% top level elements:\n\n%template%\n\n";
            var error = new TemplateError_1.default(errmsg, parmObj);
            this.getLogger().fatal(error);
            throw error;
        }
        this.el = templateEl.firstElementChild;
    };
    ComponentInternalsImpl.prototype.setEl = function (el) {
        this.el = el;
    };
    ComponentInternalsImpl.prototype.messageChildren = function (channelName, messageName, payload) {
        for (var id in this.regions) {
            if (this.regions.hasOwnProperty(id)) {
                this.regions[id].message(channelName, messageName, payload);
            }
        }
    };
    ComponentInternalsImpl.prototype.externalize = function (name) {
        this.externalFields[name.toLowerCase()] = name.toLowerCase();
    };
    ComponentInternalsImpl.prototype.addExternalAttribute = function (detail) {
        var fieldName = this.externalFields[detail.attributeName];
        this.hasExternals = true;
        if (fieldName) {
            this.externalMediators[fieldName] = new ExternalMediator_1.default(detail.expression);
        }
    };
    ComponentInternalsImpl.prototype.setParentScope = function (scope) {
        this.parentScope = scope;
    };
    ComponentInternalsImpl.prototype.setParent = function (parent) {
        var changed = this.bothPresentButDifferent(parent, this.parent) || this.exactlyOneDefined(parent, this.parent);
        var parentAdded = !!(parent !== null && this.parent === null);
        var parentRemoved = !!(parent === null && this.parent !== null);
        this.messageInternalIf(parentAdded, Events_1.default.BEFORE_PARENT_ADDED, {});
        this.messageInternalIf(parentRemoved, Events_1.default.BEFORE_PARENT_REMOVED, {});
        this.message(Constants_1.INTERNAL_CHANNEL_NAME, Events_1.default.BEFORE_PARENT_CHANGED, {});
        this.parent = parent;
        if (changed) {
            this.nestingChanged();
        }
        this.digest();
        this.message(Constants_1.INTERNAL_CHANNEL_NAME, Events_1.default.AFTER_PARENT_CHANGED, {});
        this.messageInternalIf(parentAdded, Events_1.default.AFTER_PARENT_ADDED, {});
        this.messageInternalIf(parentRemoved, Events_1.default.AFTER_PARENT_REMOVED, {});
    };
    ComponentInternalsImpl.prototype.nestingChanged = function () {
        if (this.isConnected() && !this.pubSub.isGlobalEnabled()) {
            this.pubSub.enableGlobal();
        }
        else if (!this.isConnected() && this.pubSub.isGlobalEnabled()) {
            this.pubSub.disableGlobal();
        }
        this.mvvm.nestingChanged();
        this.messageChildren(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, DirectEvents_1.default.NESTING_CHANGED);
    };
    ComponentInternalsImpl.prototype.digest = function () {
        this.$apply(Constants_1.NO_OP_FN, []);
    };
    ComponentInternalsImpl.prototype.bothPresentButDifferent = function (first, second) {
        return isDefined(first) && isDefined(second) && first.getId() !== second.getId();
    };
    ComponentInternalsImpl.prototype.exactlyOneDefined = function (first, second) {
        return isDefined(first) ? !isDefined(second) : isDefined(second);
    };
    return ComponentInternalsImpl;
}());
exports.default = ComponentInternalsImpl;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCydranError_1 = __webpack_require__(5);
var NullValueError = /** @class */ (function (_super) {
    __extends(NullValueError, _super);
    function NullValueError(msg, reps) {
        return _super.call(this, msg, reps) || this;
    }
    return NullValueError;
}(AbstractCydranError_1.CydranError));
exports.default = NullValueError;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Level_1 = __importDefault(__webpack_require__(11));
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var requireNotNull = ObjectUtils_1.default.requireNotNull;
var LOGGER_NAME_LENGTH = 20;
var LoggerImpl = /** @class */ (function () {
    function LoggerImpl(name, loggerService) {
        requireNotNull(name, "name");
        if (name.length < LOGGER_NAME_LENGTH) {
            var count = LOGGER_NAME_LENGTH - name.length;
            while (count > 0) {
                name = name + " ";
                --count;
            }
        }
        this.name = name;
        this.loggerService = loggerService;
    }
    LoggerImpl.prototype.trace = function (payload, error) {
        this.loggerService.log(this, Level_1.default.TRACE, payload, error);
    };
    LoggerImpl.prototype.ifTrace = function (payloadFn, error) {
        if (payloadFn !== null && this.isTrace()) {
            this.trace(payloadFn(), error);
        }
    };
    LoggerImpl.prototype.debug = function (payload, error) {
        this.loggerService.log(this, Level_1.default.DEBUG, payload, error);
    };
    LoggerImpl.prototype.ifDebug = function (payloadFn, error) {
        if (payloadFn !== null && this.isDebug()) {
            this.debug(payloadFn(), error);
        }
    };
    LoggerImpl.prototype.info = function (payload, error) {
        this.loggerService.log(this, Level_1.default.INFO, payload, error);
    };
    LoggerImpl.prototype.ifInfo = function (payloadFn, error) {
        if (payloadFn !== null && this.isInfo()) {
            this.info(payloadFn(), error);
        }
    };
    LoggerImpl.prototype.warn = function (payload, error) {
        this.loggerService.log(this, Level_1.default.WARN, payload, error);
    };
    LoggerImpl.prototype.ifWarn = function (payloadFn, error) {
        if (payloadFn !== null && this.isWarn()) {
            this.warn(payloadFn(), error);
        }
    };
    LoggerImpl.prototype.error = function (payload, error) {
        this.loggerService.log(this, Level_1.default.ERROR, payload, error);
    };
    LoggerImpl.prototype.ifError = function (payloadFn, error) {
        if (payloadFn !== null && this.isError()) {
            this.error(payloadFn(), error);
        }
    };
    LoggerImpl.prototype.fatal = function (payload, error) {
        this.loggerService.log(this, Level_1.default.FATAL, payload, error);
    };
    LoggerImpl.prototype.ifFatal = function (payloadFn, error) {
        if (payloadFn !== null && this.isFatal()) {
            this.fatal(payloadFn(), error);
        }
    };
    LoggerImpl.prototype.isTrace = function () {
        return this.loggerService.isTrace();
    };
    LoggerImpl.prototype.isDebug = function () {
        return this.loggerService.isDebug();
    };
    LoggerImpl.prototype.isInfo = function () {
        return this.loggerService.isInfo();
    };
    LoggerImpl.prototype.isWarn = function () {
        return this.loggerService.isWarn();
    };
    LoggerImpl.prototype.isError = function () {
        return this.loggerService.isError();
    };
    LoggerImpl.prototype.isFatal = function () {
        return this.loggerService.isFatal();
    };
    LoggerImpl.prototype.isDisabled = function () {
        return this.loggerService.isDisabled();
    };
    LoggerImpl.prototype.getName = function () {
        return this.name;
    };
    return LoggerImpl;
}());
exports.default = LoggerImpl;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConsoleOutputStrategy_1 = __importDefault(__webpack_require__(36));
var Level_1 = __importDefault(__webpack_require__(11));
var LoggerImpl_1 = __importDefault(__webpack_require__(18));
var LoggerServiceImpl = /** @class */ (function () {
    function LoggerServiceImpl() {
        this.level = Level_1.default.INFO;
        this.outputStrategy = new ConsoleOutputStrategy_1.default();
        this.logger = new LoggerImpl_1.default("LoggerService", this);
    }
    LoggerServiceImpl.prototype.log = function (logger, level, payload, errorStack) {
        if (level >= this.level && level !== Level_1.default.DISABLED) {
            this.outputStrategy.log(logger.getName(), level, payload, errorStack);
        }
    };
    LoggerServiceImpl.prototype.setLevel = function (level) {
        this.level = level;
    };
    LoggerServiceImpl.prototype.isTrace = function () {
        return (Level_1.default.TRACE >= this.level);
    };
    LoggerServiceImpl.prototype.isDebug = function () {
        return (Level_1.default.DEBUG >= this.level);
    };
    LoggerServiceImpl.prototype.isInfo = function () {
        return (Level_1.default.INFO >= this.level);
    };
    LoggerServiceImpl.prototype.isWarn = function () {
        return (Level_1.default.WARN >= this.level);
    };
    LoggerServiceImpl.prototype.isError = function () {
        return (Level_1.default.ERROR >= this.level);
    };
    LoggerServiceImpl.prototype.isFatal = function () {
        return (Level_1.default.FATAL >= this.level);
    };
    LoggerServiceImpl.prototype.isDisabled = function () {
        return (Level_1.default.DISABLED >= this.level);
    };
    LoggerServiceImpl.INSTANCE = new LoggerServiceImpl();
    return LoggerServiceImpl;
}());
exports.default = LoggerServiceImpl;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GuardGenerator = /** @class */ (function () {
    function GuardGenerator() {
        this.major = 0;
        this.minor = 0;
        this.micro = 0;
    }
    GuardGenerator.prototype.generate = function () {
        var result = this.major + "-" + this.minor + "-" + this.micro;
        this.micro++;
        if (this.micro > GuardGenerator.MAX_VALUE) {
            this.micro = 0;
            this.minor++;
        }
        if (this.minor > GuardGenerator.MAX_VALUE) {
            this.minor = 0;
            this.major++;
        }
        return result;
    };
    GuardGenerator.INSTANCE = new GuardGenerator();
    GuardGenerator.MAX_VALUE = 9007199254740989;
    return GuardGenerator;
}());
exports.default = GuardGenerator;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCydranError_1 = __webpack_require__(5);
var TemplateError = /** @class */ (function (_super) {
    __extends(TemplateError, _super);
    function TemplateError(msg, reps) {
        return _super.call(this, msg, reps) || this;
    }
    return TemplateError;
}(AbstractCydranError_1.CydranError));
exports.default = TemplateError;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var Getter = /** @class */ (function () {
    function Getter(expression) {
        this.expression = expression;
        this.logger = LoggerFactory_1.default.getLogger("Getter: " + expression);
    }
    Getter.prototype.get = function (scope) {
        var code = '"use strict"; ' + scope.getCode() + " return (" + this.expression + ");";
        var value = null;
        try {
            value = Function(code).apply({}, [scope.getItems()]);
        }
        catch (e) {
            this.logInvocationError(code, e);
        }
        return value;
    };
    Getter.prototype.logInvocationError = function (code, e) {
        this.logger.error("\nAn exception (" + e.name + ") was thrown invoking the element mediator expression: " + this.expression
            + "\n\nIn context:\n" + code + "\n\nException message: " + e.message + "\n\n", e);
    };
    return Getter;
}());
exports.default = Getter;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var Setter = /** @class */ (function () {
    function Setter(expression) {
        this.expression = expression;
        this.logger = LoggerFactory_1.default.getLogger("Setter: " + expression);
    }
    Setter.prototype.set = function (scope, value) {
        var code = '"use strict"; ' + scope.getCode() + " " + this.expression + " = arguments[1];";
        try {
            Function(code).apply({}, [scope.getItems(), value]);
        }
        catch (e) {
            this.logInvocationError(code, e);
        }
    };
    Setter.prototype.logInvocationError = function (code, e) {
        this.logger.error("\nAn exception (" + e.name + ") was thrown invoking the element mediator expression: " + this.expression
            + "\n\nIn context:\n" + code + "\n\nException message: " + e.message + "\n\n", e);
    };
    return Setter;
}());
exports.default = Setter;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DirectEvents = {
    NESTING_CHANGED: "NESTING_CHANGED"
};
exports.default = DirectEvents;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Level_1 = __importDefault(__webpack_require__(11));
var LoggerServiceImpl_1 = __importDefault(__webpack_require__(19));
var CydranConfig = /** @class */ (function () {
    function CydranConfig() {
        var _newTarget = this.constructor;
        if (!(this instanceof CydranConfig)) {
            throw TypeError(_newTarget.name + " should be an instance of Config");
        }
    }
    CydranConfig.prototype.useTrace = function () {
        LoggerServiceImpl_1.default.INSTANCE.setLevel(Level_1.default.TRACE);
    };
    CydranConfig.prototype.useDebug = function () {
        LoggerServiceImpl_1.default.INSTANCE.setLevel(Level_1.default.DEBUG);
    };
    CydranConfig.prototype.useInfo = function () {
        LoggerServiceImpl_1.default.INSTANCE.setLevel(Level_1.default.INFO);
    };
    CydranConfig.prototype.useWarn = function () {
        LoggerServiceImpl_1.default.INSTANCE.setLevel(Level_1.default.WARN);
    };
    CydranConfig.prototype.useError = function () {
        LoggerServiceImpl_1.default.INSTANCE.setLevel(Level_1.default.ERROR);
    };
    CydranConfig.prototype.useFatal = function () {
        LoggerServiceImpl_1.default.INSTANCE.setLevel(Level_1.default.FATAL);
    };
    CydranConfig.prototype.useDisabled = function () {
        LoggerServiceImpl_1.default.INSTANCE.setLevel(Level_1.default.DISABLED);
    };
    return CydranConfig;
}());
exports.default = CydranConfig;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(27);
__webpack_require__(28);
__webpack_require__(29);
__webpack_require__(30);
__webpack_require__(69);
__webpack_require__(70);
__webpack_require__(71);
__webpack_require__(72);
__webpack_require__(73);
__webpack_require__(74);
__webpack_require__(75);
__webpack_require__(76);
__webpack_require__(77);
__webpack_require__(78);
var ComponentConfig_1 = __webpack_require__(9);
exports.ComponentConfigBuilder = ComponentConfig_1.ComponentConfigBuilder;
var CydranConfig = __importStar(__webpack_require__(25));
exports.CydranConfig = CydranConfig;
var Events_1 = __importDefault(__webpack_require__(14));
exports.Events = Events_1.default;
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
exports.LoggerFactory = LoggerFactory_1.default;
var PubSub_1 = __importDefault(__webpack_require__(13));
exports.PubSub = PubSub_1.default;
var Stage_1 = __webpack_require__(79);
exports.builder = Stage_1.builder;
var ElementMediator_1 = __importDefault(__webpack_require__(0));
exports.ElementMediator = ElementMediator_1.default;
var Component_1 = __importDefault(__webpack_require__(12));
exports.Component = Component_1.default;
var CYDRAN_KEY = "cydran";
var ORIGINAL_CYDRAN = window[CYDRAN_KEY];
function noConflict() {
    var currentCydran = window[CYDRAN_KEY];
    window[CYDRAN_KEY] = ORIGINAL_CYDRAN;
    return currentCydran;
}
exports.noConflict = noConflict;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(31);
__webpack_require__(41);
__webpack_require__(42);
__webpack_require__(43);
__webpack_require__(44);
__webpack_require__(45);
__webpack_require__(46);
__webpack_require__(47);
__webpack_require__(48);
__webpack_require__(49);
__webpack_require__(50);
__webpack_require__(51);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Factories_1 = __importDefault(__webpack_require__(2));
var ElementMediator_1 = __importDefault(__webpack_require__(0));
/**
 *
 */
var Checked = /** @class */ (function (_super) {
    __extends(Checked, _super);
    function Checked() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Checked.prototype.wire = function () {
        this.getModelMediator().watch(this, this.onTargetChange);
    };
    Checked.prototype.unwire = function () {
        // Intentionally do nothing
    };
    Checked.prototype.onTargetChange = function (previous, current) {
        this.getEl().checked = !current;
    };
    Checked.KEY = "checked";
    return Checked;
}(ElementMediator_1.default));
Factories_1.default.register(Checked.KEY, ["input"], Checked);
exports.default = Checked;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCydranError_1 = __webpack_require__(5);
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(msg, reps) {
        return _super.call(this, msg, reps) || this;
    }
    return ValidationError;
}(AbstractCydranError_1.CydranError));
exports.default = ValidationError;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ListenerImpl = /** @class */ (function () {
    function ListenerImpl(channelName, context) {
        this.mappings = {};
        this.channelName = channelName;
        this.context = context;
    }
    ListenerImpl.prototype.receive = function (messageName, payload) {
        var mappings = this.mappings[messageName];
        if (!mappings) {
            return;
        }
        for (var _i = 0, mappings_1 = mappings; _i < mappings_1.length; _i++) {
            var mapping = mappings_1[_i];
            mapping.call(this.context, payload);
        }
    };
    ListenerImpl.prototype.register = function (messageName, fn) {
        if (!this.mappings[messageName]) {
            this.mappings[messageName] = [];
        }
        this.mappings[messageName].push(fn);
    };
    ListenerImpl.prototype.getChannelName = function () {
        return this.channelName;
    };
    ListenerImpl.prototype.dispose = function () {
        this.mappings = {};
        this.context = null;
    };
    return ListenerImpl;
}());
exports.default = ListenerImpl;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCydranError_1 = __webpack_require__(5);
var ScopeError = /** @class */ (function (_super) {
    __extends(ScopeError, _super);
    function ScopeError(msg, reps) {
        return _super.call(this, msg, reps) || this;
    }
    return ScopeError;
}(AbstractCydranError_1.CydranError));
exports.default = ScopeError;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Level_1 = __importDefault(__webpack_require__(11));
var ConsoleOutputStrategy = /** @class */ (function () {
    function ConsoleOutputStrategy() {
    }
    ConsoleOutputStrategy.getNow = function () {
        var now = new Date();
        return now.getUTCFullYear()
            + "-"
            + now.getUTCMonth()
            + ":"
            + now.getUTCDate()
            + ":"
            + now.getUTCHours()
            + ":"
            + now.getUTCMinutes()
            + ":"
            + now.getUTCSeconds()
            + ":"
            + now.getUTCMilliseconds();
    };
    ConsoleOutputStrategy.prototype.log = function (logName, level, payload, stacked) {
        if (level !== Level_1.default.DISABLED) {
            var wkTStamp = ConsoleOutputStrategy.getNow();
            var preamble = wkTStamp + " " + level + " [" + logName + "]";
            var shortArgs = payload instanceof Error;
            var printFullStack = !(stacked instanceof Error) ? (null !== stacked ? stacked : false) : false;
            if (level >= Level_1.default.WARN) {
                var logMsg = (shortArgs ? payload.stack : payload);
                var errMsg = "";
                if (stacked instanceof Error) {
                    errMsg = stacked.stack;
                }
                var secondPreamble = (shortArgs ? "" : ((stacked) ? " - %s" : ""));
                switch (level) {
                    case Level_1.default.WARN:
                        // tslint:disable-next-line
                        console.warn("%c" + preamble + secondPreamble, "color:#ff9400;", logMsg, errMsg);
                        break;
                    case Level_1.default.ERROR:
                    case Level_1.default.FATAL:
                    default:
                        // tslint:disable-next-line
                        console.error(preamble + secondPreamble, logMsg, errMsg);
                        break;
                }
            }
            else {
                switch (level) {
                    case Level_1.default.TRACE:
                        if (printFullStack) {
                            // tslint:disable-next-line
                            console.log("%c" + preamble, "color:#00752d;", payload);
                        }
                        else {
                            // tslint:disable-next-line
                            console.log("%c" + preamble, "color:#ff9400;", payload);
                        }
                        break;
                    case Level_1.default.DEBUG:
                        // tslint:disable-next-line
                        console.log("%c" + preamble, "color:#00752d;", payload);
                        break;
                    case Level_1.default.INFO:
                        // tslint:disable-next-line
                        console.log("%c" + preamble, "color:#2d57ca;", payload);
                        break;
                    default:
                        // tslint:disable-next-line
                        console.log(preamble, payload);
                        break;
                }
            }
        }
    };
    return ConsoleOutputStrategy;
}());
exports.default = ConsoleOutputStrategy;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RegistrationError_1 = __importDefault(__webpack_require__(38));
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var ValidationRegExp_1 = __webpack_require__(8);
var requireValid = ObjectUtils_1.default.requireValid;
var requireNotNull = ObjectUtils_1.default.requireNotNull;
var DefaultRegistryStrategyImpl = /** @class */ (function () {
    function DefaultRegistryStrategyImpl() {
        this.factories = {};
    }
    DefaultRegistryStrategyImpl.prototype.get = function (id, gettable) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        var instance = null;
        if (this.factories[id]) {
            instance = this.factories[id].get(gettable);
        }
        return instance;
    };
    DefaultRegistryStrategyImpl.prototype.registerConstant = function (id, instance) {
        this.registerFactory(id, new ConstantFactory(instance));
    };
    DefaultRegistryStrategyImpl.prototype.registerPrototype = function (id, classInstance, dependencies) {
        this.registerFactory(id, new PrototypeFactory(classInstance, dependencies || []));
    };
    DefaultRegistryStrategyImpl.prototype.registerSingleton = function (id, classInstance, dependencies) {
        this.registerFactory(id, new SingletonFactory(classInstance, dependencies || []));
    };
    DefaultRegistryStrategyImpl.prototype.registerFactory = function (id, factory) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        if (id && factory) {
            if (this.factories[id]) {
                throw new RegistrationError_1.default("'%id%' key is considered unique and already exists", { "%id%": id });
            }
            this.factories[id] = factory;
        }
    };
    return DefaultRegistryStrategyImpl;
}());
var RegistryImpl = /** @class */ (function () {
    function RegistryImpl() {
        this.defaultStrategy = new DefaultRegistryStrategyImpl();
        this.strategies = [this.defaultStrategy];
    }
    RegistryImpl.prototype.get = function (id) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        var i = 0;
        var instance = null;
        while (!instance && i < this.strategies.length) {
            instance = this.strategies[i].get(id, this);
            i++;
        }
        return instance;
    };
    RegistryImpl.prototype.registerConstant = function (id, instance) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        requireNotNull(instance, "instance");
        this.defaultStrategy.registerConstant(id, instance);
        return this;
    };
    RegistryImpl.prototype.registerPrototype = function (id, classInstance, dependencies) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        requireNotNull(classInstance, "classInstance");
        this.defaultStrategy.registerPrototype(id, classInstance, dependencies);
        return this;
    };
    RegistryImpl.prototype.registerSingleton = function (id, classInstance, dependencies) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        requireNotNull(classInstance, "classInstance");
        this.defaultStrategy.registerSingleton(id, classInstance, dependencies);
        return this;
    };
    RegistryImpl.prototype.addStrategy = function (strategy) {
        requireNotNull(strategy, "strategy");
        this.strategies.push(strategy);
    };
    RegistryImpl.INSTANCE = new RegistryImpl();
    return RegistryImpl;
}());
exports.RegistryImpl = RegistryImpl;
var ConstantFactory = /** @class */ (function () {
    function ConstantFactory(instance) {
        this.instance = instance;
    }
    ConstantFactory.prototype.get = function (gettable) {
        return this.instance;
    };
    return ConstantFactory;
}());
var AbstractInstantableFactory = /** @class */ (function () {
    function AbstractInstantableFactory(classInstance, dependencies) {
        this.dependencies = dependencies;
        this.classInstance = classInstance;
    }
    AbstractInstantableFactory.prototype.create = function (gettable) {
        var params = [];
        for (var _i = 0, _a = this.dependencies; _i < _a.length; _i++) {
            var id = _a[_i];
            var param = gettable.get(id);
            params.push(param);
        }
        var result = (params.length === 0) ? new this.classInstance() : this.instatiate(params);
        return result;
    };
    AbstractInstantableFactory.prototype.instatiate = function (params) {
        var args = "";
        for (var i = 0; i < params.length; i++) {
            if (i > 0) {
                args += ",";
            }
            args += "arguments[1][" + i + "]";
        }
        var code = '"use strict"; var classInstance = arguments[0]; return new classInstance(' + args + ");";
        return Function(code).apply({}, [this.classInstance, params]);
    };
    return AbstractInstantableFactory;
}());
var PrototypeFactory = /** @class */ (function (_super) {
    __extends(PrototypeFactory, _super);
    function PrototypeFactory(classInstance, dependencies) {
        return _super.call(this, classInstance, dependencies) || this;
    }
    PrototypeFactory.prototype.get = function (gettable) {
        return this.create(gettable);
    };
    return PrototypeFactory;
}(AbstractInstantableFactory));
var SingletonFactory = /** @class */ (function (_super) {
    __extends(SingletonFactory, _super);
    function SingletonFactory(classInstance, dependencies) {
        var _this = _super.call(this, classInstance, dependencies) || this;
        _this.instance = null;
        return _this;
    }
    SingletonFactory.prototype.get = function (gettable) {
        if (!this.instance) {
            this.instance = this.create(gettable);
        }
        return this.instance;
    };
    return SingletonFactory;
}(AbstractInstantableFactory));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCydranError_1 = __webpack_require__(5);
var RegistrationError = /** @class */ (function (_super) {
    __extends(RegistrationError, _super);
    function RegistrationError(msg, reps) {
        return _super.call(this, msg, reps) || this;
    }
    return RegistrationError;
}(AbstractCydranError_1.CydranError));
exports.default = RegistrationError;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var requireNotNull = ObjectUtils_1.default.requireNotNull;
var BrokerImpl = /** @class */ (function () {
    function BrokerImpl() {
        this.logger = LoggerFactory_1.default.getLogger("Broker");
        this.listeners = {};
    }
    BrokerImpl.prototype.broadcast = function (channelName, messageName, payload) {
        requireNotNull(channelName, "channelName");
        requireNotNull(messageName, "messageName");
        var actualPayload = (payload === null || payload === undefined) ? {} : payload;
        this.logger.trace({
            channelName: channelName,
            messageName: messageName,
            payload: actualPayload
        });
        if (!this.listeners[channelName]) {
            this.logger.trace("no listeners for channel, returning");
            return;
        }
        var listeners = this.listeners[channelName];
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            listener.receive(messageName, actualPayload);
        }
    };
    BrokerImpl.prototype.addListener = function (listener) {
        var channelName = listener.getChannelName();
        if (!this.listeners[channelName]) {
            this.listeners[channelName] = [];
        }
        var listeners = this.listeners[channelName];
        if (!this.contains(listeners, listener)) {
            listeners.push(listener);
        }
    };
    BrokerImpl.prototype.removeListener = function (listener) {
        var channelName = listener.getChannelName();
        var listeners = this.listeners[channelName];
        if (!listeners) {
            return;
        }
        this.remove(listeners, listener);
        if (0 === listeners.length) {
            delete this.listeners[channelName];
        }
    };
    BrokerImpl.prototype.dispose = function () {
        this.listeners = {};
    };
    BrokerImpl.prototype.contains = function (array, instance) {
        var i = array.length;
        while (i--) {
            if (array[i] === instance) {
                return true;
            }
        }
        return false;
    };
    BrokerImpl.prototype.remove = function (array, instance) {
        var i = array.length;
        while (i--) {
            if (array[i] === instance) {
                array.splice(i, 1);
                break;
            }
        }
    };
    return BrokerImpl;
}());
exports.default = BrokerImpl;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function extractParams(tagName, el) {
    var result = {};
    // tslint:disable-next-line
    for (var i = 0; i < el.children.length; i++) {
        var child = el.children[i];
        if (child.tagName.toLowerCase() === tagName.toLowerCase()) {
            var paramName = child.getAttribute("name");
            var paramValue = child.getAttribute("value");
            result[paramName] = paramValue;
        }
    }
    return result;
}
exports.extractParams = extractParams;
function extractAttributes(prefix, el) {
    var result = {};
    var lowerCasePrefix = prefix.toLowerCase() + ":";
    // tslint:disable-next-line
    for (var i = 0; i < el.attributes.length; i++) {
        var attribute = el.attributes[i];
        var name_1 = attribute.name.toLowerCase();
        if (name_1.indexOf(lowerCasePrefix) === 0) {
            var paramName = name_1.slice(lowerCasePrefix.length);
            var paramValue = attribute.value;
            result[paramName] = paramValue;
        }
    }
    return result;
}
exports.extractAttributes = extractAttributes;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var Factories_1 = __importDefault(__webpack_require__(2));
var CSSClass = /** @class */ (function (_super) {
    __extends(CSSClass, _super);
    function CSSClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CSSClass.prototype.wire = function () {
        this.getModelMediator().watch(this, this.onTargetChange);
    };
    CSSClass.prototype.unwire = function () {
        // Intentionally do nothing
    };
    CSSClass.prototype.onTargetChange = function (previous, current) {
        var oldClasses = (this.getEl().className || "").trim().split(" ");
        var newClasses = [];
        var map = current || {};
        for (var _i = 0, oldClasses_1 = oldClasses; _i < oldClasses_1.length; _i++) {
            var value = oldClasses_1[_i];
            if (!map.hasOwnProperty(value)) {
                newClasses.push(value);
            }
        }
        for (var key in map) {
            if (map.hasOwnProperty(key) && !!map[key]) {
                newClasses.push(key);
            }
        }
        this.getEl().className = newClasses.join(" ");
    };
    CSSClass.KEY = "class";
    return CSSClass;
}(ElementMediator_1.default));
Factories_1.default.register(CSSClass.KEY, ["*"], CSSClass);
exports.default = CSSClass;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var Factories_1 = __importDefault(__webpack_require__(2));
var Enabled = /** @class */ (function (_super) {
    __extends(Enabled, _super);
    function Enabled() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Enabled.prototype.wire = function () {
        this.getModelMediator().watch(this, this.onTargetChange);
    };
    Enabled.prototype.unwire = function () {
        // Intentionally do nothing
    };
    Enabled.prototype.onTargetChange = function (previous, current) {
        this.getEl().disabled = !current;
    };
    Enabled.KEY = "enabled";
    return Enabled;
}(ElementMediator_1.default));
Factories_1.default.register(Enabled.KEY, ["*"], Enabled);
exports.default = Enabled;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var Factories_1 = __importDefault(__webpack_require__(2));
var ReadOnly = /** @class */ (function (_super) {
    __extends(ReadOnly, _super);
    function ReadOnly() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReadOnly.prototype.wire = function () {
        this.getModelMediator().watch(this, this.onTargetChange);
    };
    ReadOnly.prototype.unwire = function () {
        // Intentionally do nothing
    };
    ReadOnly.prototype.onTargetChange = function (previous, current) {
        this.getEl().readOnly = current;
    };
    ReadOnly.KEY = "readonly";
    return ReadOnly;
}(ElementMediator_1.default));
Factories_1.default.register(ReadOnly.KEY, ["*"], ReadOnly);
exports.default = ReadOnly;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var Factories_1 = __importDefault(__webpack_require__(2));
var Style = /** @class */ (function (_super) {
    __extends(Style, _super);
    function Style() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Style.prototype.wire = function () {
        this.getModelMediator().watch(this, this.onTargetChange);
    };
    Style.prototype.unwire = function () {
        // Intentionally do nothing
    };
    Style.prototype.onTargetChange = function (previous, current) {
        if (current === null) {
            return;
        }
        for (var key in current) {
            if (!current.hasOwnProperty(key)) {
                continue;
            }
            this.getEl().style[key] = current[key] + "";
        }
    };
    Style.KEY = "style";
    return Style;
}(ElementMediator_1.default));
Factories_1.default.register(Style.KEY, ["*"], Style);
exports.default = Style;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var Constants_1 = __webpack_require__(4);
var Events_1 = __importDefault(__webpack_require__(14));
var Factories_1 = __importDefault(__webpack_require__(2));
var ForceFocus = /** @class */ (function (_super) {
    __extends(ForceFocus, _super);
    function ForceFocus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForceFocus.prototype.wire = function () {
        this.bridge("focusout");
        this.on("focusout").forChannel("dom").invoke(this.handleFocus);
        this.on(Events_1.default.COMPONENT_NESTING_CHANGED).forChannel(Constants_1.INTERNAL_CHANNEL_NAME).invoke(this.handleFocus);
        this.shouldFocus = this.getModelMediator().get();
        this.getModelMediator().watch(this, this.onTargetChange);
        this.handleFocus();
    };
    ForceFocus.prototype.unwire = function () {
        // Intentionally do nothing
    };
    ForceFocus.prototype.handleFocus = function () {
        if (this.shouldFocus) {
            this.getEl().focus();
        }
    };
    ForceFocus.prototype.onTargetChange = function (previous, current) {
        this.shouldFocus = current;
        this.handleFocus();
    };
    ForceFocus.KEY = "force-focus";
    return ForceFocus;
}(ElementMediator_1.default));
Factories_1.default.register(ForceFocus.KEY, ["*"], ForceFocus);
exports.default = ForceFocus;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var Factories_1 = __importDefault(__webpack_require__(2));
/**
 *
 */
var MultiSelectValueModel = /** @class */ (function (_super) {
    __extends(MultiSelectValueModel, _super);
    function MultiSelectValueModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiSelectValueModel.prototype.wire = function () {
        this.bridge("input");
        this.on("input").forChannel("dom").invoke(this.handleInput);
        this.getModelMediator().watch(this, this.onTargetChange);
    };
    MultiSelectValueModel.prototype.unwire = function () {
        // Intentionally do nothing
    };
    MultiSelectValueModel.prototype.handleInput = function (event) {
        var _this = this;
        if (this.getEl().multiple) {
            var selectedValues_1 = [];
            for (var i = 0; i < this.getEl().selectedOptions.length; i++) {
                var optValue = this.getEl().selectedOptions.item(i).getAttribute("value");
                selectedValues_1.push(optValue);
            }
            this.$apply(function () {
                _this.getModelMediator().set(selectedValues_1);
            }, []);
        }
        else {
            this.$apply(function () {
                _this.getModelMediator().set(_this.getEl()["value"]);
            }, []);
        }
    };
    MultiSelectValueModel.prototype.onTargetChange = function (previous, current) {
        if (this.getEl().multiple) {
            current = (current === null) ? [] : current;
            for (var i = 0; i < this.getEl().options.length; i++) {
                var element = this.getEl().options.item(i);
                element.selected = current.includes(element.value);
            }
        }
        else {
            this.getEl().value = current;
        }
    };
    MultiSelectValueModel.KEY = "model";
    return MultiSelectValueModel;
}(ElementMediator_1.default));
Factories_1.default.register(MultiSelectValueModel.KEY, ["select"], MultiSelectValueModel);
exports.default = MultiSelectValueModel;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var Factories_1 = __importDefault(__webpack_require__(2));
/**
 *
 */
var ValuedModel = /** @class */ (function (_super) {
    __extends(ValuedModel, _super);
    function ValuedModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValuedModel.prototype.wire = function () {
        this.bridge("input");
        this.on("input").forChannel("dom").invoke(this.handleInput);
        this.getModelMediator().watch(this, this.onTargetChange);
    };
    ValuedModel.prototype.unwire = function () {
        // Intentionally do nothing
    };
    ValuedModel.prototype.handleInput = function (event) {
        var _this = this;
        this.$apply(function () {
            _this.getModelMediator().set(_this.getEl().value);
        }, []);
    };
    ValuedModel.prototype.onTargetChange = function (previous, current) {
        this.getEl().value = current;
    };
    ValuedModel.KEY = "model";
    return ValuedModel;
}(ElementMediator_1.default));
Factories_1.default.register(ValuedModel.KEY, ["textarea"], ValuedModel);
exports.default = ValuedModel;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var Factories_1 = __importDefault(__webpack_require__(2));
/**
 *
 */
var InputValueModel = /** @class */ (function (_super) {
    __extends(InputValueModel, _super);
    function InputValueModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputValueModel.prototype.wire = function () {
        this.bridge("input");
        var isRadio = this.getEl().type.toLowerCase() === "radio";
        this.on("input").forChannel("dom").invoke(isRadio ? this.handleRadioInput : this.handleInput);
        this.getModelMediator().watch(this, (isRadio ? this.onRadioTargetChange : this.onTargetChange));
    };
    InputValueModel.prototype.unwire = function () {
        // Intentionally do nothing
    };
    InputValueModel.prototype.handleInput = function (event) {
        var _this = this;
        this.$apply(function () {
            _this.getModelMediator().set(_this.getEl().value);
        }, []);
    };
    InputValueModel.prototype.handleRadioInput = function (event) {
        var _this = this;
        if (this.getEl().checked) {
            this.$apply(function () {
                _this.getModelMediator().set(_this.getEl().value);
            }, []);
        }
    };
    InputValueModel.prototype.onTargetChange = function (previous, current) {
        this.getEl().value = current;
    };
    InputValueModel.prototype.onRadioTargetChange = function (previous, current) {
        if (this.getEl().value === current) {
            this.getEl().checked = true;
        }
    };
    InputValueModel.KEY = "model";
    return InputValueModel;
}(ElementMediator_1.default));
Factories_1.default.register(InputValueModel.KEY, ["input"], InputValueModel);
exports.default = InputValueModel;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var Factories_1 = __importDefault(__webpack_require__(2));
/**
 *
 */
var Visible = /** @class */ (function (_super) {
    __extends(Visible, _super);
    function Visible() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Visible.prototype.wire = function () {
        this.getModelMediator().watch(this, this.onTargetChange);
    };
    Visible.prototype.unwire = function () {
        // Intentionally do nothing
    };
    Visible.prototype.onTargetChange = function (previous, current) {
        this.getEl().hidden = !current;
    };
    Visible.KEY = "visible";
    return Visible;
}(ElementMediator_1.default));
Factories_1.default.register(Visible.KEY, ["*"], Visible);
exports.default = Visible;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var Properties_1 = __importDefault(__webpack_require__(7));
var Factories_1 = __importDefault(__webpack_require__(2));
/**
 *
 */
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialized = false;
        return _this;
    }
    If.prototype.wire = function () {
        this.comment = Properties_1.default.getWindow().document.createComment(" hidden ");
        this.getModelMediator().watch(this, this.onTargetChange);
    };
    If.prototype.unwire = function () {
        // Intentionally do nothing
    };
    If.prototype.onTargetChange = function (previous, current) {
        if (this.initialized) {
            var activeEl = current ? this.comment : this.getEl();
            activeEl.parentElement.replaceChild((current ? this.getEl() : this.comment), activeEl);
        }
        else {
            if (!current) {
                this.getEl().parentElement.replaceChild(this.comment, this.getEl());
            }
            this.initialized = true;
        }
    };
    If.KEY = "if";
    return If;
}(ElementMediator_1.default));
Factories_1.default.register(If.KEY, ["*"], If);
exports.default = If;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Evaluator_1 = __importDefault(__webpack_require__(52));
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var ScopeImpl_1 = __importDefault(__webpack_require__(10));
var Properties_1 = __importDefault(__webpack_require__(7));
var Constants_1 = __webpack_require__(4);
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var Factories_1 = __importDefault(__webpack_require__(2));
var UtilityComponent_1 = __importDefault(__webpack_require__(53));
var ItemComponent_1 = __importDefault(__webpack_require__(68));
var DEFAULT_ID_KEY = "id";
/**
 *
 */
var Repeat = /** @class */ (function (_super) {
    __extends(Repeat, _super);
    function Repeat(deps) {
        return _super.call(this, deps, true) || this;
    }
    Repeat.prototype.wire = function () {
        var _this = this;
        this.map = {};
        this.empty = null;
        this.ids = [];
        this.itemTemplate = null;
        this.alternatives = [];
        this.localScope = new ScopeImpl_1.default(false);
        var modelFn = function () { return _this.getModelFn(); };
        var itemFn = function () { return _this.scopeItem; };
        this.localScope.setParent(this.getParent().scope());
        this.localScope.add("m", modelFn);
        this.localScope.add("model", modelFn);
        this.localScope.add("i", itemFn);
        this.localScope.add("item", itemFn);
        this.getModelMediator().watch(this, this.onTargetChange);
        this.idKey = this.getParams().idkey || DEFAULT_ID_KEY;
        var children = this.getEl().children;
        // tslint:disable-next-line
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if ("template" === child.nodeName.toLowerCase()) {
                var template = child;
                if (template.innerHTML) {
                    var markup = template.innerHTML.trim();
                    var type = template.getAttribute("type");
                    switch (type) {
                        case "empty":
                            this.empty = new UtilityComponent_1.default(markup, this.getParent().getPrefix(), this.getParent(), this.getParentGuard(), this.getModelFn());
                            break;
                        case "first":
                            this.first = new UtilityComponent_1.default(markup, this.getParent().getPrefix(), this.getParent(), this.getParentGuard(), this.getModelFn());
                            break;
                        case "after":
                            this.last = new UtilityComponent_1.default(markup, this.getParent().getPrefix(), this.getParent(), this.getParentGuard(), this.getModelFn());
                            break;
                        case "alt":
                            var expression = template.getAttribute("test");
                            this.alternatives.push({
                                markup: markup,
                                test: new Evaluator_1.default(expression, this.localScope)
                            });
                            break;
                        case "item":
                            this.itemTemplate = markup;
                            break;
                    }
                }
            }
        }
        var el = this.getEl();
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        if (this.empty) {
            el.appendChild(this.empty.getEl());
        }
    };
    Repeat.prototype.unwire = function () {
        if (this.empty) {
            this.empty.dispose();
        }
        if (this.first) {
            this.first.dispose();
        }
        if (this.last) {
            this.last.dispose();
        }
        for (var key in this.map) {
            if (this.map.hasOwnProperty(key)) {
                var component = this.map[key];
                component.dispose();
            }
        }
        this.empty = null;
        this.map = {};
    };
    Repeat.prototype.requestMediatorSources = function (sources) {
        for (var key in this.map) {
            if (this.map.hasOwnProperty(key)) {
                var component = this.map[key];
                component.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "consumeDigestionCandidates", sources);
            }
        }
    };
    Repeat.prototype.onTargetChange = function (previous, current) {
        var newIds = [];
        for (var _i = 0, current_1 = current; _i < current_1.length; _i++) {
            var item = current_1[_i];
            var id = item[this.idKey] + "";
            newIds.push(id);
        }
        if (!ObjectUtils_1.default.equals(this.ids, newIds)) {
            var newMap = {};
            var components = [];
            for (var _a = 0, current_2 = current; _a < current_2.length; _a++) {
                var item = current_2[_a];
                var id = item[this.idKey] + "";
                var component = this.map[id] ? this.map[id] : this.create(item);
                newMap[id] = component;
                components.push(component);
                delete this.map[id];
            }
            for (var key in this.map) {
                if (this.map.hasOwnProperty(key)) {
                    var component = this.map[key];
                    component.dispose();
                    delete this.map[key];
                }
            }
            this.map = newMap;
            var el = this.getEl();
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
            if (components.length === 0) {
                if (this.empty) {
                    el.appendChild(this.empty.getEl());
                }
            }
            else {
                var fragment = Properties_1.default.getWindow().document.createDocumentFragment();
                if (this.first) {
                    fragment.appendChild(this.first.getEl());
                }
                for (var _b = 0, components_1 = components; _b < components_1.length; _b++) {
                    var component = components_1[_b];
                    fragment.appendChild(component.getEl());
                }
                if (this.last) {
                    fragment.appendChild(this.last.getEl());
                }
                el.appendChild(fragment);
            }
        }
        this.ids = newIds;
    };
    Repeat.prototype.create = function (item) {
        var template = this.itemTemplate;
        this.scopeItem = item;
        try {
            if (this.alternatives.length > 0) {
                for (var _i = 0, _a = this.alternatives; _i < _a.length; _i++) {
                    var alternative = _a[_i];
                    if (alternative.test.test()) {
                        template = alternative.markup;
                        break;
                    }
                }
            }
        }
        finally {
            this.scopeItem = null;
        }
        return new ItemComponent_1.default(template, this.getParent().getPrefix(), this.getParent(), this.getParentGuard(), this.getModelFn(), item);
    };
    return Repeat;
}(ElementMediator_1.default));
Factories_1.default.register("repeat", ["*"], Repeat);
exports.default = Repeat;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var Evaluator = /** @class */ (function () {
    function Evaluator(expression, scope) {
        this.logger = LoggerFactory_1.default.getLogger("Evaluator: " + expression);
        this.expression = expression;
        this.scope = scope;
        this.code = '"use strict"; ' + scope.getCode() + " return (" + this.expression + ");";
    }
    Evaluator.prototype.test = function () {
        var value = null;
        try {
            value = !!Function(this.code).apply({}, [this.scope.getItems()]);
        }
        catch (e) {
            this.logger.error("\nAn exception (" + e.name + ") was thrown invoking the element mediator expression: "
                + this.expression + "\n\nIn context:\n" + this.code + "\n\nException message: " + e.message + "\n\n", e);
        }
        return value;
    };
    return Evaluator;
}());
exports.default = Evaluator;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __importDefault(__webpack_require__(12));
var ComponentConfig_1 = __webpack_require__(9);
var Constants_1 = __webpack_require__(4);
var UtilityComponent = /** @class */ (function (_super) {
    __extends(UtilityComponent, _super);
    function UtilityComponent(template, prefix, parent, parentGuard, parentModelFn) {
        var _this = this;
        var config = new ComponentConfig_1.ComponentConfigImpl();
        config.withPrefix(prefix);
        config.setParentModelFn(parentModelFn);
        _this = _super.call(this, template, config) || this;
        _this.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setParent", parent);
        _this.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "skipGuard", parentGuard);
        _this.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setMode", "repeatable");
        return _this;
    }
    return UtilityComponent;
}(Component_1.default));
exports.default = UtilityComponent;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var Constants_1 = __webpack_require__(4);
var Region = /** @class */ (function () {
    function Region(name, parent) {
        this.defaultEl = null;
        this.component = null;
        this.parent = parent;
        this.name = name;
        this.logger = LoggerFactory_1.default.getLogger("Region " + this.name + " for " + parent.getId());
    }
    Region.prototype.setDefaultEl = function (defaultEl) {
        this.defaultEl = defaultEl;
    };
    Region.prototype.setComponent = function (component) {
        this.logger.trace("Setting component");
        if (this.component === component) {
            return;
        }
        if (component !== null && this.component === null) {
            this.component = component;
            var newComponentEl = component.getEl();
            var parentElement = this.defaultEl.parentElement;
            parentElement.replaceChild(newComponentEl, this.defaultEl);
            this.component.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setParent", this.parent.getComponent());
        }
        else if (component === null && this.component !== null) {
            this.component.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setParent", null);
            var oldComponentEl = this.component.getEl();
            this.component = null;
            var parentElement = oldComponentEl.parentElement;
            parentElement.replaceChild(this.defaultEl, oldComponentEl);
        }
        else if (component !== null && this.component !== null) {
            this.component.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setParent", null);
            var newComponentEl = component.getEl();
            var oldComponentEl = this.component.getEl();
            var parentElement = oldComponentEl.parentElement;
            parentElement.replaceChild(newComponentEl, oldComponentEl);
            this.component = component;
            this.component.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setParent", this.parent.getComponent());
        }
    };
    Region.prototype.message = function (channelName, messageName, payload) {
        if (this.component !== null && this.component !== undefined) {
            this.component.message(channelName, messageName, payload);
        }
    };
    Region.prototype.hasComponent = function () {
        return !!this.component;
    };
    Region.prototype.dispose = function () {
        if (this.component) {
            this.component.dispose();
        }
        this.setComponent(null);
    };
    return Region;
}());
exports.default = Region;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCydranError_1 = __webpack_require__(5);
var UnknownRegionError = /** @class */ (function (_super) {
    __extends(UnknownRegionError, _super);
    function UnknownRegionError(msg, reps) {
        return _super.call(this, msg, reps) || this;
    }
    return UnknownRegionError;
}(AbstractCydranError_1.CydranError));
exports.default = UnknownRegionError;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MAX_SAFE_INTEGER = 9007199254740989;
var SequenceGenerator = /** @class */ (function () {
    function SequenceGenerator() {
        this.value = 0;
    }
    SequenceGenerator.prototype.next = function () {
        if (this.value >= MAX_SAFE_INTEGER) {
            this.value = -1;
        }
        this.value++;
        return this.value;
    };
    SequenceGenerator.INSTANCE = new SequenceGenerator();
    return SequenceGenerator;
}());
exports.default = SequenceGenerator;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCydranError_1 = __webpack_require__(5);
var SetComponentError = /** @class */ (function (_super) {
    __extends(SetComponentError, _super);
    function SetComponentError(msg, reps) {
        return _super.call(this, msg, reps) || this;
    }
    return SetComponentError;
}(AbstractCydranError_1.CydranError));
exports.default = SetComponentError;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Getter_1 = __importDefault(__webpack_require__(22));
var Setter_1 = __importDefault(__webpack_require__(23));
var ExternalMediator = /** @class */ (function () {
    function ExternalMediator(expression) {
        this.getter = new Getter_1.default(expression);
        this.setter = new Setter_1.default(expression);
    }
    ExternalMediator.prototype.get = function (scope) {
        return this.getter.get(scope);
    };
    ExternalMediator.prototype.set = function (scope, value) {
        this.setter.set(scope, value);
    };
    return ExternalMediator;
}());
exports.default = ExternalMediator;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var GuardGenerator_1 = __importDefault(__webpack_require__(20));
var ScopeImpl_1 = __importDefault(__webpack_require__(10));
var Constants_1 = __webpack_require__(4);
var ModelMediatorImpl_1 = __importDefault(__webpack_require__(60));
var DigestionContextImpl_1 = __importDefault(__webpack_require__(62));
var MalformedOnEventError_1 = __importDefault(__webpack_require__(64));
var TemplateError_1 = __importDefault(__webpack_require__(21));
var Modules_1 = __webpack_require__(6);
var Properties_1 = __importDefault(__webpack_require__(7));
var TextElementMediator_1 = __importDefault(__webpack_require__(65));
var EventElementMediator_1 = __importDefault(__webpack_require__(66));
var AttributeElementMediator_1 = __importDefault(__webpack_require__(67));
var Factories_1 = __importDefault(__webpack_require__(2));
var DirectEvents_1 = __importDefault(__webpack_require__(24));
var MvvmImpl = /** @class */ (function () {
    function MvvmImpl(model, moduleInstance, prefix, scope, parentModelFn) {
        var _this = this;
        this.elementMediatorPrefix = prefix + ":";
        this.eventElementMediatorPrefix = prefix + ":on";
        this.externalAttributePrefix = prefix + ":property-";
        this.regionPrefix = prefix + ":region";
        this.componentPrefix = prefix + ":component";
        this.logger = LoggerFactory_1.default.getLogger("Mvvm");
        this.guard = GuardGenerator_1.default.INSTANCE.generate();
        this.propagatingElementMediators = [];
        this.scope = new ScopeImpl_1.default(false);
        this.scope.setParent(scope);
        this.elementMediators = [];
        this.mediators = [];
        this.model = model;
        this.moduleInstance = moduleInstance;
        this.components = [];
        this.skipableGuards = [];
        var localModelFn = function () { return _this.model; };
        this.modelFn = parentModelFn ? parentModelFn : localModelFn;
        this.itemFn = function () { return _this.parent.getData(); };
        this.externalFn = function () { return _this.parent.getExternalCache(); };
        this.scope.add("m", this.modelFn);
        this.scope.add("model", this.modelFn);
        this.scope.add("i", this.itemFn);
        this.scope.add("item", this.itemFn);
        this.scope.add("e", this.externalFn);
        this.scope.add("external", this.externalFn);
    }
    MvvmImpl.prototype.init = function (el, parent, regionLookupFn) {
        this.el = el;
        this.parent = parent;
        this.regionLookupFn = regionLookupFn;
        this.validateEl();
        this.populateElementMediators();
    };
    MvvmImpl.prototype.nestingChanged = function () {
        for (var _i = 0, _a = this.elementMediators; _i < _a.length; _i++) {
            var elementMediator = _a[_i];
            elementMediator.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, DirectEvents_1.default.NESTING_CHANGED);
        }
        for (var _b = 0, _c = this.components; _b < _c.length; _b++) {
            var component = _c[_b];
            component.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, DirectEvents_1.default.NESTING_CHANGED);
        }
    };
    MvvmImpl.prototype.disableGlobal = function () {
        for (var _i = 0, _a = this.elementMediators; _i < _a.length; _i++) {
            var elementMediator = _a[_i];
            elementMediator.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "disableGlobal");
        }
        // for (const component of this.components) {
        // 	component.message(INTERNAL_DIRECT_CHANNEL_NAME, "disableGlobal");
        // }
    };
    MvvmImpl.prototype.dispose = function () {
        for (var _i = 0, _a = this.elementMediators; _i < _a.length; _i++) {
            var elementMediator = _a[_i];
            elementMediator.dispose();
        }
        this.elementMediators = [];
        this.components = [];
        for (var _b = 0, _c = this.components; _b < _c.length; _b++) {
            var component = _c[_b];
            component.dispose();
        }
        this.parent = null;
    };
    MvvmImpl.prototype.getGuard = function () {
        return this.guard;
    };
    MvvmImpl.prototype.mediate = function (expression) {
        var mediator = new ModelMediatorImpl_1.default(this.model, expression, this.scope, this);
        this.mediators.push(mediator);
        return mediator;
    };
    MvvmImpl.prototype.digest = function () {
        var _this = this;
        var start = Date.now();
        var context = new DigestionContextImpl_1.default();
        var seen = {};
        var sources = [];
        while (this.skipableGuards.length > 0) {
            var skipableGuard = this.skipableGuards.pop();
            if (skipableGuard !== null) {
                seen[skipableGuard] = true;
            }
        }
        sources.push(this);
        for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
            var component = _a[_i];
            component.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "consumeDigestionCandidates", sources);
        }
        while (sources.length > 0) {
            var source = sources.pop();
            var guard = source.getGuard();
            if (guard !== null && seen[guard]) {
                continue;
            }
            seen[guard] = true;
            source.requestMediatorSources(sources);
            source.requestMediators(context);
        }
        context.digest();
        this.logger.ifTrace(function () { return _this.getGuard() + " - Elapsed millis " + (Date.now() - start); });
    };
    MvvmImpl.prototype.requestMediators = function (consumer) {
        var _this = this;
        if (this.parent.hasExternalMediators()) {
            var mediators = [];
            mediators.push({
                evaluate: function () {
                    _this.parent.importExternals();
                    return false;
                },
                notify: function () {
                    // Intentionally do nothing
                }
            });
            for (var _i = 0, _a = this.mediators; _i < _a.length; _i++) {
                var mediator = _a[_i];
                mediators.push(mediator);
            }
            mediators.push({
                evaluate: function () {
                    _this.parent.exportExternals();
                    return false;
                },
                notify: function () {
                    // Intentionally do nothing
                }
            });
            consumer.add(this.getGuard(), mediators);
        }
        else {
            consumer.add(this.getGuard(), this.mediators);
        }
    };
    MvvmImpl.prototype.requestMediatorSources = function (sources) {
        if (this.parent.hasExternalMediators() || this.parent.getFlags().repeatable) {
            this.parent.getParent().message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "consumeDigestionCandidates", sources);
        }
        for (var _i = 0, _a = this.propagatingElementMediators; _i < _a.length; _i++) {
            var source = _a[_i];
            sources.push(source);
        }
    };
    MvvmImpl.prototype.getParent = function () {
        return this.parent;
    };
    MvvmImpl.prototype.$apply = function (fn, args) {
        var result = null;
        try {
            this.parent.importExternals();
        }
        catch (e) {
            this.logger.error("Error importing externals");
        }
        result = fn.apply(this.model, args);
        try {
            this.parent.exportExternals();
        }
        catch (e) {
            this.logger.error("Error exporting externals");
        }
        this.digest();
        return result;
    };
    MvvmImpl.prototype.getModelFn = function () {
        return this.modelFn;
    };
    MvvmImpl.prototype.getItemFn = function () {
        return this.itemFn;
    };
    MvvmImpl.prototype.getExternalFn = function () {
        return this.externalFn;
    };
    MvvmImpl.prototype.skipGuard = function (guard) {
        if (guard !== null && guard !== undefined) {
            this.skipableGuards.push(guard);
        }
    };
    MvvmImpl.prototype.validateEl = function () {
        if (this.el.tagName.toLowerCase() === this.componentPrefix.toLowerCase()) {
            throw new TemplateError_1.default("Templates must not have a component tag as the top level tag.");
        }
    };
    MvvmImpl.prototype.populateElementMediators = function () {
        var queue = [this.el];
        while (queue.length > 0) {
            this.processChild(queue);
        }
    };
    MvvmImpl.prototype.processChild = function (queue) {
        var el = queue.pop();
        var EVT_NAME_ERR = "Event expressor \'%eventName%\' MUST correspond to a valid event in the target environment: \'";
        var regex = /^[A-Za-z]+$/;
        var elName = el.tagName.toLowerCase();
        if (elName === this.regionPrefix) {
            var regionName = el.getAttribute("name");
            var region = this.regionLookupFn(regionName);
            region.setDefaultEl(el);
            return;
        }
        else if (elName === this.componentPrefix) {
            var componentName = el.getAttribute("name");
            var moduleName = el.getAttribute("module");
            var moduleToUse = moduleName ? Modules_1.Modules.getModule(moduleName) : this.moduleInstance;
            var component = (moduleToUse || this.moduleInstance).get(componentName);
            el.parentElement.replaceChild(component.getEl(), el);
            for (var i = el.attributes.length - 1; i >= 0; i--) {
                var attributeName = el.attributes[i].name.toLowerCase();
                var attributeValue = el.attributes[i].value;
                if (attributeName.indexOf(this.externalAttributePrefix) === 0) {
                    var propertyName = attributeName.substr(this.externalAttributePrefix.length);
                    var detail = {
                        attributeName: propertyName,
                        expression: attributeValue
                    };
                    component.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "addExternalAttribute", detail);
                }
            }
            component.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setParentScope", this.scope);
            component.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setParent", this.parent.getComponent());
            component.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setMode", "repeatable");
            this.components.push(component);
            return;
        }
        // tslint:disable-next-line
        for (var i = 0; i < el.children.length; i++) {
            queue.push(el.children[i]);
        }
        this.processTextChildren(el.childNodes);
        var attributes = el.attributes;
        var length = attributes.length;
        var names = [];
        for (var i = 0; i < length; i++) {
            names.push(attributes[i].name);
        }
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            var expression = el.getAttribute(name_1);
            if (name_1.indexOf(this.eventElementMediatorPrefix) === 0) {
                var eventName = name_1.substr(this.eventElementMediatorPrefix.length);
                if (!regex.test(eventName)) {
                    throw new MalformedOnEventError_1.default(EVT_NAME_ERR, { "%eventName%": eventName });
                }
                this.addEventElementMediator(eventName.toLowerCase(), expression, el);
                el.removeAttribute(name_1);
            }
            else if (name_1.indexOf(this.elementMediatorPrefix) === 0) {
                var elementMediatorType = name_1.substr(this.elementMediatorPrefix.length);
                this.addElementMediator(el.tagName.toLowerCase(), elementMediatorType, expression, el);
                el.removeAttribute(name_1);
            }
            else if (expression.length > 4 && expression.indexOf("{{") === 0 && expression.indexOf("}}", expression.length - 2) !== -1) {
                var trimmedExpression = expression.substring(2, expression.length - 2);
                this.addAttributeElementMediator(name_1, trimmedExpression, el);
            }
        }
    };
    MvvmImpl.prototype.processTextChildren = function (children) {
        var discoveredNodes = [];
        // tslint:disable-next-line
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (Constants_1.TEXT_NODE_TYPE === child.nodeType) {
                discoveredNodes.push(child);
            }
        }
        for (var _i = 0, discoveredNodes_1 = discoveredNodes; _i < discoveredNodes_1.length; _i++) {
            var node = discoveredNodes_1[_i];
            var result = this.splitChild(node);
            if (result.length > 1) {
                for (var _a = 0, result_1 = result; _a < result_1.length; _a++) {
                    var newNode = result_1[_a];
                    node.parentNode.insertBefore(newNode, node);
                }
                node.remove();
            }
        }
    };
    MvvmImpl.prototype.splitChild = function (node) {
        var source = node.textContent || "";
        var sections = source.split(/(\{\{|\}\})/);
        if (sections.length < 2) {
            return [node];
        }
        var inside = false;
        var collected = [];
        for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
            var section = sections_1[_i];
            switch (section) {
                case "{{":
                    inside = true;
                    break;
                case "}}":
                    inside = false;
                    break;
                default:
                    if (inside) {
                        var beginComment = Properties_1.default.getWindow().document.createComment("#");
                        collected.push(beginComment);
                        var textNode = Properties_1.default.getWindow().document.createTextNode(section);
                        textNode.textContent = "";
                        this.addTextElementMediator(section, textNode);
                        collected.push(textNode);
                        var endComment = Properties_1.default.getWindow().document.createComment("#");
                        collected.push(endComment);
                    }
                    else {
                        var textNode = Properties_1.default.getWindow().document.createTextNode(section);
                        collected.push(textNode);
                    }
                    break;
            }
        }
        return collected;
    };
    MvvmImpl.prototype.addTextElementMediator = function (expression, el) {
        var deps = { mvvm: this, parent: this.parent, el: el, expression: expression, model: this.model, prefix: "Text" };
        var elementMediator = new TextElementMediator_1.default(deps);
        elementMediator.setModule(this.moduleInstance);
        elementMediator.init();
        this.elementMediators.push(elementMediator);
    };
    MvvmImpl.prototype.addEventElementMediator = function (eventName, expression, el) {
        var deps = { mvvm: this, parent: this.parent, el: el, expression: expression, model: this.model, prefix: "Event" };
        var elementMediator = new EventElementMediator_1.default(deps);
        elementMediator.setModule(this.moduleInstance);
        elementMediator.setEventKey(eventName);
        elementMediator.init();
        this.elementMediators.push(elementMediator);
    };
    MvvmImpl.prototype.addAttributeElementMediator = function (attributeName, expression, el) {
        var deps = { mvvm: this, parent: this.parent, el: el, expression: expression, model: this.model, prefix: "Event" };
        var elementMediator = new AttributeElementMediator_1.default(deps);
        elementMediator.setModule(this.moduleInstance);
        elementMediator.setAttributeName(attributeName);
        elementMediator.init();
        this.elementMediators.push(elementMediator);
    };
    MvvmImpl.prototype.addElementMediator = function (tag, elementMediatorType, attributeValue, el) {
        var tags = Factories_1.default.get(elementMediatorType);
        var prefix = this.elementMediatorPrefix + elementMediatorType;
        var elementMediator = null;
        if (!tags) {
            return;
        }
        var elementMediatorClass = tags[tag];
        if (!elementMediatorClass) {
            elementMediatorClass = tags["*"];
        }
        if (!elementMediatorClass) {
            this.logger.error("Unsupported tag: " + tag + " for elementMediator " + elementMediatorType + ".");
            return;
        }
        var deps = { mvvm: this, parent: this.parent, el: el, expression: attributeValue, model: this.model, prefix: prefix };
        elementMediator = new elementMediatorClass(deps);
        elementMediator.setModule(this.moduleInstance);
        elementMediator.init();
        this.elementMediators.push(elementMediator);
        if (elementMediator.hasPropagation()) {
            this.propagatingElementMediators.push(elementMediator);
        }
    };
    return MvvmImpl;
}());
exports.default = MvvmImpl;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Getter_1 = __importDefault(__webpack_require__(22));
var Invoker_1 = __importDefault(__webpack_require__(61));
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var Setter_1 = __importDefault(__webpack_require__(23));
var requireNotNull = ObjectUtils_1.default.requireNotNull;
var DEFAULT_REDUCER = function (input) { return input; };
var ModelMediatorImpl = /** @class */ (function () {
    function ModelMediatorImpl(model, expression, scope, mvvm) {
        this.digested = false;
        this.model = requireNotNull(model, "model");
        this.expression = requireNotNull(expression, "expression");
        this.scope = requireNotNull(scope, "scope");
        this.mvvm = requireNotNull(mvvm, "mvvm");
        this.logger = LoggerFactory_1.default.getLogger("ModelMediator: " + expression);
        this.previous = null;
        this.context = {};
        this.target = null;
        this.watchDispatchPending = false;
        this.reducerFn = DEFAULT_REDUCER;
        this.invoker = new Invoker_1.default(expression);
        this.getter = new Getter_1.default(expression);
        this.setter = new Setter_1.default(expression);
    }
    ModelMediatorImpl.prototype.invoke = function (params) {
        this.invoker.invoke(this.scope, params || {});
    };
    ModelMediatorImpl.prototype.get = function () {
        return this.getter.get(this.scope);
    };
    ModelMediatorImpl.prototype.set = function (value) {
        this.setter.set(this.scope, value);
    };
    ModelMediatorImpl.prototype.evaluate = function () {
        if (!this.target) {
            return false;
        }
        // Check for opts out of digestion
        var changed = false;
        var value = this.get();
        var valueFragment = this.reducerFn(value);
        if (this.digested) {
            if (ObjectUtils_1.default.equals(this.previousFragment, valueFragment)) {
                this.logger.trace("Not different.");
            }
            else {
                if (this.logger.isTrace()) {
                    this.logger.trace({ current: value, previous: this.previous });
                }
                this.logger.trace("Invoking listener");
                this.swap(value, valueFragment);
                changed = true;
            }
        }
        else {
            this.swap(value, valueFragment);
            changed = true;
            this.digested = true;
        }
        return changed;
    };
    ModelMediatorImpl.prototype.notify = function () {
        if (this.watchDispatchPending) {
            this.mvvm.getParent().importExternals();
            this.target.apply(this.context, [this.watchPrevious, this.watchCurrent]);
            this.mvvm.getParent().exportExternals();
            this.watchDispatchPending = false;
        }
    };
    ModelMediatorImpl.prototype.watch = function (context, target) {
        this.context = requireNotNull(context, "context");
        this.target = requireNotNull(target, "target");
    };
    ModelMediatorImpl.prototype.dispose = function () {
        this.model = null;
        this.mvvm = null;
        this.previous = null;
        this.context = null;
        this.target = null;
        this.watchPrevious = null;
        this.watchCurrent = null;
        this.watchDispatchPending = false;
    };
    ModelMediatorImpl.prototype.setReducer = function (reducerFn) {
        this.reducerFn = (reducerFn === null) ? DEFAULT_REDUCER : reducerFn;
    };
    ModelMediatorImpl.prototype.getExpression = function () {
        return this.expression;
    };
    ModelMediatorImpl.prototype.swap = function (value, valueFragment) {
        var newPrevious = ObjectUtils_1.default.clone(value);
        var newPreviousFragment = ObjectUtils_1.default.clone(valueFragment);
        this.watchPrevious = this.previous;
        this.watchCurrent = value;
        this.watchDispatchPending = true;
        this.previous = newPrevious;
        this.previousFragment = newPreviousFragment;
    };
    return ModelMediatorImpl;
}());
exports.default = ModelMediatorImpl;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var Invoker = /** @class */ (function () {
    function Invoker(expression) {
        this.expression = expression;
        this.logger = LoggerFactory_1.default.getLogger("Invoker: " + expression);
    }
    Invoker.prototype.invoke = function (scope, params) {
        var aggregateScope = {};
        var scopeItems = scope.getItems();
        for (var key in scopeItems) {
            if (scopeItems.hasOwnProperty(key)) {
                aggregateScope[key] = scopeItems[key];
            }
        }
        if (params !== null && params !== undefined) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    aggregateScope[key] = params[key];
                }
            }
        }
        var aggregateScopeCode = "";
        for (var key in aggregateScope) {
            if (aggregateScope.hasOwnProperty(key)) {
                var statement = "var " + key + " = arguments[0]['" + key + "'];\n";
                aggregateScopeCode += statement;
            }
        }
        var code = '"use strict"; ' + aggregateScopeCode + " (" + this.expression + ");";
        try {
            Function(code).apply({}, [aggregateScope]);
        }
        catch (e) {
            this.logInvocationError(code, e);
        }
    };
    Invoker.prototype.logInvocationError = function (code, e) {
        this.logger.error("\nAn exception (" + e.name + ") was thrown invoking the element mediator expression: " + this.expression
            + "\n\nIn context:\n" + code + "\n\nException message: " + e.message + "\n\n", e);
    };
    return Invoker;
}());
exports.default = Invoker;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DigestLoopError_1 = __importDefault(__webpack_require__(63));
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var MAX_EVALUATIONS = 10000;
var DigestionContextImpl = /** @class */ (function () {
    function DigestionContextImpl() {
        this.logger = LoggerFactory_1.default.getLogger("DigestionContextImpl");
        this.mediators = {};
    }
    DigestionContextImpl.prototype.add = function (key, mediators) {
        if (!this.mediators[key]) {
            this.mediators[key] = [];
            for (var _i = 0, mediators_1 = mediators; _i < mediators_1.length; _i++) {
                var mediator = mediators_1[_i];
                this.mediators[key].push(mediator);
            }
        }
    };
    DigestionContextImpl.prototype.digest = function () {
        var remainingEvaluations = MAX_EVALUATIONS;
        var pending = true;
        var tracker = {
            executions: 0,
            notifications: 0
        };
        while (pending && remainingEvaluations > 0) {
            remainingEvaluations--;
            var changedMediators = [];
            for (var key in this.mediators) {
                if (!this.mediators.hasOwnProperty(key)) {
                    continue;
                }
                var current = this.mediators[key];
                this.digestSegment(changedMediators, current, tracker);
            }
            if (changedMediators.length === 0) {
                pending = false;
                break;
            }
            for (var _i = 0, changedMediators_1 = changedMediators; _i < changedMediators_1.length; _i++) {
                var changedMediator = changedMediators_1[_i];
                tracker.notifications++;
                changedMediator.notify();
            }
        }
        if (remainingEvaluations === 0) {
            // TODO - Make this error handling better
            throw new DigestLoopError_1.default("Loop detected in digest cycle.");
        }
        this.logger.ifTrace(function () { return ({
            digestion: tracker
        }); });
    };
    DigestionContextImpl.prototype.digestSegment = function (changedMediators, mediators, tracker) {
        for (var _i = 0, mediators_2 = mediators; _i < mediators_2.length; _i++) {
            var mediator = mediators_2[_i];
            var changed = false;
            try {
                tracker.executions++;
                changed = mediator.evaluate();
            }
            catch (e) {
                this.logger.error("Error evaluating mediator: " + mediator.constructor.name);
            }
            if (changed) {
                changedMediators.push(mediator);
            }
        }
    };
    return DigestionContextImpl;
}());
exports.default = DigestionContextImpl;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCydranError_1 = __webpack_require__(5);
var DigestLoopError = /** @class */ (function (_super) {
    __extends(DigestLoopError, _super);
    function DigestLoopError(msg, reps) {
        return _super.call(this, msg, reps) || this;
    }
    return DigestLoopError;
}(AbstractCydranError_1.CydranError));
exports.default = DigestLoopError;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCydranError_1 = __webpack_require__(5);
var MalformedOnEventError = /** @class */ (function (_super) {
    __extends(MalformedOnEventError, _super);
    function MalformedOnEventError(msg, reps) {
        return _super.call(this, msg, reps) || this;
    }
    return MalformedOnEventError;
}(AbstractCydranError_1.CydranError));
exports.default = MalformedOnEventError;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var TextElementMediator = /** @class */ (function (_super) {
    __extends(TextElementMediator, _super);
    function TextElementMediator(dependencies) {
        return _super.call(this, dependencies, false) || this;
    }
    TextElementMediator.prototype.wire = function () {
        this.getModelMediator().watch(this, this.onTargetChange);
    };
    TextElementMediator.prototype.unwire = function () {
        // Intentionally do nothing
    };
    TextElementMediator.prototype.onTargetChange = function (previous, current) {
        var replacement = ObjectUtils_1.default.encodeHtml(current);
        this.getEl().textContent = replacement;
    };
    return TextElementMediator;
}(ElementMediator_1.default));
exports.default = TextElementMediator;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var EventElementMediator = /** @class */ (function (_super) {
    __extends(EventElementMediator, _super);
    function EventElementMediator(dependencies) {
        return _super.call(this, dependencies, false) || this;
    }
    EventElementMediator.prototype.unwire = function () {
        // Intentionally do nothing
    };
    EventElementMediator.prototype.handleEvent = function (event) {
        var _this = this;
        this.$apply(function () {
            _this.getModelMediator().invoke({
                event: event
            });
        }, [event]);
    };
    EventElementMediator.prototype.wire = function () {
        this.bridge(this.eventKey);
        this.on(this.eventKey).forChannel("dom").invoke(this.handleEvent);
    };
    EventElementMediator.prototype.setEventKey = function (eventKey) {
        this.eventKey = eventKey;
    };
    return EventElementMediator;
}(ElementMediator_1.default));
exports.default = EventElementMediator;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementMediator_1 = __importDefault(__webpack_require__(0));
var AttributeElementMediator = /** @class */ (function (_super) {
    __extends(AttributeElementMediator, _super);
    function AttributeElementMediator(dependencies) {
        return _super.call(this, dependencies, false) || this;
    }
    AttributeElementMediator.prototype.wire = function () {
        this.getModelMediator().watch(this, this.onTargetChange);
    };
    AttributeElementMediator.prototype.unwire = function () {
        // Intentionally do nothing
    };
    AttributeElementMediator.prototype.setAttributeName = function (attributeName) {
        this.attributeName = attributeName;
    };
    AttributeElementMediator.prototype.onTargetChange = function (previous, current) {
        this.getEl().setAttribute(this.attributeName, current + "");
    };
    return AttributeElementMediator;
}(ElementMediator_1.default));
exports.default = AttributeElementMediator;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __importDefault(__webpack_require__(12));
var ComponentConfig_1 = __webpack_require__(9);
var Constants_1 = __webpack_require__(4);
var ComponentInternalsImpl_1 = __importDefault(__webpack_require__(15));
var ItemComponent = /** @class */ (function (_super) {
    __extends(ItemComponent, _super);
    function ItemComponent(template, prefix, parent, parentGuard, parentModelFn, data) {
        var _this = this;
        var config = new ComponentConfig_1.ComponentConfigImpl();
        config.withPrefix(prefix);
        config.setParentModelFn(parentModelFn);
        _this = _super.call(this, template, config) || this;
        _this.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setMode", "repeatable");
        _this.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setData", data);
        _this.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "skipGuard", parentGuard);
        _this.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setParent", parent);
        return _this;
    }
    ItemComponent.prototype.____internal$$cydran$$init____ = function (template, config) {
        this[Constants_1.COMPONENT_INTERNALS_FIELD_NAME] = new ComponentInternalsImpl_1.default(this, template, config);
        this[Constants_1.COMPONENT_INTERNALS_FIELD_NAME]["init"]();
    };
    return ItemComponent;
}(Component_1.default));
exports.default = ItemComponent;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CydranConfig_1 = __importDefault(__webpack_require__(25));
var DomUtils_1 = __importDefault(__webpack_require__(80));
var LoggerFactory_1 = __importDefault(__webpack_require__(1));
var ObjectUtils_1 = __importDefault(__webpack_require__(3));
var ValidationRegExp_1 = __webpack_require__(8);
var Modules_1 = __webpack_require__(6);
var StageComponent_1 = __importDefault(__webpack_require__(81));
var Constants_1 = __webpack_require__(4);
var requireNotNull = ObjectUtils_1.default.requireNotNull;
var requireValid = ObjectUtils_1.default.requireValid;
var StageBuilderImpl = /** @class */ (function () {
    function StageBuilderImpl(rootSelector) {
        this.config = new CydranConfig_1.default();
        this.instance = new StageImpl(rootSelector);
    }
    StageBuilderImpl.prototype.withComponentBefore = function (id, moduleName) {
        this.instance.withComponentBefore(id, moduleName);
        return this;
    };
    StageBuilderImpl.prototype.withComponentAfter = function (id, moduleName) {
        this.instance.withComponentAfter(id, moduleName);
        return this;
    };
    StageBuilderImpl.prototype.withComponent = function (id, moduleName) {
        return this.withComponentAfter(id, moduleName);
    };
    StageBuilderImpl.prototype.withInitializer = function (callback) {
        this.instance.withInitializer(callback);
        return this;
    };
    StageBuilderImpl.prototype.withTraceLogging = function () {
        this.config.useTrace();
        return this;
    };
    StageBuilderImpl.prototype.withDebugLogging = function () {
        this.config.useDebug();
        return this;
    };
    StageBuilderImpl.prototype.withInfoLogging = function () {
        this.config.useInfo();
        return this;
    };
    StageBuilderImpl.prototype.withWarnLogging = function () {
        this.config.useWarn();
        return this;
    };
    StageBuilderImpl.prototype.withErrorLogging = function () {
        this.config.useError();
        return this;
    };
    StageBuilderImpl.prototype.withFatalLogging = function () {
        this.config.useFatal();
        return this;
    };
    StageBuilderImpl.prototype.withLoggingDisabled = function () {
        this.config.useDisabled();
        return this;
    };
    StageBuilderImpl.prototype.getModule = function (name) {
        return Modules_1.Modules.getModule(name);
    };
    StageBuilderImpl.prototype.getDefaultModule = function () {
        return Modules_1.Modules.getDefaultModule();
    };
    StageBuilderImpl.prototype.forEach = function (fn) {
        Modules_1.Modules.forEach(fn);
        return this;
    };
    StageBuilderImpl.prototype.withElementMediator = function (name, supportedTags, elementMediatorClass) {
        Modules_1.Modules.registerElementMediator(name, supportedTags, elementMediatorClass);
        return this;
    };
    StageBuilderImpl.prototype.withConstant = function (id, instance) {
        Modules_1.Modules.registerConstant(id, instance);
        return this;
    };
    StageBuilderImpl.prototype.withPrototype = function (id, classInstance, dependencies) {
        Modules_1.Modules.registerPrototype(id, classInstance, dependencies);
        return this;
    };
    StageBuilderImpl.prototype.withSingleton = function (id, classInstance, dependencies) {
        Modules_1.Modules.registerSingleton(id, classInstance, dependencies);
        return this;
    };
    StageBuilderImpl.prototype.withCapability = function (capability) {
        requireNotNull(capability, "capability")(this);
        return this;
    };
    StageBuilderImpl.prototype.withScopeItem = function (name, item) {
        Modules_1.Modules.getScope().add(name, item);
        return this;
    };
    StageBuilderImpl.prototype.build = function () {
        return this.instance;
    };
    return StageBuilderImpl;
}());
var StageImpl = /** @class */ (function () {
    function StageImpl(rootSelector) {
        this.rootSelector = requireNotNull(rootSelector, "rootSelector");
        this.logger = LoggerFactory_1.default.getLogger("Stage");
        this.started = false;
        this.initializers = [];
        this.topComponentIds = [];
        this.bottomComponentIds = [];
        this.root = null;
    }
    StageImpl.prototype.withInitializer = function (callback) {
        requireNotNull(callback, "callback");
        this.initializers.push(callback);
        return this;
    };
    StageImpl.prototype.withComponentBefore = function (id, moduleName) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        this.topComponentIds.push({
            componentId: id,
            moduleId: moduleName || Constants_1.DEFAULT_MODULE_KEY
        });
    };
    StageImpl.prototype.withComponentAfter = function (id, moduleName) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        this.bottomComponentIds.push({
            componentId: id,
            moduleId: moduleName || Constants_1.DEFAULT_MODULE_KEY
        });
    };
    StageImpl.prototype.start = function () {
        var _this = this;
        this.logger.debug("Start Requested");
        if (this.started) {
            this.logger.debug("Aleady Started");
            return;
        }
        this.logger.debug("Cydran Starting");
        Modules_1.Modules.registerConstant("stage", this);
        DomUtils_1.default.domReady(function () { return _this.domReady(); });
    };
    StageImpl.prototype.setComponent = function (component) {
        this.root.setChild("body", component);
        return this;
    };
    StageImpl.prototype.setComponentFromRegistry = function (componentName, defaultComponentName) {
        requireNotNull(componentName, "componentName");
        this.root.setChildFromRegistry("body", componentName, defaultComponentName);
        return this;
    };
    StageImpl.prototype.get = function (id) {
        requireValid(id, "id", ValidationRegExp_1.VALID_ID);
        return this.root.get(id);
    };
    StageImpl.prototype.getModule = function (name) {
        return Modules_1.Modules.getModule(name);
    };
    StageImpl.prototype.getDefaultModule = function () {
        return Modules_1.Modules.getDefaultModule();
    };
    StageImpl.prototype.forEach = function (fn) {
        Modules_1.Modules.forEach(fn);
    };
    StageImpl.prototype.broadcast = function (channelName, messageName, payload) {
        Modules_1.Modules.broadcast(channelName, messageName, payload);
    };
    StageImpl.prototype.registerConstant = function (id, instance) {
        Modules_1.Modules.registerConstant(id, instance);
    };
    StageImpl.prototype.registerPrototype = function (id, classInstance, dependencies) {
        Modules_1.Modules.registerPrototype(id, classInstance, dependencies);
    };
    StageImpl.prototype.registerSingleton = function (id, classInstance, dependencies) {
        Modules_1.Modules.registerSingleton(id, classInstance, dependencies);
    };
    StageImpl.prototype.getScope = function () {
        return Modules_1.Modules.getScope();
    };
    StageImpl.prototype.domReady = function () {
        this.logger.debug("DOM Ready");
        this.root = new StageComponent_1.default(this.rootSelector, this.topComponentIds, this.bottomComponentIds);
        this.root.message(Constants_1.INTERNAL_DIRECT_CHANNEL_NAME, "setParent", null);
        this.started = true;
        this.logger.debug("Running initializers");
        for (var _i = 0, _a = this.initializers; _i < _a.length; _i++) {
            var initializer = _a[_i];
            initializer.apply(this);
        }
        this.logger.debug("Startup Complete");
    };
    return StageImpl;
}());
exports.StageImpl = StageImpl;
var builder = function (rootSelector) {
    return new StageBuilderImpl(rootSelector);
};
exports.builder = builder;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Properties_1 = __importDefault(__webpack_require__(7));
// TODO - Refactor this
var domReady = function (callback) {
    var ready = false;
    var WIN = Properties_1.default.getWindow();
    var DOC = WIN.document;
    var detach = function () {
        if (DOC.addEventListener) {
            DOC.removeEventListener("DOMContentLoaded", completed);
            WIN.removeEventListener("load", completed);
        }
        else {
            WIN["detachEvent"]("onreadystatechange", completed);
            WIN["detachEvent"]("onload", completed);
        }
    };
    var completed = function () {
        if (!ready && (DOC.addEventListener || event.type === "load" || DOC.readyState === "complete")) {
            ready = true;
            detach();
            callback();
        }
    };
    if (DOC.readyState === "complete") {
        callback();
    }
    else if (DOC.addEventListener) {
        DOC.addEventListener("DOMContentLoaded", completed);
        WIN.addEventListener("load", completed);
    }
    else {
        DOC["attachEvent"]("onreadystatechange", completed);
        WIN["attachEvent"]("onload", completed);
        var top_1 = false;
        try {
            top_1 = (WIN.frameElement == null && DOC.documentElement) ? true : false;
        }
        catch (e) {
            // Intentionally do nothing
        }
        if (top_1 && top_1["doScroll"]) {
            (function scrollCheck() {
                if (ready) {
                    return;
                }
                try {
                    top_1["doScroll"]("left");
                }
                catch (e) {
                    return setTimeout(scrollCheck, 50);
                }
                ready = true;
                detach();
                callback();
            })();
        }
    }
};
var result = {
    domReady: domReady
};
exports.default = result;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = __webpack_require__(4);
var StageComponentInternals_1 = __importDefault(__webpack_require__(82));
var ComponentConfig_1 = __webpack_require__(9);
var Component_1 = __importDefault(__webpack_require__(12));
var Modules_1 = __webpack_require__(6);
var StageComponent = /** @class */ (function (_super) {
    __extends(StageComponent, _super);
    function StageComponent(selector, topComponentIds, bottomComponentIds) {
        var _this = this;
        var config = new ComponentConfig_1.ComponentConfigImpl();
        config.setTopComponentIds(topComponentIds);
        config.setBottomComponentIds(bottomComponentIds);
        _this = _super.call(this, selector, config) || this;
        return _this;
    }
    StageComponent.prototype.setComponent = function (component) {
        this.setChild("body", component);
        return this;
    };
    StageComponent.prototype.isConnected = function () {
        return true;
    };
    StageComponent.prototype.____internal$$cydran$$init____ = function (template, config) {
        this[Constants_1.COMPONENT_INTERNALS_FIELD_NAME] = new StageComponentInternals_1.default(this, template, config);
        this[Constants_1.COMPONENT_INTERNALS_FIELD_NAME]["init"]();
    };
    return StageComponent;
}(Component_1.default));
StageComponent["prototype"][Constants_1.MODULE_FIELD_NAME] = Modules_1.Modules.DEFAULT_MODULE;
exports.default = StageComponent;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Properties_1 = __importDefault(__webpack_require__(7));
var SelectorError_1 = __importDefault(__webpack_require__(83));
var ComponentInternalsImpl_1 = __importDefault(__webpack_require__(15));
var StageComponentInternals = /** @class */ (function (_super) {
    __extends(StageComponentInternals, _super);
    function StageComponentInternals() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StageComponentInternals.prototype.render = function () {
        var elements = Properties_1.default.getWindow().document.querySelectorAll(this.getTemplate());
        var eLength = ((elements) ? elements.length : 0);
        var errMsg = (eLength !== 1) ? "CSS selector MUST identify single HTMLElement: '%pattern%' - %qty% found" : null;
        if (errMsg) {
            var patSubObj = { "%pattern%": this.getTemplate(), "%qty%": eLength };
            var error = new SelectorError_1.default(errMsg, patSubObj);
            this.getLogger().fatal(error);
            throw error;
        }
        var element = elements[0];
        var topIds = this.getConfig().getTopComponentIds();
        var bottomIds = this.getConfig().getBottomComponentIds();
        while (element.hasChildNodes()) {
            element.removeChild(element.firstChild);
        }
        for (var _i = 0, topIds_1 = topIds; _i < topIds_1.length; _i++) {
            var pair = topIds_1[_i];
            var componentDiv = Properties_1.default.getWindow().document.createElement("c:component");
            componentDiv.setAttribute("name", pair.componentId);
            componentDiv.setAttribute("module", pair.moduleId);
            element.appendChild(componentDiv);
        }
        var regionDiv = Properties_1.default.getWindow().document.createElement("c:region");
        regionDiv.setAttribute("name", "body");
        element.appendChild(regionDiv);
        this.setEl(element);
        for (var _a = 0, bottomIds_1 = bottomIds; _a < bottomIds_1.length; _a++) {
            var pair = bottomIds_1[_a];
            var componentDiv = Properties_1.default.getWindow().document.createElement("c:component");
            componentDiv.setAttribute("name", pair.componentId);
            componentDiv.setAttribute("module", pair.moduleId);
            element.appendChild(componentDiv);
        }
    };
    return StageComponentInternals;
}(ComponentInternalsImpl_1.default));
exports.default = StageComponentInternals;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCydranError_1 = __webpack_require__(5);
var SelectorError = /** @class */ (function (_super) {
    __extends(SelectorError, _super);
    function SelectorError(msg, reps) {
        return _super.call(this, msg, reps) || this;
    }
    return SelectorError;
}(AbstractCydranError_1.CydranError));
exports.default = SelectorError;


/***/ })
/******/ ]);
});
//# sourceMappingURL=cydran.js.map