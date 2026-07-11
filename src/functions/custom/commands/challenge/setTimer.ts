import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "setTimer",
  description: "Set the stored timer value for a user.",
  params: [
    {
      name: "_newTime",
      description: "New timer value to store for the 1 hour luck challenge.",
      type: ArgType.Number,
    },
    {
      name: "_userId",
      description: "Optional user to set the timer for.",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $setUserVar[1htime|$channelID;$env[_newTime];$findUser[$env[_userId;id];true]]
  `
})