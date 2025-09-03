import loadGlobalLobbyVars from "../../../JSfunctions/lobby/loadGlobalVars.js"
import loadLobbyVars from "../../../JSfunctions/lobby/loadVars.js"

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;switchLobbyMode]]
    $onlyIf[$arrayIncludes[IID;$authorID]]
    
    $callFunction[lobbyExist]
    ${loadGlobalLobbyVars()}
    ${loadLobbyVars()}
    $let[newMode;$selectMenuValues]

    $onlyIf[$get[newMode]!=$env[lobby;mode]]

    $arrayLoad[empty]
    $arrayLoad[teams]
    $jsonLoad[team;{
      "points": "0",
      "teamID": "0",
      "players": $env[empty]
    }]
    $!jsonSet[lobby;mode;$get[newMode]]
    
    $switch[$get[newMode];
      $case[$arrayAt[modes;0]; $let[loopsCount;1]]
      $case[$arrayAt[modes;1]; $let[loopsCount;2]]
      $case[$arrayAt[modes;2]; $let[loopsCount;3]]
    ]
    $loop[$get[loopsCount];
      $jsonSet[team;teamID;$arrayLength[teams]]
      $!arrayPushJSON[teams;$env[team]]
    ]
    $!jsonSet[lobby;teams;$env[teams]]
    $!jsonSet[lobby;ready;$env[empty]]
    $setChannelVar[lobby;$env[lobby]]

    $callFunction[messageChangePopUP;# Mode: \`$get[newMode]\`]

    $callFunction[lobbyDefaultEmbed]
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
    
    $callFunction[lobbySettingsEmbed]
    $interactionUpdate
    $callFunction[lobbyTimeout]
  `
}