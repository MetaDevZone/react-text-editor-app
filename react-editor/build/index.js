module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(3);
            var content = __webpack_require__(4);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(5);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":root {\r\n  --editor-background-color: #fff;\r\n  --editor-border-color: #c4c4c4;\r\n  --editor-text-color: #414141;\r\n  --editor-toolbar-button-background: #fff;\r\n  --editor-toolbar-text-color: #414141;\r\n  --editor-toolbar-button-hover-background: #efefef;\r\n  --editor-toolbar-button-selected-background: #dee0e2;\r\n  --editor-svg-color: #414141;\r\n  --editor-save-button-background: rgb(9, 134, 62);\r\n}\r\n\r\nhtml,\r\nbody {\r\n  padding: 0;\r\n  margin: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.react-editor-main img {\r\n  /* max-width: 60%; */\r\n  /* height: auto; */\r\n}\r\n\r\n.react-editor-main .select-option p,\r\n.react-editor-main .select-option pre,\r\n.react-editor-main .select-option h2,\r\n.react-editor-main .select-option h3,\r\n.react-editor-main .select-option h4,\r\n.react-editor-main .select-option h5,\r\n.react-editor-main .select-option h6,\r\n.react-editor-main .select-option blockquote,\r\n.react-editor-main .select-option h1 {\r\n  margin: 0;\r\n  color: var(--editor-toolbar-text-color) !important;\r\n}\r\n\r\n.react-editor-main {\r\n  background-color: var(--editor-background-color);\r\n  border: 1px solid var(--editor-border-color);\r\n  color: var(--editor-text-color);\r\n  line-height: 16px !important;\r\n  font-family: system-ui !important;\r\n}\r\n\r\n.react-editor-main .wysiwyg-editor__toolbar {\r\n  border-bottom: 1px solid var(--editor-border-color);\r\n  font-size: 18px;\r\n  display: flex;\r\n  align-items: center;\r\n  flex-wrap: wrap;\r\n  padding: 0 5px;\r\n  position: relative;\r\n}\r\n\r\n.react-editor-main .wysiwyg-editor__toolbar .hr-1 {\r\n  position: absolute;\r\n  width: 98%;\r\n  border-color: var(--editor-border-color);\r\n  border: none;\r\n  border-top: 1px solid var(--editor-border-color);\r\n  height: 1px;\r\n  display: none;\r\n  top: 32px;\r\n  margin: 0;\r\n}\r\n\r\n.react-editor-main .wysiwyg-editor__toolbar .hr-2 {\r\n  top: 64px;\r\n}\r\n\r\n.react-editor-main .wysiwyg-editor__toolbar .button-group {\r\n  display: inline-block;\r\n  border-right: 1px solid var(--editor-border-color);\r\n}\r\n.react-editor-main .wysiwyg-editor__toolbar button {\r\n  background: var(--editor-toolbar-button-background);\r\n  outline: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 6px 10px;\r\n  color: var(--editor-toolbar-text-color);\r\n  line-height: 16px;\r\n}\r\n.wysiwyg-editor__toolbar button:disabled,\r\n.wysiwyg-editor__toolbar button.disabled {\r\n  cursor: not-allowed;\r\n}\r\n.wysiwyg-editor__toolbar button:disabled svg,\r\n.wysiwyg-editor__toolbar button.disabled svg {\r\n  fill: #9fa2a6;\r\n}\r\n\r\n.wysiwyg-editor__toolbar button:hover {\r\n  background-color: var(--editor-toolbar-button-hover-background);\r\n}\r\n\r\n.wysiwyg-editor__toolbar input {\r\n  background-color: transparent;\r\n  border: 1px solid var(--editor-border-color);\r\n  outline: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.wysiwyg-editor__toolbar select,\r\n.wysiwyg-editor__toolbar select:focus-visible {\r\n  border: none !important;\r\n  outline: none;\r\n}\r\n\r\n.ml-main-content-box {\r\n  padding: 10px;\r\n  height: 250px;\r\n  overflow: auto;\r\n  resize: vertical;\r\n  max-width: 100% !important;\r\n  line-height: normal;\r\n}\r\n\r\n.react-editor-main .placeholder-text {\r\n  opacity: 0.8;\r\n  font-style: italic;\r\n}\r\n\r\n.ml-main-content-box h1,\r\n.ml-main-content-box h2,\r\n.ml-main-content-box h3,\r\n.ml-main-content-box h4,\r\n.ml-main-content-box h5,\r\n.ml-main-content-box h6,\r\n.ml-main-content-box p {\r\n  margin-top: 0;\r\n  color: var(--editor-text-color);\r\n}\r\n\r\n.ml-main-content-box h1 {\r\n  font-size: 2em;\r\n}\r\n\r\n.ml-main-content-box h2 {\r\n  font-size: 1.5em;\r\n}\r\n\r\n.ml-main-content-box h3 {\r\n  font-size: 1.17em;\r\n}\r\n\r\n.ml-main-content-box h4 {\r\n  font-size: 1em;\r\n}\r\n\r\n.ml-main-content-box h5 {\r\n  font-size: 0.83em;\r\n}\r\n\r\n.ml-main-content-box h6 {\r\n  font-size: 0.67em;\r\n}\r\n\r\n.ml-main-content-box p {\r\n  font-size: 1em;\r\n}\r\n\r\n#modal-root .link-image {\r\n  height: 80px;\r\n  width: 80px;\r\n  object-fit: cover;\r\n  border: 1px solid var(--editor-border-color);\r\n  border-radius: 5px;\r\n}\r\n\r\n#modal-root .link-image-box {\r\n  height: 80px;\r\n  width: 80px;\r\n  position: relative;\r\n  margin-top: 10px;\r\n}\r\n#modal-root .link-image-cross {\r\n  position: absolute;\r\n  top: -5px;\r\n  right: -7px;\r\n  height: 20px;\r\n  width: 20px;\r\n  background-color: red;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  border-radius: 50%;\r\n  color: #fff;\r\n  cursor: pointer;\r\n  padding-bottom: 3px;\r\n}\r\n\r\n.ml-main-content-box:focus-visible {\r\n  outline: none;\r\n}\r\n\r\n.wysiwyg-editor__source {\r\n  width: 98%;\r\n  height: 80%;\r\n  outline: none;\r\n  padding: 10px;\r\n  font-family: \"Courier New\", Monospace !important;\r\n  font-size: small;\r\n  white-space: pre-wrap;\r\n  margin: 0;\r\n  display: block;\r\n  font-size: 16px;\r\n  resize: none;\r\n}\r\n\r\n/* Modal.css */\r\n\r\n#modal-root .modal-overlay {\r\n  font-family: system-ui !important;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  z-index: 999999;\r\n}\r\n\r\n.image-model-overly {\r\n  z-index: 999999;\r\n}\r\n\r\n.fill-screen-view {\r\n  z-index: 999999;\r\n}\r\n\r\n#modal-root .model-title {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n#modal-root .model-title h2 {\r\n  margin: 0;\r\n}\r\n\r\n#modal-root .model-title svg {\r\n  font-size: 25px;\r\n  cursor: pointer;\r\n}\r\n\r\n#modal-root .modal-popup {\r\n  background-color: #fff;\r\n  padding: 20px;\r\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\r\n  width: 400px;\r\n  max-width: 85%;\r\n  color: #000;\r\n  border-radius: 5px;\r\n}\r\n\r\n.fill-screen-view .modal-popup {\r\n  max-width: 100% !important;\r\n  width: 100vw !important;\r\n  height: 100vh !important;\r\n  z-index: 1;\r\n  padding: 0 !important;\r\n  overflow: hidden;\r\n  border-radius: 0 !important;\r\n}\r\n\r\n#modal-root .modal-popup hr {\r\n  margin-bottom: 0;\r\n}\r\n\r\n#modal-root .modal-close-btn {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 10px;\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 5px 10px;\r\n  font-size: 16px;\r\n}\r\n\r\n.wysiwyg-editor__toolbar button svg {\r\n  fill: var(--editor-svg-color);\r\n  color: var(--editor-svg-color);\r\n  display: inline-block;\r\n  height: 15px;\r\n  width: 14px;\r\n}\r\n\r\n.react-editor-main .custom-select {\r\n  position: relative;\r\n  display: inline-block;\r\n  cursor: pointer;\r\n  font-size: 16px;\r\n  padding: 6px;\r\n  color: var(--editor-toolbar-text-color);\r\n  line-height: 16px;\r\n}\r\n\r\n.react-editor-main .custom-select-format {\r\n  position: relative;\r\n  display: inline-block;\r\n  cursor: pointer;\r\n  font-size: 16px;\r\n  padding: 6px;\r\n}\r\n\r\n.react-editor-main .main-color-component svg {\r\n  height: 13px !important;\r\n}\r\n\r\n.react-editor-main .select-items {\r\n  position: absolute;\r\n  background-color: #fff;\r\n  border: 1px solid var(--editor-border-color);\r\n  border-radius: 2px;\r\n  z-index: 2;\r\n  width: 160px;\r\n  max-height: 200px;\r\n  overflow-y: auto;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\r\n  top: 29px;\r\n  left: 0;\r\n  display: none;\r\n}\r\n\r\n.react-editor-main .select-items button {\r\n  display: flex !important;\r\n  width: 100%;\r\n  padding: 7px;\r\n  font-family: system-ui !important;\r\n}\r\n\r\n.react-editor-main .p-items .select-items {\r\n  left: 142px;\r\n}\r\n\r\n.react-editor-main .select-items-format {\r\n  position: absolute;\r\n  background-color: var(--editor-background-color);\r\n  border: 1px solid var(--editor-border-color);\r\n  border-top: none;\r\n  border-radius: 2px;\r\n  z-index: 1;\r\n  max-height: 200px;\r\n  overflow-y: auto;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\r\n  left: 0;\r\n  top: 30px;\r\n}\r\n\r\n.react-editor-main .select-items-format .select-option:hover {\r\n  background-color: var(--editor-toolbar-button-hover-background) !important;\r\n}\r\n\r\n.react-editor-main .select-items-format h1 {\r\n  font-size: 32px !important;\r\n  font-weight: 600;\r\n  line-height: 32px;\r\n}\r\n.react-editor-main .select-items-format h2 {\r\n  font-size: 28px !important;\r\n  font-weight: 600;\r\n  line-height: 28px;\r\n}\r\n.react-editor-main .select-items-format h3 {\r\n  font-size: 24px !important;\r\n  font-weight: 600;\r\n  line-height: 24px;\r\n}\r\n.react-editor-main .select-items-format h4 {\r\n  font-size: 20px !important;\r\n  line-height: 20px;\r\n}\r\n.react-editor-main .select-items-format h5 {\r\n  font-size: 16px !important;\r\n}\r\n.react-editor-main .select-items-format h6 {\r\n  font-size: 14px;\r\n}\r\n\r\n.react-editor-main .select-items.show {\r\n  display: block;\r\n}\r\n\r\n.react-editor-main .select-items .select-option,\r\n.react-editor-main .select-items-format .select-option {\r\n  padding: 6px 10px;\r\n  cursor: pointer;\r\n  font-size: 16px;\r\n  white-space: nowrap;\r\n}\r\n\r\n.react-editor-main .select-items .select-insert svg {\r\n  height: 20px;\r\n  width: 20px;\r\n  margin-right: 7px;\r\n  color: var(--editor-svg-color);\r\n  fill: var(--editor-svg-color);\r\n}\r\n\r\n.react-editor-main .select-items button svg {\r\n  height: 16px !important;\r\n  width: 16px !important;\r\n  margin-top: 2px;\r\n}\r\n\r\n.react-editor-main .select-items .select-insert span {\r\n  margin-top: 2px;\r\n}\r\n\r\n.react-editor-main .selected-option {\r\n  background-color: var(--editor-toolbar-button-selected-background) !important;\r\n}\r\n\r\n.react-editor-main .select-items .select-option:hover,\r\n.react-editor-main .select-insert:hover {\r\n  background-color: var(--editor-toolbar-button-hover-background) !important;\r\n}\r\n\r\n#modal-root .form-control-input {\r\n  font-family: system-ui !important;\r\n  width: 100%;\r\n  padding: 7px;\r\n  border: 1px solid var(--editor-border-color);\r\n  border-radius: 3px;\r\n}\r\n\r\n#modal-root .form-control-input:focus-visible {\r\n  outline: none;\r\n}\r\n\r\n#modal-root .save-button {\r\n  background-color: var(--editor-save-button-background);\r\n  color: #fff;\r\n  padding: 7px 14px;\r\n  border: none;\r\n  margin-top: 10px;\r\n  border-radius: 3px;\r\n  cursor: pointer;\r\n}\r\n\r\n#modal-root .select-type button {\r\n  padding: 6px 20px;\r\n  background-color: var(--editor-toolbar-button-background);\r\n  border: 1px solid var(--editor-border-color);\r\n  cursor: pointer;\r\n}\r\n\r\n#modal-root .select-type button.selected-type {\r\n  background-color: #efefef;\r\n}\r\n\r\n#modal-root .special-char-box {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n#modal-root .special-char {\r\n  width: 30px;\r\n  height: 30px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  cursor: pointer;\r\n  border-radius: 2px;\r\n}\r\n\r\n#modal-root .special-char:hover {\r\n  background-color: #dee0e2;\r\n}\r\n\r\n.react-editor-main .select-insert {\r\n  min-width: 120px;\r\n  font-size: 16px;\r\n  text-align: left;\r\n  padding: 8px 10px;\r\n  white-space: nowrap;\r\n  display: flex;\r\n  border-top: 1px solid var(--editor-border-color) !important;\r\n  color: var(--editor-text-color) !important;\r\n  background-color: var(--editor-background-color);\r\n  border-radius: 0 !important;\r\n  margin: 0 !important;\r\n}\r\n\r\n/* width */\r\n.react-editor-main ::-webkit-scrollbar {\r\n  width: 5px;\r\n}\r\n\r\n/* Track */\r\n.react-editor-main ::-webkit-scrollbar-track {\r\n  background: #f1f1f1;\r\n}\r\n\r\n/* Handle */\r\n.react-editor-main ::-webkit-scrollbar-thumb {\r\n  background: var(--editor-border-color);\r\n}\r\n\r\n/* Handle on hover */\r\n.react-editor-main ::-webkit-scrollbar-thumb:hover {\r\n  background: #555;\r\n}\r\n\r\n#modal-root .full-screen-model {\r\n  width: 95% !important;\r\n  height: 85vh;\r\n}\r\n\r\n.ml-main-content-box blockquote {\r\n  border-left: 2px solid var(--editor-border-color);\r\n  border-left-width: 5px;\r\n  margin-left: 1.5rem;\r\n  padding: 2px 0;\r\n  padding-left: 1rem;\r\n  font-style: italic;\r\n  font-family: Georgia, Times, \"Times New Roman\", serif;\r\n  color: var(--editor-text-color);\r\n}\r\n\r\n.select-items-nested.left {\r\n  left: -100%;\r\n}\r\n\r\n.react-editor-main .select-formation-dropdown {\r\n  position: absolute;\r\n  background-color: var(--editor-background-color);\r\n  border: 1px solid var(--editor-border-color);\r\n  border-radius: 4px;\r\n  left: 154px;\r\n  display: none;\r\n  min-width: 140px;\r\n  z-index: 2;\r\n  max-height: 200px;\r\n  overflow-x: hidden;\r\n}\r\n\r\n.react-editor-main .font-size-dropdown {\r\n  min-width: 90px;\r\n}\r\n\r\n.react-editor-main .font-size-dropdown .select-option {\r\n  padding: 10px;\r\n  border-bottom: 1px solid var(--editor-border-color);\r\n  font-size: 16px;\r\n  width: 98%;\r\n  margin: 0;\r\n  border-radius: 0 !important;\r\n  font-family: system-ui !important;\r\n}\r\n\r\n.react-editor-main .select-formation-dropdown.show {\r\n  display: block;\r\n}\r\n\r\n.react-editor-main .font-family-option {\r\n  display: block;\r\n  width: 99%;\r\n  padding: 9px !important;\r\n  border-top: 1px solid var(--editor-border-color) !important;\r\n  margin: 0 !important;\r\n  border-radius: 0 !important;\r\n}\r\n\r\n.react-editor-main .font-family-option:hover {\r\n  background-color: var(--editor-toolbar-button-hover-background);\r\n}\r\n\r\n.react-editor-main .bottom-colored-line {\r\n  height: 3px;\r\n  width: 14px;\r\n  background-color: var(--editor-svg-color);\r\n}\r\n\r\n.react-editor-main .main-color-component {\r\n  position: relative;\r\n  display: inline-block;\r\n}\r\n\r\n.react-editor-main .open-color-box {\r\n  position: absolute;\r\n  height: 140px;\r\n  width: 140px;\r\n  background-color: var(--editor-background-color);\r\n  border: 1px solid var(--editor-border-color);\r\n  top: 30px;\r\n  left: -1px;\r\n  display: none;\r\n  z-index: 1;\r\n}\r\n\r\n.react-editor-main .color-box-grid button {\r\n  padding: 0 !important;\r\n  margin: 0 !important;\r\n  border-radius: 0 !important;\r\n}\r\n\r\n.react-editor-main .open-color-box.show {\r\n  display: block;\r\n}\r\n\r\n.react-editor-main .color-box {\r\n  height: 28px;\r\n  width: 28px;\r\n  cursor: pointer;\r\n  background-color: var(--editor-background-color);\r\n}\r\n\r\n.react-editor-main .custom-color-picker {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.react-editor-main .custom-color-picker svg {\r\n  height: 20px;\r\n}\r\n\r\n.react-editor-main .increase-icon-size svg {\r\n  height: 20px !important;\r\n  width: 17px !important;\r\n  margin-top: 3px;\r\n}\r\n\r\n.react-editor-main .increase-icon-size button {\r\n  padding: 3px 10px;\r\n}\r\n\r\n.react-editor-main .color-box:hover {\r\n  transform: scale(1.2);\r\n  transition: transform 0.5s ease;\r\n}\r\n\r\n.react-editor-main .vertical-line {\r\n  height: 32px;\r\n  width: 1px;\r\n  background-color: var(--editor-border-color);\r\n}\r\n\r\n.react-editor-main .react-editor-mt-2 {\r\n  margin-top: 2px;\r\n}\r\n#modal-root .react-editor-mt-10 {\r\n  margin-top: 10px;\r\n}\r\n.react-editor-main .react-editor-me-5 {\r\n  margin-right: 5px;\r\n}\r\n\r\n#modal-root .react-editor-text-end {\r\n  text-align: right;\r\n}\r\n\r\n.react-editor-main .react-editor-text-left {\r\n  text-align: left;\r\n}\r\n\r\n.react-editor-main .react-editor-d-flex,\r\n#modal-root .react-editor-d-flex {\r\n  display: flex;\r\n}\r\n\r\n.react-editor-main .react-editor-w-47,\r\n#modal-root .react-editor-w-47 {\r\n  width: 47%;\r\n}\r\n\r\n.react-editor-main .react-editor-w-40,\r\n#modal-root .react-editor-w-40 {\r\n  width: 40%;\r\n}\r\n\r\n.react-editor-main .justify-content-between,\r\n#modal-root .justify-content-between {\r\n  justify-content: space-between;\r\n}\r\n\r\n.react-editor-main .react-editor-flex-column,\r\n#modal-root .react-editor-flex-column {\r\n  flex-direction: column;\r\n}\r\n\r\n.editor-error-messsage {\r\n  color: red;\r\n}\r\n\r\n.ml-main-content-box:empty:before {\r\n  content: attr(data-placeholder);\r\n  color: #aaa;\r\n  pointer-events: none;\r\n}\r\n\r\n.full-screen {\r\n  position: fixed !important;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100% !important;\r\n  height: 100% !important;\r\n  background-color: var(--editor-toolbar-button-background);\r\n  overflow: hidden;\r\n  z-index: 99999 !important;\r\n}\r\n\r\n.right_click_popup_background {\r\n  position: absolute;\r\n  cursor: pointer;\r\n  background-color: var(--editor-toolbar-button-background);\r\n  border: 1px solid var(--editor-border-color);\r\n  border-radius: 5px;\r\n  z-index: 1000;\r\n  min-width: 100px;\r\n  padding: 3px 0px;\r\n}\r\n\r\n.right_click_popup_background hr {\r\n  margin: 0;\r\n  border: none;\r\n  border-top: 1px solid var(--editor-border-color);\r\n  width: 100%;\r\n}\r\n\r\n.right_click_popup {\r\n  padding: 5px 10px;\r\n  font-family: system-ui;\r\n  font-size: 15px;\r\n  color: var(--editor-text-color);\r\n}\r\n\r\n.right_click_popup:hover {\r\n  background: var(--editor-toolbar-button-hover-background);\r\n}\r\n\r\n.right_click_popup svg {\r\n  margin-right: 5px;\r\n  height: 20px;\r\n  width: 20px;\r\n  vertical-align: bottom;\r\n}\r\n\r\n.right_click_popup.open-link svg {\r\n  height: 15px;\r\n  margin-bottom: 1px;\r\n}\r\n\r\n.resize-image-wrapper {\r\n  outline: 3px solid #b4d7ff;\r\n  position: relative;\r\n}\r\n\r\n.resizer {\r\n  position: absolute;\r\n  width: 10px;\r\n  height: 10px;\r\n  background-color: #4099ff;\r\n  right: -5px;\r\n  bottom: -5px;\r\n  cursor: se-resize;\r\n}\r\n\r\n.resizer.top-right {\r\n  right: -5px;\r\n  top: -5px;\r\n  cursor: ne-resize;\r\n}\r\n\r\n.resizer.bottom-left {\r\n  bottom: -5px;\r\n  left: -5px;\r\n  cursor: ne-resize;\r\n}\r\n\r\n.resizer.top-left {\r\n  top: -5px;\r\n  left: -5px;\r\n  cursor: se-resize;\r\n}\r\n\r\n.lock-unlock-icon svg {\r\n  height: 16px;\r\n  margin-top: 38px;\r\n  cursor: pointer;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ ReactEditorKit; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./src/css/style.css
