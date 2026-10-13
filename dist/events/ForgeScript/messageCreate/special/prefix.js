"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    name: _commandsData_1.commandsData.command_prefix.name,
    aliases: _commandsData_1.commandsData.command_prefix.aliases,
    type: "messageCreate",
    code: `
    $handlePrefix
  `
});
//# sourceMappingURL=prefix.js.map