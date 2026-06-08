"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_daily.commandName,
    aliases: _commandsData_1.commandsData.command_daily.commandAliases,
    type: "messageCreate",
    code: `
    $handleDaily
  `
};
//# sourceMappingURL=daily.js.map