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
      $addTextDisplay[$tl[$get[l];ui;reminders.title]]
      $addSeparator[Large]

      $arrayForEach[$getGlobalVar[allReminders];reminder;
        $let[hasReminder;$arrayIncludes[$getUserVar[userReminders];$env[reminder]]]
        $let[isEnabled;$if[$get[hasReminder];$tl[$get[l];ui;reminders.enabled];$tl[$get[l];ui;reminders.disabled]]]
        $let[style;$if[$get[hasReminder];Success;Danger]]

        $addSection[
          $addTextDisplay[## _$tl[$get[l];data;reminders.$env[reminder]]_]
          $addButton[reminders-$env[reminder]-$authorID;$get[isEnabled];$get[style]]
        ]
      ]
    ;$getGlobalVar[defaultColor]]
  `
}]