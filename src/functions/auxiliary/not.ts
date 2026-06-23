export default {
  name: 'not',
  description: "Returns the logical NOT of a boolean value",
  output: "Boolean",
  brackets: true,
  params: [
    {
      name: "_boolean",
      type: "Boolean",
      required: true,
      rest: false,
    }
  ],
  code: `
    $return[$checkCondition[$env[_boolean]!=true]]
  `
}