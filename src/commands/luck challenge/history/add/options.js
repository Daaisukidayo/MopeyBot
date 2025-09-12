import historyOptions from '#snippets/optionsForHistory.js'
import challengeSnippets from '#snippets/challengeSnippets.js'
import universalSnippets from '#snippets/universalSnippets.js'

// Embed with options that are gonna be added to history

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu', 'modal'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryOptions,addNewHistoryPageModalPoints,addNewHistoryPageModalRares,addHistoryCustomPoints,addHistoryCustomRares,addHistoryCustomPlayType,addHistoryCustomDifficulty,addHistoryCustomEndedAt,addHistoryCustomTags,addHistoryCustomRaresList]
    $let[value;$selectMenuValues]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$get[value]!=editExistingHistoryPage]
    ${universalSnippets.loadProfile()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    $jsonLoad[allLobbyTagsContent;$getGlobalVar[allLobbyTagsContent]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[animals;$readFile[src/json/animals.json]]
    $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]

    $timezone[$env[userProfile;timezone]]
    $let[disabledUploadButton;true]

    $if[$getUserVar[savedNewHistoryConfig]==;
      $jsonLoad[savedNewHistoryConfig;{
        "points": 0,
        "rares": 0,
        "playType": "Solo",
        "difficulty": "None",
        "endedAt": 0,
        "tags": [\\],
        "raresList": {}
      }]
      $setUserVar[savedNewHistoryConfig;$env[savedNewHistoryConfig]]
    ]

    $jsonLoad[savedNewHistoryConfig;$getUserVar[savedNewHistoryConfig]]
    $jsonLoad[raresList;$env[savedNewHistoryConfig;raresList]]
    $jsonLoad[tags;$env[savedNewHistoryConfig;tags]]
    $let[points;$env[savedNewHistoryConfig;points]]
    $let[rares;$env[savedNewHistoryConfig;rares]]
    $let[endingDate;$env[savedNewHistoryConfig;endedAt]]
    $let[difficulty;$env[savedNewHistoryConfig;difficulty]]
    $let[playType;$env[savedNewHistoryConfig;playType]]

    $fetchResponse[$channelID;$messageID]
    $interactionUpdate

    $switch[$env[IID;0];

      $case[addHistoryCustomPoints;
        $let[input;$input[addedPoints]]
        ${historyOptions.pointsOption()}
        $!jsonSet[savedNewHistoryConfig;points;$get[input]]
        $let[points;$get[input]]
      ]


      $case[addHistoryCustomRares;
        $let[input;$input[addedRaresQuantity]]
        ${historyOptions.raresOption()}
        $!jsonSet[savedNewHistoryConfig;rares;$get[input]]
        $let[rares;$get[input]]
      ]


      $case[addHistoryCustomPlayType;
        $!jsonSet[savedNewHistoryConfig;playType;$get[value]]
        $let[playType;$get[value]]
      ]


      $case[addHistoryCustomDifficulty;
        $!jsonSet[savedNewHistoryConfig;difficulty;$get[value]]
        $let[difficulty;$get[value]]
      ]


      $case[addHistoryCustomEndedAt;
        $let[input;$input[addedEndedAt]]
        $let[date;$unparseDate[$get[input]]]
        ${historyOptions.endedAtOption()}
        $!jsonSet[savedNewHistoryConfig;endedAt;$get[date]]
        $let[endingDate;$get[date]]
      ]


      $case[addHistoryCustomTags;
        ${historyOptions.tagsOption()}
        $!jsonSet[savedNewHistoryConfig;tags;$env[tags]]
      ]


      $case[addHistoryCustomRaresList;
        $arrayLoad[addedRaresList;,;$input[addedRaresList]]
        $arrayForEach[addedRaresList;elem;
          ${historyOptions.listOption()}
          $!jsonSet[savedNewHistoryConfig;raresList;$env[raresList]]
        ]
      ]

    ]
    
    ${universalSnippets.settingTagsContent()}
    ${challengeSnippets.listGenerator()}

    $if[$and[$get[points]!=0;$get[rares]!=0;$get[endingDate]!=0;$env[raresList]!={}];$let[disabledUploadButton;false]]


    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[# Preview]
      $addSeparator[Large]
      $addTextDisplay[### Points: \`$get[points]\`]
      $addSeparator
      $addTextDisplay[### Rares: \`$get[rares]\`]
      $addSeparator
      $addTextDisplay[### Play Type: \`$toTitleCase[$get[playType]]\`]
      $addSeparator
      $addTextDisplay[### Difficulty: \`$toTitleCase[$get[difficulty]]\`]
      $addSeparator
      $addTextDisplay[### Ended at: $discordTimestamp[$get[endingDate];LongDateTime]]
      $addSeparator
      $addTextDisplay[## Tags]
      $addTextDisplay[$codeBlock[$arrayJoin[tagsContent;\n]]]
      $addSeparator[Large]
      ${challengeSnippets.listDesign()}
      $addSeparator
      $addActionRow
      $addStringSelectMenu[historyChooseAdd-$authorID;Choose an option]
      $addOption[Points;;points]
      $addOption[Rares;;raresQuantity]
      $addOption[Play Type;;playType]
      $addOption[Difficulty;;difficulty]
      $addOption[Ended at;;endedAt]
      $addOption[Tags;;tags]
      $addOption[Rares List;;raresList]
      $addActionRow
      $addButton[uploadNewHistoryPage-$authorID;Upload;Success;;$get[disabledUploadButton]]
    ;$getGlobalVar[luckyColor]]
    $setUserVar[savedNewHistoryConfig;$env[savedNewHistoryConfig]]
    $interactionUpdate
  `
}