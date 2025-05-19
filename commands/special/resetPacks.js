module.exports = [{ 
  name: "reset-packs", 
  aliases: ["rp", "rmp", "reset-my-packs"], 
  type: "messageCreate", 
  code: `
    $reply
    $callFunction[checking;]

    $let[msgid;$sendMessage[$channelID;Are you sure you want to delete all your purchased skin packs?;true]]

    $addActionRow
    $addButton[confirm_deleting_packs-$authorID;Confirm;Success]
    $addButton[decline_deleting_packs-$authorID;Decline;Danger]

    $!editMessage[$channelID;$get[msgid];Are you sure you want to delete all your purchased skin packs?]

    $setTimeout[
      $disableButtonsOf[$channelID;$get[msgid]]
    ;1m;RP-$authorID]
  `
},{ 
  type: "interactionCreate", 
  allowedInteractionTypes: [ "button" ], 
  code:`
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$or[$splitText[0]==confirm_deleting_packs;$splitText[0]==decline_deleting_packs]]

    $if[$splitText[0]==confirm_deleting_packs;
        $!editMessage[$channelID;$messageID;Deleted all your purchased skin packs!]
        $setUserVar[userPacks;{}]
    ;
        $!editMessage[$channelID;$messageID;Deletion canceled!]
    ]

    $!stopTimeout[RP-$authorID]
  `
}] 