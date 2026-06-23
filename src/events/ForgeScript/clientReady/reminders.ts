export default {
  type: 'clientReady',
  code: `
    $fn[embed;
      $addContainer[
        $addTextDisplay[$tl[ui.reminders.sentReminderTitle.$env[locale]]]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.reminders.on.$env[locale];$tl[data.reminders.$env[locale].$env[reminder_id]]]]
        $addSeparator
        $addTextDisplay[$tl[ui.reminders.sentReminderTip.$env[locale];/reminders]]
      ;$getGlobalVar[defaultColor]]
    ;reminder_id;locale]

    $loop[-1;
      $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
      $let[week;$if[$weekday==0;$sub[$calendarWeek;1];$calendarWeek]]
      $let[day;$calendarDay]

      $c[REMIND DAILY REWARD]
      $if[$getGlobalVar[lastCheckedDayInReady;-1]!=$get[day]; 
        $setGlobalVar[lastCheckedDayInReady;$get[day]]
        $loop[$arrayLength[allUserIDs];
          $let[id;$env[allUserIDs;$math[$env[i] - 1]]]
          $jsonLoad[userReminders;$getUserVar[userReminders;$get[id]]]
          $jsonLoad[userProfile;$getProfile[$get[id]]]

          $deleteUserVar[caughtRaresInRaretryrun;$get[id]]
          $deleteUserVar[caughtRaresInRaretry;$get[id]]

          $if[$env[userProfile;limiters;lastDailyDay]==$get[day];$continue]
          $if[$arrayIncludes[userReminders;0];;$continue]
          $if[$isUserDMEnabled[$get[id]];;$continue]

          $callFn[embed;0;$env[userProfile;language]]
          $sendDM[$get[id]]
        ;i;true]
      ]

      $c[REMIND WEEKLY REWARD]
      $if[$getGlobalVar[lastCheckedWeeklyInReady;-1]!=$get[week]; 
        $setGlobalVar[lastCheckedWeeklyInReady;$get[week]]

        $loop[$arrayLength[allUserIDs];
          $let[id;$env[allUserIDs;$math[$env[i] - 1]]]
          $jsonLoad[userReminders;$getUserVar[userReminders;$get[id]]]
          $jsonLoad[userProfile;$getProfile[$get[id]]]

          $if[$env[userProfile;limiters;lastWeeklyWeek]==$get[week];$continue]
          $if[$arrayIncludes[userReminders;1];;$continue]
          $if[$isUserDMEnabled[$get[id]];;$continue]

          $callFn[embed;1;$env[userProfile;language]]
          $sendDM[$get[id]]
        ;i;true]
      ]
      $wait[5m]
    ]
  `
}