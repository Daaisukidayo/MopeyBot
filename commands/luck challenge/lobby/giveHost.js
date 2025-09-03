import lobbyDefaultEmbed from "../../../JSfunctions/lobby/embed.js"
import loadGlobalLobbyVars from "../../../JSfunctions/lobby/loadGlobalVars.js"
import loadLobbyVars from "../../../JSfunctions/lobby/loadVars.js"

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: "Give lobby host",
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;giveLobbyHost]]
    $onlyIf[$arrayIncludes[IID;$authorID]]

    $callFunction[lobbyExist]
    ${loadGlobalLobbyVars()}
    ${loadLobbyVars()}

    $!jsonSet[lobby;host;$selectMenuValues]
    $!jsonSet[lobby;$env[lobby]]
    $setChannelVar[lobby;$env[lobby]]
    $let[host;$env[lobby;host]]

    $callFunction[messageChangePopUP;# Host: <@$get[host]>]
    
    ${lobbyDefaultEmbed()}
    $deferUpdate
    $try[
      $!editMessage[$channelID;$env[lobby;messageID]]
    ;
      $interactionReply[
        $author[$username[$get[host]]'s Lobby;$userAvatar[$get[host]]]
        $description[# The lobby was closed due to a missing message]
        $color[Orange]
      ]
      $callFunction[deleteLobbyVars]
      $stop
    ]
    
    $callFunction[lobbyTimeout]
  `
}