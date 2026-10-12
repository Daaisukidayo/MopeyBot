import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "deleteLobbyProgress",
  description: "Clears the progress and time for all players in the lobby.",
  params: [
    {
      name: "allPlayers",
      description: "The array of all lobby players",
      type: ArgType.Json
    }
  ],
  code: `
    $if[$jsonType[allPlayers]!=array;$return]
    $arrayForEach[allPlayers;userId;
      $deleteChallengeProgress[$env[userId]]
    ]
    $deleteChannelVar[lobby]
  `
})
