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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var JsonToHtml = function () {
	    /**
	     * @param {string} fileName
	     * @param {string} idOfEditor
	     * @param {string} idOfSaveButton
	     * @param {string} idOfOutput
	     */
	    function JsonToHtml(_ref) {
	        var fileName = _ref.fileName;
	        var _ref$idOfEditor = _ref.idOfEditor;
	        var idOfEditor = _ref$idOfEditor === undefined ? 'in' : _ref$idOfEditor;
	        var _ref$idOfSaveButton = _ref.idOfSaveButton;
	        var idOfSaveButton = _ref$idOfSaveButton === undefined ? 'save' : _ref$idOfSaveButton;
	        var _ref$idOfOutput = _ref.idOfOutput;
	        var idOfOutput = _ref$idOfOutput === undefined ? 'out' : _ref$idOfOutput;
	
	        _classCallCheck(this, JsonToHtml);
	
	        this.in = idOfEditor;
	        this.out = idOfOutput;
	        this.saveButton = idOfSaveButton;
	
	        var outter = document.getElementById(this.out);
	
	        var editor = this.editorInit();
	        editor.on('change', function (cm) {
	            this.start(cm.getValue(), outter);
	        }.bind(this));
	
	        document.getElementById(this.saveButton).addEventListener('click', function (e) {
	            var filename = fileName || prompt('What would you like for filename?');
	            while (!filename) {
	                filename = prompt('Please type a filename!');
	            }
	
	            JsonToHtml.saveFile(editor.doc.cm.getValue(), filename);
	        });
	    }
	
	    /**
	     * @return {object}
	     */
	
	
	    _createClass(JsonToHtml, [{
	        key: 'editorInit',
	        value: function editorInit() {
	            return CodeMirror.fromTextArea(document.getElementById(this.in), {
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
	
	        /**
	         * @param {string} jsonString
	         * @param {HTMLElement} out
	         */
	
	    }, {
	        key: 'start',
	        value: function start(jsonString, out) {
	            var outString = '';
	
	            try {
	                this.object = JSON.parse(jsonString);
	                outString = this.cycle(this.object);
	            } catch (e) {
	                outString = e.message;
	            }
	
	            out.innerHTML = outString;
	        }
	
	        /**
	         * @param {object} object
	         * @param {function} callback - optional
	         * @return {string}
	         */
	
	    }, {
	        key: 'cycle',
	        value: function cycle(object, callback) {
	            var _this = this;
	
	            var html = '';
	
	            var _loop = function _loop(index) {
	                var tag = index,
	                    id = _this.findFromFirstChar(object[index], '#'),
	                    classOfElement = _this.findFromFirstChar(object[index], '.'),
	                    style = _this.findFromFirstChar(object[index], '*'),
	                    other = _this.findFromFirstChar(object[index], '-'),
	                    innerText = _this.findFromNotFirstChar(object[index], ['#', '.', '*', '-']);
	                var innerObject = object[index].find(function (elem) {
	                    return (typeof elem === 'undefined' ? 'undefined' : _typeof(elem)) == 'object';
	                });
	
	                if (innerObject) {
	                    _this.cycle(innerObject, function (innerElement) {
	                        html += _this.whichTagTypeWay(tag, id, classOfElement, style, other, innerText + innerElement);
	                    });
	                } else {
	                    html += _this.whichTagTypeWay(tag, id, classOfElement, style, other, innerText);
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
	         * @param {string} id
	         * @param {string} classOfElement
	         * @param {string} style
	         * @param {string} other
	         * @param {string} inner
	         * @return {string}
	         */
	
	    }, {
	        key: 'whichTagTypeWay',
	        value: function whichTagTypeWay(tag, id, classOfElement, style) {
	            var other = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];
	            var inner = arguments.length <= 5 || arguments[5] === undefined ? '' : arguments[5];
	
	            if (inner != '' && tag == 'input') {
	                return this.selfClosedTag(tag, id, classOfElement, style, other);
	            } else {
	                return this.withCloseTag(tag, id, classOfElement, style, other, inner);
	            }
	        }
	
	        /**
	         * @param {string} tag
	         * @param {string} id
	         * @param {string} classOfElement
	         * @param {string} style
	         * @param {string} other
	         * @return {string}
	         */
	
	    }, {
	        key: 'selfClosedTag',
	        value: function selfClosedTag(tag, id, classOfElement, style) {
	            var other = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];
	
	            return '<' + tag + ' id="' + id + '" class="' + classOfElement + '" style="' + style + '" ' + other + ' />';
	        }
	
	        /**
	         * @param {string} tag
	         * @param {string} id
	         * @param {string} classOfElement
	         * @param {string} style
	         * @param {string} other
	         * @param {string} inner
	         * @return {string}
	         */
	
	    }, {
	        key: 'withCloseTag',
	        value: function withCloseTag(tag, id, classOfElement, style) {
	            var other = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];
	            var inner = arguments.length <= 5 || arguments[5] === undefined ? '' : arguments[5];
	
	            return '<' + tag + ' id="' + id + '" class="' + classOfElement + '" style="' + style + '" ' + other + '>\n                    ' + inner + '\n                </' + tag + '>';
	        }
	
	        /**
	         * @param {[]} arrayOfChars
	         * @param {string} char
	         * @return {*}
	         */
	
	    }, {
	        key: 'findFromFirstChar',
	        value: function findFromFirstChar(arrayOfChars, char) {
	            var found = arrayOfChars.find(function (elem) {
	                return typeof elem == 'string' && elem.charAt(0) == char;
	            });
	            return !found ? '' : found.substring(1);
	        }
	
	        /**
	         * @param {[]} arrayOfChars
	         * @param {string} char
	         * @return {*}
	         */
	
	    }, {
	        key: 'findFromNotFirstChar',
	        value: function findFromNotFirstChar(arrayOfChars, chars) {
	            var found = arrayOfChars.find(function (elem) {
	                return chars.indexOf(elem.charAt(0)) === -1;
	            });
	            return !found ? '' : found;
	        }
	
	        /**
	         * @param {string} value
	         * @param {string} filename
	         */
	
	    }], [{
	        key: 'saveFile',
	        value: function saveFile(value, filename) {
	            value = '{"' + filename + '": ' + value + '}';
	
	            __webpack_require__(1).saveAs(new Blob([value], { type: 'application/json;charset=utf8' }), filename + '.json');
	        }
	    }]);
	
	    return JsonToHtml;
	}();
	
	new JsonToHtml({});

/***/ },
/* 1 */
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
	} else if ("function" !== "undefined" && __webpack_require__(2) !== null && __webpack_require__(3) !== null) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return saveAs;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }
/******/ ]);
//# sourceMappingURL=JsonToHtml.js.map