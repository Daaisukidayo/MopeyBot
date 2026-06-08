"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'sumPlayCash',
    params: [
        {
            name: "_amount",
            required: true
        }
    ],
    code: `
    $!jsonSet[playData;MC;$math[$env[playData;MC] + $round[$env[_amount]]]]
  `
};
//# sourceMappingURL=sumPlayCash.js.map