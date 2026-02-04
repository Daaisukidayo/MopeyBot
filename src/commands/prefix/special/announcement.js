export default [{
  name: "announcement",
  aliases: ["announce", "ann"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[10s]
    ${content()}
  `
},{
  type: "messageCreate",
  code: `
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$env[userProfile;acceptedRules]]
    $onlyIf[$startsWith[$messageContent;$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]]]
    $onlyIf[$env[userProfile;hadAnn]==false]
    $!jsonSet[userProfile;hadAnn;true]
    $saveProfile
    
    $reply
    ${content()}
  `
}]

function content() {
  return `
    $addContainer[
      $addTextDisplay[# 📢 Announcement]
      $addSeparator
      $addTextDisplay[## • Added \`raretrysimulator\` command]
      $addTextDisplay[## • Added \`switchlang\` command. Switches your locale between available options]
      $addTextDisplay[## • «Russian» locale is now supported]
      $addTextDisplay[## • Improved text styles in all commands]
      $addTextDisplay[## • The \`kingdragon\` command is using buttons instead of menu again]
      $addTextDisplay[## • Improved editing 1 hour luck runs history]
      $addTextDisplay[## • Deleted \`Tags\` from lobby settings]
      $addTextDisplay[## • Added \`Easy\` difficulty in lobby & settings, which equals \`Unlimited Rares\` from \`Tags\`]
      $addTextDisplay[## • Optimized \`leaderboard\` and \`simulator\` commands]
      $addTextDisplay[## • Changed commands names: \`settings\` -> \`hlsettings\`, \`simulator\` -> \`hlsimulator\`]
    ;$getGlobalVar[defaultColor]]
  `
}