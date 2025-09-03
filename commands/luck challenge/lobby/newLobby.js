import loadGlobalLobbyVars from "../../../JSfunctions/lobby/loadGlobalVars.js"
import settingLobbyVars from "../../../JSfunctions/lobby/settingVars.js"
import loadLobbyVars from "../../../JSfunctions/lobby/loadVars.js"
import lobbyDefaultEmbed from "../../../JSfunctions/lobby/embed.js"

export default {
  name: "party",
  aliases: ["lobby"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    ${loadGlobalLobbyVars()}

    $onlyIf[$getChannelVar[lobby]==;
      ${loadLobbyVars()}
      ${settingLobbyVars()}
      $arrayMap[allPlayers;ID;$return[$username[$env[ID]]];usernames]
      $callFunction[embed;error]
      $description[## Party already exist in this channel!]
      $addField[Participants:;$codeBlock[$arrayJoin[usernames;\n]]]
      $addActionRow
      $addButton[closeLobby-$get[host];Close Manually;Danger;🔚]
    ]
    $onlyIf[$getUserVar[1hstarted|$channelID]!=true;
      $callFunction[embed;error]
      $description[## You have an active challenge! End it before creating a Lobby!]
    ]
    
    $setUserVar[participating|$channelID;true]
    $arrayLoad[players; ;$authorID]
    $arrayLoad[lobbyTags]
    $arrayLoad[teams]
    $arrayLoad[ready]
    $jsonLoad[team;{
      "points": "0",
      "teamID": "0",
      "players": $env[players]
    }]
    $arrayPushJSON[teams;$env[team]]
    $jsonLoad[lobby;{
      "tags": $env[lobbyTags],
      "difficulty": "none",
      "mode": "FFA",
      "host": "$authorID",
      "messageID": "",
      "ready": $env[ready],
      "teams": $env[teams]
    }]
    
    ${loadLobbyVars()}
    ${lobbyDefaultEmbed()}
    $let[msgid;$sendMessage[$channelID;;true]]
    $!jsonSet[lobby;messageID;$get[msgid]]
    
    $setChannelVar[lobby;$env[lobby]]
    $callFunction[lobbyTimeout]
  `
}