export default {
  name: 'handleLobby',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $onlyIf[$getGlobalVar[usernames]!=;
      $newError[$tl[ui.lobby.notReady]]
    ]
    $cooldown[lobby-$channelID;1000]

    $!jsonSet[funcCache;usernames;$getGlobalVar[usernames]]

    $onlyIf[$getChannelVar[lobby]==;
      $jsonLoad[allPlayers;$dump[$getChannelVar[lobby];allPlayers]]
      $arrayMap[allPlayers;ID;$return[$env[funcCache;usernames;$env[ID]]];usernames]

      $addContainer[
        $addTextDisplay[# ✖️ _$tl[ui.errors.errorTitle]_]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.lobby.lobbyAlreadyExist]]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.lobby.participantsTitle]]
        $addTextDisplay[$codeBlock[$arrayJoin[usernames;\n]]]
        $addActionRow
        $addButton[closeLobbyManually;$tl[ui.lobby.buttonLabelCloseManually];Danger;🔚]
      ;$getGlobalVar[errorColor]]
    ]

    $onlyIf[$getProgress==;
      $newError[$tl[ui.lobby.hasActiveChallengeLobby]]
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

    $let[mid;$function[
      $if[$isPrefixCommand;
        $return[$sendMessage[$channelID;;true]]
      ]
      $return[$interactionReply[;true]]
    ]]

    $!jsonSet[lobby;messageID;"$get[mid]"]
    
    $setChannelVar[lobby;$env[lobby]]
    $newLobbyTimeout
  `
}