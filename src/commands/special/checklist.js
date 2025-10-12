import uniSnippets from "#snippets/universalSnippets.js";

export default {
  name: "checklist",
  aliases: ["cl"],
  type: "messageCreate",
  code: `
    $reply
    ${uniSnippets.checkProfile({time: '10s'})}

    $let[lastClaimed;$default[$env[userProfile;limiters;lastClaimedDay];-1]]
    $let[daily;$default[$env[userProfile;limiters;lastDailyDay];-1]]

    $let[lastDailyRaretry;$default[$env[userProfile;limiters;lastDailyRaretry];-1]]
    $let[lastDailyRaretryrun;$default[$env[userProfile;limiters;lastDailyRaretryrun];-1]]
    $let[catchedRaresInRaretryrun;$getUserVar[catchedRaresInRaretryrun]]
    $let[catchedRaresInRaretry;$getUserVar[catchedRaresInRaretry]]

    $let[hasVoted;$hasVoted[$authorID]]
    $let[checklistReward;$getGlobalVar[checklistReward]]

    $let[extra;\`$separateNumber[$get[checklistReward];,]\`$getGlobalVar[emoji]!]
    $let[content;## Complete these tasks to earn $get[extra]]

    $if[$get[lastClaimed]==$day;
      $let[content;## ✅ All rewards have been received! Come back tomorrow!]
    ]

    $if[$and[$get[lastClaimed]!=$day;$get[daily]==$day;$get[hasVoted];$get[lastDailyRaretry]==$day;$get[lastDailyRaretryrun]==$day];
      $callFunction[sumMC;$get[checklistReward]]
      $!jsonSet[userProfile;limiters;lastClaimedDay;$day]
      $setUserVar[userProfile;$env[userProfile]]
      $setUserVar[catchedRaresInRaretry;0]
      $setUserVar[catchedRaresInRaretryrun;0]
      $setUserVar[dailyStreak;$math[$getUserVar[dailyStreak] + 1]]
      $let[content;## You have completed all tasks and earned $get[extra]]
    ]

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

      $addTextDisplay[## Catch 3 rare animals in \`raretry\`!]
      $addTextDisplay[-# $if[$get[lastDailyRaretry]==$day;✅ Completed;In progress ($get[catchedRaresInRaretry]/$getGlobalVar[maxRaretryRares])]]

      $addSeparator[Small;false]

      $addTextDisplay[## Catch 20 rare animals in \`raretryrun\`!]
      $addTextDisplay[-# $if[$get[lastDailyRaretryrun]>=$day;✅ Completed;In progress ($get[catchedRaresInRaretryrun]/20)]]

      $addSeparator[Large]
      $addTextDisplay[$get[content]]

      $addSeparator[Large;false]

      $addTextDisplay[### 🔥 You are on your \`$ordinal[$getUserVar[dailyStreak]]\` daily streak!]
    ;$getGlobalVar[defaultColor]]
  `
}