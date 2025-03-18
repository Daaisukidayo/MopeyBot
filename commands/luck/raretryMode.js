module.exports = [{
  name: "raretrymode",
  aliases: ["rtm", "rtmode"],
  type: "messageCreate",
  code: `
    
    $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
    $description[# Choose your raretry mode:]
    $color[228b22]

    $arrayLoad[modes;, ;inferno, default, medium, hard, insane, impossible]

    $loop[$arrayLength[modes];
            $let[i;$sub[$env[i];1]]
            $if[$or[$get[i]==0;$get[i]==3];$addActionRow] 

            $if[$getUserVar[rtMode]==$arrayAt[modes;$get[i]];
                    $addButton[$arrayAt[modes;$get[i]]-$authorID;$toTitleCase[$arrayAt[modes;$get[i]]];Secondary;;true]
            ;
                    $addButton[$arrayAt[modes;$get[i]]-$authorID;$toTitleCase[$arrayAt[modes;$get[i]]];Success]
            ];i;desc]
    
`
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID]
    $onlyIf[$or[$splitText[0]==inferno;$splitText[0]==default;$splitText[0]==medium;$splitText[0]==hard;$splitText[0]==insane;$splitText[0]==impossible]]

    $log[$splitText[0]]

    $deferUpdate`
}]