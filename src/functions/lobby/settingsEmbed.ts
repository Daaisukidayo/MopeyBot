export default {
  name: 'lobbySettingsEmbed',
  code: `
    $let[l;$env[userProfile;language]]
    $let[host;$env[lobby;host]]

    $getCache[usernames;usernames]

    $addContainer[
      $addTextDisplay[$tl[$get[l];ui;lobby.settingsTitle]]
      $addSeparator[Large]

      $let[disabled;$not[$checkCondition[$authorID==$get[host]]]]

      $c[DIFFICULTY]
      $addTextDisplay[$tl[$get[l];ui;lobby.difficultyTitleMenu]]
      $addActionRow
      $addStringSelectMenu[editLobbyDifficulty;$tl[$get[l];ui;lobby.menuTitleChooseDifficulty];$get[disabled]]
      $arrayForEach[difficulties;difficulty;
        $addOption[$tl[$get[l];data;difficulties.$env[difficulty]];$tl[$get[l];ui;lobby.optionDescriptionSelect];$env[difficulty];;$checkCondition[$env[lobby;settings;difficulty]==$env[difficulty]]]
      ]


      $c[MODE]
      $addTextDisplay[$tl[$get[l];ui;lobby.modeTitleMenu]]
      $addActionRow
      $addStringSelectMenu[editLobbyMode;$tl[$get[l];ui;lobby.menuTitleChooseMode];$get[disabled]]
      $arrayForEach[lobbyModes;mode;
        $addOption[$tl[$get[l];data;lobbyModes.$env[mode]];$tl[$get[l];ui;lobby.optionDescriptionSelect];$env[mode];;$checkCondition[$env[lobby;settings;mode]==$env[mode]]]
      ]


      $c[VICTORY TYPE]
      $addTextDisplay[$tl[$get[l];ui;lobby.victoryTypeTitleMenu]]
      $addActionRow
      $addStringSelectMenu[editLobbyVictoryType;$tl[$get[l];ui;lobby.menuTitleChooseVictoryType];$get[disabled]]
      $arrayForEach[victoryTypes;type;
        $addOption[$tl[$get[l];data;victoryTypes.$env[type]];$tl[$get[l];ui;lobby.optionDescriptionSelect];$env[type];;$checkCondition[$env[lobby;settings;victoryType]==$env[type]]]
      ]

      
      $c[GIVE HOST]
      $if[$authorID==$get[host];
        $let[req;1]
        $if[$arrayIncludes[allPlayers;$get[host]]==false;
          $let[req;0]
        ]

        $if[$arrayLength[allPlayers]>$get[req];
          $addSeparator[Large]
          $addActionRow
          $if[$arrayIncludes[allPlayers;$get[host]];
            $!arraySplice[allPlayers;$arrayIndexOf[allPlayers;$get[host]];1]
          ]

          $addStringSelectMenu[giveLobbyHost;$tl[$get[l];ui;lobby.menuTitleGiveHost];$get[disabled]]
          $arrayForEach[allPlayers;ID;
            $addOption[$env[usernames;$env[ID]];;$env[ID]]
          ]
        ]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}