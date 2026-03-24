export default [{
  name: 'handleHlsettings',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[allSettingsEntries;$advJsonEntries[$getGlobalVar[allSettings]]]
    $hlSettingsEmbed

    $newCommandTimeout
  `
},{
  name: 'hlSettingsEmbed',
  code: `
    $jsonLoad[styles;$getGlobalVar[styles]]
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
          $addTextDisplay[## _$tl[data.allSettings.$env[entry;1]]_]
          $addButton[$get[key]-settings-$authorID;$get[state];$get[style]]
        ]
      ]
      
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.settings.difficulty]]
      
      $addActionRow
      $arrayForEach[difficulties;elem;
        $let[i;$arrayIndexOf[difficulties;$env[elem]]]
        $let[disabled;$checkCondition[$env[userProfile;challenge;difficulty]==$env[elem]]]
        
        $let[style;$env[styles;$get[i]]]
        $addButton[$env[elem]-difficulty-settings-$authorID;$tl[data.difficulties.$env[elem]];$get[style];;$get[disabled]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}]