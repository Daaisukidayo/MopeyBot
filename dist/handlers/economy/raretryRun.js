"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleRaretryrun",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $jsonLoad[rtrRewardPerRare;$getGlobalVar[rtrRewardPerRare]]
    $arrayLoad[desc]
    $let[totalReward;0]

    $c[A developer can give a luck multiplier]
    $let[arg;$message[0]]
    $let[luck;$if[$and[$isNumber[$get[arg]];$isDev];$get[arg];1]]

    $arrayForEach[$jsonEntries[$generateLuck[$getGlobalVar[rtrLuckKey];$get[luck]]];entry;
      $jsonLoad[rolled;$arrayWeightedRandom[$jsonGet[entry;1;pool];weight]]
      $let[animalId;$jsonGet[rolled;id]]

      $c[Only a rare counts: the common animal or nothing (null) is a miss. A chance of 3% or less gets a clover]
      $if[$getAnimalInfo[$get[animalId];isRare]==true;
        $let[percent;$round[$math[$getAnimalInfo[$get[animalId];rarity.0] / $jsonGet[entry;1;total] * 100];3]]
        $let[MC;$default[$jsonGet[rtrRewardPerRare;$get[animalId]];0]]
        $letSum[totalReward;$get[MC]]
        $arrayPush[desc;## $if[$get[percent]<=3;🍀]$getAnimalInfo[$get[animalId];emoji;0] | \`$get[percent]%\`$if[$get[MC]>0; | \`$separate[$get[MC]]\`$getGlobalVar[mopecoin]]]
      ]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.raretryrun.title.$get[l]]]
      $addSeparator
      $addTextDisplay[**$if[$jsonSize[desc]>0;$arrayJoin[desc;\n];$tl[ui.raretryrun.nothing.$get[l]]]**]

      $if[$get[totalReward]>0;
        $addSeparator
        $addTextDisplay[$tl[ui.raretryrun.total.$get[l];$separate[$get[totalReward]]]]
        $sumCash[$get[totalReward]]
      ]
    ;$getGlobalVar[luckyColor]]

    $c[The daily task counts the catches until it is done]
    $if[$jsonSize[desc]>0;
      $if[$jsonGet[userProfile;limiters;lastDailyRaretryrun]!=$calendarDay;
        $if[$countDailyRares[raretryrun;$jsonSize[desc]];
          $!jsonSet[userProfile;limiters;lastDailyRaretryrun;$calendarDay]
        ]
      ]
      $saveProfile[$env[userProfile]]
    ]
  `
});
//# sourceMappingURL=raretryRun.js.map