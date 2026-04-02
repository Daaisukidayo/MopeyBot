export default {
  name: "generateList",
  description: "Generates an object with keys: 'l' (list of rares, array), 'p' (points) and 'r' (rares).",
  params: [
    {
      name: "caught_rares_list",
      description: "Object of caught rare animals.",
      type: "Object",
      required: true,
    },
  ],
  code: `
    $jsonLoad[listEntries;$advJsonEntries[$env[caught_rares_list]]]
    $jsonLoad[result;{}]

    $let[P;0]
    $let[R;0]

    $arrayMap[listEntries;entry;
      $let[animalID;$env[entry;0]]
      $let[count;$env[entry;1]]

      $jsonLoad[data;$getRareFromCDB[$get[animalID]]]
      
      $letSum[P;$math[$env[data;points] * $get[count]]]
      $letSum[R;$get[count]]

      $return[$getAnimalVariantInfo[$get[animalID];emoji]\`$get[count]\`]
    ;list]


    $if[$arrayLength[list]==0;
      $arrayPush[list;$tl[ui.challenge.none]]
    ]

    $!jsonSet[result;l;$env[list]]
    $!jsonSet[result;p;$get[P]]
    $!jsonSet[result;r;$get[R]]

    $return[$env[result]]
  `
}