import loadGlobalJSON from './loadGlobalVars.js'

export default function settingsEmbed() {
  return `
    $jsonLoad[user1hlData;$env[userProfile;1hl]]
    $jsonLoad[userSettings;$env[user1hlData;settings]]
    ${loadGlobalJSON()}
    $let[difficulty;$default[$env[user1hlData;difficulty];$arrayAt[difficulties;0]]]

    $let[disabled;false]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addTextDisplay[# Settings:]

      $arrayForEach[allSettingsEntries;entry;
        $let[key;$env[entry;0]]
        $let[content;$env[entry;1]]
        $let[hasKey;$arrayIncludes[userSettings;$get[key]]]

        $if[$get[hasKey];
          $let[state;Enabled]
          $let[style;Success]
        ;
          $let[state;Disabled]
          $let[style;Danger]
        ]

        $addSection[
          $addTextDisplay[### $get[content]]
          $addButton[$get[key]-settings-$authorID;$get[state];$get[style]]
        ]
      ]

      $if[$arrayIncludes[userSettings;difficulties];

        $addSeparator[Large]
        $addTextDisplay[### Difficulty]
        $addActionRow
        $arrayForEach[difficulties;elem;
          $let[i;$arrayIndexOf[difficulties;$env[elem]]]
          $let[disabled;$checkCondition[$get[difficulty]==$env[elem]]]
          
          $let[style;$arrayAt[styles;$get[i]]]
          $addButton[$env[elem]-difficulty-settings-$authorID;$toTitleCase[$env[elem]];$get[style];;$get[disabled]]
        ]

      ]
    ;$getGlobalVar[luckyColor]]
  `
}
