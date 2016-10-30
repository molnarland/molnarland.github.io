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
	
	// import {PublicController, AdminController} from './imports';
	
	var parameters = __webpack_require__(1).start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function start() {
	    var adminController = __webpack_require__(2).AdminController,
	        publicController = __webpack_require__(2).PublicController;
	    var parameters = getUrlParameters();
	
	    if (parameters[0][0] === 'blog' && parameters[0][1] === 'admin') {
	        var ac = new adminController({
	            file: parameters[0][2]
	        });
	    } else if (parameters[0][0] === 'blog') {
	        var pc = new publicController();
	    } else {
	        location.href = '/';
	    }
	}
	
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
	
	function asyncLoop(iterations, func, callback) {
	    var index = 0;
	    var done = false;
	    var loop = {
	        next: function next() {
	            if (done) {
	                return;
	            }
	
	            if (index < iterations) {
	                index++;
	                func(loop, index);
	            } else {
	                done = true;
	                callback();
	            }
	        },
	
	        iteration: function iteration() {
	            return index - 1;
	        },
	
	        break: function _break() {
	            done = true;
	            callback();
	        }
	    };
	
	    loop.next();
	    return loop;
	}
	
	/**
	 * @return {[]}
	 */
	function getUrlPath() {
	    var path = [];
	
	    var url = window.location.href.replace('http://', ''),
	        splittedWithPer = url.split('/'),
	        splittedWithPerLength = splittedWithPer.length;
	
	    if (splittedWithPerLength > 1 && splittedWithPer[1] !== "") {
	        for (var i = 1; i < splittedWithPerLength; i++) {
	            if (!(i === splittedWithPerLength - 1 && splittedWithPer[i].charAt(0) === '?')) {
	                path.push(splittedWithPer[i]);
	            }
	        }
	    } else {
	        path = null;
	    }
	
	    return path;
	}
	
	/**
	 * @return {object}
	 */
	function getUrlQuery() {
	    var query = {};
	
	    var splittedParameters = window.location.href.split('?')[1];
	
	    if (splittedParameters) {
	        splittedParameters = splittedParameters.split('&');
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = splittedParameters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var parameter = _step.value;
	
	                var pair = parameter.split('=');
	                query[pair[0]] = pair[1];
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
	        query = null;
	    }
	
	    return query;
	}
	
	/**
	 * @return {[]}
	 */
	function getUrlHash() {
	    var hashes = [];
	
	    var splittedHashes = window.location.href.split('#');
	
	    if (splittedHashes = splittedHashes[1]) {
	        splittedHashes = splittedHashes.split('/');
	
	        if (splittedHashes) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = splittedHashes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var path = _step2.value;
	
	                    if (path) {
	                        hashes.push(path);
	                    }
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
	    }
	
	    return hashes;
	}
	
	/**
	 * @return {[[], object]}
	 */
	function getUrlParameters() {
	    return [getUrlPath(), getUrlQuery(), getUrlHash()];
	}
	
	module.exports = {
	    start: start,
	    isEmptyObject: isEmptyObject,
	    checkType: checkType,
	    checkSomeTypes: checkSomeTypes,
	    asyncLoop: asyncLoop,
	    getUrlPath: getUrlPath,
	    getUrlQuery: getUrlQuery,
	    getUrlHash: getUrlHash,
	    getUrlParameters: getUrlParameters
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AdminController = exports.PublicController = exports.DatabaseController = exports.PostModel = exports.LabelModel = exports.LanguageModel = undefined;
	
	var _LanguageModel = __webpack_require__(3);
	
	var _LanguageModel2 = _interopRequireDefault(_LanguageModel);
	
	var _LabelModel = __webpack_require__(4);
	
	var _LabelModel2 = _interopRequireDefault(_LabelModel);
	
	var _PostModel = __webpack_require__(5);
	
	var _PostModel2 = _interopRequireDefault(_PostModel);
	
	var _DatabaseController = __webpack_require__(6);
	
	var _DatabaseController2 = _interopRequireDefault(_DatabaseController);
	
	var _PublicController = __webpack_require__(7);
	
	var _PublicController2 = _interopRequireDefault(_PublicController);
	
	var _AdminController = __webpack_require__(8);
	
	var _AdminController2 = _interopRequireDefault(_AdminController);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.LanguageModel = _LanguageModel2.default;
	exports.LabelModel = _LabelModel2.default;
	exports.PostModel = _PostModel2.default;
	exports.DatabaseController = _DatabaseController2.default;
	exports.PublicController = _PublicController2.default;
	exports.AdminController = _AdminController2.default;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _imports = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LabelModel = function LabelModel() {
	    var _this = this;
	
	    var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];
	
	    _classCallCheck(this, LabelModel);
	
	    this.id = attributes.id || null;
	    this.contentId = attributes.contentId || null;
	
	    var dc = new _imports.DatabaseController();
	
	    if (this.contentId) {
	        (function () {
	            var that = _this;
	            dc.select('languages', function (result) {
	                that.content = result[0];
	
	                if (typeof callback == 'function') {
	                    return callback();
	                }
	            }, {
	                where: [{
	                    operator: '=',
	                    opt1: _this.contentId,
	                    opt1Avail: true,
	                    opt2: 'id'
	                }]
	            });
	        })();
	    } else {
	        this.content = null;
	
	        if (typeof callback == 'function') {
	            return callback();
	        }
	    }
	};
	
	exports.default = LabelModel;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _imports = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PostModel = function () {
	    function PostModel() {
	        var _this = this;
	
	        var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	        var callback = arguments[1];
	
	        _classCallCheck(this, PostModel);
	
	        this.id = attributes.id || null;
	        this.created = attributes.created || null;
	        this.labelIds = attributes.labelIds || null;
	        this.titleId = attributes.titleId || null;
	        this.contentId = attributes.contentId || null;
	        this.urlId = attributes.urlId || null;
	
	        var dc = new _imports.DatabaseController();
	
	        this.selectLabels(function () {
	            _this.selectOne('contentId', 'content', function () {
	                _this.selectOne('titleId', 'title', function () {
	                    _this.selectOne('urlId', 'url', callback, dc);
	                }, dc);
	            }, dc);
	        }, dc);
	    }
	
	    _createClass(PostModel, [{
	        key: 'selectLabels',
	        value: function selectLabels(callback) {
	            var _this2 = this;
	
	            var dc = arguments.length <= 1 || arguments[1] === undefined ? new _imports.DatabaseController() : arguments[1];
	
	            if (this.labelIds) {
	                (function () {
	                    _this2.labels = [];
	                    var count_of_labels = _this2.labelIds.length,
	                        that = _this2;
	
	                    var _loop = function _loop(i) {
	                        dc.select('labels', function (result) {
	                            that.labels.push(result[0]);
	
	                            if (typeof callback == 'function' && i === count_of_labels - 1) {
	                                return callback();
	                            }
	                        }, {
	                            where: [{
	                                operator: '=',
	                                opt1: _this2.labelIds[i],
	                                opt1Avail: true,
	                                opt2: 'id'
	                            }]
	                        });
	                    };
	
	                    for (var i = 0; i < count_of_labels; i++) {
	                        _loop(i);
	                    }
	                })();
	            } else {
	                this.labels = null;
	
	                if (typeof callback == 'function') {
	                    return callback();
	                }
	            }
	        }
	    }, {
	        key: 'selectOne',
	        value: function selectOne(id, real, callback) {
	            var _this3 = this;
	
	            var dc = arguments.length <= 3 || arguments[3] === undefined ? new _imports.DatabaseController() : arguments[3];
	
	            if (this[id]) {
	                (function () {
	                    var that = _this3;
	
	                    dc.select('languages', function (result) {
	                        that[real] = result[0];
	
	                        if (typeof callback == 'function') {
	                            return callback();
	                        }
	                    }, {
	                        where: [{
	                            operator: '=',
	                            opt1: _this3[id],
	                            opt1Avail: true,
	                            opt2: 'id'
	                        }]
	                    });
	                })();
	            } else {
	                this[real] = null;
	
	                if (typeof callback == 'function') {
	                    return callback();
	                }
	            }
	        }
	    }]);
	
	    return PostModel;
	}();
	
	exports.default = PostModel;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _imports = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DatabaseController = function () {
	    function DatabaseController() {
	        _classCallCheck(this, DatabaseController);
	    }
	
	    _createClass(DatabaseController, [{
	        key: 'select',
	
	        /**
	         * @param {string} from
	         * @param {function} end
	         * @param {object} clauses
	         * @param {function} modelCallback
	         * @return {function(LanguageModel[]|LabelModel[]|boolean)}
	         */
	        value: function select(from, end) {
	            var _this = this;
	
	            var clauses = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	            var modelCallback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	            __webpack_require__(1).checkSomeTypes(['string', 'function'], [from, end]);
	
	            var model = this.getModelByFrom(from);
	
	            if (!model) {
	                return end(false);
	            }
	
	            this.loadJSON(from, function (response) {
	                var array = [];
	                var that = _this;
	
	                for (var index in response) {
	                    _this.runClauses(clauses, response[index], function (add, result) {
	                        // if all ok, add to result this object
	                        if (add) {
	                            //only once add a modelCallback
	                            /*if (index < response.length - 1)
	                            {
	                                array.push(new model(result));
	                            }
	                            else
	                            {*/
	                            array.push(new model(result, modelCallback));
	                            /*}*/
	                        }
	                    });
	                }
	
	                return end(array);
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
	                that.runWhere(clauses.where, from, okay, function (okay, from) {
	                    return callback(okay, from);
	                });
	            });
	        }
	    }, {
	        key: 'runJoins',
	        value: function runJoins(joins, from, okay, callback) {
	            var _this2 = this;
	
	            if (joins && okay) {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                    var _loop = function _loop() {
	                        var join = _step.value;
	
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
	                                var model = getModel(from);
	                                if (!model) {
	                                    from.content = new model(result);
	                                    return callback(okay, from);
	                                }
	                            }
	
	                            return callback(false, from);
	                        });
	                    };
	
	                    for (var _iterator = joins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
	            }
	
	            return callback(okay, from);
	        }
	    }, {
	        key: 'runWhere',
	        value: function runWhere(wheres, from, okay, callback) {
	            if (wheres && okay) {
	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;
	
	                try {
	                    for (var _iterator2 = wheres[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var where = _step2.value;
	
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
	            xobj.open('GET', '/blog/json/' + filename + '.json', true);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _imports = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PublicController = function () {
	    function PublicController() {
	        var language = arguments.length <= 0 || arguments[0] === undefined ? 'en' : arguments[0];
	
	        _classCallCheck(this, PublicController);
	
	        this.contentElement = '#wrapper';
	        this.language = language || 'hu';
	
	        var that = this,
	            dc = new _imports.DatabaseController();
	
	        dc.select('posts', function (result) {
	            that.posts = result;
	        }, {}, function () {
	            return that.postPreviews();
	        });
	
	        // this.iWillGo();
	    }
	
	    /**
	     * @param {number} from
	     * @param {number} to
	     * @param {function} callback
	     */
	
	
	    _createClass(PublicController, [{
	        key: 'postPreviews',
	        value: function postPreviews() {
	            var from = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var to = arguments.length <= 1 || arguments[1] === undefined ? this.posts.length : arguments[1];
	
	            var html = '';
	
	            for (var i = from; i < to; i++) {
	                var post = this.posts[i];
	                var content = this.getOneFromLanguages(post, 'content'),
	                    title = this.getOneFromLanguages(post, 'title'),
	                    url = this.getOneFromLanguages(post, 'url');
	
	                html += '<section class="post-preview">\n                    <div class="blog-header">\n                        <h2 class="post-title">\n                            <a id="post-' + (i + 1) + '" class="post-link" href="#/' + url + '">' + title + '</a>\n                        </h2>\n                        <div class="post-datas">\n                            <div class="created">' + post.created + '</div>\n                        </div>\n                    </div>\n                    ' + content + '\n                </section>';
	            }
	
	            document.querySelector(this.contentElement).innerHTML = html;
	
	            var reStart = __webpack_require__(1).start;
	
	            for (var _i = from; _i < to; _i++) {
	                document.getElementById('post-' + (_i + 1)).addEventListener('click', reStart);
	            }
	        }
	    }, {
	        key: 'getOneFromLanguages',
	        value: function getOneFromLanguages(post, data) {
	            var result = void 0;
	
	            if (post[data]) {
	                if (post[data][this.language]) {
	                    result = post[data][this.language];
	                } else {
	                    switch (this.language) {
	                        case 'hu':
	                            result = post[data]['en'];
	                            break;
	                        case 'en':
	                        default:
	                            result = post[data]['hu'];
	                            break;
	                    }
	                }
	            }
	
	            return !result ? '' : result;
	        }
	    }, {
	        key: 'iWillGo',
	        value: function iWillGo() {
	            var _this = this;
	
	            var dc = new _imports.DatabaseController();
	            var that = this;
	
	            dc.select('posts', function (result) {
	                that.result = result;
	                console.log(result);
	            }, {
	                where: [{
	                    operator: '=',
	                    opt1: 'id',
	                    opt2: 2,
	                    opt2Avail: true
	                }]
	            }, function () {
	                document.querySelector(_this.contentElement).innerHTML = _this.result[0].content[_this.content];
	            });
	        }
	    }]);
	
	    return PublicController;
	}();
	
	exports.default = PublicController;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _imports = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AdminController = function () {
	    function AdminController(args) {
	        _classCallCheck(this, AdminController);
	
	        this.contentElement = '#wrapper';
	        this.dc = new _imports.DatabaseController();
	
	        var fileName = args.file || '';
	
	        switch (fileName) {
	            case 'labels.html':
	                this.labels();
	                break;
	            case 'posts.html':
	                this.posts();
	                break;
	            default:
	                break;
	        }
	    }
	
	    _createClass(AdminController, [{
	        key: 'labels',
	        value: function labels() {
	            var _this = this;
	
	            var languages = [],
	                newLabels = [],
	                currentLabels = [];
	
	            this.dc.select('languages', function (result) {
	                languages = result;
	
	                _this.dc.select('labels', function (result) {
	                    currentLabels = result;
	                }, {}, function () {
	                    var that = _this;
	
	                    listingLabels();
	
	                    document.getElementById('new-label').addEventListener('click', newLabelClick);
	
	                    document.getElementById('save-change').addEventListener('click', saveChangeClick);
	
	                    function listingLabels() {
	                        var html = '';
	
	                        var _iteratorNormalCompletion = true;
	                        var _didIteratorError = false;
	                        var _iteratorError = undefined;
	
	                        try {
	                            for (var _iterator = currentLabels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                                var currentLabel = _step.value;
	
	                                console.log(currentLabel);
	
	                                html += '<section class="label" style="border:5px dotted black">\n                                <p class="id">ID: ' + currentLabel.id + '</p>\n                                <p class="hu">Hungarian: ' + currentLabel.content.hu + '</p>\n                                <p class="en">English: ' + currentLabel.content.en + '</p>\n                            </section>';
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
	
	                        document.querySelector(that.contentElement).innerHTML = html;
	                    }
	
	                    function newLabelClick() {
	                        newLabels.push({
	                            en: document.getElementById('en-name').value,
	                            hu: document.getElementById('hu-name').value
	                        });
	
	                        document.getElementById('en-name').value = '';
	                        document.getElementById('hu-name').value = '';
	                    }
	
	                    function saveChangeClick() {
	                        var _iteratorNormalCompletion2 = true;
	                        var _didIteratorError2 = false;
	                        var _iteratorError2 = undefined;
	
	                        try {
	                            var _loop = function _loop() {
	                                var newLabel = _step2.value;
	
	                                var existLabel = currentLabels.find(function (label) {
	                                    return label.content.en == newLabel.en && label.content.hu == newLabel.hu;
	                                });
	
	                                if (!existLabel) {}
	                            };
	
	                            for (var _iterator2 = newLabels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                                _loop();
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
	                });
	            });
	        }
	    }, {
	        key: 'posts',
	        value: function posts() {}
	    }]);
	
	    return AdminController;
	}();
	
	exports.default = AdminController;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map