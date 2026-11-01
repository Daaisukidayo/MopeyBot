"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "stopCommandTimeout",
    description: "stops the user's running command timeout",
    output: forgescript_1.ArgType.Boolean,
    brackets: false,
    params: [
        {
            name: "command",
            description: "the command whose timeout to stop. defaults to the one running this",
            type: forgescript_1.ArgType.String,
            required: false,
        },
    ],
    code: `
    $return[$clearTimeout[$commandKey[$env[command]]-$authorID]]
  `,
});
//# sourceMappingURL=stopCommandTimeout.js.map