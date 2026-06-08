"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_showhistory.commandName,
    aliases: _commandsData_1.commandsData.command_showhistory.commandAliases,
    type: "messageCreate",
    code: `
    $handleShowHistory
  `
};
//# sourceMappingURL=show.js.map