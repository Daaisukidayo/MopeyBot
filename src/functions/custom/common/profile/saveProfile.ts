import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "saveProfile",
  description: "Saves and updates the user's profile.",
  params: [
    {
      name: "userProfile",
      description: "User's JSON profile",
      type: ArgType.Json,
    },
  ],
  code: `
    $setUserVar[userProfile;$env[userProfile];$jsonGet[userProfile;ID]]
  `,
})
