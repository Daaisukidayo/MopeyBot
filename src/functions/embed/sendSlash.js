export default {
  name: 'send',
  params: [
    {
      name: 'returnId',
      type: "Boolean",
      required: true,
    }
  ],
  brackets: false,
  code: `
    $let[r;$nullish[$env[returnId];false]]
    $return[$if[$isSlashCommand;$interactionReply[;$get[r]];$sendMessage[$channelID;;$get[r]]]]
  `
}