"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$not",
    description: "logical NOT",
    output: forgescript_1.ArgType.Boolean,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "boolean",
            description: "the boolean to flip",
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