var css_style = __webpack_require__(2);

// CONCATENATED MODULE: ./src/components/SVGImages/SelectAll.jsx

function SelectAll() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M7 17V7h10v10zm2-2h6V9H9zm-2 6v-2h2v2zM3 5V3h2v2zm4 0V3h2v2zm4 16v-2h2v2zm0-16V3h2v2zm4 0V3h2v2zm0 16v-2h2v2zm4-16V3h2v2zM3 21v-2h2v2zm0-4v-2h2v2zm0-4v-2h2v2zm0-4V7h2v2zm16 12v-2h2v2zm0-4v-2h2v2zm0-4v-2h2v2zm0-4V7h2v2z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/LineHeightIcon.jsx

function LineHeightIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M6 10V5m0 0L4 7m2-2l2 2m-2 7v5m0 0l2-2m-2 2l-2-2m8-10h8m0 5h-8m0 5h8"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/ColorPickerIcon.jsx

function ColorPickerIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/BackgroundColorIcon.jsx

function BackgroundColorIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 576 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6H386.7l42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/TextColorUpperIcon.jsx

function TextColorUpperIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-1.8l18-48H303.8l18 48H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H390.2L254 52.8zM279.8 304H168.2L224 155.1 279.8 304z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/FontSizeIcon.jsx

function FontSizeIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M16 9v8h-2V9h-4V7h10v2zM8 5v12H6V5H0V3h15v2z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/FontFamilyIcon.jsx

function FontFamilyIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 15 15"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M2.5 4.5C2.5 3.099 3.599 2 5 2h7.499a.5.5 0 0 1 .001 1H8.692l-.287.855A1887.39 1887.39 0 0 1 7.343 7H8.5a.5.5 0 0 1 0 1H7.004a286.12 286.12 0 0 1-1.046 3.039c-.322.9-.75 1.447-1.29 1.739c-.505.273-1.026.272-1.384.272H3.25a.55.55 0 0 1 0-1.1c.392 0 .654-.01.894-.14c.22-.119.511-.395.778-1.142c.185-.517.532-1.527.92-2.668H4.5a.5.5 0 0 1 0-1h1.682a1350.118 1350.118 0 0 0 1.18-3.496L7.533 3H5c-.849 0-1.5.651-1.5 1.5a.5.5 0 0 1-1 0"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/HorizontalLineIcon.jsx

function HorizontalLineIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M19 13H5v-2h14z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/PrintIcon.jsx

function PrintIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M7 2a1 1 0 0 0-1 1v4H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V3a1 1 0 0 0-1-1zm10 12H7a1 1 0 0 0-1 1v2H4V9h16v8h-2v-2a1 1 0 0 0-1-1m-1-7H8V4h8zM5 10v2h3v-2zm11 6v4H8v-4z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/PreviewIcon.jsx

function PreviewIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48"
  }, /*#__PURE__*/external_react_default.a.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinejoin: "round",
    strokeWidth: "4"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M24 36c11.046 0 20-12 20-12s-8.954-12-20-12S4 24 4 24s8.954 12 20 12Z"
  }), /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z"
  })));
}
// CONCATENATED MODULE: ./src/components/SVGImages/EmptyFileIcon.jsx

function EmptyFileIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 256 256"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "m212.24 83.76l-56-56A6 6 0 0 0 152 26H56a14 14 0 0 0-14 14v176a14 14 0 0 0 14 14h144a14 14 0 0 0 14-14V88a6 6 0 0 0-1.76-4.24M158 46.48L193.52 82H158ZM200 218H56a2 2 0 0 1-2-2V40a2 2 0 0 1 2-2h90v50a6 6 0 0 0 6 6h50v122a2 2 0 0 1-2 2"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/FileUploadIcon.jsx

function FileUploadIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4.25 5A2.75 2.75 0 0 1 7 2.25h7.987a1.75 1.75 0 0 1 1.422.73l3.013 4.197c.213.298.328.655.328 1.02V19A2.75 2.75 0 0 1 17 21.75H7A2.75 2.75 0 0 1 4.25 19zM7 3.75c-.69 0-1.25.56-1.25 1.25v14c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25V8.897H15a.75.75 0 0 1-.75-.75V3.75z",
    "clip-rule": "evenodd"
  }), /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M15.086 13.219a.75.75 0 0 1-1.055.117l-1.28-1.026v3.44a.75.75 0 0 1-1.5 0v-3.44l-1.282 1.026a.75.75 0 0 1-.937-1.172l2.497-1.998a.747.747 0 0 1 .465-.166h.008c.18 0 .344.064.473.17l2.494 1.994a.75.75 0 0 1 .117 1.055"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/FullscreenExit.jsx

function FullscreenExit() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M18 7h4v2h-6V3h2zM8 9H2V7h4V3h2zm10 8v4h-2v-6h6v2zM8 15v6H6v-4H2v-2z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/FullscreenIcon.jsx

function FullscreenIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M7 14H5v5h5v-2H7zm-2-4h2V7h3V5H5zm12 7h-3v2h5v-5h-2zM14 5v2h3v3h2V5z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/SpecialCharIcon.jsx

function SpecialCharIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M12 5Q9.546 5 7.83 6.715q-1.715 1.716-1.715 4.17q0 1.844 1.037 3.352q1.036 1.507 2.77 2.15q.388.165.637.475q.249.311.249.711v1.215q0 .51-.351.861t-.86.351H5q-.413 0-.707-.293Q4 19.413 4 19t.293-.707Q4.587 18 5 18h3.615q-2.08-.99-3.29-2.904q-1.21-1.913-1.21-4.211q0-3.281 2.302-5.583T12 3q3.28 0 5.583 2.302t2.302 5.583q0 2.298-1.21 4.211q-1.21 1.914-3.29 2.904H19q.413 0 .707.293q.293.294.293.707t-.293.707Q19.413 20 19 20h-4.596q-.51 0-.86-.351q-.352-.35-.352-.86v-1.216q0-.4.25-.71q.248-.311.637-.476q1.733-.643 2.77-2.15q1.036-1.508 1.036-3.352q0-2.454-1.716-4.17Q14.454 5 12 5"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/CrossImage.jsx

function CrossImage() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
    d: "m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/BlockQuote.jsx

function BlockQuote() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M5.315 3.401c-1.61 0-2.916 1.343-2.916 3c0 1.656 1.306 3 2.916 3c2.915 0 .972 5.799-2.916 5.799v1.4c6.939.001 9.658-13.199 2.916-13.199m8.4 0c-1.609 0-2.915 1.343-2.915 3c0 1.656 1.306 3 2.915 3c2.916 0 .973 5.799-2.915 5.799v1.4c6.938.001 9.657-13.199 2.915-13.199"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/LTRIcon.jsx

function LTRIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1.17em",
    height: "1em",
    viewBox: "0 0 14 12"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M9 2v9a1 1 0 0 1-2 0V6H6a3 3 0 1 1 0-6h7a1 1 0 0 1 0 2h-1v9a1 1 0 0 1-2 0V2zM1.657 9L.284 10.36a.955.955 0 0 0 0 1.358a.977.977 0 0 0 1.373 0L3.716 9.68a.955.955 0 0 0 0-1.36l-2.06-2.038a.977.977 0 0 0-1.372 0a.955.955 0 0 0 0 1.359zM7 2H6a1 1 0 1 0 0 2h1z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/RTLIcon.jsx

function RTLIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1.17em",
    height: "1em",
    viewBox: "0 0 14 12"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M6.007 2v9a1 1 0 0 1-2.002 0V6H3.004A3.002 3.002 0 0 1 0 3c0-1.657 1.345-3 3.004-3h7.008a1 1 0 1 1 0 2h-1v9a1 1 0 0 1-2.003 0V2zm6.284 6.877l1.416 1.414a1 1 0 0 1 0 1.414c-.391.39-1.025.39-1.416 0l-2.124-2.121a1 1 0 0 1 0-1.415l2.124-2.12a1.002 1.002 0 0 1 1.416 0a1 1 0 0 1 0 1.413L12.29 8.877ZM4.005 2H3.004a1 1 0 1 0 0 2h1V2Z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/OrderdList.jsx

function OrderdList() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/UnorderdList.jsx

function UnorderdList() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M64 144a48 48 0 1 0 0-96a48 48 0 1 0 0 96m128-80c-17.7 0-32 14.3-32 32s14.3 32 32 32h288c17.7 0 32-14.3 32-32s-14.3-32-32-32zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32h288c17.7 0 32-14.3 32-32s-14.3-32-32-32zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32h288c17.7 0 32-14.3 32-32s-14.3-32-32-32zM64 464a48 48 0 1 0 0-96a48 48 0 1 0 0 96m48-208a48 48 0 1 0-96 0a48 48 0 1 0 96 0"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/BgColorIcon.jsx

function BgColorIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M16.56 8.94L7.62 0L6.21 1.41l2.38 2.38l-5.15 5.15a1.49 1.49 0 0 0 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12M5.21 10L10 5.21L14.79 10zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5M2 20h20v4H2z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/TextColorIcon.jsx

function TextColorIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M2 20h20v4H2zm3.49-3h2.42l1.27-3.58h5.65L16.09 17h2.42L13.25 3h-2.5zm4.42-5.61l2.03-5.79h.12l2.03 5.79z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/UnderlineIcon.jsx

function UnderlineIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M16 64c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H128V224c0 53 43 96 96 96s96-43 96-96V96H304c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H384V224c0 88.4-71.6 160-160 160s-160-71.6-160-160V96H48C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/ClearFormatting.jsx

function ClearFormatting() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L355.7 253.5 400.2 96H503L497 120.2c-4.3 17.1 6.1 34.5 23.3 38.8s34.5-6.1 38.8-23.3l11-44.1C577.6 61.3 554.7 32 523.5 32H376.1h-.3H204.5c-22 0-41.2 15-46.6 36.4l-6.3 25.2L38.8 5.1zm168 131.7c.1-.3 .2-.7 .3-1L217 96H333.7L301.3 210.8l-94.5-74.1zM327.3 353.9L272.9 311 243.3 416H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H309.8l17.6-62.1z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/SuperscriptIcon.jsx

function SuperscriptIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M480 32c0-11.1-5.7-21.4-15.2-27.2s-21.2-6.4-31.1-1.4l-32 16c-15.8 7.9-22.2 27.1-14.3 42.9C393 73.5 404.3 80 416 80v80c-17.7 0-32 14.3-32 32s14.3 32 32 32h32 32c17.7 0 32-14.3 32-32s-14.3-32-32-32V32zM32 64C14.3 64 0 78.3 0 96s14.3 32 32 32H47.3l89.6 128L47.3 384H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64c10.4 0 20.2-5.1 26.2-13.6L176 311.8l85.8 122.6c6 8.6 15.8 13.6 26.2 13.6h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H304.7L215.1 256l89.6-128H320c17.7 0 32-14.3 32-32s-14.3-32-32-32H288c-10.4 0-20.2 5.1-26.2 13.6L176 200.2 90.2 77.6C84.2 69.1 74.4 64 64 64H32z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/SubscriptIcon.jsx

function SubscriptIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32H47.3l89.6 128L47.3 384H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64c10.4 0 20.2-5.1 26.2-13.6L176 311.8l85.8 122.6c6 8.6 15.8 13.6 26.2 13.6h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H304.7L215.1 256l89.6-128H320c17.7 0 32-14.3 32-32s-14.3-32-32-32H288c-10.4 0-20.2 5.1-26.2 13.6L176 200.2 90.2 77.6C84.2 69.1 74.4 64 64 64H32zM480 320c0-11.1-5.7-21.4-15.2-27.2s-21.2-6.4-31.1-1.4l-32 16c-15.8 7.9-22.2 27.1-14.3 42.9C393 361.5 404.3 368 416 368v80c-17.7 0-32 14.3-32 32s14.3 32 32 32h32 32c17.7 0 32-14.3 32-32s-14.3-32-32-32V320z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/RedoIcon.jsx

function RedoIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/UndoIcon.jsx

function UndoIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/LinkIcon.jsx

function LinkIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/ItalicIcon.jsx

function ItalicIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 384 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/DecreaseIndentIcon.jsx

function DecreaseIndentIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M1 1h18v2H1zm6 8h12v2H7zm-6 8h18v2H1zM7 5h12v2H7zm0 8h12v2H7zM5 6v8l-4-4z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/IncreaseIndentIcon.jsx

function IncreaseIndentIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M1 1h18v2H1zm6 8h12v2H7zm-6 8h18v2H1zM7 5h12v2H7zm0 8h12v2H7zM1 6l4 4l-4 4z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/ImageIcon.jsx

function ImageIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3M5 18a1 1 0 0 1-1-1v-2.42l3.3-3.29a1 1 0 0 1 1.4 0L15.41 18Zm15-1a1 1 0 0 1-1 1h-.77l-3.81-3.83l.88-.88a1 1 0 0 1 1.4 0l3.3 3.29Zm0-3.24l-1.88-1.87a3.06 3.06 0 0 0-4.24 0l-.88.88l-2.88-2.88a3.06 3.06 0 0 0-4.24 0L4 11.76V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/VideoIcon.jsx

function VideoIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
    d: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/BoldIcon.jsx

function BoldIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 384 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/CodeIcon.jsx

function CodeIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6l6 6zm5.2 0l4.6-4.6l-4.6-4.6L16 6l6 6l-6 6z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/AlignRight.jsx

function AlignRight() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M448 64c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/AlignJustify.jsx

function AlignJustify() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/AlignCenter.jsx

function AlignCenter() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/AlignLeft.jsx

function AlignLeft() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/RemoveLinkIcon.jsx

function RemoveLinkIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L489.3 358.2l90.5-90.5c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114l-96 96-31.9-25C430.9 239.6 420.1 175.1 377 132c-52.2-52.3-134.5-56.2-191.3-11.7L38.8 5.1zM239 162c30.1-14.9 67.7-9.9 92.8 15.3c20 20 27.5 48.3 21.7 74.5L239 162zM116.6 187.9L60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5l61.8-61.8-50.6-39.9zM220.9 270c-2.1 39.8 12.2 80.1 42.2 110c38.9 38.9 94.4 51 143.6 36.3L220.9 270z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/UnlockIcon.jsx

function UnlockIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H144V144z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/LockIcon.jsx

function LockIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/loader.gif
/* harmony default export */ var loader = ("data:image/gif;base64,R0lGODlhngHpANUrAJycnPLy8tjY2AAAANTU1Pb29sTExMrKysLCwtbW1ru7u/j4+Ojo6LKysu7u7tzc3Ly8vNDQ0BEREbCwsL6+vqqqqiIiIs7OzuDg4KampkRERDMzM7i4uMzMzIiIiHd3d8jIyN3d3WZmZlVVVfT09OTk5JmZmcbGxqCgoOzs7JaWlv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc0MEVDNDE3NTBFNDExRTE5OTAzODVFNEI4NUU1MDAzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc0MEVDNDE4NTBFNDExRTE5OTAzODVFNEI4NUU1MDAzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzQwRUM0MTU1MEU0MTFFMTk5MDM4NUU0Qjg1RTUwMDMiIHN0UmVmOmRv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");
// CONCATENATED MODULE: ./src/components/index.js













































// CONCATENATED MODULE: ./src/components/SpecialChars.jsx

