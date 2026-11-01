import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$ternary",
  description: "returns the first value that's not empty or false, or the last one if none match",
  output: ArgType.Unknown,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "values",
      description: "the values to check",
      type: ArgType.Unknown,
      required: true,
      rest: true,
    },
  ],
  async execute(ctx, [values]) {
    for (const value of values) {
      switch (value) {
        case "":
        case "false":
          continue
        default:
          return this.success(value)
      }
    }

    return this.success(values.at(-1))
  },
})
