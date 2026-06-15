export default {
  name: "settings",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[settings;true]
    
    $let[hasSettKey;$arraySome[$jsonEntries[$getGlobalVar[allSettings]];entry;$arrayIncludes[IID;$env[entry;0]]]]
    $let[hasDiffKey;$arraySome[$getGlobalVar[difficulties];elem;$arrayIncludes[IID;$env[elem]]]]
    $onlyIf[$or[$get[hasSettKey];$get[hasDiffKey]]]
    
    $jsonLoad[userSettings;$env[userProfile;challenge;settings]]
    $jsonLoad[challengeProgress;$getProgress]

    $let[value;$env[IID;1]]

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
}