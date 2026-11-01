import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "animalImage",
  description:
    "the pic of an animal's skin for a thumbnail. the skin's file in res/assets/skins gets attached, a skin w/o one gives its old link",
  output: ArgType.String,
  params: [
    {
      name: "animalId",
      description: "animal or rare ID from res/data/animals",
      type: ArgType.String,
    },
    {
      name: "skin",
      description: "optional: the skin id or its index in 'skins'. first skin by default",
      type: ArgType.String,
      required: false,
    },
  ],
  code: `
    $c[no skin passed comes in as 'undefined']
    $let[skin;$nullish[$env[skin];0]]
    $let[skinId;$getAnimalInfo[$env[animalId];id;$get[skin]]]

    $c[same layout as the game: biome/animal/skinId.png, rares in biome/commonAnimal/rare/ (the common's biome)]
    $let[common;$nullish[$getAnimalInfo[$env[animalId];common];$env[animalId]]]
    $let[biome;$jsonGet[$arrayOf[land;desert;ocean;arctic;forest;volcano];$getAnimalInfo[$get[common];biome]]]
    $let[file;res/assets/skins/$get[biome]/$get[common]$if[$get[common]!=$env[animalId];/$env[animalId]]/$get[skinId].png]

    $if[$fileExists[$get[file]];
      $attachment[$get[file];$get[skinId].png]
      $return[attachment://$get[skinId].png]
    ]
    $return[$getAnimalInfo[$env[animalId];img;$get[skin]]]
  `,
})
