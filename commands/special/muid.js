module.exports = ({
  name: "muid",
  aliases: ["uid", "id"],
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]

    $let[pos;$message[0]]

    $onlyIf[$or[$get[pos]!=;$isNumber[$get[pos]]];
      $color[d0321d]
      $author[✖️ Invalid arguments!]
      $description[No MUID were written or argument is not a number]
    ]

    $let[userID;$userLeaderboard[MUID;desc;10;1;\n;data;pos;$if[$env[pos]==$get[pos];$return[$env[data;id]]]]]

    $let[userMUID;$getUserVar[MUID;$get[userID]]]

    $onlyIf[$and[$get[pos]>0;$get[userMUID]!=;$get[userID]!=];
      $color[d0321d]
      $author[✖️ Invalid user!]
      $description[User with this MUID does not exist]
    ]

    $sendMessage[$channelID;
      $author[@$username[$get[userID]] • MUID: $get[userMUID]]
      $footer[Discord ID: $get[userID]]
      $thumbnail[$userAvatar[$get[userID]]]
      $description[**Mopecoins**: \`$separateNumber[$getUserVar[MC;$get[userID]];.]\`$getGlobalVar[emoji]]
      $color[ffd700]
    ]
  `
})