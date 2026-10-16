"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$ternary",
    description: "Checks every provided value and return one if it's not empty or false. Returns last value if nothing matched.",
    output: forgescript_1.ArgType.Unknown,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "values",
            description: "A list of values to check and return the first non-false/empty item from.",
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