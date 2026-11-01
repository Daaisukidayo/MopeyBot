import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addSoccerSection",
  description: "adds a text w/ the soccer's pic (res/assets/play/soccer) as its thumbnail",
  brackets: true,
  params: [
    {
      name: "soccerType",
      description: "the soccer type, like 'pumpkin', 'umbrella' or 'beachball'",
      type: ArgType.String,
    },
    {
      name: "soccerId",
      description: "the soccer item's ID",
      type: ArgType.Number,
    },
    {
      name: "text",
      description: "the text next to the pic",
      type: ArgType.String,
    },
  ],
  code: `
    $attachment[res/assets/play/soccer/$env[soccerType]/$env[soccerId].png;soccer.png]
    $addSection[
      $addTextDisplay[$env[text]]
      $addThumbnail[attachment://soccer.png]
    ]
  `,
})
