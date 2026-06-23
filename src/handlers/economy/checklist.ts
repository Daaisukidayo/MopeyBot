export default {
  name: 'handleChecklist',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $let[day;$calendarDay]

    $let[lastClaimed;$default[$env[userProfile;limiters;lastClaimedDay];-1]]
    $let[daily;$default[$env[userProfile;limiters;lastDailyDay];-1]]

    $let[lastDailyRaretry;$default[$env[userProfile;limiters;lastDailyRaretry];-1]]
    $let[lastDailyRaretryrun;$default[$env[userProfile;limiters;lastDailyRaretryrun];-1]]
    $let[caughtRaresInRaretryrun;$getUserVar[caughtRaresInRaretryrun]]
    $let[caughtRaresInRaretry;$getUserVar[caughtRaresInRaretry]]

    $let[hasVoted;$hasVoted[$authorID]]
    $let[checklistReward;$getGlobalVar[checklistReward]]

    $let[extra;$separate[$get[checklistReward]]]
    $let[content;$tl[ui.checklist.completeTasks.$get[l];$get[extra]]]

    $if[$get[lastClaimed]==$get[day];
      $let[content;$tl[ui.checklist.allRewardsReceived.$get[l]]]
    ]

    $if[$and[$get[lastClaimed]!=$get[day];$get[daily]==$get[day];$get[hasVoted];$get[lastDailyRaretry]==$get[day];$get[lastDailyRaretryrun]==$get[day]];
      $sumCash[$get[checklistReward]]
      $!jsonSet[userProfile;limiters;lastClaimedDay;$get[day]]
      $saveProfile[$env[userProfile]]
      $deleteUserVar[caughtRaresInRaretry]
      $deleteUserVar[caughtRaresInRaretryrun]
      $setUserVar[dailyStreak;$math[$getUserVar[dailyStreak] + 1]]
      $let[content;$tl[ui.checklist.allTasksCompleted.$get[l];$get[extra]]]
    ]

    $let[streak;$getUserVar[dailyStreak]]


    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[ui.checklist.title.$get[l]]]
      $addSeparator[Large]

      $addTextDisplay[$tl[ui.checklist.claimDaily.$get[l]]]
      $addTextDisplay[$if[$get[daily]==$get[day];$tl[ui.checklist.completed.$get[l]];$tl[ui.checklist.inProgress.$get[l];]]]

      $addSeparator[Small;false]

      $addTextDisplay[$tl[ui.checklist.vote.$get[l];https://top.gg/bot/$clientID/vote]]
      $addTextDisplay[$if[$get[hasVoted];$tl[ui.checklist.completed.$get[l]];$tl[ui.checklist.inProgress.$get[l];]]]

      $addSeparator[Small;false]

      $addTextDisplay[$tl[ui.checklist.catchRaretry.$get[l];$getGlobalVar[maxRaretryRares]]]
      $addTextDisplay[$if[$get[lastDailyRaretry]==$get[day];$tl[ui.checklist.completed.$get[l]];$tl[ui.checklist.inProgress.$get[l];($get[caughtRaresInRaretry]/$getGlobalVar[maxRaretryRares])]]]

      $addSeparator[Small;false]

      $addTextDisplay[$tl[ui.checklist.catchRaretryrun.$get[l];$getGlobalVar[maxRaretryrunRares]]]
      $addTextDisplay[$if[$get[lastDailyRaretryrun]==$get[day];$tl[ui.checklist.completed.$get[l]];$tl[ui.checklist.inProgress.$get[l];($get[caughtRaresInRaretryrun]/$getGlobalVar[maxRaretryrunRares])]]]

      $addSeparator[Large]
      $addTextDisplay[$get[content]]

      $addSeparator[Large]

      $addTextDisplay[$tl[ui.checklist.streak.$get[l];$get[streak]]]
    ;$getGlobalVar[defaultColor]]
  `
}