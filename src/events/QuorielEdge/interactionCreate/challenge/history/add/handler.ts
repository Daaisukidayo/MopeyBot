export default {
  name: "addHistory",
  type: "interactionCreate",
  allowed: ['stringSelect', 'modal', 'button'],
  description: "Handles adding new history, selecting options, resetting, canceling, and uploading.",
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[addhistory;true]
    $timezone[$env[userProfile;timezone]]

    $let[value;$selectMenuValues]
    $let[input;$input[addHistoryModalInput]]

    $if[$getUserVar[addHistorySavedConfig]==;
      $addHistoryNewConfig
    ]
    $jsonLoad[addHistorySavedConfig;$getUserVar[addHistorySavedConfig]]

    $switch[$env[IID;1];

      $case[editOptions;
        $switch[$get[value];

          $case[points;
            $modal[addHistory-customPoints-$authorID;$tl[ui.history.modalTitlePoints.$get[l]]]
            $addTextInput[addHistoryModalInput;$tl[ui.history.modalDescriptionPoints.$get[l]];Short;true;$tl[ui.history.modalPlaceholderPoints.$get[l];$env[addHistorySavedConfig;points]];$env[addHistorySavedConfig;points];1;4]
            $showModal
            $stop
          ]

          $case[raresQuantity;
            $modal[addHistory-customRares-$authorID;$tl[ui.history.modalTitleRares.$get[l]]]
            $addTextInput[addHistoryModalInput;$tl[ui.history.modalDescriptionRares.$get[l]];Short;true;$tl[ui.history.modalPlaceholderRares.$get[l];$env[addHistorySavedConfig;rares]];;1;3]
            $showModal
            $stop
          ]

          $case[playType;
            $historyEmbed[$env[addHistorySavedConfig]]
            $addContainer[
              $addActionRow
              $addStringSelectMenu[addHistory-customPlayType-$authorID;$tl[ui.history.menuTitlePlayType.$get[l]]]
              $arrayForEach[$getGlobalVar[playTypes];type;
                $addOption[$tl[data.playTypes.$env[type].$get[l]];;$env[type]]
              ]
            ;$getGlobalVar[luckyColor]]
            $interactionUpdate
            $stop
          ]

          $case[difficulty;
            $historyEmbed[$env[addHistorySavedConfig]]
            $addContainer[
              $addActionRow
              $addStringSelectMenu[addHistory-customDifficulty-$authorID;$tl[ui.history.menuTitleDifficulty.$get[l]]]
              $arrayForEach[$getGlobalVar[difficulties];dif;
                $addOption[$tl[data.difficulties.$env[dif].$get[l]];;$env[dif]]
              ]
            ;$getGlobalVar[luckyColor]]
            $interactionUpdate
            $stop
          ]

          $case[endDate;
            $modal[addHistory-customEndDate-$authorID;$tl[ui.history.modalTitleEndDate.$get[l]]]
            $addTextInput[addHistoryModalInput;$tl[ui.history.modalDescriptionEndDate.$get[l]];Paragraph;true;$tl[ui.history.modalPlaceholderEndDate.$get[l]]]
            $showModal
            $stop
          ]

          $case[raresList;
            $jsonLoad[allRareAbbreviations;$getGlobalVar[allRareAbbreviations]]
            $arrayMap[$jsonEntries[$env[addHistorySavedConfig;raresList]];entry;
              $return[$env[allRareAbbreviations;$env[entry;0];0] = $env[entry;1]]
            ;unresolved]
            $modal[addHistory-customRaresList-$authorID;$tl[ui.history.modalTitleList.$get[l]]]
            $addTextInput[addHistoryModalInput;$tl[ui.history.modalDescriptionList.$get[l]];Paragraph;true;$tl[ui.history.modalPlaceholderList.$get[l]];$arrayJoin[unresolved;\n]]
            $showModal
            $stop
          ]
        ]
      ]

      $case[customPoints;
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[ui.history.listOptionInvalidPoints.$get[l]]]
        ]
        $!jsonSet[addHistorySavedConfig;points;$get[input]]
      ]

      $case[customRares;
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[ui.history.listOptionInvalidRares.$get[l]]]
        ]
        $!jsonSet[addHistorySavedConfig;rares;$get[input]]
      ]

      $case[customPlayType;
        $!jsonSet[addHistorySavedConfig;playType;$get[value]]
      ]

      $case[customDifficulty;
        $!jsonSet[addHistorySavedConfig;difficulty;$get[value]]
      ]

      $case[customEndDate;
        $let[date;$unparseDate[$get[input]]]

        $onlyIf[$and[$get[date]>0;$get[date]<$getTimestamp];
          $newError[$tl[ui.history.listOptionInvalidDate.$get[l]]]
        ]

        $!jsonSet[addHistorySavedConfig;endDate;"$get[date]"]
      ]

      $case[customRaresList;
        $arrayLoad[addedRaresList;\n;$trim[$trimLines[$get[input]]]]

        $arrayForEach[addedRaresList;elem;
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
            $!jsonSet[addHistorySavedConfig;raresList;$get[animalId];$get[value]]
          ;
            $!jsonDelete[addHistorySavedConfig;raresList;$get[animalId]]
          ]
        ]

        $jsonLoad[res;$generateList[$sortList[$env[addHistorySavedConfig;raresList]]]]
        $!jsonSet[addHistorySavedConfig;points;$env[res;p]]
        $!jsonSet[addHistorySavedConfig;rares;$env[res;r]]
      ]

      $case[resetNewHistoryPage;
        $addHistoryNewConfig
        $jsonLoad[addHistorySavedConfig;$getUserVar[addHistorySavedConfig]]
      ]

      $case[cancelNewHistoryPage;
        $deleteCooldown[addhistory-$authorID]
        $deleteUserVar[addHistorySavedConfig]

        $addContainer[
          $addAuthorDisplay
          $addTextDisplay[$tl[ui.addhistory.cancelNewHistoryPageTitle.$get[l]]]
        ;$getGlobalVar[luckyColor]]
        $interactionUpdate
        $!stopCommandTimeout[addhistory]
        $stop
      ]

      $case[uploadNewHistoryPage;
        $deleteCooldown[addhistory-$authorID]

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
          $addTextDisplay[$tl[ui.addhistory.addedHistory.$get[l]]]
        ;$getGlobalVar[luckyColor]]
        $interactionUpdate

        $!stopCommandTimeout[addhistory]
        $stop
      ]

      $case[default;
        $stop
      ]
    ]

    $setUserVar[addHistorySavedConfig;$env[addHistorySavedConfig]]
    $historyEmbed[$env[addHistorySavedConfig]]
    $addHistoryExtraEmbed
    $interactionUpdate
    $newCommandTimeout[addhistory]
  `
}