export default {
  name: 'not',
  params: [
    {
      name: "boolean",
      type: "Boolean",
      required: true
    }
  ],
  code: `
    $return[$checkCondition[$env[boolean]!=true]]
  `
}