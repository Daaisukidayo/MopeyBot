import listGenerator from "../../../../JSfunctions/luck challenge/listGenerator.js"

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
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    $jsonLoad[allLobbyTagsContent;$getGlobalVar[allLobbyTagsContent]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[animals;$readFile[json/animals.json]]
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
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $callFunction[newError;Invalid number!]
          $ephemeral
          $interactionFollowUp
        ]
        $!jsonSet[savedNewHistoryConfig;points;$get[input]]
        $let[points;$get[input]]
      ]


      $case[addHistoryCustomRares;
        $let[input;$input[addedRaresQuantity]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $callFunction[newError;Invalid number!]
          $ephemeral
          $interactionFollowUp
        ]
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
        $onlyIf[$get[date]>0;
          $callFunction[newError;Invalid date!]
          $ephemeral
          $interactionFollowUp
        ]
        $!jsonSet[savedNewHistoryConfig;endedAt;$get[date]]
        $let[endingDate;$get[date]]
      ]


      $case[addHistoryCustomTags;
        $if[$arrayIncludes[tags;$get[value]];
          $!arraySplice[tags;$arrayIndexOf[tags;$get[value]];1]
        ;
          $arrayPush[tags;$get[value]]
        ]
        $!jsonSet[savedNewHistoryConfig;tags;$env[tags]]
      ]


      $case[addHistoryCustomRaresList;
        $arrayLoad[addedRaresList;,;$input[addedRaresList]]
        $arrayForEach[addedRaresList;elem;
          $arrayLoad[keyValue;=;$env[elem]]
          $let[animalID;$callFunction[findingAnimalID;$env[keyValue;0]]]
          $let[value;$env[keyValue;1]]

          $onlyIf[$get[animalID]!=undefined;
            $callFunction[newError;Unknown animal \`$env[keyValue;0]\` in \`$env[elem]\`!]
            $ephemeral
            $interactionFollowUp
          ]

          $onlyIf[$isNumber[$get[value]];
            $callFunction[newError;Invalid value \`$get[value]\` in \`$env[elem]\`]
            $ephemeral
            $interactionFollowUp
          ]

          $!jsonSet[raresList;$get[animalID];$get[value]]

          $if[$get[value]<=0;
            $!jsonDelete[raresList;$get[animalID]]
          ]
          $!jsonSet[savedNewHistoryConfig;raresList;$env[raresList]]
        ]
      ]
    ]
    
    $if[$arrayLength[tags]==0;
      $arrayPush[tags;None]
    ;
      $arrayMap[tags;tag;
        $return[$env[allLobbyTagsContent;$env[tag]]]
      ;tags]
    ]

    ${listGenerator()}

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
      $addTextDisplay[$codeBlock[$arrayJoin[tags;\n]]]
      $addSeparator[Large]
      $callFunction[listDesign]
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