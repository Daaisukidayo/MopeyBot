import { ArgType, IExtendedCompiledFunctionField, NativeFunction, Return } from "@tryforge/forgescript"
import parseJSON from "@tryforge/forgescript/dist/functions/parseJSON.js"

export default new NativeFunction({
    name: "$arrayMap",
    version: "1.0.0",
    description: "Maps through every element of the array and loads the results to another array",
    unwrap: false,
    output: ArgType.Json,
    experimental: true,
    args: [
        {
            name: "name",
            description: "The variable that holds the array",
            rest: false,
            required: true,
            type: ArgType.String,
        },
        {
            name: "variable",
            description: "The variable to load the element value to",
            rest: false,
            required: true,
            type: ArgType.String,
        },
        {
            name: "code",
            description: "The code to execute for every element",
            rest: false,
            required: true,
            type: ArgType.String,
        },
        {
            name: "other variable",
            description: "The other variable to load the result to, leave empty to return output",
            rest: false,
            required: false,
            type: ArgType.String,
        },
        {
            name: "index",
            description: "The variable to store the index value",
            rest: false,
            required: false,
            type: ArgType.String,
        },
    ],
    brackets: true,
    async execute(ctx) {
        const [nameField, varField, code, otherVarField, indexField] = this.data.fields! as IExtendedCompiledFunctionField[]

        const nameRes = await this["resolveCode"](ctx, nameField)
        if (!this["isValidReturnType"](nameRes)) return nameRes
        const name = nameRes.value as string

        const varRes = await this["resolveCode"](ctx, varField)
        if (!this["isValidReturnType"](varRes)) return varRes
        const varName = varRes.value as string

        let otherVarName: string | null = null
        if (otherVarField) {
            const otherVarRes = await this["resolveCode"](ctx, otherVarField)
            if (!this["isValidReturnType"](otherVarRes)) return otherVarRes
            otherVarName = otherVarRes.value as string | null
        }

        const arr = ctx.getEnvironmentKey(name)
        const newArr = new Array<unknown>()

        if (Array.isArray(arr)) {
            const len = arr.length
            
            if (len === 0) {
                return otherVarName ? 
                    this.success(void ctx.setEnvironmentKey(otherVarName, newArr)) :
                    this.successJSON(newArr)
            }

            const oldVarValue = ctx.getEnvironmentKey(varName)

            let updateEnv: (el: any, i: number) => void
            let restoreEnv: () => void

            if (indexField) {
                const indexRes = await this["resolveCode"](ctx, indexField)
                if (!this["isValidReturnType"](indexRes)) return indexRes
                const indexName = indexRes.value as string

                const oldIndexValue = ctx.getEnvironmentKey(indexName)

                updateEnv = (el, i) => {
                    ctx.setEnvironmentKey(varName, el)
                    ctx.setEnvironmentKey(indexName, i)
                }
                restoreEnv = () => {
                    if (oldVarValue !== undefined) ctx.setEnvironmentKey(varName, oldVarValue)
                    else ctx.deleteEnvironmentKey(varName)

                    if (oldIndexValue !== undefined) ctx.setEnvironmentKey(indexName, oldIndexValue)
                    else ctx.deleteEnvironmentKey(indexName)
                }
            } else {
                updateEnv = (el) => ctx.setEnvironmentKey(varName, el)
                restoreEnv = () => {
                    if (oldVarValue !== undefined) ctx.setEnvironmentKey(varName, oldVarValue)
                    else ctx.deleteEnvironmentKey(varName)
                }
            }

            for (let i = 0; i < len; i++) {
                updateEnv(arr[i], i)

                const rt = (await this["resolveCode"](ctx, code)) as Return

                if (rt.return) {
                    newArr.push(parseJSON(rt.value))
                } else if (!this["isValidReturnType"](rt)) {
                    restoreEnv()
                    return rt
                }
            }

            restoreEnv()
        }

        return otherVarName ? 
            this.success(void ctx.setEnvironmentKey(otherVarName, newArr)) :
            this.successJSON(newArr)
    },
})