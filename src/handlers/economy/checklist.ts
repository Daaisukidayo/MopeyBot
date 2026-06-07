export default {
  name: 'handleChecklist',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $let[lastClaimed;$default[$env[userProfile;limiters;lastClaimedDay];-1]]
    $let[daily;$default[$env[userProfile;limiters;lastDailyDay];-1]]

    $let[lastDailyRaretry;$default[$env[userProfile;limiters;lastDailyRaretry];-1]]
    $let[lastDailyRaretryrun;$default[$env[userProfile;limiters;lastDailyRaretryrun];-1]]
    $let[caughtRaresInRaretryrun;$getUserVar[caughtRaresInRaretryrun]]
    $let[caughtRaresInRaretry;$getUserVar[caughtRaresInRaretry]]

    $let[hasVoted;$hasVoted[$authorID]]
    $let[checklistReward;$getGlobalVar[checklistReward]]

    $let[extra;$separate[$get[checklistReward]]]
    $let[content;$tl[$get[l];ui;checklist.completeTasks;$get[extra]]]

    $if[$get[lastClaimed]==$day;
      $let[content;$tl[$get[l];ui;checklist.allRewardsReceived]]
    ]

    $if[$and[$get[lastClaimed]!=$day;$get[daily]==$day;$get[hasVoted];$get[lastDailyRaretry]==$day;$get[lastDailyRaretryrun]==$day];
      $sumCash[$get[checklistReward]]
      $!jsonSet[userProfile;limiters;lastClaimedDay;$day]
      $saveProfile
      $setUserVar[caughtRaresInRaretry;0]
      $setUserVar[caughtRaresInRaretryrun;0]
      $setUserVar[dailyStreak;$math[$getUserVar[dailyStreak] + 1]]
      $let[content;$tl[$get[l];ui;checklist.allTasksCompleted;$get[extra]]]
    ]

    $let[streak;$getUserVar[dailyStreak]]


    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[$get[l];ui;checklist.title]]
      $addSeparator[Large]

      $addTextDisplay[$tl[$get[l];ui;checklist.claimDaily]]
      $addTextDisplay[$if[$get[daily]==$day;$tl[$get[l];ui;checklist.completed];$tl[$get[l];ui;checklist.inProgress;]]]

      $addSeparator[Small;false]

      $addTextDisplay[$tl[$get[l];ui;checklist.vote;https://top.gg/bot/$clientID/vote]]
      $addTextDisplay[$if[$get[hasVoted];$tl[$get[l];ui;checklist.completed];$tl[$get[l];ui;checklist.inProgress;]]]

      $addSeparator[Small;false]

      $addTextDisplay[$tl[$get[l];ui;checklist.catchRaretry;$getGlobalVar[maxRaretryRares]]]
      $addTextDisplay[$if[$get[lastDailyRaretry]==$day;$tl[$get[l];ui;checklist.completed];$tl[$get[l];ui;checklist.inProgress;($get[caughtRaresInRaretry]/$getGlobalVar[maxRaretryRares])]]]

      $addSeparator[Small;false]

      $addTextDisplay[$tl[$get[l];ui;checklist.catchRaretryrun;$getGlobalVar[maxRaretryrunRares]]]
      $addTextDisplay[$if[$get[lastDailyRaretryrun]==$day;$tl[$get[l];ui;checklist.completed];$tl[$get[l];ui;checklist.inProgress;($get[caughtRaresInRaretryrun]/$getGlobalVar[maxRaretryrunRares])]]]

      $addSeparator[Large]
      $addTextDisplay[$get[content]]

      $addSeparator[Large]

      $addTextDisplay[$tl[$get[l];ui;checklist.streak;$get[streak]]]
    ;$getGlobalVar[defaultColor]]
  `
}