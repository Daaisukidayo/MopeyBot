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

    $c['max' in any language = max attempts]
    $if[$arraySome[$jsonKeys[$getGlobalVar[allLocales]];locale;$get[attempts]==$tl[ui.special.maximum.$env[locale]]];
      $let[attempts;$get[maxAttempts]]
    ]

    $onlyIf[$and[$isNumber[$get[attempts]];$inRange[$get[attempts];1;$get[maxAttempts]]];
      $newError[$tl[ui.raretrysimulator.invalidNumber.$get[l]]]
    ]

    $let[rtMode;$pickLocalizedOption[data.raretryModes;$nullish[$option[mode];$message[1];$jsonGet[userProfile;raretry_mode]];$getGlobalVar[raretryModes];ui.raretrysimulator.unknownMode]]

    $addCooldown
    $defer

    $arrayMap[$getGlobalVar[raretryCategories];category;$return[$jsonGet[category;id]];categories]
    $jsonLoad[rarities;$getGlobalVar[raretryRarities]]
    $getCache[rares;raretryGroups;rareGroups]

    $c[only categories that dropped something get an entry]
    $jsonLoad[result;$objectOf]

    $loop[$get[attempts];
      $arrayForEach[rareGroups;group;
        $let[baseChance;$jsonGet[rarities;$math[$env[i] + $get[rtMode]]]]

        $if[$random[1;$get[baseChance]]==1;
          $let[category;$jsonGet[categories;$env[i]]]
          $objectDefaults[result;$get[category];$objectOf[rarity;$arrayOf[1;$get[baseChance]];map;$objectOf]]
          $jsonMath[result;$get[category];map;$arraySample[$env[group]];1]
        ]
      ;i]
    ]

    $c[category order, not drop order]
    $arrayFilter[categories;category;$jsonGet[result;$env[category]]!=;dropped]
    $arrayMap[dropped;category;
      $arrayMap[$jsonEntries[$jsonGet[result;$env[category];map]];kv;
        $return[$getAnimalInfo[$jsonGet[kv;0];emoji;0]\`$jsonGet[kv;1]\`]
      ;contentInEntries]

      $return[# _\`$tl[data.raretryCategories.$env[category].$get[l]] ($jsonGet[result;$env[category];rarity;0]/$jsonGet[result;$env[category];rarity;1])\`_\n## $arrayJoin[contentInEntries; ]]
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
  `,
});
//# sourceMappingURL=raretrySimulator.js.map