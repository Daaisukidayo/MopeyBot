"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_muid.commandName,
    aliases: _commandsData_1.commandsData.command_muid.commandAliases,
    type: "messageCreate",
    code: `
    $handleMuid
  `
};
//# sourceMappingURL=muid.js.map