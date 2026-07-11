import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addHistoryNewConfig",
  description: "Resets or creates a new config for 'add history' commands for the user.",
  code: `
    $jsonLoad[baseHistoryPage;$getGlobalVar[baseHistoryPage]]
    $!jsonSet[baseHistoryPage;endDate;"$getTimestamp"]
    $setUserVar[addHistorySavedConfig;$env[baseHistoryPage]]
  `
})