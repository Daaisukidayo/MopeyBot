export default {
  name: "subCash",
  description: "Subs the cash amount from a user's profile.",
  params: [
    { 
      name: "_amount", 
      description: "The amount of cash.",
      type: "Number",
      required: true,
    }
  ],
  code: `
    $!jsonSub[userProfile;MC;$round[$env[_amount]]]
  `
}