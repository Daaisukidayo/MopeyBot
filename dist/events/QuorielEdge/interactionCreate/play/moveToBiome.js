"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "play_moveToBiome",
    type: "interactionCreate",
    allowed: ["stringSelect"],
    code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying[playData]
    
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $let[biome;$selectMenuValues]

    $!jsonSet[playData;currentBiome;$get[biome]]

    $let[color;$getBiomeColor[playData;$get[biome]]]

    $c[Moving with a soccer in hands counts as holding it]
    $let[heldSoccer;$jsonGet[playData;heldSoccer]]
    $if[$get[heldSoccer]!=;
      $arrayLoad[soccerData;_;$get[heldSoccer]]
      $jsonLoad[holdResult;$holdSoccer[playData;$jsonGet[soccerData;0];$jsonGet[soccerData;1]]]
      $if[$jsonGet[holdResult;outcome]!=held;
        $let[color;$getGlobalVar[errorColor]]
      ]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.play.movedTo.$get[l];$tl[data.biomes.$get[biome].$get[l]]]]
      $if[$get[heldSoccer]!=;
        $addSoccerHoldResult[playData;userWardrobe;$jsonGet[soccerData;0];$jsonGet[soccerData;1];held;$env[holdResult]]
      ;
        $addSeparator[Large]
        $displayAnimalStats[playData;userWardrobe]
        $addActionsMenu[playData]
      ]
      $addSeparator
      $addExitButton[playData]
      $addCheats[playData]
    ;$get[color]]
    $updatePlayData[playData]
    $interactionUpdate
  `
});
//# sourceMappingURL=moveToBiome.js.map