module.exports = [{ 
  name: "resetpacks", 
  aliases: ["rp"], 
  type: "messageCreate", 
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;1m]

    $getGlobalVar[author]
    $description[### Are you sure you want to delete all your Skin Packs?]
    $color[Orange]

    $addActionRow
    $addButton[confirmDeletingPacks-$authorID;Confirm;Success]
    $addButton[declineDeletingPacks-$authorID;Decline;Danger]

    $let[msgid;$sendMessage[$channelID;;true]]

    $setTimeout[
      $disableButtonsOf[$channelID;$get[msgid]]
    ;1m;RP-$authorID]
  `
},{ 
  type: "interactionCreate", 
  allowedInteractionTypes: [ "button" ], 
  code:`
    $arrayLoad[btn;-;$customID]
    $onlyIf[$and[$includes[$env[btn;0];declineDeletingPacks;confirmDeletingPacks];$includes[$env[btn;1];$authorID]];$callFunction[notYourBTN]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]

    $if[$includes[$env[btn;0];confirmDeletingPacks];
      $description[### Deleted all your Skin Packs]
      $!jsonSet[userProfile;userPacks;{}]
      $setUserVar[userProfile;$env[userProfile]]
    ;
      $description[### Deletion canceled!]
    ]
    $color[$getGlobalVar[defaultColor]]
    $getGlobalVar[author]

    $!editMessage[$channelID;$messageID]

    $!stopTimeout[RP-$authorID]
  `
}] 