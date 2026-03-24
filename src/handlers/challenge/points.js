export default {
  name: 'handlePoints',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $let[ID;$findUser[$default[$option[user];$message];true]]
    $let[lang;$env[userProfile;language]]

    $onlyIf[$userExists[$get[ID]];
      $newError[$tl[ui.points.invalidUser]]
    ]

    $onlyIf[$isBot[$get[ID]]==false;
      $newError[$tl[ui.points.userIsABot]]
    ]

    $jsonLoad[challengeProgress;$getProgress[$get[ID]]]

    $onlyIf[$env[challengeProgress;started];
      $if[$get[ID]!=$authorID;
        $newError[$tl[ui.points.noActiveChallengeUser;$username[$get[ID]]]]
      ;
        $newError[$tl[ui.points.noActiveChallengeAuthor]]
      ]
    ]

    $jsonLoad[events;$env[challengeProgress;events]]
    $jsonLoad[raresList;$env[challengeProgress;list]]
    $jsonLoad[result;$generateList[$sortList[$env[raresList]]]]
    $jsonLoad[userProfile;$getProfile[$get[ID]]]
    $jsonLoad[list;$env[result;l]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$showPoints[$get[ID]]]
      $addTextDisplay[$showRares[$get[ID]]]
      $addTextDisplay[$showPredict[$get[ID]]]
      $addTextDisplay[$showTime[$get[ID]]]
      $addSeparator[Large]
      $showDesignedList[$env[list]]
    ;$getGlobalVar[luckyColor]]
  `
}