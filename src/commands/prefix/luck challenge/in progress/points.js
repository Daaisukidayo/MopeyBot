export default {
  name: "points",
  aliases: ["pts", "score", "scr"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $let[ID;$findUser[$message;true]]
    $let[lang;$env[userProfile;language]]
    $jsonLoad[userProfile;$getProfile[$get[ID]]]

    $onlyIf[$userExists[$get[ID]];
      $newError[$tl[ui.points.invalidUser]]
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