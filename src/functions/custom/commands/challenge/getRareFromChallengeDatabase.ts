import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getRareFromCDB",
  description: "Searches animal in challenge database, returns object.",
  output: ArgType.Json,
  params: [
    {
      name: "_animalId",
      description: "Animal identifier from '/animals.json'.",
      type: ArgType.String,
    }
  ],
  code: `    
    $forOf[$getGlobalVar[challengeData];data;
      $if[$arrayIncludes[$env[data;rares];$env[_animalId]]==false;$continue]

      $jsonLoad[output;{ 
        "points": $env[data;points],
        "category": $env[data;category]
      }]
      $break
    ]

    $if[$isJSON[$env[output]]==false;
      $jsonLoad[output;{
        "points": 0,
        "category": -1
      }]
    ]

    $return[$env[output]]
  `
})