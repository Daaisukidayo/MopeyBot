export default [{
  name: "announcement",
  aliases: ["announce", "ann"],
  type: "messageCreate",
  code: `
    $reply
    $addContainer[
      $addTextDisplay[# 📢 Announcement]
      $addSeparator[Large]
      $addTextDisplay[## \`New commands\`]
      $addTextDisplay[### • A \`vote\` command has been added to vote for Mopey on Top.gg and receive a reward!]
      $addTextDisplay[### • Added \`checklist\` command to claim rewards for completing daily tasks! Also shows your daily streak!]
      $addSeparator
      $addTextDisplay[-# Version 2025Y1012]
    ;$getGlobalVar[defaultColor]]
  `
},{
  type: "messageCreate",
  unprefix: true,
  code: `
    $if[$getUserVar[hadAnnouncement];
      $stop
    ;
      $setUserVar[hadAnnouncement;true]
    ]
    $reply
    $addContainer[
      $addTextDisplay[# 📢 Announcement]
      $addSeparator[Large]
      $addTextDisplay[## \`New commands\`]
      $addTextDisplay[### • A \`vote\` command has been added to vote for Mopey on Top.gg and receive a reward!]
      $addTextDisplay[### • Added \`checklist\` command to claim rewards for completing daily tasks! Also shows your daily streak!]
      $addSeparator
      $addTextDisplay[-# Version 2025Y1012]
    ;$getGlobalVar[defaultColor]]
  `
}]