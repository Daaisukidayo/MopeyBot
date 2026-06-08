"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_pause.commandName,
    aliases: _commandsData_1.commandsData.command_pause.commandAliases,
    type: "messageCreate",
    code: `
    $handlePause
  `
};
//# sourceMappingURL=pause.js.map