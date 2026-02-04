export default {
  name: "getAnimalInfo",
  description: "Extracts animal's main information from the specified key.",
  params: [
    {
      name: "id",
      description: "Animal identifier from '/animals.json'.",
      required: true,
    },
    {
      name: "key",
      description: "Information to get from '/animals.json'.",
      required: true,
    }
  ],
  code: `
    $if[$env[funcCache;animals]==;
      $!jsonSet[funcCache;animals;$getAnimalsData]
    ]
    $if[$env[funcCache;animalIndexes]==;
      $!jsonSet[funcCache;animalIndexes;$getGlobalVar[animalIndexes]]
    ]

    $arrayLoad[keys;.;$env[key]]
    $let[I;$env[funcCache;animalIndexes;$env[id]]]

    $if[$get[I]==;
      $return[undefined]
    ]

    $jsonLoad[value;$env[funcCache;animals;$get[I]]]

    $if[$env[value]==;
      $return[undefined]
    ]

    $loop[$arrayLength[keys];
      $let[i;$sub[$env[i];1]]
      $jsonLoad[value;$env[value;$env[keys;$get[i]]]]
    ;i;true]

    $return[$default[$env[value];undefined]]
  `
}