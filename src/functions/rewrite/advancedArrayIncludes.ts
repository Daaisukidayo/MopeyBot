export default {
  name: "advArrayIncludes",
  description: "Checks whether a value exists in an array",
  params: [
    {
      name: "_array",
      description: "The array or it's name the array is held on",
      required: true
    },
    {
      name: "value",
      description: "The value to check for",
      required: true
    },
  ],
  output: "Boolean",
  code: `
    $jsonLoad[array;$env[_array]]
    $if[$typeof[$env[array]]==string;
      $jsonLoad[array;$env[$env[array]]]
    ]
    $if[$env[array]==;
      $return[false]
    ]

    $return[$arrayIncludes[array;$env[value]]]
  `
}