import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$pluralRule",
  description:
    "a number's plural category in a language, straight from Intl.PluralRules: zero, one, two, few, many or other",
  output: ArgType.String,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "number",
      description: "the number",
      type: ArgType.Number,
      required: true,
      rest: false,
    },
    {
      name: "language",
      description: "the language code, en-US by default",
      type: ArgType.String,
      required: false,
      rest: false,
    },
  ],
  execute: async function (ctx, [number, language]) {
    try {
      return this.success(new Intl.PluralRules(language ?? "en-US").select(number))
    } catch {
      return this.success(new Intl.PluralRules("en-US").select(number))
    }
  },
})
