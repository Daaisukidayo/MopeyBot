"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "addHistory",
    type: "interactionCreate",
    allowed: ["stringSelect", "modal", "button"],
    description: "Handles adding new history, selecting options, resetting, canceling, and uploading.",
    code: `
        $arrayLoad[IID;-;$customID]
        $jsonLoad[userProfile;$getProfile]
        $let[l;$jsonGet[userProfile;language]]
        $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

        $addCooldown[addhistory;true]
        $timezone[$jsonGet[userProfile;timezone]]

        $let[saved;$getUserVar[addHistorySavedConfig]]
        $jsonLoad[addHistorySavedConfig;$if[$get[saved]==;$addHistoryNewConfig;$get[saved]]]

        $switch[$jsonGet[IID;1];
            $case[edit;
                $showHistoryOption[addHistory;$jsonGet[IID;3];$env[addHistorySavedConfig]]
                $stop
            ]

            $case[set;
                $jsonLoad[addHistorySavedConfig;$setHistoryOption[$env[addHistorySavedConfig];$jsonGet[IID;3];$nullish[$input[historyOptionInput];$selectMenuValues]]]
            ]

            $case[resetNewHistoryPage;
                $jsonLoad[addHistorySavedConfig;$addHistoryNewConfig]
            ]

            $case[cancelNewHistoryPage;
                $deleteCooldown[addhistory-$authorID]
                $deleteUserVar[addHistorySavedConfig]

                $addContainer[
                    $addAuthorDisplay
                    $addTextDisplay[$tl[ui.addhistory.cancelNewHistoryPageTitle.$get[l]]]
                ;$getGlobalVar[luckyColor]]
                $interactionUpdate
                $!stopCommandTimeout[addhistory]
                $stop
            ]

            $case[uploadNewHistoryPage;
                $deleteCooldown[addhistory-$authorID]

                $pushNewHistoryPage[$env[addHistorySavedConfig]]
                $deleteUserVar[addHistorySavedConfig]

                $addContainer[
                    $addAuthorDisplay
                    $addTextDisplay[$tl[ui.addhistory.addedHistory.$get[l]]]
                ;$getGlobalVar[luckyColor]]
                $interactionUpdate

                $!stopCommandTimeout[addhistory]
                $stop
            ]

            $case[default;
                $stop
            ]
        ]

        $setUserVar[addHistorySavedConfig;$env[addHistorySavedConfig]]
        $historyEmbed[$env[addHistorySavedConfig];addHistory]
        $addHistoryExtraEmbed[addHistorySavedConfig]
        $interactionUpdate
        $newCommandTimeout[addhistory]
    `
});
//# sourceMappingURL=handler.js.map