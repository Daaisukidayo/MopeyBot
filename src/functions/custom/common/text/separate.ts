import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "separate",
  description: "splits a number's digits into groups w/ a separator",
  output: ArgType.String,
  params: [
    {
      name: "number",
      description: "the number",
      type: ArgType.Number,
    },
    {
      name: "separator",
      description: "the separator (default numberSeparator)",
      type: ArgType.Unknown,
      required: false,
    },
  ],
  code: `
    $return[$separateBigint[$env[number];$nullish[$env[separator];$getGlobalVar[numberSeparator]]]]
  `,
})
