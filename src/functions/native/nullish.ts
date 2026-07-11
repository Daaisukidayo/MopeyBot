import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$nullish",
  description: "Checks every provided value and returns the first one that is not empty, 'null' or 'undefined'.",
  output: ArgType.String,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "values",
      description: "A list of values to check.",
      type: ArgType.String,
      required: true,
      rest: true
    },
  ],
  async execute(ctx, [values]) {
    const len = values.length
    for (let i = 0; i < len - 1; i++) {
      const arg = values[i]
      
      if (arg === "" || arg === "null" || arg === "undefined") continue

      return this.success(arg)
    }

    return this.success(values.at(-1))
  }
})