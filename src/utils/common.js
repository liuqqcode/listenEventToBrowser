"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.setDoTime = exports.throttle = exports.timestamp = void 0;
var fingerprintjs_1 = require("@fingerprintjs/fingerprintjs"); // 浏览器指纹识别库
var md5 = require('md5');
var environment_1 = require("./environment");
var axios_1 = require("axios");
var userID = '';
var url = '';
var mac = '';
var status = false;
var obj = {};
var headers = {};
var sign = '';
var startTime = window.performance.timeOrigin;
var windowShowTime = window.performance.timeOrigin;
var eventTime = {
    click: 0,
    mouseMove: 0,
    hide: 0,
    touchMove: 0,
    show: 0
};
// 对外暴露的方法，
var default_1 = /** @class */ (function () {
    function default_1() {
        /**
         * 设置请求的userid
         * */
        this.setUserID = function (e) {
            userID = e;
        };
        /**
         * 设置请求的url
         * */
        this.setUrl = function (e) {
            url = e;
        };
        /**
         * 设置请求开始结束
         * */
        this.setStatus = function (e) {
            status = e;
        };
        /**
         * 获取mac
         * */
        this.getMac = function () {
            return mac;
        };
    }
    /**
     * 设置新的mac
     * */
    default_1.prototype.setMac = function (str) {
        mac = str;
    };
    /**
     * 设置自定义的对象
     * */
    default_1.prototype.setObj = function (val) {
        obj = val;
    };
    /**
     * 获取自定义的对象
     * */
    default_1.prototype.getObj = function () {
        return obj;
    };
    /**
     * 主动触发请求
     * */
    default_1.prototype.request = function (obj, type) {
        this.setObj(obj);
        (0, exports.request)('', type, 0);
    };
    /**
     * 设置headers
     * */
    default_1.prototype.setHeaders = function (obj) {
        headers = obj;
    };
    /**
     * 设置sign
     * */
    default_1.prototype.setSign = function (obj) {
        sign = obj;
    };
    /**
     * 设置当前时间为开始时间，刷新开始时间
     * */
    default_1.prototype.resetStartTime = function () {
        startTime = new Date().getTime();
    };
    return default_1;
}());
exports.default = default_1;
/**
 * 获取浏览器mac
 * */
var getMac = function () { return __awaiter(void 0, void 0, void 0, function () {
    var fp, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fingerprintjs_1.default.load()];
            case 1:
                fp = _a.sent();
                return [4 /*yield*/, fp.get()];
            case 2:
                result = _a.sent();
                mac = result.visitorId;
                return [2 /*return*/];
        }
    });
}); };
getMac().then();
/**
 * 当前时间搓
 * */
var timestamp = function () {
    return new Date().getTime();
};
exports.timestamp = timestamp;
/**
 * js节流
 * */
function throttle(fn, delay) {
    var lastExecutionTime = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var currentTime = Date.now();
        if (currentTime - lastExecutionTime >= delay) {
            fn.apply(void 0, args);
            lastExecutionTime = currentTime;
        }
    };
}
exports.throttle = throttle;
/**
 * 设置事件触发的时间
 * */
function setDoTime(type) {
    if ((0, exports.timestamp)() - eventTime[type] > 10) {
        eventTime[type] = (0, exports.timestamp)();
        return true;
    }
    else {
        eventTime[type] = (0, exports.timestamp)();
        return false;
    }
}
exports.setDoTime = setDoTime;
/**
 * 发送请求，
 * */
var request = function (data, type, timeOut) {
    if (!status) {
        return;
    }
    if (timeOut == 0) {
        postAxios();
    }
    else {
        setTimeout(function () {
            postAxios();
        }, timeOut);
    }
    for (var key in headers) {
        axios_1.default.defaults.headers.common[key] = headers[key];
    }
    function postAxios() {
        var tempObj = JSON.parse(JSON.stringify(obj));
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var day = new Date().getDate();
        if (day < 10) {
            day = '0' + day;
        }
        var hour = new Date().getHours();
        if (hour < 10) {
            hour = '0' + hour;
        }
        var minute = new Date().getMinutes();
        if (minute < 10) {
            minute = '0' + minute;
        }
        var second = new Date().getSeconds();
        if (second < 10) {
            second = '0' + second;
        }
        var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        axios_1.default.post(url, {
            type: type,
            mac: mac,
            userID: userID,
            sign: md5(mac + time),
            sessionId: md5(windowShowTime),
            obj: tempObj,
            data: data,
            env: (0, environment_1.default)(),
            page: window.location.href,
            time: time,
            showTime: parseInt(String(new Date().getTime() - startTime))
        }).then();
        obj = {};
    }
};
exports.request = request;
