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
    
    $jsonLoad[playData;$getPlayData]
    $onlyIf[$jsonGet[playData;is_started];
      $newError[$tl[ui.play.noSession.$get[l]]]
    ]

    $switch[$jsonGet[IID;1];
      $case[disconnect;
        $let[content;$tl[ui.play.disconnected.$get[l]]]
        $arrayLoad[path;/;$jsonGet[playData;path]]
        $if[$messageExists[$jsonGet[path;1];$jsonGet[path;2]];
          $!deleteMessage[$jsonGet[path;1];$jsonGet[path;2]]
        ]
      ]

      $case[quit;
        $onlyIf[$jsonGet[playData;path]==$guildID/$channelID/$messageID]
        $let[content;$tl[ui.play.exited.$get[l]]]
      ]
    ]

    $let[MC;$jsonGet[playData;mope_coins]]
    $removePlayProgress[playData]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$get[content]]
      $addTextDisplay[$tl[ui.play.earned.$get[l];$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate
  `,
});
//# sourceMappingURL=exit.js.map