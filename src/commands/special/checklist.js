import uniSnippets from "#snippets/universalSnippets.js";

export default {
  name: "checklist",
  aliases: ["cl"],
  type: "messageCreate",
  code: `
    $reply
    ${uniSnippets.checkProfile({time: '10s'})}

    $let[daily;$default[$env[userProfile;limiters;lastDailyDay];-1]]
    $let[lastClaimed;$default[$env[userProfile;limiters;lastClaimedDay];-1]]
    $let[hasVoted;$hasVoted[$authorID]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]

      $addTextDisplay[# __CHECKLIST__]
      $addSeparator[Large]

      $addTextDisplay[## Claim daily reward!]
      $addTextDisplay[-# $if[$get[daily]==$day;✅ Completed;In progress]]

      $addSeparator[Small;false]

      $addTextDisplay[## $hyperlink[Vote on Top.gg;https://top.gg/bot/$clientID/vote]!]
      $addTextDisplay[-# $if[$get[hasVoted];✅ Completed;In progress]]

      $addSeparator[Small;false]

      $addTextDisplay[## Catch any rare animal in \`raretry\`!]
      $addTextDisplay[-# $if[...;✅ Completed;In progress]]

      $addSeparator[Small;false]

      $addTextDisplay[## Catch 20 rare animals in \`raretryrun\`!]
      $addTextDisplay[-# $if[...;✅ Completed;In progress]]

      $addSeparator[Small;false]

      $addTextDisplay[## Catch any rare pumpkin in \`pumpkin\`!]
      $addTextDisplay[-# $if[...;✅ Completed;In progress]]

      $addSeparator[Small;false]

      $addTextDisplay[## Catch any rare umbrella in \`umbrella\`!]
      $addTextDisplay[-# $if[...;✅ Completed;In progress]]

      $addSeparator[Small;false]

      $addTextDisplay[## Catch any rare beachball in \`beachball\`!]
      $addTextDisplay[-# $if[...;✅ Completed;In progress]]

      $addSeparator
      $addTextDisplay[## Complete these quests to earn \`30,000\`$getGlobalVar[emoji]!]
    ;$getGlobalVar[defaultColor]]
  `
}