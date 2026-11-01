import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$ref",
  description:
    "makes a var share another var's object instead of copying it. replacing either var whole breaks the link",
  unwrap: true,
  brackets: true,
  args: [
    {
      name: "name",
      description: "the new var's name",
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: "source",
      description: "the var to point to",
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  async execute(ctx, [name, source]) {
    const value = ctx.getEnvironmentKey(source)
    if (value === undefined) return this.customError(`Variable "${source}" does not exist`)

    ctx.setEnvironmentKey(name, value)
    return this.success()
  },
})
