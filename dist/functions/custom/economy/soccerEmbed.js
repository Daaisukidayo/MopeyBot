"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "soccerEmbed",
    code: `
    $defer

    $let[l;$jsonGet[userProfile;language]]
    $let[cmd;$commandName]

    $jsonLoad[soccerData;$readFile[res/data/$get[cmd]s.json]]
    
    $let[lastI;$math[$jsonSize[soccerData] - 1]]
    $let[arg;$message]

    $let[target;$if[$and[$get[arg]!=;$isNumber[$get[arg]];$isDev;$get[arg]>-1;$get[arg]<=$get[lastI]];$get[arg];-1]]

    $c[Rarest first: the first successful 1/rarity roll wins, the last (rarity 1) always passes. A developer picks the item by ID]
    $jsonLoad[data;$arrayFind[soccerData;item;$or[$jsonGet[item;ID]==$get[target];$and[$get[target]==-1;$randomNumber[1;$math[$jsonGet[item;rarity] + 1]]==1]]]]

    $let[rarity;$jsonGet[data;rarity]]
    $attachment[res/img/soccer/$get[cmd]s/$jsonGet[data;ID].png;thumbnail.png]
    $let[MC;$random[$jsonGet[data;MC;0];$jsonGet[data;MC;1]]]
    $let[display;$tl[data.$get[cmd]s.$jsonGet[data;ID].$get[l]]]
    $let[color;$jsonGet[data;color]]

    $sumCash[$get[MC]]
    $saveProfile[$env[userProfile]]

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[$tl[ui.$get[cmd].saw.$get[l];$get[display]]]
        $addTextDisplay[$tl[ui.$get[cmd].earned.$get[l];$separate[$get[MC]]]]
        $addThumbnail[attachment://thumbnail.png]
      ]
      $if[$get[rarity]!=1;
        $addSeparator
        $addTextDisplay[$tl[ui.$get[cmd].rarity.$get[l];1;$get[rarity]]]
      ]
    ;$get[color]]
  `,
});
//# sourceMappingURL=soccerEmbed.js.map