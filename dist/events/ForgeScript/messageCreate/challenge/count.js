"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_count.commandName,
    aliases: _commandsData_1.commandsData.command_count.commandAliases,
    type: "messageCreate",
    code: `
    $handleCount
  `
};
//# sourceMappingURL=count.js.map