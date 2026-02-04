export default {
  name: "advJsonStringify",
  description: "Stringify a JSON object",
  params: [
    {
      name: "json",
      description: "JSON or it's name",
      type: "Any",
      required: true
    },
    {
      name: "space",
      description: "Number of spaces for indentation (optional)",
      type: "Number",
      required: false
    }
  ],
  code: `
    $jsonLoad[json;$env[json]]
    $if[$typeof[$env[json]]==string;
      $jsonLoad[json;$env[$env[json]]]
    ]
    $if[$typeof[$env[json]]!=object;
      $return[null]
    ]
    $return[$jsonStringify[json;$default[$env[space];0]]]
  `
}