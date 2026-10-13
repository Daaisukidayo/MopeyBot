"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addArenaDevMenu",
    description: "Adds dev menus to set the player's and opponent's arena bites (tester mode only)",
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String
        }
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $if[$jsonGet[userProfile;testerMode];;$return]

    $jsonLoad[bitesOptions;$arrayRange[0;10]]

    $addActionRow
    $addStringSelectMenu[play_devActions-arenaBites-$authorID;Dev: my bites (now $jsonGet[playData;arena;bites])]
    $arrayForEach[bitesOptions;count;
      $addOption[$env[count];$if[$env[count]==10;Win on the next action];$env[count];🦷]
    ]

    $addActionRow
    $addStringSelectMenu[play_devActions-arenaOpponentBites-$authorID;Dev: opponent bites (now $jsonGet[playData;arena;opponentBites])]
    $arrayForEach[bitesOptions;count;
      $addOption[$env[count];$if[$env[count]==10;Lose on the next action];$env[count];🩸]
    ]
  `
});
//# sourceMappingURL=addArenaDevMenu.js.map