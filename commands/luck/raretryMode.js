module.exports = [{
  name: "raretrymode",
  aliases: ["rtm", "rtmode"],
  type: "messageCreate",
  code: `$let[cdTime;1m]
    $reply
  
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]
    
    ${embed()}
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
    $textSplit[$customID;-]

    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$or[$splitText[0]==inferno;$splitText[0]==default;$splitText[0]==medium;$splitText[0]==hard;$splitText[0]==insane;$splitText[0]==impossible]]

    $setUserVar[rtMode;$splitText[0]]

    ${embed()}

    $deferUpdate
  `
}]

function embed() {
  return `
    $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
    $description[# Choose your raretry mode:]
    $color[228b22]

    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $arrayLoad[raretryModes;,;$advancedReplace[$env[raretryVarData;raretryModes]; ;;\n;;";;\\];;\\[;]]

    $loop[$arrayLength[raretryModes];
      $let[i;$sub[$env[i];1]] 
       
      $if[$or[$get[i]==0;$get[i]==3];
        $addActionRow
      ] 

      $if[$getUserVar[rtMode]==$toLowerCase[$arrayAt[raretryModes;$get[i]]];
        $addButton[$toLowerCase[$arrayAt[raretryModes;$get[i]]]-$authorID;$arrayAt[raretryModes;$get[i]];Secondary;;true]
      ;
        $addButton[$toLowerCase[$arrayAt[raretryModes;$get[i]]]-$authorID;$arrayAt[raretryModes;$get[i]];Success]
      ]

    ;i;desc]
  `
}