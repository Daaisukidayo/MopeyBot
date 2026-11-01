import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$isOneOf",
  description: "whether the string equals any of the others",
  output: ArgType.Boolean,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "string",
      description: "the string to check",
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: "matches",
      description: "one or more values to compare against",
      type: ArgType.String,
      required: true,
      rest: true,
    },
  ],
  async execute(ctx, [string, matches]) {
    return this.success(matches.includes(string))
  },
})
