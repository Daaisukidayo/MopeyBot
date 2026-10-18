import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "messageCreate",
  code: `
    $jsonLoad[challengeProgress;$getProgress]
    $onlyIf[$jsonGet[challengeProgress;started]==true]
    $onlyIf[$startsWith[$messageContent;$getPrefix]==false]

    $getCache[rares;activeRares;activeRares]
    $arrayLoad[providedRares; ;$toLowerCase[$message]]
    $onlyIf[$arrayIncludes[activeRares;$jsonGet[providedRares;0]]]


    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $c[Only the words that are rares count]
    $jsonLoad[added;$callMethod[challengeProgress;addRares;$getChallengeTimer;$arrayMap[$arrayFilter[providedRares;word;$arrayIncludes[activeRares;$env[word]]];word;$return[$getRareAnimalID[$env[word]]]]]]
    $onlyIf[$jsonGet[added;points]>0]

    $arrayMap[$jsonGet[added;reachedLimit];animalId;
      $return[$tl[ui.challenge.reachedLimit.$get[l];$getAnimalInfo[$env[animalId];emoji;0]]]
    ;reachedLimitContent]

    $arrayMap[$jsonEntries[$jsonGet[added;caught]];entry;
      $return[## - $getAnimalInfo[$jsonGet[entry;0];emoji;0]\`$jsonGet[entry;1;quantity]\` «\`+$jsonGet[entry;1;points]\`»]
    ;raresContent]

    $c[A rare sent during a pause resumes the challenge]
    $let[paused;$jsonGet[challengeProgress;paused]]
    $setField[challengeProgress;paused;false]
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
      $addTextDisplay[$showPoints[challengeProgress] «\`+$jsonGet[added;points]\`»]
      $addTextDisplay[$showPredict[challengeProgress]]
      $addTextDisplay[$showTime]
    ;$getGlobalVar[luckyColor]]
    $displayLimitedRares[challengeProgress]
  `,
})
