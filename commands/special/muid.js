module.exports = ({
  name: "muid",
  aliases: ["uid", "id"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $let[arg;$message[0]]

    $onlyIf[$or[$get[arg]!=;$isNumber[$get[arg]]];
      $color[$getGlobalVar[errorColor]]
      $author[✖️ Invalid arguments!]
      $description[## No MUID were written or argument is not a number]
    ]

    $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]

    $arrayForEach[allUserIDs;id;
      $if[$get[break];;
        $jsonLoad[otherUserProfile;$getUserVar[userProfile;$env[id]]]
        $if[$env[otherUserProfile;MUID]==$get[arg];
          $let[userID;$env[id]]
          $let[userMUID;$env[otherUserProfile;MUID]]
          $let[break;true]
        ]
      ]
    ]


    $onlyIf[$and[$get[arg]>0;$get[userMUID]!=;$get[userID]!=];
      $color[$getGlobalVar[errorColor]]
      $author[✖️ Invalid user!]
      $description[## User with «\`$get[arg]\`» MUID does not exist yet]
    ]

    $sendMessage[$channelID;
      $author[@$username[$get[userID]] • MUID: $get[userMUID]]
      $footer[Discord ID: $get[userID]]
      $thumbnail[$userAvatar[$get[userID]]]
      $description[# \`$separateNumber[$env[otherUserProfile;MC;];.]\`$getGlobalVar[emoji]]
      $color[$getGlobalVar[defaultColor]]
    ]
  `
})