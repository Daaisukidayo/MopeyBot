export default {
  name: "generateList",
  description: "Generates an object with keys: 'l' (list of rares, array), 'p' (points) and 'r' (rares).",
  params: [
    {
      name: "list",
      description: "Object of caught rare animals.",
      type: "Object",
      required: true,
    },
    {
      name: "difficulty",
      description: "Difficulty to include while calculating points|rares and limiting some rare animals.",
      required: false,
    }
  ],
  code: `
    $let[D;$nullish[$env[difficulty];$getGlobalVar[defaultDifficulty]]]

    $jsonLoad[listEntries;$advJsonEntries[$env[list]]]
    $arrayLoad[displacement]
    $jsonLoad[result;{}]
    $jsonLoad[chartLimits;$dump[$getGlobalVar[chartLimits];$get[D]]]

    $let[P;0]
    $let[R;0]

    $arrayMap[listEntries;entry;
      $let[animalID;$env[entry;0]]
      $let[count;$env[entry;1]]
      $jsonLoad[data;$getRareFromCDB[$get[animalID]]]
      
      $let[index;$getChartLimitIndex[$get[animalID]]]
      $if[$get[index]!=-1;
        $jsonLoad[limitChartObj;$env[chartLimits;$get[index]]]
        $let[limit;$env[limitChartObj;limit]]

        $if[$get[count]>$get[limit];
          $let[count;$get[limit]]
        ]
      ]
      
      $letSum[P;$math[$env[data;points] * $get[count]]]
      $letSum[R;$get[count]]

      $return[$getAnimalVariantInfo[$get[animalID];emoji]\`$get[count]\`]
    ;preContent]


    $if[$arrayLength[preContent]>0;
    
      $loop[$arrayLength[preContent];
        $if[$math[($env[i] - 1) % $getGlobalVar[maxRowsInRaresList]]==0;;$continue]
        
        $arrayPushJSON[displacement;$arraySplice[preContent;0;$getGlobalVar[maxRowsInRaresList]]]
      ;i;true]

      $arrayMap[displacement;page;
        $return[$arrayJoin[page; ]]
      ;newList]
    ;
      $arrayLoad[newList;HINT;$tl[ui.challenge.none]]
    ]

    $!jsonSet[result;l;$env[newList]]
    $!jsonSet[result;p;$get[P]]
    $!jsonSet[result;r;$get[R]]

    $return[$env[result]]
  `
}