import historySorting from "../../../../JSfunctions/history/sorting.js"
import settingTagsContent from "../../../../JSfunctions/lobby/settingTagsContent.js"

// After choosing editing option

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;historyChooseEdit]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    $let[option;$selectMenuValues]
    $let[page;$env[IID;0]]
    $let[sortType;$env[IID;1]]
    $let[pageIndex;$math[$get[page] - 1]]

    $timezone[$env[userProfile;timezone]]

    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[allLobbyTagsContent;$getGlobalVar[allLobbyTagsContent]]
    $jsonLoad[allLobbyTags;$getGlobalVar[tags]]

    ${historySorting()}

    $jsonLoad[tagsInHistory;$env[history;$get[pageIndex];tags]]
    $jsonLoad[raresListInHistory;$env[history;$get[pageIndex];raresList]]
    $let[pointsInHistory;$env[history;$get[pageIndex];points]]
    $let[rareInHistory;$env[history;$get[pageIndex];rares]]
    $let[endingDateInHistory;$env[history;$get[pageIndex];endedAt]]
    $let[difficultyInHistory;$env[history;$get[pageIndex];difficulty]]
    $let[playTypeInHistory;$env[history;$get[pageIndex];playType]]

    $switch[$get[option];

      $case[points;
        $modal[$get[page]-$get[sortType]-editHistoryCustomPoints-$authorID;Editing Points]
        $addTextInput[editedPoints;Edit your points;Short;true;Current: $get[pointsInHistory];;1;3]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

      $case[raresQuantity;
        $modal[$get[page]-$get[sortType]-editHistoryCustomRares-$authorID;Editing Rares Quantity]
        $addTextInput[editedRaresQuantity;Edit your rares quantity;Short;true;Current: $get[rareInHistory];;1;3]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

      $case[playType;
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[$get[page]-$get[sortType]-editHistoryCustomPlayType-$authorID;Choose play type]
          $addOption[Party;;party]
          $addOption[Solo;;solo]
          $addTextDisplay[-# Current: $toTitleCase[$get[playTypeInHistory]]]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[difficulty;
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[$get[page]-$get[sortType]-editHistoryCustomDifficulty-$authorID;Choose difficulty]
          $addOption[None;;none]
          $arrayForEach[difficulties;dif;
            $addOption[$toTitleCase[$env[dif]];;$env[dif]]
          ]
          $addTextDisplay[-# Current: $toTitleCase[$get[difficultyInHistory]]]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[endedAt;
        $modal[$get[page]-$get[sortType]-editHistoryCustomEndedAt-$authorID;Editing Ending Date]
        $addTextInput[editedEndedAt;Edit your ending date;Paragraph;true;Current: $parseDate[$get[endingDateInHistory];Locale] (Use it as an example)]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

      $case[tags;
        ${settingTagsContent('tagsInHistory', 'tagsContent')}

        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[$get[page]-$get[sortType]-editHistoryCustomTags-$authorID;Choose Tags]
          $arrayForEach[allLobbyTags;tag;
            $addOption[$env[allLobbyTagsContent;$env[tag]];(Toggle);$env[tag]]
          ]
          $addTextDisplay[-# Current: $arrayJoin[tagsContent;, ]]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[raresList;
        $modal[$get[page]-$get[sortType]-editHistoryCustomRaresList-$authorID;Editing Rares List]
        $addTextInput[editedRaresList;Edit your rares list;Paragraph;true;Use the following format:\n<rareShortName1>=<newAmount1>,<rareShortName2>=<newAmount2>]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

    ]
    $interactionUpdate
  `
}