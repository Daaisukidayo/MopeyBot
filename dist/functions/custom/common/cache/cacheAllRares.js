"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "cacheAllRares",
    description: "caches the challenge rares (points, categories, abbreviations), every difficulty's caps and the raretry categories",
    code: `
    $jsonLoad[points;$getGlobalVar[challengeCategoryPoints]]
    $jsonLoad[rareByAbbreviation;$objectOf]
    $jsonLoad[challengeRares;$objectOf]
    $jsonLoad[challengeCategories;$objectOf]
    $arrayLoad[allRares]
    $arrayLoad[activeRares]

    $c[shared ref, don't mutate 'animals']
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]

    $c[history knows every animal w/ a challenge block, but new challenges only count live rares]
    $arrayFilter[animals;animal;$jsonHas[animal;challenge];challengeAnimals]
    $arrayForEach[challengeAnimals;animal;
      $let[id;$jsonGet[animal;ID]]
      $let[category;$default[$jsonGet[animal;challenge;category];-1]]
      $let[active;$and[$jsonGet[animal;isRare];$jsonGet[animal;deleted]!=true]]

      $arrayForEach[$jsonGet[animal;challenge;abbreviations];abbreviation;
        $!jsonSet[rareByAbbreviation;$env[abbreviation];$get[id]]
        $arrayPush[allRares;$env[abbreviation]]
        $if[$get[active];$arrayPush[activeRares;$env[abbreviation]]]
      ]

      $c[own points beat the category's, so removed rares keep their old points]
      $!jsonSet[challengeRares;$get[id];$objectOf[points;$nullish[$jsonGet[animal;challenge;points];$jsonGet[points;$get[category]];0];category;$get[category]]]
      $if[$and[$get[active];$get[category]!=-1];
        $arrayPushAt[challengeCategories;$get[category];$get[id]]
      ]
    ]

    $c[raretry categories = mope.io rarity tiers plus our own common up front. a rare lands in the first one whose maxChance fits. removed rares get one too (for the color), but raretry only drops live ones]
    $jsonLoad[raretryCategories;$getGlobalVar[raretryCategories]]
    $arrayFilter[animals;animal;$jsonGet[animal;isRare]==true;rareAnimals]
    $jsonLoad[raretryCategoryOf;$objectOf]
    $arrayForEach[rareAnimals;animal;
      $let[chance;$math[$jsonGet[animal;rarity;1] / $jsonGet[animal;rarity;0]]]
      $!jsonSet[raretryCategoryOf;$jsonGet[animal;ID];$arrayFindIndex[raretryCategories;category;$or[$jsonGet[category;maxChance]==;$get[chance]<=$jsonGet[category;maxChance]]]]
    ]
    $arrayMap[raretryCategories;category;
      $return[$arrayMap[$arrayFilter[rareAnimals;animal;$and[$jsonGet[animal;deleted]!=true;$jsonGet[raretryCategoryOf;$jsonGet[animal;ID]]==$env[i]]];animal;$return[$jsonGet[animal;ID]]]]
    ;raretryGroups;i]

    $c[caps per category per difficulty, negative = no caps on that difficulty]
    $jsonLoad[limitsMap;$getGlobalVar[chartLimitsMap]]
    $jsonLoad[categoryLimits;$objectOf]
    $arrayForEach[$jsonEntries[$getGlobalVar[chartLimits]];difficulty;
      $jsonLoad[limits;$objectOf]
      $arrayForEach[$jsonGet[difficulty;1];id;
        $if[$jsonGet[limitsMap;$env[id];limit]>=0;
          $!jsonSet[limits;$jsonGet[limitsMap;$env[id];category];$jsonGet[limitsMap;$env[id];limit]]
        ]
      ]
      $!jsonSet[categoryLimits;$jsonGet[difficulty;0];$env[limits]]
    ]

    $setCache[rares;allRares;$env[allRares]]
    $setCache[rares;activeRares;$env[activeRares]]
    $setCache[rares;rareByAbbreviation;$env[rareByAbbreviation]]
    $setCache[rares;challengeRares;$env[challengeRares]]
    $setCache[rares;challengeCategories;$env[challengeCategories]]
    $setCache[rares;categoryLimits;$env[categoryLimits]]
    $setCache[rares;raretryGroups;$env[raretryGroups]]
    $setCache[rares;raretryCategoryOf;$env[raretryCategoryOf]]
    $logger[Info;Cached the challenge rares]
  `,
});
//# sourceMappingURL=cacheAllRares.js.map