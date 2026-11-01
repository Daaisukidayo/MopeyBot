"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$ternary",
    description: "returns the first value that's not empty or false, or the last one if none match",
    output: forgescript_1.ArgType.Unknown,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "values",
            description: "the values to check",
            type: forgescript_1.ArgType.Unknown,
            required: true,
            rest: true,
        },
    ],
    async execute(ctx, [values]) {
        for (const value of values) {
            switch (value) {
                case "":
                case "false":
                    continue;
                default:
                    return this.success(value);
            }
        }
        return this.success(values.at(-1));
    },
});
//# sourceMappingURL=ternary.js.map