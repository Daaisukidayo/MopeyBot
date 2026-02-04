export default {
  name: "startLobby",
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $let[lang;$env[userProfile;language]]
    $checkLobby

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[teams;$env[lobby;teams]]
    $jsonLoad[allPlayers;$env[lobby;allPlayers]]

    $onlyIf[$env[lobby;host]==$authorID;$onlyAuthorInteraction]

    $onlyIf[$arrayLength[allPlayers]>1]

    $!stopTimeout[lobby-$channelID]

    $arrayMap[allPlayers;ID;
      $return[<@$env[ID]>]
    ;members]

    $fn[startingEmbed;
      $arrayJoin[members; ]
      $description[$tl[ui.lobby.getReady;$get[s]]]
      $color[$getGlobalVar[luckyColor]]
    ]
    
    $let[s;10]
    $let[loops;$get[s]]

    $!deleteMessage[$channelID;$env[lobby;messageID]]
    $let[mid;$sendMessage[$channelID;$callFn[startingEmbed];true]]
    
    $loop[$get[loops];
      $letSub[s;1]

      $wait[800]

      $if[$or[$getChannelVar[lobby]==;$env[lobby;started]!=false];
        $sendMessage[$channelID;
          $infoMessage[$tl[ui.lobby.failed]]
        ]
        $!deleteMessage[$channelID;$get[mid]]
        $break
      ]

      $if[$get[s]>0;
        $!editMessage[$channelID;$get[mid];$callFn[startingEmbed]]
        $continue
      ]

      $!deleteMessage[$channelID;$get[mid]]

      $!jsonSet[lobby;started;true]
      $setChannelVar[lobby;$env[lobby]]

      $arrayForEach[allPlayers;ID;
        $jsonLoad[userProfile;$getProfile[$env[ID]]]
        $let[teamID;$arrayFindIndex[teams;team;$advArrayIncludes[$env[team;players];$env[ID]]]]
        $setProgress[$env[ID];$get[teamID]]
        $startTimer[$env[ID]]
      ]

      $callFn[startingEmbed]
      $description[$tl[ui.start.hasBegun]\n$tl[ui.start.turnOnNotification]]
      $sendMessage[$channelID]
    ]
  `
}