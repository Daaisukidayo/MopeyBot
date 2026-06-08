"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_reminders.commandName,
    aliases: _commandsData_1.commandsData.command_reminders.commandAliases,
    type: "messageCreate",
    code: `
    $handleReminders
  `
};
//# sourceMappingURL=reminders.js.map