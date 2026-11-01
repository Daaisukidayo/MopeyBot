import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "cacheAnimalsData",
  description: "loads res/data/animals into the cache once. read it w/ getCache animals animalsData",
  code: `
    $if[$hasCache[animals;animalsData];$return]

    $c[all three files are keyed by ID, animals.json's key order is the animals' order]
    $jsonLoad[commons;$readFile[res/data/animals/animals.json]]
    $jsonLoad[rares;$readFile[res/data/animals/rares.json]]
    $jsonLoad[skins;$readFile[res/data/animals/skins.json]]

    $c[rares point to their animal via 'common', group them here in rares.json order]
    $jsonLoad[raresOf;$objectOf]
    $arrayForEach[$jsonEntries[rares];entry;
      $if[$jsonGet[entry;1;common]!=;$arrayPushAt[raresOf;$jsonGet[entry;1;common];$jsonGet[entry;0]]]
    ]

    $c[one flat list, each rare right after its common. 'skins' goes last]
    $arrayLoad[animals]
    $arrayForEach[$jsonEntries[commons];common;
      $jsonLoad[animal;$objectOf[ID;$jsonGet[common;0]]]
      $objectMerge[animal;$jsonGet[common;1]]
      $jsonLoad[animalRares;$default[$jsonGet[raresOf;$jsonGet[animal;ID]];$arrayOf]]

      $c[common's rarity = the shared total minus its live rares' weights, so only rares need rarity in the json]
      $arrayFilter[animalRares;rareId;$jsonGet[rares;$env[rareId];deleted]!=true;activeRares]
      $if[$jsonSize[activeRares]>0;
        $let[total;$jsonGet[rares;$jsonGet[activeRares;0];rarity;1]]
        $if[$arraySome[activeRares;rareId;$jsonGet[rares;$env[rareId];rarity;1]!=$get[total]];
          $logger[Warn;The rares of $jsonGet[animal;ID] have different totals in their rarity: its chance is counted from $get[total]]
        ]
        $let[weight;$get[total]]
        $arrayForEach[activeRares;rareId;$letSub[weight;$jsonGet[rares;$env[rareId];rarity;0]]]
        $!jsonSet[animal;rarity;$arrayOf[$get[weight];$get[total]]]
      ]

      $!jsonSet[animal;skins;$jsonGet[skins;$jsonGet[animal;ID]]]
      $arrayPushJSON[animals;$env[animal]]

      $c[rares skip what they share w/ their common (tier, biome, canFly), fill it back in here]
      $jsonLoad[shared;$objectPick[animal;canFly;biome;tier]]
      $arrayForEach[animalRares;rareId;
        $jsonLoad[rare;$objectOf[ID;$env[rareId]]]
        $objectMerge[rare;$jsonGet[rares;$env[rareId]]]
        $!jsonSet[rare;skins;$jsonGet[skins;$env[rareId]]]
        $objectDefaults[rare;shared]
        $arrayPushJSON[animals;$env[rare]]
      ]
    ]

    $c[every pack's skin ids, for buying + syncing packs. legacy brings its winter + oldest skins along]
    $c[skins w/ a cost sell alone too, grouped by collection (the middle bit of the skin id). animalIndex is for the tier sort]
    $c[skinInfo = every skin someone can own by id, same shape, for sorting the owned ones. free packs skipped]
    $jsonLoad[packSkins;$objectOf]
    $jsonLoad[skinCatalog;$objectOf]
    $jsonLoad[skinInfo;$objectOf]
    $jsonLoad[freePacks;$getGlobalVar[freeSkinPacks]]
    $arrayForEach[animals;animal;
      $arrayForEach[$default[$jsonGet[animal;skins];$arrayOf];skin;
        $arrayLoad[idParts;.;$jsonGet[skin;id]]
        $jsonLoad[info;$objectOf[id;$jsonGet[skin;id];animal;$jsonGet[animal;ID];name;$jsonGet[skin;name];collection;$jsonGet[idParts;1];cost;$jsonGet[skin;cost];animalIndex;$env[animalIndex]]]
        $if[$jsonGet[skin;packId]!=;
          $arrayPushAt[packSkins;$jsonGet[skin;packId];$jsonGet[skin;id]]
        ]
        $if[$jsonGet[skin;cost]!=;
          $arrayPushAt[skinCatalog;$jsonGet[idParts;1];$env[info]]
        ]
        $if[$or[$jsonGet[skin;cost]!=;$and[$jsonGet[skin;packId]!=;$arrayIncludes[freePacks;$jsonGet[skin;packId]]==false]];
          $!jsonSet[skinInfo;$jsonGet[skin;id];$env[info]]
        ]
      ]
    ;animalIndex]
    $arrayForEach[$arrayOf[legacySPw;oldestSP];extra;
      $arrayForEach[$default[$jsonGet[packSkins;$env[extra]];$arrayOf];skinId;$arrayPushAt[packSkins;legacySP;$env[skinId]]]
    ]

    $c[pack-only skins count as their pack's average price, like in packPrice. Classic and Gold-trim have nothing to average, so 0]
    $arrayForEach[$jsonKeys[skinInfo];skinId;
      $if[$jsonGet[skinInfo;$env[skinId];cost]==;
        $jsonLoad[priced;$default[$jsonGet[skinCatalog;$jsonGet[skinInfo;$env[skinId];collection]];$arrayOf]]
        $!jsonSet[skinInfo;$env[skinId];cost;$if[$jsonSize[priced]==0;0;$round[$math[$arraySum[priced;cost] / $jsonSize[priced]]]]]
      ]
    ]
    $setCache[animals;packSkins;$env[packSkins]]
    $setCache[animals;skinCatalog;$env[skinCatalog]]
    $setCache[animals;skinInfo;$env[skinInfo]]

    $setCache[animals;animalsData;$env[animals]]
  `,
})
