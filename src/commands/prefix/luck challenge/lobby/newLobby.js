export default {
  name: "lobby",
  aliases: ["party"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $onlyIf[$getGlobalVar[usernames]!=;
      $newError[$tl[ui.lobby.notReady]]
    ]
    $channelCooldown[$channelID;1000]

    $!jsonSet[funcCache;usernames;$getGlobalVar[usernames]]

    $onlyIf[$getChannelVar[lobby]==;
      $jsonLoad[allPlayers;$dump[$getChannelVar[lobby];allPlayers]]
      $arrayMap[allPlayers;ID;$return[$env[funcCache;usernames;$env[ID]]];usernames]

      $addContainer[
        $addTextDisplay[$tl[ui.errors.errorTitle]]
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

    $jsonLoad[team;{
      "points": 0,
      "teamID": 0,
      "players": $env[players]
    }]

    $arrayPushJSON[teams;$env[team]]

    $jsonLoad[lobby;{
      "mode": $dump[$getGlobalVar[lobbyModes];0],
      "difficulty": $dump[$getGlobalVar[difficulties];1],
      "host": "$authorID",
      "messageID": null,
      "started": false,
      "ready": \\[\\],
      "allPlayers": $env[players],
      "teams": $env[teams]
    }]
    
    $lobbyEmbed
    $!jsonSet[lobby;messageID;"$sendMessage[$channelID;;true]"]
    
    $setChannelVar[lobby;$env[lobby]]
    $newLobbyTimeout
  `
}