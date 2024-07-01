"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
function default_1(e) {
    if ((0, common_1.setDoTime)('click')) {
        var updateStr = e;
        var obj = {};
        if (e.localName === 'input') {
            obj = {
                element: 'input',
                value: e._value
            };
            updateStr = JSON.stringify(obj);
        }
        else {
            obj = {
                element: e.localName,
                value: e.innerText
            };
            updateStr = JSON.stringify(obj);
        }
        (0, common_1.request)(updateStr, 'click');
    }
}
exports.default = default_1;
//# sourceMappingURL=click.js.map