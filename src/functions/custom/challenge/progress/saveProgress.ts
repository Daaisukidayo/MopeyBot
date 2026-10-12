import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "saveProgress",
  description: "Saves the luck challenge progress object for the user.",
  params: [
    {
      name: "progress",
      description: "Progress data.",
      type: ArgType.Json
    },
    {
      name: "userId",
      description: "ID of the user.",
      type: ArgType.User,
      required: false
    }
  ],
  code: `
    $setUserVar[challengeProgress|$channelID;$env[progress];$nullish[$env[userId;id];$authorID]]
  `
})
