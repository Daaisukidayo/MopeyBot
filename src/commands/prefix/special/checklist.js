export default {
  name: "checklist",
  aliases: ["cl"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[10s]

    $let[lastClaimed;$default[$env[userProfile;limiters;lastClaimedDay];-1]]
    $let[daily;$default[$env[userProfile;limiters;lastDailyDay];-1]]

    $let[lastDailyRaretry;$default[$env[userProfile;limiters;lastDailyRaretry];-1]]
    $let[lastDailyRaretryrun;$default[$env[userProfile;limiters;lastDailyRaretryrun];-1]]
    $let[caughtRaresInRaretryrun;$getUserVar[caughtRaresInRaretryrun]]
    $let[caughtRaresInRaretry;$getUserVar[caughtRaresInRaretry]]

    $let[hasVoted;$hasVoted[$authorID]]
    $let[checklistReward;$getGlobalVar[checklistReward]]

    $let[extra;$separate[$get[checklistReward]]]
    $let[content;$tl[ui.$commandName.completeTasks;$get[extra]]]

    $if[$get[lastClaimed]==$day;
      $let[content;$tl[ui.$commandName.allRewardsReceived]]
    ]

    $if[$and[$get[lastClaimed]!=$day;$get[daily]==$day;$get[hasVoted];$get[lastDailyRaretry]==$day;$get[lastDailyRaretryrun]==$day];
      $sumCash[$get[checklistReward]]
      $!jsonSet[userProfile;limiters;lastClaimedDay;$day]
      $saveProfile
      $setUserVar[caughtRaresInRaretry;0]
      $setUserVar[caughtRaresInRaretryrun;0]
      $setUserVar[dailyStreak;$math[$getUserVar[dailyStreak] + 1]]
      $let[content;$tl[ui.$commandName.allTasksCompleted;$get[extra]]]
    ]

    $let[streak;$getUserVar[dailyStreak]]

    $let[completed;$tl[ui.$commandName.completed]]
    $let[inProgress;$tl[ui.$commandName.inProgress]]

    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[ui.$commandName.title]]
      $addSeparator[Large]

      $addTextDisplay[$tl[ui.$commandName.claimDaily]]
      $addTextDisplay[$if[$get[daily]==$day;$get[completed];$get[inProgress]]]

      $addSeparator[Small;false]

      $addTextDisplay[## $hyperlink[$tl[ui.$commandName.vote];https://top.gg/bot/$clientID/vote]]
      $addTextDisplay[$if[$get[hasVoted];$get[completed];$get[inProgress]]]

      $addSeparator[Small;false]

      $addTextDisplay[$tl[ui.$commandName.catchRaretry;$getGlobalVar[maxRaretryRares]]]
      $addTextDisplay[$if[$get[lastDailyRaretry]==$day;$get[completed];$get[inProgress] ($get[caughtRaresInRaretry]/$getGlobalVar[maxRaretryRares])]]

      $addSeparator[Small;false]

      $addTextDisplay[$tl[ui.$commandName.catchRaretryrun;$getGlobalVar[maxRaretryrunRares]]]
      $addTextDisplay[$if[$get[lastDailyRaretryrun]==$day;$get[completed];$get[inProgress] ($get[caughtRaresInRaretryrun]/$getGlobalVar[maxRaretryrunRares])]]

      $addSeparator[Large]
      $addTextDisplay[$get[content]]

      $addSeparator[Large]

      $addTextDisplay[$tl[ui.$commandName.streak;$get[streak]]]
    ;$getGlobalVar[defaultColor]]
  `
}