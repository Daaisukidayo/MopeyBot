"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "cacheAnimalsData",
    description: "Reads the animals files (res/data/animals) into the cache once. The data is then loaded with $getCache[animals;animalsData;<variable>].",
    code: `
    $if[$hasCache[animals;animalsData];$return]

    $c[A common animal lists its rares by ID. The rares are in rares.json and the skins of every animal and rare in skins.json, both under the ID]
    $jsonLoad[rares;$readFile[res/data/animals/rares.json]]
    $jsonLoad[skins;$readFile[res/data/animals/skins.json]]

    $c[One flat list, each rare right after its common animal. Skins go back as 'variants', the last key]
    $arrayLoad[animals]
    $arrayForEach[$readFile[res/data/animals/animals.json];animal;
      $!jsonSet[animal;variants;$jsonGet[skins;$jsonGet[animal;ID]]]
      $arrayPushJSON[animals;$env[animal]]

      $c[A rare leaves out what it shares with its common animal: the tier, biome and flying are put back here]
      $jsonLoad[shared;$objectPick[animal;canFly;biome;tier]]
      $arrayForEach[$default[$jsonGet[animal;rares];$arrayOf];rareId;
        $jsonLoad[rare;$objectOf[ID;$env[rareId]]]
        $objectMerge[rare;$jsonGet[rares;$env[rareId]]]
        $!jsonSet[rare;variants;$jsonGet[skins;$env[rareId]]]
        $objectDefaults[rare;shared]
        $arrayPushJSON[animals;$env[rare]]
      ]
    ]
    $setCache[animals;animalsData;$env[animals]]
  `,
});
//# sourceMappingURL=cacheAnimalsData.js.map