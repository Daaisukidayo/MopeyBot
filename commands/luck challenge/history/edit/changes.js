import historySorting from "../../../../JSfunctions/history/sorting.js"
import editHistoryEmbed from "../../../../JSfunctions/history/editHistoryEmbed.js"
import listGenerator from "../../../../JSfunctions/luck challenge/listGenerator.js"
import settingTagsContent from "../../../../JSfunctions/lobby/settingTagsContent.js"

// Message after the changes were made

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu', 'modal'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryCustomPoints,editHistoryCustomRares,editHistoryCustomPlayType,editHistoryCustomDifficulty,editHistoryCustomEndedAt,editHistoryCustomTags,editHistoryCustomRaresList]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    $let[value;$selectMenuValues]
    $let[page;$env[IID;0]]
    $let[sortType;$env[IID;1]]
    $let[pageIndex;$math[$get[page] - 1]]

    $timezone[$env[userProfile;timezone]]

    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[allLobbyTagsContent;$getGlobalVar[allLobbyTagsContent]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]


    ${historySorting()}

    $jsonLoad[tagsInHistory;$env[history;$get[pageIndex];tags]]
    $jsonLoad[raresListInHistory;$env[history;$get[pageIndex];raresList]]
    $let[pointsInHistory;$env[history;$get[pageIndex];points]]
    $let[rareInHistory;$env[history;$get[pageIndex];rares]]
    $let[endingDateInHistory;$env[history;$get[pageIndex];endedAt]]
    $let[difficultyInHistory;$env[history;$get[pageIndex];difficulty]]
    $let[playTypeInHistory;$env[history;$get[pageIndex];playType]]

    ${editHistoryEmbed()}
    $interactionUpdate

    $switch[$env[IID;2];

      $case[editHistoryCustomPoints;

        $let[input;$input[editedPoints]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $callFunction[newError;Invalid number!]
          $ephemeral
          $interactionFollowUp
        ]
        $!jsonSet[history;$get[pageIndex];points;$get[input]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated points! ($get[pointsInHistory] -> $get[input])]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomRares;
        $let[input;$input[editedRaresQuantity]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $callFunction[newError;Invalid number!]
          $ephemeral
          $interactionFollowUp
        ]
        $!jsonSet[history;$get[pageIndex];rares;$get[input]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated rares quantity!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$toTitleCase[$get[rareInHistory]]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$toTitleCase[$get[input]]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomPlayType;
        $!jsonSet[history;$get[pageIndex];playType;$get[value]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated play type!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$toTitleCase[$get[playTypeInHistory]]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$toTitleCase[$get[value]]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomDifficulty;
        $!jsonSet[history;$get[pageIndex];difficulty;$get[value]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated difficulty!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$toTitleCase[$get[difficultyInHistory]]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$toTitleCase[$get[value]]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomEndedAt;
        $let[input;$input[editedEndedAt]]
        $let[date;$unparseDate[$get[input]]]
        $onlyIf[$get[date]>0;
          $callFunction[newError;Invalid date!]
          $ephemeral
          $interactionFollowUp
        ]
        $!jsonSet[history;$get[pageIndex];endedAt;$get[date]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated ending date!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$parseDate[$get[endingDateInHistory];Locale]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$parseDate[$get[date];Locale]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomTags;
        ${settingTagsContent('tagsInHistory', 'oldTags')}

        $if[$arrayIncludes[tagsInHistory;$get[value]];
          $!arraySplice[tagsInHistory;$arrayIndexOf[tagsInHistory;$get[value]];1]
        ;
          $arrayPush[tagsInHistory;$get[value]]
        ]

        $!jsonSet[history;$get[pageIndex];tags;$env[tagsInHistory]]

        ${settingTagsContent('tagsInHistory', 'newTags')}

        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated tags!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$arrayJoin[oldTags;, ]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$arrayJoin[newTags;, ]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomRaresList;
        $jsonLoad[raresList;$env[raresListInHistory]]
        ${listGenerator()}
        $let[old;$arrayJoin[content; ]]

        $arrayLoad[editedRaresList;,;$input[editedRaresList]]
        $arrayForEach[editedRaresList;elem;
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

          $!jsonSet[raresListInHistory;$get[animalID];$get[value]]

          $if[$get[value]<=0;
            $!jsonDelete[raresListInHistory;$get[animalID]]
          ]
        ]
        $jsonLoad[raresList;$env[raresListInHistory]]
        ${listGenerator()}
        $let[new;$arrayJoin[content; ]]

        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated rares list!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[# $get[old]]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[# $get[new]]
        ;$getGlobalVar[luckyColor]]
        $!jsonSet[history;$get[pageIndex];raresList;$env[raresListInHistory]]
      ]
    ]
    
    $!jsonSet[userProfile;1hl;history;$env[history]]
    $setUserVar[userProfile;$env[userProfile]]
    $ephemeral
    $interactionFollowUp
  `
}