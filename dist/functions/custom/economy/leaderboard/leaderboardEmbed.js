"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "leaderboardEmbed",
    description: "Displays a page of the leaderboard with the buttons to the other pages.",
    params: [
        {
            name: "rowsVar",
            description: "The name of the variable that holds the rows of the page.",
            type: forgescript_1.ArgType.String
        },
        {
            name: "page",
            description: "The number of the page.",
            type: forgescript_1.ArgType.Number
        },
        {
            name: "maxPages",
            description: "How many pages there are.",
            type: forgescript_1.ArgType.Number
        },
        {
            name: "rowsPerPage",
            description: "How many rows a page has.",
            type: forgescript_1.ArgType.Number
        }
    ],
    code: `
    $ref[rows;$env[rowsVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[page;$env[page]]
    $let[rowsPerPage;$env[rowsPerPage]]

    $arrayMap[rows;elem;
      $return[$tl[ui.leaderboard.contentLine.$get[l];$getPositionEmoji[$jsonGet[elem;pos]];$username[$jsonGet[elem;ID]];$jsonGet[elem;MUID];$separate[$jsonGet[elem;MC]]]]
    ;content]
    
    $addContainer[
      $attachment[res/img/leaderboard/thumbnail.png;thumbnail.png]
      $addSection[
        $addTextDisplay[$tl[ui.leaderboard.title.$get[l]]]
        $addThumbnail[attachment://thumbnail.png]
      ]

      $addSeparator[Large]

      $addTextDisplay[$arrayJoin[content;\n]]

      $if[$env[maxPages]>1;
        $addSeparator[Large]

        $addActionRow
        $addButton[leaderboard-prevPage-$get[page]-$get[rowsPerPage]-$authorID;;Primary;⬅️]
        $addButton[leaderboard-customPage-$get[page]-$get[rowsPerPage]-$authorID;$tl[ui.leaderboard.pageButton.$get[l];$get[page];$env[maxPages]];Primary]
        $addButton[leaderboard-nextPage-$get[page]-$get[rowsPerPage]-$authorID;;Primary;➡️]
      ]
    ;$getGlobalVar[defaultColor]]
  `
});
//# sourceMappingURL=leaderboardEmbed.js.map