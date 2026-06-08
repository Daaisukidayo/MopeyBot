"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_play.commandName,
    aliases: _commandsData_1.commandsData.command_play.commandAliases,
    type: "messageCreate",
    code: `
    $handlePlay
  `
};
//# sourceMappingURL=play.js.map