"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var click_1 = require("./utils/watch/click");
// import event from "./utils/watch/event";
var hide_1 = require("./utils/watch/hide");
var move_1 = require("./utils/watch/move");
var show_1 = require("./utils/watch/show");
var common_1 = require("./utils/common");
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ids = [];
        _this.time = 1000; // 节流的间隔时间
        _this.showHide = false;
        return _this;
    }
    /**
     * 初始化
     * */
    default_1.prototype.init = function (_a) {
        var ids = _a.ids, url = _a.url, userID = _a.userID, timeOut = _a.timeOut, headers = _a.headers, showHide = _a.showHide, sign = _a.sign;
        var that = this;
        that.ids = ids;
        that.time = timeOut || 1000;
        that.showHide = showHide;
        this.setUserID(userID || '');
        this.setUrl(url);
        this.setHeaders(headers);
    };
    default_1.prototype.start = function () {
        var _a;
        var that = this;
        this.setStatus(true);
        /**
         * 监听页面显示 隐藏
         * */
        document.addEventListener('visibilitychange', (0, common_1.throttle)(function () {
            if (document.visibilityState === "hidden" && that.showHide) {
                (0, hide_1.default)('hide');
            }
            if (document.visibilityState === "visible" && that.showHide) {
                (0, show_1.default)('show');
            }
        }, 100), true);
        /**
         * 监听鼠标移动事件
         * */
        // document.addEventListener('mousemove', throttle(function(e:any) {
        //   event(e)
        // }, that.time), true);
        /**
         * 监听鼠标点击事件
         * */
        document.addEventListener('click', function (e) {
            var _a;
            if (!that.ids || ((_a = that.ids) === null || _a === void 0 ? void 0 : _a.length) == 0) {
                (0, click_1.default)(e.target);
            }
        }, true);
        /**
         * 监听手指滑动
         * */
        document.addEventListener('touchmove', (0, common_1.throttle)(function (e) {
            (0, move_1.default)(JSON.stringify({
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            }));
        }, that.time), true);
        /**
         * 监听点击 id
         * */
        (_a = that.ids) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
            var HTMLID = document.getElementById(item);
            if (HTMLID) {
                HTMLID.addEventListener('click', function (e) {
                    (0, click_1.default)(e.target);
                }, true);
            }
        });
    };
    default_1.prototype.end = function () {
        this.setStatus(false);
    };
    return default_1;
}(common_1.default));
exports.default = default_1;
//# sourceMappingURL=index.js.map