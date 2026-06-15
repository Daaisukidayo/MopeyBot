export default {
  name: "startLobby",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $enableUserMentions
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
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
      $addTextDisplay[$arrayJoin[members; ]]
      $addContainer[
        $addTextDisplay[$default[$env[content];???]]
      ;$getGlobalVar[luckyColor]]
    ;content]
    
    $let[s;10]

    $!deleteMessage[$channelID;$env[lobby;messageID]]
    $let[mid;$sendMessage[$channelID;$callFn[startingEmbed;$tl[$get[l];ui;lobby.getReady;$get[s]]];true]]
    
    $while[$get[s]>0;
      $letSub[s;1]

      $wait[800]

      $if[$or[$getChannelVar[lobby]==;$env[lobby;started]!=false];
        $sendMessage[$channelID;
          $lobbyInfoMessage[$tl[$get[l];ui;lobby.failed]]
        ]
        $!deleteMessage[$channelID;$get[mid]]
        $stop
      ]

      $if[$get[s]>0;
        $!editMessage[$channelID;$get[mid];
          $callFn[startingEmbed;$tl[$get[l];ui;lobby.getReady;$get[s]]]
        ]
      ]
    ]

    $!deleteMessage[$channelID;$get[mid]]

    $!jsonSet[lobby;started;true]
    $setChannelVar[lobby;$env[lobby]]

    $arrayForEach[allPlayers;ID;
      $let[teamID;$arrayFindIndex[teams;team;$arrayIncludes[$env[team;players];$env[ID]]]]
      $setProgress[$env[ID];$get[teamID]]
      $startTimer[$env[ID]]
    ]

    $sendMessage[$channelID;
      $callFn[startingEmbed;$tl[$get[l];ui;start.hasBegun]]
    ]
  `
}