function SpecialChars(_ref) {
  var handleCharSelect = _ref.handleCharSelect;
  var specialCharacters = ["★", "❤", "☀", "✈", "♪", "✔", "⇧", "⇩", "♠", "♣", "♥", "♦", "♪", "♫", "☎", "✉", "☂", "☔", "☕", "⚓", "⚡", "⚠", "⚽", "⚾", "✂", "✏", "✒", "✨", "❄", "❅", "❆", "❇", "❈", "❉", "❊", "❋", "❌", "❍", "❎", "❏", "❐", "❑", "❒", "⚪", "⚫", "◆", "◇", "◈", "◉", "◊", "○", "◌", "◍", "◎", "●", "◐", "◑", "◒", "◓", "◔", "◕", "◖", "◗", "◘", "◙", "◚", "◛", "◜", "◝", "◞", "◟", "◠", "◡", "◢", "◣", "◤", "◥", "◦", "◧", "◨", "◩", "◪", "◫", "◬", "◭", "◮", "◯", "❘", "❙", "❚", "❛", "❜", "❝", "❞", "❟", "❠", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅", "⚆", "⚇", "⚈", "⚉", "⚘", "⚙", "⚚", "⚛", "⚜", "⚝", "€", "¥", "£", "₪", "₩", "₱", "₲", "₳", "₴", "₵", "₦", "₭", "₮", "₯", "₨", "₰", "&", "<", ">", '"', "'", "¢", "£", "¥", "€", "©", "®", "™", "§", "×", "÷"
  // Add more special characters as needed
  ];
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "special-char-box"
  }, specialCharacters.map(function (_char, index) {
    return /*#__PURE__*/external_react_default.a.createElement("div", {
      key: "key".concat(index),
      onClick: function onClick(e) {
        return handleCharSelect(e, _char);
      },
      className: "special-char"
    }, _char);
  }));
}
// CONCATENATED MODULE: ./src/components/SelectFormat.jsx
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

function SelectFormat(_ref) {
  var remove_from_toolbar = _ref.remove_from_toolbar,
    editorRef = _ref.editorRef;
  var _useState = Object(external_react_["useState"])(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var _useState3 = Object(external_react_["useState"])("Paragraph"),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedOption = _useState4[0],
    setSelectedOption = _useState4[1];
  var selectRef = Object(external_react_["useRef"])(null);
  var formats = [{
    label: "Paragraph",
    value: "p"
  }, {
    label: "Heading 1",
    value: "h1"
  }, {
    label: "Heading 2",
    value: "h2"
  }, {
    label: "Heading 3",
    value: "h3"
  }, {
    label: "Heading 4",
    value: "h4"
  }, {
    label: "Heading 5",
    value: "h5"
  }, {
    label: "Heading 6",
    value: "h6"
  }, {
    label: "Blockquote",
    value: "blockquote"
  }, {
    label: "Preformatted",
    value: "pre"
  }];
  if ((remove_from_toolbar === null || remove_from_toolbar === void 0 ? void 0 : remove_from_toolbar.length) > 0) {
    var _find_remove$options;
    var find_remove = remove_from_toolbar.find(function (toolbar) {
      return toolbar.name === "format";
    });
    if ((find_remove === null || find_remove === void 0 ? void 0 : (_find_remove$options = find_remove.options) === null || _find_remove$options === void 0 ? void 0 : _find_remove$options.length) > 0) {
      formats = formats.filter(function (item) {
        return !(find_remove !== null && find_remove !== void 0 && find_remove.options.includes(item.value));
      });
    }
  }
  var toggleSelect = function toggleSelect(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  var handleOptionClick = function handleOptionClick(e, option) {
    e.preventDefault();
    editorRef.current.focus();
    document.execCommand("formatBlock", false, option.value);
    setSelectedOption(option.label);
    setIsOpen(false);
  };
  var getClosestBlockElement = function getClosestBlockElement() {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      var range = selection.getRangeAt(0);
      var commonAncestorContainer = range.commonAncestorContainer;
      var node = commonAncestorContainer;
      while (node) {
        if (node.nodeName.match(/^(p|div|h[1-6]|blockquote|pre)$/i)) {
          return node.nodeName.toLowerCase();
        }
        node = node.parentNode;
      }
    }
    return null;
  };
  var handleKeyDown = function handleKeyDown() {
    var editor = editorRef.current;
    if (!editor) return;
    if (!editor.contains(window.getSelection().anchorNode)) {
      return;
    }
    editor.focus();
    if (editor.innerText.trim() === "") {
      setSelectedOption("Paragraph");
    }
  };
  Object(external_react_["useEffect"])(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (!selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    var handleSelectionChange = function handleSelectionChange() {
      var _editorRef$current;
      if (editorRef !== null && editorRef !== void 0 && (_editorRef$current = editorRef.current) !== null && _editorRef$current !== void 0 && _editorRef$current.contains(window.getSelection().anchorNode)) {
        var formatBlock = getClosestBlockElement();
        if (formatBlock) {
          var find = formats.find(function (format) {
            return format.value === formatBlock;
          });
          if (find) {
            setSelectedOption(find.label);
          } else {
            setSelectedOption("Paragraph");
          }
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("keydown", handleKeyDown);
    return function () {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editorRef]);
  return /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "custom-select-format",
    onClick: toggleSelect,
    ref: selectRef,
    style: {
      minWidth: "120px"
    }
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-selected"
  }, selectedOption), isOpen && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-items-format"
  }, formats.map(function (option, index) {
    return /*#__PURE__*/external_react_default.a.createElement("div", {
      key: "key".concat(index),
      onClick: function onClick(e) {
        return handleOptionClick(e, option);
      },
      className: "select-option"
    }, /*#__PURE__*/external_react_default.a.createElement(option.value, null, option.label));
  })));
}
/* harmony default export */ var components_SelectFormat = (SelectFormat);
// CONCATENATED MODULE: ./src/components/ButtonFunction.jsx
function ButtonFunction_slicedToArray(r, e) { return ButtonFunction_arrayWithHoles(r) || ButtonFunction_iterableToArrayLimit(r, e) || ButtonFunction_unsupportedIterableToArray(r, e) || ButtonFunction_nonIterableRest(); }
function ButtonFunction_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function ButtonFunction_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return ButtonFunction_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ButtonFunction_arrayLikeToArray(r, a) : void 0; } }
function ButtonFunction_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ButtonFunction_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function ButtonFunction_arrayWithHoles(r) { if (Array.isArray(r)) return r; }

var ButtonFunction_ButtonFunction = function ButtonFunction(props) {
  var name = props.name,
    icon = props.icon,
    title = props.title,
    item = props.item,
    disabled = props.disabled,
    editorRef = props.editorRef;
  var _useState = Object(external_react_["useState"])(false),
    _useState2 = ButtonFunction_slicedToArray(_useState, 2),
    isSelected = _useState2[0],
    setIsSelected = _useState2[1];
  var _useState3 = Object(external_react_["useState"])(true),
    _useState4 = ButtonFunction_slicedToArray(_useState3, 2),
    isDisabled = _useState4[0],
    setIsDisabled = _useState4[1];
  var handleClick = function handleClick(e, ref) {
    e.preventDefault();
    ref.current.focus();
    if (!ref.current) return;
    if (!ref.current.contains(window.getSelection().anchorNode)) {
      return;
    }
    if (item !== null && item !== void 0 && item.handleClick) {
      item.handleClick(item);
      if (!item.add_functionality) return;
    }
    setIsSelected(!isSelected);
    document.execCommand(name);
  };
  Object(external_react_["useEffect"])(function () {
    var handleSelectionChange = function handleSelectionChange() {
      var _editorRef$current;
      if (!(editorRef !== null && editorRef !== void 0 && (_editorRef$current = editorRef.current) !== null && _editorRef$current !== void 0 && _editorRef$current.contains(window.getSelection().anchorNode))) {
        return;
      }
      var is_selected = document.queryCommandState(name);
      var isRedoEnabled = document.queryCommandEnabled(name);
      setIsDisabled(!isRedoEnabled);
      setIsSelected(is_selected);
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("input", handleSelectionChange);
    return function () {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("input", handleSelectionChange);
    };
  }, [editorRef, name]);
  var handleClasses = function handleClasses() {
    var className = "";
    if (isSelected) {
      className = "selected-option";
    }
    if (name === "redo" || name === "undo") {
      if (isDisabled) {
        className += " disabled";
      }
    }
    return className.trim();
  };
  return /*#__PURE__*/external_react_default.a.createElement("button", {
    onClick: function onClick(e) {
      return handleClick(e, editorRef);
    },
    className: handleClasses(),
    title: item !== null && item !== void 0 && item.title ? item.title : title,
    disabled: disabled
  }, item !== null && item !== void 0 && item.icon ? item.icon : icon);
};
/* harmony default export */ var components_ButtonFunction = (ButtonFunction_ButtonFunction);
// CONCATENATED MODULE: ./src/components/constant.js
var TOOLBAR_ITEMS = ["undo", "redo", "|", "format", "|", "bold", "italic", "underline", "superscript", "subscript", "|", "alignLeft", "alignCenter", "alignRight", "alignJustify", "|", "indent", "outdent", "|", "orderedList", "unorderedList", "|", "removeFormat", "|", "textColor", "backgroundColor", "|", "ltr", "rtl", "|"];
var NAVBAR_ITEMS = ["file", "view", "insert", "format", "|", "select_all", "|", "image", "link", "video", "|", "copy", "cut", "paste", "|"];
var FORMAT_OPTIONS = ["bold", "italic", "underline", "superscript", "subscript", "font", "font_size", "alignment"];
var INSER_OPTIONS = ["image", "link", "video", "hr_line", "special_char"];
var FILE_OPTIONS = ["new_document", "preview", "print"];
var VIEW_OPTIONS = ["source_code", "full_screen"];
function generateRandomID(length) {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var id = "";
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
}
function transformHTML(htmlString) {
  var parser = new DOMParser();
  if (htmlString) {
    var doc = parser.parseFromString(htmlString, "text/html");
    doc.querySelectorAll("div").forEach(function (divElement) {
      var pElement = doc.createElement("p");
      pElement.innerHTML = divElement.innerHTML;
      divElement.replaceWith(pElement);
    });
    var transformedHTML = doc.body.innerHTML;
    transformedHTML = transformedHTML.replace(/<br\s*\/?>/g, "&nbsp;");
    transformedHTML = transformedHTML.replace(/<(?=[^/])/g, function (match) {
      return "\n".concat(match);
    });
    transformedHTML = transformedHTML.trim();
    return transformedHTML;
  }
}
var remove_resizer = function remove_resizer() {
  var element = document.querySelector(".resize-image-wrapper");
  var image_element = document.querySelector(".resizer-image");
  if (element && image_element) {
    element.insertAdjacentElement("afterend", image_element);
    element.parentNode.removeChild(element);
  }
};
// CONCATENATED MODULE: ./src/components/SelectInsert.jsx
function SelectInsert_slicedToArray(r, e) { return SelectInsert_arrayWithHoles(r) || SelectInsert_iterableToArrayLimit(r, e) || SelectInsert_unsupportedIterableToArray(r, e) || SelectInsert_nonIterableRest(); }
function SelectInsert_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function SelectInsert_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return SelectInsert_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? SelectInsert_arrayLikeToArray(r, a) : void 0; } }
function SelectInsert_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function SelectInsert_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function SelectInsert_arrayWithHoles(r) { if (Array.isArray(r)) return r; }



function SelectFileOptions(props) {
  var _options;
  var onSelectOption = props.onSelectOption,
    handleInsertHR = props.handleInsertHR,
    item = props.item,
    remove_from_navbar = props.remove_from_navbar;
  var options = item.options;
  if (!options) {
    options = INSER_OPTIONS;
  }
  var _useState = Object(external_react_["useState"])(false),
    _useState2 = SelectInsert_slicedToArray(_useState, 2),
    isShow = _useState2[0],
    setIsShow = _useState2[1];
  var handleSelect = function handleSelect(e, type) {
    e.preventDefault();
    setIsShow(false);
    if (type === "hr_line") {
      handleInsertHR(e);
    } else {
      onSelectOption(e, type);
    }
  };
  if ((remove_from_navbar === null || remove_from_navbar === void 0 ? void 0 : remove_from_navbar.length) > 0) {
    var _find_remove$options;
    var find_remove = remove_from_navbar.find(function (toolbar) {
      return toolbar.name === "insert";
    });
    if ((find_remove === null || find_remove === void 0 ? void 0 : (_find_remove$options = find_remove.options) === null || _find_remove$options === void 0 ? void 0 : _find_remove$options.length) > 0) {
      options = options.filter(function (item) {
        return !(find_remove !== null && find_remove !== void 0 && find_remove.options.includes(item));
      });
    }
  }
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "custom-select",
    onMouseEnter: function onMouseEnter() {
      return setIsShow(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsShow(false);
    }
  }, item !== null && item !== void 0 && item.title ? item.title : "Insert", /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-items ".concat(isShow ? "show" : "")
  }, ((_options = options) === null || _options === void 0 ? void 0 : _options.length) > 0 && options.map(function (option, index) {
    var is_image = option === "image" || option.name === "image";
    var is_link = option === "link" || option.name === "link";
    var is_video = option === "video" || option.name === "video";
    var is_hr_line = option === "hr_line" || option.name === "hr_line";
    var is_special_char = option === "special_char" || option.name === "special_char";
    return /*#__PURE__*/external_react_default.a.createElement("div", {
      key: "key".concat(index)
    }, is_image && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleSelect(e, "image");
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(ImageIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Image")), is_link && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleSelect(e, "link");
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(LinkIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Link")), is_video && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleSelect(e, "video");
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(VideoIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Video")), is_hr_line && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleSelect(e, "hr_line");
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(HorizontalLineIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Horizontal Line")), is_special_char && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleSelect(e, "special_char");
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(SpecialCharIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Special Char")));
  })));
}
// CONCATENATED MODULE: ./src/components/SelectView.jsx
function SelectView_slicedToArray(r, e) { return SelectView_arrayWithHoles(r) || SelectView_iterableToArrayLimit(r, e) || SelectView_unsupportedIterableToArray(r, e) || SelectView_nonIterableRest(); }
function SelectView_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function SelectView_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return SelectView_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? SelectView_arrayLikeToArray(r, a) : void 0; } }
function SelectView_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function SelectView_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function SelectView_arrayWithHoles(r) { if (Array.isArray(r)) return r; }



function SelectView_SelectFileOptions(props) {
  var handleViewSource = props.handleViewSource,
    isFullScreen = props.isFullScreen,
    toggleFullScreen = props.toggleFullScreen,
    item = props.item,
    isPlaceholder = props.isPlaceholder,
    placeholder = props.placeholder,
    value = props.value,
    remove_from_navbar = props.remove_from_navbar;
  var options = item.options;
  var _useState = Object(external_react_["useState"])(false),
    _useState2 = SelectView_slicedToArray(_useState, 2),
    isShow = _useState2[0],
    setIsShow = _useState2[1];
  var handleSelect = function handleSelect(e, type, option) {
    e.preventDefault();
    setIsShow(false);
    if (option !== null && option !== void 0 && option.handleClick) {
      option.handleClick(option, item);
      if (!option.add_functionality) return;
    }
    if (type === "code") {
      handleViewSource();
    } else if (type === "screen") {
      toggleFullScreen();
    }
  };
  if (!options) {
    options = VIEW_OPTIONS;
  }
  if ((remove_from_navbar === null || remove_from_navbar === void 0 ? void 0 : remove_from_navbar.length) > 0) {
    var _find_remove$options;
    var find_remove = remove_from_navbar.find(function (toolbar) {
      return toolbar.name === "view";
    });
    if ((find_remove === null || find_remove === void 0 ? void 0 : (_find_remove$options = find_remove.options) === null || _find_remove$options === void 0 ? void 0 : _find_remove$options.length) > 0) {
      options = options.filter(function (item) {
        return !(find_remove !== null && find_remove !== void 0 && find_remove.options.includes(item));
      });
    }
  }
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "custom-select",
    onMouseEnter: function onMouseEnter() {
      return setIsShow(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsShow(false);
    }
  }, item !== null && item !== void 0 && item.title ? item.title : "View", /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-items ".concat(isShow ? "show" : "")
  }, options.map(function (option, index) {
    var is_source_code = option === "source_code" || option.name === "source_code";
    var is_full_screen = option === "full_screen" || option.name === "full_screen";
    return /*#__PURE__*/external_react_default.a.createElement("div", {
      key: "key".concat(index)
    }, is_source_code && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleSelect(e, "code", option);
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(CodeIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Source Code")), is_full_screen && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleSelect(e, "screen", option);
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : isFullScreen ? /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, /*#__PURE__*/external_react_default.a.createElement(FullscreenExit, null), " ", /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Exit Full Screen")) : /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, /*#__PURE__*/external_react_default.a.createElement(FullscreenIcon, null), " ", /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Full Screen"))));
  })));
}
// CONCATENATED MODULE: ./src/components/SelectFileOptions.jsx
function SelectFileOptions_slicedToArray(r, e) { return SelectFileOptions_arrayWithHoles(r) || SelectFileOptions_iterableToArrayLimit(r, e) || SelectFileOptions_unsupportedIterableToArray(r, e) || SelectFileOptions_nonIterableRest(); }
function SelectFileOptions_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function SelectFileOptions_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return SelectFileOptions_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? SelectFileOptions_arrayLikeToArray(r, a) : void 0; } }
function SelectFileOptions_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function SelectFileOptions_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function SelectFileOptions_arrayWithHoles(r) { if (Array.isArray(r)) return r; }



function SelectFileOptions_SelectFileOptions(props) {
  var handleNewDocument = props.handleNewDocument,
    handlePreview = props.handlePreview,
    handlePrint = props.handlePrint,
    item = props.item,
    remove_from_navbar = props.remove_from_navbar;
  var options = item.options;
  var _useState = Object(external_react_["useState"])(false),
    _useState2 = SelectFileOptions_slicedToArray(_useState, 2),
    isShow = _useState2[0],
    setIsShow = _useState2[1];
  var handleSelect = function handleSelect(e, type, option) {
    e.preventDefault();
    setIsShow(false);
    if (option !== null && option !== void 0 && option.handleClick) {
      option.handleClick(option, item);
      if (!option.add_functionality) return;
    }
    if (type === "new_document") {
      handleNewDocument();
    } else if (type === "preview") {
      handlePreview();
    } else if (type === "print") {
      setTimeout(function () {
        handlePrint();
      }, 1);
    } else {
      // handleViewSource();
    }
  };
  if (!options) {
    options = FILE_OPTIONS;
  }
  if ((remove_from_navbar === null || remove_from_navbar === void 0 ? void 0 : remove_from_navbar.length) > 0) {
    var _find_remove$options;
    var find_remove = remove_from_navbar.find(function (toolbar) {
      return toolbar.name === "file";
    });
    if ((find_remove === null || find_remove === void 0 ? void 0 : (_find_remove$options = find_remove.options) === null || _find_remove$options === void 0 ? void 0 : _find_remove$options.length) > 0) {
      options = options.filter(function (item) {
        return !(find_remove !== null && find_remove !== void 0 && find_remove.options.includes(item));
      });
    }
  }
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "custom-select",
    onMouseEnter: function onMouseEnter() {
      return setIsShow(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsShow(false);
    }
  }, item !== null && item !== void 0 && item.title ? item.title : "File", /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-items ".concat(isShow ? "show" : "")
  }, options.map(function (option, index) {
    var is_new_document = option === "new_document" || option.name === "new_document";
    var is_preview = option === "preview" || option.name === "preview";
    var is_print = option === "print" || option.name === "print";
    var is_upload_file = option === "upload_file" || option.name === "upload_file";
    return /*#__PURE__*/external_react_default.a.createElement("div", {
      key: "key".concat(index)
    }, is_new_document && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleSelect(e, "new_document", option);
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(EmptyFileIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "New Document")), is_preview && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleSelect(e, "preview", option);
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(PreviewIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Preview")), is_print && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleSelect(e, "print", option);
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(PrintIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Print")));
  })));
}
// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(1);
var external_react_dom_default = /*#__PURE__*/__webpack_require__.n(external_react_dom_);

