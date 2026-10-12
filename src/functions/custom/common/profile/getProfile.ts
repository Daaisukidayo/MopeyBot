import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getProfile",
  description: "Returns the user's profile in JSON format.",
  output: ArgType.Json,
  brackets: false,
  params: [
    {
      name: "userId",
      description: "ID of the user.",
      type: ArgType.User,
      required: false
    }
  ],
  code: `
    $jsonLoad[profile;$getUserVar[userProfile;$nullish[$env[userId;id];$authorID]]]
    $c[Keys added to the profile config later are filled in for older profiles]
    $objectDefaults[profile;$getGlobalVar[userProfile]]
    $return[$env[profile]]
  `
})
