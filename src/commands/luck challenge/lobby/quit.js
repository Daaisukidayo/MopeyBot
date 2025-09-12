import lobbySnippets from '#snippets/lobbySnippets.js'

export default {
  type: "interactionCreate",
  description: "When pressing Quit",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;quitLobby]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    ${lobbySnippets.lobbyExist()}
    ${lobbySnippets.loadGlobalLobbyVars()}
    ${lobbySnippets.loadLobbyVars()}

    $onlyIf[$arrayIncludes[allPlayers;$authorID]]

    $let[teamIndex;$env[IID;1]]
    $jsonLoad[playersInTeam;$env[teams;$get[teamIndex];players]]
    $!arraySplice[playersInTeam;$arrayIndexOf[playersInTeam;$authorID];1]
    $!arraySplice[ready;$arrayIndexOf[ready;$authorID];1]
    $!jsonSet[teams;$get[teamIndex];players;$env[playersInTeam]]
    $!jsonSet[lobby;teams;$env[teams]]
    $!jsonSet[lobby;ready;$env[ready]]

    $setChannelVar[lobby;$env[lobby]]
    $deleteUserVar[participating|$channelID]
    
    ${lobbySnippets.lobbyEmbed()}
    $interactionUpdate
    ${lobbySnippets.lobbyTimeout()}
  `
}