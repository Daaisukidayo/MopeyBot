export default {
  name: 'isOneOf',
  description: "Checks whether the string is equal to one of the other strings in the set",
  params: [
    {
      name: 'text',
      required: true,
    },
    {
      name: 'matches',
      required: true,
      rest: true
    },
  ],
  code: `
    $return[$arraySome[matches;elem;$return[$checkCondition[$env[elem]==$env[text]]]]]
  `
}