export default {
  name: "advJsonStringify",
  description: "Stringify a JSON object",
  params: [
    {
      name: "_json",
      description: "JSON or it's name",
      required: true
    },
    {
      name: "_space",
      description: "Number of spaces for indentation (optional)",
      type: "Number",
      required: false
    }
  ],
  code: `
    $jsonLoad[json;$env[_json]]
    $if[$typeof[$env[json]]==string;
      $jsonLoad[json;$env[$env[json]]]
    ]
    $if[$typeof[$env[json]]!=object;
      $return[null]
    ]
    $return[$jsonStringify[json;$nullish[$env[_space];0]]]
  `
}