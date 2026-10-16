import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "pushNewHistoryPage",
  description: "Creates and pushes a new challenge history page for a user using provided page data.",
  params: [
    {
      name: "newPageData",
      description: "JSON object containing new page fields: points, rares, endDate, playType, difficulty, list.",
      type: ArgType.Json,
    },
    {
      name: "userId",
      description: "The user ID.",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]

    $jsonLoad[newHistory;$getGlobalVar[baseHistoryPage]]
    $!jsonSet[newHistory;id;$randomUUID]
    $objectMerge[newHistory;$objectPick[newPageData;points;rares;endDate;playType;difficulty;raresList]]

    $jsonLoad[history;$getUserVar[challengeHistory;$get[userId]]]
    $arrayPushJSON[history;$env[newHistory]]
    $setUserVar[challengeHistory;$env[history];$get[userId]]
  `,
})
