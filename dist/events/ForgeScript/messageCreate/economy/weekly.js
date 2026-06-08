"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_weekly.commandName,
    aliases: _commandsData_1.commandsData.command_weekly.commandAliases,
    type: "messageCreate",
    code: `
    $handleWeekly
  `
};
//# sourceMappingURL=weekly.js.map