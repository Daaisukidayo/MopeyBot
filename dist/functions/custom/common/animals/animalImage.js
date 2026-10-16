"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "animalImage",
    description: "Returns the picture of an animal's skin for a thumbnail. The skin's file in res/img/animals is attached to the message; a skin without one gives its old link.",
    output: forgescript_1.ArgType.String,
    params: [
        {
            name: "animalId",
            description: "Animal or rare identifier from res/data/animals.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "skin",
            description: "Optional: the skin's id, or its index in 'variants'. The first skin by default.",
            type: forgescript_1.ArgType.String,
            required: false,
        },
    ],
    code: `
    $c[A skin not given reads as 'undefined']
    $let[skin;$nullish[$env[skin];0]]
    $let[skinId;$getAnimalInfo[$env[animalId];id;$get[skin]]]

    $c[Laid out as in the game: <biome>/<animal>/<skin id>.png, a rare in <biome>/<its common animal>/<rare>/ (the common animal's biome)]
    $let[common;$nullish[$getAnimalInfo[$env[animalId];common];$env[animalId]]]
    $let[biome;$jsonGet[$arrayOf[land;desert;ocean;arctic;forest;volcano];$getAnimalInfo[$get[common];biome]]]
    $let[file;res/img/animals/$get[biome]/$get[common]$if[$get[common]!=$env[animalId];/$env[animalId]]/$get[skinId].png]

    $if[$fileExists[$get[file]];
      $attachment[$get[file];$get[skinId].png]
      $return[attachment://$get[skinId].png]
    ]
    $return[$getAnimalInfo[$env[animalId];img;$get[skin]]]
  `,
});
//# sourceMappingURL=animalImage.js.map