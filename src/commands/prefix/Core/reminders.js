export default {
  type: 'clientReady',
  code: `
    $loop[-1;
      $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]

      $fn[embed;
        $addContainer[
          $addTextDisplay[$tl[ui.reminders.sentReminderTitle]]
          $addSeparator[Large]
          $addTextDisplay[$tl[ui.reminders.on;$tl[data.reminders.$env[reminder_id]]]]
          $addSeparator
          $addTextDisplay[$tl[ui.reminders.sentReminderTip]]
        ;$getGlobalVar[defaultColor]]
      ;reminder_id]

      $c[REMIND DAILY REWARD]
      
      $if[$getGlobalVar[lastCheckedDayInReady;-1]!=$day; 
        $setGlobalVar[lastCheckedDayInReady;$day]
        $loop[$arrayLength[allUserIDs];
          $let[id;$env[allUserIDs;$math[$env[i] - 1]]]
          $jsonLoad[userReminders;$getUserVar[userReminders;$get[id]]]
          $jsonLoad[userProfile;$getProfile[$get[id]]]

          $setUserVar[caughtRaresInRaretryrun;0;$get[id]]
          $setUserVar[caughtRaresInRaretry;0;$get[id]]

          $if[$env[userProfile;limiters;lastDailyDay]==$day;$continue]
          $if[$arrayIncludes[userReminders;daily];;$continue]
          $if[$isUserDMEnabled[$get[id]];;$continue]

          $callFn[embed;0]
          $sendDM[$get[id]]
        ;i;true]
      ]

      $c[REMIND WEEKLY REWARD]
      $if[$getGlobalVar[lastCheckedWeeklyInReady;-1]!=$calendarWeek; 
        $setGlobalVar[lastCheckedWeeklyInReady;$calendarWeek]

        $loop[$arrayLength[allUserIDs];
          $let[id;$env[allUserIDs;$math[$env[i] - 1]]]
          $jsonLoad[userReminders;$getUserVar[userReminders;$get[id]]]
          $jsonLoad[userProfile;$getProfile[$get[id]]]

          $if[$env[userProfile;limiters;lastWeeklyWeek]==$calendarWeek;$continue]
          $if[$arrayIncludes[userReminders;weekly];;$continue]
          $if[$isUserDMEnabled[$get[id]];;$continue]

          $callFn[embed;1]
          $sendDM[$get[id]]
        ;i;true]
      ]
      $wait[5m]
    ]
  `
}