export default {
  name: 'advJsonKeys',
  params: [
    {
      name: "json",
      description: "JSON or it's name",
      required: true
    },
  ],
  code: `
    $jsonLoad[json;$env[json]]
    $if[$typeof[$env[json]]==string;
      $jsonLoad[json;$env[$env[json]]]
    ]
    $if[$typeof[$env[json]]!=object;
      $return[\\[\\]]
    ]
    $return[$jsonKeys[json]]
  `
}