export default {
  type: 'clientReady',
  code: `
    $loop[-1;
      $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]

      $fn[embed;
        $addContainer[
          $addTextDisplay[# 🔔__REMINDER__🔔]
          $addSeparator[Large]
          $addTextDisplay[## $env[content]]
          $addSeparator
          $addTextDisplay[### To disable reminders, use \`/reminders\` slash command!]
        ;$getGlobalVar[defaultColor]]
      ;content]

      $c[REMIND DAILY REWARD]
      
      $if[$getGlobalVar[lastCheckedDayInReady;-1]!=$day; 
        $setGlobalVar[lastCheckedDayInReady;$day]
        $loop[$arrayLength[allUserIDs];
          $let[userID;$env[allUserIDs;$math[$env[i] - 1]]]
          $jsonLoad[userReminders;$getUserVar[userReminders;$get[userID]]]
          $jsonLoad[userProfile;$getProfile[$get[userID]]]

          $setUserVar[caughtRaresInRaretryrun;0;$get[userID]]
          $setUserVar[caughtRaresInRaretry;0;$get[userID]]

          $if[$env[userProfile;limiters;lastDailyDay]==$day;$continue]
          $if[$arrayIncludes[userReminders;daily];;$continue]
          $if[$isUserDMEnabled[$get[userID]];;$continue]

          $callFn[embed;Daily reward and checklist quests are available!]
          $sendDM[$get[userID]]
        ;i;true]
      ]

      $c[REMIND WEEKLY REWARD]
      $if[$getGlobalVar[lastCheckedWeeklyInReady;-1]!=$calendarWeek; 
        $setGlobalVar[lastCheckedWeeklyInReady;$calendarWeek]

        $loop[$arrayLength[allUserIDs];
          $let[userID;$env[allUserIDs;$math[$env[i] - 1]]]
          $jsonLoad[userReminders;$getUserVar[userReminders;$get[userID]]]
          $jsonLoad[userProfile;$getProfile[$get[userID]]]

          $if[$env[userProfile;limiters;lastWeeklyWeek]==$calendarWeek;$continue]
          $if[$arrayIncludes[userReminders;weekly];;$continue]
          $if[$isUserDMEnabled[$get[userID]];;$continue]

          $callFn[embed;Weekly reward is available!]
          $sendDM[$get[userID]]
        ;i;true]
      ]
      $wait[5m]
    ]
  `
}