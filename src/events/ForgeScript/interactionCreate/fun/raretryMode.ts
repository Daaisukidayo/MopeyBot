export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;rtMode]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[raretrymode;true]

    $jsonLoad[modes;$getGlobalVar[raretryModes]]

    $!jsonSet[userProfile;rtMode;$env[IID;0]]
    $saveProfile

    $raretrymodeEmbed
    $interactionUpdate
    
    $newCommandTimeout[raretrymode]
  `
}