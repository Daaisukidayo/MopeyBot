import { Command } from "@quoriel/edge"

export default new Command({
  name: "notARobot",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $c[The user's Discord language, when available]
    $jsonLoad[allLocales;$getGlobalVar[allLocales]]
    $objectMerge[userProfile;$objectOf[language;$if[$jsonHas[allLocales;$locale];$locale;en-US];ID;"$authorID"]]
    $saveProfile[$env[userProfile]]
    $rulesEmbed
    $interactionUpdate
  `
})
