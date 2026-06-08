"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_arena.commandName,
    aliases: _commandsData_1.commandsData.command_arena.commandAliases,
    type: "messageCreate",
    code: `
    $handleArena
  `
};
//# sourceMappingURL=arena.js.map