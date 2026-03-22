export default {
  name: 'lobbySettingsEmbed',
  code: `
    $addContainer[
      $addTextDisplay[$tl[ui.lobby.settingsTitle]]
      $addSeparator[Large]

      $let[disabled;$not[$checkCondition[$authorID==$env[lobby;host]]]]


      $c[DIFFICULTY]
      $addTextDisplay[$tl[ui.lobby.difficultyTitleMenu]]
      $addActionRow
      $addStringSelectMenu[editLobbyDifficulty;$tl[ui.lobby.menuTitleChooseDifficulty];$get[disabled]]
      $arrayForEach[difficulties;difficulty;
        $addOption[$tl[data.difficulties.$env[difficulty]];$tl[ui.lobby.optionDescriptionSelect];$env[difficulty];;$checkCondition[$env[lobby;settings;difficulty]==$env[difficulty]]]
      ]


      $c[MODE]
      $addTextDisplay[$tl[ui.lobby.modeTitleMenu]]
      $addActionRow
      $addStringSelectMenu[editLobbyMode;$tl[ui.lobby.menuTitleChooseMode];$get[disabled]]
      $arrayForEach[lobbyModes;mode;
        $addOption[$tl[data.lobbyModes.$env[mode]];$tl[ui.lobby.optionDescriptionSelect];$env[mode];;$checkCondition[$env[lobby;settings;mode]==$env[mode]]]
      ]


      $c[VICTORY TYPE]
      $addTextDisplay[$tl[ui.lobby.victoryTypeTitleMenu]]
      $addActionRow
      $addStringSelectMenu[editLobbyVictoryType;$tl[ui.lobby.menuTitleChooseVictoryType];$get[disabled]]
      $arrayForEach[victoryTypes;type;
        $addOption[$tl[data.victoryTypes.$env[type]];$tl[ui.lobby.optionDescriptionSelect];$env[type];;$checkCondition[$env[lobby;settings;victoryType]==$env[type]]]
      ]

      
      $c[GIVE HOST]
      $let[req;1]
      $if[$arrayIncludes[allPlayers;$env[lobby;host]]==false;
        $let[req;0]
      ]

      $if[$arrayLength[allPlayers]>$get[req];
        $addSeparator[Large]
        $addActionRow
        $if[$arrayIncludes[allPlayers;$env[lobby;host]];
          $!arraySplice[allPlayers;$arrayIndexOf[allPlayers;$env[lobby;host]];1]
        ]

        $addStringSelectMenu[giveLobbyHost;$tl[ui.lobby.menuTitleGiveHost];$get[disabled]]
        $arrayForEach[allPlayers;ID;
          $addOption[$env[funcCache;usernames;$env[ID]];;$env[ID]]
        ]
      ]
      
    ;$getGlobalVar[luckyColor]]
  `
}