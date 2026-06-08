"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "isPrefixCommand",
    description: "Returns whether the current command is a prefix command.",
    output: "Boolean",
    code: `
    $return[$checkCondition[$instanceName==Message]]
  `
};
//# sourceMappingURL=isPrefixCommand.js.map