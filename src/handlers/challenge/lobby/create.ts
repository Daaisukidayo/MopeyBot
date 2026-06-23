export default {
  name: 'handleCreateLobby',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $cooldown[lobby-$channelID;1000]
    
    $jsonLoad[lobby;$getChannelVar[lobby]]

    $onlyIf[$env[lobby]==;
      $jsonLoad[allPlayers;$env[lobby;allPlayers]]
      $if[$arrayLength[allPlayers]>0;
        $arrayMap[allPlayers;ID;$return[$username[$env[ID]]];participantUsernames]
      ;
        $arrayLoad[participantUsernames; ;$tl[ui.lobby.none.$get[l]]]
      ]

      $addContainer[
        $addTextDisplay[# ✖️ _$tl[ui.errors.errorTitle.$get[l]]_]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.lobby.lobbyAlreadyExist.$get[l]]]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.lobby.participantsTitle.$get[l]]]
        $addTextDisplay[$codeBlock[$arrayJoin[participantUsernames;\n]]]
        $addActionRow
        $addButton[closeLobby-forcefully;$tl[ui.lobby.buttonLabelCloseManually.$get[l]];Danger;🔚]
      ;$getGlobalVar[errorColor]]
    ]

    $onlyIf[$getProgress==;
      $newError[$tl[ui.lobby.hasActiveChallengeLobby.$get[l]]]
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