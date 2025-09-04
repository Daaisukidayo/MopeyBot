import loadGlobalLobbyVars from "../../../JSfunctions/lobby/loadGlobalVars.js"
import loadLobbyVars from "../../../JSfunctions/lobby/loadVars.js"

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: 'when pressing Show Settings',
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;showLobbySettings]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    ${loadGlobalLobbyVars()}
    ${loadLobbyVars()}

    $callFunction[lobbyExist]
    
    $callFunction[lobbySettingsEmbed]
    $ephemeral
    $interactionReply
  `
}