import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "animalImage",
  description:
    "Returns the picture of an animal's skin for a thumbnail. The skin's file in res/img/animals is attached to the message; a skin without one gives its old link.",
  output: ArgType.String,
  params: [
    {
      name: "animalId",
      description: "Animal or rare identifier from res/data/animals.",
      type: ArgType.String
    },
    {
      name: "skin",
      description: "Optional: the skin's id, or its index in 'variants'. The first skin by default.",
      type: ArgType.String,
      required: false
    }
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
  `
})
