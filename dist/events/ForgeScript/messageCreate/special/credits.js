"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_credits.commandName,
    aliases: _commandsData_1.commandsData.command_credits.commandAliases,
    type: "messageCreate",
    code: `
    $handleCredits
  `
};
//# sourceMappingURL=credits.js.map