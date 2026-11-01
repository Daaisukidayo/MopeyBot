import { Command } from "@quoriel/edge"

export default new Command({
  name: "startLobby",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $enableUserMentions
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkLobby

    $jsonLoad[lobby;$getLobby]
    $jsonLoad[players;$callMethod[lobby;players]]

    $onlyIf[$jsonGet[lobby;host]==$authorID;$onlyAuthorInteraction]

    $c[same check as the greyed-out button, for clicks on old lobby msgs]
    $onlyIf[$callMethod[lobby;canStart];
      $newError[$tl[ui.lobby.cannotStart.$get[l]]]
    ]

    $!stopTimeout[lobby-$channelID]

    $fn[startingEmbed;
      $addTextDisplay[$arrayFormat[players;<@{.}>;;; ]]
      $addContainer[
        $addTextDisplay[$default[$env[content];???]]
      ;$getGlobalVar[luckyColor]]
    ;content]

    $let[s;10]

    $!deleteMessage[$channelID;$jsonGet[lobby;messageID]]
    $let[mid;$sendMessage[$channelID;$callFn[startingEmbed;$tl[ui.lobby.getReady.$get[l];$get[s]]];true]]

    $c[countdown, bail if the lobby closed or started in the meantime]
    $while[$get[s]>0;
      $letSub[s;1]

      $wait[800]

      $let[current;$getChannelVar[lobby]]
      $if[$or[$get[current]==;$jsonGet[$get[current];started]!=false];
        $sendMessage[$channelID;
          $lobbyInfoMessage[lobby;$tl[ui.lobby.failed.$get[l]]]
        ]
        $!deleteMessage[$channelID;$get[mid]]
        $stop
      ]

      $if[$get[s]>0;
        $!editMessage[$channelID;$get[mid];
          $callFn[startingEmbed;$tl[ui.lobby.getReady.$get[l];$get[s]]]
        ]
      ]
    ]

    $!deleteMessage[$channelID;$get[mid]]

    $setField[lobby;started;true]
    $setChannelVar[lobby;$env[lobby]]

    $arrayForEach[players;ID;
      $setProgress[$env[ID];$callMethod[lobby;teamOf;$env[ID]]]
      $startChallengeTimer[$env[ID]]
    ]

    $sendMessage[$channelID;
      $callFn[startingEmbed;$tl[ui.start.hasBegun.$get[l]]]
    ]
  `,
})
