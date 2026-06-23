export default {
  name: "editHistory",
  type: "interactionCreate",
  allowed: ['stringSelect', 'modal', 'button'],
  description: "Displays embedded message after user made or is making any change.",
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[showhistory;true]
    $timezone[$env[userProfile;timezone]]

    $let[input;$input[editHistoryOptionInput]]
    $let[value;$selectMenuValues]

    $jsonLoad[thisHistory;$getMessageVar[cachedThisHistory;$messageID]]
    $jsonLoad[cachedHistory;$getMessageVar[cachedHistory;$messageID]]
    $jsonLoad[history;$env[cachedHistory;history]]

    $switch[$env[IID;1];

      $case[editPoints;
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[ui.history.listOptionInvalidPoints.$get[l]]]
        ]
        $!jsonSet[thisHistory;points;$get[input]]
      ]


      $case[editRares;
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[ui.history.listOptionInvalidRares.$get[l]]]
        ]
        $!jsonSet[thisHistory;rares;$get[input]]
      ]


      $case[editPlayType;
        $!jsonSet[thisHistory;playType;$get[value]]
      ]


      $case[editDifficulty;
        $!jsonSet[thisHistory;difficulty;$get[value]]
      ]


      $case[editEndDate;
        $let[date;$unparseDate[$get[input]]]

        $onlyIf[$and[$get[date]>0;$get[date]<$getTimestamp];
          $newError[$tl[ui.history.listOptionInvalidDate.$get[l]]]
        ]

        $!jsonSet[thisHistory;endDate;"$get[date]"]
      ]


      $case[editRaresList;
        $arrayLoad[editedRaresList;\n;$trim[$trimLines[$get[input]]]]

        $arrayForEach[editedRaresList;elem;
          $arrayLoad[keyValue;=;$trim[$env[elem]]]
          $let[animalId;$getRareAnimalID[$trim[$env[keyValue;0]]]]
          $let[value;$trim[$env[keyValue;1]]]

          $onlyIf[$get[animalId]!=undefined;
            $newError[$tl[ui.history.listOptionUnknownRare.$get[l];$env[keyValue;0];$env[elem]]]
          ]

          $onlyIf[$isNumber[$get[value]];
            $newError[$tl[ui.history.listOptionInvalidValue.$get[l];$get[value];$env[elem]]]
          ]

          $if[$get[value]>100;
            $let[value;100]
          ]
          
          $if[$get[value]>0;
            $!jsonSet[thisHistory;raresList;$get[animalId];$get[value]]
          ;
            $!jsonDelete[thisHistory;raresList;$get[animalId]]
          ]
        ]
      ]

      $case[resetEditChanges;
        $jsonLoad[thisHistory;$env[history;$math[$env[cachedHistory;page] - 1]]]
      ]

      $case[selectEditOption;
        $historyEmbed[$env[thisHistory]]

        $switch[$get[value];
          $case[points;
            $editHistoryExtraEmbed
            $modal[editHistory-editPoints-$authorID;$tl[ui.history.modalTitlePoints.$get[l]]]
            $addTextInput[editHistoryOptionInput;$tl[ui.history.modalDescriptionPoints.$get[l]];Short;true;$tl[ui.history.modalPlaceholderPoints.$get[l];$env[thisHistory;points]];;1;5]
            $showModal
          ]

          $case[raresQuantity;
            $editHistoryExtraEmbed
            $modal[editHistory-editRares-$authorID;$tl[ui.history.modalTitleRares.$get[l]]]
            $addTextInput[editHistoryOptionInput;$tl[ui.history.modalDescriptionRares.$get[l]];Short;true;$tl[ui.history.modalPlaceholderRares.$get[l];$env[thisHistory;rares]];;1;3]
            $showModal
          ]

          $case[playType;
            $addContainer[
              $addActionRow
              $addStringSelectMenu[editHistory-editPlayType-$authorID;$tl[ui.history.menuTitlePlayType.$get[l]]]
              $arrayForEach[$getGlobalVar[playTypes];type;
                $addOption[$tl[dataplayTypes.$env[type].$get[l]];;$env[type];;$checkCondition[$env[thisHistory;playType]==$env[type]]]
              ]
            ;$getGlobalVar[luckyColor]]
          ]

          $case[difficulty;
            $addContainer[
              $addActionRow
              $addStringSelectMenu[editHistory-editDifficulty-$authorID;$tl[ui.history.menuTitleDifficulty.$get[l]]]
              $arrayForEach[$getGlobalVar[difficulties];dif;
                $addOption[$tl[datadifficulties.$env[dif].$get[l]];;$env[dif];;$checkCondition[$env[thisHistory;difficulty]==$env[dif]]]
              ]
            ;$getGlobalVar[luckyColor]]
          ]

          $case[endDate;
            $editHistoryExtraEmbed
            $modal[editHistory-editEndDate-$authorID;$tl[ui.history.modalTitleEndDate.$get[l]]]
            $addTextInput[editHistoryOptionInput;$tl[ui.history.modalDescriptionEndDate.$get[l]];Paragraph;true;$tl[ui.history.modalPlaceholderEndDate.$get[l]]]
            $showModal
          ]

          $case[raresList;
            $jsonLoad[allRareAbbreviations;$getGlobalVar[allRareAbbreviations]]
            $arrayMap[$jsonEntries[$sortList[$env[thisHistory;raresList]]];entry;
              $return[$env[allRareAbbreviations;$env[entry;0];0] = $env[entry;1]]
            ;unresolved]

            $editHistoryExtraEmbed
            $modal[editHistory-editRaresList-$authorID;$tl[ui.history.modalTitleList.$get[l]]]
            $addTextInput[editHistoryOptionInput;$tl[ui.history.modalDescriptionList.$get[l]];Paragraph;true;$tl[ui.history.modalPlaceholderList.$get[l]];$arrayJoin[unresolved;\n]]
            $showModal
          ]
        ]

        $interactionUpdate
        $newHistoryTimeout
        $stop
      ]

      $case[default;
        $stop
      ]
    ]

    $setMessageVar[cachedThisHistory;$env[thisHistory];$messageID]

    $historyEmbed[$env[thisHistory]]
    $editHistoryExtraEmbed
    $interactionUpdate

    $newHistoryTimeout
  `
}