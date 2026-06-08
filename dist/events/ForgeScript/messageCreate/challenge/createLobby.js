"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_createlobby.commandName,
    aliases: _commandsData_1.commandsData.command_createlobby.commandAliases,
    type: "messageCreate",
    code: `
    $handleCreateLobby
  `
};
//# sourceMappingURL=createLobby.js.map