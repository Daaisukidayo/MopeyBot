export default [{
  name: 'reminders',
  aliases: ['rmd'],
  type: 'messageCreate',
  code: `
    $handleReminders
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

    $toggleArrayValue[userReminders;$get[reminder]]

    $setUserVar[userReminders;$env[userReminders]]

    $remindersEmbed
    $interactionUpdate
    $newCommandTimeout[reminders]
  `
}]