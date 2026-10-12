import { Command } from "@quoriel/edge"

export default new Command({
  name: "settings",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[settings;true]

    $c[A button toggles a setting or picks a difficulty]
    $let[value;$jsonGet[IID;1]]
    $let[isSetting;$arrayIncludes[$jsonKeys[$getGlobalVar[allSettings]];$get[value]]]
    $onlyIf[$or[$get[isSetting];$arrayIncludes[$getGlobalVar[difficulties];$get[value]]]]

    $if[$get[isSetting];
      $jsonLoad[userSettings;$jsonGet[userProfile;challenge;settings]]
      $toggleArrayValue[userSettings;$get[value]]
      $!jsonSet[userProfile;challenge;settings;$env[userSettings]]
    ;
      $!jsonSet[userProfile;challenge;difficulty;$get[value]]

      $c[A solo challenge going on in this channel gets the new difficulty too]
      $jsonLoad[challengeProgress;$getProgress]
      $if[$and[$env[challengeProgress]!=;$getChannelVar[lobby]==];
        $!jsonSet[challengeProgress;difficulty;$get[value]]
        $saveProgress[$env[challengeProgress]]
      ]
    ]

    $saveProfile[$env[userProfile]]

    $settingsEmbed
    $interactionUpdate
    $newCommandTimeout[settings]
  `
})
