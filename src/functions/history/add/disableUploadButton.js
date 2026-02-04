export default {
  name: "disabledUploadButton",
  description: "Based on the conditions return boolean that decides whether to disable the upload button or not.",
  code: `
    $return[$or[$env[savedNewHistoryConfig;points]==0;$env[savedNewHistoryConfig;rares]==0;$env[savedNewHistoryConfig;endDate]==0;$env[savedNewHistoryConfig;raresList]=={}]]
  `
}