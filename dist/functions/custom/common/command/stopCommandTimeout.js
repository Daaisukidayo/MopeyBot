"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "stopCommandTimeout",
    description: "Stops an active command timeout for the current user",
    output: forgescript_1.ArgType.Boolean,
    brackets: false,
    params: [
        {
            name: "command",
            description: "The command name to stop the timeout for. Defaults to the command where the function were executed",
            type: forgescript_1.ArgType.String,
            required: false
        }
    ],
    code: `
    $return[$clearTimeout[$commandKey[$env[command]]-$authorID]]
  `
});
//# sourceMappingURL=stopCommandTimeout.js.map