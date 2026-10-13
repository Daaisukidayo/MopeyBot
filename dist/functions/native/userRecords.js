"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("@tryforge/forge.db/dist/util");
// A saved value as JSON when it is JSON. A number too big for JavaScript (a Discord ID) keeps its exact digits
function parseValue(text) {
    try {
        return JSON.parse(text, (_key, value, context) => typeof value === "number" && !Number.isSafeInteger(value) && context
            ? JSON.rawJSON(context.source)
            : value);
    }
    catch {
        return text;
    }
}
exports.default = new forgescript_1.NativeFunction({
    name: "$userRecords",
    description: "Returns every saved variable of a user as formatted JSON: the user variables by name, the others by their type and server",
    brackets: true,
    unwrap: true,
    output: forgescript_1.ArgType.String,
    args: [
        {
            name: "user ID",
            description: "The user whose variables to return",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [userId]) {
        const result = {};
        for (const record of await util_1.DataBase.getAll()) {
            if (record.id !== userId)
                continue;
            const value = typeof record.value === "string" ? parseValue(record.value) : record.value;
            if (record.type === "user")
                result[record.name] = value;
            else
                ((result[record.type] ??= {})[record.guildId || "-"] ??= {})[record.name] = value;
        }
        return this.success(JSON.stringify(result, null, 2));
    }
});
//# sourceMappingURL=userRecords.js.map