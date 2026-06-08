"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_addhistory.commandName,
    aliases: _commandsData_1.commandsData.command_addhistory.commandAliases,
    type: "messageCreate",
    code: `
    $handleAddHistory
  `
};
//# sourceMappingURL=add.js.map