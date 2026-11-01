import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addHistoryNewConfig",
  description: "makes a fresh config for the addhistory command, saves it and returns it",
  output: ArgType.Json,
  code: `
    $jsonLoad[baseHistoryPage;$getGlobalVar[baseHistoryPage]]
    $!jsonSet[baseHistoryPage;endDate;$getTimestamp]
    $setUserVar[addHistorySavedConfig;$env[baseHistoryPage]]
    $return[$env[baseHistoryPage]]
  `,
})
