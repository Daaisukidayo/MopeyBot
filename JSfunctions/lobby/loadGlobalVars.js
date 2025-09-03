export default function loadGlobalLobbyVars () {
  return `
    $jsonLoad[allLobbyTagsContent;$getGlobalVar[allLobbyTagsContent]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[modes;$getGlobalVar[modes]]
    $jsonLoad[tags;$getGlobalVar[tags]]
  `
}