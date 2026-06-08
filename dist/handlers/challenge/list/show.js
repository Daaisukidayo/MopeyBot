"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleShowList',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $let[ID;$findUser[$default[$option[user];$message];true]]

    $onlyIf[$userExists[$get[ID]];
      $newError[$tl[$get[l];ui;points.invalidUser]]
    ]

    $onlyIf[$isBot[$get[ID]]==false;
      $newError[$tl[$get[l];ui;points.userIsABot]]
    ]

    $jsonLoad[challengeProgress;$getProgress[$get[ID]]]

    $onlyIf[$env[challengeProgress;started];
      $if[$get[ID]!=$authorID;
        $newError[$tl[$get[l];ui;points.noActiveChallengeUser;$username[$get[ID]]]]
      ;
        $newError[$tl[$get[l];ui;points.noActiveChallengeAuthor]]
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
};
//# sourceMappingURL=show.js.map