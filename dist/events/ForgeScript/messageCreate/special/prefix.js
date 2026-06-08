"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_prefix.commandName,
    aliases: _commandsData_1.commandsData.command_prefix.commandAliases,
    type: "messageCreate",
    code: `
    $handlePrefix
  `
};
//# sourceMappingURL=prefix.js.map