// Embed after uploading new history

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;uploadNewHistoryPage]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    
    $jsonLoad[savedNewHistoryConfig;$getUserVar[savedNewHistoryConfig]]

    $jsonLoad[history;$getUserVar[challengeHistory]]

    $jsonLoad[newHistory;$getGlobalVar[baseHistoryPage]]
    $!jsonSet[newHistory;points;$env[savedNewHistoryConfig;points]]
    $!jsonSet[newHistory;rares;$env[savedNewHistoryConfig;rares]]
    $!jsonSet[newHistory;endDate;$env[savedNewHistoryConfig;endDate]]
    $!jsonSet[newHistory;playType;$env[savedNewHistoryConfig;playType]]
    $!jsonSet[newHistory;difficulty;$env[savedNewHistoryConfig;difficulty]]
    $!jsonSet[newHistory;raresList;$env[savedNewHistoryConfig;raresList]]

    $arrayPushJSON[history;$env[newHistory]]
    $setUserVar[challengeHistory;$env[history]]
    $deleteUserVar[savedNewHistoryConfig]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.addHistory.addedHistory]]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate
  `
}