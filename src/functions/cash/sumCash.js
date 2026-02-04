export default {
  name: "sumCash",
  description: "Sums the cash amount to a user's profile.",
  params: [
    { 
      name: "amount", 
      description: "The amount of cash.", 
      type: "Number",
      required: true, 
    }
  ],
  code: `
    $!jsonSet[userProfile;MC;$sum[$env[userProfile;MC];$round[$env[amount]]]]
  `
}