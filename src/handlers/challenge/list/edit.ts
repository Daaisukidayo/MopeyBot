import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleEditlist",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown

    $jsonLoad[challengeProgress;$getProgress]
    $isActiveChallenge[challengeProgress]

    $getCache[rares;activeRares;activeRares]

    $c[A rare, + or -, and a count or "all"]
    $let[arg1;$toLowerCase[$default[$option[rare];$message[0]]]]
    $let[arg2;$default[$option[action];$message[1]]]
    $let[arg3;$toLowerCase[$default[$option[count];$message[2]]]]

    $onlyIf[$and[$get[arg1]!=;$isOneOf[$get[arg2];+;-]];
      $let[prefix;$getPrefix]
      $newError[$tl[ui.errors.usage.$get[l];$get[prefix]editlist <$tl[ui.args.shortRaresName.$get[l]]> [+ | -\\] <$tl[ui.args.amount.$get[l]]>]]
    ]

    $onlyIf[$arrayIncludes[activeRares;$get[arg1]];
      $newError[$tl[ui.editlist.invalidRare.$get[l];$get[arg1]]]
    ]

    $c["all" only removes, any other count is a positive number]
    $onlyIf[$or[$and[$get[arg3]==all;$get[arg2]==-];$and[$isNumber[$get[arg3]];$get[arg3]>0]];
      $newError[$tl[ui.editlist.invalidNumber.$get[l]]]
    ]

    $let[animalId;$getRareAnimalID[$get[arg1]]]
    $let[animalDisplay;$getAnimalInfo[$get[animalId];emoji;0]]
    $let[oldQuantity;$default[$jsonGet[challengeProgress;raresList;$get[animalId]];0]]

    $onlyIf[$or[$get[arg2]==+;$jsonGet[challengeProgress;raresList;$get[animalId]]!=];
      $newError[$tl[ui.editlist.notInList.$get[l];$get[animalDisplay]]]
    ]

    $defer

    $c["all", or a count that leaves nothing, removes the rare. A new count above the limit becomes the limit]
    $let[newQuantity;$if[$get[arg3]==all;0;$math[$get[oldQuantity] $get[arg2] $get[arg3]]]]
    $if[$get[newQuantity]<=0;
      $let[updatedQuantity;0]
      $!jsonDelete[challengeProgress;raresList;$get[animalId]]
    ;
      $let[updatedQuantity;$limitRareCount[$get[newQuantity];$get[animalId];$jsonGet[challengeProgress;difficulty]]]
      $!jsonSet[challengeProgress;raresList;$get[animalId];$get[updatedQuantity]]
    ]

    $jsonLoad[result;$generateList[$jsonGet[challengeProgress;raresList]]]

    $c[Nothing changed: the count the user tried is shown. A change is saved and shows how much really changed]
    $if[$get[oldQuantity]==$get[updatedQuantity];
      $let[state;failed]
      $let[count;$if[$get[arg3]==all;$get[oldQuantity];$get[arg3]]]
    ;
      $let[state;$if[$get[arg2]==+;added;removed]]
      $let[count;$abs[$math[$get[updatedQuantity] - $get[oldQuantity]]]]
      $objectMerge[challengeProgress;$objectOf[points;$jsonGet[result;p];rares;$jsonGet[result;r]]]
      $saveProgress[$env[challengeProgress]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.editlist.$get[state].$get[l];$get[count];$get[animalDisplay]]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints[challengeProgress]]
      $addTextDisplay[$showRares[challengeProgress]]
      $addTextDisplay[$showTime]
      $addSeparator[Large]
      $showDesignedList[$jsonGet[result;l]]
    ;$getGlobalVar[luckyColor]]
  `
})
