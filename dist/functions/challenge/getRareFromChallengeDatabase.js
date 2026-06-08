"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "getRareFromCDB",
    description: "Searches animal in challenge database, returns object.",
    params: [
        {
            name: "_animalId",
            description: "Animal identifier from '/animals.json'.",
            required: true,
        }
    ],
    output: "Json",
    code: `
    $jsonLoad[challengeData;$getGlobalVar[challengeData]]
    
    $loop[$arrayLength[challengeData];
      $let[i;$math[$env[i] - 1]]

      $if[$advArrayIncludes[$env[challengeData;$get[i];rares];$env[_animalId]];;$continue]

      $let[points;$env[challengeData;$get[i];points]]
      $let[category;$env[challengeData;$get[i];category]]

      $jsonLoad[output;{ 
        "points": $get[points],
        "category": $get[category]
      }]
      $break
    ;i;true]

    $if[$isJSON[$env[output]]==false;
      $jsonLoad[output;{
        "points": 0,
        "category": -1
      }]
    ]

    $return[$env[output]]
  `
};
//# sourceMappingURL=getRareFromChallengeDatabase.js.map