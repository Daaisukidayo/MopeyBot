"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "rtMode",
    type: "interactionCreate",
    allowed: ["button"],
    code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[raretrymode;true]

    $!jsonSet[userProfile;raretry_mode;$jsonGet[IID;1]]
    $callMethod[userProfile;save]

    $raretrymodeEmbed
    $interactionUpdate

    $newCommandTimeout[raretrymode]
  `,
});
//# sourceMappingURL=raretryMode.js.map