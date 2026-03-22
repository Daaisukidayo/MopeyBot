export default [{
  name: "hlsettings",
  aliases: ["hlsts"],
  type: "messageCreate",
  code: `
    $handleHlsettings
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;settings]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[hlsettings;true]

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
          $saveProgress
        ]
      ]
    ]

    $saveProfile

    $hlSettingsEmbed
    $interactionUpdate
    $newCommandTimeout[hlsettings]
  `
}]