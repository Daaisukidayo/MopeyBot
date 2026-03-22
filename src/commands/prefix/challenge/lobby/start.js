export default {
  name: "startLobby",
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $enableUserMentions
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
      $addTextDisplay[$arrayJoin[members; ]]
      $addContainer[
        $addTextDisplay[$default[$env[content];???]]
      ;$getGlobalVar[luckyColor]]
    ;content]
    
    $let[s;10]
    $let[loops;$get[s]]

    $!deleteMessage[$channelID;$env[lobby;messageID]]
    $let[mid;$sendMessage[$channelID;$callFn[startingEmbed;$tl[ui.lobby.getReady;$get[s]]];true]]
    
    $loop[$get[loops];
      $letSub[s;1]

      $wait[800]

      $if[$or[$getChannelVar[lobby]==;$env[lobby;started]!=false];
        $sendMessage[$channelID;
          $lobbyInfoMessage[$tl[ui.lobby.failed]]
        ]
        $!deleteMessage[$channelID;$get[mid]]
        $break
      ]

      $if[$get[s]>0;
        $!editMessage[$channelID;$get[mid];
          $callFn[startingEmbed;$tl[ui.lobby.getReady;$get[s]]]
        ]
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

      $sendMessage[$channelID;
        $callFn[startingEmbed;$tl[ui.start.hasBegun]]
      ]
    ]
  `
}