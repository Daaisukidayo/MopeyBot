"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$isOneOf",
    description: "whether the string equals any of the others",
    output: forgescript_1.ArgType.Boolean,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "string",
            description: "the string to check",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: "matches",
            description: "one or more values to compare against",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: true,
        },
    ],
    async execute(ctx, [string, matches]) {
        return this.success(matches.includes(string));
    },
});
//# sourceMappingURL=isOneOf.js.map