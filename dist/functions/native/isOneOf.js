"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$isOneOf",
    description: "Checks whether the string is equal to one of the other strings in the set",
    output: forgescript_1.ArgType.Boolean,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "string",
            description: "The string to check for a match against any of the provided values",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: "matches",
            description: "One or more values (strings) to compare",
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