// CONCATENATED MODULE: ./src/components/Model.jsx



var Model_Modal = function Modal(props) {
  var onClose = props.onClose,
    children = props.children,
    title = props.title,
    className = props.className,
    isFullScreen = props.isFullScreen;
  return /*#__PURE__*/external_react_dom_default.a.createPortal( /*#__PURE__*/external_react_default.a.createElement("div", {
    onClick: onClose,
    className: "modal-overlay  ".concat(isFullScreen ? "fill-screen-view" : "")
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "modal-popup ".concat(className ? className : ""),
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, !isFullScreen && /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "model-title"
  }, /*#__PURE__*/external_react_default.a.createElement("h2", null, title), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "cross",
    onClick: onClose
  }, /*#__PURE__*/external_react_default.a.createElement(CrossImage, null))), /*#__PURE__*/external_react_default.a.createElement("hr", null)), children)), document.getElementById("modal-root"));
};
/* harmony default export */ var Model = (Model_Modal);
// CONCATENATED MODULE: ./src/components/ViewSourceModel.jsx


function ViewSourceModal(props) {
  var viewSource = props.viewSource,
    setViewSource = props.setViewSource,
    sourceCode = props.sourceCode,
    setSourceCode = props.setSourceCode,
    handleSaveSource = props.handleSaveSource;
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "ml-main-content-box"
  }, /*#__PURE__*/external_react_default.a.createElement(Model, {
    isOpen: viewSource,
    onClose: function onClose() {
      return setViewSource(false);
    },
    title: "Source Code",
    className: "full-screen-model"
  }, /*#__PURE__*/external_react_default.a.createElement("textarea", {
    className: "wysiwyg-editor__source",
    value: sourceCode,
    onChange: function onChange(e) {
      return setSourceCode(e.target.value);
    }
  }), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-text-end"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "save-button",
    onClick: handleSaveSource
  }, "Save"))));
}
// CONCATENATED MODULE: ./src/components/PreviewModel.jsx


function PreviewModel(props) {
  var openPreview = props.openPreview,
    setOpenPreview = props.setOpenPreview,
    previewContent = props.previewContent;
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "ml-main-content-box"
  }, /*#__PURE__*/external_react_default.a.createElement(Model, {
    isOpen: openPreview,
    onClose: function onClose() {
      return setOpenPreview(false);
    },
    title: "Preview",
    className: "full-screen-model"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10",
    dangerouslySetInnerHTML: {
      __html: previewContent
    }
  })));
}
// CONCATENATED MODULE: ./src/components/SelectFamily.jsx

function SelectFamily(_ref) {
  var handleHideChildOptions = _ref.handleHideChildOptions;
  var fontFamilies = [{
    name: "Arial",
    style: "Arial, sans-serif"
  }, {
    name: "Helvetica",
    style: "Helvetica, sans-serif"
  }, {
    name: "Times New Roman",
    style: "Times New Roman, serif"
  }, {
    name: "Courier New",
    style: "Courier New, monospace"
  }, {
    name: "Courier",
    style: "Courier, monospace"
  }, {
    name: "Verdana",
    style: "Verdana, sans-serif"
  }, {
    name: "Georgia",
    style: "Georgia, serif"
  }, {
    name: "Palatino",
    style: "Palatino, serif"
  }, {
    name: "Garamond",
    style: "Garamond, serif"
  }, {
    name: "Bookman",
    style: "Bookman, serif"
  }, {
    name: "Comic Sans MS",
    style: "Comic Sans MS, sans-serif"
  }, {
    name: "Trebuchet MS",
    style: "Trebuchet MS, sans-serif"
  }, {
    name: "Arial Black",
    style: "Arial Black, sans-serif"
  }, {
    name: "Impact",
    style: "Impact, sans-serif"
  }, {
    name: "Roboto",
    style: "Roboto, sans-serif"
  }, {
    name: "Open Sans",
    style: "Open Sans, sans-serif"
  }, {
    name: "Lato",
    style: "Lato, sans-serif"
  }, {
    name: "Montserrat",
    style: "Montserrat, sans-serif"
  }, {
    name: "Roboto Condensed",
    style: "Roboto Condensed, sans-serif"
  }, {
    name: "Oswald",
    style: "Oswald, sans-serif"
  }, {
    name: "Raleway",
    style: "Raleway, sans-serif"
  }, {
    name: "Noto Sans",
    style: "Noto Sans, sans-serif"
  }, {
    name: "Poppins",
    style: "Poppins, sans-serif"
  }, {
    name: "Ubuntu",
    style: "Ubuntu, sans-serif"
  }, {
    name: "Source Sans Pro",
    style: "Source Sans Pro, sans-serif"
  }
  // Add more font families as needed
  ];
  var handleOptionClick = function handleOptionClick(e, option) {
    e.preventDefault();
    var selection = window.getSelection();
    if (!selection.isCollapsed) {
      document.execCommand("styleWithCSS", false, true);
      document.execCommand("fontName", false, option.style);
    }
    handleHideChildOptions();
  };
  return /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, fontFamilies.map(function (option, index) {
    return /*#__PURE__*/external_react_default.a.createElement("button", {
      key: "key".concat(index),
      style: {
        fontFamily: option.style
      },
      className: "font-family-option",
      onClick: function onClick(e) {
        return handleOptionClick(e, option);
      }
    }, option.name);
  }));
}
/* harmony default export */ var components_SelectFamily = (SelectFamily);
// CONCATENATED MODULE: ./src/components/SelectFontSize.jsx

function SelectFontSize(_ref) {
  var handleHideChildOptions = _ref.handleHideChildOptions;
  var fontSizes = ["10", "12", "14", "16", "18", "20", "24", "28", "32", "36", "48", "60", "72"];
  var handleOptionClick = function handleOptionClick(e, option) {
    e.preventDefault();
    var selection = window.getSelection();
    if (!selection.isCollapsed) {
      document.execCommand("styleWithCSS", false, true);
      document.execCommand("fontSize", false, "1"); // Reset font size to default
      var range = selection.getRangeAt(0);
      var span = document.createElement("span");
      span.style.fontSize = option + "px";
      range.surroundContents(span);
    }
    handleHideChildOptions();
  };
  return /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, fontSizes.map(function (option, index) {
    return /*#__PURE__*/external_react_default.a.createElement("button", {
      key: "key".concat(index),
      onClick: function onClick(e) {
        return handleOptionClick(e, option);
      },
      className: "select-option"
    }, "".concat(option, "px"));
  }));
}
/* harmony default export */ var components_SelectFontSize = (SelectFontSize);
// CONCATENATED MODULE: ./src/components/SelectAlignment.jsx


function SelectAlignment(_ref) {
  var handleHideChildOptions = _ref.handleHideChildOptions;
  var alignments = [{
    title: "Left",
    icon: /*#__PURE__*/external_react_default.a.createElement(AlignLeft, null),
    type: "justifyLeft"
  }, {
    title: "Center",
    icon: /*#__PURE__*/external_react_default.a.createElement(AlignCenter, null),
    type: "justifyCenter"
  }, {
    title: "Right",
    icon: /*#__PURE__*/external_react_default.a.createElement(AlignRight, null),
    type: "justifyRight"
  }, {
    title: "Justify",
    icon: /*#__PURE__*/external_react_default.a.createElement(AlignJustify, null),
    type: "justifyFull"
  }];
  var handleOptionClick = function handleOptionClick(e, option) {
    e.preventDefault();
    document.execCommand(option.type);
    handleHideChildOptions();
  };
  return /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, alignments.map(function (option, index) {
    return /*#__PURE__*/external_react_default.a.createElement("button", {
      key: "key".concat(index),
      onClick: function onClick(e) {
        return handleOptionClick(e, option);
      },
      className: "select-option react-editor-text-left"
    }, /*#__PURE__*/external_react_default.a.createElement("span", {
      className: "react-editor-me-5"
    }, option.icon), option.title);
  }));
}
/* harmony default export */ var components_SelectAlignment = (SelectAlignment);
// CONCATENATED MODULE: ./src/components/SelectLineHeight.jsx
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || SelectLineHeight_unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function SelectLineHeight_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return SelectLineHeight_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? SelectLineHeight_arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return SelectLineHeight_arrayLikeToArray(r); }
function SelectLineHeight_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

function SelectLineHeight(_ref) {
  var handleHideChildOptions = _ref.handleHideChildOptions;
  var lineHeightOptions = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 2.0];
  var handleOptionClick = function handleOptionClick(e, value) {
    e.preventDeafult();
    var selection = window.getSelection(); // Get current selection

    // Check if there's a valid selection and text
    if (selection && selection.rangeCount > 0 && selection.toString().trim() !== "") {
      var range = selection.getRangeAt(0); // Get range of current selection
      var lineHeightStyle = "line-height: ".concat(value, ";");

      // Traverse through each node in the range and apply line height style
      var applyLineHeight = function applyLineHeight(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          var wrapperSpan = document.createElement("span");
          wrapperSpan.style.cssText = lineHeightStyle;
          wrapperSpan.appendChild(node.cloneNode(true));
          return wrapperSpan;
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === "p") {
          var newNode = node.cloneNode(false);
          // Use the spread operator to convert NodeList to an array and iterate over each child node
          _toConsumableArray(node.childNodes).forEach(function (childNode) {
            newNode.appendChild(applyLineHeight(childNode));
          });
          return newNode;
        } else {
          return node.cloneNode(true); // For other element nodes, just clone them without modifying
        }
      };
      var modifiedContents = applyLineHeight(range.cloneContents());

      // Replace the original selection with the modified content
      range.deleteContents();
      range.insertNode(modifiedContents);

      // Restore selection
      selection.removeAllRanges(); // Remove existing ranges
      selection.addRange(range); // Restore original selection
    }
    handleHideChildOptions();
  };
  return /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, lineHeightOptions.map(function (option, index) {
    return /*#__PURE__*/external_react_default.a.createElement("button", {
      key: "key".concat(index),
      onClick: function onClick(e) {
        return handleOptionClick(e, option);
      },
      className: "select-option"
    }, option);
  }));
}
/* harmony default export */ var components_SelectLineHeight = (SelectLineHeight);
// CONCATENATED MODULE: ./src/components/SelectFormations.jsx
function SelectFormations_slicedToArray(r, e) { return SelectFormations_arrayWithHoles(r) || SelectFormations_iterableToArrayLimit(r, e) || SelectFormations_unsupportedIterableToArray(r, e) || SelectFormations_nonIterableRest(); }
function SelectFormations_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function SelectFormations_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return SelectFormations_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? SelectFormations_arrayLikeToArray(r, a) : void 0; } }
function SelectFormations_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function SelectFormations_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function SelectFormations_arrayWithHoles(r) { if (Array.isArray(r)) return r; }







function SelectFormations_SelectFileOptions(props) {
  var _options;
  var item = props.item,
    isFullScreen = props.isFullScreen,
    remove_from_navbar = props.remove_from_navbar,
    editorRef = props.editorRef;
  var options = item.options;
  if (!options) {
    options = FORMAT_OPTIONS;
  }
  var _useState = Object(external_react_["useState"])(false),
    _useState2 = SelectFormations_slicedToArray(_useState, 2),
    showFormatOptions = _useState2[0],
    setShowFormatOptions = _useState2[1];
  var _useState3 = Object(external_react_["useState"])(0),
    _useState4 = SelectFormations_slicedToArray(_useState3, 2),
    showChildOptions = _useState4[0],
    setShowChildOptions = _useState4[1];
  var _useState5 = Object(external_react_["useState"])(0),
    _useState6 = SelectFormations_slicedToArray(_useState5, 2),
    dropdownTop = _useState6[0],
    setDropdownTop = _useState6[1];
  var random_id = generateRandomID(16);
  var handleShowFamily = function handleShowFamily(option, event) {
    if (event) {
      var parent = document.getElementById(random_id);
      var parent_top = parent.getBoundingClientRect().top;
      var top = event.currentTarget.getBoundingClientRect().top;
      setDropdownTop(isFullScreen ? top : top - parent_top);
    }
    setShowFormatOptions(true);
    setShowChildOptions(option);
  };
  var handleHideChildOptions = function handleHideChildOptions() {
    setShowFormatOptions(false);
    setShowChildOptions(0);
  };
  var handleClick = function handleClick(e, name, option) {
    e.preventDefault();
    editorRef.current.focus();
    if (option !== null && option !== void 0 && option.handleClick) {
      option.handleClick(option, item);
      if (!option.add_functionality) return;
    }
    document.execCommand(name);
    handleHideChildOptions();
  };
  if ((remove_from_navbar === null || remove_from_navbar === void 0 ? void 0 : remove_from_navbar.length) > 0) {
    var _find_remove$options;
    var find_remove = remove_from_navbar.find(function (toolbar) {
      return toolbar.name === "format";
    });
    if ((find_remove === null || find_remove === void 0 ? void 0 : (_find_remove$options = find_remove.options) === null || _find_remove$options === void 0 ? void 0 : _find_remove$options.length) > 0) {
      options = options.filter(function (item) {
        return !(find_remove !== null && find_remove !== void 0 && find_remove.options.includes(item));
      });
    }
  }
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "custom-select",
    onMouseOver: function onMouseOver() {
      return setShowFormatOptions(true);
    },
    onMouseLeave: handleHideChildOptions,
    id: random_id
  }, item !== null && item !== void 0 && item.title ? item.title : "Format", /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-items ".concat(showFormatOptions ? "show" : "")
  }, ((_options = options) === null || _options === void 0 ? void 0 : _options.length) > 0 && options.map(function (option, index) {
    var is_bold = option === "bold" || option.name === "bold";
    var is_italic = option === "italic" || option.name === "italic";
    var is_underline = option === "underline" || option.name === "underline";
    var is_superscript = option === "superscript" || option.name === "superscript";
    var is_subscript = option === "subscript" || option.name === "subscript";
    var is_font = option === "font" || option.name === "font";
    var is_font_size = option === "font_size" || option.name === "font_size";
    var is_alignment = option === "alignment" || option.name === "alignment";
    return /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, is_bold && /*#__PURE__*/external_react_default.a.createElement("button", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleClick(e, "bold", option);
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(BoldIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Bold")), is_italic && /*#__PURE__*/external_react_default.a.createElement("button", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleClick(e, "italic", option);
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(ItalicIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Italic")), is_underline && /*#__PURE__*/external_react_default.a.createElement("button", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleClick(e, "underline", option);
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(UnderlineIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Underline")), is_superscript && /*#__PURE__*/external_react_default.a.createElement("button", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleClick(e, "superscript", option);
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(SuperscriptIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Superscript")), is_subscript && /*#__PURE__*/external_react_default.a.createElement("button", {
      className: "select-insert",
      onClick: function onClick(e) {
        return handleClick(e, "subscript", option);
      }
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(SubscriptIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Subscript")), is_font && /*#__PURE__*/external_react_default.a.createElement("div", {
      onMouseOver: function onMouseOver(e) {
        handleShowFamily(1, e);
      },
      onMouseLeave: handleHideChildOptions
    }, /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert"
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(FontFamilyIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Font Family"))), is_font_size && /*#__PURE__*/external_react_default.a.createElement("div", {
      onMouseOver: function onMouseOver(e) {
        handleShowFamily(2, e);
      },
      onMouseLeave: handleHideChildOptions
    }, /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert"
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(FontSizeIcon, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Font Size"))), is_alignment && /*#__PURE__*/external_react_default.a.createElement("div", {
      onMouseOver: function onMouseOver(e) {
        handleShowFamily(3, e);
      },
      onMouseLeave: handleHideChildOptions
    }, /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "select-insert"
    }, option !== null && option !== void 0 && option.icon ? option.icon : /*#__PURE__*/external_react_default.a.createElement(AlignLeft, null), /*#__PURE__*/external_react_default.a.createElement("span", null, option !== null && option !== void 0 && option.title ? option.title : "Align"))));
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-formation-dropdown ".concat(showChildOptions === 1 ? "show" : ""),
    onMouseOver: function onMouseOver() {
      handleShowFamily(1);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowChildOptions(false);
    },
    style: {
      top: dropdownTop
    }
  }, /*#__PURE__*/external_react_default.a.createElement(components_SelectFamily, {
    handleHideChildOptions: handleHideChildOptions
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-formation-dropdown font-size-dropdown ".concat(showChildOptions === 2 ? "show" : ""),
    onMouseOver: function onMouseOver() {
      handleShowFamily(2);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowChildOptions(false);
    },
    style: {
      top: dropdownTop
    }
  }, /*#__PURE__*/external_react_default.a.createElement(components_SelectFontSize, {
    handleHideChildOptions: handleHideChildOptions
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-formation-dropdown font-size-dropdown ".concat(showChildOptions === 3 ? "show" : ""),
    onMouseOver: function onMouseOver() {
      handleShowFamily(3);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowChildOptions(false);
    },
    style: {
      top: dropdownTop
    }
  }, /*#__PURE__*/external_react_default.a.createElement(components_SelectAlignment, {
    handleHideChildOptions: handleHideChildOptions
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-formation-dropdown font-size-dropdown ".concat(showChildOptions === 4 ? "show" : ""),
    onMouseOver: function onMouseOver() {
      handleShowFamily(4);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowChildOptions(false);
    },
    style: {
      top: dropdownTop
    }
  }, /*#__PURE__*/external_react_default.a.createElement(components_SelectLineHeight, {
    handleHideChildOptions: handleHideChildOptions
  })));
}
// CONCATENATED MODULE: ./src/components/ManageColors.jsx
function ManageColors_slicedToArray(r, e) { return ManageColors_arrayWithHoles(r) || ManageColors_iterableToArrayLimit(r, e) || ManageColors_unsupportedIterableToArray(r, e) || ManageColors_nonIterableRest(); }
function ManageColors_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function ManageColors_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return ManageColors_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ManageColors_arrayLikeToArray(r, a) : void 0; } }
function ManageColors_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ManageColors_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function ManageColors_arrayWithHoles(r) { if (Array.isArray(r)) return r; }


