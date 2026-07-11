import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "sumCash",
  description: "Sums the cash amount to a user's profile.",
  params: [
    { 
      name: "_amount", 
      description: "The amount of cash.", 
      type: ArgType.Number,
    }
  ],
  code: `
    $!jsonSum[userProfile;MC;$round[$env[_amount]]]
  `
})