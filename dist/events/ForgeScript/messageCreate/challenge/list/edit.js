"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_editlist.commandName,
    aliases: _commandsData_1.commandsData.command_editlist.commandAliases,
    type: "messageCreate",
    code: `
    $handleEditList
  `
};
//# sourceMappingURL=edit.js.map