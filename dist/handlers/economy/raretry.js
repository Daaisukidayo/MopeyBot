"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleRaretry",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile

    $let[rtMode;$pickLocalizedOption[data.raretryModes;$nullish[$option[mode];$message[0];$jsonGet[userProfile;raretry_mode]];$getGlobalVar[raretryModes];ui.raretry.unknownMode]]

    $addCooldown
    $defer

    $jsonLoad[rarities;$getGlobalVar[raretryRarities]]
    $jsonLoad[rewards;$getGlobalVar[raretryRewards]]
    $jsonLoad[categories;$getGlobalVar[raretryCategories]]
    $getCache[rares;raretryGroups;rareGroups]
    $let[li;$math[$jsonSize[rareGroups] - 1]]
    $let[multiplier;$jsonGet[$getGlobalVar[raretryMultipliers];$get[rtMode]]]
    $let[modeLine;$tl[ui.raretry.mode.$get[l];$tl[data.raretryModes.$get[rtMode].$get[l]]]]

    $c[devs can force a category by index]
    $let[arg;$message[1]]
    $let[targetID;$if[$and[$isNumber[$get[arg]];$isDev;$get[arg]>-1;$get[arg]<=$get[li]];$get[arg];-1]]

    $fn[embed;
      $addContainer[
        $addAuthorDisplay

        $if[$get[image]!=;
          $addSection[
            $addTextDisplay[$get[desc]]
            $addThumbnail[$get[image]]
          ]
        ;
          $addTextDisplay[$get[desc]]
        ]

        $addSeparator[Large]
        $addTextDisplay[$get[footer]]
      ;$get[color]]
    ]

    $let[caughtCount;0]
    $arrayLoad[caught]
    $let[totalMC;0]

    $c[rarest category first so the best catch shows on top. everyone except a dev w/ a target rolls 1/chance]
    $arrayForEach[$arrayRange[$get[li];0;-1];i;
      $let[rtIndex;$math[$env[i] + $get[rtMode]]]
      $let[baseChance;$jsonGet[rarities;$get[rtIndex]]]

      $if[$or[$env[i]==$get[targetID];$and[$get[targetID]==-1;$random[1;$get[baseChance]]==1]];
        $letSum[caughtCount;1]

        $let[animalId;$arraySample[$jsonGet[rareGroups;$env[i]]]]
        $let[image;$animalImage[$get[animalId]]]
        $let[color;$jsonGet[categories;$env[i];color]]
        $let[desc;$tl[ui.raretry.gotRares.$get[l];$getAnimalInfo[$get[animalId];name;0]]]

        $arrayPushJSON[caught;$objectOf[id;$get[animalId];chance;$get[baseChance]]]

        $c[some modes pay 0]
        $let[MC;$math[$jsonGet[rewards;$get[rtIndex]] * $get[multiplier]]]
        $letSum[totalMC;$get[MC]]
        $if[$get[MC]!=0;
          $let[desc;$get[desc]\n$tl[ui.raretry.earned.$get[l];$separate[$get[MC]]]]
          $callMethod[userProfile;addCoins;$get[MC]]
        ]

        $let[footer;$tl[ui.raretry.rarity.$get[l];1;$separate[$get[baseChance]]]\n$tl[ui.raretry.category.$get[l];$tl[data.raretryCategories.$jsonGet[categories;$env[i];id].$get[l]]]\n$get[modeLine]]
        $callFn[embed]
      ]
    ]

    $c[log to history/stats unless a dev forced the category, recordDevRolls turns that off for testing]
    $if[$or[$get[targetID]==-1;$getGlobalVar[recordDevRolls]];
      $recordRoll[raretry;$objectOf[at;$getTimestamp;mode;$get[rtMode];rares;$env[caught];mope_coins;$get[totalMC]]]
    ]

    $c[count catches for the daily quest till it's done]
    $if[$get[caughtCount]>0;
      $countDailyRares[raretry;$get[caughtCount]]
      $callMethod[userProfile;save]
    ;
      $let[color;$getGlobalVar[errorColor]]
      $let[desc;$tl[ui.raretry.nothing.$get[l]]]
      $let[footer;$get[modeLine]]
      $callFn[embed]
    ]
  `,
});
//# sourceMappingURL=raretry.js.map