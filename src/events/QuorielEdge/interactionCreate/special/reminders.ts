import { Command } from "@quoriel/edge"

export default new Command({
  name: "reminders",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[userReminders;$getUserVar[userReminders]]
    $toggleArrayValue[userReminders;$jsonGet[IID;1]]

    $setUserVar[userReminders;$env[userReminders]]

    $remindersEmbed
    $interactionUpdate
    $newCommandTimeout[reminders]
  `,
})
