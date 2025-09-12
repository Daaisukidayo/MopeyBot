import lobbySnippets from '#snippets/lobbySnippets.js'

export default {
  type: "interactionCreate",
  description: "When pressing End",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;endLobby,closeLobby]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$arrayIncludes[IID;$authorID]]

    ${lobbySnippets.lobbyExist()}
    ${lobbySnippets.loadGlobalLobbyVars()}
    ${lobbySnippets.loadLobbyVars()}
    $let[host;$env[lobby;host]]

    $deferUpdate
    $!deleteMessage[$channelId;$messageID]
    $!deleteMessage[$channelId;$env[lobby;messageID]]

    ${lobbySnippets.deleteAllLobbyVars()}

    $author[$username[$get[host]]'s Lobby;$userAvatar[$get[host]]]
    $description[# The Lobby was closed by the Host]
    $color[Orange]
    $sendMessage[$channelID]
    ${lobbySnippets.stopLobbyTimeout()}
  `
}