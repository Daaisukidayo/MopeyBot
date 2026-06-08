"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleRaretryrun',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[rtrRewardPerRare;$getGlobalVar[rtrRewardPerRare]]
    $jsonLoad[generatedLuckEntries;$advJsonEntries[$generateLuck[$getGlobalVar[rtrLuckKey]]]]
    $arrayCreate[desc]

    $let[lastDailyRaretryrun;$default[$env[userProfile;limiters;lastDailyRaretryrun];-1]]
    $let[chance;3]
    $let[totalReward;0]
    $let[caughtCount;0]

    $arrayForEach[generatedLuckEntries;entry;
      $jsonLoad[groupData;$env[entry;1]]
      $jsonLoad[pool;$env[groupData;pool]]
      $let[roll;$random[1;$env[groupData;total]]]
      $let[chosenAnimal;]
      
      $loop[$arrayLength[pool];
        $jsonLoad[item;$arrayAt[pool;$math[$env[i] - 1]]]
        $if[$get[roll]<=$env[item;rarity];
          $let[chosenAnimal;$env[item;id]]
          $break
        ]
      ;i;true]
      

      $if[$and[$get[chosenAnimal]!=;$getAnimalInfo[$get[chosenAnimal];isRare]];
        $letSum[caughtCount;1]
        
        $let[animalDisplay;$getAnimalVariantInfo[$get[chosenAnimal];emoji;0]]
        $let[numberOfRares;$getAnimalInfo[$get[chosenAnimal];rarity.0]]
        $let[totalAttempts;$env[groupData;total]]
        
        $let[percent;$round[$math[$get[numberOfRares] / $get[totalAttempts] * 100];3]]
        
        $let[CL;]
        $if[$get[chance]>=$get[percent];$let[CL;🍀]]

        $let[MC;$default[$env[rtrRewardPerRare;$get[chosenAnimal]];0]]
        $let[extra;]

        $if[$get[MC]>0;
          $letSum[totalReward;$get[MC]]
          $let[extra; | \`$separate[$get[MC]]\`$getGlobalVar[emoji]]
        ]

        $arrayPush[desc;## $get[CL]$get[animalDisplay] | \`$get[percent]%\`$get[extra]]
      ]
    ]
  
    $if[$arrayLength[desc]==0;
      $arrayPush[desc;$tl[$get[l];ui;raretryrun.nothing]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;raretryrun.title]]
      $addSeparator
      $addTextDisplay[**$arrayJoin[desc;\n]**]

      $if[$get[totalReward]>0;
        $addSeparator
        $addTextDisplay[$tl[$get[l];ui;raretryrun.total;$separate[$get[totalReward]]]]
        $sumCash[$get[totalReward]]
      ]
    ;$getGlobalVar[luckyColor]]

    $if[$get[caughtCount]>0;
      $if[$get[lastDailyRaretryrun]!=$calendarDay;
        $setUserVar[caughtRaresInRaretryrun;$math[$getUserVar[caughtRaresInRaretryrun] + $get[caughtCount]]]
        $if[$getUserVar[caughtRaresInRaretryrun]>=$getGlobalVar[maxRaretryrunRares];
          $!jsonSet[userProfile;limiters;lastDailyRaretryrun;$calendarDay]

          $async[
            $wait[1s]
            $sendMessage[$channelID;
              $addTextDisplay[$tl[$get[l];ui;special.caughtRares;<@$authorID>;$getGlobalVar[maxRaretryrunRares];raretryrun]]
            ]
          ]
        ]
      ]
      $saveProfile
    ]
  `
};
//# sourceMappingURL=raretryRun.js.map