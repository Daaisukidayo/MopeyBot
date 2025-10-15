import playSnippets from '#snippets/playSnippets.js'

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'first time arena',
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;actions,play]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$selectMenuValues==arena]
    ${playSnippets.loadJSON()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${playSnippets.hasStarted()}

    $let[arenaR;$randomNumber[1;101]]
    $let[arenaApexAcceptR;$randomNumber[1;101]]
    $let[KDacceptR;$randomNumber[1;101]]
    $let[aquaAcceptR;$randomNumber[1;101]]
    $let[KDacceptC;25]
    $let[aquaAcceptC;10]
    $let[tier17C;15]
    $let[tier16C;25]
    $let[acceptArenaC;50]

    $if[$get[arenaR]<=$get[acceptArenaC];

      $arrayLoad[opp]

      $if[$get[arenaApexAcceptR]<=$get[tier17C];

        $let[paths;$if[$get[KDacceptR]<=$get[KDacceptC];kingDragon;blackDragon]]
        $let[opponentTier;17]

      ;$if[$get[arenaApexAcceptR]<=$get[tier16C];

        $switch[$env[playData;currentBiome];
          $case[Land;     $let[paths;dinoMonster]]
          $case[Volcano;  $let[paths;landMonster]]
          $case[Ocean;    $let[paths;seaMonster]]
          $case[Arctic;   $let[paths;iceMonster]]
          $case[Desert;   $let[paths;giantScorpion]]
          $case[Forest;   $let[paths;dinoMonster]]
        ]
        $let[opponentTier;16]

      ;

        $switch[$env[playData;currentBiome];
          $case[Land;     $let[paths;dragon,trex]]
          $case[Volcano;  $let[paths;phoenix]]
          $case[Ocean;    $let[paths;kraken,kingCrab]]
          $case[Arctic;   $let[paths;$if[$get[KDacceptR]<=$get[KDacceptC];aquaYeti;yeti]]]
          $case[Desert;   $let[paths;pterodactyl]]
          $case[Forest;   $let[paths;dragon,trex]]
        ]
        $let[opponentTier;15]

      ]]

      $arrayLoad[paths;,;$get[paths]]

      $arrayForEach[paths;path;
        $jsonLoad[vars;$env[animals;$env[animalsIndexes;$env[path]];variants]]
        $jsonLoad[v;$env[vars;$arrayRandomIndex[vars]]]

        $arrayPush[opp;$env[v;emoji]--$env[v;name]--$env[v;img]--$env[path]]
      ]

      $arrayLoad[opp;--;$arrayRandomValue[opp]]
      $let[opponent;$env[opp;0] $env[opp;1]]
      $let[desc;## You went in arena with __$get[opponent]__\n### Your turn!]
      $let[thumb;$env[opp;2]]

      $let[min;$env[XPreq;$get[opponentTier];0]]
      $let[max;$math[$env[XPreq;$get[opponentTier];1] + 1]]
      $let[opponentXP;$randomNumber[$get[min];$get[max]]]

      $!jsonSet[playData;opponentAnimal;$get[opponent]]
      $!jsonSet[playData;opponentApex;$env[opp;3]]
      $!jsonSet[playData;opponentTier;$get[opponentTier]]
      $!jsonSet[playData;opponentXP;$get[opponentXP]]

      $let[success;true]

    ;
      $jsonLoad[ARC;${playSnippets.arenaRejectContent()}]
      $let[desc;## $arrayRandomValue[ARC]]
      $let[success;false]
      
    ]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]

      $if[$get[success];
        $addSection[
          $addThumbnail[$get[thumb]]
          $addTextDisplay[$get[desc]]
        ]
        ${playSnippets.arenaActionButtons()}
      ;
        $addTextDisplay[$get[desc]]
        ${playSnippets.actionMenu()}
      ]
      ${playSnippets.animalStats()}
      $addSeparator
      ${playSnippets.exitButton()}
    ;$env[playData;color]]

    $interactionUpdate
    
    $setUserVar[userPlayData;$env[playData]]
  `
}