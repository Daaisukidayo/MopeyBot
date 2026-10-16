import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "random",
  description: "Generates a random number between minimal and maximal (inclusive).",
  output: ArgType.Number,
  params: [
    {
      name: "min",
      description: "The minimum number (inclusive).",
      type: ArgType.Number,
    },
    {
      name: "max",
      description: "The maximum number (inclusive).",
      type: ArgType.Number,
    },
    {
      name: "decimals",
      description: "Whether to include decimals.",
      type: ArgType.Boolean,
      required: false,
    },
  ],
  code: `
    $c[A whole number can be the maximum too, a decimal one is below it]
    $return[$if[$env[decimals];$randomNumber[$env[min];$env[max];true];$randomNumber[$env[min];$math[$env[max] + 1]]]]
  `,
})
