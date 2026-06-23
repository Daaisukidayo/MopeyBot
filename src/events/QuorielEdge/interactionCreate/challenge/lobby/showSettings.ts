export default {
  name: 'showLobbySettings',
  type: "interactionCreate",
  allowed: ['button'],
  code: `
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkLobby
    
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[lobbyModes;$getGlobalVar[lobbyModes]]
    $jsonLoad[victoryTypes;$getGlobalVar[victoryTypes]]

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[ready;$env[lobby;ready]]
    $jsonLoad[teams;$env[lobby;teams]]
    $jsonLoad[allPlayers;$env[lobby;allPlayers]]

    $onlyIf[$messageID==$env[lobby;messageID];
      $!deleteMessage[$channelID;$messageID]
    ]
    
    $ephemeral
    $lobbySettingsEmbed
    $interactionReply
  `
}