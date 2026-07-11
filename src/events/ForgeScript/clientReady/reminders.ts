import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: 'clientReady',
  code: `
    $fn[embed;
      $addContainer[
        $addTextDisplay[$tl[ui.reminders.sentReminderTitle.$env[locale]]]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.reminders.on.$env[locale];$tl[data.reminders.$env[reminder_id].$env[locale]]]]
        $addSeparator
        $addTextDisplay[$tl[ui.reminders.sentReminderTip.$env[locale];/reminders]]
      ;$getGlobalVar[defaultColor]]
    ;reminder_id;locale]

    $calendar[Iso8601]

    $loop[-1;
      $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
      $let[week;$calendarWeek]
      $let[day;$calendarDay]

      $c[REMIND DAILY REWARD]
      $if[$getGlobalVar[lastCheckedDayInReady;-1]!=$get[day]; 
        $setGlobalVar[lastCheckedDayInReady;$get[day]]
        $forOf[allUserIDs;userId;
          $let[id;$env[userId]]
          $jsonLoad[userReminders;$getUserVar[userReminders;$get[id]]]
          $jsonLoad[userProfile;$getProfile[$get[id]]]

          $deleteUserVar[caughtRaresInRaretryrun;$get[id]]
          $deleteUserVar[caughtRaresInRaretry;$get[id]]

          $if[$env[userProfile;limiters;lastDailyDay]==$get[day];$continue]
          $if[$arrayIncludes[userReminders;0];;$continue]
          $if[$isUserDMEnabled[$get[id]];;$continue]

          $callFn[embed;0;$env[userProfile;language]]
          $sendDM[$get[id]]
        ]
      ]

      $c[REMIND WEEKLY REWARD]
      $if[$getGlobalVar[lastCheckedWeeklyInReady;-1]!=$get[week]; 
        $setGlobalVar[lastCheckedWeeklyInReady;$get[week]]

        $forOf[allUserIDs;userId;
          $let[id;$env[userId]]
          $jsonLoad[userReminders;$getUserVar[userReminders;$get[id]]]
          $jsonLoad[userProfile;$getProfile[$get[id]]]

          $if[$env[userProfile;limiters;lastWeeklyWeek]==$get[week];$continue]
          $if[$arrayIncludes[userReminders;1]==false;$continue]
          $if[$isUserDMEnabled[$get[id]]==false;$continue]

          $callFn[embed;1;$env[userProfile;language]]
          $sendDM[$get[id]]
        ]
      ]
      $wait[5m]
    ]
  `
})