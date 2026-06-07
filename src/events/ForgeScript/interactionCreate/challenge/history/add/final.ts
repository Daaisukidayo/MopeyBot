// Embed after uploading new history

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;uploadNewHistoryPage]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    
    $jsonLoad[addHistorySavedConfig;$getUserVar[addHistorySavedConfig]]

    $jsonLoad[history;$getUserVar[challengeHistory]]

    $jsonLoad[newHistory;$getGlobalVar[baseHistoryPage]]
    $!jsonSet[newHistory;id;$randomUUID]
    $!jsonSet[newHistory;points;$env[addHistorySavedConfig;points]]
    $!jsonSet[newHistory;rares;$env[addHistorySavedConfig;rares]]
    $!jsonSet[newHistory;endDate;"$env[addHistorySavedConfig;endDate]"]
    $!jsonSet[newHistory;playType;$env[addHistorySavedConfig;playType]]
    $!jsonSet[newHistory;difficulty;$env[addHistorySavedConfig;difficulty]]
    $!jsonSet[newHistory;raresList;$env[addHistorySavedConfig;raresList]]

    $arrayPushJSON[history;$env[newHistory]]
    $setUserVar[challengeHistory;$env[history]]
    $deleteUserVar[addHistorySavedConfig]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;addhistory.addedHistory]]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate

    $!stopCommandTimeout[addhistory]
  `
}