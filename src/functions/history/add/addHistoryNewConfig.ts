export default {
  name: "addHistoryNewConfig",
  description: "Resets or creates a new config for 'add history' commands for the user.",
  code: `
    $jsonLoad[baseHistoryPage;$getGlobalVar[baseHistoryPage]]
    $!jsonSet[baseHistoryPage;endDate;"$getTimestamp"]
    $setUserVar[addHistorySavedConfig;$env[baseHistoryPage]]
  `
}