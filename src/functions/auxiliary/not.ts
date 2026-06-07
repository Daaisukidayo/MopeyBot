export default {
  name: 'not',
  description: "Returns the logical NOT of a boolean value",
  params: [
    {
      name: "_boolean",
      type: "Boolean",
      required: true
    }
  ],
  output: "boolean",
  code: `
    $return[$checkCondition[$env[_boolean]!=true]]
  `
}