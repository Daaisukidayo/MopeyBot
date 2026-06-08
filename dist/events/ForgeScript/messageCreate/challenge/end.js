"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_end.commandName,
    aliases: _commandsData_1.commandsData.command_end.commandAliases,
    type: "messageCreate",
    code: `
    $handleEnd
  `
};
//# sourceMappingURL=end.js.map