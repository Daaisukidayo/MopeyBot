import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addLobbyStandings",
  description: "Adds the lines of the lobby standings and the victory type of the lobby loaded in 'lobby'.",
  params: [
    {
      name: "lobbyVar",
      description: "The name of the variable that holds the lobby.",
      type: ArgType.String
    },
    {
      name: "standings",
      description: "The standings returned by $lobbyLeaderboard.",
      type: ArgType.Json
    }
  ],
  code: `
    $ref[lobby;$env[lobbyVar]]
    $let[l;$jsonGet[userProfile;language]]
    $c[One team shows its players, several teams show the teams with their players under them]
    $arrayForEach[$jsonGet[standings;lines];line;
      $addTextDisplay[$env[line]]
      $if[$jsonGet[standings;solo];$addSeparator[Small;false];$addSeparator[Large]]
    ]
    $if[$jsonGet[standings;solo];$addSeparator[Large]]
    $addTextDisplay[$tl[ui.lobby.victoryTypeTitle.$get[l];$tl[data.victoryTypes.$jsonGet[lobby;settings;victoryType].$get[l]]]]
  `
})
