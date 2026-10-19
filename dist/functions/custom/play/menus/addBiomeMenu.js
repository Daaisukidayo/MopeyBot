"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addBiomeMenu",
    description: "Adds the menu to move to a neighbouring biome",
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[biome;$jsonGet[playData;biome]]

    $addActionRow
    $addStringSelectMenu[play_moveToBiome-$authorID;$tl[ui.play.selectMenuPlaceholderSwitchBiome.$get[l]]]

    $if[$get[biome]!=0;
      $addOption[$tl[data.biomes.0.$get[l]];;0;⛰️]
    ;
      $addOption[$tl[data.biomes.5.$get[l]];;5;🌋]
    ]
    $if[$isOneOf[$get[biome];2;5];;
      $addOption[$tl[data.biomes.2.$get[l]];;2;🌊]
    ]
    $if[$isOneOf[$get[biome];1;3;5];;
      $addOption[$tl[data.biomes.1.$get[l]];;1;🏜️]
      $addOption[$tl[data.biomes.3.$get[l]];;3;❄️]
    ]
    $if[$isOneOf[$get[biome];4;5];;
      $addOption[$tl[data.biomes.4.$get[l]];;4;🌲]
    ]
  `,
});
//# sourceMappingURL=addBiomeMenu.js.map