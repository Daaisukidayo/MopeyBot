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

    $let[predict;0]

    $jsonLoad[events;$dump[$getProgress[$get[id]];events]]

    $if[$arrayLength[events]>5;
      $arrayMap[events;e;$return[$env[e;0]];times]
      $arrayMap[events;e;$return[$env[e;1]];scores]

      $let[totalGain;0]
      $let[totalDelay;0]

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
      $let[predict;$round[$math[$get[totalPoints] + $get[possibleInputs] * $get[avgGain]]]]
      $if[$get[predict]<0;
        $let[predict;0]
      ]
    ]
    

    $let[styled;$if[$advArrayIncludes[$dump[$getProfile[$get[id]];challenge;settings];hidePrediction];||$get[predict]||;\`$get[predict]\`]]

    $return[$tl[ui.challenge.prediction;$get[styled]]]
  `
}