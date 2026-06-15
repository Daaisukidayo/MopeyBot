export default {
  name: "reminders",
  type: "interactionCreate",
  allowed: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[allReminders;$getGlobalVar[allReminders]]
    $jsonLoad[userReminders;$getUserVar[userReminders]]
    
    $let[reminder;$env[IID;1]]

    $toggleArrayValue[userReminders;$get[reminder]]

    $setUserVar[userReminders;$env[userReminders]]

    $remindersEmbed
    $interactionUpdate
    $newCommandTimeout[reminders]
  `
}