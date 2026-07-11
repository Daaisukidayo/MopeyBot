import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'stopTimer',
  description: "Stops the active 1 hour luck timer for the provided user.",
  brackets: false,
  params: [
    {
      name: '_userId',
      description: "ID of the user.",
      type: ArgType.User,
      required: false
    }
  ],
  code: `
    $!stopInterval[challengeTimer-$findUser[$env[_userId;id];true]|$channelID]
  `
})