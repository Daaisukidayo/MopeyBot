"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_start.commandName,
    aliases: _commandsData_1.commandsData.command_start.commandAliases,
    type: "messageCreate",
    code: `
    $handleStart
  `
};
//# sourceMappingURL=start.js.map