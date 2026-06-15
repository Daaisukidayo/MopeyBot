export default {
  name: "showPredict",
  description: "Shows the user's points prediction of 1 hour luck challenge in content format.",
  params: [
    {
      name: "_userId",
      description: "The user to show the points prediction for.",
      type: "User",
      required: false,
    },
  ],
  brackets: false,
  code: `
    $let[userId;$findUser[$env[_userId];true]]

    $jsonLoad[userProfile;$getProfile[$get[userId]]]
    $jsonLoad[challengeProgress;$getProgress[$get[userId]]]
    $jsonLoad[events;$env[challengeProgress;events]]
    
    $let[l;$env[userProfile;language]]
    $let[totalPoints;$env[challengeProgress;points]]

    $let[finalPredict;0]
    $let[totalGain;0]
    $let[totalDelay;0]

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

      $let[remainingTime;$sub[3600;$getTimer[$get[id]]]]
      $let[possibleInputs;$divide[$get[remainingTime];$get[safeAvgDelay]]]
      $let[finalPredict;$round[$math[$get[totalPoints] + $get[possibleInputs] * $get[avgGain]]]]
      $if[$get[finalPredict]<0;
        $let[finalPredict;0]
      ]
    ]

    $let[styled;$if[$arrayIncludes[$env[userProfile;challenge;settings];hidePrediction];||$get[finalPredict]||;\`$get[finalPredict]\`]]

    $return[$tl[$get[l];ui;challenge.prediction;$get[styled]]]
  `
}