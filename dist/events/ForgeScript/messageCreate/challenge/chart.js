"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_chart.commandName,
    aliases: _commandsData_1.commandsData.command_chart.commandAliases,
    type: "messageCreate",
    code: `
    $handleChart
  `
};
//# sourceMappingURL=chart.js.map