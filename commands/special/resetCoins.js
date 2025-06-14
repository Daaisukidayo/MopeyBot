module.exports = [{ 
  name: "resetcoins", 
  aliases: ["rc"], 
  type: "messageCreate", 
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $onlyIf[$env[userProfile;MC]>0;You don't have any $getGlobalVar[emoji] to delete!]

    $let[msgid;$sendMessage[$channelID;Are you sure you want to delete all your \`$separateNumber[$env[userProfile;MC];,]\`$getGlobalVar[emoji]?;true]]

    $addActionRow
    $addButton[confirm_deleting_coins-$authorID;Confirm;Success]
    $addButton[decline_deleting_coins-$authorID;Decline;Danger]

    $!editMessage[$channelID;$get[msgid];Are you sure you want to delete all your \`$separateNumber[$env[userProfile;MC];,]\`$getGlobalVar[emoji]?]

    $setTimeout[
      $disableButtonsOf[$channelID;$get[msgid]]
    ;1m;RC-$authorID]
  `
},{ 
  type: "interactionCreate", 
  allowedInteractionTypes: [ "button" ], 
  code:`
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$or[$splitText[0]==confirm_deleting_coins;$splitText[0]==decline_deleting_coins]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]

    $if[$splitText[0]==confirm_deleting_coins;
        $!editMessage[$channelID;$messageID;Deleted all your \`$separateNumber[$env[userProfile;MC];,]\`$getGlobalVar[emoji]!]
        $!jsonSet[userProfile;MC;0]
        $setUserVar[userProfile;$env[userProfile]]
    ;
        $!editMessage[$channelID;$messageID;Deletion canceled!]
    ]

    $!stopTimeout[RC-$authorID]
  `
}] 