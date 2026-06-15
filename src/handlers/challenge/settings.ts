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
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;settings.title]]

      $addSeparator[Large]

      $arrayForEach[$jsonEntries[$getGlobalVar[allSettings]];entry;
        $let[key;$env[entry;0]]
        $let[hasKey;$arrayIncludes[userSettings;$get[key]]]

        $if[$get[hasKey];
          $let[state;$tl[$get[l];ui;settings.stateEnabled]]
          $let[style;Success]
        ;
          $let[state;$tl[$get[l];ui;settings.stateDisabled]]
          $let[style;Danger]
        ]

        $addSection[
          $addTextDisplay[## _$tl[$get[l];data;allSettings.$env[entry;1]]_]
          $addButton[settings-$get[key]-$authorID;$get[state];$get[style]]
        ]
      ]
      
      $addSeparator[Large]
      $addTextDisplay[$tl[$get[l];ui;settings.difficulty]]
      
      $addActionRow
      $arrayForEach[difficulties;elem;
        $let[i;$arrayIndexOf[difficulties;$env[elem]]]
        $let[disabled;$checkCondition[$env[userProfile;challenge;difficulty]==$env[elem]]]
        
        $let[style;$env[styles;$get[i]]]
        $addButton[settings-$env[elem]-$authorID;$tl[$get[l];data;difficulties.$env[elem]];$get[style];;$get[disabled]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}]