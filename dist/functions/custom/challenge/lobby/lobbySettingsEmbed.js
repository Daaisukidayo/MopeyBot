"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "lobbySettingsEmbed",
    description: "Creates the settings of the lobby loaded in 'lobby': only its host can change them.",
    params: [
        {
            name: "lobbyVar",
            description: "The name of the variable that holds the lobby.",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[lobby;$env[lobbyVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[host;$jsonGet[lobby;host]]
    $let[disabled;$checkCondition[$authorID!=$get[host]]]

    $addContainer[
      $addTextDisplay[$tl[ui.lobby.settingsTitle.$get[l]]]
      $addSeparator[Large]

      $addTextDisplay[$tl[ui.lobby.difficultyTitleMenu.$get[l]]]
      $addActionRow
      $addStringSelectMenu[editLobbySettings-difficulty;$tl[ui.lobby.menuTitleChooseDifficulty.$get[l]];$get[disabled]]
      $arrayForEach[$getGlobalVar[difficulties];difficulty;
        $addOption[$tl[data.difficulties.$env[difficulty].$get[l]];$tl[ui.lobby.optionDescriptionSelect.$get[l]];$env[difficulty];;$checkCondition[$jsonGet[lobby;settings;difficulty]==$env[difficulty]]]
      ]

      $addTextDisplay[$tl[ui.lobby.modeTitleMenu.$get[l]]]
      $addActionRow
      $addStringSelectMenu[editLobbySettings-mode;$tl[ui.lobby.menuTitleChooseMode.$get[l]];$get[disabled]]
      $arrayForEach[$getGlobalVar[lobbyModes];mode;
        $addOption[$tl[data.lobbyModes.$env[mode].$get[l]];$tl[ui.lobby.optionDescriptionSelect.$get[l]];$env[mode];;$checkCondition[$jsonGet[lobby;settings;mode]==$env[mode]]]
      ]

      $addTextDisplay[$tl[ui.lobby.victoryTypeTitleMenu.$get[l]]]
      $addActionRow
      $addStringSelectMenu[editLobbySettings-victoryType;$tl[ui.lobby.menuTitleChooseVictoryType.$get[l]];$get[disabled]]
      $arrayForEach[$getGlobalVar[victoryTypes];type;
        $addOption[$tl[data.victoryTypes.$env[type].$get[l]];$tl[ui.lobby.optionDescriptionSelect.$get[l]];$env[type];;$checkCondition[$jsonGet[lobby;settings;victoryType]==$env[type]]]
      ]

      $if[$get[disabled]==false;
        $jsonLoad[hostCandidates;$callMethod[lobby;hostCandidates]]

        $if[$jsonSize[hostCandidates]>0;
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[editLobbySettings-host;$tl[ui.lobby.menuTitleGiveHost.$get[l]]]
          $arrayForEach[hostCandidates;ID;
            $addOption[$username[$env[ID]];;$env[ID]]
          ]
        ]
      ]
    ;$getGlobalVar[luckyColor]]
  `,
});
//# sourceMappingURL=lobbySettingsEmbed.js.map