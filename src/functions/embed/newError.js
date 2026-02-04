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
      $addTextDisplay[$tl[ui.errors.errorTitle]]
      $addSeparator
      $addTextDisplay[## _$trim[$env[description]]_]
    ;$getGlobalVar[errorColor]]

    $if[$isCommand;
      $if[$isSlashCommand;
        $ephemeral
        $interactionReply
      ;
        $sendMessage[$channelID]
      ]
    ;
      $ephemeral
      $interactionReply
    ]
    $stop
  `
}