"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_switchlocale.commandName,
    aliases: _commandsData_1.commandsData.command_switchlocale.commandAliases,
    type: "messageCreate",
    code: `
    $handleSwitchlocale
  `
};
//# sourceMappingURL=switchLocale.js.map