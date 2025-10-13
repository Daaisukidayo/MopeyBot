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
    $onlyIf[$startsWith[$messageContent;$default[$getGuildVar[prefix];$getGlobalVar[prefix]]]]
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
      $addTextDisplay[## \`New commands\`]
      $addTextDisplay[### • Added \`play\` command! Play and earn coins, rares, battles etc! Still in development, many features may be added in the future!]
    ;$getGlobalVar[defaultColor]]
  `
}