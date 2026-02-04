export default {
  type: "interactionCreate",
  description: "When pressing End or Close manually",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;endLobby,closeLobbyManually]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkLobby

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $onlyIf[$env[lobby;host]==$authorID;$onlyAuthorInteraction]

    $jsonLoad[teams;$env[lobby;teams]]
    $jsonLoad[allPlayers;$env[lobby;allPlayers]]
    $let[mid;$env[lobby;messageID]]

    $switch[$env[IID;0];
      $case[closeLobbyManually;
        $!deleteMessage[$channelID;$messageID]
        $if[$messageExists[$channelID;$get[mid]];
          $!deleteMessage[$channelID;$get[mid]]
        ]

        $if[$env[lobby;started];
          $arrayForEach[allPlayers;ID;
            $jsonLoad[CP;$getProgress[$env[ID]]]
            $!jsonSet[CP;started;false]
            $saveProgress[$env[ID];CP]
            $stopTimer[$env[ID]]
            $deleteTime[$env[ID]]
          ]
        
          $allPlayersFinished
        ;
          $clearEveryProgress
        ]
      ]
    
      $case[endLobby;
        $onlyIf[$messageID==$get[mid];$!deleteMessage[$channelID;$messageID]]
        $!deleteMessage[$channelID;$messageID]
        $clearEveryProgress
      ]
    ]

    $infoMessage[$tl[ui.lobby.closedByHost]]
    $sendMessage[$channelID]
    $!stopTimeout[lobby-$channelID]
  `
}