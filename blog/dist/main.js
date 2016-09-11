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
	
	var _imports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DatabaseController = exports.PostModel = exports.LabelModel = exports.LanguageModel = undefined;
	
	var _LanguageModel = __webpack_require__(2);
	
	var _LanguageModel2 = _interopRequireDefault(_LanguageModel);
	
	var _LabelModel = __webpack_require__(3);
	
	var _LabelModel2 = _interopRequireDefault(_LabelModel);
	
	var _PostModel = __webpack_require__(4);
	
	var _PostModel2 = _interopRequireDefault(_PostModel);
	
	var _DatabaseController = __webpack_require__(5);
	
	var _DatabaseController2 = _interopRequireDefault(_DatabaseController);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.LanguageModel = _LanguageModel2.default;
	exports.LabelModel = _LabelModel2.default;
	exports.PostModel = _PostModel2.default;
	exports.DatabaseController = _DatabaseController2.default;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LanguageModel =
	/**
	 * @param {{id: number, hu: string, en: string}} attributes
	 */
	function LanguageModel() {
	    var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, LanguageModel);
	
	    this.id = attributes.id || null;
	    this.hu = attributes.hu || null;
	    this.en = attributes.en || null;
	};
	
	exports.default = LanguageModel;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _imports = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LabelModel = function LabelModel() {
	    var _this = this;
	
	    var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, LabelModel);
	
	    this.id = attributes.id || null;
	    this.lang_id = attributes.lang_id || null;
	
	    var dc = new _imports.DatabaseController();
	
	    if (this.lang_id) {
	        (function () {
	            var that = _this;
	            dc.select('languages', function (result) {
	                that.language = result[0];
	            }, {
	                where: [{
	                    operator: "=",
	                    opt1: _this.lang_id,
	                    opt1Avail: true,
	                    opt2: 'id'
	                }]
	            });
	        })();
	    } else {
	        this.language = null;
	    }
	};
	
	exports.default = LabelModel;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _imports = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PostModel = function PostModel() {
	    var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, PostModel);
	
	    this.id = attributes.id || null;
	    this.created = attributes.created || null;
	    this.label_ids = attributes.label_ids || null;
	    this.lang_id = attributes.lang_id || null;
	
	    var dc = new _imports.DatabaseController(),
	        that = this;
	
	    if (this.label_ids) {
	        this.labels = [];
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = this.label_ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var label_id = _step.value;
	
	                dc.select('labels', function (result) {
	                    that.labels.push(result[0]);
	                }, {
	                    where: [{
	                        operator: '=',
	                        opt1: label_id,
	                        opt1Avail: true,
	                        opt2: 'id'
	                    }]
	                });
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    } else {
	        this.labels = null;
	    }
	
	    if (this.lang_id) {
	        dc.select('languages', function (result) {
	            that.language = result[0];
	        }, {
	            where: [{
	                operator: '=',
	                opt1: this.lang_id,
	                opt1Avail: true,
	                opt2: 'id'
	            }]
	        });
	    } else {
	        this.language = null;
	    }
	};
	
	exports.default = PostModel;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _imports = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DatabaseController = function () {
	    function DatabaseController() {
	        _classCallCheck(this, DatabaseController);
	    }
	
	    _createClass(DatabaseController, [{
	        key: 'select',
	
	        /**
	         * @param {string} from
	         * @param {function} callback
	         * @return {function(LanguageModel[]|LabelModel[]|boolean)}
	         */
	        value: function select(from, callback) {
	            var _this = this;
	
	            var clauses = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	            __webpack_require__(6).checkSomeTypes(['string', 'function'], [from, callback]);
	
	            var model = this.getModelByFrom(from);
	
	            if (!model) {
	                return callback(false);
	            }
	
	            this.loadJSON(from, function (response) {
	                var array = [];
	
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                    var _loop = function _loop() {
	                        var object = _step.value;
	
	                        _this.runClauses(clauses, object, function (add, result) {
	                            // if all ok, add to result this object
	                            if (add) {
	                                array.push(new model(object));
	                            }
	                        });
	                    };
	
	                    for (var _iterator = response[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        _loop();
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	
	                return callback(array);
	            });
	        }
	    }, {
	        key: 'runClauses',
	        value: function runClauses() {
	            var clauses = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            var from = arguments[1];
	            var callback = arguments[2];
	
	            var okay = true;
	            var that = this;
	
	            this.runJoins(clauses.join, from, okay, function (okay, from) {
	                that.runWhere(clauses.where, from, okay, callback);
	            });
	        }
	    }, {
	        key: 'runJoins',
	        value: function runJoins(joins, from, okay, callback) {
	            var _this2 = this;
	
	            if (joins && okay) {
	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;
	
	                try {
	                    var _loop2 = function _loop2() {
	                        var join = _step2.value;
	
	                        var json = join.json || null;
	                        var opt1 = join.opt1 || null;
	                        var opt2 = join.opt2 || null;
	
	                        if (!json || !opt1 || !opt2) {
	                            throw ReferenceError('json or opt1 or opt2 are null');
	                        }
	
	                        var getModel = _this2.getModelByFrom;
	
	                        _this2.loadJSON(json, function (result) {
	                            result = result.find(function (object) {
	                                return object[opt1] === from[opt2] || object[opt2] === from[opt1];
	                            });
	
	                            if (result) {
	                                if (!(model = getModel(from))) {
	                                    from.language = new model(result);
	                                    return callback(okay, from);
	                                }
	                            }
	
	                            return callback(false, from);
	                        });
	                    };
	
	                    for (var _iterator2 = joins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        _loop2();
	                    }
	                } catch (err) {
	                    _didIteratorError2 = true;
	                    _iteratorError2 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                            _iterator2.return();
	                        }
	                    } finally {
	                        if (_didIteratorError2) {
	                            throw _iteratorError2;
	                        }
	                    }
	                }
	            }
	
	            return callback(okay, from);
	        }
	    }, {
	        key: 'runWhere',
	        value: function runWhere(wheres, from, okay, callback) {
	            if (wheres && okay) {
	                var _iteratorNormalCompletion3 = true;
	                var _didIteratorError3 = false;
	                var _iteratorError3 = undefined;
	
	                try {
	                    for (var _iterator3 = wheres[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                        var where = _step3.value;
	
	                        var operator = where.operator || null;
	                        var _opt = where.opt1 || null;
	                        var _opt2 = where.opt2 || null;
	
	                        if (!operator || !_opt || !_opt2) {
	                            throw ReferenceError('json or opt1 or opt2 are null');
	                        }
	
	                        //TODO opt1, opt2 from other json
	                        _opt = where.opt1Avail ? _opt : from[_opt];
	                        _opt2 = where.opt2Avail ? _opt2 : from[_opt2];
	
	                        return callback(this.getIfResult(operator, _opt, _opt2), from);
	                    }
	                } catch (err) {
	                    _didIteratorError3 = true;
	                    _iteratorError3 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                            _iterator3.return();
	                        }
	                    } finally {
	                        if (_didIteratorError3) {
	                            throw _iteratorError3;
	                        }
	                    }
	                }
	            }
	
	            return callback(okay, from);
	        }
	
	        /**
	         * @author https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
	         * @param {string} filename
	         * @param {function(*[])} callback
	         */
	
	    }, {
	        key: 'loadJSON',
	        value: function loadJSON(filename, callback) {
	            var xobj = new XMLHttpRequest();
	            xobj.overrideMimeType("application/json");
	            xobj.open('GET', 'json/' + filename + '.json', true);
	            xobj.onreadystatechange = function () {
	                if (xobj.readyState == 4 && xobj.status == "200") {
	                    callback(JSON.parse(xobj.responseText)[filename]);
	                }
	            };
	            xobj.send(null);
	        }
	
	        /**
	         *
	         * @param {string} from
	         * @return {*}
	         */
	
	    }, {
	        key: 'getModelByFrom',
	        value: function getModelByFrom(from) {
	            switch (from) {
	                case 'languages':
	                    return _imports.LanguageModel;
	                    break;
	                case 'labels':
	                    return _imports.LabelModel;
	                    break;
	                case 'posts':
	                    return _imports.PostModel;
	                    break;
	                default:
	                    return false;
	                    break;
	            }
	        }
	    }, {
	        key: 'getIfResult',
	        value: function getIfResult(operator, var1, var2) {
	            switch (operator) {
	                case '=':
	                    return var1 === var2;
	                    break;
	                case '>':
	                    return var1 > var2;
	                    break;
	                case '>=':
	                    return var1 >= var2;
	                    break;
	                case '<':
	                    return var1 < var2;
	                    break;
	                case '<=':
	                    return var1 <= var2;
	                    break;
	                case '<>':
	                    return var1 !== var2;
	                    break;
	                default:
	                    return false;
	                    break;
	            }
	        }
	    }]);
	
	    return DatabaseController;
	}();
	
	exports.default = DatabaseController;
	;

/***/ },
/* 6 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map