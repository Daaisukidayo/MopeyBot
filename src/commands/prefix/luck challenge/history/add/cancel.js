// when pressing the "Reset" button. Resets the user's config.

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;cancelNewHistoryPage]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $deleteUserVar[savedNewHistoryConfig]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.addHistory.cancelNewHistoryPageTitle]]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate
  `
}