// Embed after uploading new history

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;uploadNewHistoryPage]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]
    
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[savedNewHistoryConfig;$getUserVar[savedNewHistoryConfig]]
    $jsonLoad[raresList;$env[savedNewHistoryConfig;raresList]]
    $jsonLoad[tags;$env[savedNewHistoryConfig;tags]]
    $let[points;$env[savedNewHistoryConfig;points]]
    $let[rares;$env[savedNewHistoryConfig;rares]]
    $let[endingDate;$env[savedNewHistoryConfig;endedAt]]
    $let[difficulty;$env[savedNewHistoryConfig;difficulty]]
    $let[playType;$env[savedNewHistoryConfig;playType]]

    $jsonLoad[newHistory;{
      "points": $get[points],
      "rares": $get[rares],
      "endedAt": "$get[endingDate]",
      "playType": "$get[playType]",
      "tags": $env[tags],
      "difficulty": "$get[difficulty]",
      "raresList": $env[raresList]
    }]

    $arrayPushJSON[history;$env[newHistory]]
    $!jsonSet[userProfile;1hl;history;$env[history]]
    $setUserVar[userProfile;$env[userProfile]]
    $deleteUserVar[savedNewHistoryConfig]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[## Successfully added new history!]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate
  `
}