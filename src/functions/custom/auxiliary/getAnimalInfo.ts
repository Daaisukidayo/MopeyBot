import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getAnimalInfo",
  description: "Extracts animal's main or variant information from the specified key.",
  output: ArgType.Unknown,
  params: [
    {
      name: "_animalId",
      description: "Animal identifier from '/animals.json'.",
      type: ArgType.String,
    },
    {
      name: "_key",
      description: "Information to get from the JSON structure.",
      type: ArgType.String,
    },
    {
      name: "_variant",
      description: "Optional: Variant ID from 'animal.variants'. If omitted, gets base info.",
      type: ArgType.String,
      required: false,
    }
  ],
  code: `
    $jsonLoad[animals;$getAnimalsData]
    $getCache[animals;animalIndexes;animalIndexes]

    $let[animalIndex;$env[animalIndexes;$env[_animalId]]]
    $let[variant;$env[_variant]]

    $if[$get[animalIndex]==;
      $return[undefined]
    ]

    $if[$isOneOF[$get[variant];null;];
      $return[$default[$env[animals;$get[animalIndex];$spread[$env[_key];.]];undefined]]
    ]

    $if[$or[$isNumber[$get[variant]]==false;$get[variant]<0];
      $return[undefined]
    ]

    $return[$default[$env[animals;$get[animalIndex];variants;$get[variant];$env[_key]];undefined]]
  `
})