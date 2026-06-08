"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_balance.commandName,
    aliases: _commandsData_1.commandsData.command_balance.commandAliases,
    type: "messageCreate",
    code: `
    $handleBalance
  `
};
//# sourceMappingURL=balance.js.map