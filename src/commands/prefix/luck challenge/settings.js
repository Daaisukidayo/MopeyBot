export default [{
  name: "hlsettings",
  aliases: ["hlsts"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[1m]

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[allSettingsEntries;$advJsonEntries[$getGlobalVar[allSettings]]]
    ${settingsEmbed()}
    $newTimeout[settings-$authorID;$getGlobalVar[settingsTT];$sendMessage[$channelID;;true]]
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

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[allSettingsEntries;$advJsonEntries[$getGlobalVar[allSettings]]]
    
    $let[hasSettKey;$arraySome[allSettingsEntries;entry;$return[$arrayIncludes[IID;$env[entry;0]]]]]
    $let[hasDiffKey;$arraySome[difficulties;elem;$arrayIncludes[IID;$env[elem]]]]
    $onlyIf[$or[$get[hasSettKey];$get[hasDiffKey]]]
    
    $jsonLoad[userSettings;$env[userProfile;challenge;settings]]
    $jsonLoad[challengeProgress;$getProgress]
    $let[value;$env[IID;0]]

    $if[$get[hasSettKey];

      $if[$arrayIncludes[userSettings;$get[value]];
        $!arraySplice[userSettings;$arrayIndexOf[userSettings;$get[value]];1]
        $if[$and[$get[value]==unlimitedRares;$env[challengeProgress]!=;$arrayIncludes[tags;$get[value]];$getChannelVar[lobby]==];
          $!arraySplice[tags;$arrayIndexOf[tags;$get[value]];1]
          $!jsonSet[challengeProgress;tags;$env[tags]]
          $saveProgress
        ]
      ;
        $arrayPush[userSettings;$get[value]]
        $if[$and[$get[value]==unlimitedRares;$env[challengeProgress]!=;$arrayIncludes[tags;$get[value]]==false;$getChannelVar[lobby]==];
          $arrayPush[tags;$get[value]]
          $!jsonSet[challengeProgress;tags;$env[tags]]
          $saveProgress
        ]
      ]
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

    ${settingsEmbed()}
    $interactionUpdate
    $newTimeout[settings-$authorID;$getGlobalVar[settingsTT]]
  `
}]

function settingsEmbed() {
  return `
    $let[difficulty;$env[userProfile;challenge;difficulty]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.settings.title]]

      $addSeparator[Large]

      $arrayForEach[allSettingsEntries;entry;
        $let[key;$env[entry;0]]
        $let[hasKey;$arrayIncludes[userSettings;$get[key]]]

        $if[$get[hasKey];
          $let[state;$tl[ui.settings.stateEnabled]]
          $let[style;Success]
        ;
          $let[state;$tl[ui.settings.stateDisabled]]
          $let[style;Danger]
        ]

        $addSection[
          $addTextDisplay[### $tl[data.allSettings.$env[entry;1]]]
          $addButton[$get[key]-settings-$authorID;$get[state];$get[style]]
        ]
      ]

      
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.settings.difficulty]]
      $addActionRow
      $arrayForEach[difficulties;elem;
        $let[i;$arrayIndexOf[difficulties;$env[elem]]]
        $let[disabled;$checkCondition[$get[difficulty]==$env[elem]]]
        
        $let[style;$dump[$getGlobalVar[styles];$get[i]]]
        $addButton[$env[elem]-difficulty-settings-$authorID;$tl[data.difficulties.$env[elem]];$get[style];;$get[disabled]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}