import playSnippets from '#snippets/playSnippets.js'

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: 'arena actions',
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;attack,defend,deceive]
    $onlyIf[$arrayIncludes[IID;arenaAction]]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    ${playSnippets.loadJSON()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${playSnippets.hasStarted()}

    $let[playerAction;$env[IID;0]]
    $let[opponentAction;$env[playData;opponentAction]]
    $let[opponentTier;$env[playData;opponentTier]]
    $let[opponentApex;$env[playData;opponentApex]]
    $let[actionR;$randomNumber[1;101]]

    $jsonLoad[xpReward;{
      "15": [1000000,3000000\\],
      "16": [3000000,6000000\\],
      "17": [6000000,12000000\\]
    }]

    $if[$env[playData;arenaTurn]==0;
      $if[$get[actionR]<=65;
        $if[$get[playerAction]==attack;
          $let[opponentAction;defend]
        ;
          $if[$get[playerAction]==defend;
            $let[opponentAction;deceive]
          ;
            $let[opponentAction;attack]
          ] $c[Counter action]
        ]
      ;
        $if[$get[actionR]<90; 
          $let[opponentAction;$get[playerAction]]  $c[Same action]
        ;
          $if[$get[playerAction]==attack;
            $let[opponentAction;deceive]
          ;
            $if[$get[playerAction]==defend;
              $let[opponentAction;attack]
            ;
              $let[opponentAction;defend]
            ] $c[Tie]
          ]
        ]
      ]
    ]

    $switch[$get[playerAction]_$get[opponentAction];

      $case[attack_attack;
        $if[$get[actionR]>=67;
          $let[actionDesc;No one get a bite]
        ;$if[$get[actionR]>=33;
          $let[actionDesc;You bit your opponent]
          $let[bitesToAdd;1]
        ;
          $let[actionDesc;Your opponent bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]

      $case[attack_defend;
        $if[$get[actionR]>=40;
          $let[actionDesc;Your opponent defended himself and bit you]
          $let[oppBitesToAdd;1]
        ;$if[$get[actionR]>=15;
          $let[actionDesc;Your opponent defended himself, but nobody bites]
        ;
          $let[actionDesc;Your opponent failed to defend himself and you bit him]
          $let[bitesToAdd;1]
        ]]
      ]

      $case[attack_deceive;
        $if[$get[actionR]>=40;
          $let[actionDesc;You successfully counterattacked his deceive and bit him!]
          $let[bitesToAdd;1]
        ;$if[$get[actionR]>=15;
          $let[actionDesc;Your opponent successfully deceived you, but nobody bites]
        ;
          $let[actionDesc;Your opponent successfully deceived and bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]

      $case[defend_attack;
        $if[$get[actionR]>=40;
          $let[actionDesc;You successfully defended yourself and bit your opponent]
          $let[bitesToAdd;1]
        ;$if[$get[actionR]>=15;
          $let[actionDesc;You successfully defended yourself, but nobody bites]
        ;
          $let[actionDesc;You unsuccessfully defended yourself and your opponent bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]

      $case[defend_defend;
        $let[actionDesc;No one get a bite]
      ]

      $case[defend_deceive;
        $if[$get[actionR]>=40;
          $let[actionDesc;You unsuccessfully defended yourself and opponent bit you]
          $let[oppBitesToAdd;1]
        ;$if[$get[actionR]>=15;
          $let[actionDesc;You successfully defended yourself from his deceive and you bit him]
          $let[bitesToAdd;1]
        ;
          $let[actionDesc;You successfully defended yourself from his deceive, but nobody bites]
        ]]
      ]

      $case[deceive_attack;
        $if[$get[actionR]>=40;
          $let[actionDesc;You unsuccessfully deceived your opponent and he bit you]
          $let[oppBitesToAdd;1]
        ;$if[$get[actionR]>=15;
          $let[actionDesc;You successfully deceived your opponent and bit him]
          $let[bitesToAdd;1]
        ;
          $let[actionDesc;You successfully deceived your opponent, but nobody bites]
        ]]
      ]

      $case[deceive_defend;
        $if[$get[actionR]>=40;
          $let[actionDesc;You successfully deceived your opponent and bit him]
          $let[bitesToAdd;1]
        ;$if[$get[actionR]>=15;
          $let[actionDesc;You successfully deceived your opponent, but nobody bites]
        ;
          $let[actionDesc;You unsuccessfully deceived your opponent and he bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]

      $case[deceive_deceive;
        $if[$get[actionR]>=67;
          $let[actionDesc;No one get a bite]
        ;$if[$get[actionR]>=33;
          $let[actionDesc;You successfully deceived your opponent and bit him]
          $let[bitesToAdd;1]
        ;
          $let[actionDesc;You unsuccessfully deceived your opponent and he bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]
    ]

    $!jsonSet[playData;bitesInArena;$math[$env[playData;bitesInArena] + $default[$get[bitesToAdd];0]]]
    $!jsonSet[playData;opponentBitesInArena;$math[$env[playData;opponentBitesInArena] + $default[$get[oppBitesToAdd];0]]]

    $c[? Embeds]

    $let[CAID;$env[playData;currentAnimal]]
    $let[currentAnimal;$default[$env[animals;$env[animalsIndexes;$get[CAID]];variants;$env[userWardrobe;$get[CAID]];emoji];<:undefined:1427991209246199848>]]

    $if[$env[playData;arenaTurn]==0; $c[If user's turn, then setting random opponent's action]
      $let[opponentAction;$randomText[attack;defend;deceive]]
      $!jsonSet[playData;opponentAction;$get[opponentAction]]
    ]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]

      $addTextDisplay[# __$get[currentAnimal] $userDisplayName__]
      $addTextDisplay[### Bites: $inlineCode[$env[playData;bitesInArena]]]
      $addTextDisplay[# \`VS\`]
      $addTextDisplay[# __$env[playData;opponentAnimal]__]
      $addTextDisplay[### Bites: $inlineCode[$env[playData;opponentBitesInArena]]]
      $addSeparator
      $addTextDisplay[## You chose: $inlineCode[$toTitleCase[$get[playerAction]]]]
      $addTextDisplay[## Opponent chose: $inlineCode[$toTitleCase[$get[opponentAction]]]]
      $addSeparator
      $addTextDisplay[## $get[actionDesc]]
      $addSeparator

      $if[$env[playData;bitesInArena]>=10; $c[If user won]

        $c[Giving XP based on opponent's tier]
        $addTextDisplay[## YOU WON!]
        $let[xpReward;$env[playData;opponentXP]]
        $let[opponentApex;$advancedReplace[$get[opponentApex];aquaYeti;yeti;kingDragon;blackDragon;rareKingDragon;blackDragon]]
        
        $!jsonSet[playData;XP;$math[$env[playData;XP] + $get[xpReward]]]
        $!jsonSet[playData;MC;$math[$env[playData;MC] + 1000]]

        $if[$and[$env[playData;tier]==17;$includes[$env[playData;currentAnimal];kingDragon;rareKingDragon]==false]; $c[If user is not a KD]
          $if[$arrayIncludes[currentApex;$get[opponentApex]];;
            $arrayPush[currentApex;$get[opponentApex]] $c[setting apex based on opponent's animal]
            $!jsonSet[playData;apex;$env[currentApex]]
          ]
        ]

        ${playSnippets.resetArena()}
        $let[showStats;true]
        $let[color;$getGlobalVar[luckyColor]]

      ;
      
        $if[$env[playData;opponentBitesInArena]>=10; $c[If opponent won]

          $addTextDisplay[## You lost]

          $!jsonSet[playData;currentAnimal;]
          ${playSnippets.resetArena()}

          $if[$and[$env[playData;tier]==17;$get[hasAllApex]];
            $!jsonSet[playData;XP;0];
            ${playSnippets.setNewXPOnDeath()}
          ]

          ${playSnippets.setNewTier()}
          ${playSnippets.removeAllApex()}

          ${playSnippets.respawnButton()}
          $addSeparator
          ${playSnippets.exitButton(false)}
          $let[color;$getGlobalVar[errorColor]]

        ;  $c[If arena still in progress]

          $if[$env[playData;arenaTurn]==1; $c[If opponent's turn]
            $!jsonSet[playData;arenaTurn;0]
            $addTextDisplay[## Your turn!]
            $addTextDisplay[### Choose:]
          ; 
            $!jsonSet[playData;arenaTurn;1]
            $addTextDisplay[## Opponent's turn!]
            $addTextDisplay[### He chose: $inlineCode[$toTitleCase[$get[opponentAction]]]]
          ]

          ${playSnippets.arenaActionButtons(true)}
          $addSeparator
          ${playSnippets.exitButton()}
          $let[color;$getGlobalVar[defaultColor]]
        ]
      ]

      $if[$get[showStats];
        ${playSnippets.actionMenu()}
        ${playSnippets.animalStats()}
        $addSeparator
        ${playSnippets.exitButton()}
      ]
    ;$get[color]]
    $interactionUpdate
    $setUserVar[userPlayData;$env[playData]]
  `
}