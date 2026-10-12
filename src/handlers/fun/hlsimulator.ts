import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleHLSimulator",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile

    $let[difficulty;$pickLocalizedOption[data.difficulties;$nullish[$option[difficulty];$message;$getGlobalVar[defaultDifficulty]];$getGlobalVar[difficulties];ui.hlsimulator.unknownDifficulty]]

    $addCooldown
    $defer

    $getCache[rares;hlSimData;hlSimData]
    $jsonLoad[totalAttempts;$eval[$getGlobalVar[hlSimAttempts];false]]
    $jsonLoad[rawList;$objectOf]

    $c[Every group rolls as many times as an hour of play gives it]
    $arrayForEach[$jsonEntries[$generateLuck[$getGlobalVar[hlSimKey]]];entry;
      $jsonLoad[pool;$jsonGet[entry;1;pool]]
      $let[attempts;$default[$jsonGet[$arrayFind[totalAttempts;att;$arrayIncludes[$jsonGet[att;0];$jsonGet[entry;0]]];1];0]]

      $loop[$get[attempts];
        $c[A common animal or nothing (null) is rolled too: only what hlSimData allows is counted]
        $jsonLoad[rolled;$arrayWeightedRandom[pool;weight]]
        $let[animalId;$jsonGet[rolled;id]]

        $if[$jsonGet[hlSimData;$get[animalId]];$jsonMath[rawList;$get[animalId];1]]
      ]
    ]

    $c[A rare above its limit counts as the limit. No animal is in two groups, so the limit is applied once, at the end]
    $arrayForEach[$jsonEntries[rawList];e;
      $!jsonSet[rawList;$jsonGet[e;0];$limitRareCount[$jsonGet[e;1];$jsonGet[e;0];$get[difficulty]]]
    ]

    $addChallengeCompletedContainer[$env[rawList]]
  `
})
