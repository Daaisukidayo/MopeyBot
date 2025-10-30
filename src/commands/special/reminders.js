import universalSnippets from "#snippets/universalSnippets.js"

export default [{
  name: 'reminders',
  aliases: ['rmd'],
  type: 'messageCreate',
  code: `
    $reply
    ${universalSnippets.checkProfile({time: '10s'})}
    ${loadJSON()}
    ${embed()}
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]
    ${universalSnippets.loadProfile()}
    $onlyIf[$arrayIncludes[IID;reminder]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${loadJSON()}
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
  `
}]

function loadJSON() {
  return `
  $jsonLoad[allReminders;$getGlobalVar[allReminders]]
  $jsonLoad[allRemindersContent;$getGlobalVar[allRemindersContent]]
  $jsonLoad[userReminders;$getUserVar[userReminders]]
  `
}

function embed() {
  return `
    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[# 🔔__REMINDERS__🔔]
      $addSeparator[Large]

      $arrayForEach[allReminders;notif;
        $let[hasReminder;$arrayIncludes[userReminders;$env[notif]]]
        $let[isEnabled;$if[$get[hasReminder];Enabled;Disabled]]
        $let[style;$if[$get[hasReminder];Success;Danger]]

        $addSection[
          $addTextDisplay[## $env[allRemindersContent;$env[notif]]]
          $addButton[$env[notif]-reminder-$authorID;$get[isEnabled];$get[style]]
        ]
      ]
    ;$getGlobalVar[defaultColor]]
  `
}