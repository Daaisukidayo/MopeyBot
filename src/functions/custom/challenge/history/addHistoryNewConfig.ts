import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addHistoryNewConfig",
  description: "Creates a new config for the 'add history' command for the user: saves it and returns it.",
  output: ArgType.Json,
  code: `
    $jsonLoad[baseHistoryPage;$getGlobalVar[baseHistoryPage]]
    $!jsonSet[baseHistoryPage;endDate;$getTimestamp]
    $setUserVar[addHistorySavedConfig;$env[baseHistoryPage]]
    $return[$env[baseHistoryPage]]
  `,
})
