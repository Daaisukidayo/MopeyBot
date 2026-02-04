export default {
  name: 'showLobbySettings',
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkLobby
    
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[lobbyModes;$getGlobalVar[lobbyModes]]

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[ready;$env[lobby;ready]]
    $jsonLoad[teams;$env[lobby;teams]]
    $jsonLoad[allPlayers;$env[lobby;allPlayers]]
    $!jsonSet[funcCache;usernames;$getGlobalVar[usernames]]

    $onlyIf[$messageID==$env[lobby;messageID];$!deleteMessage[$channelID;$messageID]]
    
    $lobbySettingsEmbed
    $ephemeral
    $interactionReply
  `
}