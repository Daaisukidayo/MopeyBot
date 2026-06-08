"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_slots.commandName,
    aliases: _commandsData_1.commandsData.command_slots.commandAliases,
    type: "messageCreate",
    code: `
    $handleSlots
  `
};
//# sourceMappingURL=slots.js.map