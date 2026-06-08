"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_coinflip.commandName,
    aliases: _commandsData_1.commandsData.command_coinflip.commandAliases,
    type: "messageCreate",
    code: `
    $handleCoinflip
  `
};
//# sourceMappingURL=coinflip.js.map