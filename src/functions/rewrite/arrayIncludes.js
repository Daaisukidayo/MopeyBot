export default {
  name: "advArrayIncludes",
  description: "Checks whether a value exists in an array",
  params: [
    {
      name: "array",
      description: "The array or it's name the array is held on",
      type: "String",
      required: true
    },
    {
      name: "value",
      description: "The value to check for",
      type: "String",
      required: true
    },
  ],
  code: `
    $jsonLoad[array;$env[array]]
    $if[$typeof[$env[array]]==string;
      $jsonLoad[array;$env[$env[array]]]
    ]
    $if[$env[array]==;
      $return[null]
    ]

    $return[$arrayIncludes[array;$env[value]]]
  `
}