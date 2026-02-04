export default {
  name: "addHistoryNewConfig",
  description: "Resets or creates a new config for 'add history' commands for the user.",
  code: `
    $setUserVar[savedNewHistoryConfig;$getGlobalVar[baseHistoryPage]]
  `
}