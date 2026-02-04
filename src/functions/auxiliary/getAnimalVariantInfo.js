export default {
  name: "getAnimalVariantInfo",
  description: "Extracts animal's skin information from the specified key.",
  params: [
    {
      name: "id",
      description: "Animal identifier from 'animals.json'.",
      type: "String",
      required: true,
    },
    {
      name: "key",
      description: "What information to get.",
      type: "String",
      required: true,
    },
    {
      name: "variant",
      description: "Variant ID from 'animal.variants' (default: 0).",
      type: "Number",
      required: false,
    }
  ],
  code: `
    $if[$env[funcCache;animals]==;
      $!jsonSet[funcCache;animals;$getAnimalsData]
    ]
    $if[$env[funcCache;animalIndexes]==;
      $!jsonSet[funcCache;animalIndexes;$getGlobalVar[animalIndexes]]
    ]

    $let[i;$nullish[$env[variant];0]]
    $let[id;$env[funcCache;animalIndexes;$env[id]]]

    $if[$or[$get[id]==;$isNumber[$get[i]]==false;$get[i]<0];
      $return[undefined]
    ]

    $let[foundKey;$env[funcCache;animals;$get[id];variants;$get[i];$env[key]]]

    $c[
      $if[$and[$get[foundKey]==;$get[i]!=0];
        $let[foundKey;$env[funcCache;animals;$get[id];variants;0;$env[key]]]
      ]
    ]

    $return[$default[$get[foundKey];undefined]]
  `
}