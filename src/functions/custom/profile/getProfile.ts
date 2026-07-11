import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: "getProfile",
  description: "Returns the user's profile in JSON format.",
  output: ArgType.Json,
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
    $return[$getUserVar[userProfile;$findUser[$env[_userId;id];true]]]
  `
})