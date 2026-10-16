"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addSoccerSection",
    description: "Adds a text with the soccer's picture (res/img/play/soccer) as its thumbnail",
    brackets: true,
    params: [
        {
            name: "soccerType",
            description: "The soccer type (e.g. 'pumpkin', 'umbrella', 'beachball')",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "soccerId",
            description: "The ID of the soccer item",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "text",
            description: "The text next to the picture",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $attachment[res/img/play/soccer/$env[soccerType]/$env[soccerId].png;soccer.png]
    $addSection[
      $addTextDisplay[$env[text]]
      $addThumbnail[attachment://soccer.png]
    ]
  `,
});
//# sourceMappingURL=addSoccerSection.js.map