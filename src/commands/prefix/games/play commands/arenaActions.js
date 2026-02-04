export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: 'arena actions',
  code: `
    $arrayLoad[IID;-;$customID]

    $onlyIf[$arrayIncludes[IID;arenaAction_play]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying

    $jsonLoad[xpReward;$getGlobalVar[arenaXpReward]]

    $let[playerAction;$env[IID;0]]
    $let[tier;$env[playData;tier]]
    $let[turn;$env[playData;arena;turn]]
    $let[opponentAction;$env[playData;arena;opponentAction]]
    $let[opponentTier;$env[playData;arena;opponentTier]]
    $let[opponentAnimal;$env[playData;arena;opponentAnimal]]
    $let[opponentWardrobe;$env[playData;arena;opponentWardrobe]]
    $let[opponentDisplay;$getAnimalVariantInfo[$get[opponentAnimal];emoji;$get[opponentWardrobe]] $getAnimalVariantInfo[$get[opponentAnimal];name;$get[opponentWardrobe]]]
    $let[bites;$env[playData;arena;bites]]
    $let[opponentBites;$env[playData;arena;opponentBites]]
    
    $let[currentAnimal;$env[playData;currentAnimal]]
    $let[wrI;$env[userWardrobe;$get[currentAnimal]]]
    $let[currentAnimalDisplay;$getAnimalVariantInfo[$get[currentAnimal];emoji;$get[wrI]] $userDisplayName]

    $let[xpReward;$env[playData;arena;opponentXP]]
    $let[opponentApex;$advancedReplace[$get[opponentAnimal];aquaYeti;yeti;kingDragon;blackDragon;rareKingDragon;blackDragon]]

    $let[actionR;$random[0;100]]
    $let[key;$get[playerAction]_$get[opponentAction]]

    $let[actionDesc;-1]
    
    $jsonLoad[currentApex;$env[playData;apex]]
    $jsonLoad[apexData;$getCurrentApexData]
    $jsonLoad[arenaActions;$getGlobalVar[arenaActions]]
    $jsonLoad[arenaMatrix;$getGlobalVar[arenaMatrix]]
    $jsonLoad[counterMap;{"0": 1,"1": 2,"2": 0}]
    $jsonLoad[mistakeMap;{"0": 2,"1": 0,"2": 1}]
    $jsonLoad[rules;$env[arenaMatrix;$get[key]]]

    $loop[$arrayLength[rules];
      $jsonLoad[rule;$arrayAt[rules;$math[$env[i] - 1]]]
      $if[$get[actionR]>=$env[rule;0];;$continue]
      $let[actionDesc;$env[rule;1]]
      $switch[$env[rule;2];
        $case[1;$letSum[bites;1]]
        $case[2;$letSum[opponentBites;1]]
      ]
      $break
    ;i;true]

    $if[$get[turn]==0;
      $let[opponentAction;$function[
        $if[$get[actionR]<=65;
          $return[$env[counterMap;$get[playerAction]]]
        ;$if[$get[actionR]<=90;
          $return[$get[playerAction]]
        ;
          $return[$env[mistakeMap;$get[playerAction]]]
        ]]
      ]]


      $c[If user's turn, then setting new random opponent's action]
      $jsonLoad[action;$arrayRandomValue[arenaActions]]
      $let[newOpponentAction;$env[action;id]]
    ]
    

    $!jsonSet[playData;arena;bites;$get[bites]]
    $!jsonSet[playData;arena;opponentBites;$get[opponentBites]]

    $let[updatedOpponentAction;$default[$get[newOpponentAction];$get[opponentAction]]]
    $!jsonSet[playData;arena;opponentAction;$get[updatedOpponentAction]]

    $c[Embeds]

    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[ui.play.arena.table.player;$get[currentAnimalDisplay]]]
      $addTextDisplay[$tl[ui.play.arena.table.bites;$get[bites]]]
      $addTextDisplay[$tl[ui.play.arena.table.vs]]
      $addTextDisplay[$tl[ui.play.arena.table.player;$get[opponentDisplay]]]
      $addTextDisplay[$tl[ui.play.arena.table.bites;$get[opponentBites]]]
      $addSeparator
      $addTextDisplay[$tl[ui.play.arena.table.userChose;$tl[data.arenaActions.$get[playerAction]]]]
      $addTextDisplay[$tl[ui.play.arena.table.opponentChose;$tl[data.arenaActions.$get[updatedOpponentAction]]]]
      $addSeparator
      $addTextDisplay[$tl[ui.play.arena.actions.$get[actionDesc]]]
      $addSeparator

      $if[$get[bites]>=10; $c[If user won]

        $c[Giving XP based on opponent's tier]
        $addTextDisplay[$tl[ui.play.arena.table.won]]

        $addSeparator[Large]
        
        $!jsonSet[playData;XP;$math[$env[playData;XP] + $get[xpReward]]]
        $!jsonSet[playData;MC;$math[$env[playData;MC] + 1000]]

        $if[$and[$get[tier]==17;$includes[$toLowerCase[$get[currentAnimal]];kingdragon]==false]; $c[If user is not king dragon]
          $if[$arrayIncludes[currentApex;$get[opponentApex]];;
            $arrayPush[currentApex;$get[opponentApex]] $c[setting apex based on opponent's animal]
            $!jsonSet[playData;apex;$env[currentApex]]
          ]
        ]

        $resetArenaData
        $let[showStats;true]
        $let[color;$getGlobalVar[luckyColor]]

      ;

        $if[$get[opponentBites]>=10; $c[If user lost]

          $addTextDisplay[$tl[ui.play.arena.table.lost]]

          $addSeparator[Large]

          $!jsonSet[playData;currentAnimal;null]
          $!jsonSet[playData;isDead;true]

          $updateXpOnDeath
          $resetArenaData
          $setNewTier
          $removeAllApex

          $addRespawnButton
          $addSeparator
          $addExitButton
          $let[color;$getGlobalVar[errorColor]]

        ;  $c[If arena still in progress]

          $switch[$get[turn];
            $case[0; $c[If user's turn]
              $let[turn;1]
              $addTextDisplay[$tl[ui.play.arena.table.opponentTurn]]
              $addTextDisplay[$tl[ui.play.arena.table.opponentChose;$tl[data.arenaActions.$get[updatedOpponentAction]]]]
            ]
            $case[1; $c[If opponent's turn]
              $let[turn;0]
              $addTextDisplay[$tl[ui.play.arena.table.userTurn]]
              $addTextDisplay[$tl[ui.play.arena.table.userChoose]]
            ]
          ]

          $!jsonSet[playData;arena;turn;$get[turn]]

          $addArenaActionButtons

          $addSeparator
          $addExitButton
          $addCheats
          $let[color;$getGlobalVar[defaultColor]]
        ]
      ]

      $if[$get[showStats];
        $displayAnimalStats
        $addActionsMenu
        $addSeparator
        $addExitButton
        $addCheats
      ]
    ;$get[color]]
    $interactionUpdate
    $updatePlayData
  `
}