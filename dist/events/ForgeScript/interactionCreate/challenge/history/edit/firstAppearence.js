"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'interactionCreate',
    allowedInteractionTypes: ['button', 'selectMenu'],
    code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;showHistory_editPage]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[showhistory;true]
    $timezone[$env[userProfile;timezone]]

    $jsonLoad[cachedHistory;$getMessageVar[cachedHistory;$messageID]]
    $jsonLoad[history;$env[cachedHistory;history]]

    $let[page;$env[cachedHistory;page]]
    $let[pageIndex;$math[$get[page] - 1]]
    $jsonLoad[thisHistory;$env[history;$get[pageIndex]]]


    $setMessageVar[cachedThisHistory;$env[thisHistory];$messageID]


    $historyEmbed[$env[thisHistory]]
    $editHistoryExtraEmbed
    $interactionUpdate

    $newHistoryTimeout
  `
};
//# sourceMappingURL=firstAppearence.js.map