export default {
  name: 'lobbySettingsEmbed',
  code: `
    $addContainer[
      $addTextDisplay[$tl[ui.lobby.settingsTitle]]
      $addSeparator[Large]

      $let[disabled;$not[$checkCondition[$authorID==$env[lobby;host]]]]

      $addTextDisplay[$tl[ui.lobby.difficultyTitleMenu]]
      $addActionRow
      $addStringSelectMenu[addDifficultyLobby;$tl[ui.lobby.menuTitleChooseDifficulty];$get[disabled]]
      $arrayForEach[difficulties;difficulty;
        $addOption[$tl[data.difficulties.$env[difficulty]];$tl[ui.lobby.optionDescriptionSelect];$env[difficulty];;$checkCondition[$env[lobby;difficulty]==$env[difficulty]]]
      ]

      $addTextDisplay[$tl[ui.lobby.modeTitleMenu]]
      $addActionRow
      $addStringSelectMenu[switchLobbyMode;$tl[ui.lobby.menuTitleChooseMode];$get[disabled]]
      $arrayForEach[lobbyModes;mode;
        $addOption[$tl[data.lobbyModes.$env[mode]];$tl[ui.lobby.optionDescriptionSelect];$env[mode];;$checkCondition[$env[lobby;mode]==$env[mode]]]
      ]

      $if[$arrayLength[allPlayers]>1;
        $addSeparator[Large]
        $addActionRow
        $!arraySplice[allPlayers;$arrayIndexOf[allPlayers;$env[lobby;host]];1]

        $addStringSelectMenu[giveLobbyHost;$tl[ui.lobby.menuTitleGiveHost];$get[disabled]]
        $arrayForEach[allPlayers;ID;
          $addOption[$env[funcCache;usernames;$env[ID]];;$env[ID]]
        ]
      ]
      
    ;$getGlobalVar[luckyColor]]
  `
}