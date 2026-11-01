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

    $jsonLoad[categories;$getGlobalVar[raretryCategories]]
    $getCache[rares;raretryCategoryOf;categoryOf]
    $arrayLoad[desc]
    $arrayLoad[caught]
    $let[totalReward;0]

    $c[devs can pass a luck multiplier]
    $let[arg;$message[0]]
    $let[luck;$if[$and[$isNumber[$get[arg]];$isDev];$get[arg];1]]

    $arrayForEach[$jsonEntries[$generateLuck[$getGlobalVar[rtrLuckKey];$get[luck]]];entry;
      $jsonLoad[rolled;$arrayWeightedRandom[$jsonGet[entry;1;pool];weight]]
      $let[animalId;$jsonGet[rolled;id]]

      $c[only rares count, a common or null is a miss. rares show their category color + pool chance]
      $if[$getAnimalInfo[$get[animalId];isRare]==true;
        $let[colorEmoji;$jsonGet[categories;$jsonGet[categoryOf;$get[animalId]];emoji]]
        $let[chance;$fraction[$getAnimalInfo[$get[animalId];rarity.0];$jsonGet[entry;1;total]]]
        $c[every rare pays rtrRewardPerChance x N (1 in N), so on avg each one's worth the same]
        $let[MC;$round[$math[$getGlobalVar[rtrRewardPerChance] * $jsonGet[entry;1;total] / $getAnimalInfo[$get[animalId];rarity.0]]]]
        $letSum[totalReward;$get[MC]]
        $arrayPushJSON[caught;$objectOf[id;$get[animalId];chance;$round[$math[$jsonGet[entry;1;total] / $getAnimalInfo[$get[animalId];rarity.0]]]]]
        $arrayPush[desc;## $get[colorEmoji]$getAnimalInfo[$get[animalId];emoji;0] | \`$get[chance]\`$if[$get[MC]>0; | \`$separate[$get[MC]]\`$getGlobalVar[mopecoin]]]
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
        $callMethod[userProfile;addCoins;$get[totalReward]]
      ]
    ;$getGlobalVar[luckyColor]]

    $c[log to history/stats unless a dev boosted the luck, recordDevRolls turns that off for testing]
    $if[$or[$get[luck]==1;$getGlobalVar[recordDevRolls]];
      $recordRoll[raretryrun;$objectOf[at;$getTimestamp;rares;$env[caught];mope_coins;$get[totalReward]]]
    ]

    $c[count catches for the daily quest till it's done]
    $if[$jsonSize[desc]>0;
      $countDailyRares[raretryrun;$jsonSize[desc]]
      $callMethod[userProfile;save]
    ]
  `,
});
//# sourceMappingURL=raretryRun.js.map