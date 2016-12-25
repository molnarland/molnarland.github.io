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
	
	/*const parameters = */__webpack_require__(1).start();

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
	    var qs = document.querySelector.bind(document),
	        node = qs(selector);
	
	    switch (node.nodeName.toLowerCase()) {
	        case 'input':
	        case 'textarea':
	            node.value = value;
	            break;
	
	        case 'select':
	            break;
	
	        default:
	            return node.innerHTML;
	            break;
	    }
	}
	
	/**
	 * @param {string|HTMLElement} selectorOrNode
	 * @param {Editor} [editorObject]
	 * @return {string|string[]}
	 */
	function getElementValue(selectorOrNode, editorObject) {
	    var node = void 0;
	
	    if (isHtmlElement(selectorOrNode)) {
	        node = selectorOrNode;
	    } else {
	        node = document.querySelector(selectorOrNode);
	    }
	
	    switch (getNodeName(selectorOrNode)) {
	        case 'input':
	            return node.value;
	            break;
	        case 'textarea':
	            return editorObject.getValueOfEditor() || node.value;
	            break;
	        case 'select':
	            var values = [];
	
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = node.selectedOptions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var selectedOption = _step3.value;
	
	                    values.push(selectedOption.value);
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
	
	            return values.length > 0 ? values : '';
	            break;
	        default:
	            return node.innerHTML;
	            break;
	    }
	}
	
	function ifExistCallbackICall(callback, args) {
	    if (typeof callback === 'function') {
	        callback(args);
	    }
	}
	
	/**
	 * @description Returns true if it is a DOM node
	 * @param object
	 * @return {boolean}
	 */
	function isNode(object) {
	    return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === "object" ? object instanceof Node : object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === "object" && typeof object.nodeType === "number" && typeof object.nodeName === "string";
	}
	
	/**
	 * @description Returns true if it is a DOM element
	 * @param object
	 * @return {boolean}
	 */
	function isHtmlElement(object) {
	    return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === "object" ? object instanceof HTMLElement : //DOM2
	    object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === "object" && object !== null && object.nodeType === 1 && typeof object.nodeName === "string";
	}
	
	/**
	 * @param {string} selector
	 * @param {boolean} selected
	 * @return {boolean}
	 */
	function changeAllOptionInSelect(selector, selected) {
	    if (getNodeName(selector) === 'select') {
	        var node = document.querySelector(selector);
	        var _iteratorNormalCompletion4 = true;
	        var _didIteratorError4 = false;
	        var _iteratorError4 = undefined;
	
	        try {
	            for (var _iterator4 = node[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                var option = _step4.value;
	
	                option.selected = selected;
	            }
	        } catch (err) {
	            _didIteratorError4 = true;
	            _iteratorError4 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                    _iterator4.return();
	                }
	            } finally {
	                if (_didIteratorError4) {
	                    throw _iteratorError4;
	                }
	            }
	        }
	
	        return true;
	    }
	
	    return false;
	}
	
	/**
	 * @param {string|HTMLElement} selectorOrNode
	 * @return {string}
	 */
	function getNodeName(selectorOrNode) {
	    if (isHtmlElement(selectorOrNode)) {
	        return selectorOrNode.nodeName.toLowerCase();
	    } else {
	        return document.querySelector(selectorOrNode).nodeName.toLowerCase();
	    }
	}
	
	/**
	 * @param {Array} notNumberArray
	 * @return {Array}
	 */
	function arrayElementsConvertToNumber(notNumberArray) {
	    var numberArray = [];
	    var _iteratorNormalCompletion5 = true;
	    var _didIteratorError5 = false;
	    var _iteratorError5 = undefined;
	
	    try {
	        for (var _iterator5 = notNumberArray[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	            var notNumberElem = _step5.value;
	
	            var numberElem = Number(notNumberElem);
	            numberArray.push(numberElem);
	        }
	    } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                _iterator5.return();
	            }
	        } finally {
	            if (_didIteratorError5) {
	                throw _iteratorError5;
	            }
	        }
	    }
	
	    return numberArray;
	}
	
	/**
	 * @param {string} selector
	 * @param {string} eventName
	 * @param {function({section: HTMLElement, button: HTMLElement})} callback
	 */
	function addEventToAllElement(selector, eventName, callback) {
	    var elements = document.querySelectorAll(selector);
	    var _iteratorNormalCompletion6 = true;
	    var _didIteratorError6 = false;
	    var _iteratorError6 = undefined;
	
	    try {
	        var _loop = function _loop() {
	            var element = _step6.value;
	
	            element.addEventListener(eventName, function (event) {
	                var section = event.target.parentNode;
	
	                ifExistCallbackICall(callback, { section: section, button: element });
	            });
	        };
	
	        for (var _iterator6 = elements[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	            _loop();
	        }
	    } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                _iterator6.return();
	            }
	        } finally {
	            if (_didIteratorError6) {
	                throw _iteratorError6;
	            }
	        }
	    }
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
	    isHtmlElement: isHtmlElement,
	    changeAllOptionInSelect: changeAllOptionInSelect,
	    arrayElementsConvertToNumber: arrayElementsConvertToNumber,
	    addEventToAllElement: addEventToAllElement
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
	
	var _PublicController = __webpack_require__(11);
	
	var _PublicController2 = _interopRequireDefault(_PublicController);
	
	var _AdminController = __webpack_require__(13);
	
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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LanguageModel =
	/**
	 * @param {{id: number, hu: string, en: string}} attributes
	 * @param {function} callback
	 */
	function LanguageModel() {
	    var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];
	
	    _classCallCheck(this, LanguageModel);
	
	    this.id = attributes.id || null;
	    this.hu = attributes.hu || null;
	    this.en = attributes.en || null;
	
	    if (typeof callback === 'function') {
	        callback();
	    }
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
	
	var _js = __webpack_require__(7);
	
	var Cookies = _interopRequireWildcard(_js);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
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
	                // console.log(response);
	
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
	         * @param {string} filename
	         * @param {function(object)} callback
	         */
	
	    }, {
	        key: 'loadJSON',
	        value: function loadJSON(filename, callback) {
	            var _this3 = this;
	
	            var result = this.JSONSession(filename).get();
	            if (!result) {
	                result = this.JSONCookie(filename).get();
	                if (!result) {
	                    this.JSONSession(filename).set(result);
	
	                    this.loadJSONFromFile(filename, function (result) {
	                        _this3.JSONSession(filename).set(result);
	                        _this3.JSONCookie(filename).set(result);
	
	                        return callback(result);
	                    });
	                }
	            }
	
	            return callback(result);
	        }
	
	        /**
	         * @author https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
	         * @param {string} filename
	         * @param {function(object)} callback
	         */
	
	    }, {
	        key: 'loadJSONFromFile',
	        value: function loadJSONFromFile(filename, callback) {
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
	         * @param {object} datas
	         * @param {string} filename
	         */
	
	    }, {
	        key: 'JSONSession',
	
	
	        /**
	         * @param {string} name
	         * @return {object}
	         */
	        value: function JSONSession(name) {
	            return {
	                /**
	                 * @return {object|null}
	                 */
	                get: function get() {
	                    if (sessionStorage) {
	                        return JSON.parse(sessionStorage.getItem(name));
	                    }
	                    return null;
	                },
	                /**
	                 * @param {object} datas
	                 */
	                set: function set(datas) {
	                    if (sessionStorage) {
	                        sessionStorage.setItem(name, JSON.stringify(datas));
	                    }
	                }
	            };
	        }
	
	        /**
	         * @param {string} name
	         * @return {object}
	         */
	
	    }, {
	        key: 'JSONCookie',
	        value: function JSONCookie(name) {
	            return {
	                /**
	                 * @return {object}
	                 */
	                get: function get() {
	                    return Cookies.getJSON(name);
	                },
	                /**
	                 * @param {object} datas
	                 */
	                set: function set(datas) {
	                    Cookies.set(name, datas, { expires: 3 });
	                }
	            };
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
	    }], [{
	        key: 'saveJSONToFile',
	        value: function saveJSONToFile(datas, filename) {
	            datas = '{"' + filename + '": ' + JSON.stringify(datas) + '}';
	
	            __webpack_require__(8).saveAs(new Blob([datas], { type: 'application/json;charset=utf8' }), filename + '.json');
	        }
	    }]);
	
	    return DatabaseController;
	}();
	
	exports.default = DatabaseController;
	;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*!
	 * JavaScript Cookie v2.1.3
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		var registeredInModuleLoader = false;
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			registeredInModuleLoader = true;
		}
		if (( false ? 'undefined' : _typeof(exports)) === 'object') {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	})(function () {
		function extend() {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[i];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}
	
		function init(converter) {
			function api(key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}
	
				// Write
	
				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);
	
					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}
	
					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}
	
					if (!converter.write) {
						value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}
	
					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);
	
					return document.cookie = [key, '=', value, attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					attributes.path ? '; path=' + attributes.path : '', attributes.domain ? '; domain=' + attributes.domain : '', attributes.secure ? '; secure' : ''].join('');
				}
	
				// Read
	
				if (!key) {
					result = {};
				}
	
				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;
	
				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');
	
					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}
	
					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);
	
						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}
	
						if (key === name) {
							result = cookie;
							break;
						}
	
						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}
	
				return result;
			}
	
			api.set = api;
			api.get = function (key) {
				return api.call(api, key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};
	
			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};
	
			api.withConverter = init;
	
			return api;
		}
	
		return init(function () {});
	});

