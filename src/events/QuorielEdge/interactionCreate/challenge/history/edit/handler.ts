import { Command } from "@quoriel/edge"

export default new Command({
  name: "editHistory",
  type: "interactionCreate",
  allowed: ["stringSelect", "modal", "button"],
  description: "Displays embedded message after user made or is making any change.",
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[showhistory;true]
    $timezone[$jsonGet[userProfile;timezone]]

    $jsonLoad[thisHistory;$getMessageVar[cachedThisHistory;$messageID]]
    $jsonLoad[cachedHistory;$getMessageVar[cachedHistory;$messageID]]
    $jsonLoad[history;$jsonGet[cachedHistory;history]]

    $switch[$jsonGet[IID;1];
      $case[edit;
        $showHistoryOption[editHistory;$jsonGet[IID;3];$env[thisHistory]]
        $newHistoryTimeout
        $stop
      ]

      $case[set;
        $jsonLoad[thisHistory;$setHistoryOption[$env[thisHistory];$jsonGet[IID;3];$nullish[$input[historyOptionInput];$selectMenuValues]]]
      ]

      $case[resetEditChanges;
        $jsonLoad[thisHistory;$jsonGet[history;$math[$jsonGet[cachedHistory;page] - 1]]]
      ]

      $case[default;
        $stop
      ]
    ]

    $setMessageVar[cachedThisHistory;$env[thisHistory];$messageID]

    $historyEmbed[$env[thisHistory];editHistory]
    $editHistoryExtraEmbed[thisHistory;history]
    $interactionUpdate

    $newHistoryTimeout
  `,
})
