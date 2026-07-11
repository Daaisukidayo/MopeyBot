import { ArgType, IExtendedCompiledFunctionConditionField, IExtendedCompiledFunctionField, NativeFunction, Return } from "@tryforge/forgescript"
import isTrue from "@tryforge/forgescript/dist/functions/isTrue.js"

export default new NativeFunction({
    name: "$arraySome",
    description: "Loops through every element of the array to find a match",
    unwrap: false,
    output: ArgType.Boolean,
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
            condition: true,
            required: true,
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
        const [nameField, varField, code, indexField] = this.data.fields! as IExtendedCompiledFunctionField[]

        const nameRes = await this["resolveCode"](ctx, nameField)
        if (!this["isValidReturnType"](nameRes)) return nameRes
        const name = nameRes.value as string

        const varRes = await this["resolveCode"](ctx, varField)
        if (!this["isValidReturnType"](varRes)) return varRes
        const variable = varRes.value as string

        const arr = ctx.getEnvironmentKey(name)

        if (Array.isArray(arr)) {
            const len = arr.length
            if (len === 0) return this.success(false)

            const oldVarValue = ctx.getEnvironmentKey(variable)

            let updateEnv: (el: any, i: number) => void
            let restoreEnv: () => void

            if (indexField) {
                const indexRes = await this["resolveCode"](ctx, indexField)
                if (!this["isValidReturnType"](indexRes)) return indexRes
                const indexName = indexRes.value as string

                const oldIndexValue = ctx.getEnvironmentKey(indexName)

                updateEnv = (el, i) => {
                    ctx.setEnvironmentKey(variable, el)
                    ctx.setEnvironmentKey(indexName, i)
                }
                restoreEnv = () => {
                    if (oldVarValue !== undefined) 
                        ctx.setEnvironmentKey(variable, oldVarValue)
                    else 
                        ctx.deleteEnvironmentKey(variable)

                    if (oldIndexValue !== undefined) 
                        ctx.setEnvironmentKey(indexName, oldIndexValue)
                    else 
                        ctx.deleteEnvironmentKey(indexName)
                }
            } else {
                updateEnv = (el) => ctx.setEnvironmentKey(variable, el)
                restoreEnv = () => {
                    if (oldVarValue !== undefined) 
                        ctx.setEnvironmentKey(variable, oldVarValue)
                    else 
                        ctx.deleteEnvironmentKey(variable)
                }
            }

            for (let i = 0; i < len; i++) {
                updateEnv(arr[i], i)

                const rt = (await this["resolveCondition"](ctx, code as unknown as IExtendedCompiledFunctionConditionField)) as Return

                if (rt.return || rt.success) {
                    if (!isTrue(rt)) continue
                    
                    restoreEnv()
                    return this.success(true)
                } else if (!this["isValidReturnType"](rt)) {
                    restoreEnv()
                    return rt
                }
            }

            restoreEnv()
        }

        return this.success(false)
    },
})