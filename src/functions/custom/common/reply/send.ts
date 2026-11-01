import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "send",
  description: "sends the interaction reply or a regular msg and returns its id",
  output: ArgType.Number,
  code: `
    $return[$if[$or[$isSlashCommand;$isCommand==false];$interactionReply[;true];$sendMessage[$channelID;;true]]]
  `,
})
