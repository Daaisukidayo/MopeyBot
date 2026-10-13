"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$letOr",
    description: "Overwrites the keyword value if the value doesn't exist, is empty, false, null, or undefined",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "key",
            description: "The key name",
            required: true,
            type: forgescript_1.ArgType.String,
            rest: false
        },
        {
            name: "value",
            description: "The key value",
            required: true,
            type: forgescript_1.ArgType.String,
            rest: false
        }
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
    }
});
//# sourceMappingURL=letOr.js.map