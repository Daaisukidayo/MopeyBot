export default {
  name: "getAnimalInfo",
  description: "Extracts animal's main information from the specified key.",
  params: [
    {
      name: "_animalId",
      description: "Animal identifier from '/animals.json'.",
      required: true,
    },
    {
      name: "_key",
      description: "Information to get from '/animals.json'.",
      required: true,
    }
  ],
  code: `
    $jsonLoad[animals;$getAnimalsData]
    $getCache[animalIndexes;animalIndexes]

    $arrayLoad[keys;.;$env[_key]]
    $let[animalIndex;$env[animalIndexes;$env[_animalId]]]

    $if[$get[animalIndex]==;
      $return[undefined]
    ]

    $jsonLoad[value;$env[animals;$get[animalIndex]]]

    $if[$env[value]==;
      $return[undefined]
    ]

    $loop[$arrayLength[keys];
      $jsonLoad[value;$env[value;$env[keys;$sub[$env[i];1]]]]
    ;i;true]

    $return[$default[$env[value];undefined]]
  `
}