"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "random",
    description: "Generates a random number between minimal and maximal (inclusive).",
    output: forgescript_1.ArgType.Number,
    params: [
        {
            name: "min",
            description: "The minimum number (inclusive).",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "max",
            description: "The maximum number (inclusive).",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "decimals",
            description: "Whether to include decimals.",
            type: forgescript_1.ArgType.Boolean,
            required: false,
        },
    ],
    code: `
    $c[A whole number can be the maximum too, a decimal one is below it]
    $return[$if[$env[decimals];$randomNumber[$env[min];$env[max];true];$randomNumber[$env[min];$math[$env[max] + 1]]]]
  `,
});
//# sourceMappingURL=random.js.map