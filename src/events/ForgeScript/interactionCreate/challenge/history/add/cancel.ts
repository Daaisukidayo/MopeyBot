// when pressing the "Reset" button. Resets the user's config.

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;cancelNewHistoryPage]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $deleteUserVar[addHistorySavedConfig]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;addhistory.cancelNewHistoryPageTitle]]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate
    $!stopCommandTimeout[addhistory]
  `
}