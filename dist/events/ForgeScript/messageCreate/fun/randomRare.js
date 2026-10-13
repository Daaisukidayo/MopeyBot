"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    name: _commandsData_1.commandsData.command_randomrare.name,
    aliases: _commandsData_1.commandsData.command_randomrare.aliases,
    type: "messageCreate",
    code: `
    $handleRandomrare
  `
});
//# sourceMappingURL=randomRare.js.map