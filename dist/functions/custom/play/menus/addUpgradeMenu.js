"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addUpgradeMenu",
    description: "adds the upgrade menu",
    params: [
        {
            name: "playDataVar",
            description: "var w/ the play data",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "wardrobeVar",
            description: "var w/ the user's wardrobe",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[wardrobe;$env[wardrobeVar]]
    $if[$env[$env[playDataVar]]==;$return]
    $ref[playData;$env[playDataVar]]
    $c[testers can turn luck off and see every animal + rare of the tier]
    $let[allRares;$and[$jsonGet[userProfile;tester];$jsonGet[playData;dev;showAllRares]]]

    $getCache[animals;tierAnimals;tierAnimals]
    $jsonLoad[raresButtonStyle;$getGlobalVar[raresButtonStyle]]
    $jsonLoad[allRareAttemptsInfo;$getUserVar[allRareAttemptsInfo]]

    $c[sessions from before weighted pools still have the old ones ('common' + summed rarities), rebuild them]
    $if[$arraySome[$jsonEntries[allRareAttemptsInfo];e;$jsonHas[e;1;common]];
      $jsonLoad[allRareAttemptsInfo;$generateLuck[$getGlobalVar[playRaritiesKey]]]
      $setUserVar[allRareAttemptsInfo;$env[allRareAttemptsInfo]]
    ]

    $c[luck groups roll common vs rare by weight, rares outside a group get skipped, so KD only shows up via BD's roll]
    $arrayMap[$jsonGet[tierAnimals;$jsonGet[playData;tier];allAnimals];animalId;
      $if[$get[allRares];$return[$env[animalId]]]
      $if[$jsonHas[allRareAttemptsInfo;$env[animalId]];
        $jsonLoad[rolled;$arrayWeightedRandom[$jsonGet[allRareAttemptsInfo;$env[animalId];pool];weight]]
        $let[chosenAnimal;$jsonGet[rolled;id]]

        $c[null roll hides the button, same for shop animals w/o the locked pack]
        $let[hidden;$or[$isOneOf[$get[chosenAnimal];null;];$and[$includes[$get[chosenAnimal];shop];$arrayIncludes[$jsonGet[userProfile;user_packs];lockedSP]==false]]]
        $if[$get[hidden]==false;$return[$get[chosenAnimal]]]
      ;
        $if[$getAnimalInfo[$env[animalId];isRare]!=true;$return[$env[animalId]]]
      ]
    ;shownAnimals]

    $c[5 per row]
    $arrayForEach[shownAnimals;animalId;
      $let[buttonIndex;$arrayFindIndex[raresButtonStyle;arr;$arrayIncludes[$jsonGet[arr;1];$env[animalId]]]]
      $let[butStyle;$if[$get[buttonIndex]==-1;Secondary;$jsonGet[raresButtonStyle;$get[buttonIndex];0]]]

      $let[wr;$default[$jsonGet[wardrobe;$env[animalId]];0]]
      $let[emoji;$getAnimalInfo[$env[animalId];emoji;$get[wr]]]
      $let[animalName;$getAnimalInfo[$env[animalId];name;$get[wr]]]

      $if[$math[$env[i] % 5]==0;$addActionRow]
      $addButton[play_upgradeAnimal-$env[animalId]-$playID[playData];$get[animalName];$get[butStyle];$get[emoji]]
    ;i]

  `,
});
//# sourceMappingURL=addUpgradeMenu.js.map