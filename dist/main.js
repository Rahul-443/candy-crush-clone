/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n\n  if (!url) {\n    return url;\n  }\n\n  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/index.js\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var grid = document.querySelector('.grid');\n  var width = 8;\n  var squares = [];\n  var score = 0;\n  var movesLeft = 30;\n  var chancesLeft = 5;\n  var scoreBar = document.getElementById('score');\n  var zanyBar = document.getElementById('progress-front');\n  var chanceBar = document.getElementById('chance-bar');\n  var cbLights = chanceBar.getElementsByClassName('chnc');\n  var cbLen = cbLights.length;\n  var gumballs = ['bop', 'bud', 'chum', 'clunk', 'dapp', 'eke'];\n  var randomImg = getRandImg();\n  var lastImg = gumballs[randomImg];\n\n  function createBoard() {\n    for (var i = 0; i < width * width; i++) {\n      createCell(i);\n    }\n  }\n\n  function getRandImg() {\n    return Math.floor(Math.random() * gumballs.length);\n  }\n\n  function createCell(i) {\n    randomImg = getRandImg();\n\n    if (i > 8) {\n      if (gumballs[randomImg] != document.getElementById(i - 2).getElementsByTagName('img')[0].getAttribute('alt') && gumballs[randomImg] != document.getElementById(i - 8).getElementsByTagName('img')[0].getAttribute('alt')) {\n        generateCell(i);\n      } else {\n        createCell(i);\n      }\n    } else {\n      if (gumballs[randomImg] != lastImg) {\n        generateCell(i);\n      } else {\n        createCell(i);\n      }\n    }\n  }\n\n  function generateCell(i) {\n    var square = document.createElement('div');\n    square.setAttribute('draggable', true);\n    square.setAttribute('id', i);\n    square.innerHTML = \"<img class=\\\"img-gumball\\\" src=\\\"./imgs/\".concat(gumballs[randomImg], \".png\\\" alt=\\\"\").concat(gumballs[randomImg], \"\\\" />\");\n    lastImg = gumballs[randomImg];\n    grid.appendChild(square);\n    squares.push(square);\n  }\n\n  createBoard();\n  var squareIdBeingDragged;\n  var squareIdBeingReplaced;\n  var imgBeingDragged;\n  var imgBeingReplaced;\n  var ibrAlt;\n  var ibdAlt;\n  squares.forEach(function (square) {\n    return square.addEventListener('dragstart', dragStart);\n  });\n  squares.forEach(function (square) {\n    return square.addEventListener('dragend', dragEnd);\n  });\n  squares.forEach(function (square) {\n    return square.addEventListener('dragover', dragOver);\n  });\n  squares.forEach(function (square) {\n    return square.addEventListener('dragenter', dragEnter);\n  });\n  squares.forEach(function (square) {\n    return square.addEventListener('dragleave', dragLeave);\n  });\n  squares.forEach(function (square) {\n    return square.addEventListener('drop', drop);\n  });\n\n  function dragStart() {\n    imgBeingDragged = this.querySelector('.img-gumball').getAttribute('src');\n    ibdAlt = this.querySelector('.img-gumball').getAttribute('alt');\n    squareIdBeingDragged = parseInt(this.id);\n    console.log(this.id, 'dragstart');\n  }\n\n  function dragOver(e) {\n    e.preventDefault();\n    console.log(this.id, 'dragover');\n  }\n\n  function dragEnter(e) {\n    e.preventDefault();\n    console.log(this.id, 'dragenter');\n  }\n\n  function dragLeave() {\n    console.log(this.id, 'dragleave');\n  }\n\n  function drop(e) {\n    e.preventDefault();\n    squareIdBeingReplaced = parseInt(this.id);\n    imgBeingReplaced = this.querySelector('.img-gumball').getAttribute('src');\n    ibrAlt = this.querySelector('.img-gumball').getAttribute('alt');\n    var validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width];\n    var invalidMove = false;\n    var invalidSquareId;\n\n    if (squareIdBeingDragged === squareIdBeingReplaced - 1 || squareIdBeingDragged === squareIdBeingReplaced + 1) {\n      if (squareIdBeingDragged % 8 === 0 && squareIdBeingReplaced < squareIdBeingDragged) {\n        invalidSquareId = squareIdBeingDragged;\n      } else if (squareIdBeingReplaced % 8 === 0 && squareIdBeingDragged < squareIdBeingReplaced) {\n        invalidSquareId = squareIdBeingReplaced;\n      }\n    }\n\n    if (invalidSquareId) {\n      if ((squareIdBeingDragged === 0 || squareIdBeingReplaced === 0) && (squareIdBeingDragged === squareIdBeingReplaced - 1 || squareIdBeingDragged === squareIdBeingReplaced + 1)) {\n        invalidMove = false;\n      } else {\n        invalidMove = true;\n      }\n    }\n\n    var validMove = validMoves.includes(squareIdBeingReplaced);\n\n    if ((squareIdBeingReplaced || imgBeingDragged) && validMove && !invalidMove) {\n      console.log(0);\n      squares[squareIdBeingDragged].innerHTML = \"<img class=\\\"img-gumball\\\" src=\\\"\".concat(imgBeingReplaced, \"\\\" alt=\\\"\").concat(ibrAlt, \"\\\" />\");\n      squares[squareIdBeingReplaced].innerHTML = \"<img class=\\\"img-gumball\\\" src=\\\"\".concat(imgBeingDragged, \"\\\" alt=\\\"\").concat(ibdAlt, \"\\\" />\");\n      checkForMatch();\n      squareIdBeingReplaced = null;\n      imgBeingDragged = null;\n    } else if ((squareIdBeingReplaced || imgBeingReplaced) && (!validMove || invalidMove)) {\n      console.log(1);\n      squares[squareIdBeingDragged].innerHTML = \"<img class=\\\"img-gumball\\\" src=\\\"\".concat(imgBeingDragged, \"\\\" alt=\\\"\").concat(ibdAlt, \"\\\" />\");\n      squares[squareIdBeingReplaced].innerHTML = \"<img class=\\\"img-gumball\\\" src=\\\"\".concat(imgBeingReplaced, \"\\\" alt=\\\"\").concat(ibrAlt, \"\\\" />\");\n    } else {\n      console.log(2);\n      squares[squareIdBeingDragged].innerHTML = \"<img class=\\\"img-gumball\\\" src=\\\"\".concat(imgBeingDragged, \"\\\" alt=\\\"\").concat(ibdAlt, \"\\\" />\");\n    }\n\n    movesLeft -= 1;\n    var movesLeftText = document.getElementById('moves-left');\n\n    if (movesLeft >= 0) {\n      movesLeftText.textContent = movesLeft.toString();\n    } else {\n      chancesLeft -= 1;\n\n      if (chancesLeft > 0) {\n        var gameResTime = 5;\n        var chancesLeftTexts = document.getElementsByClassName('chances-left');\n        var interval = document.getElementById('interval');\n        console.log(chancesLeftTexts);\n\n        _toConsumableArray(chancesLeftTexts).forEach(function (element) {\n          element.textContent = chancesLeft.toString();\n        });\n\n        cbLights[cbLen - 1].style.display = 'none';\n        cbLen--;\n        interval.style.display = 'grid';\n        var timer = document.getElementById('timer');\n        timer.textContent = gameResTime;\n        var gameResTimer = window.setInterval(function () {\n          if (gameResTime > 0) {\n            gameResTime--;\n            timer.textContent = gameResTime.toString();\n          } else {\n            interval.style.display = 'none';\n            movesLeft = 30;\n            resetScore();\n            movesLeftText.textContent = movesLeft.toString();\n            clearInterval(gameResTimer);\n          }\n        }, 1000);\n      } else {\n        alert('game over');\n        location.reload();\n      }\n    }\n\n    console.log(this.id, 'drop'); // TODO: Bug - if gb can fit in pattern it gets dropped;\n  }\n\n  function dragEnd() {\n    console.log(this.id, 'dragend');\n  }\n\n  function moveGbDown() {\n    for (var i = 0; i <= 63; i++) {\n      if (squares[i].querySelector('.img-gumball').getAttribute('src') === './imgs/transparent.png') {\n        if (i >= 8) {\n          squares[i].innerHTML = squares[i - width].innerHTML;\n          squares[i - width].innerHTML = \"<img src=\\\"./imgs/transparent.png\\\" class=\\\"img-gumball\\\" alt=\\\"\\\" />\";\n        } else if (i <= 7) {\n          var randImg = getRandImg();\n          squares[i].innerHTML = \"<img src=\\\"./imgs/\".concat(gumballs[randImg], \".png\\\" class=\\\"img-gumball\\\" alt=\\\"\").concat(gumballs[randImg], \"\\\" />\");\n        }\n      }\n    }\n  }\n\n  function checkForRowOfThree(i) {\n    var _loop = function _loop(_i) {\n      var rowOfThree = [_i, _i + 1, _i + 2];\n\n      var decidedGumball = squares[_i].querySelector('.img-gumball').getAttribute('alt');\n\n      var isBlank = squares[_i].querySelector('.img-gumball').getAttribute('alt') === '';\n\n      if (!((rowOfThree[0] + 1) % 8 === 0 || (rowOfThree[1] + 1) % 8 === 0)) {\n        if (rowOfThree.every(function (index) {\n          return squares[index].querySelector('.img-gumball').getAttribute('alt') === decidedGumball && !isBlank;\n        })) {\n          setScore(3);\n          rowOfThree.forEach(function (index) {\n            squares[index].innerHTML = '<img src=\"./imgs/transparent.png\" class=\"img-gumball\" alt=\"\" />';\n          });\n        }\n      }\n    };\n\n    for (var _i = 0; _i <= 61; _i++) {\n      _loop(_i);\n    }\n  }\n\n  function checkForColumnOfThree() {\n    var _loop2 = function _loop2(i) {\n      var columnOfThree = [i, i - 8, i + 8];\n      var decidedGumball = squares[i].querySelector('.img-gumball').getAttribute('alt');\n      var isBlank = squares[i].querySelector('.img-gumball').getAttribute('alt') === '';\n\n      if (columnOfThree.every(function (index) {\n        return squares[index].querySelector('.img-gumball').getAttribute('alt') === decidedGumball && !isBlank;\n      })) {\n        setScore(3);\n        columnOfThree.forEach(function (index) {\n          squares[index].innerHTML = '<img src=\"./imgs/transparent.png\" class=\"img-gumball\" alt=\"\" />';\n        });\n      }\n    };\n\n    for (var i = 8; i <= 55; i++) {\n      _loop2(i);\n    }\n  }\n\n  function checkForRowOfFour() {\n    var _loop3 = function _loop3(i) {\n      var rowOfFour = [i, i + 1, i + 2, i + 3];\n      var decidedGumball = squares[i].querySelector('.img-gumball').getAttribute('alt');\n      var isBlank = squares[i].querySelector('.img-gumball').getAttribute('alt') === '';\n\n      if (!((rowOfFour[0] + 1) % 8 === 0 || (rowOfFour[1] + 1) % 8 === 0 || (rowOfFour[2] + 1) % 8 === 0)) {\n        if (rowOfFour.every(function (index) {\n          return squares[index].querySelector('.img-gumball').getAttribute('alt') === decidedGumball && !isBlank;\n        })) {\n          setScore(4);\n          rowOfFour.forEach(function (index) {\n            squares[index];\n            squares[index].innerHTML = '<img src=\"./imgs/transparent.png\" class=\"img-gumball\" alt=\"\" />';\n          });\n        }\n      }\n    };\n\n    for (var i = 0; i <= 60; i++) {\n      _loop3(i);\n    }\n  }\n\n  function checkForColumnOfFour() {\n    var _loop4 = function _loop4(i) {\n      var columnOfFour = [i, i - 8, i + 8, i + 16];\n      var decidedGumball = squares[i].querySelector('.img-gumball').getAttribute('alt');\n      var isBlank = squares[i].querySelector('.img-gumball').getAttribute('alt') === '';\n\n      if (columnOfFour.every(function (index) {\n        return squares[index].querySelector('.img-gumball').getAttribute('alt') === decidedGumball && !isBlank;\n      })) {\n        setScore(4);\n        columnOfFour.forEach(function (index) {\n          squares[index].innerHTML = '<img src=\"./imgs/transparent.png\" class=\"img-gumball\" alt=\"\" />';\n        });\n      }\n    };\n\n    for (var i = 8; i <= 47; i++) {\n      _loop4(i);\n    }\n  }\n\n  function setScore(i) {\n    score += i;\n    var width = score * 0.06;\n    zanyBar.style.width = width + 'rem';\n    scoreBar.textContent = score;\n  }\n\n  function resetScore() {\n    score = 0;\n    zanyBar.style.width = 0 + 'rem';\n    scoreBar.textContent = 0;\n  }\n\n  window.setInterval(function () {\n    moveGbDown();\n    checkForRowOfFour();\n    checkForColumnOfFour();\n    checkForColumnOfThree();\n    checkForRowOfThree();\n  }, 100);\n\n  function checkForMatch() {\n    checkForRowOfFour();\n    checkForColumnOfFour();\n    checkForColumnOfThree();\n    checkForRowOfThree();\n  }\n});\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./imgs/space.jpg */ \"./src/imgs/space.jpg\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"*,\\r\\n::after,\\r\\n::before {\\r\\n  padding: 0;\\r\\n  margin: 0;\\r\\n  box-sizing: border-box;\\r\\n}\\r\\n\\r\\nhtml {\\r\\n  font-size: 100%;\\r\\n}\\r\\n\\r\\n:root {\\r\\n  /* colors */\\r\\n  --text-color: aliceblue;\\r\\n  --color-theme-1: #332a99;\\r\\n  --color-shadow-1: #7c73d9;\\r\\n\\r\\n  --m-aqua: #2dca86;\\r\\n  --m-aqua-H: #29b87b;\\r\\n\\r\\n  --m-aqua-A2: rgba(60, 212, 147, 0.2);\\r\\n\\r\\n  --bar-back: #a5ebcd;\\r\\n  --bar-front: #2dca86;\\r\\n\\r\\n  /* fonts */\\r\\n  --font-size-08: 0.8rem;\\r\\n  --font-size-1: 1rem;\\r\\n  --font-size-2: 2rem;\\r\\n  --font-size-3: 10rem;\\r\\n\\r\\n  /* border */\\r\\n  --border-radius-05: 0.2rem;\\r\\n  --border-radius-1: 0.5rem;\\r\\n  --border-radius-2: 0.6rem;\\r\\n  --border-radius-3: 1rem;\\r\\n\\r\\n  /* transition */\\r\\n  --transition: all 0.3s linear;\\r\\n\\r\\n  /* shadows */\\r\\n  --shadow-white-1: -2px 4px 6px 2px rgba(255, 255, 255, 0.1);\\r\\n  --shadow-blue-1: 0px 4px 5px -2px var(--color-shadow-1);\\r\\n  --shadow-aqua-1: 0px 0px 5px 2px aqua;\\r\\n}\\r\\n\\r\\nbody {\\r\\n  background: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\r\\n  background-size: cover;\\r\\n  background-position: center;\\r\\n  font-size: 100%;\\r\\n  font-family: 'Exo', sans-serif;\\r\\n  color: var(--text-color);\\r\\n}\\r\\n\\r\\n.button {\\r\\n  padding: 0.4rem 1rem;\\r\\n  background-color: var(--m-aqua);\\r\\n  border-radius: var(--border-radius-1);\\r\\n  margin-left: 1rem;\\r\\n  color: var(--text-color);\\r\\n  font-weight: 500;\\r\\n  transition: var(--transition);\\r\\n}\\r\\n\\r\\n.button:hover {\\r\\n  background-color: var(--m-aqua-H);\\r\\n}\\r\\n\\r\\n#game {\\r\\n  position: relative;\\r\\n  display: grid;\\r\\n  place-items: center;\\r\\n}\\r\\n\\r\\nmain {\\r\\n  display: grid;\\r\\n  height: calc(100vh - 4.5rem);\\r\\n  margin-top: 0.5rem;\\r\\n  place-items: center;\\r\\n}\\r\\n\\r\\n.section-center {\\r\\n  display: grid;\\r\\n  place-items: center;\\r\\n  gap: 1rem;\\r\\n}\\r\\n\\r\\n#interval {\\r\\n  position: absolute;\\r\\n  top: 0;\\r\\n  height: 100vh;\\r\\n  width: 100vw;\\r\\n  display: none;\\r\\n  place-items: center;\\r\\n  gap: 2rem;\\r\\n  background-color: rgba(128, 128, 128, 0.5);\\r\\n  text-align: center;\\r\\n  font-size: var(--font-size-2);\\r\\n}\\r\\n\\r\\n#timer {\\r\\n  font-size: 10rem;\\r\\n}\\r\\n\\r\\n.left {\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  max-width: 600px;\\r\\n}\\r\\n\\r\\n.info {\\r\\n  display: grid;\\r\\n  gap: 0.2rem;\\r\\n  font-size: var(--font-size-1);\\r\\n  color: var(--text-color);\\r\\n  text-transform: capitalize;\\r\\n  background-color: var(--m-aqua-A2);\\r\\n  border-radius: var(--border-radius-1);\\r\\n  padding: 1rem;\\r\\n  margin: 1rem 1rem;\\r\\n}\\r\\n\\r\\n.grid {\\r\\n  height: 400px;\\r\\n  width: 400px;\\r\\n  display: flex;\\r\\n  flex-wrap: wrap;\\r\\n  background-color: transparent;\\r\\n  margin-bottom: 1.5rem;\\r\\n}\\r\\n\\r\\n.grid div {\\r\\n  height: 46px;\\r\\n  width: 46px;\\r\\n  border-radius: var(--border-radius-2);\\r\\n  margin: 2px;\\r\\n  box-shadow: var(--shadow-white-1);\\r\\n}\\r\\n\\r\\n.img-gumball {\\r\\n  height: 100%;\\r\\n  width: 100%;\\r\\n}\\r\\n\\r\\nnav {\\r\\n  height: 4rem;\\r\\n  background: var(--color-theme-1);\\r\\n  box-shadow: var(--shadow-blue-1);\\r\\n  border-bottom-left-radius: var(--border-radius-05);\\r\\n  border-bottom-right-radius: var(--border-radius-05);\\r\\n  display: flex;\\r\\n  padding: 0 0.5rem;\\r\\n  max-width: 600px;\\r\\n  justify-content: space-between;\\r\\n  margin: 0 auto;\\r\\n}\\r\\n\\r\\nnav h1 {\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  letter-spacing: 0.2rem;\\r\\n  font-weight: bold;\\r\\n  cursor: pointer;\\r\\n  margin: 0.5rem;\\r\\n}\\r\\n\\r\\n.links {\\r\\n  display: flex;\\r\\n}\\r\\n\\r\\n.link {\\r\\n  color: white;\\r\\n  margin: 0.5rem;\\r\\n  letter-spacing: 0.2rem;\\r\\n  text-transform: uppercase;\\r\\n  transition: all 0.3s linear;\\r\\n}\\r\\n\\r\\n.chnc {\\r\\n  height: 0.5rem;\\r\\n  width: 0.5rem;\\r\\n  margin-right: 0.5rem;\\r\\n  border-radius: 1rem;\\r\\n  background-color: aquamarine;\\r\\n  box-shadow: var(--shadow-aqua-1);\\r\\n  border: 0.5px solid aqua;\\r\\n  display: inline-block;\\r\\n  transition: var(--transition);\\r\\n}\\r\\n\\r\\n#zany-bar {\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  margin-top: 0.2rem;\\r\\n}\\r\\n\\r\\n#progress-back {\\r\\n  height: 0.5rem;\\r\\n  width: 6rem;\\r\\n  border-radius: var(--border-radius-3);\\r\\n  background-color: var(--bar-back);\\r\\n  display: relative;\\r\\n  margin-right: 1rem;\\r\\n}\\r\\n\\r\\n#progress-front {\\r\\n  height: 0.5rem;\\r\\n  width: 0rem;\\r\\n  background-color: var(--bar-front);\\r\\n  border-radius: var(--border-radius-3);\\r\\n  display: absolute;\\r\\n}\\r\\n\\r\\n#claim-zany {\\r\\n  border: none;\\r\\n  padding: 0.4rem;\\r\\n  text-transform: capitalize;\\r\\n  letter-spacing: 0.05rem;\\r\\n  font-family: 'Exo', sans-serif;\\r\\n  transition: var(--transition);\\r\\n  font-size: var(--font-size-1);\\r\\n  margin-left: 0.5rem;\\r\\n}\\r\\n\\r\\n.link:hover {\\r\\n  color: var(--m-aqua);\\r\\n}\\r\\n\\r\\na {\\r\\n  text-decoration: none;\\r\\n}\\r\\n\\r\\nul {\\r\\n  list-style-type: none;\\r\\n  padding: 0;\\r\\n  align-items: center;\\r\\n}\\r\\n\\r\\n@media screen and (min-width: 800px) {\\r\\n  .section-center {\\r\\n    display: flex;\\r\\n    justify-content: center;\\r\\n    align-items: flex-start;\\r\\n    padding: 5rem;\\r\\n    margin-top: 0;\\r\\n  }\\r\\n\\r\\n  .left {\\r\\n    display: grid;\\r\\n    gap: 0.5rem;\\r\\n    margin-right: 4rem;\\r\\n  }\\r\\n\\r\\n  .info {\\r\\n    display: block;\\r\\n    font-size: 1.2rem;\\r\\n  }\\r\\n\\r\\n  .grid {\\r\\n    height: 560px;\\r\\n    width: 560px;\\r\\n    min-width: 560px;\\r\\n    margin: 0 2rem;\\r\\n  }\\r\\n\\r\\n  .grid div {\\r\\n    height: 66px;\\r\\n    width: 66px;\\r\\n  }\\r\\n\\r\\n  .chnc {\\r\\n    width: 3rem;\\r\\n  }\\r\\n\\r\\n  nav {\\r\\n    width: 50%;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media screen and (min-width: 600px) {\\r\\n  .section-center {\\r\\n    margin-top: 0.5rem;\\r\\n    gap: 0.5rem;\\r\\n  }\\r\\n\\r\\n  .grid {\\r\\n    height: 480px;\\r\\n    width: 480px;\\r\\n    min-width: 480px;\\r\\n  }\\r\\n\\r\\n  .grid div {\\r\\n    height: 56px;\\r\\n    width: 56px;\\r\\n  }\\r\\n}\\r\\n\\r\\n.zany {\\r\\n  transition: var(--transition);\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.zany:hover {\\r\\n  color: var(--m-aqua);\\r\\n}\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/imgs/space.jpg":
/*!****************************!*\
  !*** ./src/imgs/space.jpg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"dfc30e11323d52959d5d.jpg\";\n\n//# sourceURL=webpack://my-webpack-project/./src/imgs/space.jpg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;