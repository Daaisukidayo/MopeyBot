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

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying[playData]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $let[action;$nullish[$jsonGet[values;0];$jsonGet[IID;1]]]
    $let[tier;$jsonGet[playData;tier]]

    $c[Tiers wrap around: after 17 comes 1]
    $switch[$get[action];
      $case[upgrade;
        $setNewTier[playData]
        $if[$jsonGet[playData;tier]>17;
          $!jsonSet[playData;tier;1]
        ]
      ]
      $case[devUpArrow;
        $!jsonSet[playData;tier;$if[$get[tier]>=17;1;$math[$get[tier] + 1]]]
      ]
      $case[devDownArrow;
        $!jsonSet[playData;tier;$if[$get[tier]<=1;17;$math[$get[tier] - 1]]]
      ]
      $case[toggleRares;
        $jsonToggle[playData;devShowAllRares]
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
        $!jsonSet[playData;tier;$floor[$get[newTier]]]
      ]
    ]

    $c[A dev tier change starts from the tier's lowest XP]
    $if[$startsWith[$get[action];dev];
      $!jsonSet[playData;XP;$jsonGet[$getGlobalVar[xpPerTier];$jsonGet[playData;tier];0]]
      $resetArenaData[playData]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.play.$if[$jsonGet[playData;isDead];chooseAnimal;chooseUpgrade].$get[l]]]
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