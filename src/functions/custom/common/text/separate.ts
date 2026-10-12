import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "separate",
  description: "Separates a number with a specified separator.",
  output: ArgType.String,
  params: [
    {
      name: "number",
      description: "The number to separate.",
      type: ArgType.Number
    },
    {
      name: "separator",
      description: "The separator to use.",
      type: ArgType.Unknown,
      required: false
    }
  ],
  code: `
    $return[$separateBigint[$env[number];$nullish[$env[separator];$getGlobalVar[numberSeparator]]]]
  `
})
