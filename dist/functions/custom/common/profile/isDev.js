"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "isDev",
    description: "Returns whether developer mode is on in the profile the caller has loaded in 'userProfile'. Nothing is read from the database.",
    output: forgescript_1.ArgType.Boolean,
    code: `
    $return[$checkCondition[$jsonGet[userProfile;devMode]==1]]
  `
});
//# sourceMappingURL=isDev.js.map