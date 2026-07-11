import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'removeChallengeProgressForEveryone',
  description: "Clears the progress and time for all players in the lobby.",
  params: [
    {
      name: "_allPlayers",
      description: "The array of all lobby players",
      type: ArgType.Json,
    }
  ],
  code: `
    $if[$isArray[$env[_allPlayers]]==false;$return]
    $arrayForEach[_allPlayers;userId;
      $deleteChallengeProgress[$env[userId]]
    ]
    $deleteChannelVar[lobby]
  `
})