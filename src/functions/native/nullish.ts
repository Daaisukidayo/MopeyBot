import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$nullish",
  description: "the first value that's not empty, 'null' or 'undefined'",
  output: ArgType.String,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "values",
      description: "the values to check",
      type: ArgType.String,
      required: true,
      rest: true,
    },
  ],
  async execute(ctx, [values]) {
    for (const value of values) {
      switch (value) {
        case "":
        case "null":
        case "undefined":
          continue

        default:
          return this.success(value)
      }
    }

    return this.success(values.at(-1))
  },
})