function rgbToHex(rgb) {
  var _rgb$match = rgb.match(/\d+/g),
    _rgb$match2 = ManageColors_slicedToArray(_rgb$match, 3),
    r = _rgb$match2[0],
    g = _rgb$match2[1],
    b = _rgb$match2[2];
  var hexR = parseInt(r).toString(16).padStart(2, "0");
  var hexG = parseInt(g).toString(16).padStart(2, "0");
  var hexB = parseInt(b).toString(16).padStart(2, "0");
  var hexColor = "#".concat(hexR).concat(hexG).concat(hexB);
  return hexColor;
}
function ManageColors(props) {
  var type = props.type,
    item = props.item,
    title = props.title,
    editorRef = props.editorRef;
  var _useState = Object(external_react_["useState"])("#000"),
    _useState2 = ManageColors_slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  var _useState3 = Object(external_react_["useState"])(false),
    _useState4 = ManageColors_slicedToArray(_useState3, 2),
    openColor = _useState4[0],
    setOpenColor = _useState4[1];
  var colorPickerRef = Object(external_react_["useRef"])(null);
  var handleChangeColor = function handleChangeColor(e, color, input) {
    e.preventDefault();
    if (!input) {
      setOpenColor(false);
    }
    if (item !== null && item !== void 0 && item.handleClick) {
      item.handleClick(item);
      if (!item.add_functionality) return;
    }
    setValue(color);
    document.execCommand(type, false, color);
    if (!input) {
      setOpenColor(false);
    }
  };
  var handleClick = function handleClick(e) {
    e.preventDefault();
    setOpenColor(true);
  };
  var handleOutsideClick = function handleOutsideClick(e) {
    if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
      setOpenColor(false);
    }
  };
  Object(external_react_["useEffect"])(function () {
    var handleSelectionChange = function handleSelectionChange() {
      var _editorRef$current;
      if (!(editorRef !== null && editorRef !== void 0 && (_editorRef$current = editorRef.current) !== null && _editorRef$current !== void 0 && _editorRef$current.contains(window.getSelection().anchorNode))) {
        return;
      }
      var appliedColor = "transparent";
      if (type === "foreColor") {
        appliedColor = document.queryCommandValue(type);
      } else {
        var selection = window.getSelection();
        if (selection.rangeCount > 0) {
          var range = selection.getRangeAt(0);
          var ancestor = range.commonAncestorContainer;
          if (ancestor.nodeType === 3) {
            var parentElement = ancestor.parentElement;
            appliedColor = window.getComputedStyle(parentElement).backgroundColor;
          } else {
            appliedColor = window.getComputedStyle(ancestor).backgroundColor;
          }
        }
      }
      if (appliedColor && appliedColor !== "transparent") {
        setValue(rgbToHex(appliedColor));
      }
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mousedown", handleOutsideClick);
    return function () {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.addEventListener("mousedown", handleOutsideClick);
    };
  }, [editorRef]);

  // document.documentElement.style.setProperty(variable, newColor);

  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "main-color-component",
    ref: colorPickerRef
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    onClick: handleClick,
    title: item !== null && item !== void 0 && item.title ? item.title : title
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-d-flex react-editor-flex-column"
  }, item !== null && item !== void 0 && item.icon ? item.icon : type === "foreColor" ? /*#__PURE__*/external_react_default.a.createElement(TextColorUpperIcon, null) : /*#__PURE__*/external_react_default.a.createElement(BackgroundColorIcon, null), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "bottom-colored-line",
    style: {
      backgroundColor: value
    }
  }))), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "open-color-box ".concat(openColor ? "show" : "")
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "color-box-grid react-editor-d-flex"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#BFEDD2"
    },
    title: "Light Green",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#BFEDD2");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#FBEEB8"
    },
    title: "Light Yellow",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#FBEEB8");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#F8CAC6"
    },
    title: "Light Red",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#BFEDD2");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#ECCAFA"
    },
    title: "Light Purple",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#ECCAFA");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#C2E0F4"
    },
    title: "Light Blue",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#C2E0F4");
    }
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "color-box-grid react-editor-d-flex"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#2DC26B"
    },
    title: "Green",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#2DC26B");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#F1C40F"
    },
    title: "Yellow",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#F1C40F");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#E03E2D"
    },
    title: "Red",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#E03E2D");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#B96AD9"
    },
    title: "Purple",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#B96AD9");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#3598DB"
    },
    title: "Blue",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#3598DB");
    }
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "color-box-grid react-editor-d-flex"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#169179"
    },
    title: "Dark Turquoise",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#169179");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#E67E23"
    },
    title: "Orange",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#E67E23");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#BA372A"
    },
    title: "Dark Red",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#BA372A");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#843FA1"
    },
    title: "Dark Purple",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#843FA1");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#236FA1"
    },
    title: "Dark Blue",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#236FA1");
    }
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "color-box-grid react-editor-d-flex"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#ECF0F1"
    },
    title: "Light Gray",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#ECF0F1");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#CED4D9"
    },
    title: "Medium Gray",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#CED4D9");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#95A5A6"
    },
    title: "Gray",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#95A5A6");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#7E8C8D"
    },
    title: "Dark Gray",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#7E8C8D");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#34495E"
    },
    title: "Navy Blue",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#34495E");
    }
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "color-box-grid react-editor-d-flex"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#fff"
    },
    title: "White",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#fff");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box",
    style: {
      backgroundColor: "#000"
    },
    title: "Black",
    onClick: function onClick(e) {
      return handleChangeColor(e, "#000");
    }
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box"
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box"
  }), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "color-box custom-color-picker",
    title: "Custom color"
  }, /*#__PURE__*/external_react_default.a.createElement("input", {
    id: "input-color",
    type: "color",
    value: value,
    onChange: function onChange(e) {
      return handleChangeColor(e, e.target.value, "input");
    }
  })))));
}
// CONCATENATED MODULE: ./src/components/SimpleButton.jsx

function SimpleButton(props) {
  var name = props.name,
    icon = props.icon,
    title = props.title,
    item = props.item,
    editorRef = props.editorRef;
  var handleClick = function handleClick(e) {
    e.preventDefault();
    if (item !== null && item !== void 0 && item.handleClick) {
      item.handleClick(item);
      if (!item.add_functionality) return;
    }
    if (editorRef.current) {
      editorRef.current.dir = name; // Set text direction to LTR for the editor area
    }
  };
  return /*#__PURE__*/external_react_default.a.createElement("button", {
    onClick: handleClick,
    title: item !== null && item !== void 0 && item.title ? item.title : title
  }, item !== null && item !== void 0 && item.icon ? item.icon : icon);
}
// CONCATENATED MODULE: ./src/components/ViewLoadingModel.jsx
// Modal.js



var ViewLoadingModel_ViewLoadingModel = function ViewLoadingModel() {
  return /*#__PURE__*/external_react_dom_default.a.createPortal( /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "modal-overlay image-model-overly"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/external_react_default.a.createElement("img", {
    src: loader,
    alt: ""
  }))), document.getElementById("modal-root"));
};
/* harmony default export */ var components_ViewLoadingModel = (ViewLoadingModel_ViewLoadingModel);
// CONCATENATED MODULE: ./src/components/SVGImages/PasteIcon.jsx

function PasteIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M104.6 48H64C28.7 48 0 76.7 0 112v272c0 35.3 28.7 64 64 64h96v-48H64c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h16c0 17.7 14.3 32 32 32h72.4c17.6-19.6 43.2-32 71.6-32h62c-7.1-27.6-32.2-48-62-48h-40.6C211.6 20.9 188.2 0 160 0s-51.6 20.9-55.4 48m39.4 8a16 16 0 1 1 32 0a16 16 0 1 1-32 0m304 408H256c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16h140.1l67.9 67.9V448c0 8.8-7.2 16-16 16m-192 48h192c35.3 0 64-28.7 64-64V243.9c0-12.7-5.1-24.9-14.1-33.9L430 142.1c-9-9-21.2-14.1-33.9-14.1H256c-35.3 0-64 28.7-64 64v256c0 35.3 28.7 64 64 64"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/CutIcon.jsx

function CutIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "m5.142 11.074l-1.912.548a2.532 2.532 0 1 1-1.395-4.867l1.947-.559a2.532 2.532 0 0 1 2.555.713l1.53-5.335c.139-.485.6-.897 1.159-1.238c.27-.164.52-.278.779-.32c.814-.132 1.503.558 1.261 1.422L9.574 6.643l4.988-1.43c.864-.242 1.554.447 1.422 1.26c-.042.26-.156.51-.32.78c-.341.56-.753 1.02-1.238 1.16L9.523 9.817a2.53 2.53 0 0 1 .56 2.4l-.56 1.947a2.532 2.532 0 1 1-4.867-1.395zm.33-1.148l.48-1.673a1.52 1.52 0 0 0-1.89-1.083l-1.948.558a1.52 1.52 0 0 0 .837 2.92zm3.773-2.135l-.33 1.148l5.232-1.5c.324-.093 1.182-1.39.694-1.253zM5.63 13.049a1.52 1.52 0 0 0 2.92.837l.559-1.947a1.52 1.52 0 0 0-1.553-1.935l2.537-8.845c.136-.488-1.16.37-1.253.694zm.973.279l.559-1.947a.506.506 0 1 1 .973.279l-.558 1.947a.506.506 0 1 1-.974-.28m-3.93-3.653a.506.506 0 1 1-.28-.973l1.947-.558a.506.506 0 0 1 .28.973z"
  }));
}
// CONCATENATED MODULE: ./src/components/SVGImages/CopyIcon.jsx

function CopyIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M0 2.729V2a1 1 0 0 1 1-1h2v1H1v12h4v1H1a1 1 0 0 1-1-1V9zM12 5V2a1 1 0 0 0-1-1H9v1h2v3zm-1 1h2v9H6V6zV5H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2z"
  }), /*#__PURE__*/external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M7 10h5V9H7zm0-2h5V7H7zm0 4h5v-1H7zm0 2h5v-1H7zM9 2V1a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v1h1V1h4v1zM3 3h6V2H3z"
  }));
}
// CONCATENATED MODULE: ./src/components/LinkModal.jsx
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function LinkModal_slicedToArray(r, e) { return LinkModal_arrayWithHoles(r) || LinkModal_iterableToArrayLimit(r, e) || LinkModal_unsupportedIterableToArray(r, e) || LinkModal_nonIterableRest(); }
function LinkModal_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function LinkModal_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return LinkModal_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? LinkModal_arrayLikeToArray(r, a) : void 0; } }
function LinkModal_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function LinkModal_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function LinkModal_arrayWithHoles(r) { if (Array.isArray(r)) return r; }

