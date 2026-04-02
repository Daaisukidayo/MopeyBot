export default {
  name: 'nullish',
  description: "Checks every provided argument and return one if it's not empty, null or undefined",
  params: [
    {
      name: 'arguments',
      required: true,
      rest: true
    },
  ],
  output: "String",
  code: `
    $arrayForEach[arguments;argument;
      $if[$isOneOf[$env[argument];null;undefined;]==false;
        $return[$env[argument]]
      ]
    ]
  `
}