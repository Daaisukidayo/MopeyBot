"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const parseJSON_js_1 = __importDefault(require("@tryforge/forgescript/dist/functions/parseJSON.js"));
exports.default = new forgescript_1.NativeFunction({
    name: "$forOf",
    description: "Executes given code for every element of an iterable (Array, JSON Object, or String)",
    unwrap: false,
    brackets: true,
    args: [
        {
            name: "value",
            description: "The iterable to iterate over",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "variable",
            description: "The variable to load the current element or value to",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "code",
            description: "The code to execute for every iteration",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "index",
            description: "The variable to store the index or key name",
            rest: false,
            required: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    async execute(ctx) {
        const code = this.data.fields[2];
        const { args, return: rt } = await this["resolveMultipleArgs"](ctx, 0, 1, 3);
        if (!this["isValidReturnType"](rt))
            return rt;
        const [rawValue, varName, indexName] = args;
        if (indexName && varName === indexName)
            return this.customError("The 'variable' and 'index' names must be different");
        const target = ctx.getEnvironmentKey(rawValue) ?? (0, parseJSON_js_1.default)(rawValue);
        let output = "";
        for (const [value, indexOrKey] of iterate(target)) {
            ctx.setEnvironmentKey(varName, value);
            if (indexName)
                ctx.setEnvironmentKey(indexName, indexOrKey);
            const exec = await this["resolveCode"](ctx, code);
            if (exec.success || exec.continue)
                continue;
            if (exec.break)
                break;
            if (exec.return)
                output += exec.value;
            else if (!this["isValidReturnType"](exec))
                return exec;
        }
        // ctx.clearArguments()
        return this.success(output);
    },
});
function* iterate(target) {
    if (Array.isArray(target)) {
        for (let i = 0; i < target.length; i++)
            yield [target[i], i];
        return;
    }
    if (typeof target === "string") {
        let index = 0;
        for (const value of target)
            yield [value, index++];
        return;
    }
    if (target !== null && typeof target === "object") {
        for (const key of Object.keys(target))
            yield [target[key], key];
    }
}
//# sourceMappingURL=forOf.js.map