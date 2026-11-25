import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
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
    $let[modeName;$tl[data.raretryModes.$get[rtMode].$get[l]]]

    $c[devs can force a category by index]
    $let[arg;$message[1]]
    $let[targetID;$if[$and[$isNumber[$get[arg]];$isDev;$get[arg]>-1;$get[arg]<=$get[li]];$get[arg];-1]]

    $fn[embed;
      $addContainer[
        $addAuthorDisplay
        $c[a catch has everything on its card]
        $if[$get[image]!=;
          $addMediaGallery[$addMediaItem[$get[image];$get[alt]]]
        ;
          $addTextDisplay[$tl[ui.raretry.nothing.$get[l]]]
          $addSeparator[Large]
          $addTextDisplay[$tl[ui.raretry.mode.$get[l];$get[modeName]]]
        ]
      ;$get[color]]
    ]

    $let[caughtCount;0]
    $arrayLoad[caught]
    $let[totalMC;0]

    $c[rarest category first so the best catch shows on top. everyone except a dev with a target rolls 1/chance]
    $arrayForEach[$arrayRange[$get[li];0;-1];i;
      $let[rtIndex;$math[$env[i] + $get[rtMode]]]
      $let[baseChance;$jsonGet[rarities;$get[rtIndex]]]

      $if[$or[$env[i]==$get[targetID];$and[$get[targetID]==-1;$random[1;$get[baseChance]]==1]];
        $letSum[caughtCount;1]

        $let[animalId;$arraySample[$jsonGet[rareGroups;$env[i]]]]
        $let[color;$jsonGet[categories;$env[i];color]]
        $let[category;$tl[data.raretryCategories.$jsonGet[categories;$env[i];id].$get[l]]]
        $arrayPushJSON[caught;$objectOf[id;$get[animalId];chance;$get[baseChance]]]

        $c[some modes pay 0. x1.25 and x1.75 give fractions that separate crashes on]
        $let[MC;$round[$math[$jsonGet[rewards;$get[rtIndex]] * $get[multiplier]]]]
        $letSum[totalMC;$get[MC]]
        $if[$get[MC]!=0;$callMethod[userProfile;addCoins;$get[MC]]]

        $c[modes take category colors in order: default = common, extreme = legendary, impossible = mythic]
        $let[image;$raretryCard[$get[animalId];1/$separate[$get[baseChance]] · $get[category];$get[MC];$get[modeName];$jsonGet[categories;$get[rtMode];color];$get[color];$env[i]]]
        $c[the card's text for screen readers, plain numbers read better than the separator]
        $let[alt;$getAnimalInfo[$get[animalId];name;0] · 1/$get[baseChance] · $get[category]]
        $if[$get[MC]!=0;$let[alt;$get[alt] · $tl[data.leaderboardTypes.mc.$get[l]]: $get[MC]]]
        $let[alt;$get[alt] · $get[modeName]]
        $callFn[embed]
      ]
    ]

    $c[dev-forced rolls stay out of history/stats, recordDevRolls lets them in for testing]
    $if[$or[$get[targetID]==-1;$getGlobalVar[recordDevRolls]];
      $recordRoll[raretry;$objectOf[at;$getTimestamp;mode;$get[rtMode];rares;$env[caught];mope_coins;$get[totalMC]]]
    ]

    $c[count catches for the daily quest until it's done]
    $if[$get[caughtCount]>0;
      $countDailyRares[raretry;$get[caughtCount]]
      $callMethod[userProfile;save]
    ;
      $let[color;$getGlobalVar[errorColor]]
      $callFn[embed]
    ]
  `,
})
