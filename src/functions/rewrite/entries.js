export default {
  name: "advJsonEntries",
  description: "Get the entries of a JSON object",
  params: [
    {
      name: "object",
      description: "The object or it's name to get entries from.",
      required: true,
    },
  ],
  code: `
    $jsonLoad[object;$env[object]]
    $if[$typeof[$env[object]]!=object;
      $jsonLoad[object;$env[$env[object]]]
    ]

    $if[$env[object]==;
      $return[\\[\\]]
    ]

    $return[$jsonEntries[object]]
  `
}