"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
function default_1(e) {
    if ((0, common_1.setDoTime)('touchMove')) {
        (0, common_1.request)(e, 'touchMove');
    }
}
exports.default = default_1;
//# sourceMappingURL=move.js.map