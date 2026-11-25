import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "animalImage",
  description:
    "the picture of an animal's skin for a thumbnail. the skin's file in res/assets/skins gets attached, a skin without one gives its old link",
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
    $let[path;$animalImagePath[$env[animalId];$env[skin]]]
    $if[$fileExists[$get[path]];
      $let[name;$getAnimalInfo[$env[animalId];id;$nullish[$env[skin];0]].png]
      $attachment[$get[path];$get[name]]
      $return[attachment://$get[name]]
    ]
    $return[$get[path]]
  `,
})
