import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "sortHistory",
  description: "Sorts history pages based on the specified sort type.",
  output: ArgType.Json,
  params: [
    {
      name: "_challengeHistory",
      description: "Array of histories.",
      type: ArgType.Json,
    },
    {
      name: "_sortType",
      description: "Type of sorting to apply.",
      type: ArgType.Number,
    }
  ],
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
})