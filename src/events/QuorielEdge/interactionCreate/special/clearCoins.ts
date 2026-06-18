export default { 
  name: "clearCoins",
  type: "interactionCreate", 
  allowed: [ "button" ], 
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $!stopCommandTimeout[clearcoins]

    $switch[$env[IID;1];
      $case[confirm;
        $let[desc;$tl[$get[l];ui;clearcoins.deleted;$separate[$env[userProfile;MC]]]]
        $setCash[0]
        $saveProfile[$env[userProfile]]
      ]

      $case[decline;
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