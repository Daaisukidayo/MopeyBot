export default {
  name: 'raretryrun',
  aliases: ['rtr'],
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[10s]

    $jsonLoad[rtrRewardPerRare;$getGlobalVar[rtrRewardPerRare]]
    $jsonLoad[generatedLuckEntries;$advJsonEntries[$generateLuck[$getGlobalVar[rtrLuckKey]]]]
    $arrayCreate[desc]

    $let[lastDailyRaretryrun;$default[$env[userProfile;limiters;lastDailyRaretryrun];-1]]
    $let[chance;3]
    $let[total;0]
    $let[caughtCount;0]

    $arrayMap[generatedLuckEntries;entry;
      $let[animalID;$advArrayRandomValue[$env[entry;1]]]
      $let[animalDisplay;$getAnimalVariantInfo[$get[animalID];emoji;0]]
      $let[isRare;$getAnimalInfo[$get[animalID];isRare]]
      $let[numberOfRares;$getAnimalInfo[$get[animalID];rarity.0]]
      $let[totalAttempts;$getAnimalInfo[$get[animalID];rarity.1]]
      $let[percent;$round[$math[$get[numberOfRares] / $get[totalAttempts] * 100];3]]
      $let[CL;]
      $let[extra;]
      $let[MC;0]

      $if[$and[$get[animalID]!=undefined;$get[isRare]];

        $letSum[caughtCount;1]

        $if[$get[chance]>=$get[percent];
          $let[CL;🍀]
        ]

        $let[MC;$default[$env[rtrRewardPerRare;$get[animalID]];0]]

        $if[$get[MC]>0;
          $letSum[total;$get[MC]]
          $let[extra; | \`$separate[$get[MC]]\`$getGlobalVar[emoji]]
        ]

        $return[## $get[CL]_$get[animalDisplay] | \`$get[numberOfRares]/$get[totalAttempts]\`$get[extra]_]
      ]
    ;desc]
  
    $if[$arrayLength[desc]==0;
      $arrayPush[desc;$tl[ui.$commandName.nothing]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.$commandName.title]]
      $addSeparator
      $addTextDisplay[**$arrayJoin[desc;\n]**]

      $if[$get[total]>0;
        $addSeparator
        $addTextDisplay[$tl[ui.$commandName.total;$separate[$get[total]]]]
        $sumCash[$get[total]]
      ]
    ;$getGlobalVar[luckyColor]]

    $if[$get[caughtCount]>0;

      $if[$get[lastDailyRaretryrun]!=$day;
        $setUserVar[caughtRaresInRaretryrun;$math[$getUserVar[caughtRaresInRaretryrun] + $get[caughtCount]]]
        $if[$getUserVar[caughtRaresInRaretryrun]>=$getGlobalVar[maxRaretryrunRares];
          $!jsonSet[userProfile;limiters;lastDailyRaretryrun;$day]

          $async[
            $wait[1s]
            $sendMessage[$channelID;$tl[ui.special.caughtRares;<@$authorID>;$getGlobalVar[maxRaretryrunRares];$commandName]]
          ]
        ]
      ]

      $saveProfile
    ]
  `
}