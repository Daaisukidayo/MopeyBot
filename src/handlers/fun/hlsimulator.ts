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

    $c[each group rolls as many times as an hour of play gives]
    $arrayForEach[$jsonEntries[$generateLuck[$getGlobalVar[hlSimKey]]];entry;
      $jsonLoad[pool;$jsonGet[entry;1;pool]]
      $let[attempts;$default[$jsonGet[$arrayFind[totalAttempts;att;$arrayIncludes[$jsonGet[att;0];$jsonGet[entry;0]]];1];0]]

      $loop[$get[attempts];
        $c[commons and nulls roll too, only what hlSimData allows counts]
        $jsonLoad[rolled;$arrayWeightedRandom[pool;weight]]
        $let[animalId;$jsonGet[rolled;id]]

        $if[$jsonGet[hlSimData;$get[animalId]];$jsonMath[rawList;$get[animalId];1]]
      ]
    ]

    $c[over the cap counts as the cap. no animal is in 2 groups, so clamp once at the end]
    $arrayForEach[$jsonEntries[rawList];e;
      $!jsonSet[rawList;$jsonGet[e;0];$limitRareCount[$jsonGet[e;1];$jsonGet[e;0];$get[difficulty]]]
    ]

    $addChallengeCompletedContainer[$env[rawList]]
  `,
})
