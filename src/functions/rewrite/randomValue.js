export default {
  name: "advArrayRandomValue",
  description: "Get a random value from an array",
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
      $return[null]
    ]
    $return[$js[
      const arr = $env[array]
      Array.isArray(arr) 
        ? arr\\[Math.floor(Math.random() * arr.length)\\] 
        : "null"
    ]]
  `
}