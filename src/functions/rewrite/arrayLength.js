export default {
  name: "advArrayLength",
  description: "Get the length of an array",
  params: [
    {
      name: "array",
      description: "Array or it's name",
      type: "Array",
      required: true
    }
  ],
  code: `
    $jsonLoad[array;$env[array]]
    $if[$typeof[$env[array]]==string;
      $jsonLoad[array;$env[$env[array]]]
    ]
    $if[$env[array]==;
      $return[-1]
    ]
    $return[$js[
      Array.isArray($env[array]) 
        ? $env[array].length 
        : -1
    ]]
  `
}