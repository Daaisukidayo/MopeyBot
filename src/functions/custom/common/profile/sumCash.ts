import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "sumCash",
  description: "Sums the cash amount to a user's profile.",
  params: [
    {
      name: "amount",
      description: "The amount of cash.",
      type: ArgType.Number
    }
  ],
  code: `
    $jsonMath[userProfile;MC;$round[$env[amount]]]
  `
})
