// Embed with editing options that are gonna be added to history

import settingTagsContent from "../../../../JSfunctions/lobby/settingTagsContent.js";

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;historyChooseAdd]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    $let[option;$selectMenuValues]
    $timezone[$env[userProfile;timezone]]
    
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[allLobbyTagsContent;$getGlobalVar[allLobbyTagsContent]]
    $jsonLoad[allLobbyTags;$getGlobalVar[tags]]

    $jsonLoad[savedNewHistoryConfig;$getUserVar[savedNewHistoryConfig]]
    $jsonLoad[raresList;$env[savedNewHistoryConfig;raresList]]
    $jsonLoad[tags;$env[savedNewHistoryConfig;tags]]
    $let[points;$env[savedNewHistoryConfig;points]]
    $let[rares;$env[savedNewHistoryConfig;rares]]
    $let[endingDate;$env[savedNewHistoryConfig;endedAt]]
    $let[difficulty;$env[savedNewHistoryConfig;difficulty]]
    $let[playType;$env[savedNewHistoryConfig;playType]]

    $switch[$get[option];

      $case[points;
        $modal[addHistoryCustomPoints-$authorID;Editing Points]
        $addTextInput[addedPoints;Edit your points;Short;true;Current: $get[points];;1;3]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

      $case[raresQuantity;
        $modal[addHistoryCustomRares-$authorID;Editing Rares Quantity]
        $addTextInput[addedRaresQuantity;Edit your rares quantity;Short;true;Current: $get[rares];;1;3]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

      $case[playType;
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[addHistoryCustomPlayType-$authorID;Choose play type]
          $addOption[Party;;party]
          $addOption[Solo;;solo]
          $addTextDisplay[-# Current: $toTitleCase[$get[playType]]]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[difficulty;
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[addHistoryCustomDifficulty-$authorID;Choose difficulty]
          $addOption[None;;none]
          $arrayForEach[difficulties;dif;
            $addOption[$toTitleCase[$env[dif]];;$env[dif]]
          ]
          $addTextDisplay[-# Current: $toTitleCase[$get[difficulty]]]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[endedAt;
        $modal[addHistoryCustomEndedAt-$authorID;Editing Ending Date]
        $addTextInput[addedEndedAt;Edit your ending date;Paragraph;true;MM/DD/YYYY, HH:MM:SS AM/PM]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

      $case[tags;
        ${settingTagsContent('tags', 'tagsContent')}

        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[addHistoryCustomTags-$authorID;Choose Tags]
          $arrayForEach[allLobbyTags;tag;
            $addOption[$env[allLobbyTagsContent;$env[tag]];(Toggle);$env[tag]]
          ]
          $addTextDisplay[-# Current: $arrayJoin[tagsContent;, ]]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[raresList;
        $modal[addHistoryCustomRaresList-$authorID;Editing Rares List]
        $addTextInput[addedRaresList;Edit your rares list;Paragraph;true;Use the following format:\n<rareShortName1>=<newAmount1>,<rareShortName2>=<newAmount2>]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

    ]
    $interactionUpdate
  `
}