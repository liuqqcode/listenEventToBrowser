"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ua = navigator.userAgent.toLowerCase();
function default_1() {
    var isWeixin = ua.indexOf('micromessenger') !== -1;
    var isInApp = /(^|;\s)app\//.test(ua);
    if (isWeixin) {
        if (window.__wxjs_environment === 'miniprogram') {
            return 'wxapp';
        }
        else {
            return 'wxh5';
        }
    }
    else {
        if (!isInApp) {
            return 'browser';
        }
        else {
            return 'app';
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=environment.js.map