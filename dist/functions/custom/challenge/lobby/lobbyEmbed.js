"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "lobbyEmbed",
    description: "Creates an embedded message for the lobby loaded in 'lobby', in the host's language.",
    params: [
        {
            name: "lobbyVar",
            description: "The name of the variable that holds the lobby.",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[lobby;$env[lobbyVar]]
    $let[host;$jsonGet[lobby;host]]
    $let[l;$jsonGet[$getProfile[$get[host]];language]]
    $jsonLoad[teams;$jsonGet[lobby;teams]]
    $jsonLoad[ready;$jsonGet[lobby;ready]]
    $let[solo;$checkCondition[$jsonSize[teams]==1]]
    $let[canStart;$callMethod[lobby;canStart]]

    $addContainer[
      $addSection[
        $addTextDisplay[$tl[ui.lobby.author.$get[l];$username[$get[host]]]]
        $addThumbnail[$userAvatar[$get[host]]]
      ]

      $c[Each team with its players, ready ones in green. The team index is an env variable: as a keyword it was empty and every team got the same button IDs]
      $arrayForEach[teams;team;
        $addSeparator
        $addTextDisplay[$if[$get[solo];$tl[ui.lobby.participantsTitle.$get[l]];$tl[ui.lobby.teamTitle.$get[l];$math[$env[i] + 1]]]]
        $addTextDisplay[**$codeBlock[$default[$arrayJoin[$arrayMap[$jsonGet[team;players];ID;$return[$if[$arrayIncludes[ready;"$env[ID]"];🟢;🔴]$username[$env[ID]]]];\n];$tl[ui.lobby.none.$get[l]]]]**]
        $addActionRow
        $addButton[joinLobby-$env[i];$tl[ui.lobby.buttonLabelJoin.$get[l]];Success;🔝]
        $addButton[quitLobby-$env[i];$tl[ui.lobby.buttonLabelQuit.$get[l]];Danger;🔙]
      ;i]

      $addSeparator[Large]

      $addActionRow
      $addButton[participantReady;$tl[ui.lobby.buttonLabelReady.$get[l]];Success;✅]

      $addSeparator[Large]

      $addTextDisplay[$tl[ui.lobby.settingsTitle.$get[l]]]
      $addActionRow
      $addButton[showLobbySettings;$tl[ui.lobby.buttonLabelSettings.$get[l]];Success;⚙️]

      $addSeparator

      $addActionRow
      $addButton[startLobby;$tl[ui.lobby.buttonLabelStart.$get[l]];Success;✔️;$not[$get[canStart]]]
      $addButton[closeLobby-manually;$tl[ui.lobby.buttonLabelClose.$get[l]];Danger;🔚]
    ;$getGlobalVar[luckyColor]]
  `,
});
//# sourceMappingURL=lobbyEmbed.js.map