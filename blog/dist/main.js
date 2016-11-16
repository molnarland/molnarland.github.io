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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
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
	
	/**
	 * @param {number} milliseconds
	 * @return {number}
	 */
	function timeOutRestart() {
	    var milliseconds = arguments.length <= 0 || arguments[0] === undefined ? 3000 : arguments[0];
	
	    return setTimeout(start, milliseconds);
	}
	
	/**
	 * @param {string} selector
	 * @param {string|number|boolean} value
	 */
	function setElementValue(selector, value) {
	    var qs = document.querySelector.bind(document);
	
	    if (qs(selector).nodeName == 'INPUT') {
	        qs(selector).value = value;
	    } else {
	        qs(selector).innerHTML = value;
	    }
	}
	
	/**
	 * @param {string} selector
	 * @return {string}
	 */
	function getElementValue(selector) {
	    var qs = document.querySelector.bind(document);
	
	    if (qs(selector).nodeName == 'INPUT') {
	        return qs(selector).value;
	    } else {
	        return qs(selector).innerHTML;
	    }
	}
	
	function ifExistCallbackICall(callback, args) {
	    if (typeof callback === 'function') {
	        callback(args);
	    }
	}
	
	//Returns true if it is a DOM node
	function isNode(object) {
	    return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === "object" ? object instanceof Node : object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === "object" && typeof object.nodeType === "number" && typeof object.nodeName === "string";
	}
	
	//Returns true if it is a DOM element
	function isHtmlElement(object) {
	    return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === "object" ? object instanceof HTMLElement : //DOM2
	    object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === "object" && object !== null && object.nodeType === 1 && typeof object.nodeName === "string";
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
	    getUrlParameters: getUrlParameters,
	    timeOutRestart: timeOutRestart,
	    getElementValue: getElementValue,
	    setElementValue: setElementValue,
	    ifExistCallbackICall: ifExistCallbackICall,
	    isNode: isNode,
	    isHtmlElement: isHtmlElement
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
	
	var _PublicController = __webpack_require__(10);
	
	var _PublicController2 = _interopRequireDefault(_PublicController);
	
	var _AdminController = __webpack_require__(11);
	
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
	
	                var _loop = function _loop(index) {
	                    _this.runClauses(clauses, response[index], function (add, result) {
	                        // if all ok, add to result this object
	                        if (add) {
	                            //only once add a modelCallback
	                            if (clauses.once && index < response.length - 1) {
	                                array.push(new model(result));
	                            } else {
	                                array.push(new model(result, modelCallback));
	                            }
	                        }
	                    });
	                };
	
	                for (var index in response) {
	                    _loop(index);
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
	                    var _loop2 = function _loop2() {
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
	                        _loop2();
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
	    }, {
	        key: 'saveJSON',
	        value: function saveJSON(datas, filename) {
	            datas = '{"' + filename + '": ' + JSON.stringify(datas) + '}';
	
	            __webpack_require__(7).saveAs(new Blob([datas], { type: 'application/json;charset=utf8' }), filename + '.json');
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

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	/* FileSaver.js
	 * A saveAs() FileSaver implementation.
	 * 1.3.2
	 * 2016-06-16 18:25:19
	 *
	 * By Eli Grey, http://eligrey.com
	 * License: MIT
	 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
	 */
	
	/*global self */
	/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */
	
	/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
	
	var saveAs = saveAs || function (view) {
		"use strict";
		// IE <10 is explicitly unsupported
	
		if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
			return;
		}
		var doc = view.document
		// only get URL when necessary in case Blob.js hasn't overridden it yet
		,
		    get_URL = function get_URL() {
			return view.URL || view.webkitURL || view;
		},
		    save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
		    can_use_save_link = "download" in save_link,
		    click = function click(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		},
		    is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
		    is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
		    throw_outside = function throw_outside(ex) {
			(view.setImmediate || view.setTimeout)(function () {
				throw ex;
			}, 0);
		},
		    force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		,
		    arbitrary_revoke_timeout = 1000 * 40 // in ms
		,
		    revoke = function revoke(file) {
			var revoker = function revoker() {
				if (typeof file === "string") {
					// file is an object URL
					get_URL().revokeObjectURL(file);
				} else {
					// file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		},
		    dispatch = function dispatch(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		},
		    auto_bom = function auto_bom(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
			}
			return blob;
		},
		    FileSaver = function FileSaver(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var filesaver = this,
			    type = blob.type,
			    force = type === force_saveable_type,
			    object_url,
			    dispatch_all = function dispatch_all() {
				dispatch(filesaver, "writestart progress write writeend".split(" "));
			}
			// on any filesys errors revert to saving with object URLs
			,
			    fs_error = function fs_error() {
				if ((is_chrome_ios || force && is_safari) && view.FileReader) {
					// Safari doesn't allow downloading of blob urls
					var reader = new FileReader();
					reader.onloadend = function () {
						var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
						var popup = view.open(url, '_blank');
						if (!popup) view.location.href = url;
						url = undefined; // release reference before dispatching
						filesaver.readyState = filesaver.DONE;
						dispatch_all();
					};
					reader.readAsDataURL(blob);
					filesaver.readyState = filesaver.INIT;
					return;
				}
				// don't create more object URLs than needed
				if (!object_url) {
					object_url = get_URL().createObjectURL(blob);
				}
				if (force) {
					view.location.href = object_url;
				} else {
					var opened = view.open(object_url, "_blank");
					if (!opened) {
						// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
						view.location.href = object_url;
					}
				}
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				revoke(object_url);
			};
			filesaver.readyState = filesaver.INIT;
	
			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function () {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}
	
			fs_error();
		},
		    FS_proto = FileSaver.prototype,
		    saveAs = function saveAs(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		};
		// IE 10+ (native saveAs)
		if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
			return function (blob, name, no_auto_bom) {
				name = name || blob.name || "download";
	
				if (!no_auto_bom) {
					blob = auto_bom(blob);
				}
				return navigator.msSaveOrOpenBlob(blob, name);
			};
		}
	
		FS_proto.abort = function () {};
		FS_proto.readyState = FS_proto.INIT = 0;
		FS_proto.WRITING = 1;
		FS_proto.DONE = 2;
	
		FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;
	
		return saveAs;
	}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || undefined.content);
	// `self` is undefined in Firefox for Android content script context
	// while `this` is nsIContentFrameMessageManager
	// with an attribute `content` that corresponds to the window
	
	if (typeof module !== "undefined" && module.exports) {
		module.exports.saveAs = saveAs;
	} else if ("function" !== "undefined" && __webpack_require__(8) !== null && __webpack_require__(9) !== null) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return saveAs;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 10 */
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
/* 11 */
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
	
	        this.helpers = __webpack_require__(1);
	        this.functions = __webpack_require__(12);
	
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
	
	            var that = this,
	                enSelector = '#en-name',
	                huSelector = '#hu-name';
	
	            var languages = [],
	                newLabels = [],
	                currentLabels = [];
	
	            this.dc.select('languages', function (result) {
	                languages = result;
	
	                _this.dc.select('labels', function (result) {
	                    currentLabels = result;
	                }, { once: true }, function () {
	                    listingLabels();
	
	                    document.getElementById('new-label').addEventListener('click', newLabelClick);
	
	                    document.getElementById('save-change').addEventListener('click', saveChangeClick);
	                });
	            });
	
	            function listingLabels() {
	                var html = '';
	
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                    for (var _iterator = currentLabels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var currentLabel = _step.value;
	
	                        if (currentLabel.content) {
	                            html += labelHtmlTemplate(currentLabel.id, currentLabel.content.hu, currentLabel.content.en);
	                        }
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
	
	                addAllDeleteEvent();
	                addAllUpdateEvent();
	            }
	
	            function newLabelClick() {
	                var enName = that.helpers.getElementValue(enSelector),
	                    huName = that.helpers.getElementValue(huSelector),
	                    errorClass = 'error';
	
	                if (enName && huName) {
	                    newLabels.push({
	                        en: enName,
	                        hu: huName
	                    });
	
	                    that.helpers.setElementValue(enSelector, '');
	                    that.helpers.setElementValue(huSelector, '');
	
	                    document.querySelector(that.contentElement).innerHTML += labelHtmlTemplate(null, huName, enName);
	
	                    this.functions.removeClass(enSelector, errorClass);
	                    this.functions.removeClass(huSelector, errorClass);
	
	                    addAllDeleteEvent();
	                    addAllUpdateEvent();
	                } else {
	                    if (!enName) {
	                        that.functions.addClass(enSelector, errorClass);
	                    } else {
	                        that.functions.removeClass(enSelector, errorClass);
	                    }
	
	                    if (!huName) {
	                        that.functions.addClass(huSelector, errorClass);
	                    } else {
	                        that.functions.removeClass(huSelector, errorClass);
	                    }
	                }
	            }
	
	            function saveChangeClick() {
	                var endLabels = [];
	
	                //add essence of currentLabels
	
	                var _loop = function _loop(index) {
	                    var currentLabel = currentLabels[index];
	                    var originalLabelInfos = {};
	
	                    getLabelInfosFromNodeAndChangeNodeHtml(document.querySelector(that.contentElement).childNodes[index], function (attr) {
	                        originalLabelInfos[attr.elem] = attr.node.dataset.original;
	                    });
	
	                    var languageIndex = languages.indexOf(languages.find(function (language) {
	                        return language.hu == originalLabelInfos.hu && language.en == originalLabelInfos.en;
	                    }));
	
	                    languages[languageIndex].hu = currentLabel.content.hu;
	                    languages[languageIndex].en = currentLabel.content.en;
	
	                    endLabels.push({
	                        id: currentLabel.id,
	                        contentId: currentLabel.contentId
	                    });
	                };
	
	                for (var index in currentLabels) {
	                    _loop(index);
	                }
	
	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;
	
	                try {
	                    var _loop2 = function _loop2() {
	                        var newLabel = _step2.value;
	
	                        var existLabel = currentLabels.find(function (label) {
	                            return label.content.en == newLabel.en && label.content.hu == newLabel.hu;
	                        });
	
	                        if (!existLabel) {
	                            var contentId = void 0;
	
	                            var existLanguage = languages.find(function (lang) {
	                                return lang.en == newLabel.en && lang.hu == newLabel.hu;
	                            });
	
	                            if (existLanguage) {
	                                contentId = existLanguage.id;
	                            } else {
	                                contentId = languages.length + 1;
	
	                                languages.push({
	                                    id: contentId,
	                                    hu: newLabel.hu,
	                                    en: newLabel.en
	                                });
	                            }
	
	                            endLabels.push({
	                                id: endLabels.length + 1,
	                                contentId: contentId
	                            });
	                        }
	                    };
	
	                    for (var _iterator2 = newLabels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
	
	                that.dc.saveJSON(languages, 'languages');
	                that.dc.saveJSON(endLabels, 'labels');
	            }
	
	            function labelHtmlTemplate(id, hu, en) {
	                return '<section id="label-' + id + '" class="label" style="border:10px double black">\n                                <p data-original="' + id + '" class="id">ID: <var>' + id + '</var></p>\n                                <p data-original="' + hu + '" class="hu">Hungarian: <var>' + hu + '</var></p>\n                                <p data-original="' + en + '" class="en">English: <var>' + en + '</var></p>\n                                <button class="update" data-clicked="0">Update</button>\n                                <button class="delete">Delete</button>\n                            </section>';
	            }
	
	            function getDataFromPElement(p) {
	                var varTag = p.childNodes[1],
	                    child = varTag.childNodes[0];
	
	                if (child.nodeName === 'INPUT') {
	                    return child.value;
	                } else {
	                    return varTag.innerHTML;
	                }
	            }
	
	            function getLabelInfosFromNodeAndChangeNodeHtml(labelSection, callback) {
	                var result = {};
	                var callCallback = that.helpers.ifExistCallbackICall;
	
	                var _iteratorNormalCompletion3 = true;
	                var _didIteratorError3 = false;
	                var _iteratorError3 = undefined;
	
	                try {
	                    for (var _iterator3 = labelSection.childNodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                        var child = _step3.value;
	
	                        switch (child.className) {
	                            case 'id':
	                                result.id = getDataFromPElement(child);
	                                callCallback(callback, { elem: 'id', node: child, data: result.id });
	                                break;
	                            case 'hu':
	                                result.hu = getDataFromPElement(child);
	                                callCallback(callback, { elem: 'hu', node: child, data: result.hu });
	                                break;
	                            case 'en':
	                                result.en = getDataFromPElement(child);
	                                callCallback(callback, { elem: 'en', node: child, data: result.en });
	                                break;
	                            default:
	                                break;
	                        }
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
	
	                return result;
	            }
	
	            function searchLabel(datas, callback) {
	                var labelInfos = that.helpers.isHtmlElement(datas) ? getLabelInfosFromNodeAndChangeNodeHtml(datas) : datas;
	
	                if (labelInfos.id != 'null') //these labels still be
	                    {
	                        var arrayIndex = currentLabels.indexOf(currentLabels.find(function (value) {
	                            return value.id == labelInfos.id && value.content.hu == labelInfos.hu && value.content.en == labelInfos.en;
	                        }));
	
	                        if (arrayIndex > -1) {
	                            return callback(currentLabels, arrayIndex, true);
	                        }
	                    } else //these labels maybe will be, other objects
	                    {
	                        var _arrayIndex = newLabels.indexOf(newLabels.find(function (value) {
	                            return value.hu == labelInfos.hu && value.en == labelInfos.en;
	                        }));
	
	                        if (_arrayIndex > -1) {
	                            return callback(newLabels, _arrayIndex, false);
	                        }
	                    }
	
	                return callback(false, false, false);
	            }
	
	            function addAllDeleteEvent() {
	                Array.from(document.querySelectorAll('.label .delete')).forEach(function (button) {
	                    button.addEventListener('click', function (event) {
	                        var section = event.target.parentNode;
	
	                        searchLabel(section, function (labelArray, index) {
	                            labelArray.splice(index, 1);
	                        });
	
	                        section.parentNode.removeChild(section);
	                    });
	                });
	            }
	
	            function addAllUpdateEvent() {
	                Array.from(document.querySelectorAll('.label .update')).forEach(function (button) {
	                    button.addEventListener('click', function (event) {
	                        var section = event.target.parentNode;
	
	                        if (button.dataset.clicked == '0') {
	                            button.dataset.clicked = '1';
	                            button.innerHTML = 'Save';
	
	                            /*let labelInfos = */getLabelInfosFromNodeAndChangeNodeHtml(section, function (args) {
	                                var elem = args.elem,
	                                    node = args.node,
	                                    data = args.data;
	
	                                node.dataset.oldValue = data;
	
	                                node.childNodes[1].innerHTML = '<input type="text" value="' + data + '">';
	                            });
	                        } else if (button.dataset.clicked == '1') {
	                            (function () {
	                                button.dataset.clicked = '0';
	                                button.innerHTML = 'Update';
	
	                                var oldLabels = {};
	
	                                var labelInfos = getLabelInfosFromNodeAndChangeNodeHtml(section, function (args) {
	                                    var elem = args.elem,
	                                        node = args.node /*,
	                                                         data = args.data*/;
	
	                                    oldLabels[elem] = node.dataset.oldValue;
	                                    delete node.dataset.oldValue;
	
	                                    node.childNodes[1].innerHTML = args.data;
	                                });
	
	                                searchLabel(oldLabels, function (labelArray, index, isCurrent) {
	                                    if (labelArray) {
	                                        if (isCurrent) {
	                                            labelArray[index].id = labelInfos.id;
	                                            labelArray[index].content.hu = labelInfos.hu;
	                                            labelArray[index].content.en = labelInfos.en;
	                                        } else {
	                                            labelArray[index].id = labelInfos.id;
	                                            labelArray[index].hu = labelInfos.hu;
	                                            labelArray[index].en = labelInfos.en;
	                                        }
	                                    }
	
	                                    console.log(currentLabels);
	                                });
	                            })();
	                        }
	                    });
	                });
	            }
	        }
	    }, {
	        key: 'posts',
	        value: function posts() {}
	    }]);
	
	    return AdminController;
	}();
	
	exports.default = AdminController;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function scrollTop() {
	    // Firefox, Chrome, Opera, Safari
	    if (self.pageYOffset) {
	        return self.pageYOffset;
	    }
	
	    // Internet Explorer 6 - standards mode
	    if (document.documentElement && document.documentElement.scrollTop) {
	        return document.documentElement.scrollTop;
	    }
	
	    // Internet Explorer 6, 7 and 8
	    if (document.body.scrollTop) {
	        return document.body.scrollTop;
	    }
	
	    return 0;
	}
	
	function substring(value, string) {
	    return value.indexOf(string) !== -1;
	}
	
	function removeClass(selector, cssClass) {
	    var cssClassName = document.querySelector(selector).className;
	    if (substring(cssClassName, cssClass)) {
	        document.querySelector(selector).className = cssClassName.replace(cssClass, '');
	    }
	}
	
	function addClass(selector, cssClass) {
	    if (checkSelector(selector) && !substring(document.querySelector(selector).className, cssClass)) {
	        document.querySelector(selector).className += cssClass;
	    }
	}
	
	function checkSelector(selector, next) {
	    if (!document.querySelector(selector)) {
	        throw new Error('\'' + selector + '\' selector isn\'t exist');
	    }
	
	    if (typeof next === 'function') {
	        return next();
	    }
	
	    return true;
	}
	
	function setElementOpacity(selector, opacity) {
	    checkSelector(selector, function () {
	        document.querySelector(selector).style.opacity = opacity;
	    });
	}
	
	function randomNumber(max) {
	    var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function smoothScroll(selector) {
	    var startY = scrollTop();
	
	    elementTop(selector, function (position) {
	        var stopY = position - document.querySelector('#navbar').clientHeight,
	            distance = stopY > startY ? stopY - startY : startY - stopY;
	
	        if (distance < 100) {
	            scrollTo(0, stopY);return;
	        }
	
	        var speed = Math.round(distance / 100);
	        if (speed >= 20) {
	            speed = 20;
	        }
	
	        var step = Math.round(distance / 200),
	            leapY = stopY > startY ? startY + step : startY - step,
	            timer = 0;
	
	        if (stopY > startY) {
	            for (var i = startY; i < stopY; i += step) {
	                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
	
	                leapY += step;
	                if (leapY > stopY) {
	                    leapY = stopY;
	                }
	
	                timer++;
	            }
	
	            return;
	        }
	
	        for (var _i = startY; _i > stopY; _i -= step) {
	            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
	
	            leapY -= step;
	            if (leapY < stopY) {
	                leapY = stopY;
	            }
	
	            timer++;
	        }
	    });
	}
	
	function elementTop(selector, next) {
	    checkSelector(selector, function () {
	        var element = document.querySelector(selector);
	        var y = element.offsetTop,
	            node = element;
	
	        while (node.offsetParent && node.offsetParent != document.body) {
	            node = node.offsetParent;
	            y += node.offsetTop;
	        }
	
	        if (typeof next === 'function') {
	            return next(y);
	        }
	
	        return y;
	    });
	}
	
	if (true) {
	    module.exports = {
	        scrollTop: scrollTop,
	        substring: substring,
	        removeClass: removeClass,
	        addClass: addClass,
	        checkSelector: checkSelector,
	        setElementOpacity: setElementOpacity,
	        randomNumber: randomNumber,
	        smoothScroll: smoothScroll,
	        elementTop: elementTop
	    };
	}

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map