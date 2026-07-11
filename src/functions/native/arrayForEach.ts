import { ArgType, IExtendedCompiledFunctionField, NativeFunction, Return } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$arrayForEach",
    description: "Loops through every element of the array",
    unwrap: false,
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
            name: "index",
            description: "The variable to store the index value",
            rest: false,
            required: false,
            type: ArgType.String,
        },
    ],
    brackets: true,
    experimental: true,
    async execute(ctx) {
        const [nameField, varField, code, indexField] = this.data.fields! as IExtendedCompiledFunctionField[]
        
        const nameRes = await this["resolveCode"](ctx, nameField)
        if (!this["isValidReturnType"](nameRes)) return nameRes
        const name = nameRes.value as string

        const varRes = await this["resolveCode"](ctx, varField)
        if (!this["isValidReturnType"](varRes)) return varRes
        const varName = varRes.value as string

        const arr = ctx.getEnvironmentKey(name)

        if (Array.isArray(arr)) {
            const len = arr.length
            if (len === 0) return this.success()

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
                    if (oldVarValue !== undefined) 
                        ctx.setEnvironmentKey(varName, oldVarValue)
                    else 
                        ctx.deleteEnvironmentKey(varName)

                    if (oldIndexValue !== undefined) 
                        ctx.setEnvironmentKey(indexName, oldIndexValue)
                    else 
                        ctx.deleteEnvironmentKey(indexName)
                }
            } else {
                updateEnv = (el) => ctx.setEnvironmentKey(varName, el)
                restoreEnv = () => {
                    if (oldVarValue !== undefined) 
                        ctx.setEnvironmentKey(varName, oldVarValue)
                    else 
                        ctx.deleteEnvironmentKey(varName)
                }
            }

            for (let i = 0; i < len; i++) {
                updateEnv(arr[i], i)

                const rt = (await this["resolveCode"](ctx, code)) as Return

                if (!this["isValidReturnType"](rt)) {
                    restoreEnv()
                    return rt
                }
            }

            restoreEnv()
        }

        return this.success()
    },
})