"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_invite.commandName,
    aliases: _commandsData_1.commandsData.command_invite.commandAliases,
    type: "messageCreate",
    code: `
    $handleInvite
  `
};
//# sourceMappingURL=invite.js.map