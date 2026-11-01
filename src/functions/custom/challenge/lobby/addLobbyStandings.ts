import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addLobbyStandings",
  description: "adds the standings lines + the victory type of the lobby in 'lobby'",
  params: [
    {
      name: "lobbyVar",
      description: "var w/ the lobby",
      type: ArgType.String,
    },
    {
      name: "standings",
      description: "what lobbyLeaderboard returned",
      type: ArgType.Json,
    },
  ],
  code: `
    $ref[lobby;$env[lobbyVar]]
    $let[l;$jsonGet[userProfile;language]]
    $c[1 team: list players. more: teams w/ their players under them]
    $arrayForEach[$jsonGet[standings;lines];line;
      $addTextDisplay[$env[line]]
      $if[$jsonGet[standings;solo];$addSeparator[Small;false];$addSeparator[Large]]
    ]
    $if[$jsonGet[standings;solo];$addSeparator[Large]]
    $addTextDisplay[$tl[ui.lobby.victoryTypeTitle.$get[l];$tl[data.victoryTypes.$jsonGet[lobby;settings;victoryType].$get[l]]]]
  `,
})
