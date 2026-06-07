export default {
  name: "nullish",
  description: "Checks every provided argument and return one if it's not empty, null or undefined. Returns last argument if nothing matched.",
  params: [
    {
      name: "_arguments",
      rest: true
    },
  ],
  code: `
    $arrayForEach[_arguments;argument;
      $if[$isOneOf[$env[argument];null;undefined;]==false;
        $return[$env[argument]]
      ]
    ]

    $return[$arrayAt[_arguments;$math[$arrayLength[_arguments] - 1]]]
  `
}