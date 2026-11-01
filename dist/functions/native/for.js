"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$for",
    description: "a classic for loop",
    unwrap: false,
    brackets: true,
    args: [
        {
            name: "init",
            description: "init code, runs once before the loop",
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "condition",
            description: "the condition, checked before each round",
            condition: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "step",
            description: "the step code, runs at the end of each round",
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "code",
            description: "the loop body",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        },
    ],
    async execute(ctx) {
        const { 0: initField, 2: stepField, 3: codeField } = this.data.fields;
        const conditionField = this.data.fields?.at(1);
        const ctxClone = ctx.clone();
        const initRes = await this["resolveCode"](ctxClone, initField);
        if (!this["isValidReturnType"](initRes))
            return initRes;
        let output = "";
        while (true) {
            const conditionRes = await this["resolveCondition"](ctxClone, conditionField);
            if (!this["isValidReturnType"](conditionRes))
                return conditionRes;
            if (conditionField.lhs.value !== "" && !conditionRes.value)
                break;
            const exec = await this["resolveCode"](ctxClone, codeField);
            if (exec.success || exec.continue) {
                /* the next round */
            }
            else if (exec.break)
                break;
            else if (exec.return)
                output += exec.value;
            else if (!this["isValidReturnType"](exec))
                return exec;
            const stepRes = await this["resolveCode"](ctxClone, stepField);
            if (!this["isValidReturnType"](stepRes))
                return stepRes;
        }
        return this.success(output);
    },
});
//# sourceMappingURL=for.js.map