function LinkModal(props) {
  var onLinkInsert = props.onLinkInsert,
    item = props.item,
    setIsOpenModel = props.setIsOpenModel,
    selectedData = props.selectedData,
    imageUrl = props.imageUrl,
    setImageUrl = props.setImageUrl,
    image_handler = props.image_handler,
    setIsLoading = props.setIsLoading;
  var _useState = Object(external_react_["useState"])({}),
    _useState2 = LinkModal_slicedToArray(_useState, 2),
    errorMessage = _useState2[0],
    setErrorMessage = _useState2[1];
  var _useState3 = Object(external_react_["useState"])({
      text: "",
      link: "",
      open_new_tab: false,
      link_type: "text"
    }),
    _useState4 = LinkModal_slicedToArray(_useState3, 2),
    inputs = _useState4[0],
    setInputs = _useState4[1];
  var handleLinkInsert = function handleLinkInsert(e) {
    e.preventDefault();
    if (!inputs.link) {
      var error = {
        type: "link",
        message: "Please add link URL"
      };
      setErrorMessage(error);
      return;
    } else if (inputs.link_type === "image" && !imageUrl) {
      var _error = {
        type: "image",
        message: "Please upload image"
      };
      setErrorMessage(_error);
      return;
    } else if (inputs.link_type === "button" && !inputs.text) {
      var _error2 = {
        type: "button",
        message: "Please add text to display on button"
      };
      setErrorMessage(_error2);
      return;
    }
    if (item !== null && item !== void 0 && item.handleSubmit) {
      item.handleSubmit(item);
      if (!item.add_functionality) {
        setIsOpenModel("");
        return;
      }
    }
    onLinkInsert(inputs);
  };
  var handleChange = function handleChange(event) {
    var _event$target = event.target,
      name = _event$target.name,
      value = _event$target.value;
    setInputs(function (old) {
      return _objectSpread(_objectSpread({}, old), {}, _defineProperty({}, name, value));
    });
  };
  var handleCross = function handleCross() {
    setImageUrl("");
  };
  var handleChangeFile = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
      var files, data, image_path;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            files = event.target.files;
            data = {
              image: files[0]
            };
            if (!image_handler) {
              _context.next = 10;
              break;
            }
            setIsLoading(true);
            _context.next = 6;
            return image_handler(data);
          case 6:
            image_path = _context.sent;
            if (image_path) {
              setImageUrl(image_path);
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
            _context.next = 11;
            break;
          case 10:
            setImageUrl(URL.createObjectURL(data.image));
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleChangeFile(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var handleChangeType = function handleChangeType(e, value) {
    e.preventDefault();
    setInputs(function (old) {
      return _objectSpread(_objectSpread({}, old), {}, {
        link_type: value
      });
    });
    setErrorMessage("");
  };
  Object(external_react_["useEffect"])(function () {
    if (selectedData !== null && selectedData !== void 0 && selectedData.text) {
      var selected_data = _objectSpread({}, selectedData);
      var type = selected_data.link_type;
      if (!type) {
        selected_data.link_type = "text";
      }
      setInputs(selected_data);
    }
  }, [selectedData]);
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "link-modal"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-type"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "".concat(inputs.link_type === "text" ? "selected-type" : ""),
    onClick: function onClick(e) {
      return handleChangeType(e, "text");
    }
  }, "Text"), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "".concat(inputs.link_type === "image" ? "selected-type" : ""),
    onClick: function onClick(e) {
      return handleChangeType(e, "image");
    }
  }, "Image"), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "".concat(inputs.link_type === "button" ? "selected-type" : ""),
    onClick: function onClick(e) {
      return handleChangeType(e, "button");
    }
  }, "Button")), /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "link"
  }, "URL*"), /*#__PURE__*/external_react_default.a.createElement("input", {
    id: "link",
    type: "text",
    name: "link",
    autoFocus: true,
    className: "form-control-input",
    value: inputs.link,
    onChange: handleChange
  }), errorMessage.type === "link" && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "editor-error-messsage"
  }, "*", "".concat(errorMessage.message))), inputs.link_type === "image" ? /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, imageUrl ? /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "link-image-box"
  }, /*#__PURE__*/external_react_default.a.createElement("span", {
    className: "link-image-cross",
    onClick: handleCross
  }, "x"), /*#__PURE__*/external_react_default.a.createElement("img", {
    src: imageUrl,
    alt: "ImageLink",
    className: "link-image"
  })) : /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "image"
  }, "Choose File *"), /*#__PURE__*/external_react_default.a.createElement("input", {
    type: "file",
    id: "image",
    name: "image",
    className: "form-control-input",
    accept: "image/*",
    onChange: handleChangeFile
  }), errorMessage.type === "image" && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "editor-error-messsage"
  }, "*", "".concat(errorMessage.message)))) : /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "text"
  }, "Text to display ".concat(inputs.link_type === "button" ? "*" : "")), /*#__PURE__*/external_react_default.a.createElement("input", {
    id: "text",
    type: "text",
    name: "text",
    value: inputs.text,
    onChange: handleChange,
    className: "form-control-input"
  }), errorMessage.type === "button" && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "editor-error-messsage"
  }, "*", "".concat(errorMessage.message))), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "open_new_tab"
  }, "Open in"), /*#__PURE__*/external_react_default.a.createElement("select", {
    name: "open_new_tab",
    id: "open_new_tab",
    className: "form-control-input react-editor-mt-2",
    value: inputs.open_new_tab,
    onChange: handleChange
  }, /*#__PURE__*/external_react_default.a.createElement("option", {
    value: false
  }, "Current window"), /*#__PURE__*/external_react_default.a.createElement("option", {
    value: true
  }, "New window"))), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-text-end"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "save-button",
    onClick: handleLinkInsert
  }, "Save"))));
}
// CONCATENATED MODULE: ./src/components/ImageModal.jsx
function ImageModal_typeof(o) { "@babel/helpers - typeof"; return ImageModal_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ImageModal_typeof(o); }
function ImageModal_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ ImageModal_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == ImageModal_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(ImageModal_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ImageModal_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function ImageModal_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { ImageModal_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { ImageModal_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ImageModal_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function ImageModal_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ImageModal_ownKeys(Object(t), !0).forEach(function (r) { ImageModal_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ImageModal_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function ImageModal_defineProperty(e, r, t) { return (r = ImageModal_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function ImageModal_toPropertyKey(t) { var i = ImageModal_toPrimitive(t, "string"); return "symbol" == ImageModal_typeof(i) ? i : i + ""; }
function ImageModal_toPrimitive(t, r) { if ("object" != ImageModal_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ImageModal_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function ImageModal_slicedToArray(r, e) { return ImageModal_arrayWithHoles(r) || ImageModal_iterableToArrayLimit(r, e) || ImageModal_unsupportedIterableToArray(r, e) || ImageModal_nonIterableRest(); }
function ImageModal_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function ImageModal_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return ImageModal_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ImageModal_arrayLikeToArray(r, a) : void 0; } }
function ImageModal_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ImageModal_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function ImageModal_arrayWithHoles(r) { if (Array.isArray(r)) return r; }



function ImageModal(props) {
  var onImageInsert = props.onImageInsert,
    item = props.item,
    setIsLoading = props.setIsLoading,
    image_handler = props.image_handler,
    selectedData = props.selectedData;
  var _useState = Object(external_react_["useState"])(""),
    _useState2 = ImageModal_slicedToArray(_useState, 2),
    errorMessage = _useState2[0],
    setErrorMessage = _useState2[1];
  var _useState3 = Object(external_react_["useState"])(0),
    _useState4 = ImageModal_slicedToArray(_useState3, 2),
    heightRatio = _useState4[0],
    setHeightRatio = _useState4[1];
  var _useState5 = Object(external_react_["useState"])(true),
    _useState6 = ImageModal_slicedToArray(_useState5, 2),
    isLocked = _useState6[0],
    setIsLocked = _useState6[1];
  var _useState7 = Object(external_react_["useState"])({
      link: "",
      height: "",
      width: "",
      image: null,
      type: "general"
    }),
    _useState8 = ImageModal_slicedToArray(_useState7, 2),
    inputs = _useState8[0],
    setInputs = _useState8[1];
  var handleChangeFile = function handleChangeFile(event) {
    var _event$target = event.target,
      name = _event$target.name,
      files = _event$target.files;
    setInputs(function (oldInputs) {
      return ImageModal_objectSpread(ImageModal_objectSpread({}, oldInputs), {}, ImageModal_defineProperty({}, name, files[0]));
    });
  };
  var MAX_RETRIES = 3;
  var get_image_dimentions = function get_image_dimentions(image_path) {
    var retries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var img_width = 0;
    var img_height = 0;
    var img = new Image();
    img.onload = function () {
      img_width = img.width;
      img_height = img.height;
      setInputs(function (old) {
        return ImageModal_objectSpread(ImageModal_objectSpread({}, old), {}, {
          width: img_width,
          height: img_height
        });
      });
      setIsLoading(false);
    };
    img.onerror = function () {
      setIsLoading(false);
      if (retries < MAX_RETRIES) {
        get_image_dimentions(image_path, retries + 1);
      }
    };
    img.src = image_path;
  };
  var handleLinkInsert = /*#__PURE__*/function () {
    var _ref = ImageModal_asyncToGenerator( /*#__PURE__*/ImageModal_regeneratorRuntime().mark(function _callee(e) {
      var error_message, _error_message, image_path;
      return ImageModal_regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            if (!(inputs.type === "general")) {
              _context.next = 9;
              break;
            }
            if (inputs.link) {
              _context.next = 6;
              break;
            }
            error_message = "Image source is required";
            setErrorMessage(error_message);
            return _context.abrupt("return");
          case 6:
            onImageInsert(inputs);
            _context.next = 29;
            break;
          case 9:
            if (inputs.image) {
              _context.next = 13;
              break;
            }
            _error_message = "Please upload image";
            setErrorMessage(_error_message);
            return _context.abrupt("return");
          case 13:
            if (!image_handler) {
              _context.next = 22;
              break;
            }
            setIsLoading(true);
            _context.next = 17;
            return image_handler(ImageModal_objectSpread({}, inputs), item);
          case 17:
            image_path = _context.sent;
            if (image_path) {
              get_image_dimentions(image_path);
              setInputs(function (old) {
                return ImageModal_objectSpread(ImageModal_objectSpread({}, old), {}, {
                  type: "general",
                  link: image_path
                });
              });
            } else {
              setIsLoading(false);
            }
            return _context.abrupt("return");
          case 22:
            inputs.link = URL.createObjectURL(inputs.image);
            inputs.width = "";
            inputs.height = "";
          case 25:
            if (inputs.link) {
              _context.next = 28;
              break;
            }
            setIsLoading(false);
            return _context.abrupt("return");
          case 28:
            onImageInsert(inputs);
          case 29:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleLinkInsert(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var handleChangeHW = function handleChangeHW(event) {
    var _event$target2 = event.target,
      name = _event$target2.name,
      value = _event$target2.value;
    var height = inputs.height;
    var width = inputs.width;
    if (name === "width") {
      height = value / heightRatio;
      width = value;
    } else {
      width = value * heightRatio;
      height = value;
    }
    height = Math.round(height);
    width = Math.round(width);
    setInputs(function (old) {
      return ImageModal_objectSpread(ImageModal_objectSpread({}, old), {}, {
        height: height,
        width: width
      });
    });
  };
  var handleChange = function handleChange(event) {
    var _event$target3 = event.target,
      name = _event$target3.name,
      value = _event$target3.value;
    if (isLocked && name !== "link") {
      handleChangeHW(event);
      return;
    }
    setInputs(function (old) {
      return ImageModal_objectSpread(ImageModal_objectSpread({}, old), {}, ImageModal_defineProperty({}, name, value));
    });
  };
  var handleChangeType = function handleChangeType(e, value) {
    e.preventDefault();
    setInputs(function (old) {
      return ImageModal_objectSpread(ImageModal_objectSpread({}, old), {}, {
        type: value,
        image: null
      });
    });
    setErrorMessage("");
  };
  Object(external_react_["useEffect"])(function () {
    if (selectedData !== null && selectedData !== void 0 && selectedData.link) {
      var height = selectedData.width / selectedData.height;
      setHeightRatio(height);
      setInputs(ImageModal_objectSpread(ImageModal_objectSpread({}, inputs), selectedData));
    }
  }, [selectedData]);
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "link-modal"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-type"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "".concat(inputs.type === "general" ? "selected-type" : ""),
    onClick: function onClick(e) {
      return handleChangeType(e, "general");
    }
  }, "General"), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "".concat(inputs.type === "upload" ? "selected-type" : ""),
    onClick: function onClick(e) {
      return handleChangeType(e, "upload");
    }
  }, "Upload")), /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, inputs.type === "general" ? /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "link"
  }, "Source"), /*#__PURE__*/external_react_default.a.createElement("input", {
    id: "link",
    type: "text",
    name: "link",
    autoFocus: true,
    className: "form-control-input",
    value: inputs.link,
    onChange: handleChange
  }), errorMessage && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "editor-error-messsage"
  }, "*", "".concat(errorMessage))), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-d-flex justify-content-between"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10 react-editor-w-40"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "height"
  }, "Height"), /*#__PURE__*/external_react_default.a.createElement("input", {
    id: "height",
    type: "text",
    name: "height",
    value: inputs.height,
    onChange: handleChange,
    className: "form-control-input"
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10 react-editor-w-40"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "width"
  }, "Width"), /*#__PURE__*/external_react_default.a.createElement("input", {
    id: "width",
    type: "text",
    name: "width",
    value: inputs.width,
    onChange: handleChange,
    className: "form-control-input"
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "lock-unlock-icon",
    onClick: function onClick() {
      return setIsLocked(!isLocked);
    }
  }, isLocked ? /*#__PURE__*/external_react_default.a.createElement(LockIcon, null) : /*#__PURE__*/external_react_default.a.createElement(UnlockIcon, null)))) : /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "image"
  }, "Choose File"), /*#__PURE__*/external_react_default.a.createElement("input", {
    type: "file",
    id: "image",
    name: "image",
    className: "form-control-input",
    accept: "image/*",
    onChange: handleChangeFile
  }), errorMessage && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "editor-error-messsage"
  }, "*", "".concat(errorMessage))), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-text-end"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "save-button",
    onClick: handleLinkInsert
  }, "Save"))));
}
// CONCATENATED MODULE: ./src/components/MediaModal.jsx
function MediaModal_typeof(o) { "@babel/helpers - typeof"; return MediaModal_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, MediaModal_typeof(o); }
function MediaModal_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function MediaModal_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? MediaModal_ownKeys(Object(t), !0).forEach(function (r) { MediaModal_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : MediaModal_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function MediaModal_defineProperty(e, r, t) { return (r = MediaModal_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function MediaModal_toPropertyKey(t) { var i = MediaModal_toPrimitive(t, "string"); return "symbol" == MediaModal_typeof(i) ? i : i + ""; }
function MediaModal_toPrimitive(t, r) { if ("object" != MediaModal_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != MediaModal_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function MediaModal_slicedToArray(r, e) { return MediaModal_arrayWithHoles(r) || MediaModal_iterableToArrayLimit(r, e) || MediaModal_unsupportedIterableToArray(r, e) || MediaModal_nonIterableRest(); }
function MediaModal_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function MediaModal_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return MediaModal_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? MediaModal_arrayLikeToArray(r, a) : void 0; } }
function MediaModal_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function MediaModal_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function MediaModal_arrayWithHoles(r) { if (Array.isArray(r)) return r; }

function MediaModal(_ref) {
  var onMediaInsert = _ref.onMediaInsert;
  var _useState = Object(external_react_["useState"])(""),
    _useState2 = MediaModal_slicedToArray(_useState, 2),
    errorMessage = _useState2[0],
    setErrorMessage = _useState2[1];
  var _useState3 = Object(external_react_["useState"])({
      link: "",
      height: "",
      embed_code: "",
      width: "",
      type: "general"
    }),
    _useState4 = MediaModal_slicedToArray(_useState3, 2),
    inputs = _useState4[0],
    setInputs = _useState4[1];
  var handleChangeFile = function handleChangeFile(event) {
    var _event$target = event.target,
      name = _event$target.name,
      files = _event$target.files;
    setInputs(function (old) {
      return MediaModal_objectSpread(MediaModal_objectSpread({}, old), {}, MediaModal_defineProperty({}, name, files[0]));
    });
  };
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    if (inputs.type === "general" && !inputs.link) {
      var error_message = "Video source is required";
      setErrorMessage(error_message);
      return;
    } else if (inputs.type === "upload" && !inputs.link) {
      var _error_message = "Please upload media file";
      setErrorMessage(_error_message);
      return;
    } else if (inputs.type === "embed" && !inputs.embed_code) {
      var _error_message2 = "Please add video embed code";
      setErrorMessage(_error_message2);
      return;
    }
    onMediaInsert(inputs);
  };
  var handleChange = function handleChange(event) {
    var _event$target2 = event.target,
      name = _event$target2.name,
      value = _event$target2.value;
    setInputs(function (old) {
      return MediaModal_objectSpread(MediaModal_objectSpread({}, old), {}, MediaModal_defineProperty({}, name, value));
    });
  };
  var handleChangeType = function handleChangeType(e, value) {
    e.preventDefault();
    setInputs(function (old) {
      return MediaModal_objectSpread(MediaModal_objectSpread({}, old), {}, {
        type: value
      });
    });
    setErrorMessage("");
  };
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "link-modal"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "select-type"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "".concat(inputs.type === "general" ? "selected-type" : ""),
    onClick: function onClick(e) {
      return handleChangeType(e, "general");
    }
  }, "General"), /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "".concat(inputs.type === "embed" ? "selected-type" : ""),
    onClick: function onClick(e) {
      return handleChangeType(e, "embed");
    }
  }, "Embed")), /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, inputs.type === "general" ? /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "link"
  }, "Source"), /*#__PURE__*/external_react_default.a.createElement("input", {
    id: "link",
    type: "text",
    name: "link",
    autoFocus: true,
    className: "form-control-input",
    value: inputs.link,
    onChange: handleChange
  }), errorMessage && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "editor-error-messsage"
  }, "*", "".concat(errorMessage))), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-d-flex justify-content-between"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10 react-editor-w-47"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "height"
  }, "Height"), /*#__PURE__*/external_react_default.a.createElement("input", {
    id: "height",
    type: "text",
    name: "height",
    value: inputs.height,
    onChange: handleChange,
    className: "form-control-input"
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10 react-editor-w-47"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "width"
  }, "Width"), /*#__PURE__*/external_react_default.a.createElement("input", {
    id: "width",
    type: "text",
    name: "width",
    value: inputs.width,
    onChange: handleChange,
    className: "form-control-input"
  })))) : inputs.type === "embed" ? /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "embed_code"
  }, "Paste your embed code below:"), /*#__PURE__*/external_react_default.a.createElement("textarea", {
    id: "embed_code",
    name: "embed_code",
    rows: 5,
    autoFocus: true,
    className: "form-control-input",
    value: inputs.embed_code,
    onChange: handleChange
  }), errorMessage && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "editor-error-messsage"
  }, "*", "".concat(errorMessage)))) : /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-mt-10"
  }, /*#__PURE__*/external_react_default.a.createElement("label", {
    htmlFor: "link"
  }, "Choose File"), /*#__PURE__*/external_react_default.a.createElement("input", {
    type: "file",
    id: "link",
    name: "link",
    className: "form-control-input",
    accept: "video/*",
    onChange: handleChangeFile
  }), errorMessage && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "editor-error-messsage"
  }, "*", "".concat(errorMessage)))), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "react-editor-text-end"
  }, /*#__PURE__*/external_react_default.a.createElement("button", {
    className: "save-button",
    onClick: handleSubmit
  }, "Save"))));
}
// CONCATENATED MODULE: ./src/components/SVGImages/OpenLinkIcon.jsx

function OpenLinkIcon() {
  return /*#__PURE__*/external_react_default.a.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/external_react_default.a.createElement("path", {
    d: "M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
  }));
}
// CONCATENATED MODULE: ./src/components/RightClickLinkPopup.jsx
function RightClickLinkPopup_slicedToArray(r, e) { return RightClickLinkPopup_arrayWithHoles(r) || RightClickLinkPopup_iterableToArrayLimit(r, e) || RightClickLinkPopup_unsupportedIterableToArray(r, e) || RightClickLinkPopup_nonIterableRest(); }
function RightClickLinkPopup_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function RightClickLinkPopup_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return RightClickLinkPopup_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? RightClickLinkPopup_arrayLikeToArray(r, a) : void 0; } }
function RightClickLinkPopup_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function RightClickLinkPopup_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function RightClickLinkPopup_arrayWithHoles(r) { if (Array.isArray(r)) return r; }






