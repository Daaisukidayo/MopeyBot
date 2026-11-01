import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "random",
  description: "a random number between min and max, both inclusive",
  output: ArgType.Number,
  params: [
    {
      name: "min",
      description: "the min (inclusive)",
      type: ArgType.Number,
    },
    {
      name: "max",
      description: "the max (inclusive)",
      type: ArgType.Number,
    },
    {
      name: "decimals",
      description: "allow decimals",
      type: ArgType.Boolean,
      required: false,
    },
  ],
  code: `
    $c[ints can hit the max, decimals stay below it]
    $return[$if[$env[decimals];$randomNumber[$env[min];$env[max];true];$randomNumber[$env[min];$math[$env[max] + 1]]]]
  `,
})
