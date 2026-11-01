import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getAnimalInfo",
  description: "gets a key of an animal's base info or of one of its skins",
  output: ArgType.Unknown,
  params: [
    {
      name: "animalId",
      description: "animal or rare ID from res/data/animals",
      type: ArgType.String,
    },
    {
      name: "key",
      description: "the key to read",
      type: ArgType.String,
    },
    {
      name: "skin",
      description: "optional: skin index in 'animal.skins' or a skin id (like lion.s2.0). w/o it you get the base info",
      type: ArgType.String,
      required: false,
    },
  ],
  code: `
    $c[shared ref, don't mutate 'animals']
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

    $c[skin = index in 'skins' or a skin id]
    $if[$isNumber[$get[skin]]==false;
      $let[skin;$arrayFindIndex[$jsonGet[animals;$get[animalIndex];skins];item;$jsonGet[item;id]==$get[skin]]]
    ]
    $if[$get[skin]<0;
      $return[undefined]
    ]

    $return[$default[$jsonGet[animals;$get[animalIndex];skins;$get[skin];$env[key]];undefined]]
  `,
})
