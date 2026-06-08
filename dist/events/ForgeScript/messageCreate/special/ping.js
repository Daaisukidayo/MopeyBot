"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_ping.commandName,
    aliases: _commandsData_1.commandsData.command_ping.commandAliases,
    type: "messageCreate",
    code: `
    $handlePing
  `
};
//# sourceMappingURL=ping.js.map