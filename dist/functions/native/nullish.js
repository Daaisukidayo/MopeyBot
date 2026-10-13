"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$nullish",
    description: "Checks every provided value and returns the first one that is not empty, 'null' or 'undefined'",
    output: forgescript_1.ArgType.String,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "values",
            description: "A list of values to check",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: true
        }
    ],
    async execute(ctx, [values]) {
        for (const value of values) {
            switch (value) {
                case "":
                case "null":
                case "undefined":
                    continue;
                default:
                    return this.success(value);
            }
        }
        return this.success(values.at(-1));
    }
});
//# sourceMappingURL=nullish.js.map