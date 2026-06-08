"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_clearcoins.commandName,
    aliases: _commandsData_1.commandsData.command_clearcoins.commandAliases,
    type: "messageCreate",
    code: `
    $handleClearcoins
  `
};
//# sourceMappingURL=clearCoins.js.map