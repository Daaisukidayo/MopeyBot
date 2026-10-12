import { Command } from "@quoriel/edge"

export default new Command({
  name: "joinLobby",
  type: "interactionCreate",
  description: "When pressing Join",
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $checkLobby

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[teams;$jsonGet[lobby;teams]]
    $jsonLoad[allPlayers;$jsonGet[lobby;allPlayers]]
    
    $onlyIf[$messageID==$jsonGet[lobby;messageID];$!deleteMessage[$channelID;$messageID]]

    $onlyIf[$getProgress==;
      $newError[$tl[ui.lobby.hasActiveChallengeParticipate.$get[l]]]
    ]

    $let[isParticipant;$arrayIncludes[allPlayers;$authorID]]

    $c[Testers may join any team repeatedly to try the lobby alone: every join adds an entry]
    $let[isTester;$checkCondition[$jsonGet[userProfile;testerMode]==true]]

    $c[A full lobby still lets its participants switch teams. A tester adds an entry, so it needs a free place]
    $onlyIf[$or[$and[$get[isParticipant];$get[isTester]==false];$jsonSize[allPlayers]<$getGlobalVar[maxLobbyParticipants]];
      $newError[$tl[ui.lobby.lobbyFull.$get[l]]]
    ]

    $let[oldTeamIndex;$arrayFindIndex[teams;team;$arrayIncludes[$jsonGet[team;players];$authorID]]]

    $let[newTeamIndex;$jsonGet[IID;1]]

    $onlyIf[$or[$get[isTester];$arrayIncludes[$jsonGet[teams;$get[newTeamIndex];players];$authorID]==false];
      $newError[$tl[ui.lobby.alreadyInTeam.$get[l]]]
    ]

    $c[Everyone else switches teams]
    $if[$and[$get[oldTeamIndex]!=-1;$get[isTester]==false];
      $jsonLoad[playersInTeam;$jsonGet[teams;$get[oldTeamIndex];players]]
      $arrayRemove[playersInTeam;$authorID]
      $!jsonSet[teams;$get[oldTeamIndex];players;$env[playersInTeam]]
    ]

    $arrayPushAt[teams;$get[newTeamIndex];players;$authorID]

    $c[One participant entry per team entry (a tester gets one per join)]
    $if[$or[$get[isTester];$get[isParticipant]==false];
      $arrayPush[allPlayers;$authorID]
    ]
    $objectMerge[lobby;$objectOf[teams;$env[teams];allPlayers;$env[allPlayers]]]
    $setChannelVar[lobby;$env[lobby]]

    $lobbyEmbed[lobby]
    $interactionUpdate
    $newLobbyTimeout
  `
})
