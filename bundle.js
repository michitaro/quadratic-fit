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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __webpack_require__(2);
window.addEventListener('load', function (e) {
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var samples = generateRandomPoints(canvas);
    for (var _i = 0, samples_1 = samples; _i < samples_1.length; _i++) {
        var _a = samples_1[_i], x = _a[0], y = _a[1];
        ctx.fillRect(x, y, 1, 1);
    }
    var _b = src_1.quadraticFit(samples), a0 = _b[0], a1 = _b[1], a2 = _b[2];
    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    for (var x = 0; x < canvas.width; ++x) {
        var y = a0 + a1 * x + a2 * Math.pow(x, 2);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
});
function generateRandomPoints(size) {
    var samples = [];
    var w0 = Math.random() - 0.5;
    var c = Math.random() * 0.5;
    for (var i = 0; i < 800; ++i) {
        var x = size.width * Math.random();
        var w = 2 * (x / size.width) - 1;
        var y = 0.5 * size.height * (Math.pow((w - w0), 2) + 0.2 * Math.random() + c);
        samples.push([x, y]);
    }
    return samples;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
    y = a0 + a1*x + a2*x**2 approximate samples
    samples : [(x_1, y1), ..., (x_n, y_n)]
 */
function quadraticFit(samples) {
    var sx0 = 0;
    var sx1 = 0;
    var sx2 = 0;
    var sx3 = 0;
    var sx4 = 0;
    var syx0 = 0;
    var syx1 = 0;
    var syx2 = 0;
    for (var _i = 0, samples_1 = samples; _i < samples_1.length; _i++) {
        var _a = samples_1[_i], x = _a[0], y = _a[1];
        sx0 += 1;
        sx1 += x;
        sx2 += x * x;
        sx3 += x * x * x;
        sx4 += x * x * x * x;
        syx0 += y;
        syx1 += y * x;
        syx2 += y * x * x;
    }
    var sx32 = sx3 * sx3;
    var sx12 = sx1 * sx1;
    var sx23 = sx2 * sx2 * sx2;
    var sx22 = sx2 * sx2;
    var D = sx0 * sx2 * sx4 - sx0 * sx32 + 2 * sx1 * sx2 * sx3 - sx12 * sx4 - sx23;
    return [
        /* a0 */ (sx1 * sx3 * syx2 - sx1 * sx4 * syx1 + sx2 * sx3 * syx1 + sx2 * sx4 * syx0 - sx22 * syx2 - sx32 * syx0) / D,
        /* a1 */ (-sx0 * sx3 * syx2 + sx0 * sx4 * syx1 + sx1 * sx2 * syx2 - sx1 * sx4 * syx0 + sx2 * sx3 * syx0 - sx22 * syx1) / D,
        /* a2 */ (sx0 * sx2 * syx2 - sx0 * sx3 * syx1 + sx1 * sx2 * syx1 + sx1 * sx3 * syx0 - sx12 * syx2 - sx22 * syx0) / D,
    ];
}
exports.quadraticFit = quadraticFit;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ })
/******/ ]);