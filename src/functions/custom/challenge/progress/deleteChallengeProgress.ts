import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "deleteChallengeProgress",
  description: "deletes the user's challenge progress",
  brackets: false,
  params: [
    {
      name: "userId",
      description: "the user's ID",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $deleteUserVar[challengeProgress|$channelID;$nullish[$env[userId;id];$authorID]]
  `,
})
