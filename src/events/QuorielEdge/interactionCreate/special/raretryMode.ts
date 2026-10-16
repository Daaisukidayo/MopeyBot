import { Command } from "@quoriel/edge"

export default new Command({
  name: "rtMode",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[raretrymode;true]

    $!jsonSet[userProfile;rtMode;$jsonGet[IID;1]]
    $saveProfile[$env[userProfile]]

    $raretrymodeEmbed
    $interactionUpdate
    
    $newCommandTimeout[raretrymode]
  `,
})
