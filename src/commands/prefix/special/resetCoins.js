export default [{ 
  name: "resetcoins", 
  aliases: ["rc"], 
  type: "messageCreate", 
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[1m]

    $onlyIf[$env[userProfile;MC]>0;
      $newError[$tl[ui.resetcoins.noCash]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.resetcoins.warn;$separate[$env[userProfile;MC]]]]

      $addActionRow
      $addButton[confirmDeletingCoins-$authorID;$tl[ui.resetcoins.buttonLabelConfirm];Success]
      $addButton[declineDeletingCoins-$authorID;$tl[ui.resetcoins.buttonLabelDecline];Danger]
    ;Orange]

    $newTimeout[RC-$authorID;1m;$sendMessage[$channelID;;true]]
  `
},{ 
  type: "interactionCreate", 
  allowedInteractionTypes: [ "button" ], 
  code:`
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;confirmDeletingCoins,declineDeletingCoins]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $switch[$env[IID;0];
      $case[confirmDeletingCoins;
        $let[desc;$tl[ui.resetcoins.deleted;$separate[$env[userProfile;MC]]]]
        $!jsonSet[userProfile;MC;0]
        $saveProfile
      ]

      $case[declineDeletingCoins;
        $let[desc;$tl[ui.resetcoins.canceled]]
      ]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$get[desc]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate
    $!stopTimeout[RC-$authorID]
  `
}] 