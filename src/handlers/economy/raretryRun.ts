import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'handleRaretryrun',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[rtrRewardPerRare;$getGlobalVar[rtrRewardPerRare]]
    $arrayCreate[desc]

    $let[lastDailyRaretryrun;$default[$env[userProfile;limiters;lastDailyRaretryrun];-1]]
    $let[chance;3]
    $let[totalReward;0]
    $let[caughtCount;0]
    $let[arg;$message[0]]
    $let[isDev;$checkCondition[$env[userProfile;devMode]==1]]
    $let[luckConfig;$function[
      $if[$and[$get[isDev];$get[arg]!=;$isNumber[$get[arg]]];
        $return[$get[arg]]
      ]
      $return[1]
    ]]

    $arrayForEach[$jsonEntries[$generateLuck[$getGlobalVar[rtrLuckKey];$get[luckConfig]]];entry;
      $jsonLoad[groupData;$env[entry;1]]
      $let[roll;$random[1;$env[groupData;total]]]
      $let[chosenAnimal;]
      
      $forOf[$env[groupData;pool];item;
        $if[$get[roll]<=$env[item;rarity];;$continue]

        $let[chosenAnimal;$env[item;id]]
        $break
      ]
      

      $if[$and[$get[chosenAnimal]!=;$getAnimalInfo[$get[chosenAnimal];isRare]];
        $letSum[caughtCount;1]
        
        $let[animalDisplay;$getAnimalInfo[$get[chosenAnimal];emoji;0]]
        $let[numberOfRares;$getAnimalInfo[$get[chosenAnimal];rarity.0]]
        $let[totalAttempts;$env[groupData;total]]
        
        $let[percent;$round[$math[$get[numberOfRares] / $get[totalAttempts] * 100];3]]
        
        $let[CL;]
        $if[$get[chance]>=$get[percent];$let[CL;🍀]]

        $let[MC;$default[$env[rtrRewardPerRare;$get[chosenAnimal]];0]]
        $let[extra;]

        $if[$get[MC]>0;
          $letSum[totalReward;$get[MC]]
          $let[extra; | \`$separate[$get[MC]]\`$getGlobalVar[mopecoin]]
        ]

        $arrayPush[desc;## $get[CL]$get[animalDisplay] | \`$get[percent]%\`$get[extra]]
      ]
    ]
  
    $if[$arrayLength[desc]==0;
      $arrayPush[desc;$tl[ui.raretryrun.nothing.$get[l]]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.raretryrun.title.$get[l]]]
      $addSeparator
      $addTextDisplay[**$arrayJoin[desc;\n]**]

      $if[$get[totalReward]>0;
        $addSeparator
        $addTextDisplay[$tl[ui.raretryrun.total.$get[l];$separate[$get[totalReward]]]]
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
              $addTextDisplay[$tl[ui.special.caughtRares.$get[l];<@$authorID>;$getGlobalVar[maxRaretryrunRares];raretryrun]]
            ]
          ]
        ]
      ]
      $saveProfile[$env[userProfile]]
    ]
  `
})