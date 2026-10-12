import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "showPredict",
  description:
    "Displays the points prediction of a 1 hour luck challenge in content format, hidden when the profile's settings say so.",
  params: [
    {
      name: "progressVar",
      description: "The name of the variable that holds the challenge progress.",
      type: ArgType.String
    },
    {
      name: "userId",
      description: "The user whose challenge timer is read (default: the author).",
      type: ArgType.User,
      required: false
    }
  ],
  code: `
    $ref[progress;$env[progressVar]]
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[events;$jsonGet[progress;events]]
    $let[prediction;0]

    $c[An event is [seconds, points\\]: every one after the first is compared with the one before it]
    $if[$jsonSize[events]>5;
      $let[totalGain;0]
      $let[totalDelay;0]
      $arrayForEach[$arraySlice[events;;1];event;
        $jsonLoad[previous;$jsonGet[events;$env[i]]]
        $let[delay;$math[$jsonGet[event;0] - $jsonGet[previous;0]]]
        $if[$get[delay]>0;
          $letSum[totalGain;$math[$jsonGet[event;1] - $jsonGet[previous;1]]]
          $letSum[totalDelay;$get[delay]]
        ]
      ;i]

      $c[The points to come: the average gain for every average delay left in the hour]
      $let[steps;$math[$jsonSize[events] - 1]]
      $let[averageDelay;$max[0.1;$math[$get[totalDelay] / $get[steps]]]]
      $let[inputsLeft;$math[(3600 - $getChallengeTimer[$env[userId;id]]) / $get[averageDelay]]]
      $let[prediction;$max[0;$round[$math[$jsonGet[progress;points] + $get[inputsLeft] * $get[totalGain] / $get[steps]]]]]
    ]

    $return[$tl[ui.challenge.prediction.$get[l];$if[$arrayIncludes[$jsonGet[userProfile;challenge;settings];hidePrediction];||$get[prediction]||;\`$get[prediction]\`]]]
  `
})
