"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_vote.commandName,
    aliases: _commandsData_1.commandsData.command_vote.commandAliases,
    type: "messageCreate",
    code: `
    $handleVote
  `
};
//# sourceMappingURL=vote.js.map