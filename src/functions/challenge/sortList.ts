export default {
  name: "sortList",
  description: "Sorts list based on their positions in animals.json.",
  params: [
    {
      name: "_list",
      description: "Object with caught rares",
      type: "Json",
      required: true,
    }
  ],
  output: "Json",
  code: `
    $getCache[animalIndexes;animalIndexes]

    $if[$env[_list]=={};
      $return[$env[_list]]
    ]
    $jsonLoad[entries;$jsonEntries[_list]]


    $!arrayAdvancedSort[entries;eA;eB;
      $let[iA;$env[animalIndexes;$env[eA;0]]]
      $let[iB;$env[animalIndexes;$env[eB;0]]]
      $return[$math[$get[iA] - $get[iB]]]
    ]
    $return[$fromEntries[entries]]
  `
}