import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "cacheAllRares",
  description:
    "Caches the challenge rares: their points and categories, the abbreviations, and the limits of every difficulty.",
  code: `
    $jsonLoad[points;$getGlobalVar[challengeCategoryPoints]]
    $jsonLoad[rareByAbbreviation;$objectOf]
    $jsonLoad[challengeRares;$objectOf]
    $jsonLoad[challengeCategories;$objectOf]
    $arrayLoad[allRares]
    $arrayLoad[activeRares]

    $c[Read by reference: never modify 'animals']
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]

    $c[The history knows every animal with a challenge block, only rares still in the game count in a new challenge]
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

      $c[A rare's own points override its category's: removed rares keep their old points]
      $!jsonSet[challengeRares;$get[id];$objectOf[points;$nullish[$jsonGet[animal;challenge;points];$jsonGet[points;$get[category]];0];category;$get[category]]]
      $if[$and[$get[active];$get[category]!=-1];
        $arrayPushAt[challengeCategories;$get[category];$get[id]]
      ]
    ]

    $c[Per difficulty, the limit of each limited category. A negative limit marks a difficulty without limits]
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
    $logger[Info;Cached the challenge rares]
  `
})
