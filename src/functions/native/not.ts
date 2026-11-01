import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$not",
  description: "logical NOT",
  output: ArgType.Boolean,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "boolean",
      description: "the boolean to flip",
      type: ArgType.Boolean,
      required: true,
      rest: false,
    },
  ],
  async execute(ctx, [bool]) {
    return this.success(!bool)
  },
})
