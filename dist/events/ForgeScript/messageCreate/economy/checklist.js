"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_checklist.commandName,
    aliases: _commandsData_1.commandsData.command_checklist.commandAliases,
    type: "messageCreate",
    code: `
    $handleChecklist
  `
};
//# sourceMappingURL=checklist.js.map