import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleShowList",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $let[ID;$findUser[$default[$option[user];$message];true]]

    $onlyIf[$userExists[$get[ID]];
      $newError[$tl[ui.points.invalidUser.$get[l]]]
    ]

    $onlyIf[$isBot[$get[ID]]==false;
      $newError[$tl[ui.points.userIsABot.$get[l]]]
    ]

    $jsonLoad[challengeProgress;$getProgress[$get[ID]]]

    $onlyIf[$jsonGet[challengeProgress;started];
      $if[$get[ID]!=$authorID;
        $newError[$tl[ui.points.noActiveChallengeUser.$get[l];$username[$get[ID]]]]
      ;
        $newError[$tl[ui.points.noActiveChallengeAuthor.$get[l]]]
      ]
    ]

    $jsonLoad[result;$generateList[$jsonGet[challengeProgress;raresList]]]

    $c[The user's profile is shown, in the author's language]
    $jsonLoad[userProfile;$getProfile[$get[ID]]]
    $!jsonSet[userProfile;language;$get[l]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$showPoints[challengeProgress]]
      $addTextDisplay[$showRares[challengeProgress]]
      $addTextDisplay[$showPredict[challengeProgress;$get[ID]]]
      $addTextDisplay[$showTime[$get[ID]]]
      $addSeparator[Large]
      $showDesignedList[$jsonGet[result;l]]
    ;$getGlobalVar[luckyColor]]
  `
})
