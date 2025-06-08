const CD = "1m"

module.exports = [{
  name: "raretrymode",
  aliases: ["rtm", "rtmode"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;${CD}]

    $if[$message!=;
      $let[arg;$toLowerCase[$message[0]]]

      $if[$or[$get[arg]==inferno;$get[arg]==inf;$get[arg]==1];
        $!jsonSet[userProfile;rtMode;inferno]
      ;$if[$or[$get[arg]==default;$get[arg]==def;$get[arg]==2];
        $!jsonSet[userProfile;rtMode;default]
      ;$if[$or[$get[arg]==medium;$get[arg]==med;$get[arg]==3];
        $!jsonSet[userProfile;rtMode;medium]
      ;$if[$or[$get[arg]==hard;$get[arg]==4];
        $!jsonSet[userProfile;rtMode;hard]
      ;$if[$or[$get[arg]==insane;$get[arg]==ins;$get[arg]==5];
        $!jsonSet[userProfile;rtMode;insane]
      ;$if[$or[$get[arg]==impossible;$get[arg]==imp;$get[arg]==6];
        $!jsonSet[userProfile;rtMode;impossible]
      ]]]]]]
    ]


    ${jsonAndArray()}
    $let[msgid;$sendMessage[$channelID;${embed()};true]]
    $setUserVar[userProfile;$env[userProfile]]
    ${buttonsLoop()}
    $!editMessage[$channelID;$get[msgid];${embed()}]

    ${timeout()}
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
    $textSplit[$customID;-]

    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$or[$splitText[0]==inferno;$splitText[0]==default;$splitText[0]==medium;$splitText[0]==hard;$splitText[0]==insane;$splitText[0]==impossible]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]

    $!jsonSet[userProfile;rtMode;$splitText[0]]
    $let[msgid;$messageID]

    ${jsonAndArray()}
    $setUserVar[userProfile;$env[userProfile]]
    ${buttonsLoop()}
    $!editMessage[$channelID;$get[msgid];${embed()}]

    $deferUpdate
    $!clearTimeout[RTM-$authorID]
    ${timeout()}
  `
}]

function jsonAndArray() {
  return `
    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[raretryModes;$env[raretryVarData;raretryModes]]
  `
}

function embed() {
  return `
    $getGlobalVar[author]
    $description[# Choose your raretry mode:]
    $color[228b22]
`
}

function buttonsLoop(disable = false){
  return `
    $loop[$arrayLength[raretryModes];
      $let[i;$sub[$env[i];1]]
      $if[$or[$get[i]==0;$get[i]==3];
        $addActionRow
      ] 

      $if[$env[userProfile;rtMode]==$toLowerCase[$arrayAt[raretryModes;$get[i]]];
        $addButton[$toLowerCase[$arrayAt[raretryModes;$get[i]]]-$authorID;$arrayAt[raretryModes;$get[i]];Secondary;;true]
      ;
        $addButton[$toLowerCase[$arrayAt[raretryModes;$get[i]]]-$authorID;$arrayAt[raretryModes;$get[i]];Success;;${disable}]
      ]

    ;i;desc]
  `
}

function timeout() {
  return `
    $setTimeout[ 
      ${buttonsLoop(`true`)}
      $!editMessage[$channelID;$get[msgid];${embed()} $color[GRAY] This message is now inactive. Run the command again.]
    ;${CD};RTM-$authorID]
  `
}