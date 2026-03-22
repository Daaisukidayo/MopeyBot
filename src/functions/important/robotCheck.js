export default {
  name: "robotCheck",
  description: "Checks if the user is a robot.",
  code: `
    $fn[content;
      $return[
        ## _Are you a robot?_
        $addActionRow
        $addButton[notARobot-$authorID;I'm not a robot;Success;🤖]
      ]
    ]

    $if[$isPrefixCommand;
      $sendMessage[$channelID;$callFn[content]]
    ;
      $interactionReply[$callFn[content]]
    ]
  `
}