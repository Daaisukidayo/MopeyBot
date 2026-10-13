"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "play_leave",
    type: "interactionCreate",
    allowed: ["button"],
    code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    
    $jsonLoad[playData;$getUserVar[userPlayData]]
    $onlyIf[$jsonGet[playData;started];
      $newError[$tl[ui.play.noSession.$get[l]]]
    ]

    $switch[$jsonGet[IID;1];
      $case[disconnect;
        $let[content;$tl[ui.play.disconnected.$get[l]]]
        $if[$messageExists[$jsonGet[playData;ChannelID];$jsonGet[playData;MessageID]];
          $!deleteMessage[$jsonGet[playData;ChannelID];$jsonGet[playData;MessageID]]
        ]
      ]

      $case[quit;
        $onlyIf[$jsonGet[playData;MessageID]==$messageID]
        $let[content;$tl[ui.play.exited.$get[l]]]
      ]
    ]

    $let[MC;$jsonGet[playData;MC]]
    $removePlayProgress[playData]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$get[content]]
      $addTextDisplay[$tl[ui.play.earned.$get[l];$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate
  `
});
//# sourceMappingURL=exit.js.map