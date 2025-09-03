import lobbyDefaultEmbed from "../../../JSfunctions/lobby/embed.js"
import loadGlobalLobbyVars from "../../../JSfunctions/lobby/loadGlobalVars.js"
import loadLobbyVars from "../../../JSfunctions/lobby/loadVars.js"

export default {
  type: 'interactionCreate',
  name: "readyLobby",
  description: 'when pressing Ready',
  code: `
    $callFunction[lobbyExist]
    ${loadGlobalLobbyVars()}
    ${loadLobbyVars()}

    $onlyIf[$arrayIncludes[allPlayers;$authorID];
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## You're not a participant]
      ]
    ]

    $if[$arrayIncludes[ready;$authorID];
      $!arraySplice[ready;$arrayIndexOf[ready;$authorID];1]
    ;
      $arrayPush[ready;$authorID]
    ]
    $!jsonSet[lobby;ready;$env[ready]]
    $setChannelVar[lobby;$env[lobby]]
    
    ${lobbyDefaultEmbed()}
    $let[msgid;$messageID]
    $interactionUpdate
    $callFunction[lobbyTimeout]
  `
}