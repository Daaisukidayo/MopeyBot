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
    $arrayLoad[passKeys;,;confirmDeletingPacks,declineDeletingPacks]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[btn;$authorID];$callFunction[notYourBTN]]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[btn;$env[key]]]]

    $switch[$env[btn;0];

      $case[$env[passKeys;0];
        $description[### Deleted all your Skin Packs]
        $!jsonSet[userProfile;userPacks;{}]
        $setUserVar[userProfile;$env[userProfile]]
      ]

      $case[$env[passKeys;1];
        $description[### Deletion canceled!]
      ]

    ]

    $color[$getGlobalVar[defaultColor]]
    $getGlobalVar[author]
    $!editMessage[$channelID;$messageID]

    $!stopTimeout[RP-$authorID]
  `
}] 