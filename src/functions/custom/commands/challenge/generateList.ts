import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "generateList",
  description: "Generates an object with keys: 'l' (list[] of rares), 'p' (points) and 'r' (rares).",
  output: ArgType.Json,
  params: [
    {
      name: "_caughtRaresList",
      description: "Object of caught rare animals.",
      type: ArgType.Json,
    },
  ],
  code: `
    $jsonLoad[result;{}]

    $let[l;$env[userProfile;language]]
    $let[points;0]
    $let[rares;0]

    $arrayMap[$jsonEntries[_caughtRaresList];entry;
      $let[animalId;$env[entry;0]]
      $let[count;$env[entry;1]]

      $jsonLoad[data;$getRareFromCDB[$get[animalId]]]
      
      $letSum[points;$math[$env[data;points] * $get[count]]]
      $letSum[rares;$get[count]]

      $return[$getAnimalInfo[$get[animalId];emoji;0]\`$get[count]\`]
    ;list]


    $if[$arrayLength[list]==0;
      $arrayPush[list;$tl[ui.challenge.none.$get[l]]]
    ]

    $jsonSet[result;l;$env[list]]
    $jsonSet[result;p;$get[points]]
    $jsonSet[result;r;$get[rares]]

    $return[$env[result]]
  `
})