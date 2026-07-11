import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "subCash",
  description: "Subs the cash amount from a user's profile.",
  params: [
    { 
      name: "_amount", 
      description: "The amount of cash.",
      type: ArgType.Number,
    }
  ],
  code: `
    $!jsonSub[userProfile;MC;$round[$env[_amount]]]
  `
})