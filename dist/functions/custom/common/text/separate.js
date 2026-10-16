"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "separate",
    description: "Separates a number with a specified separator.",
    output: forgescript_1.ArgType.String,
    params: [
        {
            name: "number",
            description: "The number to separate.",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "separator",
            description: "The separator to use.",
            type: forgescript_1.ArgType.Unknown,
            required: false,
        },
    ],
    code: `
    $return[$separateBigint[$env[number];$nullish[$env[separator];$getGlobalVar[numberSeparator]]]]
  `,
});
//# sourceMappingURL=separate.js.map