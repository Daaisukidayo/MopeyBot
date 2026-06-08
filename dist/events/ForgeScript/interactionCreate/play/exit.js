"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: "interactionCreate",
    allowedInteractionTypes: ["button"],
    code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;messagemissing,quit]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$arrayIncludes[IID;play]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    
    $jsonLoad[playData;$getUserVar[userPlayData]]
    $onlyif[$env[playData;started];
      $newError[$tl[$get[l];ui;play.noSession]]
    ]

    $switch[$env[IID;0];
      $case[messagemissing;
        $let[content;$tl[$get[l];ui;play.disconnected]]
        $if[$messageExists[$env[playData;ChannelID];$env[playData;MessageID]];
          $!deleteMessage[$env[playData;ChannelID];$env[playData;MessageID]]
        ]
      ]

      $case[quit;
        $onlyIf[$env[playData;MessageID]==$messageID]
        $let[content;$tl[$get[l];ui;play.exited]]
      ]
    ]

    $let[MC;$env[playData;MC]]
    $removePlayProgress

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$get[content]]
      $addTextDisplay[$tl[$get[l];ui;play.earned;$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate
  `
};
//# sourceMappingURL=exit.js.map