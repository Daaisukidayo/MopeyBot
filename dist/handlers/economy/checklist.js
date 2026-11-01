"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
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

    $c[stale counters read as 0, a missed day shows streak 0]
    $callMethod[userProfile;refreshChecklist]
    $let[dailyDone;$checkCondition[$jsonGet[userProfile;rewards;daily_day]==$get[day]]]
    $let[hasVoted;$hasVoted[$authorID]]
    $let[raretryDone;$checkCondition[$jsonGet[userProfile;checklist;raretry_rares]>=$get[maxRaretry]]]
    $let[raretryrunDone;$checkCondition[$jsonGet[userProfile;checklist;raretryrun_rares]>=$get[maxRaretryrun]]]

    $fn[status;
      $return[$if[$env[done];$tl[ui.checklist.completed.$get[l]];$tl[ui.checklist.inProgress.$get[l];$env[progress]]]]
    ;done;progress]

    $c[reward once a day, once all tasks are done]
    $if[$jsonGet[userProfile;checklist;claimed_day]==$get[day];
      $let[content;$tl[ui.checklist.allRewardsReceived.$get[l]]]
    ;$if[$and[$get[dailyDone];$get[hasVoted];$get[raretryDone];$get[raretryrunDone]];
      $callMethod[userProfile;addCoins;$get[reward]]
      $!jsonSet[userProfile;checklist;claimed_day;$get[day]]
      $c[a missed day zeroed the streak above, so this restarts it at 1]
      $jsonMath[userProfile;checklist;streak;1]
      $callMethod[userProfile;save]
      $let[content;$tl[ui.checklist.allTasksCompleted.$get[l];$separate[$get[reward]]]]
    ;
      $let[content;$tl[ui.checklist.completeTasks.$get[l];$separate[$get[reward]]]]
    ]]

    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[ui.checklist.title.$get[l]]]
      $addSeparator[Large]

      $addTextDisplay[$tl[ui.checklist.claimDaily.$get[l]]]
      $addTextDisplay[$callFn[status;$get[dailyDone];]]
      $addSeparator[Small;false]

      $addTextDisplay[$tl[ui.checklist.vote.$get[l];https://top.gg/bot/$clientID/vote]]
      $addTextDisplay[$callFn[status;$get[hasVoted];]]
      $addSeparator[Small;false]

      $addTextDisplay[$tl[ui.checklist.catchRaretry.$get[l];$get[maxRaretry]]]
      $addTextDisplay[$callFn[status;$get[raretryDone];($jsonGet[userProfile;checklist;raretry_rares]/$get[maxRaretry])]]
      $addSeparator[Small;false]

      $addTextDisplay[$tl[ui.checklist.catchRaretryrun.$get[l];$get[maxRaretryrun]]]
      $addTextDisplay[$callFn[status;$get[raretryrunDone];($jsonGet[userProfile;checklist;raretryrun_rares]/$get[maxRaretryrun])]]

      $addSeparator[Large]
      $addTextDisplay[$get[content]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.checklist.streak.$get[l];$jsonGet[userProfile;checklist;streak]]]
    ;$getGlobalVar[defaultColor]]
  `,
});
//# sourceMappingURL=checklist.js.map