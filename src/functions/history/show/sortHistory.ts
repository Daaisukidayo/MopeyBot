export default {
  name: "sortHistory",
  description: "Sorts history pages based on the specified sort type.",
  params: [
    {
      name: "_challengeHistory",
      description: "Array of histories.",
      type: "Json",
      required: true,
    },
    {
      name: "_sortType",
      description: "Type of sorting to apply.",
      type: "Number",
      required: true,
    }
  ],
  output: "Json",
  code: `
    $switch[$env[_sortType];
      $case[-1;$arrayAdvancedSort[_challengeHistory;A;B;$math[$env[A;endDate] - $env[B;endDate]];_challengeHistory]]
      $case[0;$arrayAdvancedSort[_challengeHistory;A;B;$math[$env[B;endDate] - $env[A;endDate]];_challengeHistory]]
      $case[1;$arrayAdvancedSort[_challengeHistory;A;B;$math[$env[B;points] - $env[A;points]];_challengeHistory]]
      $case[2;$arrayAdvancedSort[_challengeHistory;A;B;$math[$env[B;rares] - $env[A;rares]];_challengeHistory]]
      $case[3;
        $if[$isOneOf[$get[rareAnimalId];null;]==false;
          $arrayAdvancedSort[_challengeHistory;A;B;$math[$nullish[$env[B;raresList;$get[rareAnimalId]];0] - $nullish[$env[A;raresList;$get[rareAnimalId]];0]];_challengeHistory]
        ]
      ]
    ]
    $return[$env[_challengeHistory]]
  `
}