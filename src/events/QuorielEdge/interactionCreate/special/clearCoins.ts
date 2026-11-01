import { Command } from "@quoriel/edge"

export default new Command({
  name: "clearCoins",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $!stopCommandTimeout[clearcoins]

    $switch[$jsonGet[IID;1];
      $case[confirm;
        $let[desc;$tl[ui.clearcoins.deleted.$get[l];$separate[$jsonGet[userProfile;mope_coins]]]]
        $callMethod[userProfile;setCoins;0]
        $callMethod[userProfile;save]
      ]

      $case[decline;
        $let[desc;$tl[ui.clearcoins.canceled.$get[l]]]
      ]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$get[desc]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate
  `,
})
