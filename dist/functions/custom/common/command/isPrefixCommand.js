"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "isPrefixCommand",
    description: "Returns whether the current command is a prefix command.",
    output: forgescript_1.ArgType.Boolean,
    code: `
    $return[$checkCondition[$instanceName==Message]]
  `,
});
//# sourceMappingURL=isPrefixCommand.js.map