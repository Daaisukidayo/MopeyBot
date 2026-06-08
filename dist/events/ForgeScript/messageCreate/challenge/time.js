"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_time.commandName,
    aliases: _commandsData_1.commandsData.command_time.commandAliases,
    type: "messageCreate",
    code: `
    $handleTime
  `
};
//# sourceMappingURL=time.js.map