"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "notARobot",
    type: "interactionCreate",
    allowed: ["button"],
    code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $c[user's Discord locale if we have it]
    $jsonLoad[allLocales;$getGlobalVar[allLocales]]
    $objectMerge[userProfile;$objectOf[language;$if[$jsonHas[allLocales;$locale];$locale;en-US];user_id;"$authorID"]]
    $callMethod[userProfile;save]
    $rulesEmbed
    $interactionUpdate
  `,
});
//# sourceMappingURL=rulesInteraction.js.map