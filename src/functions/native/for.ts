import {
  IExtendedCompiledFunctionField,
  NativeFunction,
  Return,
  ArgType,
  IExtendedCompiledFunctionConditionField,
} from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$for",
  description: "Executes a traditional for loop",
  unwrap: false,
  brackets: true,
  args: [
    {
      name: "init",
      description: "The initialization code (runs once before the loop starts)",
      rest: false,
      type: ArgType.String,
    },
    {
      name: "condition",
      description: "The loop condition code (evaluated before each iteration)",
      condition: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: "step",
      description: "The step expression code (runs at the end of each iteration)",
      rest: false,
      type: ArgType.String,
    },
    {
      name: "code",
      description: "The main code block to execute inside the loop",
      rest: false,
      required: true,
      type: ArgType.String,
    },
  ],
  async execute(ctx) {
    const { 0: initField, 2: stepField, 3: codeField } = this.data.fields as IExtendedCompiledFunctionField[]
    const conditionField = this.data.fields?.at(1) as IExtendedCompiledFunctionConditionField

    const ctxClone = ctx.clone()

    const initRes: Return = await this["resolveCode"](ctxClone, initField)
    if (!this["isValidReturnType"](initRes)) return initRes

    let output = ""

    while (true) {
      const conditionRes: Return = await this["resolveCondition"](ctxClone, conditionField)

      if (!this["isValidReturnType"](conditionRes)) return conditionRes

      if (conditionField.lhs.value !== "" && !conditionRes.value) break

      const exec: Return = await this["resolveCode"](ctxClone, codeField)

      if (exec.success || exec.continue) {
        /* the next round */
      } else if (exec.break) break
      else if (exec.return) output += exec.value
      else if (!this["isValidReturnType"](exec)) return exec

      const stepRes: Return = await this["resolveCode"](ctxClone, stepField)
      if (!this["isValidReturnType"](stepRes)) return stepRes
    }

    return this.success(output)
  },
})
