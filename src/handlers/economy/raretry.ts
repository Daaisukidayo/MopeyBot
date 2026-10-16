import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleRaretry",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile

    $let[rtMode;$pickLocalizedOption[data.raretryModes;$nullish[$option[mode];$message[0];$jsonGet[userProfile;rtMode]];$getGlobalVar[raretryModes];ui.raretry.unknownMode]]

    $addCooldown
    $defer

    $jsonLoad[rarities;$getGlobalVar[raretryRarities]]
    $jsonLoad[rewards;$getGlobalVar[raretryRewards]]
    $jsonLoad[categories;$getGlobalVar[raretryCategories]]
    $jsonLoad[rareGroups;$readFile[res/data/raresInRaretry.json]]
    $let[li;$math[$jsonSize[rareGroups] - 1]]
    $let[multiplier;$jsonGet[$getGlobalVar[raretryMultipliers];$get[rtMode]]]
    $let[modeLine;$tl[ui.raretry.mode.$get[l];$tl[data.raretryModes.$get[rtMode].$get[l]]]]

    $c[A developer catches the category with this index]
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

    $c[From the rarest category down, so the rarest catch is shown first. Anyone but a developer with a target rolls 1/chance]
    $arrayForEach[$arrayRange[$get[li];0;-1];i;
      $let[rtIndex;$math[$env[i] + $get[rtMode]]]
      $let[baseChance;$jsonGet[rarities;$get[rtIndex]]]

      $if[$or[$env[i]==$get[targetID];$and[$get[targetID]==-1;$random[1;$get[baseChance]]==1]];
        $letSum[caughtCount;1]

        $jsonLoad[group;$jsonGet[rareGroups;$env[i]]]
        $let[animalId;$arraySample[$jsonGet[group;animalIds]]]
        $let[image;$animalImage[$get[animalId]]]
        $let[color;$jsonGet[group;color]]
        $let[desc;$tl[ui.raretry.gotRares.$get[l];$getAnimalInfo[$get[animalId];name;0]]]

        $c[A mode can give no coins]
        $let[MC;$math[$jsonGet[rewards;$get[rtIndex]] * $get[multiplier]]]
        $if[$get[MC]!=0;
          $let[desc;$get[desc]\n$tl[ui.raretry.earned.$get[l];$separate[$get[MC]]]]
          $sumCash[$get[MC]]
        ]

        $let[footer;$tl[ui.raretry.rarity.$get[l];1;$separate[$get[baseChance]]]\n$tl[ui.raretry.category.$get[l];$tl[data.raretryCategories.$jsonGet[categories;$env[i]].$get[l]]]\n$get[modeLine]]
        $callFn[embed]
      ]
    ]

    $c[The daily task counts the catches until it is done]
    $if[$get[caughtCount]>0;
      $if[$jsonGet[userProfile;limiters;lastDailyRaretry]!=$calendarDay;
        $if[$countDailyRares[raretry;$get[caughtCount]];
          $!jsonSet[userProfile;limiters;lastDailyRaretry;$calendarDay]
        ]
      ]
      $saveProfile[$env[userProfile]]
    ;
      $let[color;$getGlobalVar[errorColor]]
      $let[desc;$tl[ui.raretry.nothing.$get[l]]]
      $let[footer;$get[modeLine]]
      $callFn[embed]
    ]
  `,
})
