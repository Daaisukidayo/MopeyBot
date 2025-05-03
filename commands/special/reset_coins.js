module.exports = [{ 
  name: "reset-coins", 
  aliases: ["rc", "rmc", "reset-my-coins"], 
  type: "messageCreate", 
  code: `
    $reply
    $callFunction[checking;]

    $onlyIf[$getUserVar[MC]>0;You don't have any $getGlobalVar[emoji] to delete!]

    $let[msgid;$sendMessage[$channelID;Are you sure you want to delete all your \`$separateNumber[$getUserVar[MC];,]\`$getGlobalVar[emoji]?;true]]

    $addActionRow
    $addButton[confirm_deleting_coins-$authorID;Confirm;Success]
    $addButton[decline_deleting_coins-$authorID;Decline;Danger]

    $!editMessage[$channelID;$get[msgid];Are you sure you want to delete all your \`$separateNumber[$getUserVar[MC];,]\`$getGlobalVar[emoji]?]

    $setTimeout[
      $disableButtonsOf[$channelID;$get[msgid]]
    ;5s;RC]
  `
},{ 
  type: "interactionCreate", 
  allowedInteractionTypes: [ "button" ], 
  code:`
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$or[$splitText[0]==confirm_deleting_coins;$splitText[0]==decline_deleting_coins]]

    $if[$splitText[0]==confirm_deleting_coins;
        $!editMessage[$channelID;$messageID;Deleted all your \`$separateNumber[$getUserVar[MC];,]\`$getGlobalVar[emoji]!]
        $deleteUserVar[MC;$authorID]
    ;
        $!editMessage[$channelID;$messageID;Deletion canceled!]
    ]

    $!stopTimeout[RC]
  `
}] 