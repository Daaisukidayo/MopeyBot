export default {
  name: "editLobbySettings",
  type: "interactionCreate",
  allowed: ['stringSelect'],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkLobby

    $if[$hasCache[usernames]==false;
      $newError[$tl[$get[l];ui;lobby.notReady]]
    ]

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

    $let[value;$selectMenuValues]

    $switch[$env[IID;1];
      $case[difficulty;
        $!jsonSet[lobby;settings;difficulty;$get[value]]

        $let[change;$tl[$get[l];ui;lobby.difficultyTitle;$tl[$get[l];data;difficulties.$get[value]]]]
        $settingsChangedInfo[$get[change]]
        
        $setChannelVar[lobby;$env[lobby]]

        $lobbySettingsEmbed
        $interactionUpdate
      ]

      $case[mode;
        $arrayLoad[teams]
        $jsonLoad[team;$getGlobalVar[baseLobbyTeam]]
        $!jsonSet[lobby;settings;mode;$get[value]]
        
        $let[loopsCount;$function[
          $return[$switch[$get[value];
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

        $settingsChangedInfo[$tl[$get[l];ui;lobby.modeTitle;$tl[$get[l];data;lobbyModes.$get[value]]]]
        
        $lobbyEmbed
        $!editMessage[$channelID;$env[lobby;messageID]]

        $lobbySettingsEmbed
        $interactionUpdate
      ]

      $case[victoryType;
        $!jsonSet[lobby;settings;victoryType;$get[value]]
    
        $setChannelVar[lobby;$env[lobby]]

        $settingsChangedInfo[$tl[$get[l];ui;lobby.victoryTypeTitle;$tl[$get[l];data;victoryTypes.$get[value]]]]
        
        $lobbyEmbed
        $!editMessage[$channelID;$env[lobby;messageID]]

        $lobbySettingsEmbed
        $interactionUpdate
      ]

      $case[host;
        $!jsonSet[lobby;host;"$get[value]"]
        $setChannelVar[lobby;$env[lobby]]

        $lobbySettingsEmbed
        $interactionUpdate

        $jsonLoad[userProfile;$getProfile[$get[value]]]
        $let[l;$env[userProfile;language]]

        $settingsChangedInfo[$tl[$get[l];ui;lobby.hostTitle;<@$get[value]>]]
        
        $lobbyEmbed
        $!editMessage[$channelID;$env[lobby;messageID]]
      ]
    ]
    
    $newLobbyTimeout
  `
}