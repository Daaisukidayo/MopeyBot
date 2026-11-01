import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "pushNewHistoryPage",
  description: "builds a new challenge history page from the given data and pushes it for the user",
  params: [
    {
      name: "newPageData",
      description: "the new page fields: points, rares, endDate, playType, difficulty, list",
      type: ArgType.Json,
    },
    {
      name: "userId",
      description: "the user's ID",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]

    $new[challengeHistory;ChallengeHistory;$get[userId]]
    $callMethod[challengeHistory;add;$env[newPageData]]
    $callMethod[challengeHistory;save]
  `,
})
