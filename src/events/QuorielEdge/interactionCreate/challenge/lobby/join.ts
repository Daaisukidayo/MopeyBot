export default {
  name: "joinLobby",
  type: "interactionCreate",
  description: "When pressing Join",
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $checkLobby

    $if[$hasCache[usernames]==false;
      $newError[$tl[$get[l];ui;lobby.notReady]]
    ]

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[ready;$env[lobby;ready]]
    $jsonLoad[teams;$env[lobby;teams]]
    $jsonLoad[allPlayers;$env[lobby;allPlayers]]
    
    $onlyIf[$messageID==$env[lobby;messageID];$!deleteMessage[$channelID;$messageID]]

    $onlyIf[$getProgress==;
      $newError[$tl[$get[l];ui;lobby.hasActiveChallengeParticipate]]
    ]

    $onlyIf[$arrayLength[allPlayers]<$getGlobalVar[maxLobbyParticipants];
      $newError[$tl[$get[l];ui;lobby.lobbyFull]]
    ]

    $let[oldTeamIndex;$arrayFindIndex[teams;team;$arrayIncludes[$env[team;players];$authorID]]]

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