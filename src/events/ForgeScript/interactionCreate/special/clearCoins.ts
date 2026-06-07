export default { 
  type: "interactionCreate", 
  allowedInteractionTypes: [ "button" ], 
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;confirmClearingCoins,declineClearingCoins]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $!stopCommandTimeout[clearcoins]

    $switch[$env[IID;0];
      $case[confirmClearingCoins;
        $let[desc;$tl[$get[l];ui;clearcoins.deleted;$separate[$env[userProfile;MC]]]]
        $setCash[0]
        $saveProfile
      ]

      $case[declineClearingCoins;
        $let[desc;$tl[$get[l];ui;clearcoins.canceled]]
      ]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$get[desc]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate
  `
}