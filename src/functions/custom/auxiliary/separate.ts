import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "separate",
  description: "Separates a number with a specified separator.",
  output: ArgType.String,
  params: [
    {
      name: "_number",
      description: "The number to separate.",
      type: ArgType.Number,
    },
    {
      name: "_separator",
      description: "The separator to use.",
      type: ArgType.Unknown,
      required: false,
    }
  ],
  code: `
    $return[$separateBigint[$env[_number];$nullish[$env[_separator];$getGlobalVar[numberSeparator]]]]
  `
})