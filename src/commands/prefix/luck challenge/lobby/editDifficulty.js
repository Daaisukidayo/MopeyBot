export default {
  name: "addDifficultyLobby",
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

    $!jsonSet[lobby;difficulty;$selectMenuValues]

    $let[change;$tl[ui.lobby.difficultyTitle;$tl[data.difficulties.$selectMenuValues]]]
    $settingsChangedInfo[$get[change]]
    
    $setChannelVar[lobby;$env[lobby]]

    $lobbySettingsEmbed
    $interactionUpdate
    $newLobbyTimeout
  `
}