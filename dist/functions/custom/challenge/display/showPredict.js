"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "showPredict",
    description: "points prediction for the 1h luck challenge, hidden if the profile settings say so",
    params: [
        {
            name: "progressVar",
            description: "var w/ the challenge progress",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "userId",
            description: "whose challenge timer to read (default: the author)",
            type: forgescript_1.ArgType.User,
            required: false,
        },
    ],
    code: `
    $ref[progress;$env[progressVar]]
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[events;$jsonGet[progress;events]]
    $let[prediction;0]

    $c[an event is a seconds, points pair. each one gets compared w/ the previous]
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

      $c[prediction = avg gain per avg delay, for the rest of the hour]
      $let[steps;$math[$jsonSize[events] - 1]]
      $let[averageDelay;$max[0.1;$math[$get[totalDelay] / $get[steps]]]]
      $let[inputsLeft;$math[(3600 - $getChallengeTimer[$env[userId;id]]) / $get[averageDelay]]]
      $let[prediction;$max[0;$round[$math[$jsonGet[progress;points] + $get[inputsLeft] * $get[totalGain] / $get[steps]]]]]
    ]

    $return[$tl[ui.challenge.prediction.$get[l];$if[$arrayIncludes[$jsonGet[userProfile;challenge;settings];hidePrediction];||$get[prediction]||;\`$get[prediction]\`]]]
  `,
});
//# sourceMappingURL=showPredict.js.map