export default {
  name: "subCash",
  description: "Subs the cash amount from a user's profile.",
  params: [
    { 
      name: "amount", 
      description: "The amount of cash.",
      type: "Number",
      required: true,
    }
  ],
  code: `
    $!jsonSet[userProfile;MC;$sub[$env[userProfile;MC];$round[$env[amount]]]]
  `
}