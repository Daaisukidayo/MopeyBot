export default {
  name: "robotCheck",
  description: "Checks if the user is a robot.",
  code: `
    $sendMessage[$channelID;
      ## Are you a robot?
      $addActionRow
      $addButton[notARobot-$authorID;I'm not a robot;Success;🤖]
    ]
  `
}