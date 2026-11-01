import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "saveProgress",
  description: "saves the user's luck challenge progress",
  params: [
    {
      name: "progress",
      description: "the progress data",
      type: ArgType.Json,
    },
    {
      name: "userId",
      description: "the user's ID",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $setUserVar[challengeProgress|$channelID;$env[progress];$nullish[$env[userId;id];$authorID]]
  `,
})
