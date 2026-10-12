import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleChecklist",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $let[day;$calendarDay]
    $let[reward;$getGlobalVar[checklistReward]]
    $let[maxRaretry;$getGlobalVar[maxRaretryRares]]
    $let[maxRaretryrun;$getGlobalVar[maxRaretryrunRares]]

    $let[dailyDone;$checkCondition[$jsonGet[userProfile;limiters;lastDailyDay]==$get[day]]]
    $let[hasVoted;$hasVoted[$authorID]]
    $let[raretryDone;$checkCondition[$jsonGet[userProfile;limiters;lastDailyRaretry]==$get[day]]]
    $let[raretryrunDone;$checkCondition[$jsonGet[userProfile;limiters;lastDailyRaretryrun]==$get[day]]]

    $fn[status;
      $return[$if[$env[done];$tl[ui.checklist.completed.$get[l]];$tl[ui.checklist.inProgress.$get[l];$env[progress]]]]
    ;done;progress]

    $c[The reward is given once a day, when every task is done]
    $if[$jsonGet[userProfile;limiters;lastClaimedDay]==$get[day];
      $let[content;$tl[ui.checklist.allRewardsReceived.$get[l]]]
    ;$if[$and[$get[dailyDone];$get[hasVoted];$get[raretryDone];$get[raretryrunDone]];
      $sumCash[$get[reward]]
      $!jsonSet[userProfile;limiters;lastClaimedDay;$get[day]]
      $saveProfile[$env[userProfile]]
      $deleteUserVar[caughtRaresInRaretry]
      $deleteUserVar[caughtRaresInRaretryrun]
      $setUserVar[dailyStreak;$math[$getUserVar[dailyStreak] + 1]]
      $let[content;$tl[ui.checklist.allTasksCompleted.$get[l];$separate[$get[reward]]]]
    ;
      $let[content;$tl[ui.checklist.completeTasks.$get[l];$separate[$get[reward]]]]
    ]]

    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[ui.checklist.title.$get[l]]]
      $addSeparator[Large]

      $addTextDisplay[$tl[ui.checklist.claimDaily.$get[l]]]
      $addTextDisplay[$callFn[status;$get[dailyDone]]]
      $addSeparator[Small;false]

      $addTextDisplay[$tl[ui.checklist.vote.$get[l];https://top.gg/bot/$clientID/vote]]
      $addTextDisplay[$callFn[status;$get[hasVoted]]]
      $addSeparator[Small;false]

      $addTextDisplay[$tl[ui.checklist.catchRaretry.$get[l];$get[maxRaretry]]]
      $addTextDisplay[$callFn[status;$get[raretryDone];($getUserVar[caughtRaresInRaretry]/$get[maxRaretry])]]
      $addSeparator[Small;false]

      $addTextDisplay[$tl[ui.checklist.catchRaretryrun.$get[l];$get[maxRaretryrun]]]
      $addTextDisplay[$callFn[status;$get[raretryrunDone];($getUserVar[caughtRaresInRaretryrun]/$get[maxRaretryrun])]]

      $addSeparator[Large]
      $addTextDisplay[$get[content]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.checklist.streak.$get[l];$getUserVar[dailyStreak]]]
    ;$getGlobalVar[defaultColor]]
  `
})
