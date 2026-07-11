import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "setCash",
  description: "Sets the cash amount for a user's profile.",
  params: [
    { 
      name: "_amount", 
      description: "The amount of cash.",
      type: ArgType.Number,
    }
  ],
  code: `
    $!jsonSet[userProfile;MC;$round[$env[_amount]]]
  `
})