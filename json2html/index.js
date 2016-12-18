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
	
	var _Editor = __webpack_require__(1);
	
	var _Editor2 = _interopRequireDefault(_Editor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	new _Editor2.default({});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _JsonToHtml = __webpack_require__(2);
	
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
	            __webpack_require__(3).saveAs(new Blob([value], { type: 'application/json;charset=utf8' }), filename + '.json');
	        }
	    }]);
	
	    return Editor;
	}();
	
	exports.default = Editor;

/***/ },
/* 2 */
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
	            console.error(e.message);
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
	
	            console.log(inner);
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
/* 3 */
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
	} else if ("function" !== "undefined" && __webpack_require__(4) !== null && __webpack_require__(5) !== null) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return saveAs;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map