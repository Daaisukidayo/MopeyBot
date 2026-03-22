export default {
  name: 'send',
  code: `
    $if[$isSlashCommand;$interactionReply]
  `
}