export default {
  name: "switchLobbyMode",
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

    $let[newMode;$selectMenuValues]

    $arrayLoad[teams]
    $jsonLoad[team;{
      "points": 0,
      "teamID": 0,
      "players": \\[\\]
    }]
    $!jsonSet[lobby;mode;$get[newMode]]
    
    $let[loopsCount;$function[
      $return[$switch[$get[newMode];
        $case[$arrayAt[lobbyModes;0];1]
        $case[$arrayAt[lobbyModes;1];2]
        $case[$arrayAt[lobbyModes;2];3]
      ]]
    ]]

    $loop[$get[loopsCount];
      $!jsonSet[team;teamID;$arrayLength[teams]]
      $!arrayPushJSON[teams;$env[team]]
    ]

    $!jsonSet[lobby;teams;$env[teams]]
    $!jsonSet[lobby;ready;\\[\\]]
    $!jsonSet[lobby;allPlayers;\\[\\]]
    $setChannelVar[lobby;$env[lobby]]

    $settingsChangedInfo[$tl[ui.lobby.modeTitle;$tl[data.lobbyModes.$get[newMode]]]]
    
    $lobbyEmbed
    $!editMessage[$channelID;$env[lobby;messageID]]

    $lobbySettingsEmbed
    $interactionUpdate
    $newLobbyTimeout
  `
}