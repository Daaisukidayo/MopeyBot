"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "random",
    description: "a random number between min and max, both inclusive",
    output: forgescript_1.ArgType.Number,
    params: [
        {
            name: "min",
            description: "the min (inclusive)",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "max",
            description: "the max (inclusive)",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "decimals",
            description: "allow decimals",
            type: forgescript_1.ArgType.Boolean,
            required: false,
        },
    ],
    code: `
    $c[ints can hit the max, decimals stay below it]
    $return[$if[$env[decimals];$randomNumber[$env[min];$env[max];true];$randomNumber[$env[min];$math[$env[max] + 1]]]]
  `,
});
//# sourceMappingURL=random.js.map