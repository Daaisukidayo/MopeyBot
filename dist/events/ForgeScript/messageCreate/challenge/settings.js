"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_settings.commandName,
    aliases: _commandsData_1.commandsData.command_settings.commandAliases,
    type: "messageCreate",
    code: `
    $handleSettings
  `
};
//# sourceMappingURL=settings.js.map