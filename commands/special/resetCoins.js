module.exports = [{ 
  name: "resetcoins", 
  aliases: ["rc"], 
  type: "messageCreate", 
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $onlyIf[$env[userProfile;MC]>0;
      $description[## You don't have any $getGlobalVar[emoji] to delete!]
      $author[✖️ Error]
      $color[$getGlobalVar[errorColor]]
    ]

    $getGlobalVar[author]
    $description[### Are you sure you want to delete all your \`$separateNumber[$env[userProfile;MC];,]\`$getGlobalVar[emoji]?]
    $color[Orange]

    $addActionRow
    $addButton[confirmDeletingCoins-$authorID;Confirm;Success]
    $addButton[declineDeletingCoins-$authorID;Decline;Danger]

    $let[msgid;$sendMessage[$channelID;;true]]

    $setTimeout[
      $disableButtonsOf[$channelID;$get[msgid]]
    ;1m;RC-$authorID]
  `
},{ 
  type: "interactionCreate", 
  allowedInteractionTypes: [ "button" ], 
  code:`
    $arrayLoad[btn;-;$customID]
    $onlyIf[$and[$includes[$env[btn;0];confirmDeletingCoins;declineDeletingCoins];$includes[$env[btn;1];$authorID]];$callFunction[notYourBTN]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]

    $if[$includes[$env[btn;0];confirmDeletingCoins];
      $description[### Deleted all your \`$separateNumber[$env[userProfile;MC];,]\`$getGlobalVar[emoji]]
      $!jsonSet[userProfile;MC;0]
      $setUserVar[userProfile;$env[userProfile]]
    ;
      $description[### Deletion canceled!]
    ]
    $color[$getGlobalVar[defaultColor]]
    $getGlobalVar[author]

    $!editMessage[$channelID;$messageID]

    $!stopTimeout[RC-$authorID]
  `
}] 