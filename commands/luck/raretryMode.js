module.exports = [{
  name: "raretrymode",
  aliases: ["rtm", "rtmode"],
  type: "messageCreate",
  code: `$let[cdTime;1m]
    $reply
  
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

    $if[$message!=;
      $let[arg;$toLowerCase[$message[0]]]

      $if[$or[$get[arg]==inferno;$get[arg]==inf;$get[arg]==1];
        $setUserVar[rtMode;inferno]
      ;$if[$or[$get[arg]==default;$get[arg]==def;$get[arg]==2];
        $setUserVar[rtMode;default]
      ;$if[$or[$get[arg]==medium;$get[arg]==med;$get[arg]==3];
        $setUserVar[rtMode;medium]
      ;$if[$or[$get[arg]==hard;$get[arg]==4];
        $setUserVar[rtMode;hard]
      ;$if[$or[$get[arg]==insane;$get[arg]==ins;$get[arg]==5];
        $setUserVar[rtMode;insane]
      ;$if[$or[$get[arg]==impossible;$get[arg]==imp;$get[arg]==6];
        $setUserVar[rtMode;impossible]
      ]]]]]]
    ]


    ${jsonAndArray()}
    $let[msgid;$sendMessage[$channelID;${embed()};true]]
    ${buttonsLoop()}
    $!editMessage[$channelID;$get[msgid];${embed()}]

    $setTimeout[ 
      ${buttonsLoop(`true`)}
      $!editMessage[$channelID;$get[msgid];${embed()} $color[GRAY] This message is now inactive. Run the command again.]
    ;$get[cdTime]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
    $textSplit[$customID;-]

    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$or[$splitText[0]==inferno;$splitText[0]==default;$splitText[0]==medium;$splitText[0]==hard;$splitText[0]==insane;$splitText[0]==impossible]]

    $setUserVar[rtMode;$splitText[0]]
    $let[msgid;$messageID]

    ${jsonAndArray()}
    ${buttonsLoop()}
    $!editMessage[$channelID;$get[msgid];${embed()}]

    $deferUpdate
  `
}]

function jsonAndArray() {
return `
$jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
$arrayLoad[raretryModes;,;$advancedReplace[$env[raretryVarData;raretryModes]; ;;\n;;";;\\];;\\[;]]
`
}

function embed() {
return `

$author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
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

  $if[$getUserVar[rtMode]==$toLowerCase[$arrayAt[raretryModes;$get[i]]];
    $addButton[$toLowerCase[$arrayAt[raretryModes;$get[i]]]-$authorID;$arrayAt[raretryModes;$get[i]];Secondary;;true]
  ;
    $addButton[$toLowerCase[$arrayAt[raretryModes;$get[i]]]-$authorID;$arrayAt[raretryModes;$get[i]];Success;;${disable}]
  ]

;i;desc]
`
}