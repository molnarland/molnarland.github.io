/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _LanguageModel = __webpack_require__(1);
	
	var _LanguageModel2 = _interopRequireDefault(_LanguageModel);
	
	var _DatabaseController = __webpack_require__(3);
	
	var _DatabaseController2 = _interopRequireDefault(_DatabaseController);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var dc = new _DatabaseController2.default();
	dc.select('languages');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LanguageModel =
	/**
	 * @param {{id: number, hu: string, en: string}} attributes
	 */
	function LanguageModel(attributes) {
	    _classCallCheck(this, LanguageModel);
	
	    __webpack_require__(2).checkSomeTypes(['object', 'number', 'string', 'string'], [attributes, attributes.id, attributes.hu, attributes.en]);
	
	    this.id = attributes.id || null;
	    this.hu = attributes.hu || null;
	    this.en = attributes.en || null;
	};
	
	exports.default = LanguageModel;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * @param {object} obj
	 * @return {boolean}
	 */
	function isEmptyObject(obj) {
	    return Object.keys(obj).length === 0 && obj.constructor === Object;
	}
	
	/**
	 * @use http://usejsdoc.org/ type logic
	 * @param {string} type
	 * @param value
	 * @return {boolean|TypeError} - True if not error
	 */
	function checkType(type, value) {
	    var error = false;
	
	    if (typeof type == 'string') {
	        //if array this type
	        if (type.substring(type.length - 2) === '[]') {
	            if (Object.prototype.toString.call(value) === '[object Array]') {
	                var typeOfArray = type.substring(0, type.length - 2);
	
	                if (typeOfArray != '*') {
	                    var lengthOfValue = value.length;
	                    for (var i = 0; i < lengthOfValue; i++) {
	                        if (_typeof(value[i]) != typeOfArray) {
	                            error = true;
	                        }
	                    }
	                }
	            } else {
	                error = true;
	            }
	        } else if (type != '*' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) != type) {
	            error = true;
	        }
	    } else {
	        error = true;
	    }
	
	    if (error) {
	        throw new TypeError('This value ' + value + ' isn\'t ' + type);
	    }
	
	    return true;
	}
	
	/**
	 * @param {string[]} types
	 * @param {*[]} values
	 * @return {boolean} - True if not error
	 */
	function checkSomeTypes(types, values) {
	    checkType('string[]', types);
	    checkType('*[]', values);
	
	    var error = true;
	
	    var lengthOfValues = values.length;
	    for (var index = 0; index < lengthOfValues; index++) {
	        if (checkType(types[index], values[index])) {
	            error = false;
	        }
	    }
	
	    return !error;
	}
	
	module.exports = {
	    isEmptyObject: isEmptyObject,
	    checkType: checkType,
	    checkSomeTypes: checkSomeTypes
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DatabaseController = function () {
	    function DatabaseController() {
	        _classCallCheck(this, DatabaseController);
	    }
	
	    _createClass(DatabaseController, [{
	        key: "select",
	        value: function select(from) {
	            this.loadJSON(from, function (response) {
	                console.log(response);
	            });
	        }
	
	        /**
	         * @author https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
	         * @param {string} filename
	         * @param {function} callback
	         */
	
	    }, {
	        key: "loadJSON",
	        value: function loadJSON(filename, callback) {
	            var xobj = new XMLHttpRequest();
	            xobj.overrideMimeType("application/json");
	            xobj.open('GET', "json/" + filename + ".json", true);
	            xobj.onreadystatechange = function () {
	                if (xobj.readyState == 4 && xobj.status == "200") {
	                    callback(JSON.parse(xobj.responseText)[filename]);
	                }
	            };
	            xobj.send(null);
	        }
	    }]);
	
	    return DatabaseController;
	}();
	
	exports.default = DatabaseController;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map