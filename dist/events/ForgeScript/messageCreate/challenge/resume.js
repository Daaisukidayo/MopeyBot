"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_resume.commandName,
    aliases: _commandsData_1.commandsData.command_resume.commandAliases,
    type: "messageCreate",
    code: `
    $handleResume
  `
};
//# sourceMappingURL=resume.js.map