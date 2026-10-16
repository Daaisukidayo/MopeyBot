import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$letOr",
  description: "Overwrites the keyword value if the value doesn't exist, is empty, false, null, or undefined",
  unwrap: true,
  brackets: true,
  args: [
    {
      name: "key",
      description: "The key name",
      required: true,
      type: ArgType.String,
      rest: false,
    },
    {
      name: "value",
      description: "The key value",
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
