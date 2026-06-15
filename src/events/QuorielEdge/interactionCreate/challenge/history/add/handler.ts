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
            $modal[addHistory-customPoints-$authorID;$tl[$get[l];ui;history.modalTitlePoints]]
            $addTextInput[addHistoryModalInput;$tl[$get[l];ui;history.modalDescriptionPoints];Short;true;$tl[$get[l];ui;history.modalPlaceholderPoints;$env[addHistorySavedConfig;points]];$env[addHistorySavedConfig;points];1;4]
            $showModal
            $stop
          ]

          $case[raresQuantity;
            $modal[addHistory-customRares-$authorID;$tl[$get[l];ui;history.modalTitleRares]]
            $addTextInput[addHistoryModalInput;$tl[$get[l];ui;history.modalDescriptionRares];Short;true;$tl[$get[l];ui;history.modalPlaceholderRares;$env[addHistorySavedConfig;rares]];;1;3]
            $showModal
            $stop
          ]

          $case[playType;
            $historyEmbed[$env[addHistorySavedConfig]]
            $addContainer[
              $addActionRow
              $addStringSelectMenu[addHistory-customPlayType-$authorID;$tl[$get[l];ui;history.menuTitlePlayType]]
              $arrayForEach[$getGlobalVar[playTypes];type;
                $addOption[$tl[$get[l];data;playTypes.$env[type]];;$env[type]]
              ]
            ;$getGlobalVar[luckyColor]]
            $interactionUpdate
            $stop
          ]

          $case[difficulty;
            $historyEmbed[$env[addHistorySavedConfig]]
            $addContainer[
              $addActionRow
              $addStringSelectMenu[addHistory-customDifficulty-$authorID;$tl[$get[l];ui;history.menuTitleDifficulty]]
              $arrayForEach[$getGlobalVar[difficulties];dif;
                $addOption[$tl[$get[l];data;difficulties.$env[dif]];;$env[dif]]
              ]
            ;$getGlobalVar[luckyColor]]
            $interactionUpdate
            $stop
          ]

          $case[endDate;
            $modal[addHistory-customEndDate-$authorID;$tl[$get[l];ui;history.modalTitleEndDate]]
            $addTextInput[addHistoryModalInput;$tl[$get[l];ui;history.modalDescriptionEndDate];Paragraph;true;$tl[$get[l];ui;history.modalPlaceholderEndDate]]
            $showModal
            $stop
          ]

          $case[raresList;
            $jsonLoad[allRareAbbreviations;$getGlobalVar[allRareAbbreviations]]
            $arrayMap[$jsonEntries[$env[addHistorySavedConfig;raresList]];entry;
              $return[$env[allRareAbbreviations;$env[entry;0];0] = $env[entry;1]]
            ;unresolved]
            $modal[addHistory-customRaresList-$authorID;$tl[$get[l];ui;history.modalTitleList]]
            $addTextInput[addHistoryModalInput;$tl[$get[l];ui;history.modalDescriptionList];Paragraph;true;$tl[$get[l];ui;history.modalPlaceholderList];$arrayJoin[unresolved;\n]]
            $showModal
            $stop
          ]
        ]
      ]

      $case[customPoints;
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[$get[l];ui;history.listOptionInvalidPoints]]
        ]
        $!jsonSet[addHistorySavedConfig;points;$get[input]]
      ]

      $case[customRares;
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[$get[l];ui;history.listOptionInvalidRares]]
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
          $newError[$tl[$get[l];ui;history.listOptionInvalidDate]]
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
            $newError[$tl[$get[l];ui;history.listOptionUnknownRare;$env[keyValue;0];$env[elem]]]
          ]

          $onlyIf[$isNumber[$get[value]];
            $newError[$tl[$get[l];ui;history.listOptionInvalidValue;$get[value];$env[elem]]]
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
          $addTextDisplay[$tl[$get[l];ui;addhistory.cancelNewHistoryPageTitle]]
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
          $addTextDisplay[$tl[$get[l];ui;addhistory.addedHistory]]
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