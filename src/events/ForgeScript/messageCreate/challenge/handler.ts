import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "messageCreate",
  code: `
    $c[Only a message starting with a rare counts. Most don't, so this is checked first, against the cached rares]
    $getCache[rares;activeRares;activeRares]
    $arrayLoad[providedRares; ;$toLowerCase[$message]]
    $onlyIf[$arrayIncludes[activeRares;$jsonGet[providedRares;0]]]

    $jsonLoad[challengeProgress;$getProgress]
    $onlyIf[$jsonGet[challengeProgress;started]==true]
    $onlyIf[$startsWith[$messageContent;$getPrefix]==false]

    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $c[Limits per difficulty (see cacheAllRares)]
    $getCache[rares;categoryLimits;categoryLimits]
    $let[difficulty;$jsonGet[challengeProgress;difficulty]]

    $jsonLoad[caught;$objectOf]
    $arrayLoad[reachedLimitContent]
    $let[points;0]

    $c[Only the words that are rares count]
    $arrayForEach[$arrayFilter[providedRares;word;$arrayIncludes[activeRares;$env[word]]];providedRare;
      $let[animalId;$getRareAnimalID[$env[providedRare]]]
      $jsonLoad[rare;$getChallengeRare[$get[animalId]]]
      $let[limit;$jsonGet[categoryLimits;$get[difficulty];$jsonGet[rare;category]]]
      $let[count;$default[$jsonGet[challengeProgress;raresList;$get[animalId]];0]]

      $c[An unlimited rare is always added, a limited one only below its limit]
      $if[$or[$get[limit]==;$get[count]<$get[limit]];
        $letSum[points;$jsonGet[rare;points]]
        $jsonMath[caught;$get[animalId];points;$jsonGet[rare;points]]
        $jsonMath[caught;$get[animalId];quantity;1]
        $jsonMath[challengeProgress;raresList;$get[animalId];1]

        $c[Tells when this rare has just reached its limit]
        $if[$math[$get[count] + 1]==$get[limit];
          $arrayPush[reachedLimitContent;$tl[ui.challenge.reachedLimit.$get[l];$getAnimalInfo[$get[animalId];emoji;0]]]
        ]
      ]
    ]

    $onlyIf[$get[points]>0]

    $arrayMap[$jsonEntries[caught];entry;
      $return[## - $getAnimalInfo[$jsonGet[entry;0];emoji;0]\`$jsonGet[entry;1;quantity]\` «\`+$jsonGet[entry;1;points]\`»]
    ;raresContent]

    $c[Totals come from the whole list, every message is an event for the prediction]
    $objectMerge[challengeProgress;$sumRaresList[$jsonGet[challengeProgress;raresList]]]
    $arrayPushAt[challengeProgress;events;$arrayOf[$getChallengeTimer;$jsonGet[challengeProgress;points]]]

    $c[A rare sent during a pause resumes the challenge]
    $let[paused;$jsonGet[challengeProgress;paused]]
    $!jsonSet[challengeProgress;paused;false]
    $saveProgress[$env[challengeProgress]]
    $if[$get[paused];$resumeChallengeTimer]

    $addContainer[
      $addAuthorDisplay

      $if[$jsonSize[reachedLimitContent]>0;
        $addTextDisplay[$arrayJoin[reachedLimitContent;\n]]
        $addSeparator[Small]
      ]

      $addTextDisplay[$cropText[$arrayJoin[raresContent;\n];0;3700;...]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints[challengeProgress] «\`+$get[points]\`»]
      $addTextDisplay[$showPredict[challengeProgress]]
      $addTextDisplay[$showTime]
    ;$getGlobalVar[luckyColor]]
    $displayLimitedRares[challengeProgress]
  `
})
