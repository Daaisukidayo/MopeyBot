import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
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
    $arrayLoad[cards]
    $arrayLoad[caught]

    $c[devs can pass a luck multiplier]
    $let[arg;$message[0]]
    $let[luck;$if[$and[$isNumber[$get[arg]];$isDev];$get[arg];1]]

    $arrayForEach[$jsonEntries[$generateLuck[$getGlobalVar[rtrLuckKey];$get[luck]]];entry;
      $jsonLoad[rolled;$arrayWeightedRandom[$jsonGet[entry;1;pool];weight]]
      $let[animalId;$jsonGet[rolled;id]]

      $c[only rares count, a common or null is a miss. rares show their category color + pool chance on the picture]
      $if[$getAnimalInfo[$get[animalId];isRare]==true;
        $let[chance;$fraction[$getAnimalInfo[$get[animalId];rarity.0];$jsonGet[entry;1;total]]]
        $c[every rare pays rtrRewardPerChance x N (1 in N), so on average each one's worth the same]
        $let[MC;$round[$math[$getGlobalVar[rtrRewardPerChance] * $jsonGet[entry;1;total] / $getAnimalInfo[$get[animalId];rarity.0]]]]
        $arrayPushJSON[caught;$objectOf[id;$get[animalId];chance;$round[$math[$jsonGet[entry;1;total] / $getAnimalInfo[$get[animalId];rarity.0]]]]]
        $arrayPushJSON[cards;$objectOf[id;$get[animalId];chance;$get[chance];MC;$get[MC];color;$jsonGet[categories;$jsonGet[categoryOf;$get[animalId]];color]]]
      ]
    ]

    $let[totalReward;$arraySum[cards;MC]]
    $if[$jsonSize[cards]>0;$let[image;$raretryrunCard[$env[cards]]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.raretryrun.title.$get[l]]]
      $addSeparator
      $if[$get[image]!=;
        $addMediaGallery[$addMediaItem[$get[image];$arrayJoin[$arrayMap[cards;card;$return[$getAnimalInfo[$jsonGet[card;id];name;0] $jsonGet[card;chance]]];, ]]]
      ;
        $addTextDisplay[**$tl[ui.raretryrun.nothing.$get[l]]**]
      ]

      $if[$get[totalReward]>0;
        $addSeparator
        $addTextDisplay[$tl[ui.raretryrun.total.$get[l];$separate[$get[totalReward]]]]
        $callMethod[userProfile;addCoins;$get[totalReward]]
      ]
    ;$getGlobalVar[luckyColor]]

    $c[log to history/stats unless a dev boosted the luck, recordDevRolls records them anyway for testing]
    $if[$or[$get[luck]==1;$getGlobalVar[recordDevRolls]];
      $recordRoll[raretryrun;$objectOf[at;$getTimestamp;rares;$env[caught];mope_coins;$get[totalReward]]]
    ]

    $c[count catches for the daily quest until it's done]
    $if[$jsonSize[cards]>0;
      $countDailyRares[raretryrun;$jsonSize[cards]]
      $callMethod[userProfile;save]
    ]
  `,
})
