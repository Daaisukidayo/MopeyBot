export default [{
  name: "raretrymode",
  aliases: ["rtm", "rtmode"],
  type: "messageCreate",
  code: `
    $handleRaretrymode
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;rtMode]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[raretrymode;true]

    $jsonLoad[modes;$dump[$getGlobalVar[raretryVarData];modes]]

    $!jsonSet[userProfile;rtMode;$env[IID;0]]
    $saveProfile

    $raretrymodeEmbed
    $interactionUpdate
    
    $newCommandTimeout[raretrymode]
  `
}]