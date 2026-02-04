export default {
  name: "random",
  description: "Generates a random number between min and max (inclusive).",
  params: [
    {
      name: "min",
      description: "The minimum number (inclusive).",
      type: "Number",
      required: true
    },
    {
      name: "max",
      description: "The maximum number (inclusive).",
      type: "Number",
      required: true
    },
    {
      name: "decimals",
      description: "Include decimals.",
      type: "Boolean",
      required: false
    },
  ],
  code: `
    $return[$randomNumber[$env[min];$math[$env[max] + 1];$nullish[$env[decimals];false]]]
  `
}