"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_report.commandName,
    aliases: _commandsData_1.commandsData.command_report.commandAliases,
    type: "messageCreate",
    code: `
    $handleReport
  `
};
//# sourceMappingURL=report.js.map