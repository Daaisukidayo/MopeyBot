"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addUpgradeMenu",
    description: "Adds upgrade menu for a player's play session",
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "wardrobeVar",
            description: "The name of the variable that holds the user's wardrobe.",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[wardrobe;$env[wardrobeVar]]
    $if[$env[$env[playDataVar]]==;$return]
    $ref[playData;$env[playDataVar]]
    $c[A tester can switch luck off: every animal and rare of the tier is shown]
    $let[allRares;$and[$jsonGet[userProfile;testerMode];$jsonGet[playData;devShowAllRares]]]

    $getCache[animals;tierAnimals;tierAnimals]
    $jsonLoad[raresButtonStyle;$getGlobalVar[raresButtonStyle]]
    $jsonLoad[allRareAttemptsInfo;$getUserVar[allRareAttemptsInfo]]

    $c[A session started before the pools got weights still holds the old pools ("common" and summed rarities): they are made again]
    $if[$arraySome[$jsonEntries[allRareAttemptsInfo];e;$jsonHas[e;1;common]];
      $jsonLoad[allRareAttemptsInfo;$generateLuck[$getGlobalVar[playRaritiesKey]]]
      $setUserVar[allRareAttemptsInfo;$env[allRareAttemptsInfo]]
    ]

    $c[Every animal of the tier but the king dragon. A luck group rolls its common animal or a rare by weight, a rare outside the groups is left out]
    $arrayMap[$arrayFilter[$jsonGet[tierAnimals;$jsonGet[playData;tier];allAnimals];id;$env[id]!=king_dragon];animalId;
      $if[$get[allRares];$return[$env[animalId]]]
      $if[$jsonHas[allRareAttemptsInfo;$env[animalId]];
        $jsonLoad[rolled;$arrayWeightedRandom[$jsonGet[allRareAttemptsInfo;$env[animalId];pool];weight]]
        $let[chosenAnimal;$jsonGet[rolled;id]]

        $c[Nothing rolled (null) hides the button, and so does a shop animal without the locked pack]
        $let[hidden;$or[$isOneOf[$get[chosenAnimal];null;];$and[$includes[$get[chosenAnimal];shop];$arrayIncludes[$jsonGet[userProfile;userPacks];lockedSP]==false]]]
        $if[$get[hidden]==false;$return[$get[chosenAnimal]]]
      ;
        $if[$getAnimalInfo[$env[animalId];isRare]!=true;$return[$env[animalId]]]
      ]
    ;shownAnimals]

    $c[Five buttons in a row]
    $arrayForEach[shownAnimals;animalId;
      $let[buttonIndex;$arrayFindIndex[raresButtonStyle;arr;$arrayIncludes[$jsonGet[arr;1];$env[animalId]]]]
      $let[butStyle;$if[$get[buttonIndex]==-1;Secondary;$jsonGet[raresButtonStyle;$get[buttonIndex];0]]]

      $let[wr;$default[$jsonGet[wardrobe;$env[animalId]];0]]
      $let[emoji;$getAnimalInfo[$env[animalId];emoji;$get[wr]]]
      $let[animalName;$getAnimalInfo[$env[animalId];name;$get[wr]]]

      $if[$math[$env[i] % 5]==0;$addActionRow]
      $addButton[play_upgradeAnimal-$env[animalId]-$authorID;$get[animalName];$get[butStyle];$get[emoji]]
    ;i]

  `,
});
//# sourceMappingURL=addUpgradeMenu.js.map