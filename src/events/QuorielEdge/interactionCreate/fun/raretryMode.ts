export default {
  name: "rtMode",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[raretrymode;true]

    $jsonLoad[modes;$getGlobalVar[raretryModes]]

    $!jsonSet[userProfile;rtMode;$env[IID;1]]
    $saveProfile

    $raretrymodeEmbed
    $interactionUpdate
    
    $newCommandTimeout[raretrymode]
  `
}