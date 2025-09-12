import lobbySnippets from '#snippets/lobbySnippets.js'

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: 'when pressing Show Settings',
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;showLobbySettings]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    ${lobbySnippets.lobbyExist()}
    ${lobbySnippets.loadGlobalLobbyVars()}
    ${lobbySnippets.loadLobbyVars()}
    
    ${lobbySnippets.lobbySettingsEmbed()}
    $ephemeral
    $interactionReply
  `
}