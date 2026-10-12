import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$isOneOf",
  description: "Checks whether the string is equal to one of the other strings in the set",
  output: ArgType.Boolean,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "string",
      description: "The string to check for a match against any of the provided values",
      type: ArgType.String,
      required: true,
      rest: false
    },
    {
      name: "matches",
      description: "One or more values (strings) to compare",
      type: ArgType.String,
      required: true,
      rest: true
    }
  ],
  async execute(ctx, [string, matches]) {
    return this.success(matches.includes(string))
  }
})
