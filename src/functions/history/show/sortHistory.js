export default {
  name: "sortHistory",
  description: "Sorts history pages based on the specified sort type.",
  params: [
    {
      name: "history",
      description: "Array of history pages.",
      type: "Array",
      required: true,
    },
    {
      name: "sortType",
      description: "Type of sorting to apply.",
      type: "Number",
      required: true,
    }
  ],
  code: `
    $jsonLoad[history;$env[history]]
    $let[sortType;$env[sortType]]

    $switch[$get[sortType];
      $case[0;
        $arrayAdvancedSort[history;A;B;
          $math[$env[B;endDate] - $env[A;endDate]]
        ;history]
      ]

      $case[1;
        $arrayAdvancedSort[history;A;B;
          $math[$env[B;points] - $env[A;points]]
        ;history]
      ]

      $case[2;
        $arrayAdvancedSort[history;A;B;
          $math[$env[B;rares] - $env[A;rares]]
        ;history]
      ]
    ]

    $return[$env[history]]
  `
}