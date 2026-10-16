import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$ternary",
  description:
    "Checks every provided value and return one if it's not empty or false. Returns last value if nothing matched.",
  output: ArgType.Unknown,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "values",
      description: "A list of values to check and return the first non-false/empty item from.",
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
