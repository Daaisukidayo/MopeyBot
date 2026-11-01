"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$letOr",
    description: "sets the keyword only if it's missing, empty, false, null or undefined",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "key",
            description: "the keyword's name",
            required: true,
            type: forgescript_1.ArgType.String,
            rest: false,
        },
        {
            name: "value",
            description: "the value",
            required: true,
            type: forgescript_1.ArgType.String,
            rest: false,
        },
    ],
    async execute(ctx, [key, value]) {
        let val = ctx.getKeyword(key);
        switch (val) {
            case "null":
            case "undefined":
            case "false":
                val = "";
                break;
        }
        ctx.setKeyword(key, val || value);
        return this.success();
    },
});
//# sourceMappingURL=letOr.js.map