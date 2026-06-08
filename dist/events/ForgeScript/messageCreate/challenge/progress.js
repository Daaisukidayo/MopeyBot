"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_progress.commandName,
    aliases: _commandsData_1.commandsData.command_progress.commandAliases,
    type: "messageCreate",
    code: `
    $handleProgress
  `
};
//# sourceMappingURL=progress.js.map