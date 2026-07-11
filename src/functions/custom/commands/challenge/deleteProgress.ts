import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'deleteChallengeProgress',
  description: "Deletes the user's challenge progress",
  brackets: false,
  params: [
    {
      name: "_userId",
      description: "The user ID",
      type: ArgType.User,
      required: false,
    }
  ],
  code: `
    $deleteUserVar[challengeProgress|$channelID;$findUser[$env[_userId;id];true]]
  `
})