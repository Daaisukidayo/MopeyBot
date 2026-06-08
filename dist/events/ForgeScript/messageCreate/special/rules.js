"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_rules.commandName,
    aliases: _commandsData_1.commandsData.command_rules.commandAliases,
    type: "messageCreate",
    code: `
    $handleRules
  `
};
//# sourceMappingURL=rules.js.map