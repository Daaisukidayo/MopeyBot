"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$not",
    description: "Returns the logical NOT of a boolean value",
    output: forgescript_1.ArgType.Boolean,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "boolean",
            description: "The boolean value to invert.",
            type: forgescript_1.ArgType.Boolean,
            required: true,
            rest: false,
        },
    ],
    async execute(ctx, [bool]) {
        return this.success(!bool);
    },
});
//# sourceMappingURL=not.js.map