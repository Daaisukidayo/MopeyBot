export default {
  name: "closeLobby",
  type: "interactionCreate",
  description: "When pressing End or Close manually",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkLobby

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $onlyIf[$env[lobby;host]==$authorID;$onlyAuthorInteraction]

    $jsonLoad[teams;$env[lobby;teams]]
    $jsonLoad[allPlayers;$env[lobby;allPlayers]]
    $let[mid;$env[lobby;messageID]]

    $switch[$env[IID;1];
      $case[forcefully;
        $!deleteMessage[$channelID;$messageID]
        $if[$messageExists[$channelID;$get[mid]];
          $!deleteMessage[$channelID;$get[mid]]
        ]

        $if[$env[lobby;started];
          $arrayForEach[allPlayers;ID;
            $jsonLoad[CP;$getProgress[$env[ID]]]
            $!jsonSet[CP;started;false]
            $saveProgress[$env[CP];$env[ID]]
            $stopTimer[$env[ID]]
          ]
        
          $allPlayersFinished
        ;
          $clearEveryProgress
        ]
      ]
    
      $case[manually;
        $onlyIf[$messageID==$get[mid];$!deleteMessage[$channelID;$messageID]]
        $!deleteMessage[$channelID;$messageID]
        $deleteChannelVar[lobby]
      ]
    ]

    $lobbyInfoMessage[$tl[ui.lobby.closedByHost.$get[l]]]
    $sendMessage[$channelID]
    $!stopTimeout[lobby-$channelID]
  `
}