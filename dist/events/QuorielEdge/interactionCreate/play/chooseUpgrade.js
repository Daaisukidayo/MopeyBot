"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "play_chooseUpgrade",
    type: "interactionCreate",
    allowed: ["stringSelect", "button", "modal"],
    code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getPlayData]
    $isPlaying[playData]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $let[action;$nullish[$jsonGet[values;0];$jsonGet[IID;1]]]
    $let[tier;$jsonGet[playData;tier]]

    $c[Tiers wrap around: after 17 comes 1]
    $switch[$get[action];
      $case[upgrade;
        $callMethod[playData;updateTier]
        $if[$jsonGet[playData;tier]>17;
          $setField[playData;tier;1]
        ]
      ]
      $case[devUpArrow;
        $setField[playData;tier;$if[$get[tier]>=17;1;$math[$get[tier] + 1]]]
      ]
      $case[devDownArrow;
        $setField[playData;tier;$if[$get[tier]<=1;17;$math[$get[tier] - 1]]]
      ]
      $case[toggleRares;
        $jsonToggle[playData;dev;showAllRares]
      ]
      $case[devTier;
        $c[The tester types the tier in a modal (comes back as devTierModal)]
        $modal[play_chooseUpgrade-devTierModal-$authorID;$tl[ui.play.devTierModalTitle.$get[l]]]
        $addTextInput[tier;$tl[ui.play.devTierModalLabel.$get[l]];Short;true;1-17;$get[tier];1;2]
        $showModal
        $stop
      ]
      $case[devTierModal;
        $let[newTier;$input[tier]]
        $onlyIf[$isNumber[$get[newTier]];$newError[$tl[ui.wardrobe.invalidTier.$get[l]]]]
        $onlyIf[$and[$isInteger[$get[newTier]];$inRange[$get[newTier];1;17]];$newError[$tl[ui.wardrobe.invalidTier.$get[l]]]]
        $c[As a number: a typed tier may have leading zeros]
        $setField[playData;tier;$floor[$get[newTier]]]
      ]
    ]

    $c[A dev tier change starts from the tier's lowest XP]
    $if[$startsWith[$get[action];dev];
      $callMethod[playData;restartTier]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.play.$if[$jsonGet[playData;is_dead];chooseAnimal;chooseUpgrade].$get[l]]]
      $addUpgradeMenu[playData;userWardrobe]
      $addSeparator[Large]
      $addExitButton[playData]
      $addCheats[playData]
    ;$getBiomeColor[playData]]

    $updatePlayData[playData]
    $interactionUpdate
  `,
});
//# sourceMappingURL=chooseUpgrade.js.map