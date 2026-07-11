import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
	name: "pushNewHistoryPage",
	description: "Creates and pushes a new challenge history page for a user using provided page data.",
	params: [
		{
			name: "_newPageData",
			description: "JSON object containing new page fields: points, rares, endDate, playType, difficulty, list.",
			type: ArgType.Json,
		},
		{
			name: "_userId",
			description: "The user ID.",
			type: ArgType.User,
			required: false,
		},
	],
	code: `
		$let[userId;$findUser[$env[_userId;id];true]]

		$jsonLoad[newHistory;$getGlobalVar[baseHistoryPage]]
		$!jsonSet[newHistory;id;$randomUUID]
		$!jsonSet[newHistory;points;$env[_newPageData;points]]
		$!jsonSet[newHistory;rares;$env[_newPageData;rares]]
		$!jsonSet[newHistory;endDate;"$env[_newPageData;endDate]"]
		$!jsonSet[newHistory;playType;$env[_newPageData;playType]]
		$!jsonSet[newHistory;difficulty;$env[_newPageData;difficulty]]
		$!jsonSet[newHistory;raresList;$env[_newPageData;list]]

		$jsonLoad[history;$getUserVar[challengeHistory;$get[userId]]]
		$arrayPushJSON[history;$env[newHistory]]
		$setUserVar[challengeHistory;$env[history]]
	`
})