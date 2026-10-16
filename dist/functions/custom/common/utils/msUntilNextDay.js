"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "msUntilNextDay",
    description: "Milliseconds left until the next day begins at 00:00 UTC, when the daily limits reset.",
    output: forgescript_1.ArgType.Number,
    code: `
    $return[$math[86400000 - $getTimestamp % 86400000]]
  `,
});
//# sourceMappingURL=msUntilNextDay.js.map