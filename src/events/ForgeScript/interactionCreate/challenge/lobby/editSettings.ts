export default [{
  name: "editLobbyDifficulty",
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
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

    $onlyIf[$env[lobby;host]==$authorID;$onlyAuthorInteraction]
    $onlyIf[$messageExists[$channelID;$env[lobby;messageID]]]
    $onlyIf[$env[lobby;started]==false]

    $let[newDifficulty;$selectMenuValues]
    $!jsonSet[lobby;settings;difficulty;$get[newDifficulty]]

    $let[change;$tl[$get[l];ui;lobby.difficultyTitle;$tl[$get[l];data;difficulties.$get[newDifficulty]]]]
    $settingsChangedInfo[$get[change]]
    
    $setChannelVar[lobby;$env[lobby]]

    $lobbySettingsEmbed
    $interactionUpdate
    $newLobbyTimeout
  `
},{
  name: "editLobbyMode",
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
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

    $onlyIf[$env[lobby;host]==$authorID;$onlyAuthorInteraction]
    $onlyIf[$messageExists[$channelID;$env[lobby;messageID]]]
    $onlyIf[$env[lobby;started]==false]

    $let[newMode;$selectMenuValues]

    $arrayLoad[teams]
    $jsonLoad[team;$getGlobalVar[baseLobbyTeam]]
    $!jsonSet[lobby;settings;mode;$get[newMode]]
    
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
    $!jsonSet[lobby;ready;[\\]]
    $!jsonSet[lobby;allPlayers;[\\]]
    $setChannelVar[lobby;$env[lobby]]

    $settingsChangedInfo[$tl[$get[l];ui;lobby.modeTitle;$tl[$get[l];data;lobbyModes.$get[newMode]]]]
    
    $lobbyEmbed
    $!editMessage[$channelID;$env[lobby;messageID]]

    $lobbySettingsEmbed
    $interactionUpdate
    $newLobbyTimeout
  `
},{
  name: "editLobbyVictoryType",
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
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

    $onlyIf[$env[lobby;host]==$authorID;$onlyAuthorInteraction]
    $onlyIf[$messageExists[$channelID;$env[lobby;messageID]]]
    $onlyIf[$env[lobby;started]==false]

    $let[newVictoryType;$selectMenuValues]

    $!jsonSet[lobby;settings;victoryType;$get[newVictoryType]]
    
    $setChannelVar[lobby;$env[lobby]]

    $settingsChangedInfo[$tl[$get[l];ui;lobby.victoryTypeTitle;$tl[$get[l];data;victoryTypes.$get[newVictoryType]]]]
    
    $lobbyEmbed
    $!editMessage[$channelID;$env[lobby;messageID]]

    $lobbySettingsEmbed
    $interactionUpdate
    $newLobbyTimeout
  `
},{
  name: "giveLobbyHost",
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
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

    $onlyIf[$env[lobby;host]==$authorID;$onlyAuthorInteraction]
    $onlyIf[$messageExists[$channelID;$env[lobby;messageID]]]
    $onlyIf[$env[lobby;started]==false]

    $!jsonSet[lobby;host;$selectMenuValues]
    $setChannelVar[lobby;$env[lobby]]

    $lobbySettingsEmbed
    $interactionUpdate

    $jsonLoad[userProfile;$getProfile[$env[lobby;host]]]
    $let[l;$env[userProfile;language]]

    $settingsChangedInfo[$tl[$get[l];ui;lobby.hostTitle;<@$env[lobby;host]>]]
    
    $lobbyEmbed
    $!editMessage[$channelID;$env[lobby;messageID]]
    $newLobbyTimeout
  `
}]