/***/ },
/* 8 */
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
	} else if ("function" !== "undefined" && __webpack_require__(9) !== null && __webpack_require__(10) !== null) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return saveAs;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 10 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _imports = __webpack_require__(2);
	
	var _JsonToHtml = __webpack_require__(12);
	
	var _JsonToHtml2 = _interopRequireDefault(_JsonToHtml);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PublicController = function () {
	    function PublicController() {
	        var _this = this;
	
	        var language = arguments.length <= 0 || arguments[0] === undefined ? 'en' : arguments[0];
	
	        _classCallCheck(this, PublicController);
	
	        this.whenUrlRefreshContentRefreshToo();
	
	        this.contentElement = '#wrapper';
	        this.language = language || 'hu';
	        this.helpers = __webpack_require__(1);
	        this.reStart = this.helpers.start;
	
	        this.clearContent();
	
	        var that = this,
	            dc = new _imports.DatabaseController();
	
	        setTimeout(function () {
	            var hashes = _this.helpers.getUrlHash();
	            if (hashes.length > 0) {
	                try {
	                    dc.select('languages', function (languageResults) {
	                        if (languageResults.length > 0) {
	                            dc.select('posts', function (postResults) {
	                                that.post = postResults[0];
	                            }, {
	                                where: [{
	                                    operator: '=',
	                                    opt1: languageResults[0].id,
	                                    opt1Avail: true,
	                                    opt2: 'urlId'
	                                }]
	                            }, function () {
	                                new _JsonToHtml2.default(that.post['content'][_this.language], document.querySelector(_this.contentElement));
	                            });
	                        } else {
	                            listAllPreviews();
	                        }
	                    }, {
	                        where: [{
	                            operator: '=',
	                            opt1: hashes.join('/'),
	                            opt1Avail: true,
	                            opt2: _this.language
	                        }]
	                    });
	                } catch (e) {
	                    console.log(e);
	                    listAllPreviews();
	                }
	            } else {
	                listAllPreviews();
	            }
	        }, 10);
	
	        function listAllPreviews() {
	            dc.select('posts', function (result) {
	                that.posts = result;
	                return that.postPreviews();
	            }, {}, function () {
	                return that.posts && that.postPreviews();
	            });
	        }
	    }
	
	    /**
	     * @param {number} [from]
	     * @param {number} [to]
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
	
	            this.helpers.addEventToAllElement('.post-link', 'click', this.reStart);
	        }
	    }, {
	        key: 'clearContent',
	        value: function clearContent() {
	            document.querySelector(this.contentElement).innerHTML = '';
	        }
	    }, {
	        key: 'whenUrlRefreshContentRefreshToo',
	        value: function whenUrlRefreshContentRefreshToo() {
	            var _this2 = this;
	
	            window.addEventListener('popstate', function () {
	                _this2.reStart();
	            });
	        }
	    }, {
	        key: 'getOneFromLanguages',
	        value: function getOneFromLanguages(post, data) {
	            var result = void 0;
	
	            if (post[data]) {
	                if (post[data][this.language]) {
	                    result = post[data][this.language];
	                }
	                /*else {
	                    switch (this.language) {
	                        case 'hu':
	                            result = post[data]['en'];
	                            break;
	                        case 'en':
	                            result = post[data]['hu'];
	                            break;
	                    }
	                }*/
	            }
	
	            return !result ? '' : result;
	        }
	    }, {
	        key: 'iWillGo',
	        value: function iWillGo() {
	            var _this3 = this;
	
	            var dc = new _imports.DatabaseController();
	            var that = this;
	
	            dc.select('posts', function (result) {
	                that.result = result;
	                // console.log(result);
	            }, {
	                where: [{
	                    operator: '=',
	                    opt1: 'id',
	                    opt2: 2,
	                    opt2Avail: true
	                }]
	            }, function () {
	                document.querySelector(_this3.contentElement).innerHTML = _this3.result[0].content[_this3.content];
	            });
	        }
	    }]);
	
	    return PublicController;
	}();
	
	exports.default = PublicController;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var JsonToHtml = function () {
	    /**
	     * @param {string} jsonString
	     * @param {HTMLElement} out
	     */
	    function JsonToHtml(jsonString, out) {
	        _classCallCheck(this, JsonToHtml);
	
	        var outString = '';
	
	        try {
	            this.object = JSON.parse(jsonString);
	            outString = this.cycle(this.object);
	        } catch (e) {
	            outString = jsonString;
	            console.info(e.message);
	        }
	
	        out.innerHTML = outString;
	    }
	
	    /**
	     * @param {object} object
	     * @param {function} callback - optional
	     * @return {string}
	     */
	
	
	    _createClass(JsonToHtml, [{
	        key: 'cycle',
	        value: function cycle(object, callback) {
	            var _this = this;
	
	            var html = '';
	
	            var _loop = function _loop(index) {
	                var tag = index;
	
	                if (typeof object[index] === 'string') {
	                    var innerText = object[index];
	
	                    html += _this.whichTagTypeWay(tag, { inner: innerText });
	                } else {
	                    (function () {
	                        var id = _this.findFromFirstChar(object[index], '#'),
	                            classOfElement = _this.findFromFirstChar(object[index], '.'),
	                            style = _this.findFromFirstChar(object[index], '*'),
	                            other = _this.findFromFirstChar(object[index], '-'),
	                            innerText = _this.findFromNotFirstChar(object[index], ['#', '.', '*', '-']);
	                        var innerObject = object[index].find(function (elem) {
	                            return (typeof elem === 'undefined' ? 'undefined' : _typeof(elem)) == 'object';
	                        });
	
	                        if (innerObject) {
	                            _this.cycle(innerObject, function (innerElement) {
	                                html += _this.whichTagTypeWay(tag, {
	                                    id: id,
	                                    classOfElement: classOfElement,
	                                    style: style,
	                                    other: other,
	                                    inner: innerText + innerElement
	                                });
	                            });
	                        } else {
	                            html += _this.whichTagTypeWay(tag, {
	                                id: id,
	                                classOfElement: classOfElement,
	                                style: style,
	                                other: other,
	                                inner: innerText
	                            });
	                        }
	                    })();
	                }
	            };
	
	            for (var index in object) {
	                _loop(index);
	            }
	
	            if (typeof callback == "function") {
	                return callback(html);
	            }
	
	            return html;
	        }
	
	        /**
	         * @param {string} tag
	         * @param {string} [id]
	         * @param {string} [classOfElement]
	         * @param {string} [style]
	         * @param {string} [other]
	         * @param {string} [inner]
	         * @return {string}
	         */
	
	    }, {
	        key: 'whichTagTypeWay',
	        value: function whichTagTypeWay(tag, _ref) {
	            var id = _ref.id;
	            var classOfElement = _ref.classOfElement;
	            var style = _ref.style;
	            var _ref$other = _ref.other;
	            var other = _ref$other === undefined ? '' : _ref$other;
	            var _ref$inner = _ref.inner;
	            var inner = _ref$inner === undefined ? '' : _ref$inner;
	
	            if (tag == 'input') {
	                return this.selfClosedTag(tag, {
	                    id: id,
	                    classOfElement: classOfElement,
	                    style: style,
	                    other: other
	                });
	            } else {
	                return this.withCloseTag(tag, {
	                    id: id,
	                    classOfElement: classOfElement,
	                    style: style,
	                    other: other,
	                    inner: inner
	                });
	            }
	        }
	
	        /**
	         * @param {string} tag
	         * @param {string} [id]
	         * @param {string} [classOfElement]
	         * @param {string} [style]
	         * @param {string} [other]
	         * @return {string}
	         */
	
	    }, {
	        key: 'selfClosedTag',
	        value: function selfClosedTag(tag, _ref2) {
	            var id = _ref2.id;
	            var classOfElement = _ref2.classOfElement;
	            var style = _ref2.style;
	            var _ref2$other = _ref2.other;
	            var other = _ref2$other === undefined ? '' : _ref2$other;
	
	            id = id ? 'id="' + id + '"' : '';
	            classOfElement = classOfElement ? 'class="' + classOfElement + '"' : '';
	            style = style ? 'style="' + style + '"' : '';
	
	            return '<' + tag + ' ' + id + ' ' + classOfElement + ' ' + style + ' ' + other + ' />';
	        }
	
	        /**
	         * @param {string} tag
	         * @param {string} [id]
	         * @param {string} [classOfElement]
	         * @param {string} [style]
	         * @param {string} [other]
	         * @param {string} [inner]
	         * @return {string}
	         */
	
	    }, {
	        key: 'withCloseTag',
	        value: function withCloseTag(tag, _ref3) {
	            var id = _ref3.id;
	            var classOfElement = _ref3.classOfElement;
	            var style = _ref3.style;
	            var _ref3$other = _ref3.other;
	            var other = _ref3$other === undefined ? '' : _ref3$other;
	            var _ref3$inner = _ref3.inner;
	            var inner = _ref3$inner === undefined ? '' : _ref3$inner;
	
	            id = id ? 'id="' + id + '"' : '';
	            classOfElement = classOfElement ? 'class="' + classOfElement + '"' : '';
	            style = style ? 'style="' + style + '"' : '';
	
	            return '<' + tag + ' ' + id + ' ' + classOfElement + ' ' + style + ' ' + other + '>\n                    ' + inner + '\n                </' + tag + '>';
	        }
	
	        /**
	         * @param {[]} arrayOfElements
	         * @param {string} char
	         * @return {*}
	         */
	
	    }, {
	        key: 'findFromFirstChar',
	        value: function findFromFirstChar(arrayOfElements, char) {
	            var found = arrayOfElements.find(function (elem) {
	                return typeof elem == 'string' && elem.charAt(0) == char;
	            });
	            return !found ? '' : found.substring(1);
	        }
	
	        /**
	         * @param {[]} arrayOfElements
	         * @param {string} char
	         * @return {*}
	         */
	
	    }, {
	        key: 'findFromNotFirstChar',
	        value: function findFromNotFirstChar(arrayOfElements, chars) {
	            var found = arrayOfElements.find(function (elem) {
	                return chars.indexOf(elem.charAt(0)) === -1;
	            });
	            return !found ? '' : found;
	        }
	    }]);
	
	    return JsonToHtml;
	}();
	
	exports.default = JsonToHtml;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _imports = __webpack_require__(2);
	
	var _JsonToHtml = __webpack_require__(12);
	
	var _JsonToHtml2 = _interopRequireDefault(_JsonToHtml);
	
	var _Editor = __webpack_require__(14);
	
	var _Editor2 = _interopRequireDefault(_Editor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AdminController = function () {
	    function AdminController(args) {
	        _classCallCheck(this, AdminController);
	
	        this.helpers = __webpack_require__(1);
	        this.functions = __webpack_require__(15);
	
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
	
	                    getLabelInfosFromNodeAndChangeNodeHtmlToInputThenToText(document.querySelector(that.contentElement).childNodes[index], function (attr) {
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
	
	                _imports.DatabaseController.saveJSONToFile(languages, 'languages');
	                _imports.DatabaseController.saveJSONToFile(endLabels, 'labels');
	            }
	
	            function labelHtmlTemplate(id, hu, en) {
	                return '<section id="label-' + id + '" class="label" style="border:10px double black">\n                        <p data-original="' + id + '" class="id">ID: <var>' + id + '</var></p>\n                        <p data-original="' + hu + '" class="hu">Hungarian: <var>' + hu + '</var></p>\n                        <p data-original="' + en + '" class="en">English: <var>' + en + '</var></p>\n                        <button class="update" data-clicked="0">Update</button>\n                        <button class="delete">Delete</button>\n                    </section>';
	            }
	
	            function getLabelInfosFromNodeAndChangeNodeHtmlToInputThenToText(labelSection, callback) {
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
	                                result.id = that.getDataFromPElement(child);
	                                callCallback(callback, { elem: 'id', node: child, data: result.id });
	                                break;
	                            case 'hu':
	                                result.hu = that.getDataFromPElement(child);
	                                callCallback(callback, { elem: 'hu', node: child, data: result.hu });
	                                break;
	                            case 'en':
	                                result.en = that.getDataFromPElement(child);
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
	                that.searchInfos(currentLabels, newLabels, datas, getLabelInfosFromNodeAndChangeNodeHtmlToInputThenToText, callback);
	            }
	
	            function addAllDeleteEvent() {
	                __webpack_require__(1).addEventToAllElement('.label .delete', 'click', function (attr) {
	                    var section = attr.section,
	                        button = attr.button;
	
	                    searchLabel(section, function (labelArray, index) {
	                        labelArray.splice(index, 1);
	                    });
	
	                    section.parentNode.removeChild(section);
	                });
	            }
	
	            function addAllUpdateEvent() {
	                __webpack_require__(1).addEventToAllElement('.label .update', 'click', function (attr) {
	                    var section = attr.section,
	                        button = attr.button;
	
	                    if (button.dataset.clicked == '0') {
	                        button.dataset.clicked = '1';
	                        button.innerHTML = 'Save';
	
	                        /*let labelInfos = */getLabelInfosFromNodeAndChangeNodeHtmlToInputThenToText(section, function (args) {
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
	
	                            var labelInfos = getLabelInfosFromNodeAndChangeNodeHtmlToInputThenToText(section, function (args) {
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
	                            });
	                        })();
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'posts',
	        value: function posts() {
	            var _this2 = this;
	
	            var that = this,
	                labelSeparator = ', ',
	                createdSelector = '#created',
	                labelsSelector = '#labels',
	                contentHuSelector = '#content-hu',
	                contentEnSelector = '#content-en',
	                titleHuSelector = '#title-hu',
	                titleEnSelector = '#title-en',
	                urlHuSelector = '#url-hu',
	                urlEnSelector = '#url-en',
	                contentHuOutputSelector = '#content-hu-output',
	                contentEnOutputSelector = '#content-en-output';
	
	            var huEditor = initEditor(contentHuSelector, contentHuOutputSelector);
	            var enEditor = initEditor(contentEnSelector, contentEnOutputSelector);
	
	            var currentLabels = [],
	                currentPosts = [],
	                newPosts = [],
	                languages = [];
	
	            this.dc.select('labels', function (result) {
	                currentLabels = result;
	
	                _this2.dc.select('posts', function (result) {
	                    currentPosts = result;
	                }, { once: true }, function () {
	
	                    _this2.dc.select('languages', function (result) {
	                        languages = result;
	                    }, { once: true }, function () {
	
	                        listingPosts();
	
	                        document.getElementById('new-post').addEventListener('click', newPostClick);
	
	                        document.getElementById('save-change').addEventListener('click', saveChangeClick);
	                    });
	                });
	            }, { once: true }, function () {
	                setTimeout(function () {
	                    var date = new Date();
	                    document.querySelector('#created').value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	
	                    var _iteratorNormalCompletion4 = true;
	                    var _didIteratorError4 = false;
	                    var _iteratorError4 = undefined;
	
	                    try {
	                        for (var _iterator4 = currentLabels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                            var label = _step4.value;
	
	                            var option = document.createElement('option');
	                            option.setAttribute('value', label.id);
	                            option.innerHTML = label.content.hu + ' / ' + label.content.en;
	
	                            document.querySelector('#labels').appendChild(option);
	                        }
	                    } catch (err) {
	                        _didIteratorError4 = true;
	                        _iteratorError4 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                                _iterator4.return();
	                            }
	                        } finally {
	                            if (_didIteratorError4) {
	                                throw _iteratorError4;
	                            }
	                        }
	                    }
	                }, 100);
	            });
	
	            /**
	             * @param {string} inner
	             * @param {string} outer
	             * @return {Editor}
	             */
	            function initEditor(inner, outer) {
	                return new _Editor2.default({
	                    idOfEditor: inner.substring(1),
	                    idOfSaveButton: false,
	                    idOfOutput: outer.substring(1)
	                });
	            }
	
	            function listingPosts() {
	                var html = '';
	
	                var _iteratorNormalCompletion5 = true;
	                var _didIteratorError5 = false;
	                var _iteratorError5 = undefined;
	
	                try {
	                    for (var _iterator5 = currentPosts[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                        var currentPost = _step5.value;
	
	                        if (currentPost.content) {
	                            var labelsHu = [],
	                                labelsEn = [];
	
	                            var _iteratorNormalCompletion6 = true;
	                            var _didIteratorError6 = false;
	                            var _iteratorError6 = undefined;
	
	                            try {
	                                for (var _iterator6 = currentPost.labels[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                                    var label = _step6.value;
	
	                                    labelsHu.push(label.content.hu);
	                                    labelsEn.push(label.content.en);
	                                }
	                            } catch (err) {
	                                _didIteratorError6 = true;
	                                _iteratorError6 = err;
	                            } finally {
	                                try {
	                                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                                        _iterator6.return();
	                                    }
	                                } finally {
	                                    if (_didIteratorError6) {
	                                        throw _iteratorError6;
	                                    }
	                                }
	                            }
	
	                            html += postHtmlTemplate(currentPost.id, currentPost.created, labelsHu, labelsEn, currentPost.content.hu, currentPost.content.en, currentPost.title.hu, currentPost.title.en, currentPost.url.hu, currentPost.url.en);
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError5 = true;
	                    _iteratorError5 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                            _iterator5.return();
	                        }
	                    } finally {
	                        if (_didIteratorError5) {
	                            throw _iteratorError5;
	                        }
	                    }
	                }
	
	                document.querySelector(that.contentElement).innerHTML = html;
	
	                addAllDeleteEvent();
	                addAllUpdateEvent();
	            }
	
	            /**
	             * @param {number|null} id
	             * @param {string} created
	             * @param {string[]} labelsHu
	             * @param {string[]} labelsEn
	             * @param {string} contentHu
	             * @param {string} contentEn
	             * @param {string} titleHu
	             * @param {string} titleEn
	             * @param {string} urlHu
	             * @param {string} urlEn
	             * @return {string}
	             */
	            function postHtmlTemplate(id, created, labelsHu, labelsEn, contentHu, contentEn, titleHu, titleEn, urlHu, urlEn) {
	                var labelHuString = labelsHu.join(labelSeparator),
	                    labelEnString = labelsEn.join(labelSeparator);
	
	                return '<section id="post-' + id + '" class="post" style="border: 10px dotted saddlebrown">\n                        <p data-original="' + id + '" class="id">ID: <var>' + id + '</var></p>\n                        <p data-original="' + created + '" class="created">Created: <var>' + created + '</var></p>\n                        <p data-original="' + labelHuString + '" class="label-hu">Labels in hungarian: <var>' + labelHuString + '</var></p>\n                        <p data-original="' + labelEnString + '" class="label-en">Labels in english: <var>' + labelEnString + '</var></p>\n                        <p data-original="' + contentHu + '" class="content-hu">Content in hungarian: <var>' + contentHu + '</var></p>\n                        <p data-original="' + contentEn + '" class="content-en">Content in english: <var>' + contentEn + '</var></p>\n                        <p data-original="' + titleHu + '" class="title-hu">Title in hungarian: <var>' + titleHu + '</var></p>\n                        <p data-original="' + titleEn + '" class="title-en">Title in english: <var>' + titleEn + '</var></p>\n                        <p data-original="' + urlHu + '" class="url-hu">Url in hungarian: <var>' + urlHu + '</var></p>\n                        <p data-original="' + urlEn + '" class="url-en">Url in english: <var>' + urlEn + '</var></p>\n                        <button class="update" data-clicked="0">Update</button>\n                        <button class="delete">Delete</button>\n                    </section>';
	            }
	
	            function newPostClick() {
	                var created = that.helpers.getElementValue(createdSelector),
	                    labels = that.helpers.getElementValue(labelsSelector),
	                    contentHu = that.helpers.getElementValue(contentHuSelector, huEditor),
	                    contentEn = that.helpers.getElementValue(contentEnSelector, enEditor),
	                    titleHu = that.helpers.getElementValue(titleHuSelector),
	                    titleEn = that.helpers.getElementValue(titleEnSelector),
	                    urlHu = that.helpers.getElementValue(urlHuSelector),
	                    urlEn = that.helpers.getElementValue(urlEnSelector),
	                    valuesAndSelectors = [{ value: created, selector: createdSelector }, { value: labels, selector: labelsSelector }, { value: contentHu, selector: contentHuSelector }, { value: contentEn, selector: contentEnSelector }, { value: titleHu, selector: titleHuSelector }, { value: titleEn, selector: titleEnSelector }, { value: urlHu, selector: urlHuSelector }, { value: urlEn, selector: urlEnSelector }],
	                    errorClass = 'error';
	
	                //true is error, false isn't error
	                var existError = false;
	                var _iteratorNormalCompletion7 = true;
	                var _didIteratorError7 = false;
	                var _iteratorError7 = undefined;
	
	                try {
	                    for (var _iterator7 = valuesAndSelectors[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                        var _valueAndSelector = _step7.value;
	
	                        var value = _valueAndSelector.value,
	                            _selector = _valueAndSelector.selector;
	
	                        if (value) {
	                            that.functions.removeClass(_selector, errorClass);
	                        } else {
	                            that.functions.addClass(_selector, errorClass);
	                            existError = true;
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError7 = true;
	                    _iteratorError7 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                            _iterator7.return();
	                        }
	                    } finally {
	                        if (_didIteratorError7) {
	                            throw _iteratorError7;
	                        }
	                    }
	                }
	
	                if (!existError) {
	                    newPosts.push({
	                        created: created,
	                        labels: labels,
	                        content: { hu: contentHu, en: contentEn },
	                        title: { hu: titleHu, en: titleEn },
	                        url: { hu: urlHu, en: urlEn }
	                    });
	
	                    that.functions.checkSelector(that.contentElement, function (element) {
	                        var fullLabelsHu = [],
	                            fullLabelsEn = [];
	
	                        var _iteratorNormalCompletion8 = true;
	                        var _didIteratorError8 = false;
	                        var _iteratorError8 = undefined;
	
	                        try {
	                            var _loop3 = function _loop3() {
	                                var oneLabel = _step8.value;
	
	                                var foundLabel = currentLabels.find(function (label) {
	                                    return label.id == oneLabel;
	                                });
	
	                                fullLabelsHu.push(foundLabel.content.hu);
	                                fullLabelsEn.push(foundLabel.content.en);
	                            };
	
	                            for (var _iterator8 = labels[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                                _loop3();
	                            }
	                        } catch (err) {
	                            _didIteratorError8 = true;
	                            _iteratorError8 = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                                    _iterator8.return();
	                                }
	                            } finally {
	                                if (_didIteratorError8) {
	                                    throw _iteratorError8;
	                                }
	                            }
	                        }
	
	                        element.innerHTML += postHtmlTemplate(null, created, fullLabelsHu, fullLabelsEn, contentHu, contentEn, titleHu, titleEn, urlHu, urlEn);
	                    });
	
	                    var _iteratorNormalCompletion9 = true;
	                    var _didIteratorError9 = false;
	                    var _iteratorError9 = undefined;
	
	                    try {
	                        for (var _iterator9 = valuesAndSelectors[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                            var valueAndSelector = _step9.value;
	
	                            var selector = valueAndSelector.selector;
	
	                            if (selector != createdSelector && selector != labelsSelector) {
	                                that.helpers.setElementValue(selector, '');
	                            } else if (selector == labelsSelector) {
	                                that.helpers.changeAllOptionInSelect(selector, false);
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError9 = true;
	                        _iteratorError9 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                                _iterator9.return();
	                            }
	                        } finally {
	                            if (_didIteratorError9) {
	                                throw _iteratorError9;
	                            }
	                        }
	                    }
	                }
	
	                addAllDeleteEvent();
	                addAllUpdateEvent();
	            }
	
	            function saveChangeClick() {
	                var endPosts = [];
	
	                var _loop4 = function _loop4(index) {
	                    var currentPost = currentPosts[index],
	                        originalPostInfos = {};
	
	                    getPostInfosFromNodeAndChangeNodeHtmlToInputThenToText(document.querySelector(that.contentElement).childNodes[index], function (attr) {
	                        originalPostInfos[attr.elem] = attr.node.dataset.original;
	                    });
	
	                    var contentLanguageIndex = languages.indexOf(languages.find(function (language) {
	                        return String(language.hu) == originalPostInfos['content-hu'] && String(language.en) == originalPostInfos['content-en'];
	                    })),
	                        titleLanguageIndex = languages.indexOf(languages.find(function (language) {
	                        return String(language.hu) == originalPostInfos['title-hu'] && String(language.en) == originalPostInfos['title-en'];
	                    })),
	                        urlLanguageIndex = languages.indexOf(languages.find(function (language) {
	                        return String(language.hu) == originalPostInfos['url-hu'] && String(language.en) == originalPostInfos['url-en'];
	                    }));
	
	                    console.log(contentLanguageIndex, languages, originalPostInfos);
	
	                    languages[contentLanguageIndex].hu = currentPost.content.hu;
	                    languages[contentLanguageIndex].en = currentPost.content.en;
	                    languages[titleLanguageIndex].hu = currentPost.title.hu;
	                    languages[titleLanguageIndex].en = currentPost.title.en;
	                    languages[urlLanguageIndex].hu = currentPost.url.hu;
	                    languages[urlLanguageIndex].en = currentPost.url.en;
	
	                    endPosts.push({
	                        id: currentPost.id,
	                        created: currentPost.created,
	                        labelIds: currentPost.labelIds,
	                        contentId: currentPost.contentId,
	                        titleId: currentPost.titleId,
	                        urlId: currentPost.urlId
	                    });
	                };
	
	                for (var index in currentPosts) {
	                    _loop4(index);
	                }
	
	                var _iteratorNormalCompletion10 = true;
	                var _didIteratorError10 = false;
	                var _iteratorError10 = undefined;
	
	                try {
	                    var _loop5 = function _loop5() {
	                        var newPost = _step10.value;
	
	                        var existPost = currentPosts.find(function (post) {
	                            return post.content.en == newPost.en && post.content.hu == newPosts.hu;
	                        });
	
	                        if (!existPost) {
	                            endPosts.push({
	                                id: endPosts.length + 1,
	                                created: newPost.created,
	                                labelIds: that.helpers.arrayElementsConvertToNumber(newPost.labels),
	                                contentId: addTextToLanguageAndReturnId(newPost, 'content'),
	                                titleId: addTextToLanguageAndReturnId(newPost, 'title'),
	                                urlId: addTextToLanguageAndReturnId(newPost, 'url')
	                            });
	                        }
	                    };
	
	                    for (var _iterator10 = newPosts[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                        _loop5();
	                    }
	                } catch (err) {
	                    _didIteratorError10 = true;
	                    _iteratorError10 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                            _iterator10.return();
	                        }
	                    } finally {
	                        if (_didIteratorError10) {
	                            throw _iteratorError10;
	                        }
	                    }
	                }
	
	                _imports.DatabaseController.saveJSONToFile(languages, 'languages');
	                _imports.DatabaseController.saveJSONToFile(endPosts, 'posts');
	            }
	
	            /**
	             * @param {object} post
	             * @param {string} which Content, title or url
	             * @return {number}
	             */
	            function addTextToLanguageAndReturnId(post, which) {
	                var existLanguage = languages.find(function (lang) {
	                    return lang.en == post[which].en && lang.hu && post[which].hu;
	                });
	
	                if (existLanguage) {
	                    return existLanguage.id;
	                } else {
	                    var id = languages.length + 1;
	
	                    languages.push({
	                        id: id,
	                        hu: post[which].hu,
	                        en: post[which].en
	                    });
	
	                    return Number(id);
	                }
	            }
	
	            function getPostInfosFromNodeAndChangeNodeHtmlToInputThenToText(postSection, callback) {
	                var result = {
	                    // labels: {},
	                    content: {},
	                    title: {},
	                    url: {}
	                },
	                    callCallback = that.helpers.ifExistCallbackICall,
	                    getData = that.getDataFromPElement;
	
	                var _iteratorNormalCompletion11 = true;
	                var _didIteratorError11 = false;
	                var _iteratorError11 = undefined;
	
	                try {
	                    for (var _iterator11 = postSection.childNodes[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	                        var child = _step11.value;
	
	                        var className = child.className;
	                        if (className && child.nodeName !== 'BUTTON') {
	                            var data = getData(child);
	
	                            var classNamePieces = className.split('-');
	                            switch (classNamePieces.length) {
	                                case 1:
	                                    result[classNamePieces[0]] = data;
	                                    break;
	                                case 2:
	                                    if (!result[classNamePieces[0]]) {
	                                        result[classNamePieces[0]] = {};
	                                    }
	                                    result[classNamePieces[0]][classNamePieces[1]] = data;
	                                    break;
	                                default:
	                                    break;
	                            }
	
	                            callCallback(callback, { elem: className, node: child, data: data });
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError11 = true;
	                    _iteratorError11 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                            _iterator11.return();
	                        }
	                    } finally {
	                        if (_didIteratorError11) {
	                            throw _iteratorError11;
	                        }
	                    }
	                }
	
	                return result;
	            }
	
	            function addAllDeleteEvent() {
	                __webpack_require__(1).addEventToAllElement('.post .delete', 'click', function (attr) {
	                    var section = attr.section,
	                        button = attr.button;
	
	                    that.searchInfos(currentPosts, newPosts, section, getPostInfosFromNodeAndChangeNodeHtmlToInputThenToText, function (postArray, index) {
	                        console.log(postArray);
	                        postArray.splice(index, 1);
	                    }, true);
	
	                    section.parentNode.removeChild(section);
	                });
	            }
	
	            function addAllUpdateEvent() {
	                __webpack_require__(1).addEventToAllElement('.post .update', 'click', function (attr) {
	                    var section = attr.section,
	                        button = attr.button;
	
	                    if (button.dataset.clicked == '0') {
	                        button.dataset.clicked = '1';
	                        button.innerHTML = 'Save';
	
	                        getPostInfosFromNodeAndChangeNodeHtmlToInputThenToText(section, function (args) {
	                            var elem = args.elem,
	                                node = args.node,
	                                data = args.data;
	
	                            node.dataset.oldValue = data;
	
	                            var child = node.childNodes[1];
	
	                            switch (elem) {
	                                case 'content-hu':
	                                case 'content-en':
	                                    child.innerHTML = '<textarea>' + data + '</textarea>';
	                                    break;
	                                case 'label-hu':
	                                    var html = '<select multiple>';
	                                    var _iteratorNormalCompletion12 = true;
	                                    var _didIteratorError12 = false;
	                                    var _iteratorError12 = undefined;
	
	                                    try {
	                                        for (var _iterator12 = currentLabels[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	                                            var label = _step12.value;
	
	                                            html += '<option value="' + label.id + '" ' + (label.content.hu == data ? "selected" : "") + '>\n                                            ' + label.content.hu + ' / ' + label.content.en + '\n                                        </option>';
	                                        }
	                                    } catch (err) {
	                                        _didIteratorError12 = true;
	                                        _iteratorError12 = err;
	                                    } finally {
	                                        try {
	                                            if (!_iteratorNormalCompletion12 && _iterator12.return) {
	                                                _iterator12.return();
	                                            }
	                                        } finally {
	                                            if (_didIteratorError12) {
	                                                throw _iteratorError12;
	                                            }
	                                        }
	                                    }
	
	                                    child.innerHTML = html + '</select>';
	                                    break;
	                                case 'label-en':
	                                    child.innerHTML = ' ';
	                                    break;
	                                default:
	                                    child.innerHTML = '<input type="text" value="' + data + '">';
	                                    break;
	                            }
	                        });
	                    } else {
	                        (function () {
	                            button.dataset.clicked = '0';
	                            button.innerHTML = 'Update';
	
	                            var oldPostDatas = {},
	                                labelsHu = [],
	                                labelsEn = [];
	
	                            var postInfos = getPostInfosFromNodeAndChangeNodeHtmlToInputThenToText(section, function (args) {
	                                var elem = args.elem,
	                                    node = args.node,
	                                    data = args.data;
	
	                                oldPostDatas[elem] = node.dataset.oldValue;
	                                delete node.dataset.oldValue;
	
	                                switch (elem) {
	                                    case 'label-hu':
	                                        var _loop6 = function _loop6(index) {
	                                            var foundLabel = currentLabels.find(function (label) {
	                                                return label.id == data[index];
	                                            });
	
	                                            labelsHu.push(foundLabel.content.hu);
	                                            labelsEn.push(foundLabel.content.en);
	                                        };
	
	                                        for (var index in data) {
	                                            _loop6(index);
	                                        }
	                                        node.childNodes[1].childNodes[0].remove();
	                                        node.childNodes[1].innerHTML = labelsHu.join(', ');
	                                        break;
	                                    case 'label-en':
	                                        node.childNodes[1].innerHTML = labelsEn.join(', ');
	                                        break;
	                                    default:
	                                        node.childNodes[1].innerHTML = data;
	                                        break;
	                                }
	                            });
	
	                            that.searchInfos(currentPosts, newPosts, postInfos, getPostInfosFromNodeAndChangeNodeHtmlToInputThenToText, function (postArray, index /*, isCurrent*/) {
	                                if (postArray) {
	                                    postArray[index].id = postInfos.id;
	                                    postArray[index].created = postInfos.created;
	                                    postArray[index].title.hu = postInfos['title-hu'];
	                                    postArray[index].title.en = postInfos['title-en'];
	                                    postArray[index].content.hu = postInfos['content-hu'];
	                                    postArray[index].content.en = postInfos['content-en'];
	                                    postArray[index].url.hu = postInfos['url-hu'];
	                                    postArray[index].url.en = postInfos['url-en'];
	                                }
	                            }, true);
	                        })();
	                    }
	                });
	            }
	        }
	
	        /**
	         * @param {HTMLElement} p
	         * @return {string|string[]}
	         */
	
	    }, {
	        key: 'getDataFromPElement',
	        value: function getDataFromPElement(p) {
	            var varTag = p.childNodes[1],
	                child = varTag.childNodes[0];
	
	            if (child.nodeName === '#text') {
	                return varTag.innerHTML;
	            } else {
	                return __webpack_require__(1).getElementValue(child);
	            }
	        }
	
	        /**
	         * @param {*[]} currents
	         * @param {*[]} news
	         * @param {object|HTMLElement} datas
	         * @param {function} getInfosFunction
	         * @param {function} callback
	         * @param {boolean} isPost
	         * @return {function(object|boolean, number|boolean, boolean)}
	         */
	
	    }, {
	        key: 'searchInfos',
	        value: function searchInfos(currents, news, datas, getInfosFunction, callback) {
	            var isPost = arguments.length <= 5 || arguments[5] === undefined ? false : arguments[5];
	
	            var infos = __webpack_require__(1).isHtmlElement(datas) ? getInfosFunction(datas) : datas;
	
	            if (infos.id != 'null') //these labels still be
	                {
	                    var arrayIndex = isPost ? this.searchIndex(currents, //post
	                    function (value) {
	                        return value.id == infos.id && String(value.content.hu) == infos.content.hu && String(value.content.en) == infos.content.en;
	                    }) : this.searchIndex(currents, //label
	                    function (value) {
	                        return value.id == infos.id && String(value.content.hu) == infos.hu && String(value.content.en) == infos.en;
	                    });
	
	                    if (arrayIndex > -1) {
	                        return callback(currents, arrayIndex, true);
	                    }
	                } else //these labels maybe will be, other objects
	                {
	                    var _arrayIndex = isPost ? this.searchIndex(news, //post
	                    function (value) {
	                        return String(value.content.hu) == infos['content-hu'] && String(value.content.en) == infos['content-en'];
	                    }) : this.searchIndex(news, //label
	                    function (value) {
	                        return String(value.hu) == infos.hu && String(value.en) == infos.en;
	                    });
	
	                    if (_arrayIndex > -1) {
	                        return callback(news, _arrayIndex, false);
	                    }
	                }
	
	            return callback(false, false, false);
	        }
	
	        /**
	         * @param {*[]} array
	         * @param {function} callback
	         * @return {number}
	         */
	
	    }, {
	        key: 'searchIndex',
	        value: function searchIndex(array, callback) {
	            return array.indexOf(array.find(function (elem) {
	                return callback(elem);
	            }));
	        }
	    }]);
	
	    return AdminController;
	}();
	
	exports.default = AdminController;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _JsonToHtml = __webpack_require__(12);
	
	var _JsonToHtml2 = _interopRequireDefault(_JsonToHtml);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Editor = function () {
	    /**
	     * @param {string} fileName
	     * @param {string} idOfEditor
	     * @param {string} idOfSaveButton
	     * @param {string} idOfOutput
	     */
	    function Editor(_ref) {
	        var fileName = _ref.fileName;
	        var _ref$idOfEditor = _ref.idOfEditor;
	        var idOfEditor = _ref$idOfEditor === undefined ? 'in' : _ref$idOfEditor;
	        var _ref$idOfSaveButton = _ref.idOfSaveButton;
	        var idOfSaveButton = _ref$idOfSaveButton === undefined ? 'save' : _ref$idOfSaveButton;
	        var _ref$idOfOutput = _ref.idOfOutput;
	        var idOfOutput = _ref$idOfOutput === undefined ? 'out' : _ref$idOfOutput;
	
	        _classCallCheck(this, Editor);
	
	        this.in = idOfEditor;
	        this.out = idOfOutput;
	        this.saveButton = idOfSaveButton;
	        this.filename = fileName;
	
	        this.editorInit();
	        this.addJsonParseToHtmlOnEditorChange();
	        this.addSaveOnButtonClick();
	    }
	
	    _createClass(Editor, [{
	        key: 'editorInit',
	        value: function editorInit() {
	            this.editor = CodeMirror.fromTextArea(document.getElementById(this.in), {
	                mode: "application/json",
	                lineNumbers: true,
	                autoCloseBrackets: true,
	                showCursorWhenSelecting: true,
	                lineWrapping: true,
	                theme: 'monokai',
	                matchBrackets: true,
	                tabSize: 2,
	                keyMap: 'sublime'
	            });
	        }
	    }, {
	        key: 'addJsonParseToHtmlOnEditorChange',
	        value: function addJsonParseToHtmlOnEditorChange() {
	            this.editor.on('change', function (cm) {
	                new _JsonToHtml2.default(cm.getValue(), document.getElementById(this.out));
	            }.bind(this));
	        }
	    }, {
	        key: 'addSaveOnButtonClick',
	        value: function addSaveOnButtonClick() {
	            if (this.saveButton !== false) {
	                document.getElementById(this.saveButton).addEventListener('click', function (e) {
	                    var filename = this.fileName || prompt('What would you like for filename?');
	                    while (!filename) {
	                        filename = prompt('Please type a filename!');
	                    }
	
	                    Editor.saveFile(this.getValueOfEditor(), filename);
	                }.bind(this));
	            }
	        }
	    }, {
	        key: 'getValueOfEditor',
	        value: function getValueOfEditor() {
	            return this.editor.doc.cm.getValue();
	        }
	
	        /**
	         * @param {string} value
	         * @param {string} filename
	         */
	
	    }], [{
	        key: 'saveFile',
	        value: function saveFile(value, filename) {
	            __webpack_require__(8).saveAs(new Blob([value], { type: 'application/json;charset=utf8' }), filename + '.json');
	        }
	    }]);
	
	    return Editor;
	}();
	
	exports.default = Editor;

/***/ },
/* 15 */
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
	        return next(document.querySelector(selector));
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