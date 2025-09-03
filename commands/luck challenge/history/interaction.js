import historySorting from "../../../JSfunctions/history/sorting.js"
import historyTimeout from "../../../JSfunctions/history/timeout.js"
import historyEmbed from "../../../JSfunctions/history/embed.js"
import JSON from "../../../JSfunctions/luck challenge/jsonForChallengeAndHistory.js"

export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["button", "modal", "selectMenu"],
  description: "history buttons",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[menuValues;-;$selectMenuValues]
    $arrayLoad[passKeys;,;sortHis,historyPageLeft,historyPageRight,customPage,deleteHistoryPage,historyPageCustom]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    ${JSON()}
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    $let[IID;$env[IID;2]]
    $let[input;$input[historyPage]]
    $let[msg;$messageID]
    $let[page;$default[$env[menuValues;0];$env[IID;0]]]
    $let[sortType;$default[$env[menuValues;1];$env[IID;1]]]

    $if[$arrayIncludes[IID;historyPageCustom];
      $modal[$get[page]-$get[sortType]-customPage-$authorID;Custom page]
      $addTextInput[historyPage;Enter page;Short;true;;;1;5]
      $showModal
      $stop
    ]

    $if[$arrayLength[history]==0;
      $description[# No history]
      $callFunction[embed;lucky]
      $interactionUpdate
      $stop
    ]

    ${historySorting()}

    $switch[$get[IID];
    
      $case[historyPageLeft;
        $letSub[page;1]
        $if[$get[page]<=0;
          $let[page;$arrayLength[history]]
        ]
      ]

      $case[historyPageRight;
        $letSum[page;1]
        $if[$get[page]>$arrayLength[history];
          $let[page;1]
        ]
      ]

      $case[customPage;
        $onlyIf[$isNumber[$get[input]];
          $interactionReply[
            $ephemeral
            $callFunction[embed;error]
            $description[## Argument is not a number!]
          ]
        ]
        $let[page;$get[input]]
        $if[$get[page]>$arrayLength[history];
          $let[page;$arrayLength[history]]
        ]
        $if[$get[page]<=0;
          $let[page;1]
        ]
      ]

      $case[deleteHistoryPage;
        $!arraySplice[history;$math[$get[page] - 1];1]

        $arrayAdvancedSort[history;elem1;elem2;
          $math[$env[elem1;endedAt] - $env[elem2;endedAt]]
        ;history]

        $!jsonSet[userProfile;1hl;history;$env[history]]
        $setUserVar[userProfile;$env[userProfile]]
        
        ${historySorting()}
        
        $if[$get[page]>$arrayLength[history];
          $let[page;$arrayLength[history]]
        ]
      ]
    ]

    ${historyEmbed()}
    $interactionUpdate
    ${historyTimeout()}
  `
}