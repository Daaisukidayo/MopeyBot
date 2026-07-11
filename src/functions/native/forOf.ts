import { ArgType, IExtendedCompiledFunctionField, NativeFunction, Return } from "@tryforge/forgescript"
import parseJSON from "@tryforge/forgescript/dist/functions/parseJSON.js"

export default new NativeFunction({
    name: "$forOf",
    description: "Executes given code for every element of an iterable (Array, JSON Object, or String)",
    unwrap: false,
    brackets: true,
    experimental: true,
    args: [
        {
            name: "name/value",
            description: "The environment variable name OR a raw string/JSON to iterate over",
            rest: false,
            required: true,
            type: ArgType.String,
        },
        {
            name: "variable",
            description: "The variable to load the current element/value to",
            rest: false,
            required: true,
            type: ArgType.String,
        },
        {
            name: "code",
            description: "The code to execute for every iteration",
            rest: false,
            required: true,
            type: ArgType.String,
        },
        {
            name: "index",
            description: "The variable to store the index or key name",
            rest: false,
            required: false,
            type: ArgType.String,
        },
    ],
    async execute(ctx) {
        const [nameField, varField, codeField, indexField] = this.data.fields! as IExtendedCompiledFunctionField[]

        const nameRes = await this["resolveCode"](ctx, nameField)
        if (!this["isValidReturnType"](nameRes)) return nameRes
        const rawValue = nameRes.value as string

        const varRes = await this["resolveCode"](ctx, varField)
        if (!this["isValidReturnType"](varRes)) return varRes
        const varName = varRes.value as string

        let target = ctx.getEnvironmentKey(rawValue)

        if (target === undefined) {
            target = parseJSON(rawValue)
        }

        let iterable: [any, any][] = []

        if (Array.isArray(target)) {
            iterable = target.map((el, i) => [el, i])
        } else if (target !== null && typeof target === "object") {
            iterable = Object.entries(target).map(([key, val]) => [val, key])
        } else if (typeof target === "string") {
            iterable = Array.from(target).map((char, i) => [char, i])
        } else {
            return this.success(null)
        }

        const len = iterable.length
        if (len === 0) return this.success(null)

        const oldVarValue = ctx.getEnvironmentKey(varName)

        let updateEnv: (val: any, idxKey: any) => void
        let restoreEnv: () => void

        if (indexField) {
            const indexRes = await this["resolveCode"](ctx, indexField)
            if (!this["isValidReturnType"](indexRes)) return indexRes
            const indexName = indexRes.value as string
            const oldIndexValue = ctx.getEnvironmentKey(indexName)

            updateEnv = (val, idxKey) => {
                ctx.setEnvironmentKey(varName, val)
                ctx.setEnvironmentKey(indexName, idxKey)
            }
            restoreEnv = () => {
                if (oldVarValue !== undefined) ctx.setEnvironmentKey(varName, oldVarValue)
                else ctx.deleteEnvironmentKey(varName)

                if (oldIndexValue !== undefined) ctx.setEnvironmentKey(indexName, oldIndexValue)
                else ctx.deleteEnvironmentKey(indexName)
            }
        } else {
            updateEnv = (val) => ctx.setEnvironmentKey(varName, val)
            restoreEnv = () => {
                if (oldVarValue !== undefined) ctx.setEnvironmentKey(varName, oldVarValue)
                else ctx.deleteEnvironmentKey(varName)
            }
        }

        let output = ""

        for (let i = 0; i < len; i++) {
            const [value, indexOrKey] = iterable[i]
            updateEnv(value, indexOrKey)

            const exec = (await this["resolveCode"](ctx, codeField)) as Return

            if (exec.success || exec.continue) {
                continue
            } else if (exec.break) {
                break
            } else if (exec.return) {
                output += exec.value
            } else if (!this["isValidReturnType"](exec)) {
                restoreEnv()
                return exec
            }
        }

        restoreEnv()
        return this.success(output || null)
    },
})