import { Command } from "@quoriel/edge"

export default new Command({
  name: "quitLobby",
  type: "interactionCreate",
  description: "When pressing Quit",
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkLobby

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[ready;$jsonGet[lobby;ready]]
    $jsonLoad[teams;$jsonGet[lobby;teams]]
    $jsonLoad[allPlayers;$jsonGet[lobby;allPlayers]]

    $onlyIf[$messageID==$jsonGet[lobby;messageID];$!deleteMessage[$channelID;$messageID]]

    $onlyIf[$arrayIncludes[allPlayers;$authorID];
      $newError[$tl[ui.lobby.notParticipant.$get[l]]]
    ]

    $c[Quit only works on the team whose button was pressed]
    $let[teamIndex;$jsonGet[IID;1]]
    $jsonLoad[playersInTeam;$jsonGet[teams;$get[teamIndex];players]]
    $onlyIf[$arrayIncludes[playersInTeam;$authorID];
      $newError[$tl[ui.lobby.notInThisTeam.$get[l]]]
    ]
    $!arraySplice[playersInTeam;$arrayIndexOf[playersInTeam;$authorID];1]
    $!jsonSet[teams;$get[teamIndex];players;$env[playersInTeam]]

    $c[Each quit removes one entry. A tester stays ready while any entry is left]
    $!arraySplice[allPlayers;$arrayIndexOf[allPlayers;$authorID];1]
    $if[$arrayIncludes[allPlayers;$authorID]==false;
      $arrayRemove[ready;$authorID]
    ]

    $objectMerge[lobby;$objectOf[teams;$env[teams];ready;$env[ready];allPlayers;$env[allPlayers]]]
    $setChannelVar[lobby;$env[lobby]]

    $lobbyEmbed[lobby]
    $interactionUpdate
    $newLobbyTimeout
  `
})
