export default {
  name: "separate",
  description: "Separates a number with a specified separator.",
  params: [
    {
      name: "number",
      description: "The number to separate.",
      type: "Number",
      required: true,
    },
    {
      name: "separator",
      description: "The separator to use.",
      type: "String",
      required: false,
    }
  ],
  code: `
    $return[$separateNumber[$env[number];$nullish[$getGlobalVar[NS];$env[separator]]]]
  `
}