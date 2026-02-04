export default {
  name: "fromEntries",
  description: "Converts an array of key-value pairs into an object.",
  params: [
    {
      name: "array",
      description: "Array or it's name of key-value pairs to convert into an object.",
      type: "Array",
      required: true,
    }
  ],
  code: `
    $jsonLoad[array;$env[array]]
    $if[$typeof[$env[array]]==string;
      $jsonLoad[array;$env[$env[array]]]
    ]
    $if[$isArray[$env[array]];;
      $return[{}]
    ]
    $jsonLoad[obj;{}]
    $arrayForEach[array;e;
      $!jsonSet[obj;$env[e;0];$env[e;1]]
    ]
    $return[$env[obj]]
  `
}