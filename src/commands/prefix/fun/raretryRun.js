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

    $jsonLoad[funcCache;{}]
    $jsonLoad[rtrRewardPerRare;$getGlobalVar[rtrRewardPerRare]]
    $jsonLoad[generatedLuckEntries;$advJsonEntries[$generateLuck[$getGlobalVar[rtrLuckKey]]]]
    $let[lastDailyRaretryrun;$default[$env[userProfile;limiters;lastDailyRaretryrun];-1]]

    $arrayLoad[desc]
    $let[total;0]
    $let[chance;3]

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

        $if[$get[chance]>=$get[percent];
          $let[CL;🍀]
        ]

        $let[MC;$default[$env[rtrRewardPerRare;$get[animalID]];0]]

        $if[$get[MC]>0;
          $letSum[total;$get[MC]]
          $let[extra; | \`$get[MC]\`$getGlobalVar[emoji]]
        ]

        $if[$get[lastDailyRaretryrun]!=$day;
          $setUserVar[caughtRaresInRaretryrun;$math[$getUserVar[caughtRaresInRaretryrun] + 1]]
          $if[$getUserVar[caughtRaresInRaretryrun]>=$getGlobalVar[maxRaretryrunRares];
            $!jsonSet[userProfile;limiters;lastDailyRaretryrun;$day]
            $let[lastDailyRaretryrun;$day]

            $async[
              $wait[1s]
              $sendMessage[$channelID;$tl[ui.special.caughtRares;<@$authorID>;$getGlobalVar[maxRaretryrunRares];$commandName]]
            ]
          ]
        ]

        $return[## _$get[animalDisplay]$get[CL] | \`$get[numberOfRares]/$get[totalAttempts]\`$get[extra]_]
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
        $saveProfile
      ]
    ;$getGlobalVar[luckyColor]]
  `
}