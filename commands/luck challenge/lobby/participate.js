import lobbyDefaultEmbed from "../../../JSfunctions/lobby/embed.js"
import loadGlobalLobbyVars from "../../../JSfunctions/lobby/loadGlobalVars.js"
import loadLobbyVars from "../../../JSfunctions/lobby/loadVars.js"

export default {
  type: "interactionCreate",
  description: "When pressing Participate",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;joinLobby]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $callFunction[lobbyExist]
    ${loadGlobalLobbyVars()}
    ${loadLobbyVars()}

    $let[oldTeamIndex;$arrayFindIndex[teams;team;$jsonLoad[playersInTeam;$env[team;players]] $return[$arrayIncludes[playersInTeam;$authorID]]]]
    $let[newTeamIndex;$env[IID;1]]

    $onlyIf[$get[oldTeamIndex]!=$get[newTeamIndex]]

    $onlyIf[$getUserVar[1hstarted|$channelID;$authorID;false]!=true;
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## You have an active challenge! Complete it before participating]
      ]
    ]
    $onlyIf[$arrayLength[allPlayers]<$getGlobalVar[maxParticipants];
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## The Lobby is full]
      ]
    ]
    
    $if[$get[oldTeamIndex]!=-1;
      $jsonLoad[playersInTeam;$env[teams;$get[oldTeamIndex];players]]
      $!arraySplice[playersInTeam;$arrayIndexOf[playersInTeam;$authorID];1]
      $!jsonSet[teams;$get[oldTeamIndex];players;$env[playersInTeam]]
    ]
    
    $jsonLoad[playersInTeam;$env[teams;$get[newTeamIndex];players]]
    $arrayPush[playersInTeam;$authorID]
    $!jsonSet[teams;$get[newTeamIndex];players;$env[playersInTeam]]

    $arrayPush[allPlayers;$authorID]
    $!jsonSet[lobby;teams;$env[teams]]
    $setChannelVar[lobby;$env[lobby]]
    $setUserVar[participating|$channelID;true]

    ${lobbyDefaultEmbed()}
    $interactionUpdate
    $callFunction[lobbyTimeout]
  `
}