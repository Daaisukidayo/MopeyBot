export default {
  name: "disabledUploadButton",
  description: "Based on the conditions return boolean that decides whether to disable the upload button or not.",
  code: `
    $return[$or[$env[addHistorySavedConfig;points]==0;$env[addHistorySavedConfig;rares]==0;$env[addHistorySavedConfig;endDate]==0;$env[addHistorySavedConfig;raresList]=={}]]
  `
}