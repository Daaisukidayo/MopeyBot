"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "isPlaying",
    params: [
        {
            name: "playDataVar",
            description: "var w/ the play data",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $c[the game has to be in this exact msg]
    $onlyIf[$and[$jsonGet[playData;is_started];$jsonGet[playData;path]==$guildID/$channelID/$messageID];$interactionFail]

    $c[held soccer got removed from the game? drop it]
    $if[$jsonGet[playData;held_soccer]!=;
      $arrayLoad[heldSoccer;_;$jsonGet[playData;held_soccer]]
      $if[$getPlaySoccer[$jsonGet[heldSoccer;0];$jsonGet[heldSoccer;1]]==;
        $callMethod[playData;dropSoccer]
      ]
    ]

    $c[component ids end w/ their screen (see playID), modal ids w/ the author since the click that opened it was already checked. a stale screen (missed update, double click) just redraws the current one]
    $arrayLoad[clickedID;-;$customID]
    $let[clickedScreen;$jsonGet[clickedID;-1]]
    $let[isOldScreen;$and[$get[clickedScreen]!=$authorID;$get[clickedScreen]!=$jsonGet[playData;screen]]]
    $callMethod[playData;nextScreen]
    $if[$get[isOldScreen];
      $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
      $addContainer[
        $addPlayScreen[playData;userWardrobe]
      ;$getBiomeColor[playData]]
      $updatePlayData[playData]
      $interactionUpdate
      $stop
    ]
  `,
});
//# sourceMappingURL=isPlaying.js.map