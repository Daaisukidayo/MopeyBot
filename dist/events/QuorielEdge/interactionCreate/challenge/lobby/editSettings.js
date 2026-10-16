"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "editLobbySettings",
    type: "interactionCreate",
    allowed: ["stringSelect"],
    code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkLobby

    $jsonLoad[lobby;$getLobby]

    $onlyIf[$jsonGet[lobby;host]==$authorID;$onlyAuthorInteraction]
    $c[Settings can only change for a lobby that still has its message and has not started]
    $onlyIf[$messageExists[$channelID;$jsonGet[lobby;messageID]];$interactionFail]
    $onlyIf[$jsonGet[lobby;started]==false;$interactionFail]

    $let[setting;$jsonGet[IID;1]]
    $let[value;$selectMenuValues]

    $callMethod[lobby;changeSetting;$get[setting];$get[value]]
    $setChannelVar[lobby;$env[lobby]]

    $lobbySettingsEmbed[lobby]
    $interactionUpdate

    $c[A new host gets the notices and the closing of the lobby in their language]
    $if[$get[setting]==host;
      $jsonLoad[userProfile;$getProfile[$get[value]]]
      $let[l;$jsonGet[userProfile;language]]
    ]
    $settingsChangedInfo[$switch[$get[setting];
      $case[host;$tl[ui.lobby.hostTitle.$get[l];<@$get[value]>]]
      $case[mode;$tl[ui.lobby.modeTitle.$get[l];$tl[data.lobbyModes.$get[value].$get[l]]]]
      $case[difficulty;$tl[ui.lobby.difficultyTitle.$get[l];$tl[data.difficulties.$get[value].$get[l]]]]
      $case[victoryType;$tl[ui.lobby.victoryTypeTitle.$get[l];$tl[data.victoryTypes.$get[value].$get[l]]]]
    ]]

    $if[$isOneOf[$get[setting];mode;host];
      $lobbyEmbed[lobby]
      $!editMessage[$channelID;$jsonGet[lobby;messageID]]
    ]

    $newLobbyTimeout
  `,
});
//# sourceMappingURL=editSettings.js.map