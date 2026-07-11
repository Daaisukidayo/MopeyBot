import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: "getTimer",
  description: "Returns the stored 1 hour luck timer for a user in the current channel.",
  output: ArgType.Number,
  brackets: false,
  params: [
    {
      name: "_userId",
      description: "ID of the user.",
      type: ArgType.User,
      required: false,
    }
  ],
  code: `
    $return[$getUserVar[1htime|$channelID;$findUser[$env[_userId;id];true]]]
  `
})