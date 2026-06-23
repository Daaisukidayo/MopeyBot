export default {
  name: 'isOneOf',
  description: "Checks whether the string is equal to one of the other strings in the set",
  output: "Boolean",
  brackets: true,
  params: [
    {
      name: '_string',
    },
    {
      name: '_matches',
      rest: true
    },
  ],
  code: `
    $return[$arrayIncludes[_matches;$env[_string]]]
  `
}