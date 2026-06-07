export default {
  name: "robotCheck",
  description: "Checks if the user is a robot.",
  code: `
    $addTextDisplay[## _Are you a robot?_]
    $addActionRow
    $addButton[notARobot-$authorID;I'm not a robot;Success;🤖]
    $!send
  `
}