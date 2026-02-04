// when pressing the "Reset" button. Resets the user's config.

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;resetNewHistoryPage]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addHistoryNewConfig
    $jsonLoad[savedNewHistoryConfig;$getUserVar[savedNewHistoryConfig]]
    
    $historyEmbed[$env[savedNewHistoryConfig]]
    $addHistoryExtraEmbed
    $interactionUpdate
  `
}