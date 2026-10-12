import { ArgType, NativeFunction } from "@tryforge/forgescript"

const BigIntFormatRegex = /^\d+n$/

export default new NativeFunction({
  name: "$boolean",
  description: "Converts an argument into its real boolean representation.",
  output: ArgType.Boolean,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "argument",
      description: "The argument to convert to a boolean.",
      type: ArgType.String,
      required: true,
      rest: false
    }
  ],
  execute: async function (ctx, [arg]) {
    if (arg === "true") return this.success(true)
    if (arg === "undefined" || arg === "false" || arg === "NaN") return this.success(false)

    if (BigIntFormatRegex.test(arg)) return this.success(arg !== "0n")

    if (!!arg.trim() && !isNaN(Number(arg))) {
      const num = Number(arg)
      return this.success(num !== 0)
    }

    try {
      const parsed = JSON.parse(arg)

      if (parsed === null) return this.success(false)

      if (typeof parsed === "object") {
        if (Array.isArray(parsed)) {
          return this.success(parsed.length > 0)
        }
        return this.success(Object.keys(parsed).length > 0)
      }
    } catch {}

    return this.success(arg !== "")
  }
})
