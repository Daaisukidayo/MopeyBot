export default {
  name: "sortList",
  description: "Sorts list based on their positions in animals.json.",
  params: [
    {
      name: "rares_list",
      description: "Object with caught rares",
      type: "Object",
      required: true,
    }
  ],
  code: `
    $jsonLoad[l;$env[rares_list]]
    $if[$env[l]=={};
      $return[$env[l]]
    ]
    $jsonLoad[le;$jsonEntries[l]]
    $jsonLoad[ais;$getGlobalVar[animalIndexes]]

    $!arrayAdvancedSort[le;eA;eB;
      $let[iA;$env[ais;$env[eA;0]]]
      $let[iB;$env[ais;$env[eB;0]]]
      $return[$math[$get[iA] - $get[iB]]]
    ]
    $return[$fromEntries[$env[le]]]
  `
}