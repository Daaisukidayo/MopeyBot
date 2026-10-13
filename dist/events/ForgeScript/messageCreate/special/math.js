"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    name: _commandsData_1.commandsData.command_math.name,
    aliases: _commandsData_1.commandsData.command_math.aliases,
    type: "messageCreate",
    code: `
    $handleMath
  `
});
//# sourceMappingURL=math.js.map