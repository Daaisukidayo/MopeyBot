"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: "interactionCreate",
    allowedInteractionTypes: ["button"],
    code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;settings]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[settings;true]

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[allSettingsEntries;$advJsonEntries[$getGlobalVar[allSettings]]]
    
    $let[hasSettKey;$arraySome[allSettingsEntries;entry;$arrayIncludes[IID;$env[entry;0]]]]
    $let[hasDiffKey;$arraySome[difficulties;elem;$arrayIncludes[IID;$env[elem]]]]
    $onlyIf[$or[$get[hasSettKey];$get[hasDiffKey]]]
    
    $jsonLoad[userSettings;$env[userProfile;challenge;settings]]
    $jsonLoad[challengeProgress;$getProgress]

    $let[value;$env[IID;0]]

    $if[$get[hasSettKey];

      $toggleArrayValue[userSettings;$get[value]]
      $!jsonSet[userProfile;challenge;settings;$env[userSettings]]

    ;
      $if[$get[hasDiffKey];
        $!jsonSet[userProfile;challenge;difficulty;$get[value]]
        $if[$and[$env[challengeProgress]!=;$getChannelVar[lobby]==];
          $!jsonSet[challengeProgress;difficulty;$get[value]]
          $saveProgress[$env[challengeProgress]]
        ]
      ]
    ]

    $saveProfile

    $settingsEmbed
    $interactionUpdate
    $newCommandTimeout[settings]
  `
};
//# sourceMappingURL=settings.js.map