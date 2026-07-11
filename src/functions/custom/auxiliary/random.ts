import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "random",
  description: "Generates a random number between minimal and maximal (inclusive).",
  output: ArgType.Number,
  params: [
    {
      name: "_min",
      description: "The minimum number (inclusive).",
      type: ArgType.Number,
    },
    {
      name: "_max",
      description: "The maximum number (inclusive).",
      type: ArgType.Number,
    },
    {
      name: "_decimals",
      description: "Whether to include decimals.",
      type: ArgType.Boolean,
      required: false,
    },
  ],
  code: `
    $return[$randomNumber[$env[_min];$math[$env[_max] + 1];$nullish[$env[_decimals];false]]]
  `
})