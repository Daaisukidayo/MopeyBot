import lobbySnippets from '#snippets/lobbySnippets.js'

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: "Give lobby host",
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;giveLobbyHost]]
    $onlyIf[$arrayIncludes[IID;$authorID]]

    ${lobbySnippets.lobbyExist()}
    ${lobbySnippets.loadGlobalLobbyVars()}
    ${lobbySnippets.loadLobbyVars()}

    $!jsonSet[lobby;host;$selectMenuValues]
    $!jsonSet[lobby;$env[lobby]]
    $setChannelVar[lobby;$env[lobby]]
    $let[host;$env[lobby;host]]

    ${lobbySnippets.settingsChangePopUP('# Host: <@$get[host]>')}
    
    ${lobbySnippets.lobbyEmbed()}
    $deferUpdate
    $try[
      $!editMessage[$channelID;$env[lobby;messageID]]
    ;
      $interactionReply[
        $author[$username[$get[host]]'s Lobby;$userAvatar[$get[host]]]
        $description[# The lobby was closed due to a missing message]
        $color[Orange]
      ]
      ${lobbySnippets.deleteAllLobbyVars()}
      $stop
    ]

    ${lobbySnippets.lobbySettingsEmbed()}
    $interactionUpdate
    ${lobbySnippets.lobbyTimeout()}
  `
}