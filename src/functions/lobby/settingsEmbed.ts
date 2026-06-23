export default {
  name: 'lobbySettingsEmbed',
  code: `
    $let[l;$env[userProfile;language]]
    $let[host;$env[lobby;host]]

    $addContainer[
      $addTextDisplay[$tl[ui.lobby.settingsTitle.$get[l]]]
      $addSeparator[Large]

      $let[disabled;$not[$checkCondition[$authorID==$get[host]]]]

      $c[DIFFICULTY]
      $addTextDisplay[$tl[ui.lobby.difficultyTitleMenu.$get[l]]]
      $addActionRow
      $addStringSelectMenu[editLobbySettings-difficulty;$tl[ui.lobby.menuTitleChooseDifficulty.$get[l]];$get[disabled]]
      $arrayForEach[difficulties;difficulty;
        $addOption[$tl[data.difficulties.$env[difficulty].$get[l]];$tl[ui.lobby.optionDescriptionSelect.$get[l]];$env[difficulty];;$checkCondition[$env[lobby;settings;difficulty]==$env[difficulty]]]
      ]


      $c[MODE]
      $addTextDisplay[$tl[ui.lobby.modeTitleMenu.$get[l]]]
      $addActionRow
      $addStringSelectMenu[editLobbySettings-mode;$tl[ui.lobby.menuTitleChooseMode.$get[l]];$get[disabled]]
      $arrayForEach[lobbyModes;mode;
        $addOption[$tl[data.lobbyModes.$env[mode].$get[l]];$tl[ui.lobby.optionDescriptionSelect.$get[l]];$env[mode];;$checkCondition[$env[lobby;settings;mode]==$env[mode]]]
      ]


      $c[VICTORY TYPE]
      $addTextDisplay[$tl[ui.lobby.victoryTypeTitleMenu.$get[l]]]
      $addActionRow
      $addStringSelectMenu[editLobbySettings-victoryType;$tl[ui.lobby.menuTitleChooseVictoryType.$get[l]];$get[disabled]]
      $arrayForEach[victoryTypes;type;
        $addOption[$tl[data.victoryTypes.$env[type].$get[l]];$tl[ui.lobby.optionDescriptionSelect.$get[l]];$env[type];;$checkCondition[$env[lobby;settings;victoryType]==$env[type]]]
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

          $addStringSelectMenu[editLobbySettings-host;$tl[ui.lobby.menuTitleGiveHost.$get[l]];$get[disabled]]
          $arrayForEach[allPlayers;ID;
            $addOption[$username[$env[ID]];;$env[ID]]
          ]
        ]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}