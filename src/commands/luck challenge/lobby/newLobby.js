import lobbySnippets from '#snippets/lobbySnippets.js'
import universalSnippets from '#snippets/universalSnippets.js'

export default {
  name: "party",
  aliases: ["lobby"],
  type: "messageCreate",
  code: `
    $reply
    ${universalSnippets.checkProfile({addCooldown: false})}
    ${lobbySnippets.loadGlobalLobbyVars()}

    $onlyIf[$getChannelVar[lobby]==;
      ${lobbySnippets.loadLobbyVars()}
      ${lobbySnippets.settingVars()}
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
    
    ${lobbySnippets.loadLobbyVars()}
    ${lobbySnippets.lobbyEmbed()}
    $let[msgid;$sendMessage[$channelID;;true]]
    $!jsonSet[lobby;messageID;$get[msgid]]
    
    $setChannelVar[lobby;$env[lobby]]
    ${lobbySnippets.lobbyTimeout()}
  `
}