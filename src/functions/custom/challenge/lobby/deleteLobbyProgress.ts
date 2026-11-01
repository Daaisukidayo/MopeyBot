import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "deleteLobbyProgress",
  description: "wipes the progress and time of every lobby player",
  params: [
    {
      name: "allPlayers",
      description: "array of all lobby players",
      type: ArgType.Json,
    },
  ],
  code: `
    $if[$jsonType[allPlayers]!=array;$return]
    $arrayForEach[allPlayers;userId;
      $deleteChallengeProgress[$env[userId]]
    ]
    $deleteChannelVar[lobby]
  `,
})
