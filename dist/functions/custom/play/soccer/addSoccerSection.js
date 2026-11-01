"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addSoccerSection",
    description: "adds a text w/ the soccer's pic (res/assets/play/soccer) as its thumbnail",
    brackets: true,
    params: [
        {
            name: "soccerType",
            description: "the soccer type, like 'pumpkin', 'umbrella' or 'beachball'",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "soccerId",
            description: "the soccer item's ID",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "text",
            description: "the text next to the pic",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $attachment[res/assets/play/soccer/$env[soccerType]/$env[soccerId].png;soccer.png]
    $addSection[
      $addTextDisplay[$env[text]]
      $addThumbnail[attachment://soccer.png]
    ]
  `,
});
//# sourceMappingURL=addSoccerSection.js.map