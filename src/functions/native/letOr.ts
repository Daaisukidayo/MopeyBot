import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$letOr",
  description: "sets the keyword only if it's missing, empty, false, null or undefined",
  unwrap: true,
  brackets: true,
  args: [
    {
      name: "key",
      description: "the keyword's name",
      required: true,
      type: ArgType.String,
      rest: false,
    },
    {
      name: "value",
      description: "the value",
      required: true,
      type: ArgType.String,
      rest: false,
    },
  ],
  async execute(ctx, [key, value]) {
    let val = ctx.getKeyword(key)
    switch (val) {
      case "null":
      case "undefined":
      case "false":
        val = ""
        break
    }
    ctx.setKeyword(key, val || value)
    return this.success()
  },
})
