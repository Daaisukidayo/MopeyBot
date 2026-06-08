"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_leaderboard.commandName,
    aliases: _commandsData_1.commandsData.command_leaderboard.commandAliases,
    type: "messageCreate",
    code: `
    $handleLeaderboard
  `
};
//# sourceMappingURL=leaderboard.js.map