export default {
  name: "setCash",
  description: "Sets the cash amount for a user's profile.",
  params: [
    { 
      name: "amount", 
      description: "The amount of cash.",
      type: "Number",
      required: true,
    }
  ],
  code: `
    $!jsonSet[userProfile;MC;$round[$env[amount]]]
  `
}