export default [{
  name: 'handleReminders',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $remindersEmbed
    $newCommandTimeout
  `
},{
  name: 'remindersEmbed',
  code: `
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.reminders.title.$get[l]]]
      $addSeparator[Large]

      $arrayForEach[$getGlobalVar[allReminders];reminder;
        $let[hasReminder;$arrayIncludes[$getUserVar[userReminders];$env[reminder]]]
        $let[isEnabled;$if[$get[hasReminder];$tl[ui.reminders.enabled.$get[l]];$tl[ui.reminders.disabled.$get[l]]]]
        $let[style;$if[$get[hasReminder];Success;Danger]]

        $addSection[
          $addTextDisplay[## _$tl[data.reminders.$env[reminder].$get[l]]_]
          $addButton[reminders-$env[reminder]-$authorID;$get[isEnabled];$get[style]]
        ]
      ]
    ;$getGlobalVar[defaultColor]]
  `
}]