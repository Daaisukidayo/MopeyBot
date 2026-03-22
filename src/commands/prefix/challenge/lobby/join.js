export default {
  type: "interactionCreate",
  description: "When pressing Join",
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;joinLobby]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkLobby

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[ready;$env[lobby;ready]]
    $jsonLoad[teams;$env[lobby;teams]]
    $jsonLoad[allPlayers;$env[lobby;allPlayers]]
    
    $onlyIf[$messageID==$env[lobby;messageID];$!deleteMessage[$channelID;$messageID]]

    $onlyIf[$getProgress==;
      $newError[$tl[ui.lobby.hasActiveChallengeParticipate]]
    ]

    $onlyIf[$arrayLength[allPlayers]<$getGlobalVar[maxParticipants];
      $newError[$tl[ui.lobby.lobbyFull]]
    ]

    $let[oldTeamIndex;$arrayFindIndex[teams;team;$advArrayIncludes[$env[team;players];$authorID]]]

    $let[newTeamIndex;$env[IID;1]]

    $onlyIf[$get[oldTeamIndex]!=$get[newTeamIndex]]
    
    $if[$get[oldTeamIndex]!=-1;
      $jsonLoad[playersInTeam;$env[teams;$get[oldTeamIndex];players]]
      $!arraySplice[playersInTeam;$arrayIndexOf[playersInTeam;$authorID];1]
      $!jsonSet[teams;$get[oldTeamIndex];players;$env[playersInTeam]]
    ]
    
    $jsonLoad[playersInTeam;$env[teams;$get[newTeamIndex];players]]
    $arrayPush[playersInTeam;$authorID]
    $!jsonSet[teams;$get[newTeamIndex];players;$env[playersInTeam]]

    $if[$arrayIncludes[allPlayers;$authorID];;
      $arrayPush[allPlayers;$authorID]
    ]
    $!jsonSet[lobby;teams;$env[teams]]
    $!jsonSet[lobby;allPlayers;$env[allPlayers]]
    $setChannelVar[lobby;$env[lobby]]

    $lobbyEmbed
    $interactionUpdate
    $newLobbyTimeout
  `
}