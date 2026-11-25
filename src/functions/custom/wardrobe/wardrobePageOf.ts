import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "wardrobePageOf",
  description: "the all animals page with an animal, or with a tier's first one. empty if it's not on the list",
  output: ArgType.Number,
  params: [
    {
      name: "kind",
      description: "'animal' or 'tier'",
      type: ArgType.String,
    },
    {
      name: "value",
      description: "the animal ID or the tier",
      type: ArgType.String,
    },
  ],
  code: `
    $jsonLoad[ids;$wearableAnimals]
    $if[$env[kind]==tier;
      $let[index;$arrayFindIndex[ids;id;$getAnimalInfo[$env[id];tier]==$env[value]]]
    ;
      $let[index;$arrayFindIndex[ids;id;$env[id]==$env[value]]]
    ]
    $if[$get[index]==-1;$return]
    $return[$math[$floor[$math[$get[index] / $getGlobalVar[wardrobeAnimalsPageSize]]] + 1]]
  `,
})
