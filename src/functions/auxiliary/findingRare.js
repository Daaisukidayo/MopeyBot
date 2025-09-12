export default {
  name: 'findingRareInChallengeDataBase',
  params: ["animalID"],
  code: `
    $loop[$arrayLength[challengeData];
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[challengeDataRaresList;$env[challengeData;$get[i];rares]]
      $if[$arrayIncludes[challengeDataRaresList;$env[animalID]];;$continue]
      $jsonLoad[output;{ "points": $env[challengeData;$get[i];points], "category": "$env[challengeData;$get[i];category]" }]
      $break
    ;i;true]
    $if[$isJSON[$env[output]];;$jsonLoad[output;{ "points": 0, "category": "undefined" }]]
    $return[$env[output]]
  `
}