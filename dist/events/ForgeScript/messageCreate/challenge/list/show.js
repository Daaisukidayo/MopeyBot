"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_showlist.commandName,
    aliases: _commandsData_1.commandsData.command_showlist.commandAliases,
    type: "messageCreate",
    code: `
    $handleShowList
  `
};
//# sourceMappingURL=show.js.map