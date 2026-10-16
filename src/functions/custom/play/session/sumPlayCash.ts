import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "sumPlayCash",
  params: [
    {
      name: "playDataVar",
      description: "The name of the variable that holds the play data.",
      type: ArgType.String,
    },
    {
      name: "amount",
      description: "The amount of coins to add.",
      type: ArgType.Number,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $jsonMath[playData;MC;$round[$env[amount]]]
  `,
})
