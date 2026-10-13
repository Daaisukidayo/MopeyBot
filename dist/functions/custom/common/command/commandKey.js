"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "commandKey",
    description: "Returns the name a command's cooldown and timeout go by: the given one, or the running command's (a slash subcommand with its group, without spaces).",
    output: forgescript_1.ArgType.String,
    brackets: false,
    params: [
        {
            name: "name",
            description: "The name to use instead of the running command's.",
            type: forgescript_1.ArgType.String,
            required: false
        }
    ],
    code: `
    $return[$nullish[$env[name];$toLowerCase[$replace[$applicationSubCommandName $applicationSubCommandGroupName; ;]];$commandName]]
  `
});
//# sourceMappingURL=commandKey.js.map