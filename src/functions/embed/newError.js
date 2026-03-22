export default { 
  name: "newError",
  description: "Sends a V2 message with the specified error message.",
  params: [
    { 
      name: "description", 
      description: "The error description to display in the embed.",
      type: "String",
      required: true,
    },
  ],
  code: `
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[# ✖️ $tl[ui.errors.errorTitle]]
      $addSeparator[Small;false]
      $addTextDisplay[## > $trim[$env[description]]]
    ;$getGlobalVar[errorColor]]

    $if[$isPrefixCommand;
      $sendMessage[$channelID]
    ;
      $ephemeral
      $interactionReply
    ]
    $stop
  `
}