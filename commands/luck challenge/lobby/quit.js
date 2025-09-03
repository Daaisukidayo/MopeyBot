import lobbyDefaultEmbed from "../../../JSfunctions/lobby/embed.js"
import loadGlobalLobbyVars from "../../../JSfunctions/lobby/loadGlobalVars.js"
import loadLobbyVars from "../../../JSfunctions/lobby/loadVars.js"

export default {
  type: "interactionCreate",
  description: "When pressing Quit",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;quitLobby]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $callFunction[lobbyExist]
    ${loadGlobalLobbyVars()}
    ${loadLobbyVars()}

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
    
    ${lobbyDefaultEmbed()}
    $interactionUpdate
    $callFunction[lobbyTimeout]
  `
}