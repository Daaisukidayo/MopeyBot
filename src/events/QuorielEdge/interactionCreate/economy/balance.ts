import { Command } from "@quoriel/edge"

export default new Command({
  name: "balance",
  type: "interactionCreate",
  allowed: ["button", "modal", "stringSelect"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $c[view = the tab buttons, sort/order = the menus (back to page 1), page = the arrows w/ sort + order in the id, pageModal + pageInput = jump to a typed page like in the shop]
    $switch[$jsonGet[IID;1];
      $case[view;$balanceEmbed[$jsonGet[IID;2]]]
      $case[sort;$balanceEmbed[skins;$selectMenuValues;$jsonGet[IID;2];1]]
      $case[order;$balanceEmbed[skins;$jsonGet[IID;2];$selectMenuValues;1]]
      $case[page;$balanceEmbed[skins;$jsonGet[IID;2];$jsonGet[IID;3];$jsonGet[IID;4]]]
      $case[pageModal;
        $modal[balance-pageInput-$jsonGet[IID;2]-$jsonGet[IID;3]-$authorID;$tl[ui.shop.modalTitlePage.$get[l]]]
        $addTextInput[pageInput;$tl[ui.shop.modalDescriptionPage.$get[l]];Short;true;;;1;5]
        $showModal
        $stop
      ]
      $case[pageInput;
        $onlyIf[$isNumber[$input[pageInput]];
          $newError[$tl[ui.errors.notNumber.$get[l]]]
        ]
        $balanceEmbed[skins;$jsonGet[IID;2];$jsonGet[IID;3];$floor[$input[pageInput]]]
      ]
    ]
    $interactionUpdate
  `,
})
