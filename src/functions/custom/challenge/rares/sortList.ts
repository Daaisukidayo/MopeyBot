import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "sortList",
  description: "sorts the list by the animals order in animals.json",
  output: ArgType.Json,
  params: [
    {
      name: "raresList",
      description: "caught rares",
      type: ArgType.Json,
    },
  ],
  code: `
    $getCache[animals;animalIndexes;animalIndexes]

    $if[$jsonSize[raresList]==0;
      $return[$objectOf]
    ]

    $c[follow the animals order, unknown ones go last]
    $jsonLoad[keys;$arrayPluck[$arraySortBy[$arrayMap[$jsonKeys[raresList];id;$return[$objectOf[id;$env[id];index;$jsonGet[animalIndexes;$env[id]]]]];asc;index];id]]
    $return[$objectPick[raresList;$spread[$arrayJoin[keys;,];,]]]
  `,
})
