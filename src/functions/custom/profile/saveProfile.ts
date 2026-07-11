import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "saveProfile",
  description: "Saves and updates the user's profile.",
  params: [
    {
      name: "_userProfile",
      description: "User's JSON profile",
      type: ArgType.Json,
    }
  ],
  code: `
    $setUserVar[userProfile;$env[_userProfile];$env[_userProfile;ID]]
  `
})