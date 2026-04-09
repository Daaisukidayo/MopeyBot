export default {
  name: "showPredict",
  description: "Shows the user's points prediction of 1 hour luck challenge in content format.",
  params: [
    {
      name: "user_id",
      description: "The user ID to show the points prediction for.",
      required: false,
    },
  ],
  brackets: false,
  code: `
    $let[id;$findUser[$env[user_id];true]]

    $jsonLoad[challengeProgress;$getProgress[$get[id]]]
    $jsonLoad[events;$env[challengeProgress;events]]
    
    $let[totalPoints;$env[challengeProgress;points]]

    $let[limit;25]
    $let[finalPredict;0]
    $let[totalGain;0]
    $let[totalDelay;0]

    $c[
      $if[$arrayLength[events]>5;
        $arrayMap[events;e;$return[$env[e;0]];times]
        $arrayMap[events;e;$return[$env[e;1]];scores]
  
        $loop[$arrayLength[events];
          $let[gain;$math[$env[scores;$env[i]] - $env[scores;$sub[$env[i];1]]]]
          $let[delay;$math[$env[times;$env[i]] - $env[times;$sub[$env[i];1]]]]
          $if[$get[delay]>0;
            $letSum[totalGain;$get[gain]]
            $letSum[totalDelay;$get[delay]]
          ]
        ;i;true]
  
        $let[avgGain;$math[$get[totalGain] / ($arrayLength[events] - 1)]]
        $let[avgDelay;$math[$get[totalDelay] / ($arrayLength[events] - 1)]]
        $let[safeAvgDelay;$max[0.1;$get[avgDelay]]]
  
        $let[remainingTime;$sub[3600;$getUserVar[1htime|$channelID;$get[id]]]]
        $let[possibleInputs;$divide[$get[remainingTime];$get[safeAvgDelay]]]
        $let[finalPredict;$round[$math[$get[totalPoints] + $get[possibleInputs] * $get[avgGain]]]]
        $if[$get[finalPredict]<0;
          $let[finalPredict;0]
        ]
      ]
    ]

    $if[$arrayLength[events]>5;
      $arraySlice[events;recent;-$get[limit]]
      $arrayMap[recent;e;$return[$env[e;0]];times]
      $arrayMap[recent;e;$return[$env[e;1]];scores]

      $loop[$arrayLength[recent];
        $let[gain;$math[$env[scores;$env[i]] - $env[scores;$sub[$env[i];1]]]]
        $let[delay;$math[$env[times;$env[i]] - $env[times;$sub[$env[i];1]]]]
        $if[$get[delay]>0;
          $letSum[totalGain;$get[gain]]
          $letSum[totalDelay;$get[delay]]
        ]
      ;i;true]
      
      $let[avgGain;$math[$get[totalGain] / ($arrayLength[recent] - 1)]]
      $let[avgDelay;$math[$get[totalDelay] / ($arrayLength[recent] - 1)]]
      $let[safeAvgDelay;$max[0.1;$get[avgDelay]]]

      $let[remainingTime;$sub[3600;$getUserVar[1htime|$channelID;$get[id]]]]
      $let[possibleInputs;$divide[$get[remainingTime];$get[safeAvgDelay]]]
      
      $let[basePredict;$round[$math[$get[totalPoints] + $get[possibleInputs] * $get[avgGain]]]]
      $let[luckyPredict;$round[$math[$get[basePredict] * 1.15]]]
      $c[
        $let[finalPredict;$get[basePredict] - $get[luckyPredict]]
      ]
      $let[finalPredict;$get[basePredict]]
    ]
    

    $let[styled;$if[$advArrayIncludes[$env[userProfile;challenge;settings];hidePrediction];||$get[finalPredict]||;\`$get[finalPredict]\`]]

    $return[$tl[ui.challenge.prediction;$get[styled]]]
  `
}