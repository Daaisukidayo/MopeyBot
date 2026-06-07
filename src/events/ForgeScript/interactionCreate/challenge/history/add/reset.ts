// when pressing the "Reset" button. Resets the user's config.

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;resetNewHistoryPage]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addHistoryNewConfig
    $jsonLoad[addHistorySavedConfig;$getUserVar[addHistorySavedConfig]]
    
    $historyEmbed[$env[addHistorySavedConfig]]
    $addHistoryExtraEmbed
    $interactionUpdate
    $newCommandTimeout[addhistory]
  `
}