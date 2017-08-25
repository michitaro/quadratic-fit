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
