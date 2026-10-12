import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$not",
  description: "Returns the logical NOT of a boolean value",
  output: ArgType.Boolean,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "boolean",
      description: "The boolean value to invert.",
      type: ArgType.Boolean,
      required: true,
      rest: false
    }
  ],
  async execute(ctx, [bool]) {
    return this.success(!bool)
  }
})
