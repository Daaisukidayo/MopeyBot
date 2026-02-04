export default {
  name: "giveLobbyHost",
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
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

    $onlyIf[$env[lobby;host]==$authorID;$onlyAuthorInteraction]

    $checkLobbyMessage

    $!jsonSet[lobby;host;$selectMenuValues]
    $setChannelVar[lobby;$env[lobby]]

    $lobbySettingsEmbed
    $interactionUpdate

    $jsonLoad[userProfile;$getProfile[$env[lobby;host]]]

    $settingsChangedInfo[$tl[ui.lobby.hostTitle;<@$env[lobby;host]>]]
    
    $lobbyEmbed

    $!editMessage[$channelID;$env[lobby;messageID]]
    $newLobbyTimeout
  `
}