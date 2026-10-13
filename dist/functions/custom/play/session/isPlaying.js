"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "isPlaying",
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String
        }
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $c[The game goes on in this very message]
    $onlyIf[$and[$jsonGet[playData;started];$jsonGet[playData;MessageID]==$messageID;$jsonGet[playData;ChannelID]==$channelID];$interactionFail]

    $c[A held soccer removed from the game is dropped]
    $if[$jsonGet[playData;heldSoccer]!=;
      $arrayLoad[heldSoccer;_;$jsonGet[playData;heldSoccer]]
      $if[$getPlaySoccer[$jsonGet[heldSoccer;0];$jsonGet[heldSoccer;1]]==;
        $!jsonDelete[playData;heldSoccer]
      ]
    ]
  `
});
//# sourceMappingURL=isPlaying.js.map