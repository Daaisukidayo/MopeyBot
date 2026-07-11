import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'deleteTime',
  description: "Deletes the stored 1-hour timer value for a specified user in the current channel.",
  brackets: false,
  params: [
    {
      name: '_userId',
      description: "The user ID.",
      type: ArgType.User,
      required: false,
    }
  ],
  code: `
    $deleteUserVar[1htime|$channelID;$findUser[$env[_userId;id];true]]
  `
})