"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleCreateLobby",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile

    $cooldown[lobby-$channelID;1000]
    
    $jsonLoad[lobby;$getLobby]

    $onlyIf[$env[lobby]==;
      $let[participants;$arrayJoin[$arrayMap[$jsonGet[lobby;allPlayers];ID;$return[$username[$env[ID]]]];\n]]

      $addContainer[
        $addTextDisplay[# ✖️ _$tl[ui.errors.errorTitle.$get[l]]_]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.lobby.lobbyAlreadyExist.$get[l]]]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.lobby.participantsTitle.$get[l]]]
        $addTextDisplay[$codeBlock[$default[$get[participants];$tl[ui.lobby.none.$get[l]]]]]
        $addActionRow
        $addButton[closeLobby-forcefully;$tl[ui.lobby.buttonLabelCloseManually.$get[l]];Danger;🔚]
      ;$getGlobalVar[errorColor]]
    ]

    $onlyIf[$getProgress==;
      $newError[$tl[ui.lobby.hasActiveChallengeLobby.$get[l]]]
    ]

    
    $new[lobby;Lobby;$authorID]
    
    $lobbyEmbed[lobby]

    $let[mid;$send]

    $setField[lobby;messageID;"$get[mid]"]
    
    $setChannelVar[lobby;$env[lobby]]
    $newLobbyTimeout
  `,
});
//# sourceMappingURL=create.js.map