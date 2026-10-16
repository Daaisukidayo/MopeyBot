"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$ref",
    description: "Makes a variable share another variable's object instead of copying it. Replacing either variable whole breaks the link",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the new variable",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: "source",
            description: "The name of the variable to point to",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
    ],
    async execute(ctx, [name, source]) {
        const value = ctx.getEnvironmentKey(source);
        if (value === undefined)
            return this.customError(`Variable "${source}" does not exist`);
        ctx.setEnvironmentKey(name, value);
        return this.success();
    },
});
//# sourceMappingURL=ref.js.map