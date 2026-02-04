export default {
  name: "getRareFromCDB",
  description: "Searches animal in challenge database, returns object.",
  params: [
    {
      name: "animalID",
      description: "Animal identifier from '/animals.json'.",
      required: true,
    }
  ],
  code: `
    $if[$env[challengeData]==;
      $jsonLoad[challengeData;$getGlobalVar[challengeData]]
    ]

    $loop[$arrayLength[challengeData];
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[challengeDataRaresList;$env[challengeData;$get[i];rares]]
      $if[$arrayIncludes[challengeDataRaresList;$env[animalID]];;$continue]
      $jsonLoad[output;{ "points": $env[challengeData;$get[i];points], "category": $env[challengeData;$get[i];category] }]
      $break
    ;i;true]

    $if[$isJSON[$env[output]];;
      $jsonLoad[output;{ "points": 0, "category": -1 }]
    ]
    $return[$env[output]]
  `
}