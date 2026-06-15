export default {
  name: 'handleCreateLobby',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $if[$hasCache[usernames]==false;
      $newError[$tl[$get[l];ui;lobby.notReady]]
    ]

    $cooldown[lobby-$channelID;1000]
    
    $getCache[usernames;usernames]
    $jsonLoad[lobby;$getChannelVar[lobby]]

    $onlyIf[$env[lobby]==;
      $jsonLoad[allPlayers;$env[lobby;allPlayers]]
      $if[$arrayLength[allPlayers]>0;
        $arrayMap[allPlayers;ID;$return[$env[usernames;$env[ID]]];participantUsernames]
      ;
        $arrayLoad[participantUsernames; ;$tl[$get[l];ui;lobby.none]]
      ]

      $addContainer[
        $addTextDisplay[# ✖️ _$tl[$get[l];ui;errors.errorTitle]_]
        $addSeparator[Large]
        $addTextDisplay[$tl[$get[l];ui;lobby.lobbyAlreadyExist]]
        $addSeparator[Large]
        $addTextDisplay[$tl[$get[l];ui;lobby.participantsTitle]]
        $addTextDisplay[$codeBlock[$arrayJoin[participantUsernames;\n]]]
        $addActionRow
        $addButton[closeLobby-forcefully;$tl[$get[l];ui;lobby.buttonLabelCloseManually];Danger;🔚]
      ;$getGlobalVar[errorColor]]
    ]

    $onlyIf[$getProgress==;
      $newError[$tl[$get[l];ui;lobby.hasActiveChallengeLobby]]
    ]

    
    $arrayLoad[players; ;$authorID]
    $arrayLoad[teams]

    $jsonLoad[team;$getGlobalVar[baseLobbyTeam]]
    $!jsonSet[team;players;$env[players]]
    $arrayPushJSON[teams;$env[team]]

    $jsonLoad[lobby;$getGlobalVar[baseLobby]]
    $!jsonSet[lobby;host;"$authorID"]
    $!jsonSet[lobby;allPlayers;$env[players]]
    $!jsonSet[lobby;teams;$env[teams]]
    
    $lobbyEmbed

    $let[mid;$send]

    $!jsonSet[lobby;messageID;"$get[mid]"]
    
    $setChannelVar[lobby;$env[lobby]]
    $newLobbyTimeout
  `
}