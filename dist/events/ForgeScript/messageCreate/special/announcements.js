"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_announcements.commandName,
    aliases: _commandsData_1.commandsData.command_announcements.commandAliases,
    type: "messageCreate",
    code: `
    $handleAnnouncements
  `
};
//# sourceMappingURL=announcements.js.map