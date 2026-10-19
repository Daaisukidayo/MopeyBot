import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getAnimalInfo",
  description: "Extracts an animal's base or skin information from the specified key.",
  output: ArgType.Unknown,
  params: [
    {
      name: "animalId",
      description: "Animal or rare identifier from res/data/animals.",
      type: ArgType.String,
    },
    {
      name: "key",
      description: "Information to get from the JSON structure.",
      type: ArgType.String,
    },
    {
      name: "skin",
      description:
        "Optional: the skin's index in 'animal.skins', or the skin's id (e.g. lion_s2_0). If omitted, gets base info.",
      type: ArgType.String,
      required: false,
    },
  ],
  code: `
    $c[Read by reference: never modify 'animals']
    $if[$hasCache[animals;animalsData]==false;$cacheAnimalsData]
    $getCache[animals;animalsData;animals]
    $getCache[animals;animalIndexes;animalIndexes]

    $let[animalIndex;$jsonGet[animalIndexes;$env[animalId]]]
    $let[skin;$env[skin]]

    $if[$get[animalIndex]==;
      $return[undefined]
    ]

    $if[$isOneOf[$get[skin];null;];
      $return[$default[$jsonGet[animals;$get[animalIndex];$spread[$env[key];.]];undefined]]
    ]

    $c[The skin is its index in 'skins', or its id]
    $if[$isNumber[$get[skin]]==false;
      $let[skin;$arrayFindIndex[$jsonGet[animals;$get[animalIndex];skins];item;$jsonGet[item;id]==$get[skin]]]
    ]
    $if[$get[skin]<0;
      $return[undefined]
    ]

    $return[$default[$jsonGet[animals;$get[animalIndex];skins;$get[skin];$env[key]];undefined]]
  `,
})
