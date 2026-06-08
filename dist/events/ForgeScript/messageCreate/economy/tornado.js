"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
exports.default = {
    name: _commandsData_1.commandsData.command_tornado.commandName,
    aliases: _commandsData_1.commandsData.command_tornado.commandAliases,
    type: "messageCreate",
    code: `
    $handleTornado
  `
};
//# sourceMappingURL=tornado.js.map