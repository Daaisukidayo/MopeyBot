export default [{
  name: 'reminders',
  aliases: ['rmd'],
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[1m]
    $jsonLoad[allReminders;$getGlobalVar[allReminders]]
    $jsonLoad[userReminders;$getUserVar[userReminders]]
    ${embed()}
    $newTimeout[RMD-$authorID;1m;$sendMessage[$channelID;;true]]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;reminder]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[allReminders;$getGlobalVar[allReminders]]
    $jsonLoad[userReminders;$getUserVar[userReminders]]
    
    $let[reminder;$env[IID;0]]
    $if[$arrayIncludes[userReminders;$get[reminder]];
      $let[index;$arrayIndexOf[userReminders;$get[reminder]]]
      $!arraySplice[userReminders;$get[index];1]
    ;
      $arrayPush[userReminders;$get[reminder]]
    ]

    $setUserVar[userReminders;$env[userReminders]]

    ${embed()}
    $interactionUpdate
    $newTimeout[RMD-$authorID;1m]
  `
}]

function embed() {
  return `
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
}