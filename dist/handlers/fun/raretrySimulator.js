"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleRaretrysimulator",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile

    $let[maxAttempts;$getGlobalVar[maxRtsimAttempts]]
    $let[attempts;$toLowerCase[$nullish[$option[attempts];$message[0];100]]]

    $c[The word for the maximum in any language means the most attempts]
    $if[$arraySome[$jsonKeys[$getGlobalVar[allLocales]];locale;$get[attempts]==$tl[ui.special.maximum.$env[locale]]];
      $let[attempts;$get[maxAttempts]]
    ]

    $onlyIf[$and[$isNumber[$get[attempts]];$inRange[$get[attempts];1;$get[maxAttempts]]];
      $newError[$tl[ui.raretrysimulator.invalidNumber.$get[l]]]
    ]

    $let[rtMode;$pickLocalizedOption[data.raretryModes;$nullish[$option[mode];$message[1];$jsonGet[userProfile;rtMode]];$getGlobalVar[raretryModes];ui.raretrysimulator.unknownMode]]

    $addCooldown
    $defer

    $jsonLoad[categories;$getGlobalVar[raretryCategories]]
    $jsonLoad[rarities;$getGlobalVar[raretryRarities]]
    $jsonLoad[rareGroups;$readFile[res/data/raresInRaretry.json]]

    $c[Only the categories that dropped something get an entry. Their keys are numbers, so they stay in order]
    $jsonLoad[result;$objectOf]

    $loop[$get[attempts];
      $arrayForEach[rareGroups;group;
        $let[baseChance;$jsonGet[rarities;$math[$env[i] + $get[rtMode]]]]

        $if[$random[1;$get[baseChance]]==1;
          $let[category;$jsonGet[categories;$env[i]]]
          $objectDefaults[result;$get[category];$objectOf[rarity;$arrayOf[1;$get[baseChance]];map;$objectOf]]
          $jsonMath[result;$get[category];map;$arraySample[$jsonGet[group;animalIds]];1]
        ]
      ;i]
    ]

    $arrayMap[$jsonEntries[result];entry;
      $arrayMap[$jsonEntries[$jsonGet[entry;1;map]];kv;
        $return[$getAnimalInfo[$jsonGet[kv;0];emoji;0]\`$jsonGet[kv;1]\`]
      ;contentInEntries]

      $return[# _\`$tl[data.raretryCategories.$jsonGet[entry;0].$get[l]] ($jsonGet[entry;1;rarity;0]/$jsonGet[entry;1;rarity;1])\`_\n## $arrayJoin[contentInEntries; ]]
    ;content]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.raretrysimulator.title.$get[l]]]
      $addSeparator
      $addTextDisplay[$if[$jsonSize[content]>0;$arrayJoin[content;\n];$tl[ui.raretrysimulator.empty.$get[l]]]]
      $addSeparator
      $addTextDisplay[$tl[ui.raretrysimulator.attempts.$get[l];$get[attempts]]]
      $addTextDisplay[$tl[ui.raretrysimulator.mode.$get[l];$tl[data.raretryModes.$get[rtMode].$get[l]]]]
    ;$getGlobalVar[luckyColor]]
  `
});
//# sourceMappingURL=raretrySimulator.js.map