export default [{
  name: 'handleSettings',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $settingsEmbed

    $newCommandTimeout
  `
},{
  name: 'settingsEmbed',
  code: `
    $jsonLoad[styles;$getGlobalVar[styles]]

    $let[l;$env[userProfile;language]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.settings.title.$get[l]]]

      $addSeparator[Large]

      $arrayForEach[$jsonEntries[$getGlobalVar[allSettings]];entry;
        $let[key;$env[entry;0]]
        $let[hasKey;$arrayIncludes[userSettings;$get[key]]]

        $if[$get[hasKey];
          $let[state;$tl[ui.settings.stateEnabled.$get[l]]]
          $let[style;Success]
        ;
          $let[state;$tl[ui.settings.stateDisabled.$get[l]]]
          $let[style;Danger]
        ]

        $addSection[
          $addTextDisplay[## _$tl[data.allSettings.$env[entry;1].$get[l]]_]
          $addButton[settings-$get[key]-$authorID;$get[state];$get[style]]
        ]
      ]
      
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.settings.difficulty.$get[l]]]
      
      $let[i;0]
      $addActionRow
      $arrayForEach[$getGlobalVar[difficulties];elem;
        $let[disabled;$checkCondition[$env[userProfile;challenge;difficulty]==$env[elem]]]
        
        $let[style;$env[styles;$get[i]]]
        $addButton[settings-$env[elem]-$authorID;$tl[data.difficulties.$env[elem].$get[l]];$get[style];;$get[disabled]]
        $letSum[i;1]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}]