import universalSnippets from "#snippets/universalSnippets.js"

export default [{
  name: "announcement",
  aliases: ["announce", "ann"],
  type: "messageCreate",
  code: `
    ${universalSnippets.checkProfile({time: '10s'})}
    $reply
    ${content()}
  `
},{
  type: "messageCreate",
  code: `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$env[userProfile;acceptedRules]]
    $onlyIf[$startsWith[$messageContent;$getGuildVar[prefix]]]
    $onlyIf[$getUserVar[hadAnnouncement]==false]
    $setUserVar[hadAnnouncement;true]
    
    $reply
    ${content()}
  `
}]

function content() {
  return `
    $addContainer[
      $addTextDisplay[# 📢 Announcement]
      $addSeparator[Large]
      $addTextDisplay[## • Added «Reminders» system! Mopey will DM you if you haven't claimed you daily and weekly rewards!]
      $addSeparator
      $addTextDisplay[## • Added \`reminders\` command! Enable or disable any reminders you want!]
      $addSeparator
      $addTextDisplay[## • Updated \`leaderboard\` command! The leaderboard now has buttons again for navigating between pages!]
    ;$getGlobalVar[defaultColor]]
  `
}