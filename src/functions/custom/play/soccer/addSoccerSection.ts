import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addSoccerSection",
  description: "Adds a text with the soccer's picture (res/img/play/soccer) as its thumbnail",
  brackets: true,
  params: [
    {
      name: "soccerType",
      description: "The soccer type (e.g. 'pumpkin', 'umbrella', 'beachball')",
      type: ArgType.String
    },
    {
      name: "soccerId",
      description: "The ID of the soccer item",
      type: ArgType.Number
    },
    {
      name: "text",
      description: "The text next to the picture",
      type: ArgType.String
    }
  ],
  code: `
    $attachment[res/img/play/soccer/$env[soccerType]/$env[soccerId].png;soccer.png]
    $addSection[
      $addTextDisplay[$env[text]]
      $addThumbnail[attachment://soccer.png]
    ]
  `
})
