export default function listGenerator(arrayName = 'content', addPoints = false) {
  return `
    $jsonLoad[listEntries;$jsonEntries[raresList]]
    $arrayLoad[${arrayName}]
    $arrayLoad[preContent]
    $arrayLoad[displacement]

    $arrayForEach[listEntries;entry;
      $let[animalID;$env[entry;0]]
      $let[quantity;$env[entry;1]]
      $let[animalIndex;$env[animalsIndexes;$get[animalID]]]
      $let[animalDisplay;$env[animals;$get[animalIndex];variants;0;emoji]]

      $if[${addPoints};
        $jsonLoad[output;$callFunction[findingRareInChallengeDataBase;$get[animalID]]]
        $letSum[totalPoints;$math[$env[output;points] * $get[quantity]]]
        $letSum[totalRares;$get[quantity]]
      ]

      $arrayPush[preContent;$get[animalDisplay]\`$get[quantity]\`]
    ]

    $if[$arrayLength[preContent]==0;
      $arrayPush[${arrayName};None]
    ;
      $loop[$arrayLength[preContent];
        $if[$math[($env[i] - 1) % $getGlobalVar[maxRowsInRaresList]]==0;
          $arrayPushJSON[displacement;$arraySplice[preContent;0;$getGlobalVar[maxRowsInRaresList]]]
        ]
      ;i;true]

      $arrayForEach[displacement;page;
        $arrayPush[${arrayName};$arrayJoin[page; ]]
      ]
    ]
  `
}