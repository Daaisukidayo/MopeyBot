module.exports = [{
  name: "raretrymode",
  aliases: ["rtm", "rtmode"],
  type: "messageCreate",
  code: `$let[cdTime;1m]
    $reply
  
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $arrayLoad[categories;,;$advancedReplace[$env[raretryVarData;categories]];\n;;";;\\];;\\[;]]
    
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

    $loop[$arrayLength[categories];
      $let[i;$sub[$env[i];1]] 
       
      $if[$or[$get[i]==0;$get[i]==3];
        $addActionRow
      ] 

      $if[$getUserVar[rtMode]==$toLowerCase[$arrayAt[categories;$get[i]]];
        $addButton[$toLowerCase[$arrayAt[categories;$get[i]]]-$authorID;$arrayAt[categories;$get[i]];Secondary;;true]
      ;
        $addButton[$toLowerCase[$arrayAt[categories;$get[i]]]-$authorID;$arrayAt[categories;$get[i]];Success]
      ]

    ;i;desc]
  `
}