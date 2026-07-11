import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: "saveProgress",
  description: "Saves the luck challenge progress object for the user.",
  params: [
    {
      name: "_progress",
      description: "Progress data.",
      type: ArgType.Json,
    },
    {
      name: "_userId",
      description: "ID of the user.",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $setUserVar[challengeProgress|$channelID;$env[_progress];$findUser[$env[_userId;id];true]]
  `
})