import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'send',
  description: "Sends an interaction or default message and returns it's id",
  output: ArgType.Number,
  code: `
    $return[$if[$or[$isSlashCommand;$isCommand==false];$interactionReply[;true];$sendMessage[$channelID;;true]]]
  `
})