import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "lobbyEmbed",
  description: "the lobby msg for the lobby in 'lobby', in the host's language",
  params: [
    {
      name: "lobbyVar",
      description: "var w/ the lobby",
      type: ArgType.String,
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

      $c[teams w/ players, ready ones in green. the team index is an env var bc as a keyword it came out empty and every team got the same button ids]
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
})