var RightClickLinkPopup_RightClickLinkPopup = function RightClickLinkPopup(_ref) {
  var _selectedEvent$parent3;
  var editorRef = _ref.editorRef,
    setIsOpenModel = _ref.setIsOpenModel,
    setSelectedData = _ref.setSelectedData,
    setSelectedEvent = _ref.setSelectedEvent,
    selectedEvent = _ref.selectedEvent,
    setImageUrl = _ref.setImageUrl,
    handleRemoveLink = _ref.handleRemoveLink,
    selectedRange = _ref.selectedRange;
  var popupRef = Object(external_react_["useRef"])(null);
  var _useState = Object(external_react_["useState"])({
      x: 0,
      y: 0
    }),
    _useState2 = RightClickLinkPopup_slicedToArray(_useState, 2),
    popupPosition = _useState2[0],
    setPopupPosition = _useState2[1];
  var _useState3 = Object(external_react_["useState"])(false),
    _useState4 = RightClickLinkPopup_slicedToArray(_useState3, 2),
    popupVisible = _useState4[0],
    setPopupVisible = _useState4[1];
  var getSelectedText = function getSelectedText() {
    if (selectedRange) {
      var selectedText = selectedRange.toString();
      return selectedText;
    }
    return "";
  };
  var handleRightClick = function handleRightClick(event) {
    event.preventDefault();
    remove_resizer();
    var target = event.target;
    setPopupPosition({
      x: event.clientX,
      y: event.clientY
    });
    var tagNames = ["IMG", "A", "BUTTON"];
    if (tagNames.includes(target.tagName)) {
      setSelectedEvent(target);
    }
    setPopupVisible(true);
  };
  var handleClickOutside = function handleClickOutside(event) {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };
  var handleOpenLinkPopup = function handleOpenLinkPopup() {
    var open_new_tab = false;
    var link_url = "";
    var link_text = getSelectedText() || "";
    var link_type = "text";
    if ((selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.tagName) === "A") {
      link_url = selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.href;
      link_text = getSelectedText() || (selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.textContent.trim());
      open_new_tab = (selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.target) === "_blank";
    } else if ((selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.tagName) === "IMG") {
      link_text = "Image";
      link_type = "image";
      setImageUrl(selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.src);
    } else if ((selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.tagName) === "BUTTON") {
      link_text = selectedEvent.textContent;
      link_type = "button";
    }
    var parentElement = selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.parentElement;
    if ((parentElement === null || parentElement === void 0 ? void 0 : parentElement.tagName) === "A") {
      setSelectedEvent(parentElement);
      link_url = parentElement === null || parentElement === void 0 ? void 0 : parentElement.href;
      open_new_tab = (parentElement === null || parentElement === void 0 ? void 0 : parentElement.target) === "_blank";
    }
    var selected_object = {
      link: link_url,
      text: link_text,
      open_new_tab: open_new_tab,
      link_type: link_type
    };
    setSelectedData(selected_object);
    setPopupVisible(false);
    setIsOpenModel("link");
  };
  var handleOpenLink = function handleOpenLink() {
    var _selectedEvent$parent;
    var link = selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.href;
    if ((selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.tagName) !== "A" && (selectedEvent === null || selectedEvent === void 0 ? void 0 : (_selectedEvent$parent = selectedEvent.parentElement) === null || _selectedEvent$parent === void 0 ? void 0 : _selectedEvent$parent.tagName) === "A") {
      var _selectedEvent$parent2;
      link = selectedEvent === null || selectedEvent === void 0 ? void 0 : (_selectedEvent$parent2 = selectedEvent.parentElement) === null || _selectedEvent$parent2 === void 0 ? void 0 : _selectedEvent$parent2.href;
    }
    window.open(link);
    setPopupVisible(false);
  };
  var handleRemove = function handleRemove() {
    handleRemoveLink();
    setPopupVisible(false);
  };
  var handleImageLink = function handleImageLink() {
    setPopupVisible(false);
    setSelectedData({
      link: selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.src,
      height: selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.offsetHeight,
      width: selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.offsetWidth
    });
    setIsOpenModel("image");
  };
  Object(external_react_["useEffect"])(function () {
    var editor = editorRef.current;
    if (editor) {
      editor.addEventListener("contextmenu", handleRightClick);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      if (editor) {
        editor.removeEventListener("contextmenu", handleRightClick);
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editorRef]);
  return /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, popupVisible && /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "right_click_popup_background",
    style: {
      top: popupPosition.y + window.scrollY,
      left: popupPosition.x
    },
    ref: popupRef
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "right_click_popup",
    onClick: handleOpenLinkPopup
  }, /*#__PURE__*/external_react_default.a.createElement(LinkIcon, null), " Link..."), ((selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.tagName) === "A" || (selectedEvent === null || selectedEvent === void 0 ? void 0 : (_selectedEvent$parent3 = selectedEvent.parentElement) === null || _selectedEvent$parent3 === void 0 ? void 0 : _selectedEvent$parent3.tagName) === "A") && /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "right_click_popup",
    onClick: handleRemove
  }, /*#__PURE__*/external_react_default.a.createElement(RemoveLinkIcon, null), " Remove Link..."), " ", /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "right_click_popup open-link",
    onClick: handleOpenLink
  }, /*#__PURE__*/external_react_default.a.createElement(OpenLinkIcon, null), " Open Link...")), (selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.tagName) === "IMG" && /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, /*#__PURE__*/external_react_default.a.createElement("hr", null), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "right_click_popup",
    ref: popupRef,
    onClick: handleImageLink
  }, /*#__PURE__*/external_react_default.a.createElement(ImageIcon, null), " Image..."))));
};
/* harmony default export */ var components_RightClickLinkPopup = (RightClickLinkPopup_RightClickLinkPopup);
// CONCATENATED MODULE: ./src/index.js
function src_typeof(o) { "@babel/helpers - typeof"; return src_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, src_typeof(o); }
var _excluded = ["theme_config", "toolbar", "navbar", "value", "onChange", "getEditorRef", "mainProps", "placeholder", "image_handler", "handleFullScreen", "remove_from_toolbar", "remove_from_navbar", "style"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function src_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function src_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? src_ownKeys(Object(t), !0).forEach(function (r) { src_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : src_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function src_defineProperty(e, r, t) { return (r = src_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function src_toPropertyKey(t) { var i = src_toPrimitive(t, "string"); return "symbol" == src_typeof(i) ? i : i + ""; }
function src_toPrimitive(t, r) { if ("object" != src_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != src_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function src_slicedToArray(r, e) { return src_arrayWithHoles(r) || src_iterableToArrayLimit(r, e) || src_unsupportedIterableToArray(r, e) || src_nonIterableRest(); }
function src_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function src_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return src_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? src_arrayLikeToArray(r, a) : void 0; } }
function src_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function src_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function src_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
























var show_final_options = function show_final_options(options, remove, all_options) {
  if (!options) {
    options = all_options;
  }
  if (remove) {
    options = options.filter(function (item) {
      if (typeof item === "string") {
        return !remove.includes(item);
      } else {
        return !remove.includes(item.name);
      }
    });
    // remove | dublication
    options = options.filter(function (item, index) {
      return item !== "|" || index === 0 || options[index - 1] !== "|";
    });
  }
  return options;
};
var isValidURL = function isValidURL(str) {
  // Regular expression to check if the string is a valid URL
  var pattern = new RegExp("^(https?:\\/\\/)?" +
  // protocol
  "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
  // domain name
  "((\\d{1,3}\\.){3}\\d{1,3}))" +
  // OR ip (v4) address
  "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
  // port and path
  "(\\?[;&a-z\\d%_.~+=-]*)?" +
  // query string
  "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
  return pattern.test(str);
};
function ReactEditorKit(props) {
  var theme_config = props.theme_config,
    toolbar = props.toolbar,
    navbar = props.navbar,
    value = props.value,
    onChange = props.onChange,
    getEditorRef = props.getEditorRef,
    mainProps = props.mainProps,
    placeholder = props.placeholder,
    image_handler = props.image_handler,
    handleFullScreen = props.handleFullScreen,
    remove_from_toolbar = props.remove_from_toolbar,
    remove_from_navbar = props.remove_from_navbar,
    style = props.style,
    others = _objectWithoutProperties(props, _excluded);
  var editorRef = Object(external_react_["useRef"])(null);
  var _useState = Object(external_react_["useState"])(false),
    _useState2 = src_slicedToArray(_useState, 2),
    viewSource = _useState2[0],
    setViewSource = _useState2[1];
  var _useState3 = Object(external_react_["useState"])(false),
    _useState4 = src_slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = Object(external_react_["useState"])(false),
    _useState6 = src_slicedToArray(_useState5, 2),
    openPreview = _useState6[0],
    setOpenPreview = _useState6[1];
  var _useState7 = Object(external_react_["useState"])(false),
    _useState8 = src_slicedToArray(_useState7, 2),
    init = _useState8[0],
    setInit = _useState8[1];
  var _useState9 = Object(external_react_["useState"])(null),
    _useState10 = src_slicedToArray(_useState9, 2),
    sourceCode = _useState10[0],
    setSourceCode = _useState10[1];
  var _useState11 = Object(external_react_["useState"])(false),
    _useState12 = src_slicedToArray(_useState11, 2),
    isFullScreen = _useState12[0],
    setIsFullScreen = _useState12[1];
  var _useState13 = Object(external_react_["useState"])(""),
    _useState14 = src_slicedToArray(_useState13, 2),
    imageUrl = _useState14[0],
    setImageUrl = _useState14[1];
  var _useState15 = Object(external_react_["useState"])(""),
    _useState16 = src_slicedToArray(_useState15, 2),
    isOpenModel = _useState16[0],
    setIsOpenModel = _useState16[1];
  var _useState17 = Object(external_react_["useState"])(""),
    _useState18 = src_slicedToArray(_useState17, 2),
    previewContent = _useState18[0],
    setPreviewContent = _useState18[1];
  var _useState19 = Object(external_react_["useState"])({
      link: "",
      height: "",
      width: "",
      type: "general",
      text: "",
      open_new_tab: false
    }),
    _useState20 = src_slicedToArray(_useState19, 2),
    selectedData = _useState20[0],
    setSelectedData = _useState20[1];
  var _useState21 = Object(external_react_["useState"])({}),
    _useState22 = src_slicedToArray(_useState21, 2),
    selectedEvent = _useState22[0],
    setSelectedEvent = _useState22[1];
  var _useState23 = Object(external_react_["useState"])(true),
    _useState24 = src_slicedToArray(_useState23, 2),
    isPlaceholder = _useState24[0],
    setIsPlaceholder = _useState24[1];
  var _useState25 = Object(external_react_["useState"])({}),
    _useState26 = src_slicedToArray(_useState25, 2),
    selectedItem = _useState26[0],
    setSelectedItem = _useState26[1];
  var _useState27 = Object(external_react_["useState"])(null),
    _useState28 = src_slicedToArray(_useState27, 2),
    selectedRange = _useState28[0],
    setSelectedRange = _useState28[1];
  var _useState29 = Object(external_react_["useState"])(false),
    _useState30 = src_slicedToArray(_useState29, 2),
    showHR1 = _useState30[0],
    setShowHR1 = _useState30[1];
  var _useState31 = Object(external_react_["useState"])(false),
    _useState32 = src_slicedToArray(_useState31, 2),
    showHR2 = _useState32[0],
    setShowHR2 = _useState32[1];
  var _useState33 = Object(external_react_["useState"])(false),
    _useState34 = src_slicedToArray(_useState33, 2),
    showHR3 = _useState34[0],
    setShowHR3 = _useState34[1];
  var handleInput = function handleInput() {
    setInit(true);
    var content = editorRef.current.innerHTML;
    if (onChange) {
      onChange(content);
    }
  };
  var handleOpenModel = function handleOpenModel(e, type, item) {
    e.preventDefault();
    setIsOpenModel(type);
    setSelectedItem(item);
  };
  var handleCloseModel = function handleCloseModel(e) {
    if (e) {
      e.preventDefault();
    }
    setImageUrl("");
    setIsOpenModel("");
    setSelectedData({});
    setSelectedEvent({});
  };
  var handleSaveSource = function handleSaveSource(e) {
    e.preventDefault();
    if (editorRef.current) {
      editorRef.current.innerHTML = sourceCode;
      setViewSource(false);
      if (onChange) {
        onChange(sourceCode);
      }
    }
  };
  var handleSelectAll = function handleSelectAll(e) {
    e.preventDefault();
    var selection = window.getSelection();
    if (!selection.toString()) {
      var range = document.createRange();
      range.selectNodeContents(editorRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      selection.removeAllRanges();
    }
  };
  var handleInsertHRClick = function handleInsertHRClick() {
    handleFocusEditor();
    document.execCommand("insertHorizontalRule");
  };
  var handleFocusEditor = function handleFocusEditor() {
    var editor = editorRef.current;
    if (editor && selectedRange) {
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(selectedRange);
      editor.focus(); // Focus on the editor without inserting text
    }
  };
  var handleLinkInsert = function handleLinkInsert(props) {
    var text = props.text,
      link = props.link,
      open_new_tab = props.open_new_tab,
      link_type = props.link_type;
    if (!text) {
      text = link;
    }
    var linkHTML = "<a href=\"".concat(link, "\"");
    if (open_new_tab && open_new_tab !== "false") {
      linkHTML += ' target="_blank"';
    }
    if (link_type === "image" && imageUrl) {
      if (selectedEvent.tagName === "IMG") {
        var src = selectedEvent.src;
        if (src === imageUrl) {
          text = selectedEvent.outerHTML;
        } else {
          text = "<img src=\"".concat(imageUrl, "\" alt=\"ImageLink\" />");
        }
      } else if (selectedEvent.tagName === "A") {
        var childNode = selectedEvent.firstChild;
        if (childNode && childNode.nodeType === Node.ELEMENT_NODE && childNode.tagName === "IMG" && childNode.src === imageUrl) {
          text = childNode.outerHTML;
        } else {
          text = "<img src=\"".concat(imageUrl, "\" alt=\"ImageLink\" />");
        }
      } else {
        text = "<img src=\"".concat(imageUrl, "\" alt=\"ImageLink\" />");
      }
    } else if (link_type === "button") {
      text = "<button contentEditable=false>".concat(text, "</button>");
    }
    linkHTML += ">".concat(text, "</a>");

    // Assuming selectedEvent and selectedData are correctly defined elsewhere
    if (selectedEvent && selectedData) {
      var parentElement = selectedEvent.parentElement;
      if (parentElement) {
        parentElement.removeChild(selectedEvent);
      }
    }
    handleFocusEditor();
    document.execCommand("insertHTML", false, linkHTML);
    handleCloseModel();
  };
  var handleRemoveLink = function handleRemoveLink() {
    var linkHTML = "".concat(selectedEvent.textContent.trim());
    if (selectedEvent.tagName === "IMG") {
      linkHTML = "<img src=\"".concat(selectedEvent.src, "\" alt=\"ImageLink\" />");
    }
    if (selectedEvent) {
      var parentElement = selectedEvent.parentElement;
      if (parentElement) {
        parentElement.removeChild(selectedEvent);
      }
    }
    handleFocusEditor();
    document.execCommand("insertHTML", false, linkHTML);
    handleCloseModel();
  };
  var handleImageInsert = function handleImageInsert(data) {
    var link = data.link,
      height = data.height,
      width = data.width;
    if (selectedEvent && selectedData) {
      selectedEvent.src = link;
      selectedEvent.height = height;
      selectedEvent.width = width;
    } else {
      handleFocusEditor();
      var imgElement = "<img src=\"".concat(link, "\" alt=\"Image\"");
      if (height) {
        imgElement += " height=\"".concat(height, "\"");
      }
      if (width) {
        imgElement += " width=\"".concat(width, "\"");
      }
      imgElement += "/>";
      document.execCommand("insertHTML", false, imgElement);
    }
    setIsLoading(false);
    handleCloseModel();
  };
  var handleMediaInsert = function handleMediaInsert(data) {
    var link = data.link,
      height = data.height,
      width = data.width,
      type = data.type,
      embed_code = data.embed_code;
    var editorNode = editorRef.current;
    if (type === "general") {
      var iframeElement = "";

      // Check if it's a direct video link
      if (link.match(/\.(mp4|mov|avi|wmv)$/)) {
        iframeElement = "<video width=\"".concat(width || "640", "\" height=\"").concat(height || "360", "\" controls><source src=\"").concat(link, "\" type=\"video/mp4\"></video>");
      } else {
        // Check for specific video platforms
        var youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        var vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo.com\/(\d+)/;
        if (link.match(youtubeRegex)) {
          var videoId = link.match(youtubeRegex)[1];
          iframeElement = "<iframe width=\"".concat(width || "640", "\" height=\"").concat(height || "360", "\" src=\"https://www.youtube.com/embed/").concat(videoId, "\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>");
        } else if (link.match(vimeoRegex)) {
          var _videoId = link.match(vimeoRegex)[1];
          iframeElement = "<iframe src=\"https://player.vimeo.com/video/".concat(_videoId, "\" width=\"").concat(width || "640", "\" height=\"").concat(height || "360", "\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen></iframe>");
        } else {
          // Insert custom embed code if available
          iframeElement = embed_code || "";
        }
      }
      if (editorNode && iframeElement) {
        handleFocusEditor();
        document.execCommand("insertHTML", false, iframeElement);
      }
    } else if (type === "embed" && embed_code && editorNode) {
      handleFocusEditor();
      document.execCommand("insertHTML", false, embed_code);
    }
    setIsOpenModel(""); // Assuming this is setting some state related to the modal
  };
  var handlePrint = function handlePrint() {
    var data = editorRef.current.innerHTML;
    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.write(data);
    iframeDoc.close();
    iframe.contentWindow.print();
    setTimeout(function () {
      document.body.removeChild(iframe);
    }, 100);
  };
  var handleCharSelect = function handleCharSelect(e, _char) {
    e.preventDefault();
    if (editorRef.current !== null) {
      handleFocusEditor();
      document.execCommand("insertHTML", false, _char);
      setIsOpenModel("");
    }
  };
  var cleanHTML = function cleanHTML(html) {
    var cleanedHTML = html.replace(/style="[^"]*"/g, "");
    return cleanedHTML;
  };
  var onPaste = function onPaste(event) {
    event.preventDefault();
    navigator.clipboard.read().then(function (clipboardItems) {
      clipboardItems.forEach(function (item) {
        if (item.types.includes("image/png") || item.types.includes("image/jpeg")) {
          item.getType(item.types[0]).then(function (imageBlob) {
            var imgElement = "<img src=\"".concat(URL.createObjectURL(imageBlob), "\" alt=\"Image\">");
            document.execCommand("insertHTML", false, imgElement);
          })["catch"](function (error) {
            console.error("Error reading image content:", error);
          });
        } else if (item.types.includes("text/html")) {
          item.getType("text/html").then(function (htmlBlob) {
            htmlBlob.text().then(function (htmlContent) {
              var cleanedHTML = cleanHTML(htmlContent);
              var withoutComments = cleanedHTML.replace(/<!--[\s\S]*?-->/g, "");
              document.execCommand("insertHTML", false, withoutComments);
            })["catch"](function (error) {
              console.error("Error reading HTML content:", error);
            });
          })["catch"](function (error) {
            console.error("Error getting HTML type from ClipboardItem:", error);
          });
        } else if (item.types.includes("text/plain")) {
          item.getType("text/plain").then(function (textBlob) {
            textBlob.text().then(function (text) {
              if (isValidURL(text)) {
                // Insert the URL as a link
                var linkElement = "<a href=\"".concat(text, "\" target=\"_blank\">").concat(text, "</a>");
                document.execCommand("insertHTML", false, linkElement);
              } else {
                // Insert plain text
                document.execCommand("insertText", false, text);
              }
            })["catch"](function (error) {
              console.error("Error reading text content:", error);
            });
          })["catch"](function (error) {
            console.error("Error getting text type from ClipboardItem:", error);
          });
        }
      });
    })["catch"](function (error) {
      console.error("Error reading clipboard:", error);
    });
  };
  var handleBlur = function handleBlur() {
    handleSelection();
  };
  var handleNewDocument = function handleNewDocument() {
    editorRef.current.innerHTML = "";
  };
  var handlePreview = function handlePreview() {
    setPreviewContent(editorRef.current.innerHTML);
    setOpenPreview(true);
  };
  var handleViewSource = function handleViewSource() {
    if (!viewSource && editorRef.current) {
      var content = editorRef.current.innerHTML;
      var formattedContent = transformHTML(content);
      setSourceCode(formattedContent);
    } else {
      setSourceCode("");
    }
    setViewSource(!viewSource);
  };
  var toggleFullScreen = function toggleFullScreen() {
    setIsFullScreen(!isFullScreen);
  };
  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === "Escape") {
      setIsFullScreen(false);
    }
  };
  var handlePlaceholder = function handlePlaceholder() {
    var editor = editorRef.current;
    if (!editor) {
      return;
    }
    if (editor.innerText.trim() === "") {
      editor.classList.add("empty");
      setIsPlaceholder(true);
    } else {
      editor.classList.remove("empty");
      setIsPlaceholder(false);
    }
  };
  var handleSelection = function handleSelection() {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSelectedRange(selection.getRangeAt(0));
    }
  };
  var restoreSelection = function restoreSelection() {
    if (selectedRange) {
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(selectedRange);
    }
  };
  Object(external_react_["useEffect"])(function () {
    var handleFullScreenChange = function handleFullScreenChange() {
      setIsFullScreen(document.fullscreenElement !== null);
    };
    handlePlaceholder();
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("input", handlePlaceholder);
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return function () {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("input", handlePlaceholder);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);
  var model_component = function model_component() {
    if (isOpenModel === "link") {
      return {
        component: /*#__PURE__*/external_react_default.a.createElement(LinkModal, {
          onLinkInsert: handleLinkInsert,
          item: selectedItem,
          setIsOpenModel: setIsOpenModel,
          selectedData: selectedData,
          imageUrl: imageUrl,
          setImageUrl: setImageUrl,
          image_handler: image_handler,
          setIsLoading: setIsLoading
        }),
        title: "".concat(selectedData !== null && selectedData !== void 0 && selectedData.link ? "Update" : "Insert", " Link")
      };
    } else if (isOpenModel === "image") {
      return {
        component: /*#__PURE__*/external_react_default.a.createElement(ImageModal, {
          onImageInsert: handleImageInsert,
          item: selectedItem,
          setIsLoading: setIsLoading,
          setIsOpenModel: setIsOpenModel,
          image_handler: image_handler,
          selectedData: selectedData
        }),
        title: "".concat(selectedData !== null && selectedData !== void 0 && selectedData.link ? "Update" : "Insert", " Image")
      };
    } else if (isOpenModel === "video") {
      return {
        component: /*#__PURE__*/external_react_default.a.createElement(MediaModal, {
          onMediaInsert: handleMediaInsert
        }),
        title: "".concat(selectedData !== null && selectedData !== void 0 && selectedData.link ? "Update" : "Insert", " Video")
      };
    } else if (isOpenModel === "special_char") {
      return {
        component: /*#__PURE__*/external_react_default.a.createElement(SpecialChars, {
          handleCharSelect: handleCharSelect
        }),
        title: "Insert Special Characters"
      };
    }
  };
  if (theme_config && Object.keys(theme_config).length > 0) {
    Object.keys(theme_config).forEach(function (key, index) {
      document.documentElement.style.setProperty("--editor-".concat(key), theme_config[key]);
    });
  }
  toolbar = show_final_options(toolbar, remove_from_toolbar, TOOLBAR_ITEMS);
  navbar = show_final_options(navbar, remove_from_navbar, NAVBAR_ITEMS);
  Object(external_react_["useEffect"])(function () {
    if (!init) {
      if (editorRef.current && value) {
        editorRef.current.innerHTML = value;
        setInit(true);
      }
    }
    if (getEditorRef) {
      getEditorRef(editorRef);
    }
  }, [isFullScreen, editorRef, value]);
  var handlePaste = function handlePaste(e) {
    e.preventDefault();
    if (!editorRef.current) {
      setTimeout(function () {
        editorRef.current.focus();
      }, 0);
    } else {
      restoreSelection();
    }
    navigator.clipboard.read().then(function (clipboardItems) {
      clipboardItems.forEach(function (item) {
        if (item.types.includes("image/png") || item.types.includes("image/jpeg")) {
          item.getType(item.types[0]).then(function (imageBlob) {
            var imgElement = "<img src=\"".concat(URL.createObjectURL(imageBlob), "\" alt=\"Image\">");
            document.execCommand("insertHTML", false, imgElement);
          })["catch"](function (error) {
            console.error("Error reading image content:", error);
          });
        } else if (item.types.includes("text/html")) {
          item.getType("text/html").then(function (htmlBlob) {
            htmlBlob.text().then(function (htmlContent) {
              var cleanedHTML = cleanHTML(htmlContent);
              var withoutComments = cleanedHTML.replace(/<!--[\s\S]*?-->/g, "");
              document.execCommand("insertHTML", false, withoutComments);
            })["catch"](function (error) {
              console.error("Error reading HTML content:", error);
            });
          })["catch"](function (error) {
            console.error("Error getting HTML type from ClipboardItem:", error);
          });
        } else if (item.types.includes("text/plain")) {
          item.getType("text/plain").then(function (textBlob) {
            textBlob.text().then(function (text) {
              if (isValidURL(text)) {
                // Insert the URL as a link
                var linkElement = "<a href=\"".concat(text, "\" target=\"_blank\">").concat(text, "</a>");
                document.execCommand("insertHTML", false, linkElement);
              } else {
                // Insert plain text
                document.execCommand("insertText", false, text);
              }
            })["catch"](function (error) {
              console.error("Error reading text content:", error);
            });
          })["catch"](function (error) {
            console.error("Error getting text type from ClipboardItem:", error);
          });
        }
      });
    })["catch"](function (error) {
      console.error("Error reading clipboard:", error);
    });
  };
  var handle_resize = function handle_resize() {
    var hr_1 = document.getElementsByClassName("wysiwyg-editor__toolbar")[0];
    setShowHR1(hr_1.offsetHeight > 34);
    var hr_2 = document.getElementsByClassName("wysiwyg-editor__toolbar")[1];
    setShowHR2(hr_2.offsetHeight > 34);
    setShowHR3(hr_2.offsetHeight > 65);
  };
  var setCursorAtStart = function setCursorAtStart() {
    var editor = editorRef.current;
    if (editor) {
      var range = document.createRange();
      if (editor.childNodes.length > 0) {
        range.setStart(editor.childNodes[0], 0);
      } else {
        range.setStart(editor, 0);
      }
      range.collapse(true);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      // Update selectedRange state
      setSelectedRange(range);
    }
  };
  var handleMouseDown = function handleMouseDown(e, left) {
    e.preventDefault();
    var startX = e.clientX;
    var element = document.querySelector(".resize-image-wrapper");
    var image_element = document.querySelector(".resizer-image");
    var startWidth = parseFloat(element.style.width);
    var startHeight = parseFloat(element.style.height);
    console.log(startHeight, "startHeight");
    if (isNaN(startHeight)) {
      startHeight = parseFloat(getComputedStyle(element).height);
    }
    if (isNaN(startWidth)) {
      startWidth = parseFloat(getComputedStyle(element).width);
    }
    console.log(startHeight, "startHeight---1");
    var heightRatio = startHeight / startWidth;
    console.log(heightRatio, "heightRatio---1");
    var handleMouseMove = function handleMouseMove(e) {
      var newWidth = startWidth + (e.clientX - startX);
      if (left) {
        newWidth = startWidth - (e.clientX - startX);
      }
      var width = newWidth > 50 ? newWidth : 50;
      var height = heightRatio * width;
      height = Math.round(height);
      width = Math.round(width);
      element.style.width = "".concat(width, "px");
      image_element.style.width = "".concat(width, "px");
      element.style.height = "".concat(height, "px");
      image_element.style.height = "".concat(height, "px");
    };
    var handleMouseUp = function handleMouseUp() {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  var handleClickImage = function handleClickImage(event) {
    if (event.target.tagName === "IMG") {
      var hasClass = event.target.parentElement.classList.contains("resize-image-wrapper");
      if (hasClass) return;
      var imgElement = event.target;
      var imageWidth = imgElement.offsetWidth;
      var divElement = document.createElement("div");
      divElement.style.display = "inline-block";
      divElement.style.width = "".concat(imageWidth, "px");
      divElement.classList.add("resize-image-wrapper");
      var resizer = document.createElement("div");
      resizer.classList.add("resizer");
      resizer.onmousedown = handleMouseDown;
      var resizerRight = document.createElement("div");
      resizerRight.classList.add("resizer", "top-right");
      resizerRight.onmousedown = handleMouseDown;
      var resizerBottom = document.createElement("div");
      resizerBottom.classList.add("resizer", "bottom-left");
      resizerBottom.onmousedown = function (e) {
        return handleMouseDown(e, "left");
      };
      var resizerBottomRight = document.createElement("div");
      resizerBottomRight.classList.add("resizer", "top-left");
      resizerBottomRight.onmousedown = function (e) {
        return handleMouseDown(e, "left");
      };
      imgElement.classList.add("resizer-image");
      var clonedImgElement = imgElement.cloneNode(true);
      divElement.appendChild(clonedImgElement);
      divElement.appendChild(resizer);
      divElement.appendChild(resizerRight);
      divElement.appendChild(resizerBottom);
      divElement.appendChild(resizerBottomRight);
      setSelectedEvent(divElement);
      imgElement.parentNode.replaceChild(divElement, imgElement);
    } else {
      var target = event.target.classList.contains("resize-image-wrapper");
      var _hasClass = event.target.parentElement.classList.contains("resize-image-wrapper");
      if (!target && !_hasClass) {
        remove_resizer();
      }
    }
  };
  Object(external_react_["useEffect"])(function () {
    handle_resize();
    setCursorAtStart();
    var editor = editorRef.current;
    if (editor) {
      editor.addEventListener("click", handleClickImage);
      editor.addEventListener("mouseup", handleSelection);
      editor.addEventListener("keyup", handleSelection);
    }
    window.addEventListener("resize", handle_resize);
    return function () {
      window.removeEventListener("resize", handle_resize);
      if (editor) {
        editor.removeEventListener("click", handleClickImage);
        editor.removeEventListener("mouseup", handleSelection);
        editor.removeEventListener("keyup", handleSelection);
      }
    };
  }, [editorRef]);
  Object(external_react_["useEffect"])(function () {
    if (isFullScreen || isOpenModel || viewSource || openPreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isFullScreen, isOpenModel, viewSource, openPreview]);
  var dynamicStyle = isFullScreen && document.getElementById("action-components") ? {
    height: "calc(100vh - ".concat(document.getElementById("action-components").offsetHeight, "px - 22px)")
  } : {};
  console.log(selectedEvent, "selectedEventselectedEvent");
  return /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Fragment, null, /*#__PURE__*/external_react_default.a.createElement("div", _extends({}, mainProps, {
    className: "react-editor-main ".concat(isFullScreen ? "full-screen" : ""),
    id: "react-editor"
  }), /*#__PURE__*/external_react_default.a.createElement("div", {
    id: "action-components"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "wysiwyg-editor__toolbar",
    id: "editor-navbar"
  }, /*#__PURE__*/external_react_default.a.createElement("hr", {
    className: "hr-1",
    style: {
      display: showHR1 ? "block" : "none"
    }
  }), navbar.map(function (item, index) {
    var is_line = Boolean(item === "|");
    var is_file = item === "file" || item.name === "file";
    var is_view = item === "view" || item.name === "view";
    var is_format = item === "format" || item.name === "format";
    var is_insert = item === "insert" || item.name === "insert";
    var is_copy = item === "copy" || item.name === "copy";
    var is_cut = item === "cut" || item.name === "cut";
    var is_paste = item === "paste" || item.name === "paste";
    var is_select_all = item === "select_all" || item.name === "select_all";
    var is_image = item === "image" || item.name === "image";
    var is_link = item === "link" || item.name === "link";
    var is_video = item === "video" || item.name === "video";
    return /*#__PURE__*/external_react_default.a.createElement("div", {
      key: "key".concat(index)
    }, is_line && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "vertical-line"
    }), is_file && /*#__PURE__*/external_react_default.a.createElement(SelectFileOptions_SelectFileOptions, {
      handleNewDocument: handleNewDocument,
      handlePreview: handlePreview,
      handlePrint: handlePrint,
      item: item,
      remove_from_navbar: remove_from_navbar
    }), is_view && /*#__PURE__*/external_react_default.a.createElement(SelectView_SelectFileOptions, {
      isFullScreen: isFullScreen,
      handleViewSource: handleViewSource,
      toggleFullScreen: toggleFullScreen,
      item: item,
      isPlaceholder: isPlaceholder,
      placeholder: placeholder,
      value: value,
      remove_from_navbar: remove_from_navbar
    }), is_insert && /*#__PURE__*/external_react_default.a.createElement(SelectFileOptions, {
      onSelectOption: handleOpenModel,
      handleInsertHR: handleInsertHRClick,
      item: item,
      remove_from_navbar: remove_from_navbar
    }), is_format && /*#__PURE__*/external_react_default.a.createElement(SelectFormations_SelectFileOptions, {
      item: item,
      isFullScreen: isFullScreen,
      remove_from_navbar: remove_from_navbar,
      editorRef: editorRef
    }), is_select_all && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "increase-icon-size"
    }, /*#__PURE__*/external_react_default.a.createElement("button", {
      onClick: handleSelectAll,
      title: item !== null && item !== void 0 && item.title ? item.title : "Select All",
      disabled: isPlaceholder && placeholder && !value
    }, item !== null && item !== void 0 && item.icon ? item.icon : /*#__PURE__*/external_react_default.a.createElement(SelectAll, null))), is_image && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "increase-icon-size"
    }, /*#__PURE__*/external_react_default.a.createElement("button", {
      onClick: function onClick(e) {
        return handleOpenModel(e, "image", item);
      },
      title: item !== null && item !== void 0 && item.title ? item.title : "Upload Image"
    }, item !== null && item !== void 0 && item.icon ? item.icon : /*#__PURE__*/external_react_default.a.createElement(ImageIcon, null))), is_link && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "increase-icon-size"
    }, /*#__PURE__*/external_react_default.a.createElement("button", {
      onClick: function onClick(e) {
        return handleOpenModel(e, "link", item);
      },
      title: item !== null && item !== void 0 && item.title ? item.title : "Add Link"
    }, item !== null && item !== void 0 && item.icon ? item.icon : /*#__PURE__*/external_react_default.a.createElement(LinkIcon, null))), is_video && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "increase-icon-size"
    }, /*#__PURE__*/external_react_default.a.createElement("button", {
      onClick: function onClick(e) {
        return handleOpenModel(e, "video", item);
      },
      title: item !== null && item !== void 0 && item.title ? item.title : "Upload Video"
    }, item !== null && item !== void 0 && item.icon ? item.icon : /*#__PURE__*/external_react_default.a.createElement(VideoIcon, null))), is_copy && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "increase-icon-size"
    }, /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "copy",
      icon: /*#__PURE__*/external_react_default.a.createElement(CopyIcon, null),
      title: "Copy",
      item: item,
      disabled: isPlaceholder && placeholder && !value
    })), is_cut && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "increase-icon-size"
    }, /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "cut",
      icon: /*#__PURE__*/external_react_default.a.createElement(CutIcon, null),
      title: "Cut",
      item: item,
      disabled: isPlaceholder && placeholder && !value
    })), is_paste && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "increase-icon-size"
    }, /*#__PURE__*/external_react_default.a.createElement("button", {
      onClick: handlePaste,
      title: item !== null && item !== void 0 && item.title ? item.title : "Paste"
    }, item !== null && item !== void 0 && item.icon ? item.icon : /*#__PURE__*/external_react_default.a.createElement(PasteIcon, null))));
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "wysiwyg-editor__toolbar"
  }, /*#__PURE__*/external_react_default.a.createElement("hr", {
    className: "hr-1",
    style: {
      display: showHR2 ? "block" : "none"
    }
  }), /*#__PURE__*/external_react_default.a.createElement("hr", {
    className: "hr-1 hr-2",
    style: {
      display: showHR3 ? "block" : "none"
    }
  }), toolbar.map(function (item, index) {
    var is_line = Boolean(item === "|");
    var is_undo = item === "undo" || item.name === "undo";
    var is_redo = item === "redo" || item.name === "redo";
    var is_bold = item === "bold" || item.name === "bold";
    var is_italic = item === "italic" || item.name === "italic";
    var is_underline = item === "underline" || item.name === "underline";
    var is_superscript = item === "superscript" || item.name === "superscript";
    var is_subscript = item === "subscript" || item.name === "subscript";
    var is_alignLeft = item === "alignLeft" || item.name === "alignLeft";
    var is_alignCenter = item === "alignCenter" || item.name === "alignCenter";
    var is_alignRight = item === "alignRight" || item.name === "alignRight";
    var is_alignJustify = item === "alignJustify" || item.name === "alignJustify";
    var is_indent = item === "indent" || item.name === "indent";
    var is_outdent = item === "outdent" || item.name === "outdent";
    var is_orderedList = item === "orderedList" || item.name === "orderedList";
    var is_unorderedList = item === "unorderedList" || item.name === "unorderedList";
    var is_removeFormat = item === "removeFormat" || item.name === "removeFormat";
    var is_textColor = item === "textColor" || item.name === "textColor";
    var is_backgroundColor = item === "backgroundColor" || item.name === "backgroundColor";
    var is_ltr = item === "ltr" || item.name === "ltr";
    var is_rtl = item === "rtl" || item.name === "rtl";
    var is_format = item === "format" || item.name === "format";
    return /*#__PURE__*/external_react_default.a.createElement("div", {
      key: "key".concat(index)
    }, is_line && /*#__PURE__*/external_react_default.a.createElement("div", {
      className: "vertical-line"
    }), is_undo && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "undo",
      icon: /*#__PURE__*/external_react_default.a.createElement(UndoIcon, null),
      title: item.title ? item.title : "Undo",
      item: item
    }), is_redo && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "redo",
      icon: /*#__PURE__*/external_react_default.a.createElement(RedoIcon, null),
      title: "Redo",
      item: item
    }), is_format && /*#__PURE__*/external_react_default.a.createElement(components_SelectFormat, {
      remove_from_toolbar: remove_from_toolbar,
      editorRef: editorRef
    }), is_bold && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "bold",
      icon: /*#__PURE__*/external_react_default.a.createElement(BoldIcon, null),
      title: "Bold",
      item: item
    }), is_italic && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "italic",
      icon: /*#__PURE__*/external_react_default.a.createElement(ItalicIcon, null),
      title: "Italic",
      item: item
    }), is_underline && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "underline",
      icon: /*#__PURE__*/external_react_default.a.createElement(UnderlineIcon, null),
      title: "Underline",
      item: item
    }), is_superscript && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "superscript",
      icon: /*#__PURE__*/external_react_default.a.createElement(SuperscriptIcon, null),
      title: "Superscript",
      item: item
    }), is_subscript && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "subscript",
      icon: /*#__PURE__*/external_react_default.a.createElement(SubscriptIcon, null),
      title: "Subscript",
      item: item
    }), is_alignLeft && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "justifyLeft",
      icon: /*#__PURE__*/external_react_default.a.createElement(AlignLeft, null),
      title: "Align Left",
      item: item
    }), is_alignCenter && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "justifyCenter",
      icon: /*#__PURE__*/external_react_default.a.createElement(AlignCenter, null),
      title: "Align Center",
      item: item
    }), is_alignRight && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "justifyRight",
      icon: /*#__PURE__*/external_react_default.a.createElement(AlignRight, null),
      title: "Align Right",
      item: item
    }), is_alignJustify && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "justifyFull",
      icon: /*#__PURE__*/external_react_default.a.createElement(AlignJustify, null),
      title: "Align Justify",
      item: item
    }), is_indent && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "indent",
      icon: /*#__PURE__*/external_react_default.a.createElement(IncreaseIndentIcon, null),
      title: "Increase IndentIcon",
      item: item
    }), is_outdent && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "outdent",
      icon: /*#__PURE__*/external_react_default.a.createElement(DecreaseIndentIcon, null),
      title: "Decrease IndentIcon",
      item: item
    }), is_orderedList && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "insertOrderedList",
      icon: /*#__PURE__*/external_react_default.a.createElement(OrderdList, null),
      title: "Insert/Remove Numbered List",
      item: item
    }), is_unorderedList && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "insertUnorderedList",
      icon: /*#__PURE__*/external_react_default.a.createElement(UnorderdList, null),
      title: "Insert/Remove Bulleted List",
      item: item
    }), is_removeFormat && /*#__PURE__*/external_react_default.a.createElement(components_ButtonFunction, {
      editorRef: editorRef,
      name: "removeFormat",
      icon: /*#__PURE__*/external_react_default.a.createElement(ClearFormatting, null),
      title: "Remove Format",
      item: item
    }), is_textColor && /*#__PURE__*/external_react_default.a.createElement(ManageColors, {
      type: "foreColor",
      title: "Text Color",
      item: item,
      editorRef: editorRef
    }), is_backgroundColor && /*#__PURE__*/external_react_default.a.createElement(ManageColors, {
      type: "hiliteColor",
      title: "Background Color",
      item: item,
      editorRef: editorRef
    }), is_ltr && /*#__PURE__*/external_react_default.a.createElement(SimpleButton, {
      name: "ltr",
      title: "Left To Right",
      item: item,
      icon: /*#__PURE__*/external_react_default.a.createElement(LTRIcon, null),
      editorRef: editorRef
    }), is_rtl && /*#__PURE__*/external_react_default.a.createElement(SimpleButton, {
      name: "rtl",
      title: "Right To Left",
      item: item,
      icon: /*#__PURE__*/external_react_default.a.createElement(RTLIcon, null),
      editorRef: editorRef
    }));
  }))), /*#__PURE__*/external_react_default.a.createElement("div", _extends({}, others, {
    className: "ml-main-content-box print-only ",
    autoFocus: isFullScreen,
    contentEditable: true,
    ref: editorRef,
    onPaste: onPaste,
    spellCheck: "true",
    onInput: handleInput,
    onBlur: handleBlur,
    "data-placeholder": placeholder,
    id: "editable",
    style: src_objectSpread(src_objectSpread({}, style), dynamicStyle)
  }))), isLoading && /*#__PURE__*/external_react_default.a.createElement(components_ViewLoadingModel, {
    viewSource: viewSource,
    setViewSource: setViewSource,
    sourceCode: sourceCode,
    setSourceCode: setSourceCode,
    handleSaveSource: handleSaveSource
  }), isOpenModel && /*#__PURE__*/external_react_default.a.createElement(Model, {
    isOpen: isOpenModel,
    onClose: handleCloseModel,
    title: model_component().title
  }, model_component().component), viewSource && /*#__PURE__*/external_react_default.a.createElement(ViewSourceModal, {
    viewSource: viewSource,
    setViewSource: setViewSource,
    sourceCode: sourceCode,
    setSourceCode: setSourceCode,
    handleSaveSource: handleSaveSource
  }), openPreview && /*#__PURE__*/external_react_default.a.createElement(PreviewModel, {
    openPreview: openPreview,
    setOpenPreview: setOpenPreview,
    previewContent: previewContent
  }), /*#__PURE__*/external_react_default.a.createElement(components_RightClickLinkPopup, {
    editorRef: editorRef,
    setIsOpenModel: setIsOpenModel,
    setSelectedData: setSelectedData,
    setSelectedEvent: setSelectedEvent,
    setImageUrl: setImageUrl,
    selectedEvent: selectedEvent,
    handleRemoveLink: handleRemoveLink,
    selectedRange: selectedRange
  }), /*#__PURE__*/external_react_default.a.createElement("div", {
    id: "modal-root"
  }), /*#__PURE__*/external_react_default.a.createElement("div", {
    id: "full-screen-overlay"
  }));
}

/***/ })
/******/ ]);