export default [{
  name: 'handleReminders',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[allReminders;$getGlobalVar[allReminders]]
    $jsonLoad[userReminders;$getUserVar[userReminders]]

    $remindersEmbed

    $newCommandTimeout
  `
},{
  name: 'remindersEmbed',
  code: `
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.reminders.title]]
      $addSeparator[Large]

      $arrayForEach[allReminders;reminder;
        $let[hasReminder;$arrayIncludes[userReminders;$env[reminder]]]
        $let[isEnabled;$if[$get[hasReminder];$tl[ui.reminders.enabled];$tl[ui.reminders.disabled]]]
        $let[style;$if[$get[hasReminder];Success;Danger]]

        $addSection[
          $addTextDisplay[## _$tl[data.reminders.$env[reminder]]_]
          $addButton[$env[reminder]-reminder-$authorID;$get[isEnabled];$get[style]]
        ]
      ]
    ;$getGlobalVar[defaultColor]]
  `
}]