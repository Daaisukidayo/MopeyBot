"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "settings",
    type: "interactionCreate",
    allowed: ["button"],
    code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[settings;true]

    $c[button = toggle a setting or pick a difficulty]
    $let[value;$jsonGet[IID;1]]
    $let[isSetting;$arrayIncludes[$getGlobalVar[allSettings];$get[value]]]
    $onlyIf[$or[$get[isSetting];$arrayIncludes[$getGlobalVar[difficulties];$get[value]]]]

    $if[$get[isSetting];
      $jsonLoad[userSettings;$jsonGet[userProfile;challenge;settings]]
      $toggleArrayValue[userSettings;$get[value]]
      $!jsonSet[userProfile;challenge;settings;$env[userSettings]]
    ;
      $!jsonSet[userProfile;challenge;difficulty;$get[value]]

      $c[a running solo challenge in this channel gets the new difficulty too]
      $jsonLoad[challengeProgress;$getProgress]
      $if[$and[$env[challengeProgress]!=;$getChannelVar[lobby]==];
        $setField[challengeProgress;difficulty;$get[value]]
        $saveProgress[$env[challengeProgress]]
      ]
    ]

    $callMethod[userProfile;save]

    $settingsEmbed
    $interactionUpdate
    $newCommandTimeout[settings]
  `,
});
//# sourceMappingURL=settings.js.map