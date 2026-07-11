import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getProgress",
  description: "Returns the user luck challenge progress.",
  output: ArgType.Json,
  brackets: false,
  params: [
    {
      name: "_userId",
      description: "The user ID.",
      type: ArgType.User,
      required: false,
    }
  ],
  code: `
    $return[$getUserVar[challengeProgress|$channelID;$findUser[$env[_userId;id];true]]]
  `
})